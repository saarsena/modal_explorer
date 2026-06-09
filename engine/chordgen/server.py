"""
chordgen.server, line-delimited JSON-RPC stdio server.

Wire format
-----------

Requests are one JSON object per line on stdin:

    {"op": "diatonic", "key": 0, "scale": "major", "id": 7}

Responses are one JSON object per line on stdout:

    {"id": 7, "result": {"chords": [...]}}            # success
    {"id": 7, "error":  "unknown op: 'bogus'"}         # failure

The ``id`` field is optional; if present in the request it is echoed
back verbatim in the response so async clients can correlate.

Buffering
---------

Python's stdout is block-buffered when stdin is a pipe.  We always
``print(..., flush=True)`` so the client sees a response immediately.
Run with ``python -u -m chordgen.server`` for unbuffered I/O if you
prefer that as a belt-and-suspenders measure.

Spawning
--------

A typical Go (or any-language) client launches us with::

    cmd := exec.Command("python", "-m", "chordgen.server")
    stdin, _  := cmd.StdinPipe()
    stdout, _ := cmd.StdoutPipe()
    cmd.Start()
    // write a JSON line to stdin, read a JSON line from stdout, repeat

CLI usage from a shell::

    echo '{"op":"diatonic","key":0,"scale":"major"}' | python -m chordgen.server

Available ops
-------------

    Theory:
      diatonic        {key, scale, sevenths?}                  -> {chords}
      progression     {key, scale, template, sevenths?}        -> {chords}
      random          {key, scale, length?, sevenths?, seed?}  -> {chords}
      parse_chord     {name}                                   -> {chord}
      parse_roman     {roman, key, scale}                      -> {chord}
      scale_info      {key, scale}                             -> {notes, ic_vector, ...}
      chord_info      {name | (root, quality)}                 -> {pitch_classes, prime_form, ...}
      voicings        {name | (root, quality), octave?}        -> {close, drop2, shell}
      voice_progression {chords, strategy?, octave?}           -> {voicings}
      upper_structures {key, minor?, octave_lh?, octave_rh?}   -> {voicings, key, minor}

    Analyzer:
      analyze         {chord_names | chords}                   -> {analysis}
      recognize_chord {notes | pitch_classes, top_n?}          -> {matches}

    Composition:
      compose_song    {sections}                               -> {chords, boundaries}

    Lookups (no args):
      list_keys, list_scales, list_templates, list_voicings,
      list_rhythms, list_bass_patterns, list_drum_patterns,
      list_effect_presets, list_ops

    Audio (requires numpy/scipy/mido at runtime):
      render_song     {output_path, ...settings}               -> {path}
      render_song_form {output_path, sections, ...defaults}    -> {path}
      preview_chord   {name | (root, quality), duration?, ...} -> {path}
"""

from __future__ import annotations

import json
import os
import sys
import threading
import traceback
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any, Callable, Dict, List, Optional

# Import top-level modules through the package re-exports so the wire
# format and the public API stay coupled.
import chordgen as cg
from music_theory import Chord, Scale


# ── Serialisers ─────────────────────────────────────────────────────────────

def _chord_to_json(chord: Chord) -> Dict[str, Any]:
    """Wire shape for a single Chord."""
    return {
        "name":          chord.name,
        "root":          chord.root,
        "quality":       chord.quality,
        "inversion":     chord.inversion,
        "pitch_classes": list(chord.pitch_classes),
        "intervals":     list(chord.intervals),
        "consonance":    chord.consonance_score(),
    }


def _chord_from_input(data: Any) -> Chord:
    """Accept either {"name": "Cmaj7"} or {"root": 0, "quality": "major7"}
    or a bare chord-name string."""
    if isinstance(data, str):
        return Chord.from_name(data)
    if isinstance(data, dict):
        if "name" in data:
            chord = Chord.from_name(data["name"])
            if data.get("inversion"):
                chord.inversion = int(data["inversion"])
            return chord
        if "root" in data and "quality" in data:
            return Chord(root=int(data["root"]), quality=str(data["quality"]),
                         inversion=int(data.get("inversion", 0)))
    raise ValueError(f"can't parse chord input: {data!r}")


def _resolve_chord(req: Dict[str, Any]) -> Chord:
    """Pull the chord out of a request that has either a 'name' key,
    explicit 'root'+'quality', or a nested 'chord' dict."""
    if "chord" in req:
        return _chord_from_input(req["chord"])
    if "name" in req:
        return Chord.from_name(req["name"])
    if "root" in req and "quality" in req:
        return Chord(root=int(req["root"]), quality=str(req["quality"]),
                     inversion=int(req.get("inversion", 0)))
    raise ValueError("expected 'name', 'chord', or 'root'+'quality' in request")


def _scale_from_req(req: Dict[str, Any]) -> Scale:
    return Scale(int(req.get("key", 0)), str(req.get("scale", "major")))


def _key_candidate_to_json(k: cg.KeyCandidate) -> Dict[str, Any]:
    return {
        "root":            k.root,
        "scale":           k.scale_name,
        "label":           k.label,
        "score":           k.score,
        "diatonic_count":  k.diatonic_count,
        "total_chords":    k.total_chords,
    }


def _substitution_to_json(s: cg.Substitution) -> Dict[str, Any]:
    return {
        "position":     s.position,
        "original":     _chord_to_json(s.original),
        "replacement":  _chord_to_json(s.replacement),
        "rationale":    s.rationale,
    }


def _analysis_to_json(a: cg.ProgressionAnalysis) -> Dict[str, Any]:
    return {
        "chords":          [_chord_to_json(c) for c in a.chords],
        "key_candidates":  [_key_candidate_to_json(k) for k in a.key_candidates],
        "inferred_key":    _key_candidate_to_json(a.inferred_key),
        "roman_labels":    list(a.roman_labels),
        "voice_leading":   list(a.voice_leading),
        "tension":         list(a.tension),
        "substitutions":   [_substitution_to_json(s) for s in a.substitutions],
        "summary":         a.summary(),
    }


# ── Op handlers ─────────────────────────────────────────────────────────────

def op_diatonic(req: Dict[str, Any]) -> Dict[str, Any]:
    scale = _scale_from_req(req)
    chords = cg.build_diatonic_chords(scale, sevenths=bool(req.get("sevenths", False)))
    return {"chords": [_chord_to_json(c) for c in chords]}


def op_progression(req: Dict[str, Any]) -> Dict[str, Any]:
    chords = cg.generate_progression(
        int(req["key"]), str(req.get("scale", "major")),
        str(req["template"]), sevenths=bool(req.get("sevenths", False)),
    )
    return {"chords": [_chord_to_json(c) for c in chords]}


def op_random(req: Dict[str, Any]) -> Dict[str, Any]:
    import random as _random
    if "seed" in req:
        _random.seed(int(req["seed"]))
    chords = cg.random_progression(
        int(req.get("key", 0)), str(req.get("scale", "major")),
        length=int(req.get("length", 4)),
        sevenths=bool(req.get("sevenths", False)),
    )
    return {"chords": [_chord_to_json(c) for c in chords]}


def op_parse_chord(req: Dict[str, Any]) -> Dict[str, Any]:
    return {"chord": _chord_to_json(Chord.from_name(req["name"]))}


def op_parse_roman(req: Dict[str, Any]) -> Dict[str, Any]:
    scale = _scale_from_req(req)
    chord = cg.parse_roman(str(req["roman"]), scale)
    return {"chord": _chord_to_json(chord)}


def op_scale_info(req: Dict[str, Any]) -> Dict[str, Any]:
    scale = _scale_from_req(req)
    return {
        "key":           scale.root,
        "scale":         scale.pattern_name,
        "notes":         scale.notes,
        "note_names":    [cg.note_name(n) for n in scale.notes],
        "degree_count":  scale.degree_count,
        "ic_vector":     scale.interval_vector(),
    }


def op_chord_info(req: Dict[str, Any]) -> Dict[str, Any]:
    chord = _resolve_chord(req)
    info = cg.pitch_class_set_info(chord.pitch_classes)
    return {
        "chord":         _chord_to_json(chord),
        "set_info":      {
            "prime_form":                  list(info["prime_form"]),
            "interval_class_vector":       info["interval_class_vector"],
            "transpositional_symmetries":  info["transpositional_symmetries"],
            "inversional_symmetries":      info["inversional_symmetries"],
            "cardinality":                 info["cardinality"],
        },
    }


def op_voicings(req: Dict[str, Any]) -> Dict[str, Any]:
    chord = _resolve_chord(req)
    octave = int(req.get("octave", 4))
    return {
        "chord":  _chord_to_json(chord),
        "octave": octave,
        "close":  cg.voice_close(chord, octave),
        "drop2":  cg.voice_drop2(chord, octave),
        "shell":  cg.voice_shell(chord, octave),
    }


def op_voice_progression(req: Dict[str, Any]) -> Dict[str, Any]:
    chords = [_chord_from_input(c) for c in req["chords"]]
    notes = cg.voice_progression(chords, octave=int(req.get("octave", 4)),
                                 strategy=str(req.get("strategy", "close")))
    return {"voicings": notes}


def op_upper_structures(req: Dict[str, Any]) -> Dict[str, Any]:
    key = int(req.get("key", 0))
    minor = bool(req.get("minor", False))
    voicings = cg.voice_ii_v_i(
        key,
        minor=minor,
        octave_lh=int(req.get("octave_lh", 3)),
        octave_rh=int(req.get("octave_rh", 4)),
    )
    return {"voicings": voicings, "key": key, "minor": minor}


def op_recognize_chord(req: Dict[str, Any]) -> Dict[str, Any]:
    """Identify the most likely chord(s) from raw MIDI notes or pitch classes.

    Input:
      {"op": "recognize_chord", "notes": [60, 64, 67]}         # MIDI note numbers
      {"op": "recognize_chord", "pitch_classes": [0, 4, 7]}    # already reduced
      {"op": "recognize_chord", "notes": [...], "top_n": 5}    # more candidates

    Output:
      {"input_pitch_classes": [0, 4, 7], "bass_pc": 0,
       "matches": [{"chord": {...}, "score": 1.0}, ...]}

    Scores run 0–1; 1.0 is an exact match.  Inversions are detected
    automatically when MIDI note numbers are supplied (the lowest note
    determines the bass).
    """
    top_n = int(req.get("top_n", 3))

    if "notes" in req:
        notes = [int(n) for n in req["notes"]]
    elif "pitch_classes" in req:
        # Treat as already-reduced pitch classes; pick octave 4 for bass detection
        notes = [int(pc) % 12 for pc in req["pitch_classes"]]
    else:
        raise ValueError("expected 'notes' (MIDI) or 'pitch_classes' in request")

    if not notes:
        raise ValueError("notes list is empty")

    matches = cg.recognize_chord(notes, top_n=top_n)
    return {
        "input_pitch_classes": sorted(set(n % 12 for n in notes)),
        "bass_pc":             min(notes) % 12,
        "matches": [
            {"chord": _chord_to_json(chord), "score": round(score, 3)}
            for score, chord in matches
        ],
    }


def op_analyze(req: Dict[str, Any]) -> Dict[str, Any]:
    if "chord_names" in req:
        analysis = cg.analyze_chord_names(list(req["chord_names"]))
    elif "chords" in req:
        chords = [_chord_from_input(c) for c in req["chords"]]
        analysis = cg.analyze(chords)
    else:
        raise ValueError("expected 'chord_names' or 'chords' in request")
    return _analysis_to_json(analysis)


def op_compose_song(req: Dict[str, Any]) -> Dict[str, Any]:
    sections = [cg.Section(**s) for s in req["sections"]]
    composed = cg.compose(sections)
    return {
        "chords":     [_chord_to_json(c) for c in composed.chords],
        "boundaries": [{"name": n, "start": s} for n, s in composed.boundaries],
        "section_at": {
            i: composed.section_at(i) for i in range(len(composed.chords))
        },
    }


# Lookups (no args)
def op_list_keys(_):     return {"keys":     cg.NOTE_NAMES_SHARP}
def op_list_scales(_):   return {"scales":   list(cg.SCALE_PATTERNS.keys())}
def op_list_templates(_):
    return {"templates": [{"name": n, "degrees": d}
                          for n, d in cg.PROGRESSION_TEMPLATES.items()]}
def op_list_voicings(_): return {"voicings": cg.VOICING_NAMES}


def op_list_rhythms(_):
    from sequencer import RHYTHM_NAMES
    return {"rhythms": RHYTHM_NAMES}


def op_list_bass_patterns(_):
    from arrangement import BASS_PATTERN_NAMES
    return {"bass_patterns": BASS_PATTERN_NAMES}


def op_list_drum_patterns(_):
    from arrangement import DRUM_PATTERN_NAMES
    return {"drum_patterns": DRUM_PATTERN_NAMES}


def op_list_effect_presets(_):
    from dsp_effects import PRESET_NAMES
    return {"effect_presets": PRESET_NAMES}


def op_list_ops(_): return {"ops": sorted(_OPS.keys())}


# Audio render ops, only callable when the audio stack is installed
def op_render_song(req: Dict[str, Any]) -> Dict[str, Any]:
    from arrangement import render_song
    chords = [_chord_from_input(c) for c in req["chords"]]
    out = render_song(
        chords,
        output_path=str(req["output_path"]),
        bpm=float(req.get("bpm", 110.0)),
        beats_per_chord=float(req.get("beats_per_chord", 4.0)),
        chord_voicing=str(req.get("voicing", "smooth")),
        chord_rhythm=req.get("rhythm"),
        bass_pattern=req.get("bass_pattern", "root"),
        drum_pattern=req.get("drum_pattern", "backbeat"),
        effect_preset=str(req.get("effect_preset", "warm")),
    )
    return {"path": out}


def op_render_song_form(req: Dict[str, Any]) -> Dict[str, Any]:
    sections = [cg.Section(**s) for s in req["sections"]]
    defaults = cg.SongFormDefaults(**(req.get("defaults") or {}))
    out = cg.render_song_form(
        sections,
        output_path=str(req["output_path"]),
        defaults=defaults,
    )
    return {"path": out}


def op_preview_chord(req: Dict[str, Any]) -> Dict[str, Any]:
    """Render a single chord to a short WAV file for audition.

    Used by clients that want one-key audio preview without going through
    the whole song-render machinery.  Writes to ``output_path`` if given,
    otherwise to a temp file and returns its path.
    """
    import tempfile
    from sequencer import render_progression
    chord = _resolve_chord(req)
    duration = float(req.get("duration", 1.5))   # seconds
    octave = int(req.get("octave", 4))
    voicing = str(req.get("voicing", "close"))
    effect_preset = str(req.get("effect_preset", "warm"))
    output_path = req.get("output_path")
    if not output_path:
        f = tempfile.NamedTemporaryFile(suffix=".wav", delete=False,
                                        prefix="chordgen_preview_")
        f.close()
        output_path = f.name
    # render_progression: bpm=60 -> 1 beat = 1 second, so beats=duration
    # gives us ``duration`` seconds for our single chord.
    render_progression(
        [chord], output_path,
        bpm=60.0, beats_per_chord=duration,
        octave=octave,
        voicing=voicing,
        effect_preset=effect_preset,
    )
    return {"path": output_path}


# ── Dispatch table ──────────────────────────────────────────────────────────

_OPS: Dict[str, Callable[[Dict[str, Any]], Dict[str, Any]]] = {
    # Theory
    "diatonic":            op_diatonic,
    "progression":         op_progression,
    "random":              op_random,
    "parse_chord":         op_parse_chord,
    "parse_roman":         op_parse_roman,
    "scale_info":          op_scale_info,
    "chord_info":          op_chord_info,
    "voicings":            op_voicings,
    "voice_progression":   op_voice_progression,
    "upper_structures":    op_upper_structures,
    # Analyzer
    "recognize_chord":     op_recognize_chord,
    "analyze":             op_analyze,
    # Composition
    "compose_song":        op_compose_song,
    # Lookups
    "list_keys":            op_list_keys,
    "list_scales":          op_list_scales,
    "list_templates":       op_list_templates,
    "list_voicings":        op_list_voicings,
    "list_rhythms":         op_list_rhythms,
    "list_bass_patterns":   op_list_bass_patterns,
    "list_drum_patterns":   op_list_drum_patterns,
    "list_effect_presets":  op_list_effect_presets,
    "list_ops":             op_list_ops,
    # Audio render
    "render_song":          op_render_song,
    "render_song_form":     op_render_song_form,
    "preview_chord":        op_preview_chord,
}


# ── Public entry points ─────────────────────────────────────────────────────

def handle_request(req: Dict[str, Any]) -> Dict[str, Any]:
    """Dispatch a single parsed request and return the response dict.

    Always preserves any 'id' field in the request.  Wraps ANY exception
    in an error envelope so the server loop never crashes the process.
    """
    rid = req.get("id")
    op = req.get("op")
    out: Dict[str, Any] = {}
    if rid is not None:
        out["id"] = rid
    try:
        if op not in _OPS:
            raise ValueError(f"unknown op: {op!r}")
        out["result"] = _OPS[op](req)
    except Exception as e:
        out["error"] = f"{type(e).__name__}: {e}"
    return out


def serve(stdin=None, stdout=None) -> None:
    """Run the line-delimited JSON server until stdin closes.

    Parameters are injectable for tests; defaults to the real stdio.
    Each input line that fails to parse as JSON gets an error response;
    a blank line is silently skipped.
    """
    if stdin is None:
        stdin = sys.stdin
    if stdout is None:
        stdout = sys.stdout

    for line in stdin:
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
        except json.JSONDecodeError as e:
            print(json.dumps({"error": f"JSONDecodeError: {e}"}), file=stdout, flush=True)
            continue
        if not isinstance(req, dict):
            print(json.dumps({"error": "request must be a JSON object"}),
                  file=stdout, flush=True)
            continue
        resp = handle_request(req)
        print(json.dumps(resp), file=stdout, flush=True)


_HTTP_PORT = int(os.environ.get("COMPOSITION_AIDE_HTTP_PORT", "7842"))


_CORS = [
    ("Access-Control-Allow-Origin",  "*"),
    ("Access-Control-Allow-Methods", "POST, OPTIONS"),
    ("Access-Control-Allow-Headers", "Content-Type"),
]


class _HttpHandler(BaseHTTPRequestHandler):
    """Single-endpoint HTTP wrapper around handle_request.

    POST /  — body is a JSON request object, same wire format as stdio.
    OPTIONS — CORS preflight (browser fetch with Content-Type: application/json).
    """

    def _cors(self) -> None:
        for k, v in _CORS:
            self.send_header(k, v)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_POST(self) -> None:
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)
        try:
            req = json.loads(body)
        except json.JSONDecodeError as e:
            resp: Dict[str, Any] = {"error": f"JSONDecodeError: {e}"}
        else:
            resp = handle_request(req) if isinstance(req, dict) \
                else {"error": "request must be a JSON object"}
        data = json.dumps(resp).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self._cors()
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, *args: Any) -> None:
        pass  # silence request log so tests see clean stderr


def _start_http(port: int) -> None:
    """Start the HTTP server in a daemon thread. Fails silently if port is taken."""
    try:
        server = ThreadingHTTPServer(("127.0.0.1", port), _HttpHandler)
        t = threading.Thread(target=server.serve_forever, daemon=True)
        t.start()
    except OSError:
        pass


def main():
    _start_http(_HTTP_PORT)
    serve()


if __name__ == "__main__":
    main()

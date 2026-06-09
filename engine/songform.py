"""
songform.py: Multi-section song composition.

A *song* is a sequence of named sections (intro/verse/chorus/bridge/...);
each section has its own key, scale, progression template, length in
bars, and, optionally, its own voicing/rhythm/bass/drums/effect
preset.  ``compose`` returns the flat chord list with section
boundaries; ``render_song_form`` renders each section through its own
settings and concatenates the audio.

Why this matters: real music isn't one progression in one key.  A
verse might sit in C major with quarter-note pads, the chorus jumps
to G major with a backbeat groove, the bridge modulates to A minor
with a half-time feel and a wider reverb.  This module lets you
declare that whole structure once and render it.
"""

from __future__ import annotations

from dataclasses import dataclass, field, replace
from typing import List, Optional, Tuple

from music_theory import (
    Chord, Scale, generate_progression, PROGRESSION_TEMPLATES,
)


# ── Section ─────────────────────────────────────────────────────────────────

@dataclass
class Section:
    """One named section of a song.

    ``bars`` is the section length in 4-beat bars; combined with
    ``beats_per_chord`` it determines how many copies of the template
    progression fit into the section.
    """
    name:            str
    key_root:        int                = 0          # pitch class 0..11
    scale_name:      str                = "major"
    template:        str                = "I-V-vi-IV"
    bars:            int                = 4
    sevenths:        bool               = False
    beats_per_chord: float              = 2.0

    # Audio-render knobs (only used by render_song_form).  Defaults of None
    # mean "use the song-level default".
    voicing:         Optional[str]      = None
    rhythm:          Optional[str]      = None
    bass_pattern:    Optional[str]      = None
    drum_pattern:    Optional[str]      = None
    effect_preset:   Optional[str]      = None


# ── Composition (chord generation only) ─────────────────────────────────────

@dataclass
class ComposedSong:
    """The flattened chord plan for a song.

    ``chords`` is the concatenated chord list; ``boundaries`` lists the
    starting chord-index of each section so renderers/visualisers can
    annotate.  ``sections`` is the original list, kept for reference.
    """
    chords:     List[Chord]
    boundaries: List[Tuple[str, int]]    # (section_name, start_index)
    sections:   List[Section]

    def section_at(self, chord_idx: int) -> str:
        """Which section does this chord belong to?"""
        result = self.boundaries[0][0] if self.boundaries else ""
        for name, start in self.boundaries:
            if chord_idx >= start:
                result = name
        return result


def _chords_for_section(section: Section) -> List[Chord]:
    """Generate the chord list for one section.

    The template is repeated as many times as needed to fill the
    requested ``bars``.  We compute ``chords_per_bar = 4 / beats_per_chord``
    so a 4-bar section at 2 beats/chord gives 8 chords; at 4 beats/chord
    gives 4 chords; etc.
    """
    if section.template not in PROGRESSION_TEMPLATES:
        raise ValueError(f"unknown template: {section.template!r}")
    one_pass = generate_progression(
        section.key_root, section.scale_name,
        section.template, sevenths=section.sevenths,
    )
    chords_per_bar = 4 / section.beats_per_chord
    target = max(1, int(round(section.bars * chords_per_bar)))
    out: List[Chord] = []
    while len(out) < target:
        out.extend(one_pass)
    return out[:target]


def compose(sections: List[Section]) -> ComposedSong:
    """Flatten a list of sections into one chord plan plus boundary
    markers."""
    if not sections:
        raise ValueError("compose() requires at least one section")
    flat: List[Chord] = []
    boundaries: List[Tuple[str, int]] = []
    for s in sections:
        boundaries.append((s.name, len(flat)))
        flat.extend(_chords_for_section(s))
    return ComposedSong(chords=flat, boundaries=boundaries, sections=sections)


# ── Audio rendering ─────────────────────────────────────────────────────────

@dataclass
class SongFormDefaults:
    """Song-level fallbacks used when a section leaves a knob as None."""
    voicing:         str = "smooth"
    rhythm:          str = "block"
    bass_pattern:    str = "root"
    drum_pattern:    str = "backbeat"
    effect_preset:   str = "warm"
    bpm:             float = 110.0


def render_song_form(
    sections: List[Section],
    output_path: str,
    defaults: Optional[SongFormDefaults] = None,
    chord_octave: int = 4,
    bass_octave: int = 2,
    crossfade_seconds: float = 0.15,
):
    """Render each section through ``arrangement.render_song`` with that
    section's own settings, then concatenate the resulting audio buffers
    with a small crossfade so the section boundaries don't click.

    Returns the output path on success.
    """
    # Lazy-import so songform.py can be imported (and unit-tested)
    # without numpy/scipy.
    import numpy as np
    from scipy.io import wavfile
    import tempfile, os
    from arrangement import render_song
    from sequencer import SynthSettings

    if defaults is None:
        defaults = SongFormDefaults()

    sr = SynthSettings().sample_rate
    crossfade_samples = max(1, int(crossfade_seconds * sr))

    # Render each section to its own temp WAV, then read back and stitch.
    section_audios: List[np.ndarray] = []
    tmpfiles: List[str] = []
    try:
        for sec in sections:
            chords = _chords_for_section(sec)
            f = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
            f.close()
            tmpfiles.append(f.name)
            render_song(
                chords, f.name,
                bpm=defaults.bpm,
                beats_per_chord=sec.beats_per_chord,
                chord_octave=chord_octave,
                chord_voicing=sec.voicing or defaults.voicing,
                chord_rhythm=sec.rhythm or defaults.rhythm,
                bass_pattern=(sec.bass_pattern if sec.bass_pattern is not None
                              else defaults.bass_pattern),
                bass_octave=bass_octave,
                drum_pattern=(sec.drum_pattern if sec.drum_pattern is not None
                              else defaults.drum_pattern),
                effect_preset=sec.effect_preset or defaults.effect_preset,
            )
            _, data = wavfile.read(f.name)
            section_audios.append(data.astype(np.float32) / 32767.0)

        # Stitch with crossfade
        if not section_audios:
            return output_path

        # Decide channel layout, if any section is stereo, all become stereo
        any_stereo = any(a.ndim == 2 for a in section_audios)
        normalised: List[np.ndarray] = []
        for a in section_audios:
            if any_stereo and a.ndim == 1:
                a = np.stack([a, a], axis=1)
            elif not any_stereo and a.ndim == 2:
                a = a.mean(axis=1)
            normalised.append(a)

        out = normalised[0]
        for nxt in normalised[1:]:
            n = min(crossfade_samples, len(out), len(nxt))
            if n > 0:
                fade_out = np.linspace(1.0, 0.0, n)
                fade_in  = np.linspace(0.0, 1.0, n)
                if out.ndim == 2:
                    fade_out = fade_out[:, None]
                    fade_in  = fade_in[:, None]
                tail = out[-n:] * fade_out + nxt[:n] * fade_in
                out = np.concatenate([out[:-n], tail, nxt[n:]])
            else:
                out = np.concatenate([out, nxt])

        # Clip + write
        out = np.clip(out, -1.0, 1.0)
        out_int16 = (out * 32767).astype(np.int16)
        wavfile.write(output_path, sr, out_int16)
        return output_path
    finally:
        for path in tmpfiles:
            try:
                os.unlink(path)
            except OSError:
                pass


# ── A couple of canned song forms for quick demos ───────────────────────────

def make_aaba(key_root: int = 0, bpm: float = 110.0) -> List[Section]:
    """Classic 32-bar AABA form: A (verse) x2, B (bridge), A (verse).

    Each A section is in the home key; B modulates to the relative
    minor for contrast.  Useful as a jumping-off point.
    """
    relative_minor = (key_root + 9) % 12
    A = Section(name="A", key_root=key_root, scale_name="major",
                template="I-V-vi-IV", bars=8,
                bass_pattern="root", drum_pattern="backbeat")
    B = Section(name="B", key_root=relative_minor, scale_name="natural_minor",
                template="vi-IV-I-V", bars=8,
                bass_pattern="walking", drum_pattern="half_time",
                effect_preset="ambient")
    return [replace(A, name="A1"), replace(A, name="A2"), B,
            replace(A, name="A3")]


def make_verse_chorus(key_root: int = 0, bpm: float = 110.0) -> List[Section]:
    """Verse / chorus / verse / chorus form, with a key contrast on the
    chorus (up a perfect fourth, the classic "lift")."""
    chorus_key = (key_root + 5) % 12
    verse = Section(name="verse", key_root=key_root, scale_name="major",
                    template="vi-IV-I-V", bars=8,
                    bass_pattern="root", drum_pattern="backbeat",
                    effect_preset="warm")
    chorus = Section(name="chorus", key_root=chorus_key, scale_name="major",
                     template="I-V-vi-IV", bars=8,
                     bass_pattern="walking", drum_pattern="rock",
                     effect_preset="bright")
    return [replace(verse, name="verse1"), replace(chorus, name="chorus1"),
            replace(verse, name="verse2"), replace(chorus, name="chorus2")]

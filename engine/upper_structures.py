"""
Upper structures, jazz ii–V–I voicings split between left and right hand.

Each progression generates three chords; each chord is voiced as an LH
"shell" (root + a couple of guide tones) plus an RH "upper structure"
(usually a triad) sitting above.  The combination spells a colourful
extended/altered chord without ever stating every note.

This module lives one layer above ``music_theory`` (pitch classes only,
pure stdlib) and is consumed by:
  • ``app.py``'s Theory submenu
  • ``gui/upper_structures_tab.py`` (PySide6 tab)
  • ``chordgen.server``'s ``upper_structures`` JSON-RPC op

The voicing formulas live in ``MAJOR_INTERVALS`` / ``MINOR_INTERVALS`` as
a ``role -> [variant]`` registry so any role can expose multiple
upper-structure choices.  The minor V currently exposes two: the
traditional bII major triad (Ab over G) and a darker bII minor triad
(Ab minor over G).
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional, Tuple

from music_theory import note_name


# ── Scale-name → mode mapping ───────────────────────────────────────────────

# Scales whose tonic chord sits comfortably under the major ii–V–I formulas.
# Lydian/mixolydian aren't strictly "major" but their tonic and dominant chords
# still take the major-flavoured upper structures musically; treating them as
# major keeps the panel useful instead of silent.
MAJOR_LIKE_SCALES = frozenset({
    "major", "lydian", "mixolydian", "pentatonic_major",
})

# Scales that map to the minor iiø–V7alt–i formulas.  Aeolian is a defensive
# alias for natural_minor (the codebase uses the latter, but external callers
# might pass the former).
MINOR_LIKE_SCALES = frozenset({
    "natural_minor", "harmonic_minor", "melodic_minor",
    "dorian", "phrygian", "aeolian", "locrian", "pentatonic_minor",
})


def is_minor_scale(scale_name: str) -> Optional[bool]:
    """Return True for minor-flavoured scales, False for major-flavoured,
    None for scales we have no upper-structure mapping for (blues, chromatic,
    anything unknown).  Callers use ``None`` to show a "scale not supported"
    fallback rather than rendering wrong voicings.
    """
    if scale_name in MAJOR_LIKE_SCALES:
        return False
    if scale_name in MINOR_LIKE_SCALES:
        return True
    return None


# ── Progression-chord → role mapping ────────────────────────────────────────

# Semitone offset from the key root → role label.  Quality is intentionally
# not checked: a borrowed Cmaj in a Cm key still maps to "i" because the
# UI's job here is "show me the upper structure that fits this scale degree,"
# not "perform full Roman-numeral analysis."
_ROLE_FROM_OFFSET_MAJOR: Dict[int, str] = {0: "I", 2: "ii", 7: "V"}
_ROLE_FROM_OFFSET_MINOR: Dict[int, str] = {0: "i", 2: "ii", 7: "V"}


def role_for_progression_chord(chord_root_pc: int, key_root_pc: int,
                                *, minor: bool) -> Optional[str]:
    """Map a chord-root pitch class to its ii / V / I (or i) role within
    a key, or None if the offset has no defined upper structure.
    """
    offset = (chord_root_pc - key_root_pc) % 12
    table = _ROLE_FROM_OFFSET_MINOR if minor else _ROLE_FROM_OFFSET_MAJOR
    return table.get(offset)


# ── Voicing registry ────────────────────────────────────────────────────────

# (chord_suffix, variant_label, lh_intervals, rh_intervals).
# Intervals are semitones from the CHORD'S own root (not the key root).
Variant = Tuple[str, str, Tuple[int, ...], Tuple[int, ...]]

MAJOR_INTERVALS: Dict[str, List[Variant]] = {
    # ii — Minor 13.  LH: root, b3, b7.  RH: 9, 11, 13 (II major triad).
    "ii": [("m13",       "ii (Minor 13)",        (0, 3, 10), (2, 5, 9))],
    # V  — Altered (7#9#5).  LH: root, b7, 3.  RH: b13, root, #9
    #      (bVI major triad over V — Eb major over G7).
    "V":  [("7#9#5",     "V (Altered, US bVI)",  (0, 10, 4), (8, 0, 3))],
    # I  — Lydian major 13.  LH: root, 3, 7.  RH: 9, #11, 13
    #      (II major triad over I — D major over Cmaj7).
    "I":  [("maj13#11",  "I (Maj 13#11)",        (0, 4, 11), (2, 6, 9))],
}

MINOR_INTERVALS: Dict[str, List[Variant]] = {
    # iiø — Half-diminished with extensions.  LH: root, b5, b7.
    #       RH: 9, 11, b13.  Over D this gives E-G-Bb, an E diminished
    #       triad above the D root — the classic "Locrian natural 2"
    #       colour.  (b13 = 8 semitones up, NOT 9 which would be natural 13.)
    "ii": [("ø11",  "iiø (Locrian nat 2)",       (0, 6, 10), (2, 5, 8))],
    # V  — Altered dominant.  Two flavours:
    #      0 (default): traditional US bII = Ab major over G  → b9, 11, b13
    #      1 (alt):     US bII minor       = Ab minor over G  → b9,  3, b13
    "V":  [("7alt",  "V7alt (US bII major)",     (0, 10, 4), (1, 5, 8)),
           ("7alt",  "V7alt (US bII minor)",     (0, 10, 4), (1, 4, 8))],
    # i  — Minor-major 9 with added 6.  LH: root, b3, maj7.  RH: 9, 5, 6.
    "i":  [("mMaj9/6", "i (Minor-Major 9/6)",    (0, 3, 11), (2, 7, 9))],
}

ROLES_MAJOR: Tuple[str, ...] = ("ii", "V", "I")
ROLES_MINOR: Tuple[str, ...] = ("ii", "V", "i")


# ── Building chord roots ────────────────────────────────────────────────────

def chord_roots_ii_v_i(key_root: int, *, minor: bool = False) -> List[int]:
    """Return the three chord-root pitch classes for a ii–V–(i|I) in
    ``key_root`` (a pitch class 0–11).

    The same offsets apply in major and (natural) minor: ii is +2
    semitones, V is +7, tonic is the key root itself.  The chord *quality*
    differs by mode (minor → iiø, V7alt, i) but the chord *roots* don't.
    """
    return [(key_root + 2) % 12, (key_root + 7) % 12, key_root % 12]


# ── MIDI conversion ─────────────────────────────────────────────────────────

def _to_midi(chord_root: int, intervals: Tuple[int, ...], octave: int) -> List[int]:
    """Convert a chord-root + interval list into ascending MIDI notes
    anchored in ``octave``.

    MIDI formula matches the rest of the project: ``(octave+1)*12 + pc``.
    After the initial placement we bump each note up by octaves only as
    needed to keep the voicing strictly ascending — handy for shells like
    (root, b7, 3) where the third would otherwise land below the seventh.
    """
    base = (octave + 1) * 12 + chord_root
    notes = [base + ivl for ivl in intervals]
    for i in range(1, len(notes)):
        while notes[i] <= notes[i - 1]:
            notes[i] += 12
    return notes


# ── Public API ──────────────────────────────────────────────────────────────

def _intervals_for(minor: bool) -> Dict[str, List[Variant]]:
    return MINOR_INTERVALS if minor else MAJOR_INTERVALS


def _roles_for(minor: bool) -> Tuple[str, ...]:
    return ROLES_MINOR if minor else ROLES_MAJOR


def upper_structure_voicing(key_root: int, role: str, *,
                            minor: bool = False, variant: int = 0,
                            octave_lh: int = 3, octave_rh: int = 4
                            ) -> Tuple[List[int], List[int]]:
    """Return ``(lh_midi, rh_midi)`` for one role+variant of a ii–V–I.

    ``role`` is one of ``"ii"``, ``"V"``, ``"I"`` (major) or ``"ii"``,
    ``"V"``, ``"i"`` (minor).  ``variant`` indexes into the role's list
    in the registry; defaults to ``0`` (the first / "default" variant).
    """
    table = _intervals_for(minor)
    if role not in table:
        raise ValueError(
            f"unknown role {role!r} for {'minor' if minor else 'major'}; "
            f"available: {list(table)}"
        )
    variants = table[role]
    if not 0 <= variant < len(variants):
        raise ValueError(
            f"variant index {variant} out of range for role {role!r} "
            f"(0..{len(variants) - 1})"
        )
    roles = _roles_for(minor)
    chord_root = chord_roots_ii_v_i(key_root, minor=minor)[roles.index(role)]
    _, _, lh_intervals, rh_intervals = variants[variant]
    return (_to_midi(chord_root, lh_intervals, octave_lh),
            _to_midi(chord_root, rh_intervals, octave_rh))


def voice_ii_v_i(key_root: int, *, minor: bool = False,
                 octave_lh: int = 3, octave_rh: int = 4,
                 use_flats: bool = True
                 ) -> List[Dict[str, Any]]:
    """Return a list of 3 dicts, one per role, carrying ALL variants:

    ``[{"role": "ii", "chord_root": 2, "chord_root_name": "D",
        "variants": [{"suffix": "m13", "label": "...",
                      "chord_name": "Dm13",
                      "lh": [...], "rh": [...],
                      "lh_names": [...], "rh_names": [...]}, ...]},
       ...]``

    Callers (CLI, GUI, JSON-RPC) decide which variant to display.
    """
    table = _intervals_for(minor)
    roles = _roles_for(minor)
    chord_roots = chord_roots_ii_v_i(key_root, minor=minor)

    out: List[Dict[str, Any]] = []
    for role, chord_root in zip(roles, chord_roots):
        chord_root_name = note_name(chord_root, use_flats=use_flats)
        variants_out: List[Dict[str, Any]] = []
        for suffix, label, lh_intervals, rh_intervals in table[role]:
            lh = _to_midi(chord_root, lh_intervals, octave_lh)
            rh = _to_midi(chord_root, rh_intervals, octave_rh)
            variants_out.append({
                "suffix":     suffix,
                "label":      label,
                "chord_name": f"{chord_root_name}{suffix}",
                "lh":         lh,
                "rh":         rh,
                "lh_names":   [note_name(n % 12, use_flats=use_flats) for n in lh],
                "rh_names":   [note_name(n % 12, use_flats=use_flats) for n in rh],
            })
        out.append({
            "role":            role,
            "chord_root":      chord_root,
            "chord_root_name": chord_root_name,
            "variants":        variants_out,
        })
    return out


# ── Pretty-printing ─────────────────────────────────────────────────────────

def format_ii_v_i(key_root: int, *, minor: bool = False,
                  use_flats: bool = True) -> str:
    """Pretty text block for one key, matching the style of the original
    standalone script but extended for minor keys and multi-variant roles.
    """
    key_name = note_name(key_root, use_flats=use_flats)
    mode_label = "iiø–V7alt–i (minor)" if minor else "ii–V–I (major)"
    lines: List[str] = [f"--- Upper structures in {key_name}: {mode_label} ---"]
    for chord in voice_ii_v_i(key_root, minor=minor,
                              use_flats=use_flats):
        lines.append("")
        for v in chord["variants"]:
            lines.append(f"{chord['role']:<3}-> {v['chord_name']}    [{v['label']}]")
            lines.append(f"     LH:  {' - '.join(v['lh_names'])}")
            lines.append(f"     RH:  {' - '.join(v['rh_names'])}")
    return "\n".join(lines) + "\n"


def format_all_keys(*, minor: bool = False, use_flats: bool = True) -> str:
    """Concatenated text blocks for all 12 keys."""
    blocks = [format_ii_v_i(k, minor=minor, use_flats=use_flats)
              for k in range(12)]
    return "\n".join(blocks)

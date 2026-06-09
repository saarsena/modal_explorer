"""
chordgen, the public API surface for the Composition Aide engine.

This package exists so external clients (a Bubble Tea TUI, a Godot
front-end, anything spawning a Python subprocess) have a single
namespace to import from regardless of how the underlying modules
are organised at the repo root.

The actual implementation lives in the top-level modules
(music_theory, voicing, sequencer, arrangement, melody, dsp_effects,
visualization, analyzer, songform, app).  This package just
re-exports the bits a front-end is most likely to need; the JSON-RPC
server in chordgen.server is the recommended way for non-Python
clients to call in.
"""

from __future__ import annotations

# Theory (pure stdlib, always importable)
from music_theory import (
    Chord, Scale,
    NOTE_NAMES_SHARP, NOTE_NAMES_FLAT, INTERVAL_NAMES,
    CHORD_QUALITIES, CHORD_SUFFIX_TO_QUALITY,
    SCALE_PATTERNS, PROGRESSION_TEMPLATES, ROMAN,
    note_name, pitch_class, interval_between,
    frequency, frequency_ratio, circle_of_fifths_distance,
    voice_leading_cost, pitch_class_set_info,
    progression_tension_profile,
    build_diatonic_chords, generate_progression, random_progression,
    parse_roman, secondary_dominant, borrow_from_parallel,
    recognize_chord,
)
from voicing import (
    voice_close, voice_drop2, voice_shell, voice_smooth,
    voice_chord, voice_progression, VOICING_NAMES,
)
from analyzer import (
    KeyCandidate, infer_key, roman_for_chord,
    Substitution, suggest_substitutions,
    ProgressionAnalysis, analyze, analyze_chord_names,
)
from songform import (
    Section, ComposedSong, compose,
    SongFormDefaults, render_song_form,
    make_aaba, make_verse_chorus,
)
from upper_structures import (
    MAJOR_INTERVALS, MINOR_INTERVALS, ROLES_MAJOR, ROLES_MINOR,
    MAJOR_LIKE_SCALES, MINOR_LIKE_SCALES,
    chord_roots_ii_v_i, upper_structure_voicing,
    voice_ii_v_i, format_ii_v_i, format_all_keys,
    is_minor_scale, role_for_progression_chord,
)

__version__ = "0.1.0"

__all__ = [
    # Versioning
    "__version__",
    # Theory
    "Chord", "Scale",
    "NOTE_NAMES_SHARP", "NOTE_NAMES_FLAT", "INTERVAL_NAMES",
    "CHORD_QUALITIES", "CHORD_SUFFIX_TO_QUALITY",
    "SCALE_PATTERNS", "PROGRESSION_TEMPLATES", "ROMAN",
    "note_name", "pitch_class", "interval_between",
    "frequency", "frequency_ratio", "circle_of_fifths_distance",
    "voice_leading_cost", "pitch_class_set_info",
    "progression_tension_profile",
    "build_diatonic_chords", "generate_progression", "random_progression",
    "parse_roman", "secondary_dominant", "borrow_from_parallel",
    "recognize_chord",
    # Voicing
    "voice_close", "voice_drop2", "voice_shell", "voice_smooth",
    "voice_chord", "voice_progression", "VOICING_NAMES",
    # Analyzer
    "KeyCandidate", "infer_key", "roman_for_chord",
    "Substitution", "suggest_substitutions",
    "ProgressionAnalysis", "analyze", "analyze_chord_names",
    # Songform
    "Section", "ComposedSong", "compose",
    "SongFormDefaults", "render_song_form",
    "make_aaba", "make_verse_chorus",
    # Upper structures
    "MAJOR_INTERVALS", "MINOR_INTERVALS", "ROLES_MAJOR", "ROLES_MINOR",
    "MAJOR_LIKE_SCALES", "MINOR_LIKE_SCALES",
    "chord_roots_ii_v_i", "upper_structure_voicing",
    "voice_ii_v_i", "format_ii_v_i", "format_all_keys",
    "is_minor_scale", "role_for_progression_chord",
]

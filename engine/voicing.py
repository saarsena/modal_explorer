"""
Voicing, turning abstract Chords into concrete MIDI note numbers.

This module sits one layer above ``music_theory`` (which deals only in
pitch classes 0–11) and one layer below the sequencer (which deals in
audio samples).  Its single job: pick which octave each chord tone
sounds in.

Strategies provided:

  • close:  tightly stacked above the root (the default; matches the
            behaviour the sequencer always had)
  • drop2:  the second-from-top voice dropped one octave (open voicing,
            common on jazz guitar / piano)
  • shell:  root + 3rd + 7th only ("guide tones"), 5th omitted
  • smooth: given the previous chord's notes, pick the inversion +
            octave for the new chord that minimises total semitone
            movement between voices

The module is pure stdlib (same dependency rule as ``music_theory``)
so anything in the project can import it freely.
"""

from __future__ import annotations

from typing import List, Optional, Callable, Dict

from music_theory import Chord


# ── Core close voicing (canonical ascending stack) ──────────────────────────

def voice_close(chord: Chord, octave: int = 4) -> List[int]:
    """Stack chord tones tightly above the root.

    MIDI note = (octave + 1) * 12 + pitch_class.  Each successive tone
    is bumped up by octaves until it sits strictly above the previous,
    which guarantees an ascending voicing even after inversion rotates
    the pitch-class list.
    """
    base = (octave + 1) * 12
    notes: List[int] = []
    prev = -1
    for pc in chord.pitch_classes:
        midi_note = base + pc
        while midi_note <= prev:
            midi_note += 12
        notes.append(midi_note)
        prev = midi_note
    return notes


# ── Drop-2 ──────────────────────────────────────────────────────────────────

def voice_drop2(chord: Chord, octave: int = 4) -> List[int]:
    """Drop-2 voicing: the second-from-top voice is dropped one octave.

    For a four-note chord this opens the voicing and gives a wider,
    more balanced spread (the canonical jazz-guitar / piano "open"
    voicing).  For a triad we drop the middle voice for a similar
    open-position effect.
    """
    notes = voice_close(chord, octave)
    if len(notes) >= 4:
        notes[-2] -= 12
    elif len(notes) == 3:
        notes[1] -= 12
    notes.sort()
    return notes


# ── Shell ───────────────────────────────────────────────────────────────────

def voice_shell(chord: Chord, octave: int = 4) -> List[int]:
    """Root + 3rd + 7th only, the "guide tones" that define a chord's
    tonality.  The 5th carries no harmonic information that can't be
    inferred, so jazz comping often omits it to leave room for bass and
    melody.

    Triads (no 7th) fall back to root + 3rd.
    """
    intervals = chord.intervals
    base = (octave + 1) * 12
    notes = [base + chord.root]
    if len(intervals) >= 2:
        notes.append(base + (chord.root + intervals[1]) % 12)   # 3rd / 2nd / 4th
    if len(intervals) >= 4:
        notes.append(base + (chord.root + intervals[3]) % 12)   # 7th
    # Enforce ascending
    for i in range(1, len(notes)):
        while notes[i] <= notes[i - 1]:
            notes[i] += 12
    return notes


# ── Smooth voice leading ────────────────────────────────────────────────────

def _midi_voice_leading_cost(prev: List[int], curr: List[int]) -> int:
    """Total semitone movement between two voicings.

    We pad the shorter list with its top note so a triad → seventh
    transition (or vice versa) doesn't get a free zero on the missing
    voice.  Voices are paired highest-to-highest, lowest-to-lowest after
    sorting, a good approximation for typical 3-/4-voice chords without
    needing an O(n!) optimal-assignment solver.
    """
    if not prev or not curr:
        return 0
    p = sorted(prev)
    c = sorted(curr)
    while len(p) < len(c):
        p.append(p[-1])
    while len(c) < len(p):
        c.append(c[-1])
    return sum(abs(a - b) for a, b in zip(p, c))


def voice_smooth(chord: Chord, prev_notes: Optional[List[int]] = None,
                 octave: int = 4) -> List[int]:
    """Choose the inversion + octave for ``chord`` whose voicing sits
    closest to ``prev_notes`` by total semitone movement.

    The first chord in a progression has no previous notes, so it falls
    back to a plain close voicing in the requested octave.
    """
    if not prev_notes:
        return voice_close(chord, octave)

    # Centre our search around the previous chord's average pitch
    avg_prev = sum(prev_notes) / len(prev_notes)
    base_octave = int(round((avg_prev / 12) - 1))

    best: Optional[List[int]] = None
    best_cost = float("inf")
    n_inversions = max(len(chord.intervals), 1)

    for inv in range(n_inversions):
        rotated = Chord(chord.root, chord.quality, inversion=inv)
        for oct_offset in (-1, 0, 1):
            candidate = voice_close(rotated, base_octave + oct_offset)
            cost = _midi_voice_leading_cost(prev_notes, candidate)
            if cost < best_cost:
                best_cost = cost
                best = candidate

    return best if best is not None else voice_close(chord, octave)


# ── Strategy dispatch ───────────────────────────────────────────────────────

VOICING_STRATEGIES: Dict[str, Callable[[Chord, int], List[int]]] = {
    "close": voice_close,
    "drop2": voice_drop2,
    "shell": voice_shell,
}


def voice_chord(chord: Chord, octave: int = 4, strategy: str = "close",
                prev_notes: Optional[List[int]] = None) -> List[int]:
    """Dispatch to a named voicing strategy.

    ``strategy="smooth"`` requires ``prev_notes`` for context (it falls
    back to ``close`` when none is supplied).
    """
    if strategy == "smooth":
        return voice_smooth(chord, prev_notes, octave)
    if strategy not in VOICING_STRATEGIES:
        raise ValueError(
            f"unknown voicing strategy: {strategy!r}. "
            f"Available: {sorted(set(VOICING_STRATEGIES) | {'smooth'})}"
        )
    return VOICING_STRATEGIES[strategy](chord, octave)


def voice_progression(chords: List[Chord], octave: int = 4,
                      strategy: str = "close") -> List[List[int]]:
    """Voice an entire progression.  When ``strategy="smooth"``, each
    chord's voicing is chosen relative to the previous chord's voicing,
    producing a connected, classical-style line."""
    out: List[List[int]] = []
    prev: Optional[List[int]] = None
    for chord in chords:
        notes = voice_chord(chord, octave=octave,
                            strategy=strategy, prev_notes=prev)
        out.append(notes)
        prev = notes
    return out


VOICING_NAMES = sorted(set(VOICING_STRATEGIES) | {"smooth"})

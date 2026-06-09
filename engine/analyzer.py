"""
analyzer.py: Take a list of Chord objects and tell the user what they
are looking at: inferred key, Roman-numeral analysis, voice-leading
costs, tension profile, and substitution suggestions.

The whole module is pure stdlib and consumes only ``music_theory``
types, so it can sit alongside ``voicing.py`` in the no-numpy tier of
the dependency graph.

Key inference uses a scale-membership scoring heuristic:

  for each candidate key (12 majors + 12 natural minors):
      score = sum_over_chords( membership_score(chord, key) )
      score += first/last-tonic bonus
  return key with highest score (ties broken by major preference)

This is deliberately transparent, a TUI can display the score for
each candidate so the user knows whether they're looking at "obviously
C major" or "C major narrowly beat A minor".
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Optional, Tuple, Dict

from music_theory import (
    Chord, Scale, NOTE_NAMES_SHARP, ROMAN,
    note_name, build_diatonic_chords, circle_of_fifths_distance,
    voice_leading_cost, progression_tension_profile,
    secondary_dominant, borrow_from_parallel,
)


# ── Key inference ────────────────────────────────────────────────────────────

# Candidate keys searched: the 12 majors + 12 natural minors.  Adding more
# modes (dorian, mixolydian) tends to tie with a parent major and confuse
# the result more than it helps; we leave that to the user's choice when
# they ask for analysis under a specific key.
_CANDIDATE_KEYS: List[Tuple[int, str]] = (
    [(pc, "major")        for pc in range(12)]
    + [(pc, "natural_minor") for pc in range(12)]
)


@dataclass
class KeyCandidate:
    """One scored candidate from key inference.

    ``score`` is a float so different scoring components can contribute
    fractional amounts (diatonic match = 1.0, tonic-anchor bonus = 0.5,
    etc.).  Higher is better.
    """
    root: int
    scale_name: str
    score: float
    diatonic_count: int
    total_chords: int

    @property
    def label(self) -> str:
        suffix = " minor" if self.scale_name == "natural_minor" else f" {self.scale_name}"
        return f"{note_name(self.root)}{suffix}"


def _chord_membership_score(chord: Chord, scale: Scale) -> float:
    """Score one chord against one candidate scale.

    1.0 if every pitch class of the chord lives in the scale (a
    fully-diatonic chord), proportional otherwise.  This means a borrowed
    chord with one out-of-scale note still contributes most of its weight,
    which keeps a single bVII or secondary dominant from flipping the
    inferred key.
    """
    pcs = chord.pitch_classes
    if not pcs:
        return 0.0
    in_scale = sum(1 for pc in pcs if scale.contains(pc))
    return in_scale / len(pcs)


def infer_key(chords: List[Chord], top_n: int = 3) -> List[KeyCandidate]:
    """Return the top-N most likely keys for a chord sequence, best first.

    Scoring:
      * +1.0 for every fully-diatonic chord (less for partial)
      * +0.5 if the first chord is the candidate's tonic
      * +0.5 if the last chord is the candidate's tonic
      * +0.25 if the candidate scale is major (mild bias toward major
        when major and relative-minor would otherwise tie, pop/jazz
        tends to land here, and the user can re-anchor by passing a
        scale explicitly)
    """
    if not chords:
        return []

    candidates: List[KeyCandidate] = []
    for root, scale_name in _CANDIDATE_KEYS:
        scale = Scale(root, scale_name)
        score = sum(_chord_membership_score(c, scale) for c in chords)
        diatonic_count = sum(
            1 for c in chords if _chord_membership_score(c, scale) == 1.0
        )
        if chords[0].root == root:
            score += 0.5
        if chords[-1].root == root:
            score += 0.5
        if scale_name == "major":
            score += 0.25
        candidates.append(KeyCandidate(
            root=root, scale_name=scale_name, score=round(score, 3),
            diatonic_count=diatonic_count, total_chords=len(chords),
        ))

    candidates.sort(key=lambda c: c.score, reverse=True)
    return candidates[:top_n]


# ── Roman-numeral labelling ─────────────────────────────────────────────────

def _label_diatonic_match(idx: int, dc: Chord) -> str:
    """Build the Roman-numeral string for a chord matched to a diatonic
    position; handles upper/lowercase by quality and quality suffix."""
    base = ROMAN[idx] if idx < len(ROMAN) else str(idx + 1)
    if dc.quality in ("minor", "diminished", "minor7", "half-dim7"):
        base = base.lower()
    if dc.quality == "diminished":
        base += "o"
    elif dc.quality == "half-dim7":
        base += "ø7"
    elif dc.quality == "dominant7":
        base += "7"
    elif dc.quality == "minor7":
        base += "7"
    elif dc.quality == "major7":
        base += "maj7"
    return base


def roman_for_chord(chord: Chord, scale: Scale,
                    sevenths_in_diatonic: bool = True) -> str:
    """Best-effort Roman-numeral label for a chord under a given key.

    We try matching against both the diatonic triads and the diatonic
    sevenths so a triad in a "sevenths" context (or vice versa) still
    gets recognised.  Falls back to borrowed-chord and secondary-dominant
    interpretations before giving up with a "?(...)" marker.
    """
    triads   = build_diatonic_chords(scale, sevenths=False)
    sevenths = build_diatonic_chords(scale, sevenths=True)

    # Try diatonic match first.  Order matters: match 7th-chords against
    # the sevenths set, triads against the triads set, so we don't label
    # a plain "C" as "Imaj7" just because "Cmaj7" sits in the same slot.
    for dc_list in (triads, sevenths):
        for i, dc in enumerate(dc_list):
            if dc.root == chord.root and dc.quality == chord.quality:
                return _label_diatonic_match(i, dc)

    # Borrowed-chord check: same scale degree from the parallel mode.
    parallel_name = "natural_minor" if scale.pattern_name == "major" else "major"
    parallel = Scale(scale.root, parallel_name)
    for sevenths_borrowed in (False, True):
        for i, pc in enumerate(build_diatonic_chords(parallel, sevenths=sevenths_borrowed)):
            if pc.root == chord.root and pc.quality == chord.quality:
                base = _label_diatonic_match(i, pc)
                # Strip the case-by-quality flip (we'll rebuild it below)
                # and add a "b" prefix for chromatic borrowed roots.
                if not scale.contains(chord.root):
                    # Strip leading lowercase if present, then prefix with "b"
                    base = "b" + base
                return base + " (borrowed)"

    # Secondary-dominant check: V or V7 of a diatonic target.
    if chord.quality in ("dominant7", "major"):
        for i, dc in enumerate(triads):
            if (chord.root + 5) % 12 == dc.root:
                target = ROMAN[i] if i < len(ROMAN) else str(i + 1)
                if dc.quality in ("minor", "diminished"):
                    target = target.lower()
                tag = "V7" if chord.quality == "dominant7" else "V"
                return f"{tag}/{target}"

    return f"?({chord.name})"


# ── Substitution suggestions ────────────────────────────────────────────────

@dataclass
class Substitution:
    """A single alternative chord the analyzer suggests for one position
    in a progression."""
    position: int            # index in the input progression
    original: Chord
    replacement: Chord
    rationale: str           # short human-readable reason


def suggest_substitutions(chords: List[Chord], key_root: int,
                          scale_name: str = "major") -> List[Substitution]:
    """Suggest ear-friendly substitutions at each chord position.

    Currently implemented:
      * tritone substitution for any dominant-7 chord
        (V7 -> bII7;  in C major: G7 -> Db7)
      * modal interchange swap for any major triad with a parallel-minor
        equivalent (and vice versa)
      * secondary dominant insertion before any diatonic chord that
        is a perfect-fifth target (preview of V7/X without removing the
        original chord)
    """
    scale = Scale(key_root, scale_name)
    diatonic_pcs = {c.root for c in build_diatonic_chords(scale)}
    out: List[Substitution] = []

    for i, chord in enumerate(chords):
        # --- Tritone substitution for dominant7 ---
        if chord.quality == "dominant7":
            tritone_root = (chord.root + 6) % 12
            sub = Chord(tritone_root, "dominant7")
            out.append(Substitution(
                position=i, original=chord, replacement=sub,
                rationale=f"tritone sub of {chord.name}: shares 3rd & 7th, "
                          f"resolves down a half-step",
            ))

        # --- Modal interchange ---
        # Find parallel-mode chord at the same scale degree, if any.
        parallel_name = "natural_minor" if scale.pattern_name == "major" else "major"
        parallel = Scale(scale.root, parallel_name)
        for deg, pc in enumerate(parallel.notes):
            if pc == chord.root:
                borrowed = borrow_from_parallel(scale, deg + 1)
                if borrowed.quality != chord.quality:
                    out.append(Substitution(
                        position=i, original=chord, replacement=borrowed,
                        rationale=f"borrowed from {parallel_name.replace('_', ' ')}: "
                                  f"swaps colour at the same scale degree",
                    ))
                break

        # --- Insert secondary dominant before the next diatonic target ---
        if i + 1 < len(chords) and chords[i + 1].root in diatonic_pcs:
            target = chords[i + 1]
            # Only suggest when the current chord ISN'T already its dominant
            v = secondary_dominant(target)
            if chord.quality != "dominant7" or chord.root != v.root:
                out.append(Substitution(
                    position=i, original=chord, replacement=v,
                    rationale=f"V7/{target.name}, secondary dominant that "
                              f"sets up the next chord with a strong cadence",
                ))

    return out


# ── End-to-end analysis ─────────────────────────────────────────────────────

@dataclass
class ProgressionAnalysis:
    """Full report on a chord sequence: inferred key, roman numerals,
    tension/voice-leading metrics, and substitution suggestions."""
    chords:          List[Chord]
    key_candidates:  List[KeyCandidate]
    inferred_key:    KeyCandidate
    roman_labels:    List[str]
    voice_leading:   List[int]      # cost between successive chords
    tension:         List[float]    # 0..1, normalised circle-of-fifths distance
    substitutions:   List[Substitution]

    def summary(self) -> str:
        """Plain-text one-screen summary, useful for a CLI/TUI dump."""
        lines = []
        lines.append(f"Inferred key: {self.inferred_key.label} "
                     f"(score {self.inferred_key.score}, "
                     f"{self.inferred_key.diatonic_count}/"
                     f"{self.inferred_key.total_chords} diatonic)")
        if len(self.key_candidates) > 1:
            alts = ", ".join(f"{k.label} ({k.score})"
                             for k in self.key_candidates[1:])
            lines.append(f"  alternatives: {alts}")
        lines.append("")
        lines.append(f"  {'#':>2}  {'chord':<10} {'roman':<14} {'tension':>7}  vl→")
        for i, c in enumerate(self.chords):
            vl = (self.voice_leading[i] if i < len(self.voice_leading) else "")
            lines.append(f"  {i+1:>2}  {c.name:<10} {self.roman_labels[i]:<14} "
                         f"{self.tension[i]:>7.2f}  {vl}")
        if self.substitutions:
            lines.append("")
            lines.append("Substitutions:")
            for s in self.substitutions:
                lines.append(f"  pos {s.position+1}: {s.original.name} → "
                             f"{s.replacement.name} , {s.rationale}")
        return "\n".join(lines)


def analyze(chords: List[Chord]) -> ProgressionAnalysis:
    """Run the whole analyzer pipeline on a chord sequence."""
    if not chords:
        raise ValueError("analyze() requires at least one chord")

    candidates = infer_key(chords, top_n=3)
    best = candidates[0]
    scale = Scale(best.root, best.scale_name)

    roman_labels = [roman_for_chord(c, scale) for c in chords]
    vl = [voice_leading_cost(chords[i], chords[i + 1])
          for i in range(len(chords) - 1)]
    tension = progression_tension_profile(chords, best.root)
    subs = suggest_substitutions(chords, best.root, best.scale_name)

    return ProgressionAnalysis(
        chords=chords,
        key_candidates=candidates,
        inferred_key=best,
        roman_labels=roman_labels,
        voice_leading=vl,
        tension=tension,
        substitutions=subs,
    )


def analyze_chord_names(names: List[str]) -> ProgressionAnalysis:
    """Convenience entry point: parse 'Cmaj7', 'Am7', ... then analyze."""
    chords = [Chord.from_name(n) for n in names]
    return analyze(chords)

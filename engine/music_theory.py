"""
Music Theory Engine, explores the mathematics behind chord progressions.

Core concepts modelled here:
  • Pitch classes as integers mod 12  (Z/12Z)
  • Intervals as semitone distances
  • Chords as sets of intervals from a root
  • Scales as ordered interval patterns
  • Chord progressions via Roman-numeral analysis and circle-of-fifths distances
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Tuple, Dict, Optional
import itertools, math, random, re

# ── constants ────────────────────────────────────────────────────────────────

NOTE_NAMES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
NOTE_NAMES_FLAT  = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]

INTERVAL_NAMES = {
    0: "unison", 1: "minor 2nd", 2: "major 2nd", 3: "minor 3rd",
    4: "major 3rd", 5: "perfect 4th", 6: "tritone", 7: "perfect 5th",
    8: "minor 6th", 9: "major 6th", 10: "minor 7th", 11: "major 7th",
}

# Interval vectors for common chord qualities (semitones from root).
# Multi-octave intervals (>11) are allowed for upper extensions like
# 9ths so close-position voicings put them in the correct register.
CHORD_QUALITIES: Dict[str, Tuple[int, ...]] = {
    # Triads
    "major":       (0, 4, 7),
    "minor":       (0, 3, 7),
    "diminished":  (0, 3, 6),
    "augmented":   (0, 4, 8),
    # Sixth chords (triad + major 6th)
    "major6":      (0, 4, 7, 9),
    "minor6":      (0, 3, 7, 9),
    # Sevenths
    "major7":      (0, 4, 7, 11),
    "minor7":      (0, 3, 7, 10),
    "dominant7":   (0, 4, 7, 10),
    "dim7":        (0, 3, 6, 9),
    "half-dim7":   (0, 3, 6, 10),
    # Ninths (note the 14 = octave + major 2nd; voice_close puts it up top)
    "major9":      (0, 4, 7, 11, 14),
    "minor9":      (0, 3, 7, 10, 14),
    "dominant9":   (0, 4, 7, 10, 14),
    # add9 = triad + 9 with NO 7th (different colour from a full ninth)
    "add9":        (0, 4, 7, 14),
    # Suspensions
    "sus2":        (0, 2, 7),
    "sus4":        (0, 5, 7),
}

# Mapping from chord-symbol suffix to internal quality name.
# Used by Chord.from_name and the Roman-numeral parser.  The keys are the
# bits that follow the root in conventional jazz/pop notation.
CHORD_SUFFIX_TO_QUALITY: Dict[str, str] = {
    "":      "major",
    "maj":   "major",
    "M":     "major",
    "m":     "minor",
    "min":   "minor",
    "-":     "minor",
    "dim":   "diminished",
    "o":     "diminished",
    "°":     "diminished",
    "aug":   "augmented",
    "+":     "augmented",
    "maj7":  "major7",
    "M7":    "major7",
    "Δ7":    "major7",
    "Δ":     "major7",
    "m7":    "minor7",
    "-7":    "minor7",
    "min7":  "minor7",
    "7":     "dominant7",
    "dom7":  "dominant7",
    "dim7":  "dim7",
    "o7":    "dim7",
    "°7":    "dim7",
    "ø":     "half-dim7",
    "ø7":    "half-dim7",
    "m7b5":  "half-dim7",
    "sus2":  "sus2",
    "sus4":  "sus4",
    # Sixths
    "6":     "major6",
    "maj6":  "major6",
    "m6":    "minor6",
    "min6":  "minor6",
    # Ninths
    "maj9":  "major9",
    "M9":    "major9",
    "m9":    "minor9",
    "min9":  "minor9",
    "9":     "dominant9",
    "dom9":  "dominant9",
    "add9":  "add9",
    "(add9)": "add9",
    "add2":  "add9",
}

# Scale interval patterns (in semitones between consecutive notes)
SCALE_PATTERNS: Dict[str, Tuple[int, ...]] = {
    "major":            (2, 2, 1, 2, 2, 2, 1),
    "natural_minor":    (2, 1, 2, 2, 1, 2, 2),
    "harmonic_minor":   (2, 1, 2, 2, 1, 3, 1),
    "melodic_minor":    (2, 1, 2, 2, 2, 2, 1),
    "dorian":           (2, 1, 2, 2, 2, 1, 2),
    "phrygian":         (1, 2, 2, 2, 1, 2, 2),
    "lydian":           (2, 2, 2, 1, 2, 2, 1),
    "mixolydian":       (2, 2, 1, 2, 2, 1, 2),
    "locrian":          (1, 2, 2, 1, 2, 2, 2),
    "pentatonic_major": (2, 2, 3, 2, 3),
    "pentatonic_minor": (3, 2, 2, 3, 2),
    "blues":            (3, 2, 1, 1, 3, 2),
    "chromatic":        (1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
}

# Roman numerals for diatonic chords (1-indexed)
ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"]

# ── helper functions ─────────────────────────────────────────────────────────

def note_name(pitch_class: int, use_flats: bool = False) -> str:
    """Return the name for a pitch class (0–11)."""
    names = NOTE_NAMES_FLAT if use_flats else NOTE_NAMES_SHARP
    return names[pitch_class % 12]


def pitch_class(name: str) -> int:
    """Convert a note name to its pitch class (0–11).

    Accepts both ASCII (C#, Bb) and Unicode (F♯, B♭) accidentals.
    """
    name = name.strip().replace("♯", "#").replace("♭", "b")
    for i, n in enumerate(NOTE_NAMES_SHARP):
        if n.upper() == name.upper():
            return i
    for i, n in enumerate(NOTE_NAMES_FLAT):
        if n.upper() == name.upper():
            return i
    raise ValueError(f"Unknown note: {name}")


def interval_between(a: int, b: int) -> int:
    """Semitone distance from pitch class a to b (ascending)."""
    return (b - a) % 12


def frequency_ratio(semitones: int) -> float:
    """Equal-temperament frequency ratio for a given interval in semitones.

    Based on 2^(n/12), the 12th root of 2 is the fundamental constant
    underlying equal temperament.
    """
    return 2 ** (semitones / 12)


def frequency(pitch_class: int, octave: int = 4) -> float:
    """Concert-pitch frequency (Hz) for a note.  A4 = 440 Hz."""
    semitones_from_a4 = (pitch_class - 9) + (octave - 4) * 12
    return 440.0 * (2 ** (semitones_from_a4 / 12))


def circle_of_fifths_distance(a: int, b: int) -> int:
    """Shortest distance around the circle of fifths between two pitch classes.

    The circle of fifths is generated by repeatedly adding 7 semitones (mod 12).
    This distance measures harmonic "closeness", adjacent keys on the circle
    share 6 of 7 diatonic notes.
    """
    # Position on the circle: multiply by 7 (the generator) mod 12
    pos_a = (a * 7) % 12
    pos_b = (b * 7) % 12
    clockwise = (pos_b - pos_a) % 12
    return min(clockwise, 12 - clockwise)


# ── Scale ────────────────────────────────────────────────────────────────────

@dataclass
class Scale:
    root: int                     # pitch class 0–11
    pattern_name: str             # key into SCALE_PATTERNS
    _notes: List[int] = field(init=False, repr=False)

    def __post_init__(self):
        pattern = SCALE_PATTERNS[self.pattern_name]
        notes = [self.root]
        for step in pattern:
            notes.append((notes[-1] + step) % 12)
        # Last note wraps to the octave (== root); drop it
        self._notes = notes[:-1] if notes[-1] == self.root else notes

    @property
    def notes(self) -> List[int]:
        return list(self._notes)

    @property
    def degree_count(self) -> int:
        return len(self._notes)

    def note_at_degree(self, degree: int) -> int:
        """1-indexed scale degree."""
        return self._notes[(degree - 1) % self.degree_count]

    def contains(self, pc: int) -> bool:
        return (pc % 12) in self._notes

    def interval_vector(self) -> List[int]:
        """The interval-class vector (IC vector) counts how many times each
        interval class 1–6 appears among all pairs of notes.  This is an
        important concept in pitch-class set theory (Allen Forte)."""
        counts = [0] * 7  # index 0 unused
        for i, j in itertools.combinations(self._notes, 2):
            diff = (j - i) % 12
            ic = min(diff, 12 - diff)
            counts[ic] += 1
        return counts[1:]  # return classes 1–6

    def display(self, use_flats: bool = False) -> str:
        return " ".join(note_name(n, use_flats) for n in self._notes)


# ── Chord ────────────────────────────────────────────────────────────────────

@dataclass
class Chord:
    root: int               # pitch class
    quality: str            # key into CHORD_QUALITIES
    inversion: int = 0      # 0 = root position, 1 = first inversion, …

    @property
    def intervals(self) -> Tuple[int, ...]:
        if self.quality in CHORD_QUALITIES:
            return CHORD_QUALITIES[self.quality]
        # Fallback: _match_quality emits "i1-i2-i3..." for unnamed patterns
        # (e.g. stacked thirds on a pentatonic scale).
        return tuple(int(x) for x in self.quality.split("-"))

    @property
    def pitch_classes(self) -> List[int]:
        pcs = [(self.root + iv) % 12 for iv in self.intervals]
        # Rotate for inversion
        return pcs[self.inversion:] + pcs[:self.inversion]

    @property
    def bass_note(self) -> int:
        """Pitch class of the lowest-sounding note (root in root position,
        the inversion-th chord tone otherwise)."""
        return self.pitch_classes[0]

    @property
    def name(self) -> str:
        suffix_map = {
            "major": "", "minor": "m", "diminished": "dim", "augmented": "aug",
            "major7": "maj7", "minor7": "m7", "dominant7": "7",
            "dim7": "dim7", "half-dim7": "m7b5", "sus2": "sus2", "sus4": "sus4",
            "major6": "6", "minor6": "m6",
            "major9": "maj9", "minor9": "m9", "dominant9": "9", "add9": "add9",
        }
        suffix = suffix_map.get(self.quality, self.quality)
        base = f"{note_name(self.root)}{suffix}"
        # Slash-chord notation when inverted and the bass differs from the root
        if self.inversion and self.bass_note != self.root:
            base += f"/{note_name(self.bass_note)}"
        return base

    @classmethod
    def from_name(cls, name: str) -> "Chord":
        """Parse a chord symbol like 'C', 'Cmaj7', 'F#m7', 'Bb7', 'Dm7b5', 'C/E'.

        Recognises both Unicode shorthand (Δ, °, ø) and ASCII variants.
        Slash-chord notation sets the inversion so the bass note matches.
        Raises ValueError on unparseable input.
        """
        name = name.strip()
        if not name:
            raise ValueError("empty chord name")

        # Slash chord, split off the bass note first
        bass_pc: Optional[int] = None
        if "/" in name:
            name, bass_str = name.split("/", 1)
            bass_pc = pitch_class(bass_str.strip())

        # Root note: 1 or 2 chars (C, C#, Db, F♯, etc.)
        if len(name) >= 2 and name[1] in "b#♭♯":
            root_str, suffix = name[:2], name[2:]
        else:
            root_str, suffix = name[:1], name[1:]

        try:
            root = pitch_class(root_str)
        except ValueError as e:
            raise ValueError(f"can't parse chord root from {name!r}: {e}")

        suffix = suffix.strip()
        if suffix in CHORD_SUFFIX_TO_QUALITY:
            quality = CHORD_SUFFIX_TO_QUALITY[suffix]
        elif re.fullmatch(r"\d+(?:-\d+)*", suffix):
            # Dashed-intervals literal, the format ``_match_quality``
            # emits when a stacked-thirds chord doesn't match any named
            # quality (e.g. degrees 1-3-5 of a chromatic scale yield
            # intervals "0-2-4").  Chord.intervals already round-trips
            # this format; here we just accept it as a chord name too.
            quality = suffix
        else:
            raise ValueError(f"unknown chord quality suffix: {suffix!r}")

        chord = cls(root=root, quality=quality)

        if bass_pc is not None:
            # Pick the inversion that puts the requested bass first.
            # If the bass isn't a chord tone, leave inversion at 0 (slash
            # chord with non-chord-tone bass, still valid notation, but we
            # don't model the extra bass note here).
            try:
                chord.inversion = chord.pitch_classes.index(bass_pc)
            except ValueError:
                pass
        return chord

    def consonance_score(self) -> float:
        """A rough consonance metric based on frequency ratios.

        Simple integer ratios (e.g. 3:2 for a perfect fifth) are perceived as
        more consonant.  We measure how close each interval's equal-temperament
        ratio is to the nearest simple ratio.
        """
        simple_ratios = [1/1, 16/15, 9/8, 6/5, 5/4, 4/3, 45/32,
                         3/2, 8/5, 5/3, 9/5, 15/8]
        score = 0.0
        for iv in self.intervals[1:]:  # skip unison
            et_ratio = frequency_ratio(iv)
            closest = min(simple_ratios, key=lambda r: abs(r - et_ratio))
            # Score by simplicity of the ratio (lower denominator = more consonant)
            # and closeness to just intonation
            deviation = abs(et_ratio - closest)
            score += 1.0 / (1.0 + deviation * 100)
        return round(score / max(len(self.intervals) - 1, 1), 3)

    def display(self, use_flats: bool = False) -> str:
        notes = " ".join(note_name(pc, use_flats) for pc in self.pitch_classes)
        return f"{self.name:8s}  [{notes}]"


# ── Diatonic chord builder ───────────────────────────────────────────────────

def build_diatonic_chords(scale: Scale, sevenths: bool = False) -> List[Chord]:
    """Build chords on each degree of a scale by stacking thirds.

    Stacking thirds means taking every other note from the scale starting at
    each degree.  For triads we take degrees 1-3-5; for sevenths 1-3-5-7.
    The resulting chord quality (major, minor, dim, …) is determined entirely
    by the intervals that emerge, this is the elegant math at work.
    """
    chords = []
    n = scale.degree_count
    for deg in range(n):
        root = scale._notes[deg]
        third = scale._notes[(deg + 2) % n]
        fifth = scale._notes[(deg + 4) % n]
        intervals = [0, interval_between(root, third), interval_between(root, fifth)]

        if sevenths:
            seventh = scale._notes[(deg + 6) % n]
            intervals.append(interval_between(root, seventh))

        # Determine quality from interval pattern
        intervals_tuple = tuple(intervals)
        quality = _match_quality(intervals_tuple)
        chords.append(Chord(root=root, quality=quality))
    return chords


def _match_quality(intervals: Tuple[int, ...]) -> str:
    """Match an interval set to a named chord quality."""
    for name, pattern in CHORD_QUALITIES.items():
        if intervals == pattern:
            return name
    # Fallback: return intervals as a string
    return "-".join(str(i) for i in intervals)


# ── Progression generation ───────────────────────────────────────────────────

# Common progression templates (Roman-numeral degrees, 1-indexed)
PROGRESSION_TEMPLATES: Dict[str, List[int]] = {
    "I-IV-V-I":            [1, 4, 5, 1],
    "I-V-vi-IV":           [1, 5, 6, 4],
    "ii-V-I":              [2, 5, 1],
    "I-vi-IV-V":           [1, 6, 4, 5],
    "I-IV-vi-V":           [1, 4, 6, 5],
    "vi-IV-I-V":           [6, 4, 1, 5],
    "I-V-IV-V":            [1, 5, 4, 5],
    "I-iii-IV-V":          [1, 3, 4, 5],
    "12-bar blues":        [1, 1, 1, 1, 4, 4, 1, 1, 5, 4, 1, 5],
    "Andalusian cadence":  [1, 7, 6, 5],
    "Pachelbel":           [1, 5, 6, 3, 4, 1, 4, 5],
    "Circle of fifths":    [1, 4, 7, 3, 6, 2, 5, 1],
}


def generate_progression(
    key_root: int,
    scale_name: str = "major",
    template_name: str = "I-V-vi-IV",
    sevenths: bool = False,
) -> List[Chord]:
    """Generate a chord progression from a template in a given key."""
    scale = Scale(key_root, scale_name)
    diatonic = build_diatonic_chords(scale, sevenths=sevenths)
    degrees = PROGRESSION_TEMPLATES[template_name]
    return [diatonic[(d - 1) % len(diatonic)] for d in degrees]


def progression_tension_profile(chords: List[Chord], key_root: int) -> List[float]:
    """Compute a 'tension' value for each chord relative to the tonic.

    Tension is modelled as the circle-of-fifths distance from the chord root
    to the key root, normalised to [0, 1].  This captures how harmonically
    "far" each chord feels from home.
    """
    return [circle_of_fifths_distance(key_root, c.root) / 6.0 for c in chords]


def voice_leading_cost(a: Chord, b: Chord) -> int:
    """Total semitone movement needed for minimal voice leading between two chords.

    Good voice leading minimises movement, this is the mathematical basis for
    classical part-writing rules.  We compute the optimal assignment of voices
    using a greedy approach on pitch-class distance.
    """
    pcs_a = sorted(a.pitch_classes)
    pcs_b = sorted(b.pitch_classes)
    # Pad shorter to match length
    while len(pcs_a) < len(pcs_b):
        pcs_a.append(pcs_a[-1])
    while len(pcs_b) < len(pcs_a):
        pcs_b.append(pcs_b[-1])
    total = 0
    for pa, pb in zip(pcs_a, pcs_b):
        dist = abs(pb - pa)
        total += min(dist, 12 - dist)
    return total


# ── Mathematical analysis ────────────────────────────────────────────────────

def pitch_class_set_info(pcs: List[int]) -> Dict:
    """Analyse a pitch-class set using concepts from musical set theory.

    Returns prime form, interval-class vector, and symmetry information.
    """
    pcs = sorted(set(pc % 12 for pc in pcs))
    n = len(pcs)

    # Normal form: most compact rotation
    rotations = []
    for i in range(n):
        rotated = sorted([(pc - pcs[i]) % 12 for pc in pcs])
        rotations.append((rotated[-1], rotated, pcs[i]))
    rotations.sort(key=lambda x: (x[0], x[1]))
    normal = rotations[0][1]

    # Prime form: normal form transposed to start at 0
    prime = tuple(normal)

    # Interval-class vector
    ic_vector = [0] * 6
    for i, j in itertools.combinations(pcs, 2):
        diff = (j - i) % 12
        ic = min(diff, 12 - diff)
        if 1 <= ic <= 6:
            ic_vector[ic - 1] += 1

    # Transpositional symmetry
    t_symmetries = []
    for t in range(1, 12):
        transposed = sorted([(pc + t) % 12 for pc in pcs])
        if transposed == sorted(pcs):
            t_symmetries.append(t)

    # Inversional symmetry
    i_symmetries = []
    for idx in range(12):
        inverted = sorted([(idx - pc) % 12 for pc in pcs])
        if inverted == sorted(pcs):
            i_symmetries.append(idx)

    return {
        "pitch_classes": pcs,
        "prime_form": prime,
        "interval_class_vector": ic_vector,
        "transpositional_symmetries": t_symmetries,
        "inversional_symmetries": i_symmetries,
        "cardinality": n,
    }


# ── Random / creative generation ────────────────────────────────────────────

# ── Roman-numeral parsing & functional harmony ──────────────────────────────

# Roman-numeral string → 1-indexed scale-degree number
_ROMAN_TO_DEGREE: Dict[str, int] = {
    "I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7,
}

# Parallel mode for modal interchange (same tonic, different mode).
PARALLEL_MODE: Dict[str, str] = {
    "major":          "natural_minor",
    "natural_minor":  "major",
    "harmonic_minor": "major",
    "melodic_minor":  "major",
    "dorian":         "major",
    "mixolydian":     "major",
    "lydian":         "major",
    "phrygian":       "major",
    "locrian":        "major",
}


def parse_roman(roman: str, scale: Scale) -> Chord:
    """Parse a Roman-numeral chord symbol against a given scale.

    Examples (in C major):
      'I'      → C major          'V7'     → G7
      'vi'     → A minor          'iiø7'   → Dm7b5
      'bVII'   → Bb major         'V/V'    → D major (V of G)
      'V7/ii'  → A7  (V7 of Dm)   'iv'     → F minor (borrowed)

    The parser supports:
      • Accidental prefixes:  b / # (or Unicode ♭/♯)
      • Numerals 1–7, case sensitive (upper = major-by-default,
        lower = minor-by-default)
      • Quality suffixes from CHORD_SUFFIX_TO_QUALITY
      • Secondary chords:  '<numeral>/<numeral>' tonicises the second
        numeral and re-parses the first against that target's scale.
    """
    roman = roman.strip()
    if not roman:
        raise ValueError("empty roman numeral")

    # ── Secondary / applied chords (V/V, V7/ii, etc.) ───────────────────
    if "/" in roman:
        outer, inner = roman.split("/", 1)
        # Find the chord we're tonicising
        target = parse_roman(inner, scale)
        # Build a temporary scale rooted at the target.  Minor-quality
        # targets get a minor parallel; everything else gets major.  This
        # keeps "V/X" producing the conventional dominant-of-X regardless
        # of whether X itself is major or minor.
        target_mode = (
            "natural_minor"
            if target.quality in ("minor", "minor7", "diminished",
                                  "dim7", "half-dim7")
            else "major"
        )
        target_scale = Scale(target.root, target_mode)
        return parse_roman(outer, target_scale)

    # ── Accidentals ─────────────────────────────────────────────────────
    accidental = 0
    while roman and roman[0] in "b♭":
        accidental -= 1
        roman = roman[1:]
    while roman and roman[0] in "#♯":
        accidental += 1
        roman = roman[1:]

    # ── Numeral (longest match: VII, then VI/IV/III/II, then V/I) ───────
    numeral = ""
    for length in (3, 2, 1):
        candidate = roman[:length]
        if candidate.upper() in _ROMAN_TO_DEGREE:
            numeral = candidate
            roman = roman[length:]
            break
    if not numeral:
        raise ValueError(f"no roman numeral found in: {roman!r}")

    is_upper = numeral.isupper()
    degree = _ROMAN_TO_DEGREE[numeral.upper()]

    # ── Quality suffix ──────────────────────────────────────────────────
    suffix = roman.strip()
    if suffix == "":
        quality = "major" if is_upper else "minor"
    elif suffix == "7":
        quality = "dominant7" if is_upper else "minor7"
    elif suffix in CHORD_SUFFIX_TO_QUALITY:
        quality = CHORD_SUFFIX_TO_QUALITY[suffix]
    else:
        raise ValueError(f"unknown quality suffix in roman numeral: {suffix!r}")

    root = (scale.note_at_degree(degree) + accidental) % 12
    return Chord(root=root, quality=quality)


def secondary_dominant(target: Chord, sevenths: bool = True) -> Chord:
    """Return the dominant chord of `target` (the V or V7 of X).

    The dominant of any chord rooted at X is the chord whose root sits a
    perfect fifth (7 semitones) above X.  Defaulting to a dominant-7th
    voicing, because the tritone between the 3rd and 7th is what gives
    the V7 → I cadence its tonal pull.
    """
    return Chord(
        root=(target.root + 7) % 12,
        quality="dominant7" if sevenths else "major",
    )


def borrow_from_parallel(scale: Scale, degree: int,
                         sevenths: bool = False) -> Chord:
    """Return the diatonic chord at `degree` in the parallel mode.

    Modal interchange: borrow a chord from the mode that shares this
    tonic.  In C major, borrowing iv from C minor yields Fm, the
    classic "minor plagal" colour.  Borrowing bVII gives Bb major.
    """
    parallel_name = PARALLEL_MODE.get(scale.pattern_name)
    if parallel_name is None:
        raise ValueError(f"no parallel mode defined for {scale.pattern_name}")
    parallel = Scale(scale.root, parallel_name)
    chords = build_diatonic_chords(parallel, sevenths=sevenths)
    return chords[(degree - 1) % parallel.degree_count]


def recognize_chord(
    notes: List[int],
    *,
    top_n: int = 3,
) -> List[Tuple["float", "Chord"]]:
    """Identify the most likely chord(s) from MIDI notes or pitch classes.

    Accepts either MIDI note numbers (any octave) or raw pitch classes (0–11);
    all values are reduced mod 12 before matching.  When MIDI note numbers are
    supplied the lowest note is used to detect inversions.

    Scoring:  matched / (len(expected) + 0.5 * extra)
      matched  = pitch classes present in both the input and the chord template
      extra    = input pitch classes not covered by the chord template
    An exact match scores 1.0.  Larger chords that cover all input notes but
    have uncovered tones are penalised less than inputs with many unexplained notes.

    Returns up to *top_n* ``(score, Chord)`` pairs in descending score order.
    """
    if not notes:
        return []

    input_pcs: frozenset = frozenset(n % 12 for n in notes)
    bass_pc: int = min(notes) % 12

    results: List[Tuple[float, int, int, Chord]] = []  # (score, missing, root, chord)
    for root in range(12):
        for quality, intervals in CHORD_QUALITIES.items():
            expected_pcs: frozenset = frozenset((root + iv) % 12 for iv in intervals)

            matched = len(expected_pcs & input_pcs)
            if matched == 0:
                continue

            extra = len(input_pcs - expected_pcs)
            missing = len(expected_pcs - input_pcs)
            score = matched / (len(expected_pcs) + 0.5 * extra)

            chord = Chord(root=root, quality=quality)

            # Detect inversion: if the bass pitch class is a non-root chord tone
            if bass_pc in expected_pcs and bass_pc != root:
                try:
                    chord.inversion = chord.pitch_classes.index(bass_pc)
                except ValueError:
                    pass

            results.append((score, missing, root, chord))

    # Sort: best score first; ties broken by fewer missing tones, then root (C first)
    results.sort(key=lambda x: (-x[0], x[1], x[2]))

    # Deduplicate: (root, quality, inversion) uniquely identifies a chord spelling
    seen: set = set()
    unique: List[Tuple[float, Chord]] = []
    for score, _missing, _root, chord in results:
        key = (chord.root, chord.quality, chord.inversion)
        if key not in seen:
            seen.add(key)
            unique.append((score, chord))

    return unique[:top_n]


def random_progression(
    key_root: int,
    scale_name: str = "major",
    length: int = 4,
    sevenths: bool = False,
    prefer_consonant: bool = True,
) -> List[Chord]:
    """Generate a random but musically sensible progression.

    Uses weighted random selection biased toward chords that are closer
    on the circle of fifths (more consonant/related).
    """
    scale = Scale(key_root, scale_name)
    diatonic = build_diatonic_chords(scale, sevenths=sevenths)

    if prefer_consonant:
        weights = []
        for c in diatonic:
            dist = circle_of_fifths_distance(key_root, c.root)
            weights.append(1.0 / (1.0 + dist))
    else:
        weights = [1.0] * len(diatonic)

    return random.choices(diatonic, weights=weights, k=length)

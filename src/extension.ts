import {
  initialize,
  MidiClip,
  MidiTrack,
  ClipSlot,
  Scene,
  DataModelObject,
  type ActivationContext,
  type ArrangementSelection,
  type Handle,
  type NoteDescription,
} from "@ableton-extensions/sdk";

import { ChordgenEngine } from "./engine.js";
import * as path from "node:path";
import interfaceHtml from "./interface.html";
import resultsHtml from "./results.html";
import paletteHtml from "./palette.html";
import sessionmapHtml from "./sessionmap.html";
import transposeHtml from "./transpose.html";
import compatibleHtml from "./compatible.html";
import transposesessionHtml from "./transposesession.html";
import theoryMachineHtml from "./theory-machine.html";

// ── Wire-format types ────────────────────────────────────────────────────────

interface ChordJson {
  name: string;
  root: number;
  quality: string;
  inversion: number;
  pitch_classes: number[];
  intervals: number[];
  consonance: number;
}

interface RecognizeResult {
  input_pitch_classes: number[];
  bass_pc: number;
  matches: Array<{ chord: ChordJson; score: number }>;
}

interface KeyCandidateJson {
  root: number;
  scale: string;
  label: string;
  score: number;
}

interface AnalysisResult {
  inferred_key: KeyCandidateJson;
  roman_labels: string[];
  tension: number[];
  substitutions: Array<{
    position: number;
    original: ChordJson;
    replacement: ChordJson;
    rationale: string;
  }>;
  summary: string;
}

interface VoicingsResult {
  close: number[];
  drop2: number[];
  shell: number[];
}

interface DialogResult {
  key: number;
  keyName: string;
  scale: string;
  template: string;
  voicing: string;
  sevenths: boolean;
  snapToScale?: boolean;
}

type AnalyzeModalResult =
  | null
  | { action: "substitute"; position: number; original: string; replacement: string };

interface PaletteModalResult {
  action: "insert";
  chordName: string;
  length: number;
  voicing: "close" | "drop2" | "shell";
  octave: number;
  selectedScale: string;
}

interface SessionClipData {
  clipName: string;
  key: string | null;
  score: number;
}

interface SessionMapData {
  dominantKey: string | null;
  sceneCount: number;
  sceneNames: string[];
  totalMidiClips: number;
  analyzedClips: number;
  tracks: Array<{ name: string; clips: Array<SessionClipData | null> }>;
}

type KeyInfo = { root: number; scale: string; label: string };

type TransposeModalResult = { action: "transpose"; semitones: number };

type SessionTransposeResult = { action: "transpose"; semitones: number; recolor: boolean };

interface TheoryMachineResult {
  action: "writeClip";
  chords: Array<{ name: string; notes: number[] }>;
  beatsPerChord: number;
  totalBeats: number;
}

interface CompatibleClip {
  trackName: string;
  clipName: string;
  key: string;
  compatibility: string;
  color: number;
}

interface ProgressionSuggestion {
  relationship: string;
  keyLabel: string;
  template: string;
  chords: string[];
  color: number;
}

interface ClipSlotSelectionArg {
  selected_clip_slots: Handle[];
}

// ── Constants ─────────────────────────────────────────────────────────────────

const NOTE_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"] as const;

const ABLETON_SCALE_MAP: Record<string, string> = {
  "Major": "major",
  "Minor": "natural_minor",
  "Dorian": "dorian",
  "Phrygian": "phrygian",
  "Lydian": "lydian",
  "Mixolydian": "mixolydian",
  "Locrian": "locrian",
  "Harmonic Minor": "harmonic_minor",
  "Melodic Minor": "melodic_minor",
};

const NOTE_TO_PC: Readonly<Record<string, number>> = {
  "C":0,"C#":1,"Db":1,"D":2,"D#":3,"Eb":3,"E":4,"F":5,
  "F#":6,"Gb":6,"G":7,"G#":8,"Ab":8,"A":9,"A#":10,"Bb":10,"B":11,
};

// Chromatic pitch class → circle-of-fifths position (0 = C, 1 = G, 2 = D, …)
const COF_POS = [0,7,2,9,4,11,6,1,8,3,10,5] as const;

const MAJOR_SCALE_PCS          = [0, 2, 4, 5, 7, 9, 11] as const;
const MINOR_SCALE_PCS          = [0, 2, 3, 5, 7, 8, 10] as const;
const DORIAN_SCALE_PCS         = [0, 2, 3, 5, 7, 9, 10] as const;
const PHRYGIAN_SCALE_PCS       = [0, 1, 3, 5, 7, 8, 10] as const;
const LYDIAN_SCALE_PCS         = [0, 2, 4, 6, 7, 9, 11] as const;
const MIXOLYDIAN_SCALE_PCS     = [0, 2, 4, 5, 7, 9, 10] as const;
const LOCRIAN_SCALE_PCS        = [0, 1, 3, 5, 6, 8, 10] as const;
const HARMONIC_MINOR_SCALE_PCS = [0, 2, 3, 5, 7, 8, 11] as const;
const MELODIC_MINOR_SCALE_PCS  = [0, 2, 3, 5, 7, 9, 11] as const;
const PENTATONIC_MAJOR_PCS     = [0, 2, 4, 7, 9] as const;
const PENTATONIC_MINOR_PCS     = [0, 3, 5, 7, 10] as const;
const BLUES_SCALE_PCS          = [0, 3, 5, 6, 7, 10] as const;

const SCALE_PCS_MAP: Record<string, readonly number[]> = {
  major:            MAJOR_SCALE_PCS,
  natural_minor:    MINOR_SCALE_PCS,
  dorian:           DORIAN_SCALE_PCS,
  phrygian:         PHRYGIAN_SCALE_PCS,
  lydian:           LYDIAN_SCALE_PCS,
  mixolydian:       MIXOLYDIAN_SCALE_PCS,
  locrian:          LOCRIAN_SCALE_PCS,
  harmonic_minor:   HARMONIC_MINOR_SCALE_PCS,
  melodic_minor:    MELODIC_MINOR_SCALE_PCS,
  pentatonic_major: PENTATONIC_MAJOR_PCS,
  pentatonic_minor: PENTATONIC_MINOR_PCS,
  blues:            BLUES_SCALE_PCS,
};

const SCALE_DISPLAY_LABEL: Record<string, string> = {
  major:            "major",
  natural_minor:    "minor",
  dorian:           "Dorian",
  phrygian:         "Phrygian",
  lydian:           "Lydian",
  mixolydian:       "Mixolydian",
  locrian:          "Locrian",
  harmonic_minor:   "harmonic minor",
  melodic_minor:    "melodic minor",
  pentatonic_major: "pentatonic major",
  pentatonic_minor: "pentatonic minor",
  blues:            "blues",
};

const PALETTE_SCALES: Array<{ id: string; label: string }> = [
  { id: "major",            label: "Major" },
  { id: "natural_minor",    label: "Natural Minor" },
  { id: "dorian",           label: "Dorian" },
  { id: "phrygian",         label: "Phrygian" },
  { id: "lydian",           label: "Lydian" },
  { id: "mixolydian",       label: "Mixolydian" },
  { id: "locrian",          label: "Locrian" },
  { id: "harmonic_minor",   label: "Harmonic Minor" },
  { id: "melodic_minor",    label: "Melodic Minor" },
  { id: "pentatonic_major", label: "Pentatonic Major" },
  { id: "pentatonic_minor", label: "Pentatonic Minor" },
  { id: "blues",            label: "Blues" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function groupNotesByChord(
  notes: NoteDescription[],
  gridBeats = 0.25,
): Map<number, number[]> {
  const groups = new Map<number, number[]>();
  for (const note of notes) {
    const snapped = Math.round(note.startTime / gridBeats) * gridBeats;
    const key = Math.round(snapped * 1000);
    const existing = groups.get(key);
    if (existing) {
      existing.push(note.pitch);
    } else {
      groups.set(key, [note.pitch]);
    }
  }
  return groups;
}

// Prevent </script> injection when embedding JSON in HTML
function safeJson(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003C")
    .replace(/>/g, "\\u003E");
}

function hslToRgbInt(h: number, s: number, l: number): number {
  const sn = s / 100, ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return (Math.round(f(0) * 255) << 16) |
         (Math.round(f(8) * 255) << 8)  |
          Math.round(f(4) * 255);
}

function keyLabelToColor(keyLabel: string): number | null {
  const m = keyLabel.match(/^([A-G][#b]?)\s+(.*)/);
  if (!m) return null;
  const pc = NOTE_TO_PC[m[1] ?? ""];
  if (pc === undefined) return null;
  const isMinor = /minor|min\b/i.test(m[2] ?? "");
  const hue = (COF_POS[pc] ?? 0) * 30;
  return hslToRgbInt(hue, isMinor ? 55 : 70, isMinor ? 35 : 45);
}

async function inferClipKey(
  notes: NoteDescription[],
  eng: ChordgenEngine,
): Promise<KeyInfo | null> {
  // Chord-based path
  const groups = groupNotesByChord(notes);
  const recognitions = await Promise.all(
    [...groups.entries()].map(([beatKey, pitches]) =>
      eng
        .send<RecognizeResult>("recognize_chord", { notes: pitches })
        .then(r => ({ beatKey, r })),
    ),
  );

  const chordNames = recognitions
    .sort((a, b) => a.beatKey - b.beatKey)
    .flatMap(({ r }) => {
      const best = r.matches[0];
      return best && best.score >= 0.5 ? [best.chord.name] : [];
    })
    .filter((name, i, arr) => i === 0 || name !== arr[i - 1]);

  if (chordNames.length > 0) {
    const analysis = await eng.send<AnalysisResult>("analyze", { chord_names: chordNames });
    const k = analysis.inferred_key;
    return { root: k.root, scale: k.scale, label: k.label };
  }

  // Pitch-class histogram fallback for melodic clips
  const histogram: number[] = new Array(12).fill(0) as number[];
  for (const note of notes) {
    const pc = note.pitch % 12;
    histogram[pc] = (histogram[pc] ?? 0) + 1;
  }

  let bestScore = -1;
  let bestKey: KeyInfo | null = null;

  for (let root = 0; root < 12; root++) {
    for (const [scaleId, pcs] of Object.entries(SCALE_PCS_MAP)) {
      let score = 0;
      for (const interval of pcs) {
        score += histogram[(root + interval) % 12] ?? 0;
      }
      if (score > bestScore) {
        bestScore = score;
        const noteName = NOTE_NAMES[root] ?? "C";
        const scaleLabel = SCALE_DISPLAY_LABEL[scaleId] ?? scaleId;
        bestKey = { root, scale: scaleId, label: `${noteName} ${scaleLabel}` };
      }
    }
  }

  return bestKey;
}

function snapPitchToScale(pitch: number, scalePCs: Set<number>): number {
  const pc = pitch % 12;
  if (scalePCs.has(pc)) return pitch;
  for (let d = 1; d <= 6; d++) {
    const hasUp = scalePCs.has((pc + d) % 12);
    const hasDown = scalePCs.has((pc - d + 12) % 12);
    if (hasUp && hasDown) return pitch + d;
    if (hasUp) return pitch + d;
    if (hasDown) return pitch - d;
  }
  return pitch;
}

function keyLabelShort(label: string): string {
  const m = label.match(/^([A-G][#b]?)\s+(.+)$/);
  if (!m) return label;
  const root = m[1] ?? label;
  const scale = (m[2] ?? "").toLowerCase().trim();
  if (scale === "major") return root;
  if (scale === "minor" || scale === "natural minor" || scale === "natural_minor") return `${root}m`;
  if (scale === "harmonic minor" || scale === "harmonic_minor") return `${root}hm`;
  if (scale === "melodic minor" || scale === "melodic_minor") return `${root}mm`;
  const firstWord = scale.split(/[\s_]/)[0] ?? scale;
  return `${root} ${firstWord.slice(0, 3)}`;
}

function compatibilityLabel(
  refPc: number, refIsMinor: boolean,
  otherPc: number, otherIsMinor: boolean,
): string | null {
  if (refPc === otherPc && refIsMinor === otherIsMinor) return "Same key";
  if (refPc === otherPc) return refIsMinor ? "Parallel major" : "Parallel minor";
  if (!refIsMinor && otherIsMinor && otherPc === (refPc + 9) % 12) return "Relative minor";
  if (refIsMinor && !otherIsMinor && otherPc === (refPc + 3) % 12) return "Relative major";
  if (otherPc === (refPc + 7) % 12) return "Dominant (V)";
  if (otherPc === (refPc + 5) % 12) return "Subdominant (IV)";
  return null;
}

// ── Extension entry ──────────────────────────────────────────────────────────

export function activate(activation: ActivationContext) {
  const context = initialize(activation, "1.0.0");

  // Default to the bundled engine/ directory; override with env var if needed
  const cwd = process.env["COMPOSITION_AIDE_PATH"]
    ?? path.join(__dirname, "..", "engine");

  const pythonCmd = process.env["PYTHON_CMD"] ?? "python";
  const engine = new ChordgenEngine(cwd, pythonCmd);
  void engine.send("list_ops").catch(() => undefined);

  // ── Generate Progression ─────────────────────────────────────────────────

  context.commands.registerCommand("aide.generate", (arg: unknown) =>
    void (async (selection: ArrangementSelection) => {
      const midiTracks = selection.selected_lanes
        .map(h => context.getObjectFromHandle(h, DataModelObject))
        .filter((obj): obj is MidiTrack<"1.0.0"> => obj instanceof MidiTrack);

      if (!midiTracks.length) {
        console.log("[composition-aide] No MIDI tracks in selection.");
        return;
      }

      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(interfaceHtml)}`,
        380, 322,
      );

      let params: DialogResult | null;
      try { params = JSON.parse(rawResult) as DialogResult | null; }
      catch { return; }
      if (!params) return;

      const selectionBeats =
        selection.time_selection_end - selection.time_selection_start;

      const { chords } = await engine.send<{ chords: ChordJson[] }>("progression", {
        key: params.key,
        scale: params.scale,
        template: params.template,
        sevenths: params.sevenths,
      });

      const { voicings } = await engine.send<{ voicings: number[][] }>("voice_progression", {
        chords,
        strategy: params.voicing,
        octave: 4,
      });

      const beatsPerChord = selectionBeats / chords.length;
      const clipName =
        `${params.template} — ${params.keyName} ${params.scale.replace(/_/g, " ")}`;

      let notes: NoteDescription[] = voicings.flatMap((noteNums, i) =>
        noteNums.map(pitch => ({
          pitch: Math.max(0, Math.min(127, pitch)),
          startTime: i * beatsPerChord,
          duration: beatsPerChord * 0.95,
          velocity: 90,
        })),
      );

      if (params.snapToScale) {
        const intervals = SCALE_PCS_MAP[params.scale] ?? MAJOR_SCALE_PCS;
        const scalePCs = new Set(intervals.map(i => (params.key + i) % 12));
        notes = notes.map(n => ({ ...n, pitch: snapPitchToScale(n.pitch, scalePCs) }));
      }

      await Promise.all(midiTracks.map(async track => {
        const clip = await track.createMidiClip(
          selection.time_selection_start, selectionBeats,
        );
        clip.name = clipName;
        clip.notes = notes;
      }));

      console.log(
        `[composition-aide] "${clipName}": ` +
        `${chords.map(c => c.name).join(" – ")} (${beatsPerChord.toFixed(2)} beats/chord)`,
      );
    })(arg as ArrangementSelection).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction(
    "MidiTrack.ArrangementSelection",
    "Generate Progression…",
    "aide.generate",
  );

  // ── Analyze Harmony ──────────────────────────────────────────────────────

  context.commands.registerCommand("aide.analyze", (arg: unknown) => {
    const analyzeClip = async (handle: Handle): Promise<void> => {
      const clip = context.getObjectFromHandle(handle, MidiClip);
      const notes = clip.notes;

      if (notes.length === 0) {
        console.log("[composition-aide] Clip has no notes.");
        return;
      }

      const groups = groupNotesByChord(notes);

      // Recognize all chord windows in parallel
      const recognizeResults = await Promise.all(
        [...groups.entries()].map(([beatKey, pitches]) =>
          engine
            .send<RecognizeResult>("recognize_chord", { notes: pitches })
            .then(result => ({ beatKey, result })),
        ),
      );

      // Sort by beat, drop weak matches, deduplicate consecutive same chord
      const chordEntries = recognizeResults
        .sort((a, b) => a.beatKey - b.beatKey)
        .flatMap(({ beatKey, result }) => {
          const best = result.matches[0];
          if (!best || best.score < 0.5) return [];
          return [{ beat: beatKey / 1000, name: best.chord.name, score: best.score, pitchClasses: best.chord.pitch_classes, root: best.chord.root, quality: best.chord.quality }];
        })
        .filter((entry, i, arr) => i === 0 || entry.name !== arr[i - 1]?.name);

      if (chordEntries.length === 0) {
        console.log("[composition-aide] Could not identify any chords in this clip.");
        return;
      }

      const chordNames = chordEntries.map(e => e.name);
      const analysis = await engine.send<AnalysisResult>("analyze", {
        chord_names: chordNames,
      });

      const displayData = {
        clipName: clip.name || "(unnamed clip)",
        noteCount: notes.length,
        inferredKey: analysis.inferred_key.label,
        scaleRoot: analysis.inferred_key.root,
        scaleIntervals: [...(SCALE_PCS_MAP[analysis.inferred_key.scale] ?? MAJOR_SCALE_PCS)],
        chords: chordNames.map((name, i) => ({
          beat: chordEntries[i]?.beat ?? 0,
          name,
          roman: analysis.roman_labels[i] ?? name,
          tension: analysis.tension[i] ?? 0,
          score: chordEntries[i]?.score ?? 0,
          pitchClasses: chordEntries[i]?.pitchClasses ?? [],
          root: chordEntries[i]?.root ?? 0,
          quality: chordEntries[i]?.quality ?? "major",
        })),
        substitutions: analysis.substitutions.slice(0, 5).map(s => ({
          position: s.position,
          original: s.original.name,
          replacement: s.replacement.name,
          rationale: s.rationale,
        })),
        summary: analysis.summary,
      };

      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(
          resultsHtml.replace("__ANALYSIS_JSON__", safeJson(displayData)),
        )}`,
        520, 560,
      );

      console.log(
        `[composition-aide] Analyzed "${displayData.clipName}": ` +
        `${displayData.inferredKey} — ${chordNames.join(" – ")}`,
      );

      let modalResult: AnalyzeModalResult;
      try { modalResult = JSON.parse(rawResult) as AnalyzeModalResult; }
      catch { return; }
      if (!modalResult || modalResult.action !== "substitute") return;

      // ── Apply the chosen substitution ──────────────────────────────────────

      const { position, original, replacement } = modalResult;
      const entry = chordEntries[position];
      if (!entry) {
        console.error(`[composition-aide] Substitution position ${position} out of range.`);
        return;
      }

      const nextEntry = chordEntries[position + 1];
      const chordStart = entry.beat;
      // Determine chord end: next chord's beat, or derive from last note in clip
      const currentNotes = clip.notes;
      const lastNoteEnd = Math.max(
        chordStart + 4,
        ...currentNotes.map(n => n.startTime + n.duration),
      );
      const chordEnd = nextEntry?.beat ?? lastNoteEnd;

      // Notes that currently occupy this chord's slot
      const originalChordNotes = currentNotes.filter(
        n => n.startTime >= chordStart - 0.01 && n.startTime < chordEnd - 0.01,
      );

      // Match the original voicing register
      const avgPitch =
        originalChordNotes.length > 0
          ? Math.round(
              originalChordNotes.reduce((sum, n) => sum + n.pitch, 0) /
                originalChordNotes.length,
            )
          : 60;
      const targetOctave = Math.max(3, Math.min(6, Math.floor(avgPitch / 12) - 1));

      const voicing = await engine.send<VoicingsResult>("voicings", {
        name: replacement,
        octave: targetOctave,
      });

      // Preserve the original notes' average duration so articulation feels consistent
      const avgDuration =
        originalChordNotes.length > 0
          ? originalChordNotes.reduce((sum, n) => sum + n.duration, 0) /
            originalChordNotes.length
          : (chordEnd - chordStart) * 0.95;

      const newNotes: NoteDescription[] = voicing.close.map(pitch => ({
        pitch: Math.max(0, Math.min(127, pitch)),
        startTime: chordStart,
        duration: avgDuration,
        velocity: 90,
      }));

      clip.notes = [
        ...currentNotes.filter(
          n => n.startTime < chordStart - 0.01 || n.startTime >= chordEnd - 0.01,
        ),
        ...newNotes,
      ];

      console.log(
        `[composition-aide] Substituted: ${original} → ${replacement}` +
        ` at beat ${chordStart.toFixed(2)} (octave ${targetOctave})`,
      );
      await analyzeClip(handle);
    };
    void analyzeClip(arg as Handle).catch(e => console.error(e));
  });

  context.ui.registerContextMenuAction("MidiClip", "Analyze Harmony…", "aide.analyze");

  // ── Chord Palette ────────────────────────────────────────────────────────

  context.commands.registerCommand("aide.chordPalette", (arg: unknown) =>
    void (async (handle: Handle) => {
      const slot = context.getObjectFromHandle(handle, ClipSlot);
      const song = context.application.song;

      const rootNote = song?.rootNote ?? 0;
      const abletonScale = song?.scaleName ?? "Major";
      const defaultScale = ABLETON_SCALE_MAP[abletonScale] ?? "major";

      // Precompute triads + sevenths for every scale so the modal can switch client-side
      const scaleResults = await Promise.all(
        PALETTE_SCALES.flatMap(({ id }) => [
          engine.send<{ chords: ChordJson[] }>("diatonic", { key: rootNote, scale: id, sevenths: false })
            .then(r => ({ id, sevenths: false, chords: r.chords })),
          engine.send<{ chords: ChordJson[] }>("diatonic", { key: rootNote, scale: id, sevenths: true })
            .then(r => ({ id, sevenths: true, chords: r.chords })),
        ]),
      );

      const scalesData: Record<string, { triads: ChordJson[]; sevenths: ChordJson[]; intervals: readonly number[] }> = {};
      for (const { id, sevenths, chords } of scaleResults) {
        if (!scalesData[id]) scalesData[id] = { triads: [], sevenths: [], intervals: SCALE_PCS_MAP[id] ?? MAJOR_SCALE_PCS };
        if (sevenths) scalesData[id].sevenths = chords;
        else scalesData[id].triads = chords;
      }

      const paletteData = {
        keyRoot: rootNote,
        keyName: NOTE_NAMES[rootNote] ?? "C",
        defaultScale,
        scaleOptions: PALETTE_SCALES,
        scales: scalesData,
      };
      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(
          paletteHtml.replace("__PALETTE_JSON__", safeJson(paletteData)),
        )}`,
        510, 296,
      );

      let paletteResult: PaletteModalResult | null;
      try { paletteResult = JSON.parse(rawResult) as PaletteModalResult | null; }
      catch { return; }
      if (!paletteResult || paletteResult.action !== "insert") return;

      const { chordName, length, voicing, octave, selectedScale } = paletteResult;
      const voicingData = await engine.send<VoicingsResult>("voicings", { name: chordName, octave });

      const voiced = voicingData[voicing];
      const newNotes: NoteDescription[] = voiced.map(pitch => ({
        pitch: Math.max(0, Math.min(127, pitch)),
        startTime: 0,
        duration: length * 0.95,
        velocity: 90,
      }));

      // If slot already has a clip, replace its notes; otherwise create a new clip
      const existing = slot.clip;
      if (existing instanceof MidiClip) {
        existing.name = chordName;
        existing.notes = newNotes;
      } else {
        const clip = await slot.createMidiClip(length);
        clip.name = chordName;
        clip.notes = newNotes;
      }

      console.log(
        `[composition-aide] Inserted ${chordName} (${voicing}, oct ${octave}, ${length} beats) — ${paletteData.keyName} ${selectedScale}`,
      );
    })(arg as Handle).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction("ClipSlot", "Insert Chord…", "aide.chordPalette");

  // ── Session Key Map ──────────────────────────────────────────────────────

  context.commands.registerCommand("aide.sessionMap", (arg: unknown) =>
    void (async (_handle: Handle) => {
      const song = context.application.song;
      if (!song) return;

      const tracks = song.tracks;
      const scenes = song.scenes;
      const sceneNames = scenes.map(s => s.name);

      // Collect MIDI clips to analyze
      type ClipTask = {
        trackIndex: number;
        trackName: string;
        sceneIndex: number;
        notes: NoteDescription[];
        clipName: string;
      };

      const clipTasks: ClipTask[] = [];

      for (let ti = 0; ti < tracks.length; ti++) {
        const track = tracks[ti];
        if (!track) continue;
        const slots = track.clipSlots;
        for (let si = 0; si < slots.length; si++) {
          const slot = slots[si];
          if (!slot) continue;
          const clip = slot.clip;
          if (!(clip instanceof MidiClip)) continue;
          const notes = clip.notes;
          if (notes.length === 0) continue;
          clipTasks.push({
            trackIndex: ti,
            trackName: track.name,
            sceneIndex: si,
            notes,
            clipName: clip.name || "(unnamed)",
          });
        }
      }

      const totalMidiClips = clipTasks.length;
      if (totalMidiClips === 0) {
        console.log("[composition-aide] No MIDI clips with notes found in session.");
        return;
      }

      // Find max scene index with content
      const maxScene = clipTasks.reduce((m, t) => Math.max(m, t.sceneIndex), 0);
      const sceneCount = maxScene + 1;

      // Analyze all clips with a progress dialog
      type ClipResult = ClipTask & { key: string | null; score: number };
      const results: ClipResult[] = [];

      await context.ui.withinProgressDialog(
        `Analyzing session — ${totalMidiClips} clips…`,
        { progress: 0 },
        async (update, abortSignal) => {
          let completed = 0;

          await Promise.all(
            clipTasks.map(async task => {
              if (abortSignal.aborted) return;

              let key: string | null = null;
              let score = 0;

              try {
                const groups = groupNotesByChord(task.notes);
                const recognitions = await Promise.all(
                  [...groups.entries()].map(([beatKey, pitches]) =>
                    engine
                      .send<RecognizeResult>("recognize_chord", { notes: pitches })
                      .then(r => ({ beatKey, r })),
                  ),
                );

                const chordEntries = recognitions
                  .sort((a, b) => a.beatKey - b.beatKey)
                  .flatMap(({ beatKey, r }) => {
                    const best = r.matches[0];
                    if (!best || best.score < 0.5) return [];
                    return [{ beat: beatKey / 1000, name: best.chord.name }];
                  })
                  .filter((e, i, arr) => i === 0 || e.name !== arr[i - 1]?.name);

                if (chordEntries.length > 0) {
                  const analysis = await engine.send<AnalysisResult>("analyze", {
                    chord_names: chordEntries.map(e => e.name),
                  });
                  key = analysis.inferred_key.label;
                  score = analysis.inferred_key.score;
                }
              } catch (err) {
                console.error(`[composition-aide] Could not analyze ${task.clipName}:`, err);
              }

              results.push({ ...task, key, score });
              completed++;
              await update(
                `${completed} / ${totalMidiClips} clips…`,
                Math.round((completed / totalMidiClips) * 100),
              );
            }),
          );
        },
      );

      // Determine dominant key (most common among analyzed clips)
      const keyCounts = new Map<string, number>();
      for (const r of results) {
        if (r.key) keyCounts.set(r.key, (keyCounts.get(r.key) ?? 0) + 1);
      }
      let dominantKey: string | null = null;
      let maxCount = 0;
      for (const [k, count] of keyCounts) {
        if (count > maxCount) { maxCount = count; dominantKey = k; }
      }

      // Build per-track display data (only tracks with MIDI content)
      const trackSet = new Set(results.map(r => r.trackIndex));
      const mapTracks = [...trackSet]
        .sort((a, b) => a - b)
        .map(ti => {
          const trackName = results.find(r => r.trackIndex === ti)?.trackName ?? `Track ${ti + 1}`;
          const clips: Array<SessionClipData | null> = Array(sceneCount).fill(null);
          for (const r of results.filter(r => r.trackIndex === ti)) {
            clips[r.sceneIndex] = { clipName: r.clipName, key: r.key, score: r.score };
          }
          return { name: trackName, clips };
        });

      const mapData: SessionMapData = {
        dominantKey,
        sceneCount,
        sceneNames: sceneNames.slice(0, sceneCount),
        totalMidiClips,
        analyzedClips: results.filter(r => r.key !== null).length,
        tracks: mapTracks,
      };

      await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(
          sessionmapHtml.replace("__SESSION_JSON__", safeJson(mapData)),
        )}`,
        680, 480,
      );

      console.log(
        `[composition-aide] Session map: ${mapData.analyzedClips}/${totalMidiClips} clips` +
        (dominantKey ? ` — dominant key: ${dominantKey}` : ""),
      );
    })(arg as Handle).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction("Scene", "Map Session Keys…", "aide.sessionMap");

  // ── Color Clips by Key ───────────────────────────────────────────────────

  context.commands.registerCommand("aide.colorByKey", (arg: unknown) =>
    void (async (_handle: Handle) => {
      const song = context.application.song;
      if (!song) return;

      interface ColorTask {
        clip: MidiClip<"1.0.0">;
        notes: NoteDescription[];
        clipName: string;
      }
      const colorTasks: ColorTask[] = [];

      for (const track of song.tracks) {
        for (const slot of track.clipSlots) {
          const clip = slot.clip;
          if (!(clip instanceof MidiClip)) continue;
          const notes = clip.notes;
          if (notes.length === 0) continue;
          colorTasks.push({ clip, notes, clipName: clip.name || "(unnamed)" });
        }
      }

      if (colorTasks.length === 0) {
        console.log("[composition-aide] No MIDI clips with notes found.");
        return;
      }

      let coloredCount = 0;

      await context.ui.withinProgressDialog(
        `Coloring ${colorTasks.length} clips by key…`,
        { progress: 0 },
        async (update, abortSignal) => {
          let completed = 0;

          await Promise.all(
            colorTasks.map(async task => {
              if (abortSignal.aborted) return;

              try {
                const groups = groupNotesByChord(task.notes);
                const recognitions = await Promise.all(
                  [...groups.entries()].map(([beatKey, pitches]) =>
                    engine
                      .send<RecognizeResult>("recognize_chord", { notes: pitches })
                      .then(r => ({ beatKey, r })),
                  ),
                );

                const chordNames = recognitions
                  .sort((a, b) => a.beatKey - b.beatKey)
                  .flatMap(({ r }) => {
                    const best = r.matches[0];
                    return best && best.score >= 0.5 ? [best.chord.name] : [];
                  })
                  .filter((name, i, arr) => i === 0 || name !== arr[i - 1]);

                if (chordNames.length > 0) {
                  const analysis = await engine.send<AnalysisResult>("analyze", {
                    chord_names: chordNames,
                  });
                  const color = keyLabelToColor(analysis.inferred_key.label);
                  if (color !== null) {
                    task.clip.color = color;
                    coloredCount++;
                  }
                }
              } catch (err) {
                console.error(`[composition-aide] Could not color "${task.clipName}":`, err);
              }

              completed++;
              await update(
                `${completed} / ${colorTasks.length} clips…`,
                Math.round((completed / colorTasks.length) * 100),
              );
            }),
          );
        },
      );

      console.log(
        `[composition-aide] Colored ${coloredCount} / ${colorTasks.length} clips by key.`,
      );
    })(arg as Handle).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction("Scene", "Color Clips by Key", "aide.colorByKey");

  // ── Generate Progression into Clip ───────────────────────────────────────

  context.commands.registerCommand("aide.generateInClip", (arg: unknown) =>
    void (async (handle: Handle) => {
      const clip = context.getObjectFromHandle(handle, MidiClip);

      // Use loop length if looping, otherwise full clip duration; fall back to 8 beats
      const clipBeats = clip.looping
        ? (clip.loopEnd - clip.loopStart)
        : clip.duration;
      const fillBeats = clipBeats > 0 ? clipBeats : 8;

      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(interfaceHtml)}`,
        380, 322,
      );

      let params: DialogResult | null;
      try { params = JSON.parse(rawResult) as DialogResult | null; }
      catch { return; }
      if (!params) return;

      const { chords } = await engine.send<{ chords: ChordJson[] }>("progression", {
        key: params.key,
        scale: params.scale,
        template: params.template,
        sevenths: params.sevenths,
      });

      const { voicings } = await engine.send<{ voicings: number[][] }>("voice_progression", {
        chords,
        strategy: params.voicing,
        octave: 4,
      });

      const beatsPerChord = fillBeats / chords.length;
      let notes: NoteDescription[] = voicings.flatMap((noteNums, i) =>
        noteNums.map(pitch => ({
          pitch: Math.max(0, Math.min(127, pitch)),
          startTime: i * beatsPerChord,
          duration: beatsPerChord * 0.95,
          velocity: 90,
        })),
      );

      if (params.snapToScale) {
        const intervals = SCALE_PCS_MAP[params.scale] ?? MAJOR_SCALE_PCS;
        const scalePCs = new Set(intervals.map(i => (params.key + i) % 12));
        notes = notes.map(n => ({ ...n, pitch: snapPitchToScale(n.pitch, scalePCs) }));
      }

      clip.notes = notes;
      clip.name = `${params.template} — ${params.keyName} ${params.scale.replace(/_/g, " ")}`;

      console.log(
        `[composition-aide] Generated "${clip.name}": ` +
        `${chords.map(c => c.name).join(" – ")} (${beatsPerChord.toFixed(2)} beats/chord)`,
      );
    })(arg as Handle).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction("MidiClip", "Fill Clip with Progression…", "aide.generateInClip");

  // ── Voice Leading Optimizer ──────────────────────────────────────────────

  context.commands.registerCommand("aide.voiceLead", (arg: unknown) =>
    void (async (handle: Handle) => {
      const clip = context.getObjectFromHandle(handle, MidiClip);
      const notes = clip.notes;
      if (notes.length === 0) {
        console.log("[composition-aide] Clip has no notes.");
        return;
      }

      const groups = groupNotesByChord(notes);
      const recognizeResults = await Promise.all(
        [...groups.entries()].map(([beatKey, pitches]) =>
          engine
            .send<RecognizeResult>("recognize_chord", { notes: pitches })
            .then(r => ({ beatKey, r })),
        ),
      );

      const chordEntries = recognizeResults
        .sort((a, b) => a.beatKey - b.beatKey)
        .flatMap(({ beatKey, r }) => {
          const best = r.matches[0];
          if (!best || best.score < 0.5) return [];
          return [{ beat: beatKey / 1000, name: best.chord.name }];
        })
        .filter((e, i, arr) => i === 0 || e.name !== arr[i - 1]?.name);

      if (chordEntries.length === 0) {
        console.log("[composition-aide] No chords identified in clip.");
        return;
      }

      const avgPitch = Math.round(notes.reduce((s, n) => s + n.pitch, 0) / notes.length);
      const voiceOctave = Math.max(3, Math.min(6, Math.floor(avgPitch / 12) - 1));

      const { voicings } = await engine.send<{ voicings: number[][] }>("voice_progression", {
        chords: chordEntries.map(e => e.name),
        strategy: "smooth",
        octave: voiceOctave,
      });

      // Build map from snapped beat (ms) → original notes for duration/velocity preservation
      const snapMap = new Map<number, NoteDescription[]>();
      for (const note of notes) {
        const snapped = Math.round(note.startTime / 0.25) * 0.25;
        const key = Math.round(snapped * 1000);
        const arr = snapMap.get(key) ?? [];
        arr.push(note);
        snapMap.set(key, arr);
      }

      const chordBeatMs = new Set(chordEntries.map(e => Math.round(e.beat * 1000)));
      const newNotes: NoteDescription[] = [];

      for (let i = 0; i < chordEntries.length; i++) {
        const entry = chordEntries[i];
        const voicing = voicings[i] ?? [];
        if (!entry || voicing.length === 0) continue;

        const beatMs = Math.round(entry.beat * 1000);
        const originals = snapMap.get(beatMs) ?? [];
        const avgDur = originals.length > 0
          ? originals.reduce((s, n) => s + n.duration, 0) / originals.length : 2;
        const avgVel = originals.length > 0
          ? Math.round(originals.reduce((s, n) => s + (n.velocity ?? 90), 0) / originals.length)
          : 90;

        for (const pitch of voicing) {
          newNotes.push({
            pitch: Math.max(0, Math.min(127, pitch)),
            startTime: entry.beat,
            duration: avgDur,
            velocity: avgVel,
          });
        }
      }

      // Preserve notes that don't fall on a chord beat (passing tones, melody)
      const nonChordNotes = notes.filter(n => {
        const snapped = Math.round(Math.round(n.startTime / 0.25) * 0.25 * 1000);
        return !chordBeatMs.has(snapped);
      });

      clip.notes = [...nonChordNotes, ...newNotes];
      console.log(
        `[composition-aide] Voice-led "${clip.name || "(unnamed)"}": ` +
        `${chordEntries.length} chords, octave ${voiceOctave}`,
      );
    })(arg as Handle).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction("MidiClip", "Optimize Voice Leading", "aide.voiceLead");

  // ── Snap to Key ──────────────────────────────────────────────────────────

  context.commands.registerCommand("aide.snapToKey", (arg: unknown) =>
    void (async (handle: Handle) => {
      const clip = context.getObjectFromHandle(handle, MidiClip);
      const notes = clip.notes;
      if (notes.length === 0) {
        console.log("[composition-aide] Clip has no notes.");
        return;
      }

      const keyInfo = await inferClipKey(notes, engine);
      if (!keyInfo) {
        console.log("[composition-aide] Could not determine key for this clip.");
        return;
      }

      const scaleResult = await engine.send<{ notes: number[] }>("scale_info", {
        key: keyInfo.root,
        scale: keyInfo.scale,
      });

      const allowedPCs = new Set(scaleResult.notes);
      const kept = notes.filter(n => allowedPCs.has(n.pitch % 12));
      const removed = notes.length - kept.length;

      clip.notes = kept;
      console.log(
        `[composition-aide] Snapped "${clip.name || "(unnamed)"}" to ${keyInfo.label}: ` +
        `removed ${removed} out-of-key notes, kept ${kept.length}`,
      );
    })(arg as Handle).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction("MidiClip", "Snap to Key", "aide.snapToKey");

  // ── Batch Transpose ──────────────────────────────────────────────────────

  context.commands.registerCommand("aide.batchTranspose", (arg: unknown) =>
    void (async (selection: ClipSlotSelectionArg) => {
      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(transposeHtml)}`,
        300, 200,
      );

      let modalResult: TransposeModalResult | null;
      try { modalResult = JSON.parse(rawResult) as TransposeModalResult | null; }
      catch { return; }
      if (!modalResult || modalResult.action !== "transpose") return;

      const { semitones } = modalResult;
      if (semitones === 0) return;

      let transposedClips = 0;
      for (const slotHandle of selection.selected_clip_slots) {
        const slot = context.getObjectFromHandle(slotHandle, ClipSlot);
        const clip = slot.clip;
        if (!(clip instanceof MidiClip)) continue;

        const notes = clip.notes;
        if (notes.length === 0) continue;

        clip.notes = notes.map(n => ({
          pitch: Math.max(0, Math.min(127, n.pitch + semitones)),
          startTime: n.startTime,
          duration: n.duration,
          velocity: n.velocity ?? 90,
        }));
        transposedClips++;
      }

      console.log(
        `[composition-aide] Transposed ${transposedClips} clips ` +
        `${semitones > 0 ? "+" : ""}${semitones} semitones`,
      );
    })(arg as ClipSlotSelectionArg).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction(
    "ClipSlotSelection",
    "Transpose Selected Clips…",
    "aide.batchTranspose",
  );

  // ── Harmonic Compatibility Finder ────────────────────────────────────────

  context.commands.registerCommand("aide.findCompatible", (arg: unknown) =>
    void (async (handle: Handle) => {
      const clip = context.getObjectFromHandle(handle, MidiClip);
      const notes = clip.notes;
      if (notes.length === 0) {
        console.log("[composition-aide] Clip has no notes.");
        return;
      }

      const refKey = await inferClipKey(notes, engine);
      if (!refKey) {
        console.log("[composition-aide] Could not determine key for reference clip.");
        return;
      }

      const song = context.application.song;
      if (!song) return;

      const refIsMinor = /minor|min\b/i.test(refKey.scale);

      interface ScanTask {
        trackName: string;
        clip: MidiClip<"1.0.0">;
        notes: NoteDescription[];
      }

      const scanTasks: ScanTask[] = [];
      for (const track of song.tracks) {
        for (const slot of track.clipSlots) {
          const c = slot.clip;
          if (!(c instanceof MidiClip)) continue;
          const cNotes = c.notes;
          if (cNotes.length === 0) continue;
          scanTasks.push({ trackName: track.name, clip: c, notes: cNotes });
        }
      }

      const compatible: CompatibleClip[] = [];

      await context.ui.withinProgressDialog(
        "Scanning session for compatible clips…",
        { progress: 0 },
        async (update, abortSignal) => {
          let completed = 0;
          await Promise.all(
            scanTasks.map(async task => {
              if (abortSignal.aborted) return;
              try {
                const keyInfo = await inferClipKey(task.notes, engine);
                if (keyInfo) {
                  const otherIsMinor = /minor|min\b/i.test(keyInfo.scale);
                  const label = compatibilityLabel(
                    refKey.root, refIsMinor, keyInfo.root, otherIsMinor,
                  );
                  if (label) {
                    compatible.push({
                      trackName: task.trackName,
                      clipName: task.clip.name || "(unnamed)",
                      key: keyInfo.label,
                      compatibility: label,
                      color: keyLabelToColor(keyInfo.label) ?? 0x444444,
                    });
                  }
                }
              } catch (err) {
                console.error(
                  `[composition-aide] Error scanning "${task.clip.name}":`, err,
                );
              }
              completed++;
              await update(
                `${completed} / ${scanTasks.length} clips…`,
                Math.round((completed / scanTasks.length) * 100),
              );
            }),
          );
        },
      );

      const ORDER = [
        "Same key", "Relative minor", "Relative major",
        "Parallel major", "Parallel minor", "Dominant (V)", "Subdominant (IV)",
      ];
      compatible.sort((a, b) => {
        const ai = ORDER.indexOf(a.compatibility);
        const bi = ORDER.indexOf(b.compatibility);
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });

      // Build progression suggestions for the reference key and related keys
      type SuggTarget = { root: number; scale: string; label: string; relationship: string };
      const suggTargets: SuggTarget[] = [
        { root: refKey.root, scale: refKey.scale, label: refKey.label, relationship: "Same key" },
      ];
      const relRoot = refIsMinor ? (refKey.root + 3) % 12 : (refKey.root + 9) % 12;
      suggTargets.push({
        root: relRoot,
        scale: refIsMinor ? "major" : "natural_minor",
        label: `${NOTE_NAMES[relRoot] ?? "C"} ${refIsMinor ? "major" : "minor"}`,
        relationship: refIsMinor ? "Relative major" : "Relative minor",
      });
      const domRoot = (refKey.root + 7) % 12;
      suggTargets.push({
        root: domRoot, scale: refKey.scale,
        label: `${NOTE_NAMES[domRoot] ?? "C"} ${refIsMinor ? "minor" : "major"}`,
        relationship: "Dominant (V)",
      });
      const subRoot = (refKey.root + 5) % 12;
      suggTargets.push({
        root: subRoot, scale: refKey.scale,
        label: `${NOTE_NAMES[subRoot] ?? "C"} ${refIsMinor ? "minor" : "major"}`,
        relationship: "Subdominant (IV)",
      });

      const SUGG_TEMPLATES = ["I-V-vi-IV", "I-IV-V-I", "ii-V-I"];
      const suggestions: ProgressionSuggestion[] = [];

      await Promise.all(
        suggTargets.flatMap((target, ti) => {
          const templates = ti === 0 ? SUGG_TEMPLATES : SUGG_TEMPLATES.slice(0, 2);
          return templates.map(async template => {
            try {
              const result = await engine.send<{ chords: ChordJson[] }>("progression", {
                key: target.root, scale: target.scale, template, sevenths: false,
              });
              suggestions.push({
                relationship: target.relationship,
                keyLabel: target.label,
                template,
                chords: result.chords.map(c => c.name),
                color: keyLabelToColor(target.label) ?? 0x444444,
              });
            } catch { /* skip unsupported template/scale combos */ }
          });
        }),
      );

      const SUGG_ORDER = ["Same key", "Relative minor", "Relative major", "Dominant (V)", "Subdominant (IV)"];
      suggestions.sort((a, b) => {
        const ai = SUGG_ORDER.indexOf(a.relationship);
        const bi = SUGG_ORDER.indexOf(b.relationship);
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });

      const displayData = {
        refClipName: clip.name || "(unnamed)",
        refKey: refKey.label,
        results: compatible,
        suggestions,
      };

      const rawCompatResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(
          compatibleHtml.replace("__COMPATIBLE_JSON__", safeJson(displayData)),
        )}`,
        620, 560,
      );

      // Handle "Write →" button result
      type WriteResult = { action: string; suggestion: ProgressionSuggestion };
      let modalResult: WriteResult | null = null;
      try {
        const p = JSON.parse(rawCompatResult) as WriteResult | null;
        if (p && typeof p.action === "string") modalResult = p;
      } catch { /* dismissed */ }

      if (modalResult?.action === "writeProgression") {
        const sugg = modalResult.suggestion;

        // Find first empty slot in any MIDI track
        let emptySlot: ClipSlot<"1.0.0"> | null = null;
        outer: for (const track of song.tracks) {
          if (!(track instanceof MidiTrack)) continue;
          for (const slot of track.clipSlots) {
            if (slot.clip === null) { emptySlot = slot; break outer; }
          }
        }

        if (!emptySlot) {
          console.log("[composition-aide] No empty MIDI slot found — add an empty slot to a MIDI track.");
        } else {
          const beatsPerChord = 2;
          const totalBeats = sugg.chords.length * beatsPerChord;
          const allNotes: NoteDescription[] = [];

          for (let i = 0; i < sugg.chords.length; i++) {
            try {
              const v = await engine.send<{ close: number[]; drop2: number[]; shell: number[] }>(
                "voicings", { name: sugg.chords[i], octave: 4 },
              );
              for (const pitch of (v.close ?? [])) {
                allNotes.push({
                  pitch: Math.max(0, Math.min(127, pitch)),
                  startTime: i * beatsPerChord,
                  duration: beatsPerChord * 0.95,
                  velocity: 90,
                });
              }
            } catch {
              console.warn(`[composition-aide] Could not voice chord "${sugg.chords[i]}"`);
            }
          }

          const newClip = await emptySlot.createMidiClip(totalBeats);
          newClip.notes  = allNotes;
          newClip.name   = `${sugg.keyLabel} · ${sugg.template}`;
          newClip.color  = sugg.color;

          console.log(`[composition-aide] Wrote "${newClip.name}" (${sugg.chords.join(" – ")}) to empty slot`);
        }
      }

      console.log(
        `[composition-aide] Found ${compatible.length} compatible clips for ` +
        `"${displayData.refClipName}" (${refKey.label})`,
      );
    })(arg as Handle).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction(
    "MidiClip",
    "Find Compatible Clips…",
    "aide.findCompatible",
  );

  // ── Snap Notes to Scale ──────────────────────────────────────────────────

  context.commands.registerCommand("aide.snapToScale", (arg: unknown) =>
    void (async (handle: Handle) => {
      const clip = context.getObjectFromHandle(handle, MidiClip);
      const notes = clip.notes;
      if (notes.length === 0) {
        console.log("[composition-aide] Clip has no notes.");
        return;
      }

      const keyInfo = await inferClipKey(notes, engine);
      if (!keyInfo) {
        console.log("[composition-aide] Could not determine key for this clip.");
        return;
      }

      const scaleResult = await engine.send<{ notes: number[] }>("scale_info", {
        key: keyInfo.root, scale: keyInfo.scale,
      });
      const scalePCs = new Set(scaleResult.notes);

      let snapped = 0;
      const newNotes = notes.map(n => {
        const newPitch = snapPitchToScale(n.pitch, scalePCs);
        if (newPitch !== n.pitch) snapped++;
        return { ...n, pitch: newPitch };
      });

      clip.notes = newNotes;
      console.log(
        `[composition-aide] Snapped "${clip.name || "(unnamed)"}" to ${keyInfo.label}: ` +
        `${snapped} notes adjusted, ${notes.length - snapped} already in scale`,
      );
    })(arg as Handle).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction("MidiClip", "Snap Notes to Scale", "aide.snapToScale");

  // ── Label Clip with Key ──────────────────────────────────────────────────

  context.commands.registerCommand("aide.labelClipKey", (arg: unknown) =>
    void (async (handle: Handle) => {
      const clip = context.getObjectFromHandle(handle, MidiClip);
      const notes = clip.notes;
      if (notes.length === 0) {
        console.log("[composition-aide] Clip has no notes.");
        return;
      }

      const keyInfo = await inferClipKey(notes, engine);
      if (!keyInfo) {
        console.log("[composition-aide] Could not determine key for this clip.");
        return;
      }

      const baseName = (clip.name || "").replace(/ \[[^\]]*\]$/, "").trim();
      const newName = baseName.length > 0
        ? `${baseName} [${keyLabelShort(keyInfo.label)}]`
        : `[${keyLabelShort(keyInfo.label)}]`;

      clip.name = newName;
      console.log(`[composition-aide] Labeled clip: "${newName}" (${keyInfo.label})`);
    })(arg as Handle).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction("MidiClip", "Label with Key", "aide.labelClipKey");

  // ── Label All Clips with Key ─────────────────────────────────────────────

  context.commands.registerCommand("aide.labelAllKeys", (arg: unknown) =>
    void (async (_handle: Handle) => {
      const song = context.application.song;
      if (!song) return;

      interface LabelTask { clip: MidiClip<"1.0.0">; notes: NoteDescription[] }
      const tasks: LabelTask[] = [];
      for (const track of song.tracks) {
        for (const slot of track.clipSlots) {
          const c = slot.clip;
          if (!(c instanceof MidiClip)) continue;
          const n = c.notes;
          if (n.length === 0) continue;
          tasks.push({ clip: c, notes: n });
        }
      }

      if (tasks.length === 0) {
        console.log("[composition-aide] No MIDI clips with notes found.");
        return;
      }

      let labeled = 0;
      await context.ui.withinProgressDialog(
        `Labeling ${tasks.length} clips…`, { progress: 0 },
        async (update, abortSignal) => {
          let completed = 0;
          await Promise.all(
            tasks.map(async task => {
              if (abortSignal.aborted) return;
              try {
                const keyInfo = await inferClipKey(task.notes, engine);
                if (keyInfo) {
                  const baseName = (task.clip.name || "").replace(/ \[[^\]]*\]$/, "").trim();
                  task.clip.name = baseName.length > 0
                    ? `${baseName} [${keyLabelShort(keyInfo.label)}]`
                    : `[${keyLabelShort(keyInfo.label)}]`;
                  labeled++;
                }
              } catch (err) {
                console.error(`[composition-aide] Could not label "${task.clip.name}":`, err);
              }
              completed++;
              await update(
                `${completed} / ${tasks.length} clips…`,
                Math.round((completed / tasks.length) * 100),
              );
            }),
          );
        },
      );

      console.log(`[composition-aide] Labeled ${labeled} / ${tasks.length} clips with key.`);
    })(arg as Handle).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction("Scene", "Label All Clips with Key", "aide.labelAllKeys");

  // ── Transpose Session ────────────────────────────────────────────────────

  context.commands.registerCommand("aide.transposeSession", (arg: unknown) =>
    void (async (_handle: Handle) => {
      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(transposesessionHtml)}`,
        300, 250,
      );

      let modalResult: SessionTransposeResult | null;
      try { modalResult = JSON.parse(rawResult) as SessionTransposeResult | null; }
      catch { return; }
      if (!modalResult || modalResult.action !== "transpose") return;

      const { semitones, recolor } = modalResult;

      const song = context.application.song;
      if (!song) return;

      interface SessionTask { clip: MidiClip<"1.0.0">; clipName: string }
      const allClips: SessionTask[] = [];
      for (const track of song.tracks) {
        for (const slot of track.clipSlots) {
          const c = slot.clip;
          if (!(c instanceof MidiClip)) continue;
          allClips.push({ clip: c, clipName: c.name || "(unnamed)" });
        }
      }

      if (allClips.length === 0) {
        console.log("[composition-aide] No MIDI clips found in session.");
        return;
      }

      const progressLabel = recolor
        ? `Transposing + recoloring ${allClips.length} clips…`
        : `Transposing ${allClips.length} clips…`;

      await context.ui.withinProgressDialog(
        progressLabel, { progress: 0 },
        async (update, abortSignal) => {
          // Phase 1 — transpose notes (fast, no engine calls)
          if (semitones !== 0) {
            let done = 0;
            for (const task of allClips) {
              if (abortSignal.aborted) return;
              const notes = task.clip.notes;
              if (notes.length > 0) {
                task.clip.notes = notes.map(n => ({
                  ...n,
                  pitch: Math.max(0, Math.min(127, n.pitch + semitones)),
                }));
              }
              done++;
              await update(
                `Transposing: ${done} / ${allClips.length}…`,
                recolor
                  ? Math.round((done / allClips.length) * 50)
                  : Math.round((done / allClips.length) * 100),
              );
            }
          }

          // Phase 2 — recolor (slow, parallel engine calls)
          if (recolor && !abortSignal.aborted) {
            let coloredCount = 0;
            let done = 0;
            await Promise.all(
              allClips.map(async task => {
                if (abortSignal.aborted) return;
                try {
                  const notes = task.clip.notes;
                  if (notes.length === 0) return;
                  const groups = groupNotesByChord(notes);
                  const recognitions = await Promise.all(
                    [...groups.entries()].map(([beatKey, pitches]) =>
                      engine
                        .send<RecognizeResult>("recognize_chord", { notes: pitches })
                        .then(r => ({ beatKey, r })),
                    ),
                  );
                  const chordNames = recognitions
                    .sort((a, b) => a.beatKey - b.beatKey)
                    .flatMap(({ r }) => {
                      const best = r.matches[0];
                      return best && best.score >= 0.5 ? [best.chord.name] : [];
                    })
                    .filter((name, i, arr) => i === 0 || name !== arr[i - 1]);
                  if (chordNames.length > 0) {
                    const analysis = await engine.send<AnalysisResult>("analyze", {
                      chord_names: chordNames,
                    });
                    const color = keyLabelToColor(analysis.inferred_key.label);
                    if (color !== null) { task.clip.color = color; coloredCount++; }
                  }
                } catch { /* skip unrecognizable clips */ }
                done++;
                await update(
                  `Recoloring: ${done} / ${allClips.length}…`,
                  50 + Math.round((done / allClips.length) * 50),
                );
              }),
            );
            console.log(
              `[composition-aide] Session transposed ${semitones > 0 ? "+" : ""}${semitones} semitones, ` +
              `${coloredCount} clips recolored.`,
            );
          } else {
            console.log(
              `[composition-aide] Session transposed ${semitones > 0 ? "+" : ""}${semitones} semitones.`,
            );
          }
        },
      );
    })(arg as Handle).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction("Scene", "Transpose Session…", "aide.transposeSession");

  // ── Theory Machine ───────────────────────────────────────────────────────

  context.commands.registerCommand("aide.theoryMachine", (arg: unknown) =>
    void (async (handle: Handle) => {
      const slot = context.getObjectFromHandle(handle, ClipSlot);

      const song       = context.application.song;
      const initKey    = song?.rootNote ?? 0;
      const initScale  = ABLETON_SCALE_MAP[song?.scaleName ?? "Major"] ?? "major";
      const htmlWithInit = theoryMachineHtml.replace(
        "</head>",
        `<script>window._INIT={key:${initKey},scale:${JSON.stringify(initScale)}};<\/script></head>`,
      );

      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(htmlWithInit)}`,
        1000, 700,
      );

      let result: TheoryMachineResult | null;
      try { result = JSON.parse(rawResult) as TheoryMachineResult | null; }
      catch { return; }
      if (!result || result.action !== "writeClip") return;

      const { chords, beatsPerChord, totalBeats } = result;

      const newNotes: NoteDescription[] = chords.flatMap((chord, i) =>
        chord.notes.map(pitch => ({
          pitch: Math.max(0, Math.min(127, pitch)),
          startTime: i * beatsPerChord,
          duration: beatsPerChord * 0.95,
          velocity: 90,
        })),
      );

      const clipName = chords.map(c => c.name).join(" – ");
      const existing = slot.clip;
      if (existing instanceof MidiClip) {
        existing.notes = newNotes;
        existing.name  = clipName;
      } else {
        const clip = await slot.createMidiClip(totalBeats);
        clip.notes = newNotes;
        clip.name  = clipName;
      }

      console.log(
        `[composition-aide] Theory Machine: wrote ${chords.length} chords ` +
        `(${beatsPerChord} beats each) — "${clipName}"`,
      );
    })(arg as Handle).catch(e => console.error(e)),
  );

  context.ui.registerContextMenuAction("ClipSlot", "Modal Explorer…", "aide.theoryMachine");
}

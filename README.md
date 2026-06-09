# Composition Aide

A music theory extension for Ableton Live built on the [Extensions SDK](https://github.com/Ableton/extension-sdk) (1.0.0-beta.0). Composition Aide adds harmonic intelligence directly into Live's context menus — generate voiced progressions, analyze harmony, explore modes, find compatible clips, and get a per-chord improv guide including upper structure triads and frequency references for spectral work.

All theory operations are handled by a local Python engine (`chordgen`) that runs as a subprocess alongside Live. No cloud, no latency.

---

## What you need before you start

### 1. Ableton Extensions beta

Composition Aide is built on Ableton's **Extensions SDK**, which is currently in closed beta. You need two things from that beta:

- **Live 12** with the Extensions feature enabled in your account
- **The Extensions SDK package** — a folder you download from the beta program that contains `ExtensionHostNodeModule.node` and the `extensions-cli` command-line tool

If you don't have access to the Extensions beta yet, sign up at [ableton.com](https://www.ableton.com) or ask in the Ableton Discord — it's the same beta everyone in the Extensions gallery is using.

### 2. Python 3.9 or newer

The theory engine (`chordgen`) is a pure Python program that runs alongside Live. You need Python in your PATH. No packages to install — it uses only the standard library.

- **Mac:** Python 3 is usually already there. Run `python3 --version` in Terminal to check.
- **Windows:** Download from [python.org](https://www.python.org/downloads/). During install, tick **"Add Python to PATH"**.

That's it. No Node.js, no npm, no build step.

---

## Setup

### Step 1 — Get the repo

```bash
git clone https://github.com/saarsena/modal_explorer
cd modal_explorer
```

Or download the zip from GitHub and unzip it somewhere you'll remember.

`dist/extension.js` is pre-built and included, so you don't need Node.js or npm.

### Step 2 — Tell the extension where the SDK is

The only thing you need to configure is where Ableton put the Extensions host module on your machine.

**Find `ExtensionHostNodeModule.node`** — it lives inside the SDK folder you downloaded from the beta. The path looks something like:

- Mac: `/Users/yourname/Downloads/extensions-sdk-1.0.0-beta.0/ExtensionHostNodeModule.node`
- Windows: `C:\Users\yourname\Downloads\extensions-sdk-1.0.0-beta.0\ExtensionHostNodeModule.node`

Once you have that path, copy the example config file:

```bash
# Mac / Linux
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Open `.env` in any text editor and set `EXTENSION_HOST_PATH` to your path:

```
EXTENSION_HOST_PATH=/Users/yourname/Downloads/extensions-sdk-1.0.0-beta.0/ExtensionHostNodeModule.node
```

That's the only line you need to change.

<details>
<summary>Optional overrides</summary>

| Variable | Default | Purpose |
|---|---|---|
| `COMPOSITION_AIDE_PATH` | `engine/` (in repo) | Override the Python engine directory |
| `PYTHON_CMD` | `python` | Use `python3` or a full path if `python` isn't in your PATH |

</details>

### Step 3 — Run it

`extensions-cli` is the launcher that ships with the Extensions SDK. Run it from **inside the SDK folder** (not the Composition Aide folder):

```bash
# from inside the Extensions SDK folder, e.g. extensions-sdk-1.0.0-beta.0/
npx extensions-cli run /path/to/modal_explorer
```

Or if you installed the SDK globally, from anywhere:

```bash
extensions-cli run /path/to/modal_explorer
```

Live needs to be open before you run this. Once it connects you'll see the Composition Aide commands in Live's context menus.

> **Stuck?** The most common issue is a wrong `EXTENSION_HOST_PATH`. Double-check that the `.node` file actually exists at the path you set, and that you saved `.env` (not `.env.example`).

> **FYI:** While the extension is running, you can open `src/theory-machine.html` directly in your browser (just drag it onto a browser window or use File → Open). It connects to the local theory engine automatically and works as a full standalone web app — nice to have open on a second screen while you work in Live.

---

### For contributors / development

```bash
npm install     # requires the Extensions SDK .tgz packages (see package.json)
npm run build   # TypeScript compile + bundle → dist/extension.js
npm start       # build + run
```

---

## Features

Features are invoked from Live's context menu. All context menus are non-destructive unless noted.

![theory-machine.html](example.png)

### Generate

| Command | Trigger | What it does |
|---|---|---|
| **Generate Progression** | Right-click MIDI track arrangement selection | Pick key, scale, chord template, voicing, and 7ths toggle. Writes a fully voiced progression across selected MIDI tracks. |
| **Fill Clip with Progression** | Right-click MIDI clip | Same dialog as Generate, but fills an existing clip rather than creating a new one. |
| **Insert Chord** | Right-click session clip slot | Opens the Chord Palette: all diatonic chords for Live's current Key/Scale, triads and 7ths tabs, 12 scale types, dynamic grid. Pick length, octave, and voicing then click Insert. |

### Explore

| Command | Trigger | What it does |
|---|---|---|
| **Modal Explorer** | Right-click session clip slot | Full browser-based theory workbench. Chord grid, Circle of Fifths, progression builder with drag-to-reorder, auto-analysis, 12 template presets, and a mode card for every scale — with **Modal Interchange** suggestions showing borrowed chords and their character. Defaults to Live's current key on open. In session view, a **Write to Clip** button writes the voiced progression directly into the slot. |

### Analyze

| Command | Trigger | What it does |
|---|---|---|
| **Analyze Harmony** | Right-click MIDI clip | Recognizes chords, infers key, shows Roman numerals with tension indicators, and suggests substitutions you can apply in one click. Includes a **Solo Map** (see below) for every chord in the progression. |
| **Find Compatible Clips** | Right-click MIDI clip | Scans the entire session for clips in harmonically related keys (same, relative, dominant, subdominant, parallel). Shows compatibility relationships with circle-of-fifths color swatches. Also generates ready-made progressions in related keys — click **Write →** on any suggestion to write it as a new MIDI clip into the first empty slot. |
| **Map Session Keys** | Right-click scene | Scans all MIDI clips and shows a color-coded key grid (tracks × scenes). Mismatched clips are outlined. Useful before a live set to audit harmonic consistency. |

### Transform

| Command | Trigger | What it does |
|---|---|---|
| **Optimize Voice Leading** | Right-click MIDI clip | Re-voices all chords in the clip using smooth voice leading (minimal pitch movement). Preserves durations, velocities, and non-chord notes. |
| **Snap to Key** | Right-click MIDI clip | Infers the clip's key, removes out-of-key notes. Uses a pitch-class histogram fallback for purely melodic clips. |
| **Snap to Scale** | Right-click MIDI clip | Snaps note pitches to any of 12 named scales — a gentler alternative to Snap to Key that moves notes to the nearest scale degree rather than deleting them. |
| **Transpose Selected Clips** | Right-click multi-selected clip slots | Semitone picker (−24 to +24) with one-click presets. Shifts all notes in every selected clip. |
| **Transpose Session** | Right-click scene | Transposes all MIDI clips in the session by a chosen interval, with an option to re-color clips by the new keys. |

### Label & Color

| Command | Trigger | What it does |
|---|---|---|
| **Color Clips by Key** | Right-click scene | Writes `clip.color` on every MIDI clip using the circle-of-fifths color system. Bakes a key map into session view — no modal needed. |
| **Label Clip Key** | Right-click MIDI clip | Appends the inferred key to the clip name, e.g. `"Loop 1 [Am]"`. |
| **Label All Clip Keys** | Right-click scene | Same as Label Clip Key but applied to every MIDI clip in the session in one pass. |

---

## Solo Map

When you run **Analyze Harmony**, every chord in the progression gets a Solo Map entry showing:

- **Scale/mode** recommendation with a one-line rationale
- **Chord tones** with exact frequencies in Hz (octave 4, close position above the root)
- **Lean on** — the characteristic interval for that mode, also in Hz

For **dominant 7th chords**, the Solo Map expands with an **Upper Structures** section — four major triads you can superimpose over the dominant for different harmonic colors:

| UST | Sound | Extensions |
|---|---|---|
| II | Lydian dominant | 9 · #11 · 13 |
| ♭V | Altered dominant | ♭5 · 7 · ♭9 |
| ♭II | Phrygian dominant | ♭9 · 11 · ♭13 |
| ♭VI | Dark altered | ♭13 · R · ♭9 |

Each upper structure triad shows its three note names and Hz values — useful as frequency targets for spectral synthesis, additive patches, or harmonic effects in Max/MSP or similar environments.

---

## The Python Engine

The `engine/` directory contains the full theory engine — pure Python stdlib, no pip dependencies. It runs as a persistent subprocess alongside Live and handles all music theory computations over a newline-delimited JSON-RPC protocol.

**Files:**

| File | Purpose |
|---|---|
| `chordgen/server.py` | JSON-RPC server — spawned by the extension |
| `chordgen/__init__.py` | Public API surface for the server |
| `music_theory.py` | Core primitives: notes, intervals, scales, chords |
| `analyzer.py` | Key inference, Roman numeral analysis, substitution suggestions |
| `voicing.py` | Close, drop2, shell, and smooth voice-leading strategies |
| `songform.py` | Chord template expansion (I–V–vi–IV, 12-bar blues, etc.) |
| `upper_structures.py` | Upper structure triad logic |

Operations used by the extension:
- `op_progression` — generate chord progressions from key/scale/template
- `op_voice_progression` — voice a chord list with close, drop2, or smooth strategy
- `op_recognize_chord` — identify a chord from a set of MIDI pitch classes
- `op_analyze` — infer key, compute Roman numerals, suggest substitutions
- `op_diatonic` — all diatonic chords for a given key and scale
- `op_voicings` — close/drop2/shell voicing for a named chord

---

## Architecture

```
Ableton Live
  └── Extension Host (Node.js)
        ├── extension.ts      — 15 commands + context menu registrations
        ├── engine.ts         — ChordgenEngine: subprocess JSON-RPC client
        └── src/*.html        — self-contained modal dialogs, bundled as strings
              │
              └──send()──▶  chordgen/server.py  (Python, stdin/stdout JSON-RPC)
                                  └── music theory ops
```

`engine.ts` spawns the Python process on first use, keeps it alive for the session, and multiplexes concurrent requests by `id` — so `Promise.all` across multiple `engine.send()` calls is safe.

Each HTML modal is a fully self-contained file bundled into `dist/extension.js` at build time. Data is injected via `.replace("__TOKEN__", safeJson(data))` before the `data:text/html,…` URL is passed to `showModalDialog`. Results come back as JSON via `closeWithResult(result)`.

---

## Color System

Keys are colored by circle-of-fifths position:

```
C  = 0°    G  = 30°   D  = 60°   A  = 90°
E  = 120°  B  = 150°  F# = 180°  D♭ = 210°
A♭ = 240°  E♭ = 270°  B♭ = 300°  F  = 330°
```

Major keys: saturation 70%, lightness 45%.  
Minor keys: saturation 55%, lightness 35% (darker).

Packed as `0x00RRGGBB` integers for `clip.color`.

---

## License

[MIT](LICENSE) © 2026 saarsena

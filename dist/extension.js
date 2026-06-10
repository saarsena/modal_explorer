"use strict";var ze=Object.create;var ee=Object.defineProperty;var Fe=Object.getOwnPropertyDescriptor;var qe=Object.getOwnPropertyNames;var Ge=Object.getPrototypeOf,We=Object.prototype.hasOwnProperty;var Ke=(e,t)=>{for(var c in t)ee(e,c,{get:t[c],enumerable:!0})},ue=(e,t,c,g)=>{if(t&&typeof t=="object"||typeof t=="function")for(let p of qe(t))!We.call(e,p)&&p!==c&&ee(e,p,{get:()=>t[p],enumerable:!(g=Fe(t,p))||g.enumerable});return e};var Je=(e,t,c)=>(c=e!=null?ze(Ge(e)):{},ue(t||!e||!e.__esModule?ee(c,"default",{value:e,enumerable:!0}):c,e)),Ue=e=>ue(ee({},"__esModule",{value:!0}),e);var Bt={};Ke(Bt,{activate:()=>Rt});module.exports=Ue(Bt);var $=class be{constructor(t,c,g){this.handle=t,this.dataModel=c,this.objectRegistry=g}get parent(){let t=this.dataModel.getObjectCanonicalParent(this.handle);return t?this.objectRegistry.getObjectFromHandle(t,be):null}},V=(e,t,...c)=>new Promise((g,p)=>{e.withinTransaction(()=>t(...c,g,p))}),D=(e,t,c,g,...p)=>new Promise((d,o)=>{e.withinTransaction(()=>g(...p,n=>d(t.getObjectFromHandle(n,c)),o))}),K=class extends ${static className="Clip";get name(){return this.dataModel.clipGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetName(this.handle,e)})}get startTime(){return this.dataModel.clipGetStartTime(this.handle)}get endTime(){return this.dataModel.clipGetEndTime(this.handle)}get duration(){return this.dataModel.clipGetEndTime(this.handle)-this.dataModel.clipGetStartTime(this.handle)}get startMarker(){return this.dataModel.clipGetStartMarker(this.handle)}get endMarker(){return this.dataModel.clipGetEndMarker(this.handle)}get looping(){return this.dataModel.clipGetLooping(this.handle)}set looping(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetLooping(this.handle,e)})}get loopStart(){return this.dataModel.clipGetLoopStart(this.handle)}get loopEnd(){return this.dataModel.clipGetLoopEnd(this.handle)}get color(){return this.dataModel.clipGetColor(this.handle)}set color(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetColor(this.handle,e)})}get muted(){return this.dataModel.clipGetMuted(this.handle)}set muted(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetMuted(this.handle,e)})}},oe=class extends K{static className="AudioClip";get filePath(){return this.dataModel.audioclipGetFilePath(this.handle)}get warping(){return this.dataModel.audioclipGetWarping(this.handle)}set warping(e){this.dataModel.withinTransaction(()=>{this.dataModel.audioclipSetWarping(this.handle,e)})}get warpMode(){return this.dataModel.audioclipGetWarpMode(this.handle)}set warpMode(e){this.dataModel.withinTransaction(()=>{this.dataModel.audioclipSetWarpMode(this.handle,e)})}get warpMarkers(){return this.dataModel.audioclipGetWarpMarkers(this.handle)}},B=class extends K{static className="MidiClip";get notes(){return this.dataModel.midiclipGetNotes(this.handle)}set notes(e){this.dataModel.withinTransaction(()=>{this.dataModel.midiclipSetNotes(this.handle,e)})}},J=class extends ${static className="ClipSlot";get clip(){let e=this.dataModel.clipslotGetClip(this.handle);return e?this.objectRegistry.getObjectFromHandle(e,K):null}deleteClip(){return V(this.dataModel,this.dataModel.clipslotDeleteClip,this.handle)}createMidiClip(e){return D(this.dataModel,this.objectRegistry,B,this.dataModel.clipslotCreateMidiClip,this.handle,e)}createAudioClip(e){return D(this.dataModel,this.objectRegistry,oe,this.dataModel.clipslotCreateAudioClip,this.handle,{filePath:e.filePath,isWarped:e.isWarped,loopSettings:e.loopSettings})}},H=class extends ${static className="DeviceParameter";get name(){return this.dataModel.deviceParameterGetName(this.handle)}get min(){return this.dataModel.deviceParameterGetInternalMin(this.handle)}get max(){return this.dataModel.deviceParameterGetInternalMax(this.handle)}get isQuantized(){return this.dataModel.deviceParameterGetIsQuantized(this.handle)}get defaultValue(){return this.dataModel.deviceParameterGetDefaultValue(this.handle)}get valueItems(){return this.dataModel.deviceParameterGetValueItems(this.handle)}getValue(){return new Promise(e=>{this.dataModel.deviceParameterGetInternalValue(this.handle,e)})}setValue(e){return new Promise((t,c)=>{this.dataModel.withinTransaction(()=>{this.dataModel.deviceParameterSetInternalValue(this.handle,e,t,g=>c(new Error(g)))})})}},L=class extends ${static className="Device";get name(){return this.dataModel.deviceGetName(this.handle)}get parameters(){return this.dataModel.deviceGetParameters(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,H))}},ie=class extends ${static className="TakeLane";get clips(){return this.dataModel.takelaneGetClips(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,K))}get name(){return this.dataModel.takelaneGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.takelaneSetName(this.handle,e)})}createMidiClip(e,t){return D(this.dataModel,this.objectRegistry,B,this.dataModel.takelaneCreateMidiClip,this.handle,e,t)}createAudioClip(e){return D(this.dataModel,this.objectRegistry,oe,this.dataModel.takelaneCreateAudioClip,this.handle,{duration:e.duration,filePath:e.filePath,isWarped:e.isWarped,loopSettings:e.loopSettings,startTime:e.startTime})}},fe=class extends ${static className="MixerDevice";get volume(){return this.objectRegistry.getObjectFromHandle(this.dataModel.mixerdeviceGetVolume(this.handle),H)}get panning(){return this.objectRegistry.getObjectFromHandle(this.dataModel.mixerdeviceGetPanning(this.handle),H)}get sends(){return this.dataModel.mixerdeviceGetSends(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,H))}},z=class ve extends ${static className="Track";get name(){return this.dataModel.trackGetName(this.handle)}set name(t){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetName(this.handle,t)})}get mute(){return this.dataModel.trackGetMute(this.handle)}set mute(t){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetMute(this.handle,t)})}get solo(){return this.dataModel.trackGetSolo(this.handle)}set solo(t){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetSolo(this.handle,t)})}get mutedViaSolo(){return this.dataModel.trackGetMutedViaSolo(this.handle)}get arm(){return this.dataModel.trackGetArm(this.handle)}set arm(t){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetArm(this.handle,t)})}get clipSlots(){return this.dataModel.trackGetClipSlots(this.handle).map(t=>this.objectRegistry.getObjectFromHandle(t,J))}get takeLanes(){return this.dataModel.trackGetTakeLanes(this.handle).map(t=>this.objectRegistry.getObjectFromHandle(t,ie))}get arrangementClips(){return this.dataModel.trackGetArrangementClips(this.handle).map(t=>this.objectRegistry.getObjectFromHandle(t,K))}get groupTrack(){let t=this.dataModel.trackGetGroupTrack(this.handle);return t?this.objectRegistry.getObjectFromHandle(t,ve):null}get devices(){return this.dataModel.trackGetDevices(this.handle).map(t=>this.objectRegistry.getObjectFromHandle(t,L))}get mixer(){return this.objectRegistry.getObjectFromHandle(this.dataModel.trackGetMixerDevice(this.handle),fe)}createTakeLane(){return D(this.dataModel,this.objectRegistry,ie,this.dataModel.trackCreateTakeLane,this.handle)}insertDevice(t,c){return D(this.dataModel,this.objectRegistry,L,this.dataModel.trackInsertDevice,this.handle,t,BigInt(c))}deleteDevice(t){return V(this.dataModel,this.dataModel.trackDeleteDevice,this.handle,t.handle)}duplicateDevice(t){return D(this.dataModel,this.objectRegistry,L,this.dataModel.trackDuplicateDevice,this.handle,t.handle)}deleteClip(t){return V(this.dataModel,this.dataModel.trackDeleteClip,this.handle,t.handle)}clearClipsInRange(t,c){return V(this.dataModel,this.dataModel.trackClearClipsInRange,this.handle,t,c)}},ye=class extends z{static className="AudioTrack";createAudioClip(e){return D(this.dataModel,this.objectRegistry,oe,this.dataModel.trackCreateAudioClip,this.handle,{duration:e.duration,filePath:e.filePath,isWarped:e.isWarped,loopSettings:e.loopSettings,startTime:e.startTime})}},re=class extends ${static className="CuePoint";get time(){return this.dataModel.cuePointGetTime(this.handle)}get name(){return this.dataModel.cuePointGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.cuePointSetName(this.handle,e)})}},F=class extends z{static className="MidiTrack";createMidiClip(e,t){return D(this.dataModel,this.objectRegistry,B,this.dataModel.trackCreateMidiClip,this.handle,e,t)}},W=class extends ${static className="Scene";get name(){return this.dataModel.sceneGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.sceneSetName(this.handle,e)})}get tempo(){return this.dataModel.sceneGetTempo(this.handle)}get signatureNumerator(){return this.dataModel.sceneGetSignatureNumerator(this.handle)}get signatureDenominator(){return this.dataModel.sceneGetSignatureDenominator(this.handle)}},xe=class extends ${static className="Song";get tracks(){return this.dataModel.songGetTracks(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,z))}get returnTracks(){return this.dataModel.songGetReturnTracks(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,z))}get mainTrack(){return this.objectRegistry.getObjectFromHandle(this.dataModel.songGetMainTrack(this.handle),z)}get scenes(){return this.dataModel.songGetScenes(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,W))}get cuePoints(){return this.dataModel.songGetCuePoints(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,re))}get tempo(){return this.dataModel.songGetTempo(this.handle)}set tempo(e){this.dataModel.withinTransaction(()=>{this.dataModel.songSetTempo(this.handle,e)})}get gridQuantization(){return this.dataModel.songGetGridQuantization(this.handle)}get gridIsTriplet(){return this.dataModel.songGetGridIsTriplet(this.handle)}get rootNote(){return Number(this.dataModel.songGetRootNote(this.handle))}get scaleName(){return this.dataModel.songGetScaleName(this.handle)}get scaleMode(){return this.dataModel.songGetScaleMode(this.handle)}get scaleIntervals(){return this.dataModel.songGetScaleIntervals(this.handle).map(Number)}createAudioTrack(){return D(this.dataModel,this.objectRegistry,ye,this.dataModel.songCreateAudioTrack,this.handle)}createMidiTrack(){return D(this.dataModel,this.objectRegistry,F,this.dataModel.songCreateMidiTrack,this.handle)}createScene(e){return D(this.dataModel,this.objectRegistry,W,this.dataModel.songCreateScene,this.handle,BigInt(e))}deleteTrack(e){return V(this.dataModel,this.dataModel.songDeleteTrack,this.handle,e.handle)}deleteScene(e){return V(this.dataModel,this.dataModel.songDeleteScene,this.handle,e.handle)}duplicateTrack(e){return D(this.dataModel,this.objectRegistry,z,this.dataModel.songDuplicateTrack,this.handle,e.handle)}duplicateScene(e){return D(this.dataModel,this.objectRegistry,W,this.dataModel.songDuplicateScene,this.handle,e.handle)}createCuePoint(e){return D(this.dataModel,this.objectRegistry,re,this.dataModel.songCreateCuePoint,this.handle,e)}deleteCuePoint(e){return V(this.dataModel,this.dataModel.songDeleteCuePoint,this.handle,e.handle)}},we=class extends ${static className="Application";get song(){return this.objectRegistry.getObjectFromHandle(this.dataModel.rootGetSong(this.handle),xe)}},Ye=class{module;constructor(e){this.module=e}registerCommand(e,t){this.module.registerCommand(e,t)}executeCommand(e,...t){this.module.executeCommand(e,...t)}},ke=class extends ${static className="ChainMixerDevice";get volume(){return this.objectRegistry.getObjectFromHandle(this.dataModel.chainmixerdeviceGetVolume(this.handle),H)}get panning(){return this.objectRegistry.getObjectFromHandle(this.dataModel.chainmixerdeviceGetPanning(this.handle),H)}get sends(){return this.dataModel.chainmixerdeviceGetSends(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,H))}},te=class extends ${static className="Chain";get devices(){return this.dataModel.chainGetDevices(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,L))}get mixer(){return this.objectRegistry.getObjectFromHandle(this.dataModel.chainGetMixerDevice(this.handle),ke)}insertDevice(e,t){return D(this.dataModel,this.objectRegistry,L,this.dataModel.chainInsertDevice,this.handle,e,BigInt(t))}deleteDevice(e){return V(this.dataModel,this.dataModel.chainDeleteDevice,this.handle,e.handle)}duplicateDevice(e){return D(this.dataModel,this.objectRegistry,L,this.dataModel.chainDuplicateDevice,this.handle,e.handle)}},Ce=class extends te{static className="DrumChain";get receivingNote(){return Number(this.dataModel.drumchainGetReceivingNote(this.handle))}set receivingNote(e){this.dataModel.withinTransaction(()=>{this.dataModel.drumchainSetReceivingNote(this.handle,BigInt(e))})}},Ie=class extends L{static className="RackDevice";get chains(){return this.dataModel.rackdeviceGetChains(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,te))}insertChain(e){return D(this.dataModel,this.objectRegistry,te,this.dataModel.rackdeviceInsertChain,this.handle,BigInt(e))}},Xe=class extends Ie{static className="DrumRackDevice";get chains(){return this.dataModel.rackdeviceGetChains(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,Ce))}},le=class extends ${static className="Sample";get filePath(){return this.dataModel.sampleGetFilePath(this.handle)}},Ze=class extends L{static className="Simpler";get sample(){let e=this.dataModel.simplerGetSample(this.handle);return e?this.objectRegistry.getObjectFromHandle(e,le):null}replaceSample(e){return D(this.dataModel,this.objectRegistry,le,this.dataModel.simplerReplaceSample,this.handle,e)}},Qe=[we,xe,ye,F,z,oe,B,K,J,ie,Ze,Xe,Ie,L,le,Ce,te,W,re,H,fe,ke],et=class{cache=new Map;dataModel;constructor(e){this.dataModel=e}getOrCreateObjectFromHandle(e){let t=this.cache.get(e.id);if(t)return t;let c=Qe.find(p=>this.dataModel.getObjectIsOfClass(e,p.className));if(!c)throw new Error("Unknown object type");let g=new c(e,this.dataModel,this);return this.cache.set(e.id,g),g}getObjectFromHandle(e,t){let c=this.getOrCreateObjectFromHandle(e);if(!(c instanceof t))throw new Error("Object of incorrect type");return c}},tt=class{module;constructor(e){this.module=e}get storageDirectory(){return this.module.storageDirectory}get tempDirectory(){return this.module.tempDirectory}get language(){return this.module.language}},ot=class{module;constructor(e){this.module=e}renderPreFxAudio(e,t,c){return new Promise((g,p)=>{this.module.renderPreFxAudio(e.handle,{endTime:c,startTime:t},g,p)})}importIntoProject(e){return new Promise((t,c)=>{this.module.importIntoProject(e,t,c)})}},ge=(e,t)=>typeof t=="number"?{progress:t,text:e}:{text:e},nt=class{module;constructor(e){this.module=e}registerContextMenuAction(e,t,c){return new Promise(g=>{this.module.registerContextMenuAction(e,t,c,p=>{g(()=>new Promise(d=>{p(d)}))})})}showModalDialog(e,t,c){return new Promise((g,p)=>{this.module.showModalDialog(e,t,c,g,p)})}withinProgressDialog(e,t,c){let g=new AbortController;return new Promise((p,d)=>{this.module.showProgressDialog(ge(e,t.progress),({update:o,close:n})=>{let i=(u,a)=>new Promise(r=>{o(ge(u,a),r)}),s=()=>new Promise(u=>{n(u)});c(i,g.signal).finally(s).then(p).catch(d)},()=>{g.abort()})})}},Me=(e,t)=>{let{commands:c,dataModel:g,environment:p,resources:d,ui:o}=e.initializeExtensionHost({apiVersion:t}),n=new et(g);return{application:n.getObjectFromHandle(g.getRoot(),we),commands:new Ye(c),environment:new tt(p),getObjectFromHandle:n.getObjectFromHandle.bind(n),resources:new ot(d),ui:new nt(o),withinTransaction:g.withinTransaction.bind(g)}};var Se=require("node:child_process"),ne=class{constructor(t,c="python"){this.cwd=t;this.pythonCmd=c}cwd;pythonCmd;proc=null;buffer="";pending=new Map;nextId=1;getProcess(){if(this.proc)return this.proc;let t=(0,Se.spawn)(this.pythonCmd,["-u","-m","chordgen.server"],{cwd:this.cwd,stdio:["pipe","pipe","pipe"],env:{...process.env,PYTHONDONTWRITEBYTECODE:"1",PYTHONUTF8:"1"}});return t.stdout.on("data",c=>{this.buffer+=c.toString("utf8");let g;for(;(g=this.buffer.indexOf(`
`))!==-1;){let p=this.buffer.slice(0,g).trim();if(this.buffer=this.buffer.slice(g+1),!p)continue;let d;try{d=JSON.parse(p)}catch{continue}let o=d.id;if(o===void 0)continue;let n=this.pending.get(o);n&&(this.pending.delete(o),"error"in d?n.reject(new Error(String(d.error))):n.resolve(d.result))}}),t.stderr.on("data",c=>{console.error(`[chordgen] ${c.toString("utf8").trimEnd()}`)}),t.on("error",c=>{console.error(`[chordgen] failed to start: ${c.message}`),this.drainPending(c),this.proc=null}),t.on("exit",c=>{c!==0&&c!==null&&console.error(`[chordgen] process exited with code ${c}`),this.drainPending(new Error(`chordgen process exited (code ${c})`)),this.proc=null}),this.proc=t,t}drainPending(t){for(let[,c]of this.pending)c.reject(t);this.pending.clear()}send(t,c={}){let g=this.getProcess(),p=this.nextId++;return new Promise((d,o)=>{this.pending.set(p,{resolve:n=>d(n),reject:o}),g.stdin.write(JSON.stringify({op:t,id:p,...c})+`
`)})}dispose(){this.proc?.kill(),this.proc=null}};var Ve=Je(require("node:path"),1);var ce=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generate Progression</title>
  <script>
    const KEY_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

    const isWebKit = window.webkit?.messageHandlers?.live;
    const isWebView2 = window.chrome?.webview;

    function closeWithResult(result) {
      const msg = { method: "close_and_send", params: [JSON.stringify(result)] };
      if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);
      else if (isWebView2) window.chrome.webview.postMessage(msg);
    }

    function generate() {
      const keyIdx = Number(document.getElementById('key').value);
      closeWithResult({
        key:               keyIdx,
        keyName:           KEY_NAMES[keyIdx],
        scale:             document.getElementById('scale').value,
        template:          document.getElementById('template').value,
        voicing:           document.getElementById('voicing').value,
        sevenths:          document.getElementById('sevenths').checked,
        snapToScale:       document.getElementById('snapToScale').checked,
        customProgression: document.getElementById('custom').value.trim(),
        rhythm:            document.getElementById('rhythm').value,
      });
    }

    // \u2500\u2500 Live preview of the custom progression \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    // Validates against the engine's HTTP endpoint (same process the
    // extension talks to over stdio). Preview is best-effort UX sugar: the
    // extension re-parses authoritatively on submit, so if the HTTP port is
    // unavailable we just show nothing.

    const ENGINE = 'http://127.0.0.1:7842';
    const ROMAN_RE = /^[b#\u266D\u266F]?[ivIV]/;
    let previewTimer = null;
    let previewSeq = 0;

    async function engineOp(op, params) {
      const r = await fetch(ENGINE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ op, ...params }),
      });
      const data = await r.json();
      if (data.error) throw new Error(data.error);
      return data.result;
    }

    async function parseToken(tok, key, scale) {
      const asRoman = () => engineOp('parse_roman', { roman: tok, key, scale });
      const asName  = () => engineOp('parse_chord', { name: tok });
      const [first, second] = ROMAN_RE.test(tok) ? [asRoman, asName] : [asName, asRoman];
      try { return (await first()).chord.name; }
      catch { return (await second()).chord.name; }
    }

    async function updatePreview() {
      const text = document.getElementById('custom').value.trim();
      const preview = document.getElementById('preview');
      document.getElementById('template').disabled = !!text;

      if (!text) { preview.innerHTML = ''; return; }

      const key = Number(document.getElementById('key').value);
      const scale = document.getElementById('scale').value;
      const tokens = text.split(/[\\s,|]+/).filter(Boolean);
      const seq = ++previewSeq;

      let chips;
      try {
        chips = await Promise.all(tokens.map(async tok => {
          try { return { ok: true, label: await parseToken(tok, key, scale) }; }
          catch { return { ok: false, label: tok }; }
        }));
      } catch { return; } // engine HTTP unreachable \u2014 skip preview entirely

      if (seq !== previewSeq) return; // a newer keystroke superseded this run
      preview.innerHTML = '';
      for (const c of chips) {
        const el = document.createElement('span');
        el.className = 'chip' + (c.ok ? '' : ' bad');
        el.textContent = c.ok ? c.label : c.label + ' ?';
        preview.appendChild(el);
      }
    }

    function schedulePreview() {
      clearTimeout(previewTimer);
      previewTimer = setTimeout(updatePreview, 200);
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('keydown', e => {
        if (e.key === 'Enter') generate();
        if (e.key === 'Escape') closeWithResult(null);
      });
      document.getElementById('custom').addEventListener('input', schedulePreview);
      document.getElementById('key').addEventListener('change', schedulePreview);
      document.getElementById('scale').addEventListener('change', schedulePreview);
    });
  </script>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    * { margin: 0; }
    input, button, select { font: inherit; }

    :root {
      --c-bg:           hsl(0,0%,21%);
      --c-control-bg:   hsl(0,0%,16%);
      --c-control-bg-h: hsl(0,0%,14%);
      --c-input-bg:     hsl(0,0%,12%);
      --c-text:         hsl(0,0%,71%);
      --c-text-dim:     hsl(0,0%,41%);
      --c-border:       hsl(0,0%,7%);
      --c-accent:       hsl(31,100%,67%);
      --c-accent-fg:    hsl(0,0%,7%);
    }

    html {
      background: var(--c-bg);
      color: var(--c-text);
      font-family: "AbletonSansSmall", sans-serif;
      font-size: 11.5px;
      font-weight: 500;
      -webkit-font-smoothing: antialiased;
      height: 100%;
    }

    body {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.25em 1.5em;
    }

    .form {
      display: grid;
      grid-template-columns: 6.5em 1fr;
      gap: 0.45em 0.75em;
      align-items: center;
      width: 100%;
    }

    .title {
      grid-column: 1 / -1;
      font-size: 1.1em;
      margin-bottom: 0.4em;
    }

    .label {
      color: var(--c-text-dim);
      white-space: nowrap;
    }

    select {
      width: 100%;
      background: var(--c-input-bg);
      color: var(--c-text);
      border: 1px solid var(--c-border);
      height: 20px;
      padding: 0 0.3em;
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
      outline-offset: 0;
    }
    select:focus { outline: 2px solid var(--c-text-dim); }
    select:disabled { opacity: 0.4; cursor: default; }

    input[type="text"] {
      width: 100%;
      background: var(--c-input-bg);
      color: var(--c-text);
      border: 1px solid var(--c-border);
      height: 20px;
      padding: 0 0.4em;
      outline-offset: 0;
    }
    input[type="text"]:focus { outline: 2px solid var(--c-text-dim); }
    input[type="text"]::placeholder { color: var(--c-text-dim); }

    .preview {
      grid-column: 2;
      display: flex;
      flex-wrap: wrap;
      gap: 0.3em;
      min-height: 1.4em;
      align-items: center;
    }
    .chip {
      background: var(--c-control-bg);
      border: 1px solid var(--c-border);
      border-radius: 0.8em;
      padding: 0.1em 0.6em;
      line-height: 1.3;
    }
    .chip.bad {
      color: hsl(0, 65%, 62%);
      border-color: hsl(0, 65%, 35%);
    }

    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 0.4em;
      cursor: pointer;
    }
    .checkbox-row input[type="checkbox"] {
      accent-color: var(--c-accent);
      width: 12px;
      height: 12px;
      cursor: pointer;
    }

    .divider {
      grid-column: 1 / -1;
      border: none;
      border-top: 1px solid var(--c-border);
      margin: 0.3em 0;
    }

    .buttons {
      grid-column: 1 / -1;
      display: flex;
      gap: 0.5em;
      justify-content: flex-end;
      margin-top: 0.15em;
    }

    button {
      font-size: 1rem;
      line-height: 1;
      background: var(--c-control-bg);
      color: var(--c-text);
      border: 1px solid var(--c-border);
      height: 20px;
      padding: 0 1em;
      border-radius: 1em;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
    }
    button:hover   { background: var(--c-control-bg-h); }
    button:active  { background: var(--c-accent); color: var(--c-accent-fg); }
    button:focus   { outline: 2px solid var(--c-text-dim); }
  </style>
</head>
<body>
  <div class="form">
    <div class="title">Generate Progression</div>

    <span class="label">Key</span>
    <select id="key">
      <option value="0">C</option>
      <option value="1">C# / D\u266D</option>
      <option value="2">D</option>
      <option value="3">D# / E\u266D</option>
      <option value="4">E</option>
      <option value="5">F</option>
      <option value="6">F# / G\u266D</option>
      <option value="7">G</option>
      <option value="8">G# / A\u266D</option>
      <option value="9">A</option>
      <option value="10">A# / B\u266D</option>
      <option value="11">B</option>
    </select>

    <span class="label">Scale</span>
    <select id="scale">
      <option value="major">Major</option>
      <option value="natural_minor">Natural Minor</option>
      <option value="harmonic_minor">Harmonic Minor</option>
      <option value="melodic_minor">Melodic Minor</option>
      <option value="dorian">Dorian</option>
      <option value="mixolydian">Mixolydian</option>
      <option value="lydian">Lydian</option>
      <option value="phrygian">Phrygian</option>
      <option value="pentatonic_major">Pentatonic Major</option>
      <option value="pentatonic_minor">Pentatonic Minor</option>
      <option value="blues">Blues</option>
    </select>

    <span class="label">Template</span>
    <select id="template">
      <option value="I-V-vi-IV">I \u2013 V \u2013 vi \u2013 IV</option>
      <option value="I-IV-V-I">I \u2013 IV \u2013 V \u2013 I</option>
      <option value="I-vi-IV-V">I \u2013 vi \u2013 IV \u2013 V</option>
      <option value="vi-IV-I-V">vi \u2013 IV \u2013 I \u2013 V</option>
      <option value="ii-V-I">ii \u2013 V \u2013 I</option>
      <option value="I-IV-vi-V">I \u2013 IV \u2013 vi \u2013 V</option>
      <option value="I-V-IV-V">I \u2013 V \u2013 IV \u2013 V</option>
      <option value="I-iii-IV-V">I \u2013 iii \u2013 IV \u2013 V</option>
      <option value="12-bar blues">12-Bar Blues</option>
      <option value="Andalusian cadence">Andalusian Cadence</option>
      <option value="Pachelbel">Pachelbel Canon</option>
      <option value="Circle of fifths">Circle of Fifths</option>
    </select>

    <span class="label">Custom</span>
    <input type="text" id="custom" spellcheck="false" autocomplete="off"
           placeholder="ii7 V7 Imaj7 \xB7 bVII \xB7 V7/ii \xB7 Dm7 G7" />

    <div class="preview" id="preview"></div>

    <span class="label">Voicing</span>
    <select id="voicing">
      <option value="smooth">Smooth (voice-led)</option>
      <option value="close">Close Position</option>
      <option value="drop2">Drop 2</option>
      <option value="shell">Shell</option>
    </select>

    <span class="label">Rhythm</span>
    <select id="rhythm">
      <option value="block">Block Chords</option>
      <option value="halves">Halves</option>
      <option value="quarters">Quarters</option>
      <option value="pump_8ths">Pumping 8ths</option>
      <option value="swung_8ths">Swung 8ths</option>
      <option value="charleston">Charleston</option>
      <option value="tresillo">Tresillo (3-3-2)</option>
      <option value="boom_chuck">Boom-Chuck</option>
      <option value="syncopated">Syncopated</option>
      <option value="offbeats">Offbeat Skank</option>
      <option value="arp_up_8ths">Arpeggio Up (8ths)</option>
    </select>

    <span class="label">7ths</span>
    <label class="checkbox-row">
      <input type="checkbox" id="sevenths" />
      Include seventh chords
    </label>

    <span class="label">Snap</span>
    <label class="checkbox-row">
      <input type="checkbox" id="snapToScale" />
      Snap notes to scale
    </label>

    <hr class="divider" />

    <div class="buttons">
      <button onclick="closeWithResult(null)">Cancel</button>
      <button onclick="generate()">Generate</button>
    </div>
  </div>
</body>
</html>
`;var Ee=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Harmony Analysis</title>
  <script>
    const DATA = __ANALYSIS_JSON__;

    const isWebKit = window.webkit?.messageHandlers?.live;
    const isWebView2 = window.chrome?.webview;

    function closeWithResult(result) {
      const msg = { method: "close_and_send", params: [JSON.stringify(result)] };
      if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);
      else if (isWebView2) window.chrome.webview.postMessage(msg);
    }

    function applySub(position, original, replacement) {
      closeWithResult({ action: "substitute", position, original, replacement });
    }

    function esc(str) {
      return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function tensionColor(t) {
      return \`rgba(255, 160, 80, \${(t * 0.75).toFixed(2)})\`;
    }

    function scaleDegrees(pitchClasses, scaleRoot, scaleIntervals) {
      return pitchClasses
        .map(pc => {
          const rel = (pc - scaleRoot + 12) % 12;
          const idx = scaleIntervals.indexOf(rel);
          return idx >= 0 ? String(idx + 1) : null;
        })
        .filter(Boolean)
        .filter((d, i, arr) => arr.indexOf(d) === i);
    }

    // \u2500\u2500 Built-in synth preview (WebAudio) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    let _ac = null, _bus = null;
    function audioCtx() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!_ac) _ac = new AC();
      if (_ac.state === 'suspended') _ac.resume();
      return _ac;
    }
    function synthBus() {
      const ac = audioCtx();
      if (!ac) return null;
      if (!_bus) {
        _bus = ac.createGain();
        const lp = ac.createBiquadFilter();
        lp.type = 'lowpass'; lp.frequency.value = 2600; lp.Q.value = 0.4;
        _bus.connect(lp); lp.connect(ac.destination);
      }
      return _bus;
    }
    function stopAllSynth() {
      if (_bus) { try { _bus.disconnect(); } catch { /* already gone */ } _bus = null; }
    }
    function synthChord(midiNotes, when = 0, durSec = 1.1, velocity = 0.85) {
      const bus = synthBus();
      if (!bus || !midiNotes || midiNotes.length === 0) return;
      const t0 = _ac.currentTime + when;
      const peak = 0.22 * velocity / Math.sqrt(Math.max(1, midiNotes.length));
      for (const m of midiNotes) {
        const osc = _ac.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = 440 * Math.pow(2, (m - 69) / 12);
        const g = _ac.createGain();
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(peak, t0 + 0.015);
        g.gain.exponentialRampToValueAtTime(peak * 0.5, t0 + Math.min(0.35, durSec * 0.4));
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + durSec);
        osc.connect(g); g.connect(bus);
        osc.start(t0); osc.stop(t0 + durSec + 0.05);
      }
    }
    function stackPcs(pcs, octave) {
      const base = (octave + 1) * 12;
      const out = [];
      let prev = -Infinity;
      for (const pc of pcs ?? []) {
        let p = base + (pc % 12);
        while (p <= prev) p += 12;
        out.push(p); prev = p;
      }
      return out;
    }

    // \u2500\u2500 Progression playback (uses the clip's actual chord timing) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    let progPlaying = false;
    let progTimers = [];
    function toggleProgPlay() {
      if (progPlaying) { stopProgPlay(); return; }
      const chords = DATA.chords;
      if (chords.length === 0) return;
      const spb = 60 / 110; // playback at 110 BPM
      const beat0 = chords[0].beat ?? 0;
      const boxes = [...document.querySelectorAll('#progression .chord-box')];
      progPlaying = true;
      document.getElementById('play-prog').textContent = '\u25A0';
      let end = 0;
      chords.forEach((ch, i) => {
        const start = ((ch.beat ?? 0) - beat0) * spb;
        const nextBeat = chords[i + 1]?.beat;
        const span = nextBeat !== undefined ? Math.max(0.5, nextBeat - (ch.beat ?? 0)) : 2;
        const dur = span * spb;
        synthChord(stackPcs(ch.pitchClasses, 4), start, dur * 1.15, 0.9);
        progTimers.push(setTimeout(() => {
          boxes.forEach(b => b.classList.remove('playing'));
          boxes[i]?.classList.add('playing');
        }, start * 1000));
        end = start + dur;
      });
      progTimers.push(setTimeout(stopProgPlay, end * 1000 + 300));
    }
    function stopProgPlay() {
      progPlaying = false;
      for (const t of progTimers) clearTimeout(t);
      progTimers = [];
      stopAllSynth();
      document.querySelectorAll('#progression .chord-box.playing')
        .forEach(b => b.classList.remove('playing'));
      document.getElementById('play-prog').textContent = '\u25B6';
    }

    // \u2500\u2500 Substitution preview: original then replacement, back to back \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    async function previewSub(original, replacement) {
      try {
        const get = async name => {
          const r = await fetch('http://127.0.0.1:7842', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ op: 'parse_chord', name }),
          });
          const d = await r.json();
          if (d.error) throw new Error(d.error);
          return d.result.chord.pitch_classes;
        };
        const [a, b] = await Promise.all([get(original), get(replacement)]);
        synthChord(stackPcs(a, 4), 0, 0.85, 0.8);
        synthChord(stackPcs(b, 4), 0.9, 1.3, 0.95);
      } catch { /* engine HTTP unreachable \u2014 no preview */ }
    }

    // \u2500\u2500 Solo Map helpers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

    const NOTE_NAMES      = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
    const NOTE_NAMES_FLAT = ["C","D\u266D","D","E\u266D","E","F","G\u266D","G","A\u266D","A","B\u266D","B"];

    function midiToHz(midi) {
      return (440 * Math.pow(2, (midi - 69) / 12)).toFixed(2);
    }

    function chordTonesHz(rootPc, pitchClasses) {
      const rootMidi = 60 + rootPc;
      return pitchClasses.map(pc => {
        let midi = 60 + pc;
        while (midi < rootMidi) midi += 12;
        const octave = Math.floor(midi / 12) - 1;
        return { name: NOTE_NAMES[pc % 12], octave, midi, hz: midiToHz(midi) };
      }).sort((a, b) => a.midi - b.midi);
    }

    function charNoteHz(rootPc, charInterval) {
      if (charInterval === null) return null;
      const pc = (rootPc + charInterval) % 12;
      const rootMidi = 60 + rootPc;
      let midi = 60 + pc;
      while (midi < rootMidi) midi += 12;
      const octave = Math.floor(midi / 12) - 1;
      return { name: NOTE_NAMES[pc % 12], octave, hz: midiToHz(midi) };
    }

    // Upper triad Hz \u2014 uses flat names since USTs are conventionally spelled with flats
    function upperTriadHz(upperRootPc) {
      const pcs = [upperRootPc, (upperRootPc + 4) % 12, (upperRootPc + 7) % 12];
      const rootMidi = 60 + upperRootPc;
      return pcs.map(pc => {
        let midi = 60 + pc;
        while (midi < rootMidi) midi += 12;
        const octave = Math.floor(midi / 12) - 1;
        return { name: NOTE_NAMES_FLAT[pc % 12], octave, midi, hz: midiToHz(midi) };
      }).sort((a, b) => a.midi - b.midi);
    }

    // Four upper structure triads for dominant chords, ordered most-to-least used
    const DOMINANT_USTS = [
      { semi: 2, label: 'II',  sound: 'Lydian dominant',   ext: '9 \xB7 #11 \xB7 13'  },
      { semi: 6, label: '\u266DV',  sound: 'Altered dominant',  ext: '\u266D5 \xB7 7 \xB7 \u266D9'  },
      { semi: 1, label: '\u266DII', sound: 'Phrygian dominant', ext: '\u266D9 \xB7 11 \xB7 \u266D13' },
      { semi: 8, label: '\u266DVI', sound: 'Dark altered',      ext: '\u266D13 \xB7 R \xB7 \u266D9'  },
    ];

    function suggestMode(roman, quality) {
      const q = (quality || '').toLowerCase().replace(/_/g, '');
      const r = (roman || '').replace(/[\u266D#\xB0\xF8+\u2206\u0394\\d]/g, '').toLowerCase().trim();

      if (q === 'halfdiminished' || q === 'halfdim' || q.includes('halfdim') || q === '\xF8') {
        return { mode: 'Locrian', charInterval: 6, charLabel: '\u266D5', why: '\u266D5 matches the \xF8 chord' };
      }
      if (q.includes('diminished') || q === 'dim') {
        return { mode: 'Diminished (whole-half)', charInterval: 6, charLabel: '\u266D5', why: 'whole-half scale over \xB07' };
      }
      if (q.includes('dominant') || q === 'dom7' || q === 'dom') {
        return { mode: 'Mixolydian', charInterval: 10, charLabel: '\u266D7', why: '\u266D7 defines the dominant' };
      }
      if (q.includes('augmented') || q === 'aug') {
        return { mode: 'Lydian Augmented', charInterval: 8, charLabel: '#5', why: '#5 = aug chord tone' };
      }
      if (q.includes('sus')) {
        return { mode: 'Mixolydian', charInterval: 10, charLabel: '\u266D7', why: 'floating \u2014 \u266D7 is common' };
      }
      if (q.includes('minor') || q === 'min' || q === 'm' || q === 'min7') {
        if (r === 'vi' || r === 'vi7') {
          return { mode: 'Aeolian', charInterval: 8, charLabel: '\u266D6', why: '\u266D6 = natural minor color' };
        }
        return { mode: 'Dorian', charInterval: 9, charLabel: '\u266E6', why: '\u266E6 = Dorian warmth over minor' };
      }
      if (q.includes('major') || q === 'maj' || q === 'maj7' || q === '') {
        if (r === 'iv') {
          return { mode: 'Lydian', charInterval: 6, charLabel: '#4', why: '#4 floats over IV' };
        }
        return { mode: 'Ionian', charInterval: 11, charLabel: 'maj7', why: 'maj7 colors the tonic' };
      }
      return { mode: 'Major Pentatonic', charInterval: null, charLabel: null, why: 'safe over any chord' };
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('clip-name').textContent = DATA.clipName;
      document.getElementById('inferred-key').textContent = DATA.inferredKey;
      document.getElementById('note-count').textContent =
        \`\${DATA.noteCount} notes \xB7 \${DATA.chords.length} chord\${DATA.chords.length !== 1 ? 's' : ''}\`;

      // Chord boxes
      const prog = document.getElementById('progression');
      DATA.chords.forEach(chord => {
        const box = document.createElement('div');
        box.className = 'chord-box';
        box.style.borderBottomColor = tensionColor(chord.tension);
        const degs = scaleDegrees(chord.pitchClasses ?? [], DATA.scaleRoot, DATA.scaleIntervals);
        const degsHtml = degs.length > 0
          ? \`<span class="degrees">\${degs.join('\xB7')}</span>\`
          : '';
        box.innerHTML =
          \`<span class="roman">\${esc(chord.roman)}</span>\` +
          \`<span class="chord-name">\${esc(chord.name)}</span>\` +
          degsHtml;
        box.title = 'Click to hear';
        box.addEventListener('click', () =>
          synthChord(stackPcs(chord.pitchClasses, 4), 0, 1.1, 0.85));
        prog.appendChild(box);
      });

      document.getElementById('play-prog').addEventListener('click', toggleProgPlay);

      // Substitutions
      const subSection = document.getElementById('sub-section');
      const subList = document.getElementById('sub-list');
      if (DATA.substitutions.length === 0) {
        subSection.style.display = 'none';
      } else {
        DATA.substitutions.forEach(s => {
          const li = document.createElement('li');
          li.innerHTML =
            \`<span class="sub-arrow">\` +
              \`<span class="sub-original">\${esc(s.original)}</span>\` +
              \` \u2192 \` +
              \`<span class="sub-replacement">\${esc(s.replacement)}</span>\` +
            \`</span>\` +
            \`<span class="sub-rationale">\${esc(s.rationale)}</span>\` +
            \`<button class="apply-btn listen-btn" title="Hear original, then substitution">\u25B6</button>\` +
            \`<button class="apply-btn" onclick="applySub(\${s.position}, '\${esc(s.original)}', '\${esc(s.replacement)}')">Apply</button>\`;
          li.querySelector('.listen-btn').addEventListener('click', () =>
            previewSub(s.original, s.replacement));
          subList.appendChild(li);
        });
      }

      // Summary
      const summaryEl = document.getElementById('summary');
      if (DATA.summary) {
        summaryEl.textContent = DATA.summary;
      } else {
        summaryEl.style.display = 'none';
      }

      // Solo Map
      const soloMap = document.getElementById('solo-map');
      DATA.chords.forEach(chord => {
        const rootPc     = chord.root ?? 0;
        const tones      = chordTonesHz(rootPc, chord.pitchClasses ?? []);
        const suggestion = suggestMode(chord.roman, chord.quality);
        const charNote   = charNoteHz(rootPc, suggestion.charInterval);
        const isDominant = (chord.quality || '').toLowerCase().replace(/_/g, '').includes('dominant');

        const tonesHtml = tones.map(t =>
          \`<div class="sm-tone">\` +
            \`<span class="sm-note">\${esc(t.name)}\${t.octave}</span>\` +
            \`<span class="sm-hz">\${t.hz} Hz</span>\` +
          \`</div>\`
        ).join('');

        const charHtml = charNote
          ? \`<div class="sm-char">\` +
              \`<span class="sm-char-label">lean on</span>\` +
              \`<span class="sm-char-note">\${esc(charNote.name)}\${charNote.octave}</span>\` +
              \`<span class="sm-char-interval">\${esc(suggestion.charLabel)}</span>\` +
              \`<span class="sm-hz">\${charNote.hz} Hz</span>\` +
            \`</div>\`
          : '';

        let ustHtml = '';
        if (isDominant) {
          const cards = DOMINANT_USTS.map(ust => {
            const upperRootPc = (rootPc + ust.semi) % 12;
            const uTones = upperTriadHz(upperRootPc);
            const uTonesHtml = uTones.map(t =>
              \`<span class="ust-tone">\` +
                \`<span class="ust-note">\${esc(t.name)}\${t.octave}</span>\` +
                \`<span class="sm-hz">\${t.hz} Hz</span>\` +
              \`</span>\`
            ).join('');
            return \`<div class="ust-card">\` +
              \`<div class="ust-head">\` +
                \`<span class="ust-label">\${esc(ust.label)}</span>\` +
                \`<span class="ust-triad-name">\${esc(NOTE_NAMES_FLAT[upperRootPc])} major</span>\` +
                \`<span class="ust-sound">\${esc(ust.sound)}</span>\` +
                \`<span class="ust-ext">\${esc(ust.ext)}</span>\` +
              \`</div>\` +
              \`<div class="ust-tones">\${uTonesHtml}</div>\` +
            \`</div>\`;
          }).join('');

          ustHtml =
            \`<div class="ust-section">\` +
              \`<span class="ust-section-label">Upper Structures</span>\` +
              \`<div class="ust-cards">\${cards}</div>\` +
            \`</div>\`;
        }

        const entry = document.createElement('div');
        entry.className = 'sm-entry';
        entry.innerHTML =
          \`<div class="sm-head">\` +
            \`<span class="sm-chord-name">\${esc(chord.name)}</span>\` +
            \`<span class="sm-roman">\${esc(chord.roman)}</span>\` +
            \`<span class="sm-arrow">\u2192</span>\` +
            \`<span class="sm-mode">\${esc(suggestion.mode)}</span>\` +
            \`<span class="sm-why">\${esc(suggestion.why)}</span>\` +
          \`</div>\` +
          \`<div class="sm-tones">\${tonesHtml}</div>\` +
          charHtml +
          ustHtml;

        // Make upper structure cards audible: low chord root + the upper triad
        entry.querySelectorAll('.ust-card').forEach((card, idx) => {
          const ust = DOMINANT_USTS[idx];
          if (!ust) return;
          card.title = 'Click to hear over the chord root';
          card.addEventListener('click', () => {
            const triad = upperTriadHz((rootPc + ust.semi) % 12).map(t => t.midi);
            synthChord([36 + rootPc, ...triad], 0, 1.5, 0.9);
          });
        });

        soloMap.appendChild(entry);
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeWithResult(null);
      });
    });
  </script>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    * { margin: 0; }
    button { font: inherit; }

    :root {
      --c-bg:         hsl(0,0%,21%);
      --c-input-bg:   hsl(0,0%,12%);
      --c-text:       hsl(0,0%,71%);
      --c-text-dim:   hsl(0,0%,41%);
      --c-border:     hsl(0,0%,10%);
      --c-accent:     hsl(31,100%,67%);
      --c-accent-fg:  hsl(0,0%,7%);
      --c-control-bg: hsl(0,0%,16%);
      --c-green:      hsl(135,50%,55%);
      --c-ust-bg:     hsl(0,0%,9%);
    }

    html {
      background: var(--c-bg);
      color: var(--c-text);
      font-family: "AbletonSansSmall", sans-serif;
      font-size: 11.5px;
      font-weight: 500;
      -webkit-font-smoothing: antialiased;
      height: 100%;
    }

    body {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* \u2500\u2500 Fixed header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .header-pane {
      flex-shrink: 0;
      padding: 1.25em 1.5em 0.85em;
      display: flex;
      flex-direction: column;
      gap: 0.85em;
      border-bottom: 1px solid var(--c-border);
    }

    .title { color: var(--c-text-dim); font-size: 1.05em; }
    #clip-name { color: var(--c-text); }

    .key-row { display: flex; align-items: baseline; gap: 0.6em; }
    .key-label { color: var(--c-text-dim); }
    #inferred-key { font-size: 1.4em; color: var(--c-accent); font-weight: 600; }
    #note-count { color: var(--c-text-dim); }

    .section-label {
      color: var(--c-text-dim);
      font-size: 0.95em;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.4em;
    }

    #progression { display: flex; flex-wrap: wrap; gap: 0.4em; }

    .chord-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--c-input-bg);
      border: 1px solid var(--c-border);
      border-bottom: 3px solid var(--c-border);
      padding: 0.4em 0.7em 0.3em;
      min-width: 3.5em;
      gap: 0.15em;
      cursor: pointer;
      user-select: none;
    }
    .chord-box:hover { background: hsl(0,0%,14%); }
    .chord-box.playing { border-color: var(--c-accent); }
    .roman      { color: var(--c-accent); font-size: 0.9em; }
    .chord-name { color: var(--c-text); font-size: 1.05em; }
    .degrees    { color: var(--c-text-dim); font-size: 0.78em; letter-spacing: 0.06em; }

    /* \u2500\u2500 Scrollable content \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .scroll-pane {
      flex: 1;
      overflow-y: auto;
      padding: 0.85em 1.5em;
      display: flex;
      flex-direction: column;
      gap: 0.85em;
    }

    #sub-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.35em; }

    #sub-list li {
      display: grid;
      grid-template-columns: 7em 1fr auto auto;
      align-items: center;
      gap: 0.6em;
    }

    .sub-arrow       { color: var(--c-text); white-space: nowrap; }
    .sub-original    { color: var(--c-text-dim); }
    .sub-replacement { color: var(--c-accent); }
    .sub-rationale   { color: var(--c-text-dim); font-style: italic; }

    .apply-btn {
      font-size: 1rem;
      line-height: 1;
      background: var(--c-control-bg);
      color: var(--c-text);
      border: 1px solid var(--c-border);
      height: 18px;
      padding: 0 0.75em;
      border-radius: 1em;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
    }
    .apply-btn:hover  { background: hsl(0,0%,14%); }
    .apply-btn:active { background: var(--c-accent); color: var(--c-accent-fg); }
    .apply-btn:focus  { outline: 2px solid var(--c-text-dim); }

    #summary { color: var(--c-text-dim); font-style: italic; font-size: 0.95em; }

    /* \u2500\u2500 Solo Map \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    #solo-map { display: flex; flex-direction: column; gap: 0.55em; }

    .sm-entry {
      background: var(--c-input-bg);
      border: 1px solid var(--c-border);
      border-radius: 2px;
      padding: 0.55em 0.75em 0.5em;
      display: flex;
      flex-direction: column;
      gap: 0.4em;
    }

    .sm-head {
      display: flex;
      align-items: baseline;
      gap: 0.45em;
      flex-wrap: wrap;
    }
    .sm-chord-name { color: var(--c-text); font-size: 1.05em; font-weight: 600; }
    .sm-roman      { color: var(--c-accent); font-size: 0.88em; }
    .sm-arrow      { color: var(--c-text-dim); }
    .sm-mode       { color: var(--c-green); font-weight: 600; font-size: 0.95em; }
    .sm-why        { color: var(--c-text-dim); font-style: italic; font-size: 0.88em; }

    .sm-tones {
      display: flex;
      flex-wrap: wrap;
      gap: 0.15em 1.2em;
    }

    .sm-tone {
      display: flex;
      align-items: baseline;
      gap: 0.4em;
    }
    .sm-note { color: var(--c-text); font-size: 0.95em; min-width: 2.4em; }
    .sm-hz   { color: var(--c-text-dim); font-size: 0.9em; font-variant-numeric: tabular-nums; }

    .sm-char {
      display: flex;
      align-items: baseline;
      gap: 0.45em;
      padding-top: 0.25em;
      border-top: 1px solid hsl(0,0%,15%);
    }
    .sm-char-label    { color: var(--c-text-dim); font-size: 0.85em; text-transform: uppercase; letter-spacing: 0.05em; }
    .sm-char-note     { color: var(--c-accent); font-weight: 600; }
    .sm-char-interval { color: var(--c-text-dim); font-size: 0.88em; }

    /* \u2500\u2500 Upper Structures \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .ust-section {
      padding-top: 0.4em;
      border-top: 1px solid hsl(0,0%,15%);
      display: flex;
      flex-direction: column;
      gap: 0.3em;
    }

    .ust-section-label {
      color: var(--c-text-dim);
      font-size: 0.82em;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .ust-cards { display: flex; flex-direction: column; gap: 0.25em; }

    .ust-card {
      background: var(--c-ust-bg);
      border-radius: 2px;
      padding: 0.3em 0.55em 0.35em;
      display: flex;
      flex-direction: column;
      gap: 0.2em;
      cursor: pointer;
    }
    .ust-card:hover { background: hsl(0,0%,11%); outline: 1px solid hsl(0,0%,18%); }

    .ust-head {
      display: flex;
      align-items: baseline;
      gap: 0.45em;
      flex-wrap: wrap;
    }
    .ust-label      { color: var(--c-accent); font-weight: 700; min-width: 2.2em; font-size: 0.95em; }
    .ust-triad-name { color: var(--c-text); font-weight: 600; }
    .ust-sound      { color: var(--c-green); font-size: 0.88em; }
    .ust-ext        { color: var(--c-text-dim); font-size: 0.85em; font-style: italic; margin-left: auto; }

    .ust-tones {
      display: flex;
      gap: 1.2em;
      flex-wrap: wrap;
      padding-left: 2.2em;
    }

    .ust-tone {
      display: flex;
      align-items: baseline;
      gap: 0.35em;
    }
    .ust-note { color: var(--c-text); min-width: 2.4em; font-size: 0.92em; }

    /* \u2500\u2500 Fixed footer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .footer-pane {
      flex-shrink: 0;
      display: flex;
      justify-content: flex-end;
      padding: 0.7em 1.5em;
      border-top: 1px solid var(--c-border);
    }

    .close-btn {
      font-size: 1rem;
      line-height: 1;
      background: var(--c-control-bg);
      color: var(--c-text);
      border: 1px solid var(--c-border);
      height: 20px;
      padding: 0 1em;
      border-radius: 1em;
      cursor: pointer;
      user-select: none;
    }
    .close-btn:hover  { background: hsl(0,0%,14%); }
    .close-btn:active { background: var(--c-accent); color: var(--c-accent-fg); }
    .close-btn:focus  { outline: 2px solid var(--c-text-dim); }
  </style>
</head>
<body>
  <div class="header-pane">
    <div>
      <div class="title">Harmony Analysis \u2014 <span id="clip-name"></span></div>
      <div class="key-row">
        <span class="key-label">Key</span>
        <span id="inferred-key"></span>
        <span id="note-count"></span>
      </div>
    </div>
    <div>
      <div class="section-label" style="display:flex;align-items:center;gap:0.6em">
        Progression
        <button id="play-prog" class="apply-btn" title="Play the progression">\u25B6</button>
      </div>
      <div id="progression"></div>
    </div>
  </div>

  <div class="scroll-pane">
    <div id="sub-section">
      <div class="section-label">Substitution ideas</div>
      <ul id="sub-list"></ul>
    </div>

    <div id="summary"></div>

    <div>
      <div class="section-label">Solo Map</div>
      <div id="solo-map"></div>
    </div>
  </div>

  <div class="footer-pane">
    <button class="close-btn" onclick="closeWithResult(null)">Close</button>
  </div>
</body>
</html>
`;var Te=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chord Palette</title>
  <script>
    const DATA = __PALETTE_JSON__;
    // DATA = { keyRoot, keyName, defaultScale, scaleOptions, scales }

    const isWebKit = window.webkit?.messageHandlers?.live;
    const isWebView2 = window.chrome?.webview;

    function closeWithResult(result) {
      const msg = { method: "close_and_send", params: [JSON.stringify(result)] };
      if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);
      else if (isWebView2) window.chrome.webview.postMessage(msg);
    }

    const ROMAN_BASE = ['I','II','III','IV','V','VI','VII'];

    function scaleDegrees(pitchClasses, keyRoot, intervals) {
      return pitchClasses
        .map(pc => {
          const rel = (pc - keyRoot + 12) % 12;
          const idx = intervals.indexOf(rel);
          return idx >= 0 ? String(idx + 1) : null;
        })
        .filter(Boolean)
        .filter((d, i, arr) => arr.indexOf(d) === i);
    }

    function romanForChord(chord, index) {
      const base = ROMAN_BASE[index] ?? '?';
      const q = chord.quality;
      const isMinor = q === 'minor' || q === 'minor7' || q === 'minor9'
                   || q === 'half_diminished' || q === 'minor_major7';
      const isDim = q === 'diminished' || q === 'diminished7';
      const isHalfDim = q === 'half_diminished';
      const roman = (isMinor || isDim || isHalfDim) ? base.toLowerCase() : base;
      if (isHalfDim) return roman + '\xF8';
      if (isDim) return roman + '\xB0';
      return roman;
    }

    let selectedIndex = null;
    let useSevenths = false;
    let currentScale = DATA.defaultScale;

    // \u2500\u2500 Built-in synth preview (WebAudio) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    let _ac = null, _bus = null;
    function audioCtx() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!_ac) _ac = new AC();
      if (_ac.state === 'suspended') _ac.resume();
      return _ac;
    }
    function synthBus() {
      const ac = audioCtx();
      if (!ac) return null;
      if (!_bus) {
        _bus = ac.createGain();
        const lp = ac.createBiquadFilter();
        lp.type = 'lowpass'; lp.frequency.value = 2600; lp.Q.value = 0.4;
        _bus.connect(lp); lp.connect(ac.destination);
      }
      return _bus;
    }
    function synthChord(midiNotes, durSec = 1.1, velocity = 0.85) {
      const bus = synthBus();
      if (!bus || midiNotes.length === 0) return;
      const t0 = _ac.currentTime;
      const peak = 0.22 * velocity / Math.sqrt(Math.max(1, midiNotes.length));
      for (const m of midiNotes) {
        const osc = _ac.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = 440 * Math.pow(2, (m - 69) / 12);
        const g = _ac.createGain();
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(peak, t0 + 0.015);
        g.gain.exponentialRampToValueAtTime(peak * 0.5, t0 + 0.3);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + durSec);
        osc.connect(g); g.connect(bus);
        osc.start(t0); osc.stop(t0 + durSec + 0.05);
      }
    }
    function stackPcs(pcs, octave) {
      const base = (octave + 1) * 12;
      const out = [];
      let prev = -Infinity;
      for (const pc of pcs ?? []) {
        let p = base + (pc % 12);
        while (p <= prev) p += 12;
        out.push(p); prev = p;
      }
      return out;
    }
    function previewSelected() {
      if (selectedIndex === null) return;
      const chord = currentChords()[selectedIndex];
      if (!chord) return;
      const octave = parseInt(document.getElementById('octave-select').value);
      synthChord(stackPcs(chord.pitch_classes, octave));
    }

    function currentChords() {
      const scaleData = DATA.scales[currentScale];
      return (useSevenths ? scaleData?.sevenths : scaleData?.triads) ?? [];
    }

    function renderChords() {
      const container = document.getElementById('chord-row');
      const chords = currentChords();
      const scaleData = DATA.scales[currentScale];
      const intervals = scaleData?.intervals ?? [];
      // Dynamic column count to fill available space cleanly
      container.style.gridTemplateColumns = \`repeat(\${Math.max(chords.length, 1)}, 1fr)\`;
      container.innerHTML = '';
      chords.forEach((chord, i) => {
        const btn = document.createElement('button');
        btn.className = 'chord-btn' + (i === selectedIndex ? ' selected' : '');
        btn.dataset.index = String(i);
        const degs = scaleDegrees(chord.pitch_classes ?? [], DATA.keyRoot, intervals);
        const degsHtml = degs.length > 0
          ? \`<span class="degrees">\${degs.join('\xB7')}</span>\`
          : '';
        btn.innerHTML =
          \`<span class="roman">\${romanForChord(chord, i)}</span>\` +
          \`<span class="cname">\${chord.name}</span>\` +
          degsHtml;
        btn.addEventListener('click', () => selectChord(i));
        container.appendChild(btn);
      });
    }

    function selectChord(i) {
      selectedIndex = i;
      renderChords();
      document.getElementById('insert-btn').disabled = false;
      previewSelected();
    }

    function setTab(sevenths) {
      useSevenths = sevenths;
      selectedIndex = null;
      document.getElementById('insert-btn').disabled = true;
      document.getElementById('tab-triads').classList.toggle('active', !sevenths);
      document.getElementById('tab-sevenths').classList.toggle('active', sevenths);
      renderChords();
    }

    function setScale(scaleId) {
      currentScale = scaleId;
      selectedIndex = null;
      document.getElementById('insert-btn').disabled = true;
      const opt = DATA.scaleOptions.find(o => o.id === scaleId);
      document.getElementById('key-label').textContent = \`\${DATA.keyName} \${opt?.label ?? scaleId}\`;
      renderChords();
    }

    document.addEventListener('DOMContentLoaded', () => {
      // Populate scale selector
      const scaleSel = document.getElementById('scale-select');
      DATA.scaleOptions.forEach(opt => {
        const el = document.createElement('option');
        el.value = opt.id;
        el.textContent = opt.label;
        if (opt.id === DATA.defaultScale) el.selected = true;
        scaleSel.appendChild(el);
      });

      // Initial key label
      const defOpt = DATA.scaleOptions.find(o => o.id === DATA.defaultScale);
      document.getElementById('key-label').textContent =
        \`\${DATA.keyName} \${defOpt?.label ?? DATA.defaultScale}\`;

      scaleSel.addEventListener('change', () => setScale(scaleSel.value));

      renderChords();

      document.getElementById('insert-btn').addEventListener('click', () => {
        if (selectedIndex === null) return;
        const chord = currentChords()[selectedIndex];
        if (!chord) return;
        closeWithResult({
          action: 'insert',
          chordName: chord.name,
          length: parseFloat(document.getElementById('length-select').value),
          voicing: document.getElementById('voicing-select').value,
          octave: parseInt(document.getElementById('octave-select').value),
          selectedScale: currentScale,
        });
      });

      document.getElementById('cancel-btn').addEventListener('click', () => closeWithResult(null));
      document.getElementById('octave-select').addEventListener('change', previewSelected);
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWithResult(null); });
    });
  </script>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    * { margin: 0; }
    button, select, option { font: inherit; }

    :root {
      --c-bg:         hsl(0,0%,21%);
      --c-input-bg:   hsl(0,0%,12%);
      --c-text:       hsl(0,0%,71%);
      --c-text-dim:   hsl(0,0%,41%);
      --c-border:     hsl(0,0%,10%);
      --c-accent:     hsl(31,100%,67%);
      --c-accent-fg:  hsl(0,0%,7%);
      --c-control-bg: hsl(0,0%,16%);
      --c-hover:      hsl(0,0%,14%);
    }

    html {
      background: var(--c-bg);
      color: var(--c-text);
      font-family: "AbletonSansSmall", sans-serif;
      font-size: 11.5px;
      font-weight: 500;
      -webkit-font-smoothing: antialiased;
      height: 100%;
    }

    body {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 1em 1.2em 0.85em;
      gap: 0.75em;
      overflow: hidden;
    }

    /* \u2500\u2500 Header \u2500\u2500 */
    .header {
      display: flex;
      align-items: baseline;
      gap: 0.7em;
    }
    .title { color: var(--c-text-dim); }
    #key-label { color: var(--c-accent); font-size: 1.3em; font-weight: 600; }

    /* \u2500\u2500 Scale selector row \u2500\u2500 */
    .scale-row {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
    .scale-row label {
      color: var(--c-text-dim);
      font-size: 0.95em;
      white-space: nowrap;
    }
    #scale-select {
      flex: 1;
      background: var(--c-input-bg);
      color: var(--c-text);
      border: 1px solid var(--c-border);
      height: 20px;
      padding: 0 0.4em;
      cursor: pointer;
    }
    #scale-select:focus { outline: 1px solid var(--c-text-dim); }

    /* \u2500\u2500 Tabs \u2500\u2500 */
    .tab-row { display: flex; gap: 0.3em; }
    .tab {
      background: var(--c-control-bg);
      color: var(--c-text-dim);
      border: 1px solid var(--c-border);
      height: 18px;
      padding: 0 0.9em;
      border-radius: 1em;
      cursor: pointer;
      user-select: none;
    }
    .tab.active {
      background: var(--c-input-bg);
      color: var(--c-text);
      border-color: var(--c-text-dim);
    }
    .tab:hover { color: var(--c-text); }

    /* \u2500\u2500 Chord buttons \u2500\u2500 */
    #chord-row {
      display: grid;
      gap: 0.35em;
      flex-shrink: 0;
    }

    .chord-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2em;
      background: var(--c-input-bg);
      color: var(--c-text);
      border: 1px solid var(--c-border);
      padding: 0.5em 0.3em 0.45em;
      cursor: pointer;
      user-select: none;
      transition: border-color 0.08s;
    }
    .chord-btn:hover { background: var(--c-hover); }
    .chord-btn.selected {
      border-color: var(--c-accent);
      background: hsl(31 100% 67% / 0.12);
    }
    .roman { color: var(--c-accent); font-size: 0.9em; line-height: 1; }
    .cname { font-size: 1.05em; line-height: 1; }
    .degrees { color: var(--c-text-dim); font-size: 0.78em; letter-spacing: 0.06em; }

    /* \u2500\u2500 Options row \u2500\u2500 */
    .options-row {
      display: flex;
      gap: 1.2em;
      align-items: center;
    }

    .options-row label {
      display: flex;
      flex-direction: column;
      gap: 0.2em;
      color: var(--c-text-dim);
      font-size: 0.95em;
    }

    select {
      background: var(--c-input-bg);
      color: var(--c-text);
      border: 1px solid var(--c-border);
      height: 20px;
      padding: 0 0.4em;
      cursor: pointer;
      min-width: 6.5em;
    }
    select:focus { outline: 1px solid var(--c-text-dim); }

    hr { border: none; border-top: 1px solid var(--c-border); }

    /* \u2500\u2500 Footer \u2500\u2500 */
    .footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.5em;
      margin-top: auto;
    }

    .btn {
      background: var(--c-control-bg);
      color: var(--c-text);
      border: 1px solid var(--c-border);
      height: 20px;
      padding: 0 1em;
      border-radius: 1em;
      cursor: pointer;
      user-select: none;
    }
    .btn:hover  { background: var(--c-hover); }
    .btn:active { background: var(--c-accent); color: var(--c-accent-fg); }
    .btn:focus  { outline: 2px solid var(--c-text-dim); }
    .btn:disabled { opacity: 0.35; pointer-events: none; }

    .btn.primary {
      background: var(--c-accent);
      color: var(--c-accent-fg);
      border-color: transparent;
    }
    .btn.primary:hover { background: hsl(31,100%,60%); }
    .btn.primary:disabled {
      background: var(--c-control-bg);
      color: var(--c-text-dim);
      border-color: var(--c-border);
    }
  </style>
</head>
<body>
  <div class="header">
    <span class="title">Chord Palette \u2014</span>
    <span id="key-label"></span>
  </div>

  <div class="scale-row">
    <label for="scale-select">Scale</label>
    <select id="scale-select"></select>
  </div>

  <div class="tab-row">
    <button id="tab-triads"   class="tab active" onclick="setTab(false)">Triads</button>
    <button id="tab-sevenths" class="tab"         onclick="setTab(true)">7ths</button>
  </div>

  <div id="chord-row"></div>

  <div class="options-row">
    <label>Length
      <select id="length-select">
        <option value="1">1 beat</option>
        <option value="2">2 beats</option>
        <option value="4" selected>1 bar (4)</option>
        <option value="8">2 bars (8)</option>
        <option value="16">4 bars (16)</option>
      </select>
    </label>
    <label>Octave
      <select id="octave-select">
        <option value="3">3</option>
        <option value="4" selected>4</option>
        <option value="5">5</option>
      </select>
    </label>
    <label>Voicing
      <select id="voicing-select">
        <option value="close">Close</option>
        <option value="drop2">Drop 2</option>
        <option value="shell">Shell</option>
      </select>
    </label>
  </div>

  <hr />

  <div class="footer">
    <button id="cancel-btn" class="btn">Cancel</button>
    <button id="insert-btn" class="btn primary" disabled>Insert</button>
  </div>
</body>
</html>
`;var _e=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Session Key Map</title>
  <script>
    const DATA = __SESSION_JSON__;
    /*
      DATA = {
        dominantKey: string | null,
        sceneCount: number,
        sceneNames: string[],          // sceneCount items
        totalMidiClips: number,
        analyzedClips: number,
        tracks: Array<{
          name: string,
          clips: Array<{               // sceneCount items, null = empty
            clipName: string,
            key: string | null,        // null = couldn't determine
            score: number,
          } | null>
        }>
      }
    */

    const isWebKit = window.webkit?.messageHandlers?.live;
    const isWebView2 = window.chrome?.webview;

    function closeWithResult(result) {
      const msg = { method: "close_and_send", params: [JSON.stringify(result)] };
      if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);
      else if (isWebView2) window.chrome.webview.postMessage(msg);
    }

    // Circle of fifths position for each chromatic pitch class (C=0..B=11)
    const COF = [0,7,2,9,4,11,6,1,8,3,10,5];
    const NOTE_TO_PC = {
      'C':0,'C#':1,'Db':1,'D':2,'D#':3,'Eb':3,'E':4,'F':5,
      'F#':6,'Gb':6,'G':7,'G#':8,'Ab':8,'A':9,'A#':10,'Bb':10,'B':11
    };

    function keyToHue(keyLabel) {
      if (!keyLabel) return null;
      const m = keyLabel.match(/^([A-G][#b]?)/);
      if (!m) return null;
      const pc = NOTE_TO_PC[m[1]] ?? 0;
      const cofPos = COF[pc] ?? 0;
      return cofPos * 30;
    }

    function isMinorKey(keyLabel) {
      if (!keyLabel) return false;
      return /\\b(minor|min|m)\\b/i.test(keyLabel) || /^[a-g]/.test(keyLabel);
    }

    function cellColor(keyLabel, dominant) {
      const hue = keyToHue(keyLabel);
      if (hue === null) return null;
      const minor = isMinorKey(keyLabel);
      // Mismatch with dominant key gets a cooler, more muted treatment
      const matchesDominant = dominant && keyLabel === dominant;
      const sat = minor ? 55 : 70;
      const lig = minor ? 30 : 38;
      return \`hsl(\${hue}, \${sat}%, \${lig}%)\`;
    }

    function esc(str) {
      return String(str)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function shortKey(label) {
      if (!label) return '?';
      // "C major" \u2192 "C" + newline + "major"; "C# minor" \u2192 "C#" + newline + "minor"
      return label.replace(/\\s+(major|minor|maj|min)/i, '\\n$1');
    }

    document.addEventListener('DOMContentLoaded', () => {
      const dom = DATA.dominantKey;

      // Header
      if (dom) {
        const hue = keyToHue(dom);
        const el = document.getElementById('dominant-key');
        if (el) {
          el.textContent = dom;
          if (hue !== null) el.style.color = \`hsl(\${hue}, 80%, 65%)\`;
        }
      } else {
        const el = document.getElementById('dominant-key');
        if (el) el.textContent = 'mixed';
      }
      const countEl = document.getElementById('clip-count');
      if (countEl) countEl.textContent = \`\${DATA.analyzedClips} / \${DATA.totalMidiClips}\`;

      // Build grid
      const grid = document.getElementById('grid');

      // Scene header row
      const headerRow = document.createElement('div');
      headerRow.className = 'grid-row header-row';

      const trackLabel = document.createElement('div');
      trackLabel.className = 'cell track-label';
      headerRow.appendChild(trackLabel);

      for (let s = 0; s < DATA.sceneCount; s++) {
        const th = document.createElement('div');
        th.className = 'cell scene-header';
        const name = DATA.sceneNames[s] ?? String(s + 1);
        th.textContent = name.length > 8 ? name.slice(0, 7) + '\u2026' : name;
        headerRow.appendChild(th);
      }
      grid.appendChild(headerRow);

      // Track rows
      DATA.tracks.forEach(track => {
        const row = document.createElement('div');
        row.className = 'grid-row';

        const tl = document.createElement('div');
        tl.className = 'cell track-label';
        tl.textContent = track.name.length > 12 ? track.name.slice(0, 11) + '\u2026' : track.name;
        row.appendChild(tl);

        for (let s = 0; s < DATA.sceneCount; s++) {
          const clipData = track.clips[s] ?? null;
          const cell = document.createElement('div');
          cell.className = 'cell clip-cell';

          if (!clipData) {
            cell.classList.add('empty');
          } else if (!clipData.key) {
            cell.classList.add('no-key');
            const label = document.createElement('span');
            label.className = 'key-text';
            label.textContent = clipData.clipName ? '?' : '\u2014';
            cell.appendChild(label);
          } else {
            const bg = cellColor(clipData.key, dom);
            if (bg) cell.style.setProperty('--cell-bg', bg);
            cell.classList.add('has-key');
            if (dom && clipData.key !== dom) cell.classList.add('mismatch');

            const parts = shortKey(clipData.key).split('\\n');
            const root = document.createElement('span');
            root.className = 'key-root';
            root.textContent = parts[0] ?? '';
            const qual = document.createElement('span');
            qual.className = 'key-qual';
            qual.textContent = parts[1] ?? '';
            cell.appendChild(root);
            cell.appendChild(qual);
          }

          row.appendChild(cell);
        }

        grid.appendChild(row);
      });
    });
  </script>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    * { margin: 0; }
    button { font: inherit; }

    :root {
      --c-bg:         hsl(0,0%,21%);
      --c-input-bg:   hsl(0,0%,12%);
      --c-text:       hsl(0,0%,71%);
      --c-text-dim:   hsl(0,0%,41%);
      --c-border:     hsl(0,0%,10%);
      --c-accent:     hsl(31,100%,67%);
      --c-accent-fg:  hsl(0,0%,7%);
      --c-control-bg: hsl(0,0%,16%);
    }

    html {
      background: var(--c-bg);
      color: var(--c-text);
      font-family: "AbletonSansSmall", sans-serif;
      font-size: 11.5px;
      font-weight: 500;
      -webkit-font-smoothing: antialiased;
      height: 100%;
    }

    body {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 1em 1.2em 0.85em;
      gap: 0.7em;
      overflow: hidden;
    }

    /* \u2500\u2500 Header \u2500\u2500 */
    .header-block {}
    .title { color: var(--c-text-dim); font-size: 1.05em; }
    .summary { margin-top: 0.2em; color: var(--c-text-dim); font-size: 0.95em; }
    #dominant-key { color: var(--c-accent); }
    .summary strong { color: var(--c-text); }

    /* \u2500\u2500 Grid \u2500\u2500 */
    .grid-scroll {
      flex: 1;
      overflow: auto;
      min-height: 0;
    }

    #grid {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: max-content;
    }

    .grid-row {
      display: flex;
      gap: 2px;
    }

    .cell {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 62px;
      height: 38px;
      font-size: 0.9em;
      overflow: hidden;
    }

    .track-label {
      min-width: 80px;
      width: 80px;
      align-items: flex-end;
      padding-right: 0.5em;
      color: var(--c-text-dim);
      font-size: 0.88em;
      text-align: right;
      height: auto;
    }

    .header-row .track-label { min-height: 22px; height: 22px; }

    .scene-header {
      color: var(--c-text-dim);
      font-size: 0.88em;
      background: var(--c-input-bg);
      border: 1px solid var(--c-border);
      height: 22px;
      white-space: nowrap;
    }

    .clip-cell {
      background: var(--c-input-bg);
      border: 1px solid var(--c-border);
    }

    .clip-cell.empty {
      background: transparent;
      border: 1px solid hsl(0,0%,15%);
    }

    .clip-cell.no-key {
      color: var(--c-text-dim);
    }

    .clip-cell.has-key {
      background: var(--cell-bg, var(--c-input-bg));
      border-color: transparent;
    }

    .clip-cell.mismatch {
      outline: 1px solid hsl(0,0%,50%);
      outline-offset: -2px;
    }

    .key-text { color: var(--c-text-dim); font-size: 0.95em; }
    .key-root { color: hsl(0,0%,90%); font-size: 1.05em; font-weight: 600; line-height: 1.1; }
    .key-qual { color: hsl(0,0%,65%); font-size: 0.82em; line-height: 1; }

    /* \u2500\u2500 Footer \u2500\u2500 */
    hr { border: none; border-top: 1px solid var(--c-border); }

    .legend {
      display: flex;
      align-items: center;
      gap: 1.2em;
      color: var(--c-text-dim);
      font-size: 0.9em;
      flex-shrink: 0;
    }
    .legend-item { display: flex; align-items: center; gap: 0.35em; }
    .legend-swatch {
      width: 10px; height: 10px;
      border: 1px solid transparent;
    }
    .swatch-match { background: hsl(31,70%,38%); }
    .swatch-mismatch { background: hsl(210,60%,30%); outline: 1px solid hsl(0,0%,50%); }
    .swatch-empty { background: transparent; border-color: hsl(0,0%,15%); }

    .footer { display: flex; justify-content: flex-end; }

    .btn {
      font-size: 1rem;
      background: var(--c-control-bg);
      color: var(--c-text);
      border: 1px solid var(--c-border);
      height: 20px;
      padding: 0 1em;
      border-radius: 1em;
      cursor: pointer;
      user-select: none;
    }
    .btn:hover  { background: hsl(0,0%,14%); }
    .btn:active { background: var(--c-accent); color: var(--c-accent-fg); }
    .btn:focus  { outline: 2px solid var(--c-text-dim); }
  </style>
</head>
<body>
  <div class="header-block">
    <div class="title">Session Key Map</div>
    <div class="summary">
      Session key: <span id="dominant-key"></span>
      &ensp;\xB7&ensp;
      <span id="clip-count"></span> clips analyzed
    </div>
  </div>

  <div class="grid-scroll">
    <div id="grid"></div>
  </div>

  <div class="legend">
    <span class="legend-item"><span class="legend-swatch swatch-match"></span> matches session key</span>
    <span class="legend-item"><span class="legend-swatch swatch-mismatch"></span> different key</span>
    <span class="legend-item"><span class="legend-swatch swatch-empty"></span> empty</span>
  </div>

  <hr />

  <div class="footer">
    <button class="btn" onclick="closeWithResult(null)">Close</button>
  </div>
</body>
</html>
`;var Ae=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<script>
  const isWebKit = window.webkit?.messageHandlers?.live;
  const isWebView2 = window.chrome?.webview;
  function closeWithResult(result) {
    const msg = { method: "close_and_send", params: [JSON.stringify(result)] };
    if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);
    else if (isWebView2) window.chrome.webview.postMessage(msg);
  }
</script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 13px;
    background: #1e1e1e;
    color: #d4d4d4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 16px;
    padding: 16px;
  }
  h2 { font-size: 14px; font-weight: 600; color: #e0e0e0; }
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  button.adj {
    width: 28px; height: 28px;
    background: #3a3a3a;
    border: 1px solid #555;
    border-radius: 4px;
    color: #d4d4d4;
    font-size: 18px;
    cursor: pointer;
    line-height: 1;
  }
  button.adj:hover { background: #4a4a4a; }
  #display {
    width: 56px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    background: #2a2a2a;
    border: 1px solid #555;
    border-radius: 4px;
    padding: 4px 0;
  }
  .presets {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
  }
  button.preset {
    padding: 3px 10px;
    background: #2a2a2a;
    border: 1px solid #555;
    border-radius: 4px;
    color: #bbb;
    font-size: 11px;
    cursor: pointer;
  }
  button.preset:hover { background: #3a3a3a; color: #fff; }
  .actions { display: flex; gap: 8px; margin-top: 4px; }
  button.primary {
    padding: 6px 22px;
    background: #0e639c;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
    font-weight: 600;
  }
  button.primary:hover { background: #1177bb; }
  button.cancel {
    padding: 6px 16px;
    background: #3a3a3a;
    border: 1px solid #555;
    border-radius: 4px;
    color: #ccc;
    font-size: 13px;
    cursor: pointer;
  }
  button.cancel:hover { background: #4a4a4a; }
</style>
</head>
<body>
<h2>Batch Transpose</h2>
<div class="row">
  <button class="adj" id="down">\u2212</button>
  <div id="display">0</div>
  <button class="adj" id="up">+</button>
</div>
<div class="presets">
  <button class="preset" data-v="-12">\u221212</button>
  <button class="preset" data-v="-7">\u22127</button>
  <button class="preset" data-v="-5">\u22125</button>
  <button class="preset" data-v="-2">\u22122</button>
  <button class="preset" data-v="-1">\u22121</button>
  <button class="preset" data-v="1">+1</button>
  <button class="preset" data-v="2">+2</button>
  <button class="preset" data-v="5">+5</button>
  <button class="preset" data-v="7">+7</button>
  <button class="preset" data-v="12">+12</button>
</div>
<div class="actions">
  <button class="cancel" id="cancelBtn">Cancel</button>
  <button class="primary" id="transposeBtn">Transpose</button>
</div>
<script>
  let semitones = 0;
  const display = document.getElementById("display");
  function update() {
    display.textContent = semitones > 0 ? "+" + semitones : String(semitones);
    display.style.color = semitones === 0 ? "#888" : semitones > 0 ? "#7ec8e3" : "#f28b82";
  }
  document.getElementById("up").addEventListener("click", () => { if (semitones < 24) { semitones++; update(); } });
  document.getElementById("down").addEventListener("click", () => { if (semitones > -24) { semitones--; update(); } });
  document.querySelectorAll(".preset").forEach(btn => {
    btn.addEventListener("click", () => { semitones = parseInt(btn.dataset.v, 10); update(); });
  });
  document.getElementById("transposeBtn").addEventListener("click", () => {
    if (semitones === 0) { closeWithResult(null); return; }
    closeWithResult({ action: "transpose", semitones });
  });
  document.getElementById("cancelBtn").addEventListener("click", () => closeWithResult(null));
</script>
</body>
</html>
`;var Ne=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<script>
  const isWebKit = window.webkit?.messageHandlers?.live;
  const isWebView2 = window.chrome?.webview;
  function closeWithResult(result) {
    const msg = { method: "close_and_send", params: [JSON.stringify(result)] };
    if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);
    else if (isWebView2) window.chrome.webview.postMessage(msg);
  }
</script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 13px;
    background: #1e1e1e;
    color: #d4d4d4;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  header {
    padding: 12px 16px 10px;
    border-bottom: 1px solid #333;
    flex-shrink: 0;
  }
  header h2 { font-size: 14px; font-weight: 600; color: #e0e0e0; }
  header p { font-size: 11px; color: #888; margin-top: 3px; }
  .list-wrap {
    flex: 1;
    overflow-y: auto;
    padding: 0 0 8px;
  }
  table { width: 100%; border-collapse: collapse; }
  thead th {
    font-size: 11px;
    color: #666;
    text-align: left;
    padding: 6px 8px 5px;
    border-bottom: 1px solid #2a2a2a;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    position: sticky;
    top: 0;
    background: #1e1e1e;
    z-index: 1;
  }
  tbody tr { border-bottom: 1px solid #252525; }
  tbody tr:hover { background: #252525; }
  tbody td { padding: 5px 8px; vertical-align: middle; }
  .swatch {
    display: inline-block;
    width: 9px; height: 9px;
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: middle;
    flex-shrink: 0;
  }
  .key-cell { display: flex; align-items: center; }
  .compat-badge {
    display: inline-block;
    padding: 1px 6px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 500;
    white-space: nowrap;
  }
  .badge-same    { background: #1f4d2a; color: #7ec87e; }
  .badge-rel     { background: #1a3d4d; color: #7ec8e3; }
  .badge-dom     { background: #4d3a1a; color: #e3b87e; }
  .badge-sub     { background: #3a1a4d; color: #c87ee3; }
  .badge-par     { background: #2a2a2a; color: #aaa; }
  .track-name    { font-size: 11px; color: #777; }

  /* Section dividers */
  .section-header {
    font-size: 10px;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    font-weight: 600;
    padding: 10px 8px 4px;
    border-top: 1px solid #2a2a2a;
    margin-top: 4px;
  }
  .section-header:first-child { border-top: none; margin-top: 0; }

  /* Progression suggestions */
  .sugg-table tbody td { padding: 5px 8px; }
  .template-cell {
    font-size: 11px;
    color: #777;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .chords-cell {
    font-size: 12px;
    color: #bbb;
    letter-spacing: 0.02em;
  }

  .empty {
    color: #555;
    text-align: center;
    padding: 20px 16px 4px;
    font-size: 12px;
    line-height: 1.8;
  }

  footer {
    padding: 8px 16px;
    border-top: 1px solid #333;
    display: flex;
    justify-content: flex-end;
    flex-shrink: 0;
  }
  button.close-btn {
    padding: 5px 18px;
    background: #3a3a3a;
    border: 1px solid #555;
    border-radius: 4px;
    color: #ccc;
    font-size: 13px;
    cursor: pointer;
  }
  button.close-btn:hover { background: #4a4a4a; }
  button.write-btn {
    padding: 2px 8px;
    background: #1f3a1f;
    border: 1px solid #3a6b3a;
    border-radius: 3px;
    color: #7ec87e;
    font-size: 11px;
    cursor: pointer;
    white-space: nowrap;
  }
  button.write-btn:hover { background: #2a4f2a; border-color: #5a9e5a; }
</style>
</head>
<body>
<header>
  <h2 id="title">Compatible Clips</h2>
  <p id="subtitle"></p>
</header>
<div class="list-wrap" id="listWrap"></div>
<footer>
  <button class="close-btn" id="closeBtn">Close</button>
</footer>
<script>
  const data = __COMPATIBLE_JSON__;

  document.getElementById("title").textContent =
    \`Compatible \u2014 \${data.refClipName}\`;
  document.getElementById("subtitle").textContent =
    \`Reference key: \${data.refKey}  \xB7  \${data.results.length} clip\${data.results.length !== 1 ? "s" : ""}  \xB7  \${data.suggestions.length} progression\${data.suggestions.length !== 1 ? "s" : ""}\`;

  function badgeClass(compat) {
    if (compat === "Same key") return "badge-same";
    if (compat.startsWith("Relative")) return "badge-rel";
    if (compat.startsWith("Dominant") || compat.startsWith("Subdominant")) return "badge-dom";
    if (compat.startsWith("Parallel")) return "badge-par";
    return "badge-sub";
  }

  function colorToCSS(n) {
    const r = (n >> 16) & 0xff;
    const g = (n >> 8) & 0xff;
    const b = n & 0xff;
    return \`rgb(\${r},\${g},\${b})\`;
  }

  const wrap = document.getElementById("listWrap");

  // \u2500\u2500 Compatible clips \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  const clipsHeader = document.createElement("div");
  clipsHeader.className = "section-header section-header:first-child";
  clipsHeader.style.borderTop = "none";
  clipsHeader.textContent = "Compatible Clips";
  wrap.appendChild(clipsHeader);

  if (data.results.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No harmonically compatible clips found in session.";
    wrap.appendChild(empty);
  } else {
    const table = document.createElement("table");
    table.innerHTML = \`
      <thead>
        <tr>
          <th>Clip</th>
          <th>Track</th>
          <th>Key</th>
          <th>Relationship</th>
        </tr>
      </thead>
      <tbody id="clipBody"></tbody>
    \`;
    wrap.appendChild(table);
    const tbody = document.getElementById("clipBody");
    for (const clip of data.results) {
      const tr = document.createElement("tr");
      tr.innerHTML = \`
        <td>\${clip.clipName}</td>
        <td class="track-name">\${clip.trackName}</td>
        <td>
          <div class="key-cell">
            <span class="swatch" style="background:\${colorToCSS(clip.color)}"></span>
            \${clip.key}
          </div>
        </td>
        <td>
          <span class="compat-badge \${badgeClass(clip.compatibility)}">\${clip.compatibility}</span>
        </td>
      \`;
      tbody.appendChild(tr);
    }
  }

  // \u2500\u2500 Compatible progressions \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

  if (data.suggestions && data.suggestions.length > 0) {
    const suggHeader = document.createElement("div");
    suggHeader.className = "section-header";
    suggHeader.textContent = "Compatible Progressions";
    wrap.appendChild(suggHeader);

    const suggTable = document.createElement("table");
    suggTable.className = "sugg-table";
    suggTable.innerHTML = \`<tbody id="suggBody"></tbody>\`;
    wrap.appendChild(suggTable);

    const suggBody = document.getElementById("suggBody");
    data.suggestions.forEach((s, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = \`
        <td><span class="compat-badge \${badgeClass(s.relationship)}">\${s.relationship}</span></td>
        <td>
          <div class="key-cell">
            <span class="swatch" style="background:\${colorToCSS(s.color)}"></span>
            \${s.keyLabel}
          </div>
        </td>
        <td class="template-cell">\${s.template}</td>
        <td class="chords-cell">\${s.chords.join(" \xB7 ")}</td>
        <td><button class="write-btn" data-idx="\${idx}">Write \u2192</button></td>
      \`;
      suggBody.appendChild(tr);
    });

    suggBody.addEventListener("click", e => {
      const btn = e.target.closest(".write-btn");
      if (!btn) return;
      const s = data.suggestions[+btn.dataset.idx];
      closeWithResult({ action: "writeProgression", suggestion: s });
    });
  }

  document.getElementById("closeBtn").addEventListener("click", () => closeWithResult(null));
</script>
</body>
</html>
`;var Pe=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<script>
  const isWebKit = window.webkit?.messageHandlers?.live;
  const isWebView2 = window.chrome?.webview;
  function closeWithResult(result) {
    const msg = { method: "close_and_send", params: [JSON.stringify(result)] };
    if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);
    else if (isWebView2) window.chrome.webview.postMessage(msg);
  }
</script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 13px;
    background: #1e1e1e;
    color: #d4d4d4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 14px;
    padding: 16px;
  }
  h2 { font-size: 14px; font-weight: 600; color: #e0e0e0; }
  .row { display: flex; align-items: center; gap: 10px; }
  button.adj {
    width: 28px; height: 28px;
    background: #3a3a3a; border: 1px solid #555;
    border-radius: 4px; color: #d4d4d4;
    font-size: 18px; cursor: pointer; line-height: 1;
  }
  button.adj:hover { background: #4a4a4a; }
  #display {
    width: 56px; text-align: center;
    font-size: 20px; font-weight: 700; color: #888;
    background: #2a2a2a; border: 1px solid #555;
    border-radius: 4px; padding: 4px 0;
  }
  .presets { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
  button.preset {
    padding: 3px 10px; background: #2a2a2a; border: 1px solid #555;
    border-radius: 4px; color: #bbb; font-size: 11px; cursor: pointer;
  }
  button.preset:hover { background: #3a3a3a; color: #fff; }
  .recolor-row {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: #aaa; cursor: pointer;
  }
  .recolor-row input { accent-color: #0e639c; cursor: pointer; }
  .actions { display: flex; gap: 8px; }
  button.primary {
    padding: 6px 22px; background: #0e639c; border: none;
    border-radius: 4px; color: #fff; font-size: 13px;
    cursor: pointer; font-weight: 600;
  }
  button.primary:hover { background: #1177bb; }
  button.cancel {
    padding: 6px 16px; background: #3a3a3a; border: 1px solid #555;
    border-radius: 4px; color: #ccc; font-size: 13px; cursor: pointer;
  }
  button.cancel:hover { background: #4a4a4a; }
</style>
</head>
<body>
<h2>Transpose Session</h2>
<div class="row">
  <button class="adj" id="down">\u2212</button>
  <div id="display">0</div>
  <button class="adj" id="up">+</button>
</div>
<div class="presets">
  <button class="preset" data-v="-12">\u221212</button>
  <button class="preset" data-v="-7">\u22127</button>
  <button class="preset" data-v="-5">\u22125</button>
  <button class="preset" data-v="-2">\u22122</button>
  <button class="preset" data-v="-1">\u22121</button>
  <button class="preset" data-v="1">+1</button>
  <button class="preset" data-v="2">+2</button>
  <button class="preset" data-v="5">+5</button>
  <button class="preset" data-v="7">+7</button>
  <button class="preset" data-v="12">+12</button>
</div>
<label class="recolor-row">
  <input type="checkbox" id="recolor" checked />
  Re-color clips by key after transposing
</label>
<div class="actions">
  <button class="cancel" id="cancelBtn">Cancel</button>
  <button class="primary" id="transposeBtn">Transpose</button>
</div>
<script>
  let semitones = 0;
  const display = document.getElementById("display");
  function update() {
    display.textContent = semitones > 0 ? "+" + semitones : String(semitones);
    display.style.color = semitones === 0 ? "#888" : semitones > 0 ? "#7ec8e3" : "#f28b82";
  }
  document.getElementById("up").addEventListener("click", () => { if (semitones < 24) { semitones++; update(); } });
  document.getElementById("down").addEventListener("click", () => { if (semitones > -24) { semitones--; update(); } });
  document.querySelectorAll(".preset").forEach(btn => {
    btn.addEventListener("click", () => { semitones = parseInt(btn.dataset.v, 10); update(); });
  });
  document.getElementById("transposeBtn").addEventListener("click", () => {
    const recolor = document.getElementById("recolor").checked;
    if (semitones === 0 && !recolor) { closeWithResult(null); return; }
    closeWithResult({ action: "transpose", semitones, recolor });
  });
  document.getElementById("cancelBtn").addEventListener("click", () => closeWithResult(null));
</script>
</body>
</html>
`;var Re=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modal Explorer</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:       hsl(0,0%,14%);
      --bg-2:     hsl(0,0%,18%);
      --bg-3:     hsl(0,0%,22%);
      --input-bg: hsl(0,0%,10%);
      --text:     hsl(0,0%,75%);
      --dim:      hsl(0,0%,44%);
      --border:   hsl(0,0%,8%);
      --accent:   hsl(31,100%,67%);

      --q-major: hsl(31,100%,67%);
      --q-minor: hsl(210,55%,62%);
      --q-dim:   hsl(0,55%,58%);
      --q-dom7:  hsl(45,90%,62%);
      --q-maj7:  hsl(65,80%,58%);
      --q-min7:  hsl(200,60%,58%);
    }

    html {
      background: var(--bg);
      color: var(--text);
      font-family: "Segoe UI", system-ui, sans-serif;
      font-size: 13px;
    }

    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 1.25em;
      padding: 1.5em 2em 2.5em;
      max-width: 1060px;
      margin: 0 auto;
    }

    /* \u2500\u2500 Header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .app-header {
      display: flex;
      align-items: center;
      gap: 1.25em;
      flex-wrap: wrap;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1em;
    }

    .app-title {
      font-size: 1.15em;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
      flex-shrink: 0;
    }

    .header-controls {
      display: flex;
      align-items: center;
      gap: 0.6em;
      flex-wrap: wrap;
    }

    .ctrl-label { color: var(--dim); font-size: 0.9em; }

    select {
      background: var(--input-bg);
      color: var(--text);
      border: 1px solid var(--border);
      padding: 0.22em 0.5em;
      font: inherit;
      cursor: pointer;
      height: 22px;
    }
    select:focus { outline: 1px solid var(--dim); }

    .check-ctrl {
      display: flex; align-items: center; gap: 0.35em;
      color: var(--dim); cursor: pointer; font-size: 0.9em;
      user-select: none;
    }
    .check-ctrl input { accent-color: var(--accent); cursor: pointer; }

    .status {
      margin-left: auto;
      display: flex; align-items: center; gap: 0.45em;
      font-size: 0.85em; color: var(--dim);
    }
    .dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: hsl(120,55%,42%);
      flex-shrink: 0;
    }
    .dot.off { background: hsl(0,55%,42%); }

    /* \u2500\u2500 Chord grid \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    #chord-grid {
      display: grid;
      gap: 0.5em;
    }

    .chord-btn {
      background: var(--bg-2);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 0.75em 0.4em 0.65em;
      cursor: pointer;
      display: flex; flex-direction: column; align-items: center; gap: 0.28em;
      transition: border-color 0.08s, background 0.08s;
      user-select: none; min-width: 0;
    }
    .chord-btn:hover   { background: var(--bg-3); }
    .chord-btn.active  { border-color: var(--accent); background: hsl(31 100% 67%/0.09); }

    .c-roman  { font-size: 1.05em; font-weight: 700; line-height: 1; }
    .c-name   { font-size: 1.1em;  line-height: 1; }
    .c-degs   { font-size: 0.78em; color: var(--dim); letter-spacing: 0.05em; }
    .c-bar    { width: 100%; height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; margin-top: 0.15em; }
    .c-fill   { height: 100%; background: hsl(31,50%,40%); border-radius: 2px; }

    .q-major { color: var(--q-major); }
    .q-minor { color: var(--q-minor); }
    .q-dim   { color: var(--q-dim);   }
    .q-dom7  { color: var(--q-dom7);  }
    .q-maj7  { color: var(--q-maj7);  }
    .q-min7  { color: var(--q-min7);  }

    /* \u2500\u2500 Detail panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    #detail {
      background: var(--bg-2);
      border: 1px solid var(--border);
      padding: 1.25em 1.5em;
      display: flex; flex-direction: column; gap: 1em;
    }
    #detail.hidden { display: none; }

    .d-head {
      display: flex; align-items: baseline; gap: 0.7em; flex-wrap: wrap;
    }
    .d-name  { font-size: 2em; font-weight: 700; line-height: 1; }
    .d-roman { font-size: 1.4em; color: var(--dim); }
    .d-qual  { font-size: 0.9em; color: var(--dim); margin-left: auto; }
    .d-notes { font-size: 0.95em; color: var(--dim); letter-spacing: 0.1em; }

    /* \u2500\u2500 Piano keyboard \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .piano-wrap { overflow-x: auto; padding-bottom: 0.25em; }

    .piano {
      display: flex;
      align-items: flex-start;
      height: 82px;
      width: max-content;
      user-select: none;
    }

    .key {
      position: relative;
      border: 1px solid hsl(0,0%,7%);
      border-radius: 0 0 3px 3px;
      flex-shrink: 0;
    }
    .key.w {
      width: 26px; height: 82px; z-index: 1;
      background: hsl(0,0%,87%);
    }
    .key.b {
      width: 16px; height: 52px; z-index: 2;
      background: hsl(0,0%,13%);
      margin-left: -8px; margin-right: -8px;
    }

    .key.w.scale { background: hsl(0,0%,74%); }
    .key.b.scale { background: hsl(0,0%,24%); }

    .key.w.chord { background: hsl(31,85%,74%); }
    .key.b.chord { background: hsl(31,75%,44%); }

    .key.w.char { background: hsl(55,90%,76%); }
    .key.b.char { background: hsl(55,80%,42%); }

    .key .lbl {
      position: absolute; bottom: 4px; left: 50%;
      transform: translateX(-50%);
      font-size: 8px; white-space: nowrap;
      color: hsl(0,0%,42%); pointer-events: none;
    }
    .key.chord .lbl { color: hsl(31,80%,32%); }

    .piano-legend {
      display: flex; gap: 1.2em;
      font-size: 0.8em; color: var(--dim); align-items: center;
      flex-wrap: wrap;
    }
    .swatch {
      display: inline-block; width: 11px; height: 11px; border-radius: 2px;
      vertical-align: middle; margin-right: 0.3em;
    }

    /* \u2500\u2500 Play controls \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .play-row {
      display: flex; align-items: center; gap: 0.75em; flex-wrap: wrap;
    }

    .vbtn-group { display: flex; gap: 0.25em; }

    .vbtn {
      background: var(--bg-3); border: 1px solid var(--border);
      color: var(--dim); padding: 0.25em 0.8em;
      cursor: pointer; font: inherit; font-size: 0.9em;
    }
    .vbtn.on { background: var(--input-bg); color: var(--text); border-color: var(--dim); }
    .vbtn:hover { color: var(--text); }

    .sep { width: 1px; height: 1.4em; background: var(--border); flex-shrink: 0; }

    .play-btn {
      background: var(--accent); color: hsl(0,0%,7%);
      border: none; padding: 0.4em 1.6em;
      cursor: pointer; font: inherit; font-size: 0.95em; font-weight: 700;
      letter-spacing: 0.04em;
    }
    .play-btn:hover   { background: hsl(31,100%,58%); }
    .play-btn:active  { background: hsl(31,100%,48%); }
    .play-btn:disabled { opacity: 0.35; cursor: default; }

    .midi-note {
      font-size: 0.82em; color: var(--dim); font-style: italic;
      transition: opacity 0.3s;
    }

    /* \u2500\u2500 Empty / loading states \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .empty { color: var(--dim); padding: 0.75em 0; }

    /* \u2500\u2500 Progression strip \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    #prog-panel {
      background: var(--bg-2); border: 1px solid var(--border);
      padding: 0.85em 1.25em;
      display: flex; flex-direction: column; gap: 0.6em;
    }
    .prog-header {
      display: flex; align-items: center; justify-content: space-between;
      gap: 0.5em; flex-wrap: wrap;
    }
    .section-label {
      font-size: 0.78em; text-transform: uppercase; letter-spacing: 0.12em;
      color: var(--dim);
    }
    .prog-actions { display: flex; gap: 0.35em; }
    .chip.playing { box-shadow: 0 0 0 1px hsl(31 100% 67%); }
    #prog-chips {
      display: flex; align-items: center; gap: 0.4em; flex-wrap: wrap;
      min-height: 1.8em;
    }
    .prog-empty { color: var(--dim); font-size: 0.88em; font-style: italic; }
    .chip {
      display: flex; align-items: center; gap: 0.3em;
      background: var(--bg-3); border: 1px solid var(--border);
      padding: 0.18em 0.45em 0.18em 0.6em; font-size: 0.88em;
    }
    .chip-roman { font-weight: 700; }
    .chip-x {
      background: none; border: none; color: var(--dim);
      cursor: pointer; font-size: 0.82em; padding: 0 0.1em; line-height: 1;
    }
    .chip-x:hover { color: var(--text); }
    .sm-btn {
      background: var(--bg-3); border: 1px solid var(--border);
      color: var(--dim); padding: 0.2em 0.8em;
      cursor: pointer; font: inherit; font-size: 0.85em;
    }
    .sm-btn:hover { color: var(--text); }
    .sm-btn.primary {
      background: var(--accent); color: hsl(0,0%,7%);
      border-color: transparent; font-weight: 700;
    }
    .sm-btn.primary:hover { background: hsl(31,100%,58%); }
    .sm-btn:disabled { opacity: 0.35; cursor: default; }

    /* \u2500\u2500 Analysis panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    #analysis {
      background: var(--bg-2); border: 1px solid var(--border);
      padding: 1.25em 1.5em; display: flex; flex-direction: column; gap: 1.1em;
    }
    #analysis.hidden { display: none; }
    .a-section { display: flex; flex-direction: column; gap: 0.5em; }
    .key-line  { font-size: 1.05em; }
    .key-name  { color: var(--accent); font-weight: 700; }
    .key-score { color: var(--dim); font-size: 0.88em; margin-left: 0.5em; }
    .chord-analysis-row {
      display: grid; grid-template-columns: 3.5em 6.5em 1fr 3.5em;
      align-items: center; gap: 0.6em;
      padding: 0.3em 0; border-bottom: 1px solid var(--border);
    }
    .chord-analysis-row:last-child { border-bottom: none; }
    .car-roman { font-weight: 700; font-size: 0.95em; }
    .car-name  { font-size: 0.92em; color: var(--dim); }
    .car-bar   { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
    .car-fill  { height: 100%; border-radius: 3px; }
    .car-vl    { font-size: 0.8em; color: var(--dim); text-align: right; white-space: nowrap; }
    .sub-list  { display: flex; flex-direction: column; gap: 0.45em; }
    .sub-card  {
      background: var(--bg-3); border: 1px solid var(--border);
      padding: 0.6em 0.9em; display: flex; flex-direction: column; gap: 0.2em;
    }
    .sub-head  { display: flex; align-items: baseline; gap: 0.55em; flex-wrap: wrap; }
    .sub-pos   { font-size: 0.78em; color: var(--dim); }
    .sub-orig  { color: var(--dim); text-decoration: line-through; }
    .sub-arr   { color: var(--dim); }
    .sub-repl  { color: var(--accent); font-weight: 600; }
    .sub-why   { font-size: 0.82em; color: var(--dim); }

    .chip { cursor: grab; }
    .chip:active { cursor: grabbing; }
    .chip.dragging { opacity: 0.35; }
    .chip.drag-over { border-color: var(--accent); }

    /* \u2500\u2500 Mode card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    #mode-card {
      background: var(--bg-2);
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent);
      padding: 1em 1.5em;
      display: flex; flex-direction: column; gap: 0.55em;
    }
    .mc-header { display: flex; align-items: baseline; gap: 0.65em; flex-wrap: wrap; }
    .mc-name   { font-size: 1.4em; font-weight: 700; color: var(--accent); line-height: 1; }
    .mc-alias  { color: var(--dim); font-size: 0.88em; }
    .mc-char   { color: var(--text); font-size: 0.93em; line-height: 1.55; }
    .mc-meta   { display: flex; align-items: center; gap: 0.9em; flex-wrap: wrap; }
    .mc-badge  {
      background: hsl(31,60%,18%); color: hsl(31,100%,72%);
      border: 1px solid hsl(31,55%,30%);
      padding: 0.14em 0.6em; font-size: 0.78em; border-radius: 99px;
      white-space: nowrap;
    }
    .mc-parent { font-size: 0.8em; color: var(--dim); font-style: italic; }
    .mc-examples { display: flex; gap: 0.4em; flex-wrap: wrap; }
    .mc-example  {
      background: var(--bg-3); border: 1px solid var(--border);
      padding: 0.14em 0.6em; font-size: 0.78em; color: var(--dim);
    }

    .summary-box {
      font-size: 0.95em; line-height: 1.65;
      border-left: 2px solid var(--accent);
      padding: 0.7em 1em;
      background: var(--bg-3);
      color: var(--text);
    }

    /* \u2500\u2500 Modal interchange \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .mc-borrow { display:flex; gap:0.5em; align-items:baseline; font-size:0.82em; line-height:1.55; }
    .mc-borrow-chord { color:var(--accent); font-weight:700; white-space:nowrap; min-width:3.5em; flex-shrink:0; }
    .mc-borrow-desc  { color:var(--dim); }
  </style>
</head>
<body>

<!-- Header -->
<div class="app-header">
  <span class="app-title">Modal Explorer</span>

  <div class="header-controls">
    <span class="ctrl-label">Key</span>
    <select id="key-sel">
      <option value="0">C</option><option value="1">C# / D\u266D</option>
      <option value="2">D</option><option value="3">D# / E\u266D</option>
      <option value="4">E</option><option value="5">F</option>
      <option value="6">F# / G\u266D</option><option value="7">G</option>
      <option value="8">G# / A\u266D</option><option value="9">A</option>
      <option value="10">A# / B\u266D</option><option value="11">B</option>
    </select>

    <span class="ctrl-label">Mode</span>
    <select id="scale-sel">
      <option value="major">Major</option>
      <option value="natural_minor">Natural Minor</option>
      <option value="dorian">Dorian</option>
      <option value="phrygian">Phrygian</option>
      <option value="lydian">Lydian</option>
      <option value="mixolydian">Mixolydian</option>
      <option value="locrian">Locrian</option>
      <option value="harmonic_minor">Harmonic Minor</option>
      <option value="melodic_minor">Melodic Minor</option>
      <option value="pentatonic_major">Pentatonic Major</option>
      <option value="pentatonic_minor">Pentatonic Minor</option>
      <option value="blues">Blues</option>
    </select>

    <label class="check-ctrl">
      <input type="checkbox" id="sevenths-cb"> 7ths
    </label>
    <span class="ctrl-label">Load Vamp</span>
    <select id="vamp-sel" style="min-width:9em">
      <option value="">\u2014 vamp \u2014</option>
      <option value="static">Static tonic</option>
      <option value="i-bVII">i \u2013 \u266DVII</option>
      <option value="i-IV">i \u2013 IV (Dorian)</option>
      <option value="i-bVI-bVII">i \u2013 \u266DVI \u2013 \u266DVII</option>
      <option value="i-bVII-bVI-bVII">i \u2013 \u266DVII \u2013 \u266DVI \u2013 \u266DVII</option>
      <option value="phryg">i \u2013 \u266DII (Phrygian)</option>
      <option value="lydian-II">I \u2013 II (Lydian)</option>
      <option value="mixo-bVII">I \u2013 \u266DVII (Mixolydian)</option>
      <option value="ii-V-I">ii \u2013 V \u2013 I (modal)</option>
      <option value="backdoor">\u266DVII \u2013 I (backdoor)</option>
      <option value="quartal">Quartal ascent</option>
    </select>
  </div>

  <div class="status">
    <div class="dot off" id="dot"></div>
    <span id="status-txt">Connecting\u2026</span>
  </div>
</div>

<!-- Chord grid -->
<div id="chord-grid"><div class="empty">Loading\u2026</div></div>

<!-- Mode info card -->
<div id="mode-card">
  <div class="mc-header">
    <span class="mc-name" id="mc-name"></span>
    <span class="mc-alias" id="mc-alias"></span>
  </div>
  <div class="mc-char" id="mc-char"></div>
  <div class="mc-meta">
    <span class="mc-badge" id="mc-badge"></span>
    <span class="mc-parent" id="mc-parent"></span>
  </div>
  <div class="mc-examples" id="mc-examples"></div>
  <div id="mc-borrows-sep" style="display:none;flex-direction:column;gap:0.35em;padding-top:0.55em;border-top:1px solid var(--border);margin-top:0.1em">
    <span class="section-label">Modal Interchange</span>
    <div id="mc-borrows"></div>
  </div>
</div>

<!-- Circle of Fifths -->
<div style="background:var(--bg-2);border:1px solid var(--border);padding:0.9em 1.25em;display:flex;flex-direction:column;gap:0.6em;">
  <span class="section-label">Circle of Fifths</span>
  <svg id="cof-svg" viewBox="0 0 360 360" style="width:100%;max-width:340px;height:auto;display:block;margin:0 auto"></svg>
</div>

<!-- Progression builder -->
<div id="prog-panel">
  <div class="prog-header">
    <span class="section-label">Vamp</span>
    <div class="prog-actions">
      <button class="sm-btn" id="vamp-btn" disabled>\u25B6 Play</button>
      <button class="sm-btn" id="clear-btn" disabled>Clear</button>
      <button class="sm-btn primary" id="analyze-btn" disabled>Interpret \u2192</button>
    </div>
  </div>
  <div id="prog-chips">
    <span class="prog-empty">Select a chord above, then click + Add \u2014 or load a vamp template</span>
  </div>
  <div id="write-clip-row" style="display:none;align-items:center;gap:0.6em;flex-wrap:wrap;padding-top:0.4em">
    <span class="ctrl-label">Beats/chord</span>
    <select id="bpc-sel">
      <option value="1">1 beat</option>
      <option value="2">2 beats</option>
      <option value="4" selected>1 bar (4)</option>
      <option value="8">2 bars (8)</option>
      <option value="16">4 bars (16)</option>
    </select>
    <span class="ctrl-label">Rhythm</span>
    <select id="rhythm-sel">
      <option value="block">Block Chords</option>
      <option value="halves">Halves</option>
      <option value="quarters">Quarters</option>
      <option value="pump_8ths">Pumping 8ths</option>
      <option value="swung_8ths">Swung 8ths</option>
      <option value="charleston">Charleston</option>
      <option value="tresillo">Tresillo (3-3-2)</option>
      <option value="boom_chuck">Boom-Chuck</option>
      <option value="syncopated">Syncopated</option>
      <option value="offbeats">Offbeat Skank</option>
      <option value="arp_up_8ths">Arpeggio Up (8ths)</option>
    </select>
    <button class="sm-btn primary" id="write-btn">Write to Clip</button>
    <button class="sm-btn" id="cancel-modal-btn">Cancel</button>
  </div>
</div>

<!-- Detail panel -->
<div id="detail" class="hidden">
  <div class="d-head">
    <span class="d-name" id="d-name"></span>
    <span class="d-roman" id="d-roman"></span>
    <span class="d-qual"  id="d-qual"></span>
  </div>
  <div class="d-notes" id="d-notes"></div>

  <div class="piano-wrap">
    <div class="piano" id="piano"></div>
  </div>
  <div class="piano-legend">
    <span><span class="swatch" style="background:hsl(31,85%,74%)"></span>Chord tone</span>
    <span><span class="swatch" style="background:hsl(55,90%,76%)"></span>Characteristic tone</span>
    <span><span class="swatch" style="background:hsl(0,0%,74%)"></span>Scale tone</span>
    <span><span class="swatch" style="background:hsl(0,0%,87%)"></span>Out of scale</span>
  </div>

  <div class="play-row">
    <div class="vbtn-group" id="vbtn-group">
      <button class="vbtn on" data-v="close">Close</button>
      <button class="vbtn" data-v="drop2">Drop 2</button>
      <button class="vbtn" data-v="shell">Shell</button>
    </div>
    <div class="sep"></div>
    <span class="ctrl-label">Oct</span>
    <select id="oct-sel">
      <option value="3">3</option>
      <option value="4" selected>4</option>
      <option value="5">5</option>
    </select>
    <div class="sep"></div>
    <span class="ctrl-label">MIDI Out</span>
    <select id="midi-sel"><option value="">\u2014 no MIDI \u2014</option></select>
    <button class="play-btn" id="play-btn" disabled>\u25B6 PLAY</button>
    <button class="play-btn" id="add-btn"
      style="background:var(--bg-3);color:var(--text);border:1px solid var(--border);"
      disabled>+ Add</button>
    <span class="midi-note" id="midi-note"></span>
  </div>
</div>

<!-- Analysis panel -->
<div id="analysis" class="hidden"></div>

<script>
'use strict';

const ENGINE = 'http://127.0.0.1:7842';

const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

const SCALE_PCS = {
  major:            [0,2,4,5,7,9,11],
  natural_minor:    [0,2,3,5,7,8,10],
  dorian:           [0,2,3,5,7,9,10],
  phrygian:         [0,1,3,5,7,8,10],
  lydian:           [0,2,4,6,7,9,11],
  mixolydian:       [0,2,4,5,7,9,10],
  locrian:          [0,1,3,5,6,8,10],
  harmonic_minor:   [0,2,3,5,7,8,11],
  melodic_minor:    [0,2,3,5,7,9,11],
  pentatonic_major: [0,2,4,7,9],
  pentatonic_minor: [0,3,5,7,10],
  blues:            [0,3,5,6,7,10],
};

const QUALITY_LABEL = {
  major:'Major', minor:'Minor', diminished:'Diminished', augmented:'Augmented',
  major7:'Major 7th', minor7:'Minor 7th', dominant7:'Dominant 7th',
  half_diminished:'Half-Diminished (\xF87)', diminished7:'Diminished 7th',
  minor_major7:'Minor-Major 7th', major9:'Major 9th', minor9:'Minor 9th',
};

const ROMAN_BASE = ['I','II','III','IV','V','VI','VII','VIII'];
const BLACK_PCS  = new Set([1,3,6,8,10]);

const MODAL_VAMPS = {
  'static':        [0],
  'i-bVII':        [0, 6],
  'i-IV':          [0, 3],
  'i-bVI-bVII':    [0, 5, 6],
  'i-bVII-bVI-bVII': [0, 6, 5, 6],
  'phryg':         [0, 1],
  'lydian-II':     [0, 1],
  'mixo-bVII':     [0, 6],
  'ii-V-I':        [1, 4, 0],
  'backdoor':      [6, 0],
  'quartal':       [0, 1, 2, 3],
};

const MODE_INFO = {
  major: {
    name: 'Ionian', alias: 'Major',
    character: 'Bright, stable, completely resolved \u2014 the tonal home of Western music. Every other mode is defined in relation to this one.',
    characteristic: [11], label: 'major 7th',
    examples: ['"Let It Be" \u2014 Beatles', 'Beethoven / Mozart', 'Most pop & folk'],
    degree: 'I', parentOffset: 0,
  },
  dorian: {
    name: 'Dorian', alias: null,
    character: 'Minor with a raised 6th. Darker than major but brighter than Aeolian \u2014 the mode of soul, funk, and cool jazz. That major 6th is what gives it its signature warmth over a minor tonic.',
    characteristic: [9], label: 'major 6th',
    examples: ['"So What" \u2014 Miles Davis', '"Oye Como Va" \u2014 Santana', '"Scarborough Fair"', 'Most funk & R&B bass vamps'],
    degree: 'II', parentOffset: -2,
  },
  phrygian: {
    name: 'Phrygian', alias: null,
    character: 'The flat 2nd creates an immediate tension \u2014 Spanish, flamenco, Middle Eastern. It resolves nowhere comfortable, which is the point.',
    characteristic: [1], label: '\u266D2nd',
    examples: ['Flamenco guitar', '"White Zombie" \u2014 Rob Zombie', 'Spanish classical music', 'Metal tension riffs'],
    degree: 'III', parentOffset: -4,
  },
  lydian: {
    name: 'Lydian', alias: null,
    character: 'Major with a raised 4th. That tritone above the root makes it float and shimmer \u2014 otherworldly, cinematic, the sound of imagination.',
    characteristic: [6], label: '#4th (tritone)',
    examples: ['"Flying" \u2014 John Williams (E.T.)', '"The Simpsons" theme', 'Joe Satriani', 'Film score wonder moments'],
    degree: 'IV', parentOffset: -5,
  },
  mixolydian: {
    name: 'Mixolydian', alias: null,
    character: 'Major with a flat 7th. The I chord is major but there\\'s no leading tone pulling to it \u2014 blues-rock momentum, Celtic rootedness, rock anthem power.',
    characteristic: [10], label: '\u266D7th',
    examples: ['"Norwegian Wood" \u2014 Beatles', '"Sweet Home Alabama"', 'Celtic folk music', '"Sympathy for the Devil"'],
    degree: 'V', parentOffset: -7,
  },
  natural_minor: {
    name: 'Aeolian', alias: 'Natural Minor',
    character: 'The natural minor \u2014 introspective, dark, melancholic. The flat 6th (vs. Dorian\\'s major 6th) is what tilts it toward sadness.',
    characteristic: [8], label: '\u266D6th',
    examples: ['"Stairway to Heaven" \u2014 Led Zeppelin', '"Hotel California" \u2014 Eagles', 'Classical minor key music'],
    degree: 'VI', parentOffset: -9,
  },
  locrian: {
    name: 'Locrian', alias: null,
    character: 'The diminished tonic chord makes true stability impossible \u2014 the flat 5th means this mode is almost never used as a tonal center. Its power is in unresolved tension.',
    characteristic: [6], label: '\u266D5th',
    examples: ['Rarely a tonal center', '"YYZ" \u2014 Rush (partial)', 'Brief metal tension passages', 'Theoretical curiosity'],
    degree: 'VII', parentOffset: -11,
  },
  harmonic_minor: {
    name: 'Harmonic Minor', alias: null,
    character: 'Minor with a raised 7th leading tone \u2014 classical and dramatic. The augmented 2nd gap between \u266D6 and \u266E7 gives it that exotic, Middle Eastern sound.',
    characteristic: [11], label: 'natural 7th / aug 2nd',
    examples: ['"Smooth Criminal" chord changes', 'Classical cadences', 'Middle Eastern music', 'Yngwie Malmsteen / neoclassical metal'],
    degree: null, parentOffset: null,
  },
  melodic_minor: {
    name: 'Melodic Minor', alias: null,
    character: 'Minor with raised 6th and 7th \u2014 smoother than harmonic minor, no awkward aug 2nd. The jazz musician\\'s favorite minor because it generates rich altered dominant chords.',
    characteristic: [9, 11], label: 'raised 6th & 7th',
    examples: ['Jazz improvisation / Coltrane', 'Classical ascending passages', 'Modern jazz harmony', 'Film noir scores'],
    degree: null, parentOffset: null,
  },
  pentatonic_major: {
    name: 'Major Pentatonic', alias: null,
    character: 'Five notes \u2014 eliminates the "avoid" 4th and 7th, leaving only the universally safe tones. Works over almost any major chord context.',
    characteristic: [], label: null,
    examples: ['Country music', '"My Girl" \u2014 Temptations', 'Folk music worldwide', 'Pentatonic rock solos over major'],
    degree: null, parentOffset: null,
  },
  pentatonic_minor: {
    name: 'Minor Pentatonic', alias: null,
    character: 'Five notes \u2014 the foundation of blues, rock, and R&B. Remove the 2nd and 6th and almost everything that\\'s left is a strong statement.',
    characteristic: [], label: null,
    examples: ['Blues guitar \u2014 BB King, Clapton', '"Smoke on the Water" riff', 'Most classic rock solos', 'R&B and hip-hop melodies'],
    degree: null, parentOffset: null,
  },
  blues: {
    name: 'Blues Scale', alias: null,
    character: 'Minor pentatonic + the "blue note" (\u266D5). That single added note \u2014 the tritone \u2014 is the source of all blues tension and emotional expression.',
    characteristic: [6], label: '\u266D5 "blue note"',
    examples: ['All blues music', 'BB King / Stevie Ray Vaughan', 'Eric Clapton / Jimi Hendrix', 'Rock and soul solos'],
    degree: null, parentOffset: null,
  },
};

// Modal interchange suggestions per mode \u2014 educational, not engine-driven
const MODAL_BORROWS = {
  major: [
    { chord: '\u266DVII',  desc: 'from Mixolydian \u2014 the most common borrow; rock anthem closer ("Hey Jude")' },
    { chord: '\u266DVI',   desc: 'from Aeolian \u2014 dramatic, bittersweet (Bowie, Radiohead)' },
    { chord: 'iv',    desc: 'from Aeolian \u2014 the minor IV; heart-sinking chromatic inner voice' },
    { chord: '\u266DIII',  desc: 'from Aeolian \u2014 heavy and grounded; classic heavy rock' },
  ],
  dorian: [
    { chord: 'IV',    desc: 'major IV built on the characteristic \u266E6 \u2014 the signature Dorian move' },
    { chord: 'I',     desc: 'the tonic minor; borrow Mixolydian \u266DVII to keep momentum without resolving' },
    { chord: '\u266DVII',  desc: 'borrowed to add rock weight while staying in the Dorian sound' },
  ],
  phrygian: [
    { chord: '\u266DII',   desc: 'the Neapolitan \u2014 the defining Phrygian chord; resolves to i (flamenco cadence)' },
    { chord: 'III',   desc: 'major III from major \u2014 brief lift before returning to dark tonic' },
    { chord: '\u266DVII',  desc: 'borrowed to add momentum in Spanish and metal contexts' },
  ],
  lydian: [
    { chord: 'II',    desc: 'the Lydian II \u2014 major chord built on the raised 4th; floats and shimmers' },
    { chord: 'V',     desc: 'pull back to a functional dominant to resolve the floating energy' },
    { chord: '\u266DVII',  desc: 'Mixolydian borrow \u2014 grounds the otherworldly Lydian sound' },
  ],
  mixolydian: [
    { chord: '\u266DVII',  desc: 'the defining Mixolydian chord \u2014 I\u2013\u266DVII\u2013IV is the classic rock/folk loop' },
    { chord: 'iv',    desc: 'minor IV borrowed from Aeolian \u2014 deepens the blues-rock quality' },
    { chord: '\u266DIII',  desc: 'from Aeolian \u2014 adds weight; "Sweet Home Alabama" territory' },
    { chord: '\u266DVI',   desc: 'from Aeolian \u2014 dramatic swell when used before \u266DVII' },
  ],
  natural_minor: [
    { chord: 'IV',    desc: 'major IV from Dorian \u2014 warmth in the middle of a minor progression' },
    { chord: 'V',     desc: 'raised \u266D7 to \u266E7 creates a V7 dominant \u2014 the harmonic minor cadence pull' },
    { chord: '\u266DVI\u2013\u266DVII\u2013i', desc: 'Aeolian power cadence \u2014 ascending ramp, rock anthem energy (\u2260 Andalusian descent)' },
    { chord: 'I (major)', desc: 'Picardy third \u2014 major tonic at the end of a minor piece; classical resolution' },
  ],
  locrian: [
    { chord: '\u266DII',   desc: 'only major chord available \u2014 Locrian\\'s sole point of rest; the "Locrian \u266DII" trick' },
    { chord: 'iv',    desc: 'minor IV \u2014 small breathing space amid the tension' },
  ],
  harmonic_minor: [
    { chord: 'V7',    desc: 'the defining harmonic minor move \u2014 raised 7th creates a leading tone pull to i' },
    { chord: 'vii\xB07', desc: 'fully diminished chord on the leading tone \u2014 maximum classical tension' },
    { chord: 'IV',    desc: 'borrowed major IV (from Dorian) for contrast against the exotic aug 2nd sound' },
  ],
  melodic_minor: [
    { chord: 'IVmaj7', desc: 'lydian flavour from \u266E6+\u266E7; "Maiden Voyage" and jazz ballad staple' },
    { chord: 'V7alt',  desc: 'altered dominant \u2014 \u266D5/\u266F5/\u266D9/\u266F9 tensions; quintessential jazz resolution' },
    { chord: 'bVII7',  desc: 'Lydian Dominant chord (mode 4 of melodic minor) \u2014 resolves a tritone away' },
  ],
  pentatonic_major: [
    { chord: '\u266DVII',  desc: 'add Mixolydian colour under pentatonic melody \u2014 a natural pairing' },
    { chord: 'iv',    desc: 'minor IV adds blues tension against a major pentatonic melody' },
  ],
  pentatonic_minor: [
    { chord: 'IV',    desc: 'major IV from Dorian lifts the minor pentatonic vamp briefly' },
    { chord: 'V7',    desc: 'dominant 7th borrowed for a blues turnaround feel' },
  ],
  blues: [
    { chord: 'I7',    desc: 'dominant 7th on every degree \u2014 all three chords are dominant in 12-bar blues' },
    { chord: 'IV7',   desc: 'the classic 12-bar blues change; IV7 in bar 5 is the first harmonic move' },
    { chord: 'V7',    desc: 'the turnaround \u2014 V7 in bar 9 drives back to I; tritone sub (\u266DII7) is common' },
  ],
};

function getParentKey(root, scale) {
  const info = MODE_INFO[scale];
  if (!info || info.parentOffset === null) return null;
  const parentRoot = (root + info.parentOffset + 12) % 12;
  return { name: NOTE_NAMES[parentRoot] + ' Major', degree: info.degree };
}

const isWebKit   = !!(window.webkit?.messageHandlers?.live);
const isWebView2 = !!(window.chrome?.webview);
const isModal    = isWebKit || isWebView2;

function closeWithResult(result) {
  const msg = { method: 'close_and_send', params: [JSON.stringify(result)] };
  if (isWebKit)    window.webkit.messageHandlers.live.postMessage(msg);
  else if (isWebView2) window.chrome.webview.postMessage(msg);
}

// \u2500\u2500 State \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

let chords      = [];
let selIdx      = null;
let currentKey  = 0;
let currentScale = 'major';
let voicing     = 'close';
let midiAccess  = null;

// \u2500\u2500 Engine calls \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

async function post(op, params = {}) {
  const r = await fetch(ENGINE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ op, ...params }),
  });
  const data = await r.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

// \u2500\u2500 Built-in synth preview (WebAudio) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Default sound everywhere; Web MIDI (when a port is selected) takes priority
// in the Play button so hardware/soft synths can be used instead.

let _ac = null, _bus = null;
function audioCtx() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!_ac) _ac = new AC();
  if (_ac.state === 'suspended') _ac.resume();
  return _ac;
}
function synthBus() {
  const ac = audioCtx();
  if (!ac) return null;
  if (!_bus) {
    _bus = ac.createGain();
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 2600; lp.Q.value = 0.4;
    _bus.connect(lp); lp.connect(ac.destination);
  }
  return _bus;
}
function stopAllSynth() {
  if (_bus) { try { _bus.disconnect(); } catch { /* already gone */ } _bus = null; }
}
function synthChord(midiNotes, when = 0, durSec = 1.2, velocity = 0.9) {
  const bus = synthBus();
  if (!bus || !midiNotes || midiNotes.length === 0) return;
  const t0 = _ac.currentTime + when;
  const peak = 0.22 * velocity / Math.sqrt(Math.max(1, midiNotes.length));
  for (const m of midiNotes) {
    const osc = _ac.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = 440 * Math.pow(2, (m - 69) / 12);
    const g = _ac.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(peak * 0.5, t0 + Math.min(0.35, durSec * 0.4));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + durSec);
    osc.connect(g); g.connect(bus);
    osc.start(t0); osc.stop(t0 + durSec + 0.05);
  }
}
function stackPcs(pcs, octave) {
  const base = (octave + 1) * 12;
  const out = [];
  let prev = -Infinity;
  for (const pc of pcs ?? []) {
    let p = base + (pc % 12);
    while (p <= prev) p += 12;
    out.push(p); prev = p;
  }
  return out;
}

// \u2500\u2500 Vamp playback \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

let vampActive = false;
let vampTimers = [];

async function toggleVamp() {
  if (vampActive) { stopVamp(); return; }
  if (progression.length === 0) return;
  const btn = document.getElementById('vamp-btn');
  btn.textContent = '\u2026';
  const octave = parseInt(document.getElementById('oct-sel').value);
  const chordNotes = await Promise.all(progression.map(async item => {
    try {
      const r = await post('voicings', { name: item.name, octave });
      return r[voicing] ?? r.close ?? [];
    } catch {
      return [];
    }
  }));
  vampActive = true;
  btn.textContent = '\u25A0 Stop';
  const secPerChord = 1.25; // two beats per chord at ~96 BPM
  const chips = [...document.querySelectorAll('#prog-chips .chip')];
  chordNotes.forEach((notes, i) => {
    synthChord(notes, i * secPerChord, secPerChord * 1.5, 0.9);
    vampTimers.push(setTimeout(() => {
      chips.forEach(c => c.classList.remove('playing'));
      chips[i]?.classList.add('playing');
    }, i * secPerChord * 1000));
  });
  vampTimers.push(setTimeout(stopVamp, chordNotes.length * secPerChord * 1000 + 400));
}

function stopVamp() {
  vampActive = false;
  for (const t of vampTimers) clearTimeout(t);
  vampTimers = [];
  stopAllSynth();
  document.querySelectorAll('#prog-chips .chip.playing').forEach(c => c.classList.remove('playing'));
  const btn = document.getElementById('vamp-btn');
  btn.textContent = '\u25B6 Play';
  btn.disabled = progression.length === 0;
}

// \u2500\u2500 Engine status \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function setOnline(on) {
  document.getElementById('dot').className = 'dot' + (on ? '' : ' off');
  document.getElementById('status-txt').textContent = on ? 'Engine connected' : 'Engine offline';
}

async function checkEngine() {
  try { await post('list_keys'); setOnline(true); }
  catch { setOnline(false); }
}

// \u2500\u2500 Quality helpers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function qClass(q) {
  if (q === 'major' || q === 'major7' || q === 'major9') return 'q-major';
  if (q.startsWith('minor'))                             return 'q-minor';
  if (q === 'diminished' || q === 'diminished7')        return 'q-dim';
  if (q === 'half_diminished')                          return 'q-dim';
  if (q === 'dominant7')                                return 'q-dom7';
  return 'q-major';
}

function romanFor(chord, i) {
  const base = ROMAN_BASE[i] ?? String(i + 1);
  const q    = chord.quality;
  const low  = q.startsWith('minor') || q === 'diminished' || q === 'diminished7' || q === 'half_diminished';
  const r    = low ? base.toLowerCase() : base;
  if (q === 'half_diminished') return r + '\xF8';
  if (q === 'diminished' || q === 'diminished7') return r + '\xB0';
  return r;
}

function scaleDegrees(pcs, keyRoot, intervals) {
  const seen = new Set();
  return pcs.map(pc => {
    const rel = (pc - keyRoot + 12) % 12;
    const idx = intervals.indexOf(rel);
    return idx >= 0 ? String(idx + 1) : null;
  }).filter(d => d && !seen.has(d) && seen.add(d));
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// \u2500\u2500 Load chords \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

async function loadChords() {
  currentKey   = parseInt(document.getElementById('key-sel').value);
  currentScale = document.getElementById('scale-sel').value;
  const sevenths = document.getElementById('sevenths-cb').checked;

  try {
    const r = await post('diatonic', { key: currentKey, scale: currentScale, sevenths });
    chords  = r.chords;
    selIdx  = null;
    renderGrid();
    renderModeInfo();
    document.getElementById('detail').classList.add('hidden');
    drawCoF();
    setOnline(true);
  } catch {
    setOnline(false);
    document.getElementById('chord-grid').innerHTML =
      '<div class="empty">Engine not reachable \u2014 start the Composition Aide extension in Ableton Live, then reload.</div>';
  }
}

// \u2500\u2500 Chord grid \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function renderGrid() {
  const grid = document.getElementById('chord-grid');
  const ivls = SCALE_PCS[currentScale] ?? SCALE_PCS.major;
  grid.style.gridTemplateColumns = \`repeat(\${Math.max(chords.length, 1)}, 1fr)\`;
  grid.innerHTML = '';

  chords.forEach((chord, i) => {
    const roman = romanFor(chord, i);
    const degs  = scaleDegrees(chord.pitch_classes, currentKey, ivls);
    const cons  = chord.consonance ?? 0.5;

    const btn = document.createElement('button');
    btn.className = 'chord-btn' + (i === selIdx ? ' active' : '');
    btn.innerHTML = \`
      <span class="c-roman \${qClass(chord.quality)}">\${esc(roman)}</span>
      <span class="c-name">\${esc(chord.name)}</span>
      <span class="c-degs">\${degs.join('\xB7') || '\u2014'}</span>
      <div class="c-bar"><div class="c-fill" style="width:\${Math.round(cons*100)}%"></div></div>
    \`;
    btn.addEventListener('click', () => {
      select(i);
      const c = chords[i];
      if (c) synthChord(
        stackPcs(c.pitch_classes, parseInt(document.getElementById('oct-sel').value)),
        0, 1.0, 0.8,
      );
    });
    grid.appendChild(btn);
  });
}

// \u2500\u2500 Select chord \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function select(i) {
  selIdx = i;
  renderGrid();
  showDetail(chords[i], i);
  drawCoF();
}

function showDetail(chord, i) {
  document.getElementById('detail').classList.remove('hidden');
  const roman = romanFor(chord, i);

  const nameEl = document.getElementById('d-name');
  nameEl.textContent = chord.name;
  nameEl.className = \`d-name \${qClass(chord.quality)}\`;

  document.getElementById('d-roman').textContent = roman;
  document.getElementById('d-qual').textContent  = QUALITY_LABEL[chord.quality] ?? chord.quality;
  document.getElementById('d-notes').textContent =
    chord.pitch_classes.map(pc => NOTE_NAMES[pc % 12]).join('  \xB7  ');

  renderPiano(chord);
  document.getElementById('play-btn').disabled = false;
  document.getElementById('add-btn').disabled  = false;
}

// \u2500\u2500 Piano keyboard \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const PIANO_LO = 36;  // C2
const PIANO_HI = 83;  // B5

function renderPiano(chord) {
  const piano = document.getElementById('piano');
  piano.innerHTML = '';

  const scalePCs = new Set((SCALE_PCS[currentScale] ?? []).map(i => (currentKey + i) % 12));
  const chordPCs = new Set(chord.pitch_classes.map(pc => pc % 12));
  const charPCs  = new Set((MODE_INFO[currentScale]?.characteristic ?? []).map(i => (currentKey + i) % 12));

  for (let midi = PIANO_LO; midi <= PIANO_HI; midi++) {
    const pc      = midi % 12;
    const isBlack = BLACK_PCS.has(pc);
    const isChord = chordPCs.has(pc);
    const isChar  = charPCs.has(pc);
    const isScale = scalePCs.has(pc);

    const el = document.createElement('div');
    el.className = [
      'key',
      isBlack ? 'b' : 'w',
      isChord ? 'chord' : (isChar ? 'char' : (isScale ? 'scale' : '')),
    ].filter(Boolean).join(' ');
    el.dataset.midi = String(midi);

    // Label C notes and chord tones (white keys only \u2014 black keys too narrow)
    if (!isBlack && (pc === 0 || isChord)) {
      const lbl = document.createElement('span');
      lbl.className = 'lbl';
      lbl.textContent = NOTE_NAMES[pc] + (Math.floor(midi / 12) - 1);
      el.appendChild(lbl);
    }

    piano.appendChild(el);
  }
}

// \u2500\u2500 MIDI \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

async function initMidi() {
  if (!navigator.requestMIDIAccess) {
    document.getElementById('midi-note').textContent = '(Web MIDI not available \u2014 use Chrome or Edge)';
    return;
  }
  try {
    midiAccess = await navigator.requestMIDIAccess();
    populatePorts();
    midiAccess.onstatechange = populatePorts;
  } catch {
    document.getElementById('midi-note').textContent = '(MIDI access denied)';
  }
}

function populatePorts() {
  const sel  = document.getElementById('midi-sel');
  const prev = sel.value;
  sel.innerHTML = '<option value="">\u2014 no MIDI \u2014</option>';
  for (const [id, port] of midiAccess.outputs) {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = port.name;
    if (id === prev) opt.selected = true;
    sel.appendChild(opt);
  }
}

function getMidiOut() {
  if (!midiAccess) return null;
  const id = document.getElementById('midi-sel').value;
  return id ? midiAccess.outputs.get(id) : null;
}

async function playChord() {
  if (selIdx === null) return;
  const chord  = chords[selIdx];
  const octave = parseInt(document.getElementById('oct-sel').value);

  let notes;
  try {
    const r = await post('voicings', { name: chord.name, octave });
    notes = r[voicing] ?? r.close;
  } catch {
    // fallback: naive close position from pitch classes
    const base = (octave + 1) * 12;
    notes = chord.pitch_classes.map(pc => base + pc);
  }

  const out = getMidiOut();
  if (!out) {
    // No MIDI port \u2014 use the built-in synth instead
    synthChord(notes, 0, 1.2, 0.9);
    showMidiNote(chord.name + ' \u2192 ' + notes.join('  '));
    setTimeout(hideMidiNote, 1200);
    return;
  }

  const VELOCITY = 88;
  const DURATION = 1200;
  for (const n of notes) out.send([0x90, n, VELOCITY]);
  showMidiNote(chord.name + ' \u2192 ' + notes.join('  '));
  setTimeout(() => {
    for (const n of notes) out.send([0x80, n, 0]);
    hideMidiNote();
  }, DURATION);
}

function showMidiNote(txt) {
  const el = document.getElementById('midi-note');
  el.textContent = txt;
  el.style.opacity = '1';
}
function hideMidiNote() {
  document.getElementById('midi-note').style.opacity = '0';
}

// \u2500\u2500 Progression \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

let progression = [];
let dragIdx = null;

function addToProgression() {
  if (selIdx === null) return;
  const chord = chords[selIdx];
  progression.push({ name: chord.name, roman: romanFor(chord, selIdx), quality: chord.quality, root: chord.root });
  renderProgression();
  drawCoF();
  scheduleAnalysis();
}

function removeFromProgression(i) {
  progression.splice(i, 1);
  renderProgression();
  drawCoF();
  scheduleAnalysis();
}

function clearProgression() {
  progression = [];
  renderProgression();
  drawCoF();
  document.getElementById('analysis').classList.add('hidden');
}

function loadVamp(key) {
  if (!key) return;
  const indices = MODAL_VAMPS[key];
  if (!indices || chords.length === 0) return;
  progression = indices
    .filter(i => i < chords.length)
    .map(i => {
      const chord = chords[i];
      return { name: chord.name, roman: romanFor(chord, i), quality: chord.quality, root: chord.root };
    });
  renderProgression();
  drawCoF();
  scheduleAnalysis();
  document.getElementById('vamp-sel').value = '';
}

async function writeToClip() {
  if (progression.length === 0) return;
  const beatsPerChord = parseFloat(document.getElementById('bpc-sel').value);
  const totalBeats    = progression.length * beatsPerChord;
  const oct           = parseInt(document.getElementById('oct-sel').value);

  const chordData = [];
  for (const item of progression) {
    let notes = [];
    try {
      const r = await post('voicings', { name: item.name, octave: oct });
      notes = r[voicing] ?? r.close ?? [];
    } catch { /* use empty notes on engine failure */ }
    chordData.push({ name: item.name, notes });
  }

  const rhythm = document.getElementById('rhythm-sel').value;
  closeWithResult({ action: 'writeClip', chords: chordData, beatsPerChord, totalBeats, rhythm });
}

// \u2500\u2500 Mode info card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function renderModeInfo() {
  const card = document.getElementById('mode-card');
  if (!card) return;
  const info = MODE_INFO[currentScale];
  if (!info) { card.style.display = 'none'; return; }
  card.style.display = 'flex';

  document.getElementById('mc-name').textContent = info.name;
  const aliasEl = document.getElementById('mc-alias');
  aliasEl.textContent = info.alias ?? '';
  aliasEl.style.display = info.alias ? '' : 'none';

  document.getElementById('mc-char').textContent = info.character;

  const badgeEl = document.getElementById('mc-badge');
  if (info.label) {
    badgeEl.textContent = 'Characteristic: ' + info.label;
    badgeEl.style.display = '';
  } else {
    badgeEl.style.display = 'none';
  }

  const parentEl = document.getElementById('mc-parent');
  const parent = getParentKey(currentKey, currentScale);
  if (parent) {
    parentEl.textContent =
      NOTE_NAMES[currentKey] + ' ' + info.name + ' is the ' + parent.degree + ' mode of ' + parent.name;
    parentEl.style.display = '';
  } else {
    parentEl.style.display = 'none';
  }

  const exEl = document.getElementById('mc-examples');
  exEl.innerHTML = info.examples
    .map(e => \`<span class="mc-example">\${esc(e)}</span>\`)
    .join('');

  const sepEl = document.getElementById('mc-borrows-sep');
  const borrows = MODAL_BORROWS[currentScale];
  if (borrows && borrows.length > 0) {
    document.getElementById('mc-borrows').innerHTML = borrows
      .map(b => \`<div class="mc-borrow"><span class="mc-borrow-chord">\${esc(b.chord)}</span><span class="mc-borrow-desc">\${esc(b.desc)}</span></div>\`)
      .join('');
    sepEl.style.display = 'flex';
  } else {
    sepEl.style.display = 'none';
  }
}

function renderProgression() {
  const chips      = document.getElementById('prog-chips');
  const clearBtn   = document.getElementById('clear-btn');
  const analyzeBtn = document.getElementById('analyze-btn');

  clearBtn.disabled   = progression.length === 0;
  analyzeBtn.disabled = progression.length < 2;
  if (vampActive) stopVamp();
  document.getElementById('vamp-btn').disabled = progression.length === 0;

  if (progression.length === 0) {
    chips.innerHTML = '<span class="prog-empty">Select a chord below, then click Add</span>';
    return;
  }
  chips.innerHTML = '';
  progression.forEach((item, i) => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.draggable = true;
    chip.innerHTML =
      \`<span style="color:var(--dim);margin-right:0.2em;font-size:0.85em;cursor:grab">\u283F</span>\` +
      \`<span class="chip-roman \${qClass(item.quality)}">\${esc(item.roman)}</span>\` +
      \`<span>\${esc(item.name)}</span>\` +
      \`<button class="chip-x" title="Remove">\u2715</button>\`;
    chip.querySelector('.chip-x').addEventListener('click', () => removeFromProgression(i));

    chip.addEventListener('dragstart', e => {
      dragIdx = i;
      e.dataTransfer.effectAllowed = 'move';
      setTimeout(() => chip.classList.add('dragging'), 0);
    });
    chip.addEventListener('dragend', () => {
      chip.classList.remove('dragging');
      chips.querySelectorAll('.chip').forEach(c => c.classList.remove('drag-over'));
      dragIdx = null;
    });
    chip.addEventListener('dragover', e => {
      e.preventDefault();
      chips.querySelectorAll('.chip').forEach(c => c.classList.remove('drag-over'));
      chip.classList.add('drag-over');
    });
    chip.addEventListener('drop', e => {
      e.preventDefault();
      chip.classList.remove('drag-over');
      if (dragIdx === null || dragIdx === i) return;
      const [moved] = progression.splice(dragIdx, 1);
      progression.splice(i, 0, moved);
      renderProgression();
      scheduleAnalysis();
    });

    chips.appendChild(chip);
  });
}

// \u2500\u2500 Analysis \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

let _analyzeTimer = null;
function scheduleAnalysis() {
  clearTimeout(_analyzeTimer);
  if (progression.length < 2) {
    document.getElementById('analysis').classList.add('hidden');
    return;
  }
  _analyzeTimer = setTimeout(() => analyzeProgression(false), 800);
}

async function analyzeProgression(scroll = true) {
  try {
    const result = await post('analyze', { chord_names: progression.map(c => c.name) });
    renderAnalysis(result, scroll);
    setOnline(true);
  } catch {
    setOnline(false);
  }
}

function tensionColor(t) {
  const hue = Math.round(120 - t * 120);
  return \`hsl(\${hue},60%,46%)\`;
}

function renderAnalysis(a, scroll = true) {
  const panel = document.getElementById('analysis');
  panel.classList.remove('hidden');

  // Inferred key
  const score = Math.round((a.inferred_key.score ?? 1) * 100);
  let html = \`
    <div class="a-section">
      <div class="section-label">Inferred Key</div>
      <div class="key-line">
        <span class="key-name">\${esc(a.inferred_key.label)}</span>
        <span class="key-score">\${score}% confidence</span>
      </div>
    </div>
  \`;

  // Chord table
  html += \`<div class="a-section"><div class="section-label">Chord Analysis</div>\`;
  a.roman_labels.forEach((roman, i) => {
    const chord   = a.chords[i];
    const tension = a.tension[i] ?? 0.5;
    const vl      = a.voice_leading[i];
    html += \`
      <div class="chord-analysis-row">
        <span class="car-roman \${qClass(chord?.quality ?? '')}">\${esc(roman)}</span>
        <span class="car-name">\${esc(chord?.name ?? '')}</span>
        <div class="car-bar">
          <div class="car-fill" style="width:\${Math.round(tension*100)}%;background:\${tensionColor(tension)}"></div>
        </div>
        <span class="car-vl">\${vl !== undefined ? '\u2192 ' + vl + 'st' : ''}</span>
      </div>
    \`;
  });
  html += \`</div>\`;

  // Substitutions
  if (a.substitutions?.length > 0) {
    html += \`<div class="a-section"><div class="section-label">Substitutions</div><div class="sub-list">\`;
    for (const sub of a.substitutions) {
      html += \`
        <div class="sub-card">
          <div class="sub-head">
            <span class="sub-pos">chord \${sub.position + 1}</span>
            <span>
              <span class="sub-orig">\${esc(sub.original.name)}</span>
              <span class="sub-arr"> \u2192 </span>
              <span class="sub-repl">\${esc(sub.replacement.name)}</span>
            </span>
          </div>
          <div class="sub-why">\${esc(sub.rationale)}</div>
        </div>
      \`;
    }
    html += \`</div></div>\`;
  }

  if (a.summary) {
    html += \`
      <div class="a-section">
        <div class="section-label">Interpretation</div>
        <div class="summary-box">\${esc(a.summary)}</div>
      </div>
    \`;
  }

  panel.innerHTML = html;
  if (scroll) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// \u2500\u2500 Circle of Fifths \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const COF_MAJOR_NAMES = ['C','G','D','A','E','B','F#','D\u266D','A\u266D','E\u266D','B\u266D','F'];
const COF_MINOR_NAMES = ['Am','Em','Bm','F#m','C#m','G#m','E\u266Dm','B\u266Dm','Fm','Cm','Gm','Dm'];
const COF_MAJOR_PCS   = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];
const COF_MINOR_PCS   = [9, 4, 11, 6, 1, 8, 3, 10, 5, 0, 7, 2];

function polar(cx, cy, r, deg) {
  const a = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function wedge(cx, cy, r1, r2, a1, a2) {
  const [ix1, iy1] = polar(cx, cy, r1, a1);
  const [ox1, oy1] = polar(cx, cy, r2, a1);
  const [ox2, oy2] = polar(cx, cy, r2, a2);
  const [ix2, iy2] = polar(cx, cy, r1, a2);
  return \`M\${ix1},\${iy1}L\${ox1},\${oy1}A\${r2},\${r2} 0 0,1 \${ox2},\${oy2}L\${ix2},\${iy2}A\${r1},\${r1} 0 0,0 \${ix1},\${iy1}Z\`;
}

function drawCoF() {
  const svg = document.getElementById('cof-svg');
  if (!svg) return;

  const CX = 180, CY = 180;
  const R_OUT = 172, R_MID = 126, R_IN = 86, R_HUB = 52;
  const GAP   = 1.8;

  const scalePCs = new Set((SCALE_PCS[currentScale] ?? []).map(i => (currentKey + i) % 12));
  const selPc    = (selIdx !== null && chords[selIdx]) ? chords[selIdx].root : -1;

  // Progression badges: pc \u2192 list of 1-based positions
  const majBadge = new Map(), minBadge = new Map();
  progression.forEach((item, i) => {
    if (item.root === undefined) return;
    const isMinor = item.quality.startsWith('minor') || item.quality.startsWith('dim') || item.quality === 'half_diminished';
    const map = isMinor ? minBadge : majBadge;
    if (!map.has(item.root)) map.set(item.root, []);
    map.get(item.root).push(i + 1);
  });

  let s = '';

  for (let pos = 0; pos < 12; pos++) {
    const mpc  = COF_MAJOR_PCS[pos];
    const npc  = COF_MINOR_PCS[pos];
    const mid  = pos * 30;
    const a1   = mid - 15 + GAP;
    const a2   = mid + 15 - GAP;

    // Outer (major)
    let outerFill;
    if      (mpc === currentKey)     outerFill = 'hsl(31,100%,58%)';
    else if (majBadge.has(mpc))      outerFill = 'hsl(31,65%,34%)';
    else if (mpc === selPc)          outerFill = 'hsl(31,55%,32%)';
    else if (scalePCs.has(mpc))      outerFill = 'hsl(31,28%,25%)';
    else                             outerFill = 'hsl(0,0%,19%)';

    s += \`<path d="\${wedge(CX,CY,R_MID+2,R_OUT,a1,a2)}" fill="\${outerFill}"/>\`;

    // Inner (relative minor)
    let innerFill;
    if      (minBadge.has(npc))      innerFill = 'hsl(210,55%,30%)';
    else if (npc === selPc)          innerFill = 'hsl(210,45%,30%)';
    else if (scalePCs.has(npc))      innerFill = 'hsl(210,22%,22%)';
    else                             innerFill = 'hsl(0,0%,15%)';

    s += \`<path d="\${wedge(CX,CY,R_IN,R_MID,a1,a2)}" fill="\${innerFill}"/>\`;

    // Major label
    const [lx, ly]    = polar(CX, CY, (R_MID + R_OUT) / 2, mid);
    const isRoot      = mpc === currentKey;
    const inScale     = scalePCs.has(mpc);
    const majorColor  = isRoot ? 'hsl(0,0%,9%)' : inScale ? 'hsl(31,80%,72%)' : 'hsl(0,0%,48%)';
    const majorWeight = (isRoot || inScale) ? 'bold' : 'normal';
    const majorSize   = isRoot ? '11.5' : '10';
    s += \`<text x="\${lx}" y="\${ly}" text-anchor="middle" dominant-baseline="middle" \` +
         \`font-size="\${majorSize}" font-weight="\${majorWeight}" fill="\${majorColor}" \` +
         \`font-family="Segoe UI,system-ui,sans-serif">\${COF_MAJOR_NAMES[pos]}</text>\`;

    // Minor label
    const [nx, ny]   = polar(CX, CY, (R_IN + R_MID) / 2, mid);
    const inScaleMin = scalePCs.has(npc);
    const minorColor = inScaleMin ? 'hsl(210,65%,70%)' : 'hsl(0,0%,37%)';
    s += \`<text x="\${nx}" y="\${ny}" text-anchor="middle" dominant-baseline="middle" \` +
         \`font-size="9" fill="\${minorColor}" font-family="Segoe UI,system-ui,sans-serif">\${COF_MINOR_NAMES[pos]}</text>\`;

    // Progression badges
    if (majBadge.has(mpc)) {
      const label = majBadge.get(mpc).join(',');
      const [bx, by] = polar(CX, CY, R_OUT - 12, mid);
      s += \`<circle cx="\${bx}" cy="\${by}" r="9" fill="hsl(31,100%,58%)"/>\`;
      s += \`<text x="\${bx}" y="\${by}" text-anchor="middle" dominant-baseline="middle" \` +
           \`font-size="8" font-weight="bold" fill="hsl(0,0%,8%)" font-family="Segoe UI,system-ui,sans-serif">\${label}</text>\`;
    }
    if (minBadge.has(npc)) {
      const label = minBadge.get(npc).join(',');
      const [bx, by] = polar(CX, CY, R_IN + 12, mid);
      s += \`<circle cx="\${bx}" cy="\${by}" r="9" fill="hsl(210,65%,52%)"/>\`;
      s += \`<text x="\${bx}" y="\${by}" text-anchor="middle" dominant-baseline="middle" \` +
           \`font-size="8" font-weight="bold" fill="hsl(0,0%,95%)" font-family="Segoe UI,system-ui,sans-serif">\${label}</text>\`;
    }
  }

  // Hub
  const scaleName = currentScale.replace(/_/g,' ')
    .replace('pentatonic ','pent. ').replace('harmonic ','harm. ').replace('melodic ','mel. ');
  s += \`<circle cx="\${CX}" cy="\${CY}" r="\${R_HUB}" fill="hsl(0,0%,12%)"/>\`;
  s += \`<text x="\${CX}" y="\${CY - 8}" text-anchor="middle" dominant-baseline="middle" \` +
       \`font-size="16" font-weight="bold" fill="hsl(31,100%,67%)" font-family="Segoe UI,system-ui,sans-serif">\${NOTE_NAMES[currentKey]}</text>\`;
  s += \`<text x="\${CX}" y="\${CY + 10}" text-anchor="middle" dominant-baseline="middle" \` +
       \`font-size="8" fill="hsl(0,0%,42%)" font-family="Segoe UI,system-ui,sans-serif">\${scaleName}</text>\`;

  svg.innerHTML = s;
}

// \u2500\u2500 Wire up events \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

document.getElementById('key-sel').addEventListener('change', loadChords);
document.getElementById('scale-sel').addEventListener('change', loadChords);
document.getElementById('sevenths-cb').addEventListener('change', loadChords);

document.getElementById('vbtn-group').addEventListener('click', e => {
  const btn = e.target.closest('.vbtn');
  if (!btn) return;
  document.querySelectorAll('.vbtn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  voicing = btn.dataset.v;
});

document.getElementById('add-btn').addEventListener('click', addToProgression);
document.getElementById('clear-btn').addEventListener('click', clearProgression);
document.getElementById('analyze-btn').addEventListener('click', analyzeProgression);
document.getElementById('play-btn').addEventListener('click', playChord);
document.getElementById('vamp-sel').addEventListener('change', e => loadVamp(e.target.value));
document.getElementById('vamp-btn').addEventListener('click', toggleVamp);

if (isModal) {
  const row = document.getElementById('write-clip-row');
  row.style.display = 'flex';
  document.getElementById('write-btn').addEventListener('click', writeToClip);
  document.getElementById('cancel-modal-btn').addEventListener('click', () => closeWithResult(null));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWithResult(null); });
}

// \u2500\u2500 Init \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

if (window._INIT) {
  document.getElementById('key-sel').value   = String(window._INIT.key);
  document.getElementById('scale-sel').value = window._INIT.scale;
}
checkEngine();
loadChords();
initMidi();
</script>
</body>
</html>
`;var Be=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<script>
  const isWebKit = window.webkit?.messageHandlers?.live;
  const isWebView2 = window.chrome?.webview;
  function closeWithResult(result) {
    const msg = { method: "close_and_send", params: [JSON.stringify(result)] };
    if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);
    else if (isWebView2) window.chrome.webview.postMessage(msg);
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeWithResult(null);
    if (e.key === 'Enter') submit();
  });
  function submit() {
    closeWithResult({
      action: "bass",
      pattern: document.getElementById("pattern").value,
      octave:  parseInt(document.getElementById("octave").value, 10),
    });
  }
</script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 13px;
    background: #1e1e1e;
    color: #d4d4d4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 14px;
    padding: 16px;
  }
  h2 { font-size: 14px; font-weight: 600; color: #e0e0e0; }
  .row { display: flex; align-items: center; gap: 10px; width: 100%; max-width: 260px; }
  .row label { width: 64px; color: #999; }
  select {
    flex: 1;
    background: #2a2a2a;
    color: #d4d4d4;
    border: 1px solid #555;
    border-radius: 4px;
    padding: 4px 6px;
    font: inherit;
  }
  .hint { font-size: 11px; color: #777; max-width: 260px; text-align: center; }
  .actions { display: flex; gap: 8px; margin-top: 4px; }
  button.primary {
    padding: 6px 22px;
    background: #0e639c;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
    font-weight: 600;
  }
  button.primary:hover { background: #1177bb; }
  button.cancel {
    padding: 6px 16px;
    background: #3a3a3a;
    border: 1px solid #555;
    border-radius: 4px;
    color: #ccc;
    font-size: 13px;
    cursor: pointer;
  }
  button.cancel:hover { background: #4a4a4a; }
</style>
</head>
<body>
<h2>Generate Bass Line</h2>
<div class="row">
  <label for="pattern">Pattern</label>
  <select id="pattern">
    <option value="roots">Roots (held)</option>
    <option value="root_fifth">Root \u2013 Fifth</option>
    <option value="quarter_pulse">Quarter Pulse</option>
    <option value="pump_8ths">Pumping 8ths</option>
    <option value="root_octave_8ths">Octave 8ths</option>
    <option value="two_feel">Two-Feel</option>
    <option value="walking">Walking</option>
    <option value="boogie">Boogie Shuffle</option>
    <option value="bossa">Bossa Nova</option>
    <option value="tumbao">Tumbao</option>
    <option value="tresillo">Tresillo (3-3-2)</option>
    <option value="reggaeton">Reggaeton</option>
    <option value="offbeats">Offbeat Skank</option>
    <option value="funk_16ths">Funk 16ths</option>
    <option value="pedal_pickup">Pedal + Pickup</option>
  </select>
</div>
<div class="row">
  <label for="octave">Register</label>
  <select id="octave">
    <option value="1">Low</option>
    <option value="2" selected>Standard</option>
    <option value="3">High</option>
  </select>
</div>
<div class="hint">Follows the chords in this clip. The bass clip is written to the first empty MIDI slot.</div>
<div class="actions">
  <button class="cancel" onclick="closeWithResult(null)">Cancel</button>
  <button class="primary" onclick="submit()">Generate</button>
</div>
</body>
</html>
`;var De=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Compose Song Form</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; }
  input, button, select { font: inherit; }
  :root {
    --c-bg:           hsl(0,0%,21%);
    --c-card:         hsl(0,0%,17%);
    --c-control-bg:   hsl(0,0%,16%);
    --c-control-bg-h: hsl(0,0%,13%);
    --c-input-bg:     hsl(0,0%,12%);
    --c-text:         hsl(0,0%,71%);
    --c-text-dim:     hsl(0,0%,45%);
    --c-border:       hsl(0,0%,7%);
    --c-accent:       hsl(31,100%,67%);
    --c-accent-fg:    hsl(0,0%,7%);
    --c-bad:          hsl(0,65%,55%);
  }
  html { background: var(--c-bg); color: var(--c-text); font-family: "AbletonSansSmall", sans-serif; font-size: 11.5px; font-weight: 500; -webkit-font-smoothing: antialiased; }
  body { padding: 1em 1.25em; display: flex; flex-direction: column; gap: 0.7em; height: 100vh; }
  .title-row { display: flex; align-items: center; gap: 1em; }
  .title { font-size: 1.15em; }
  .spacer { flex: 1; }
  select, input[type="text"], input[type="number"] {
    background: var(--c-input-bg); color: var(--c-text);
    border: 1px solid var(--c-border); height: 20px; padding: 0 0.3em;
  }
  select { appearance: none; -webkit-appearance: none; cursor: pointer; }
  select:focus, input:focus { outline: 2px solid var(--c-text-dim); }
  label.inline { display: flex; align-items: center; gap: 0.35em; color: var(--c-text-dim); white-space: nowrap; }
  label.inline input[type="checkbox"] { accent-color: var(--c-accent); width: 12px; height: 12px; }
  .globals { display: flex; align-items: center; gap: 0.9em; flex-wrap: wrap; }

  #sections { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.45em; padding-right: 2px; }
  .sec {
    background: var(--c-card); border: 1px solid var(--c-border);
    padding: 0.5em 0.6em; display: flex; flex-direction: column; gap: 0.4em;
  }
  .sec-line { display: flex; align-items: center; gap: 0.5em; flex-wrap: wrap; }
  .sec-name { width: 7em; }
  .sec input.custom { flex: 1; min-width: 12em; }
  .lbl { color: var(--c-text-dim); white-space: nowrap; }
  .sec button.icon {
    width: 22px; height: 20px; line-height: 1; padding: 0;
    background: var(--c-control-bg); color: var(--c-text);
    border: 1px solid var(--c-border); cursor: pointer; border-radius: 3px;
  }
  .sec button.icon:hover { background: var(--c-control-bg-h); }
  .sec input.custom.bad { border-color: var(--c-bad); color: var(--c-bad); }

  .footer { display: flex; align-items: center; gap: 0.75em; }
  #total { color: var(--c-text-dim); }
  button.btn {
    font-size: 1rem; line-height: 1; background: var(--c-control-bg); color: var(--c-text);
    border: 1px solid var(--c-border); height: 22px; padding: 0 1.1em;
    border-radius: 1em; cursor: pointer; white-space: nowrap;
  }
  button.btn:hover { background: var(--c-control-bg-h); }
  button.btn.primary { background: var(--c-accent); color: var(--c-accent-fg); border-color: var(--c-accent); }
  button.btn.primary:hover { filter: brightness(1.08); }
</style>
</head>
<body>
  <div class="title-row">
    <span class="title">Compose Song Form</span>
    <span class="spacer"></span>
    <span class="lbl">Form</span>
    <select id="preset">
      <option value="">Load a form\u2026</option>
      <option value="verse_chorus">Verse\u2013Chorus (pop)</option>
      <option value="aaba">AABA (32-bar)</option>
      <option value="blues">12-Bar Blues \xD72</option>
      <option value="edm">EDM Arc</option>
      <option value="lofi">Lo-fi Vamp Set</option>
    </select>
  </div>

  <div class="globals">
    <span class="lbl">Key</span>
    <select id="g-key"></select>
    <span class="lbl">Scale</span>
    <select id="g-scale"></select>
    <span class="lbl">Voicing</span>
    <select id="g-voicing">
      <option value="smooth">Smooth</option>
      <option value="close">Close</option>
      <option value="drop2">Drop 2</option>
      <option value="shell">Shell</option>
    </select>
    <label class="inline"><input type="checkbox" id="g-sevenths" /> 7ths</label>
    <span class="lbl">Bass register</span>
    <select id="g-bassoct">
      <option value="1">Low</option>
      <option value="2" selected>Standard</option>
      <option value="3">High</option>
    </select>
  </div>

  <div id="sections"></div>

  <div class="footer">
    <button class="btn" id="add">+ Add Section</button>
    <span id="total"></span>
    <span class="spacer"></span>
    <button class="btn" id="cancel">Cancel</button>
    <button class="btn primary" id="write">Write to Session</button>
  </div>

<script>
  const isWebKit = window.webkit?.messageHandlers?.live;
  const isWebView2 = window.chrome?.webview;
  function closeWithResult(result) {
    const msg = { method: "close_and_send", params: [JSON.stringify(result)] };
    if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);
    else if (isWebView2) window.chrome.webview.postMessage(msg);
  }

  const KEY_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  const SCALES = [
    ["major","Major"],["natural_minor","Natural Minor"],["harmonic_minor","Harmonic Minor"],
    ["melodic_minor","Melodic Minor"],["dorian","Dorian"],["phrygian","Phrygian"],
    ["lydian","Lydian"],["mixolydian","Mixolydian"],
  ];
  const TEMPLATES = ["I-V-vi-IV","I-IV-V-I","I-vi-IV-V","vi-IV-I-V","ii-V-I","I-IV-vi-V",
    "I-V-IV-V","I-iii-IV-V","12-bar blues","Andalusian cadence","Pachelbel","Circle of fifths"];
  const RHYTHMS = [
    ["block","Block Chords"],["halves","Halves"],["quarters","Quarters"],["pump_8ths","Pumping 8ths"],
    ["swung_8ths","Swung 8ths"],["charleston","Charleston"],["tresillo","Tresillo"],
    ["boom_chuck","Boom-Chuck"],["syncopated","Syncopated"],["offbeats","Offbeat Skank"],
    ["arp_up_8ths","Arpeggio Up"],
  ];
  const BASSES = [
    ["none","No bass"],["roots","Roots"],["root_fifth","Root\u2013Fifth"],["quarter_pulse","Quarter Pulse"],
    ["pump_8ths","Pumping 8ths"],["root_octave_8ths","Octave 8ths"],["two_feel","Two-Feel"],
    ["walking","Walking"],["boogie","Boogie Shuffle"],["bossa","Bossa Nova"],["tumbao","Tumbao"],
    ["tresillo","Tresillo"],["reggaeton","Reggaeton"],["offbeats","Offbeats"],
    ["funk_16ths","Funk 16ths"],["pedal_pickup","Pedal + Pickup"],
  ];
  const SECTION_NAMES = ["Intro","Verse","Chorus","Bridge","Build","Drop","Break","Outro","Vamp","A","B"];

  const init = window._INIT ?? { key: 0, scale: "major" };
  let sections = [];

  function fillSelect(sel, pairs, value) {
    sel.innerHTML = "";
    for (const [v, label] of pairs) {
      const o = document.createElement("option");
      o.value = v; o.textContent = label;
      if (v === value) o.selected = true;
      sel.appendChild(o);
    }
  }

  function defaultSection() {
    return {
      name: "Verse", bars: 4, beatsPerChord: 2,
      key: Number(document.getElementById("g-key").value),
      scale: document.getElementById("g-scale").value,
      template: "I-V-vi-IV", customProgression: "",
      rhythm: "block", bass: "none",
    };
  }

  // \u2500\u2500 Engine validation for custom progressions (best-effort) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  const ENGINE = "http://127.0.0.1:7842";
  const ROMAN_RE = /^[b#\u266D\u266F]?[ivIV]/;
  async function engineOp(op, params) {
    const r = await fetch(ENGINE, { method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ op, ...params }) });
    const data = await r.json();
    if (data.error) throw new Error(data.error);
    return data.result;
  }
  async function validateCustom(inputEl, sec) {
    const text = inputEl.value.trim();
    if (!text) { inputEl.classList.remove("bad"); inputEl.title = ""; return; }
    const tokens = text.split(/[\\s,|]+/).filter(Boolean);
    try {
      const names = await Promise.all(tokens.map(async tok => {
        const roman = () => engineOp("parse_roman", { roman: tok, key: sec.key, scale: sec.scale });
        const name  = () => engineOp("parse_chord", { name: tok });
        const [a, b] = ROMAN_RE.test(tok) ? [roman, name] : [name, roman];
        try { return (await a()).chord.name; } catch { return (await b()).chord.name; }
      }));
      inputEl.classList.remove("bad");
      inputEl.title = names.join(" \u2013 ");
    } catch (e) {
      if (e instanceof TypeError) return; // engine HTTP unreachable \u2014 skip
      inputEl.classList.add("bad");
      inputEl.title = String(e.message || e);
    }
  }

  // \u2500\u2500 Section rows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  function render() {
    const host = document.getElementById("sections");
    host.innerHTML = "";
    sections.forEach((sec, i) => host.appendChild(buildRow(sec, i)));
    updateTotal();
  }

  function sel(pairs, value, onChange, cls) {
    const s = document.createElement("select");
    if (cls) s.className = cls;
    fillSelect(s, pairs, value);
    s.addEventListener("change", () => onChange(s.value));
    return s;
  }
  function lbl(text) {
    const s = document.createElement("span");
    s.className = "lbl"; s.textContent = text;
    return s;
  }

  function buildRow(sec, i) {
    const card = document.createElement("div");
    card.className = "sec";

    const l1 = document.createElement("div");
    l1.className = "sec-line";

    const nameSel = sel(SECTION_NAMES.map(n => [n, n]), sec.name, v => { sec.name = v; updateTotal(); }, "sec-name");
    if (!SECTION_NAMES.includes(sec.name)) {
      const o = document.createElement("option");
      o.value = sec.name; o.textContent = sec.name; o.selected = true;
      nameSel.appendChild(o);
    }
    l1.appendChild(nameSel);

    l1.appendChild(lbl("Bars"));
    l1.appendChild(sel([["1","1"],["2","2"],["4","4"],["8","8"],["12","12"],["16","16"]],
      String(sec.bars), v => { sec.bars = Number(v); updateTotal(); }));

    l1.appendChild(lbl("Beats/chord"));
    l1.appendChild(sel([["1","1"],["2","2"],["4","4"]],
      String(sec.beatsPerChord), v => { sec.beatsPerChord = Number(v); }));

    l1.appendChild(lbl("Key"));
    l1.appendChild(sel(KEY_NAMES.map((n, pc) => [String(pc), n]), String(sec.key),
      v => { sec.key = Number(v); revalidate(); }));

    l1.appendChild(lbl("Scale"));
    l1.appendChild(sel(SCALES, sec.scale, v => { sec.scale = v; revalidate(); }));

    const spacer1 = document.createElement("span");
    spacer1.className = "spacer";
    l1.appendChild(spacer1);

    const up = document.createElement("button");
    up.className = "icon"; up.textContent = "\u2191"; up.disabled = i === 0;
    up.addEventListener("click", () => { [sections[i-1], sections[i]] = [sections[i], sections[i-1]]; render(); });
    const down = document.createElement("button");
    down.className = "icon"; down.textContent = "\u2193"; down.disabled = i === sections.length - 1;
    down.addEventListener("click", () => { [sections[i+1], sections[i]] = [sections[i], sections[i+1]]; render(); });
    const del = document.createElement("button");
    del.className = "icon"; del.textContent = "\u2715";
    del.addEventListener("click", () => { sections.splice(i, 1); render(); });
    l1.append(up, down, del);

    const l2 = document.createElement("div");
    l2.className = "sec-line";

    l2.appendChild(lbl("Progression"));
    l2.appendChild(sel(TEMPLATES.map(t => [t, t]), sec.template, v => { sec.template = v; }));

    const custom = document.createElement("input");
    custom.type = "text"; custom.className = "custom";
    custom.placeholder = "or custom: ii7 V7 Imaj7 \xB7 bVII \xB7 Dm7 G7";
    custom.spellcheck = false; custom.value = sec.customProgression;
    let t = null;
    custom.addEventListener("input", () => {
      sec.customProgression = custom.value.trim();
      clearTimeout(t);
      t = setTimeout(() => validateCustom(custom, sec), 250);
    });
    l2.appendChild(custom);

    l2.appendChild(lbl("Rhythm"));
    l2.appendChild(sel(RHYTHMS, sec.rhythm, v => { sec.rhythm = v; }));

    l2.appendChild(lbl("Bass"));
    l2.appendChild(sel(BASSES, sec.bass, v => { sec.bass = v; }));

    function revalidate() { if (custom.value.trim()) validateCustom(custom, sec); }

    card.append(l1, l2);
    return card;
  }

  function updateTotal() {
    const bars = sections.reduce((n, s) => n + s.bars, 0);
    document.getElementById("total").textContent =
      \`\${sections.length} section\${sections.length === 1 ? "" : "s"} \xB7 \${bars} bars \xB7 \${bars * 4} beats\`;
  }

  // \u2500\u2500 Form presets \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // keyOff transposes relative to the global key; scale overrides global.
  function S(name, bars, bpc, template, rhythm, bass, opts = {}) {
    const gKey = Number(document.getElementById("g-key").value);
    const gScale = document.getElementById("g-scale").value;
    return {
      name, bars, beatsPerChord: bpc, template, customProgression: opts.custom ?? "",
      key: (gKey + (opts.keyOff ?? 0) + 12) % 12,
      scale: opts.scale ?? gScale,
      rhythm, bass,
    };
  }
  const PRESETS = {
    verse_chorus: () => [
      S("Intro", 4, 2, "I-IV-V-I", "block", "none"),
      S("Verse", 8, 2, "I-V-vi-IV", "quarters", "roots"),
      S("Chorus", 8, 2, "I-IV-vi-V", "pump_8ths", "pump_8ths"),
      S("Verse", 8, 2, "I-V-vi-IV", "quarters", "roots"),
      S("Chorus", 8, 2, "I-IV-vi-V", "pump_8ths", "pump_8ths"),
      S("Bridge", 4, 2, "vi-IV-I-V", "charleston", "root_fifth"),
      S("Chorus", 8, 2, "I-IV-vi-V", "pump_8ths", "pump_8ths"),
      S("Outro", 4, 4, "I-IV-V-I", "block", "roots"),
    ],
    aaba: () => {
      document.getElementById("g-sevenths").checked = true;
      return [
        S("A", 8, 2, "ii-V-I", "swung_8ths", "two_feel"),
        S("A", 8, 2, "ii-V-I", "swung_8ths", "two_feel"),
        S("B", 8, 2, "Circle of fifths", "swung_8ths", "walking"),
        S("A", 8, 2, "ii-V-I", "swung_8ths", "walking"),
      ];
    },
    blues: () => {
      document.getElementById("g-sevenths").checked = true;
      return [
        S("Chorus 1", 12, 4, "12-bar blues", "boom_chuck", "walking"),
        S("Chorus 2", 12, 4, "12-bar blues", "boom_chuck", "boogie"),
      ];
    },
    edm: () => [
      S("Intro", 8, 2, "vi-IV-I-V", "block", "none"),
      S("Build", 8, 2, "vi-IV-I-V", "quarters", "pump_8ths"),
      S("Drop", 8, 2, "I-V-vi-IV", "pump_8ths", "root_octave_8ths"),
      S("Break", 4, 4, "vi-IV-I-V", "block", "none"),
      S("Build", 4, 2, "vi-IV-I-V", "quarters", "pump_8ths"),
      S("Drop", 8, 2, "I-V-vi-IV", "pump_8ths", "root_octave_8ths"),
    ],
    lofi: () => {
      document.getElementById("g-sevenths").checked = true;
      return [
        S("Vamp", 4, 2, "ii-V-I", "tresillo", "tumbao"),
        S("Vamp", 4, 2, "I-vi-IV-V", "tresillo", "tumbao"),
        S("Vamp", 4, 2, "ii-V-I", "tresillo", "tumbao"),
        S("Vamp", 4, 2, "vi-IV-I-V", "tresillo", "tumbao"),
      ];
    },
  };

  // \u2500\u2500 Wiring \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  document.addEventListener("DOMContentLoaded", () => {
    fillSelect(document.getElementById("g-key"), KEY_NAMES.map((n, pc) => [String(pc), n]), String(init.key));
    fillSelect(document.getElementById("g-scale"), SCALES, SCALES.some(([v]) => v === init.scale) ? init.scale : "major");

    document.getElementById("preset").addEventListener("change", e => {
      const make = PRESETS[e.target.value];
      if (make) { sections = make(); render(); }
      e.target.value = "";
    });
    document.getElementById("add").addEventListener("click", () => {
      sections.push(defaultSection()); render();
    });
    document.getElementById("cancel").addEventListener("click", () => closeWithResult(null));
    document.getElementById("write").addEventListener("click", () => {
      if (sections.length === 0) { closeWithResult(null); return; }
      closeWithResult({
        action: "songform",
        voicing: document.getElementById("g-voicing").value,
        sevenths: document.getElementById("g-sevenths").checked,
        bassOctave: Number(document.getElementById("g-bassoct").value),
        sections,
      });
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeWithResult(null);
    });

    sections = [defaultSection()];
    render();
  });
</script>
</body>
</html>
`;var q=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],de={Major:"major",Minor:"natural_minor",Dorian:"dorian",Phrygian:"phrygian",Lydian:"lydian",Mixolydian:"mixolydian",Locrian:"locrian","Harmonic Minor":"harmonic_minor","Melodic Minor":"melodic_minor"},ut={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},gt=[0,7,2,9,4,11,6,1,8,3,10,5],Z=[0,2,4,5,7,9,11],bt=[0,2,3,5,7,8,10],ft=[0,2,3,5,7,9,10],vt=[0,1,3,5,7,8,10],yt=[0,2,4,6,7,9,11],xt=[0,2,4,5,7,9,10],wt=[0,1,3,5,6,8,10],kt=[0,2,3,5,7,8,11],Ct=[0,2,3,5,7,9,11],It=[0,2,4,7,9],Mt=[0,3,5,7,10],St=[0,3,5,6,7,10],Q={major:Z,natural_minor:bt,dorian:ft,phrygian:vt,lydian:yt,mixolydian:xt,locrian:wt,harmonic_minor:kt,melodic_minor:Ct,pentatonic_major:It,pentatonic_minor:Mt,blues:St},Et={major:"major",natural_minor:"minor",dorian:"Dorian",phrygian:"Phrygian",lydian:"Lydian",mixolydian:"Mixolydian",locrian:"Locrian",harmonic_minor:"harmonic minor",melodic_minor:"melodic minor",pentatonic_major:"pentatonic major",pentatonic_minor:"pentatonic minor",blues:"blues"},Oe=[{id:"major",label:"Major"},{id:"natural_minor",label:"Natural Minor"},{id:"dorian",label:"Dorian"},{id:"phrygian",label:"Phrygian"},{id:"lydian",label:"Lydian"},{id:"mixolydian",label:"Mixolydian"},{id:"locrian",label:"Locrian"},{id:"harmonic_minor",label:"Harmonic Minor"},{id:"melodic_minor",label:"Melodic Minor"},{id:"pentatonic_major",label:"Pentatonic Major"},{id:"pentatonic_minor",label:"Pentatonic Minor"},{id:"blues",label:"Blues"}];function G(e,t=.25){let c=new Map;for(let g of e){let p=Math.round(g.startTime/t)*t,d=Math.round(p*1e3),o=c.get(d);o?o.push(g.pitch):c.set(d,[g.pitch])}return c}function ae(e){return JSON.stringify(e).replace(/</g,"\\u003C").replace(/>/g,"\\u003E")}function Tt(e,t,c){let g=t/100,p=c/100,d=g*Math.min(p,1-p),o=n=>{let i=(n+e/30)%12;return p-d*Math.max(Math.min(i-3,9-i,1),-1)};return Math.round(o(0)*255)<<16|Math.round(o(8)*255)<<8|Math.round(o(4)*255)}function Y(e){let t=e.match(/^([A-G][#b]?)\s+(.*)/);if(!t)return null;let c=ut[t[1]??""];if(c===void 0)return null;let g=/minor|min\b/i.test(t[2]??""),p=(gt[c]??0)*30;return Tt(p,g?55:70,g?35:45)}async function U(e,t){let c=G(e),p=(await Promise.all([...c.entries()].map(([i,s])=>t.send("recognize_chord",{notes:s}).then(u=>({beatKey:i,r:u}))))).sort((i,s)=>i.beatKey-s.beatKey).flatMap(({r:i})=>{let s=i.matches[0];return s&&s.score>=.5?[s.chord.name]:[]}).filter((i,s,u)=>s===0||i!==u[s-1]);if(p.length>0){let s=(await t.send("analyze",{chord_names:p})).inferred_key;return{root:s.root,scale:s.scale,label:s.label}}let d=new Array(12).fill(0);for(let i of e){let s=i.pitch%12;d[s]=(d[s]??0)+1}let o=-1,n=null;for(let i=0;i<12;i++)for(let[s,u]of Object.entries(Q)){let a=0;for(let r of u)a+=d[(i+r)%12]??0;if(a>o){o=a;let r=q[i]??"C",l=Et[s]??s;n={root:i,scale:s,label:`${r} ${l}`}}}return n}function pe(e,t){let c=e%12;if(t.has(c))return e;for(let g=1;g<=6;g++){let p=t.has((c+g)%12),d=t.has((c-g+12)%12);if(p&&d||p)return e+g;if(d)return e-g}return e}function X(e){let t=e.match(/^([A-G][#b]?)\s+(.+)$/);if(!t)return e;let c=t[1]??e,g=(t[2]??"").toLowerCase().trim();if(g==="major")return c;if(g==="minor"||g==="natural minor"||g==="natural_minor")return`${c}m`;if(g==="harmonic minor"||g==="harmonic_minor")return`${c}hm`;if(g==="melodic minor"||g==="melodic_minor")return`${c}mm`;let p=g.split(/[\s_]/)[0]??g;return`${c} ${p.slice(0,3)}`}function _t(e,t,c,g){return e===c&&t===g?"Same key":e===c?t?"Parallel major":"Parallel minor":!t&&g&&c===(e+9)%12?"Relative minor":t&&!g&&c===(e+3)%12?"Relative major":c===(e+7)%12?"Dominant (V)":c===(e+5)%12?"Subdominant (IV)":null}var At=/^[b#♭♯]?[ivIV]/;async function He(e,t,c,g){let p=async()=>(await e.send("parse_roman",{roman:t,key:c,scale:g})).chord,d=async()=>(await e.send("parse_chord",{name:t})).chord,[o,n]=At.test(t)?[p,d]:[d,p];try{return await o()}catch{try{return await n()}catch{throw new Error(`Couldn't parse "${t}" as a Roman numeral or chord name`)}}}async function $e(e,t){let c=t.customProgression?.trim();if(!c){let{chords:p}=await e.send("progression",{key:t.key,scale:t.scale,template:t.template,sevenths:t.sevenths});return p}let g=c.split(/[\s,|]+/).filter(Boolean);return Promise.all(g.map(p=>He(e,p,t.key,t.scale)))}function je(e){return e.customProgression?.trim()||e.template}var Nt={halves:{span:4,hits:[{t:0,d:2,v:1},{t:2,d:2,v:.9}]},quarters:{span:4,hits:[{t:0,d:1,v:1},{t:1,d:1,v:.85},{t:2,d:1,v:.95},{t:3,d:1,v:.85}]},pump_8ths:{span:4,hits:[0,.5,1,1.5,2,2.5,3,3.5].map(e=>({t:e,d:.45,v:e%1===0?1:.8}))},swung_8ths:{span:4,hits:[0,1,2,3].flatMap(e=>[{t:e,d:.6,v:1},{t:e+.66,d:.3,v:.75}])},charleston:{span:4,hits:[{t:0,d:1.4,v:1},{t:1.5,d:2.4,v:.85}]},tresillo:{span:4,hits:[{t:0,d:1.4,v:1},{t:1.5,d:1.4,v:.85},{t:3,d:.9,v:.95}]},boom_chuck:{span:4,hits:[{t:0,d:.95,v:1},{t:1,d:.45,v:.75},{t:1.5,d:.45,v:.75},{t:2,d:.95,v:.95},{t:3,d:.45,v:.75},{t:3.5,d:.45,v:.75}]},syncopated:{span:4,hits:[{t:0,d:.7,v:1},{t:.75,d:.2,v:.7},{t:1,d:.45,v:.85},{t:1.5,d:1.4,v:.95},{t:3,d:.45,v:.85},{t:3.5,d:.45,v:.8}]},offbeats:{span:4,hits:[.5,1.5,2.5,3.5].map(e=>({t:e,d:.35,v:.95}))},arp_up_8ths:{span:4,arp:!0,hits:[0,.5,1,1.5,2,2.5,3,3.5].map(e=>({t:e,d:.5,v:e%1===0?.95:.8}))}},he=90;function se(e,t,c){let g=c?Nt[c]:void 0;if(!g)return e.flatMap((d,o)=>d.map(n=>({pitch:Math.max(0,Math.min(127,n)),startTime:o*t,duration:t*.95,velocity:he})));let p=t/g.span;return e.flatMap((d,o)=>{if(d.length===0)return[];let n=[...d].sort((i,s)=>i-s);return g.hits.flatMap((i,s)=>{let u=Math.max(1,Math.min(127,Math.round(he*i.v)));return(g.arp?[n[s%n.length]??60]:n).map(r=>({pitch:Math.max(0,Math.min(127,r)),startTime:o*t+i.t*p,duration:i.d*p,velocity:u}))})})}function Pt(e,t){return e.map((c,g)=>{let p=e[g+1],d=p?p.beat:Math.max(t,c.beat+1),o=c.pitchClasses,n=(i,s)=>{let u=o[i];return u===void 0?s:(u-c.root+12)%12||s};return{start:c.beat,span:Math.max(.5,d-c.beat),rootPc:c.root,thirdIv:n(1,4),fifthIv:n(2,7),nextRootPc:p?p.root:null}})}function me(e,t){return Math.abs(e-1-t)<=Math.abs(e+1-t)?e-1:e+1}function Le(e,t,c){let g=12*(c+1),p=o=>Math.max(20,Math.min(64,o)),d=(o,n,i,s)=>({pitch:p(i),startTime:o,duration:n,velocity:Math.max(1,Math.min(127,Math.round(he*s)))});return e.flatMap(o=>{let n=g+o.rootPc,i=n+o.thirdIv,s=n+o.fifthIv,u=[];switch(t){case"root_fifth":{if(o.span<2){u.push(d(o.start,o.span*.95,n,1));break}let a=o.span/2;u.push(d(o.start,a*.95,n,1)),u.push(d(o.start+a,a*.95,s,.85));break}case"pump_8ths":case"root_octave_8ths":{let a=Math.max(1,Math.round(o.span/.5)),r=o.span/a;for(let l=0;l<a;l++){let m=t==="root_octave_8ths"&&l%2===1?n+12:n;u.push(d(o.start+l*r,r*.9,m,l%2===0?1:.8))}break}case"walking":{let a=Math.max(1,Math.round(o.span)),r=o.span/a,l=[n,i,s,i];for(let m=0;m<a;m++){let f=l[m%l.length]??n;m===a-1&&a>1&&o.nextRootPc!==null&&(f=me(g+o.nextRootPc,s)),u.push(d(o.start+m*r,r*.9,f,m===0?1:.88))}break}case"two_feel":{if(o.span<2){u.push(d(o.start,o.span*.95,n,1));break}let a=Math.max(1,Math.round(o.span/2)),r=o.span/a;for(let l=0;l<a;l++){let m=l%2===0?n:s;l===a-1&&a>1&&o.nextRootPc!==null&&(m=me(g+o.nextRootPc,s)),u.push(d(o.start+l*r,r*.92,m,l%2===0?1:.85))}break}case"boogie":{let a=[n,i,s,n+9,n+10,n+9,s,i],r=Math.max(1,Math.round(o.span/.5)),l=o.span/r;for(let m=0;m<r;m++)u.push(d(o.start+m*l,l*.9,a[m%a.length]??n,m%2===0?1:.8));break}case"bossa":{let a=o.span/4;u.push(d(o.start+0*a,1.4*a,n,1)),u.push(d(o.start+1.5*a,.4*a,s,.8)),u.push(d(o.start+2*a,1.4*a,n,.95)),u.push(d(o.start+3.5*a,.4*a,s,.8));break}case"tumbao":{let a=o.span/4,r=o.nextRootPc!==null?g+o.nextRootPc:n;u.push(d(o.start+0*a,.4*a,n,.7)),u.push(d(o.start+1.5*a,1.3*a,s,.95)),u.push(d(o.start+3*a,.95*a,r,1));break}case"quarter_pulse":{let a=Math.max(1,Math.round(o.span)),r=o.span/a;for(let l=0;l<a;l++)u.push(d(o.start+l*r,r*.9,n,l===0?1:.88));break}case"reggaeton":{let a=Math.max(1,Math.round(o.span/2)),r=o.span/a,l=r/2;for(let m=0;m<a;m++){let f=o.start+m*r;u.push(d(f+0*l,.7*l,n,m===0?1:.95)),u.push(d(f+.75*l,.7*l,n,.8)),u.push(d(f+1.5*l,.45*l,n,.85))}break}case"funk_16ths":{let a=o.span/4,r=[[0,.4,n,1],[.75,.2,n,.6],[1,.4,n+12,.9],[1.75,.2,n,.6],[2,.4,n,1],[2.75,.2,n,.6],[3,.4,n+12,.9],[3.5,.4,n,.8]];for(let[l,m,f,x]of r)u.push(d(o.start+l*a,m*a,f,x));break}case"pedal_pickup":{if(o.nextRootPc===null||o.span<=1){u.push(d(o.start,o.span*.95,n,1));break}u.push(d(o.start,o.span-.5,n,1)),u.push(d(o.start+o.span-.5,.4,me(g+o.nextRootPc,n),.85));break}case"tresillo":{let a=o.span/4;u.push(d(o.start+0*a,1.4*a,n,1)),u.push(d(o.start+1.5*a,1.4*a,n,.85)),u.push(d(o.start+3*a,.9*a,s,.95));break}case"offbeats":{let a=o.span/4;for(let r of[.5,1.5,2.5,3.5])u.push(d(o.start+r*a,.35*a,n,.95));break}default:u.push(d(o.start,o.span*.95,n,1))}return u})}function Rt(e){let t=Me(e,"1.0.0"),c=process.env.COMPOSITION_AIDE_PATH??Ve.join(__dirname,"..","engine"),g=process.env.PYTHON_CMD??(process.platform==="win32"?"python":"python3"),p=new ne(c,g);p.send("list_ops").catch(()=>{}),t.commands.registerCommand("aide.generate",d=>{(async o=>{let n=o.selected_lanes.map(x=>t.getObjectFromHandle(x,$)).filter(x=>x instanceof F);if(!n.length){console.log("[composition-aide] No MIDI tracks in selection.");return}let i=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(ce)}`,380,416),s;try{s=JSON.parse(i)}catch{return}if(!s)return;let u=o.time_selection_end-o.time_selection_start,a=await $e(p,s),{voicings:r}=await p.send("voice_progression",{chords:a,strategy:s.voicing,octave:4}),l=u/a.length,m=`${je(s)} \u2014 ${s.keyName} ${s.scale.replace(/_/g," ")}`,f=se(r,l,s.rhythm);if(s.snapToScale){let x=Q[s.scale]??Z,k=new Set(x.map(y=>(s.key+y)%12));f=f.map(y=>({...y,pitch:pe(y.pitch,k)}))}await Promise.all(n.map(async x=>{let k=await x.createMidiClip(o.time_selection_start,u);k.name=m,k.notes=f})),console.log(`[composition-aide] "${m}": ${a.map(x=>x.name).join(" \u2013 ")} (${l.toFixed(2)} beats/chord)`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiTrack.ArrangementSelection","Generate Progression\u2026","aide.generate"),t.commands.registerCommand("aide.analyze",d=>{let o=async n=>{let i=t.getObjectFromHandle(n,B),s=i.notes;if(s.length===0){console.log("[composition-aide] Clip has no notes.");return}let u=G(s),r=(await Promise.all([...u.entries()].map(([S,P])=>p.send("recognize_chord",{notes:P}).then(j=>({beatKey:S,result:j}))))).sort((S,P)=>S.beatKey-P.beatKey).flatMap(({beatKey:S,result:P})=>{let j=P.matches[0];return!j||j.score<.5?[]:[{beat:S/1e3,name:j.chord.name,score:j.score,pitchClasses:j.chord.pitch_classes,root:j.chord.root,quality:j.chord.quality}]}).filter((S,P,j)=>P===0||S.name!==j[P-1]?.name);if(r.length===0){console.log("[composition-aide] Could not identify any chords in this clip.");return}let l=r.map(S=>S.name),m=await p.send("analyze",{chord_names:l}),f={clipName:i.name||"(unnamed clip)",noteCount:s.length,inferredKey:m.inferred_key.label,scaleRoot:m.inferred_key.root,scaleIntervals:[...Q[m.inferred_key.scale]??Z],chords:l.map((S,P)=>({beat:r[P]?.beat??0,name:S,roman:m.roman_labels[P]??S,tension:m.tension[P]??0,score:r[P]?.score??0,pitchClasses:r[P]?.pitchClasses??[],root:r[P]?.root??0,quality:r[P]?.quality??"major"})),substitutions:m.substitutions.slice(0,5).map(S=>({position:S.position,original:S.original.name,replacement:S.replacement.name,rationale:S.rationale})),summary:m.summary},x=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Ee.replace("__ANALYSIS_JSON__",ae(f)))}`,520,560);console.log(`[composition-aide] Analyzed "${f.clipName}": ${f.inferredKey} \u2014 ${l.join(" \u2013 ")}`);let k;try{k=JSON.parse(x)}catch{return}if(!k||k.action!=="substitute")return;let{position:y,original:w,replacement:E}=k,_=r[y];if(!_){console.error(`[composition-aide] Substitution position ${y} out of range.`);return}let h=r[y+1],b=_.beat,C=i.notes,v=Math.max(b+4,...C.map(S=>S.startTime+S.duration)),I=h?.beat??v,M=C.filter(S=>S.startTime>=b-.01&&S.startTime<I-.01),T=M.length>0?Math.round(M.reduce((S,P)=>S+P.pitch,0)/M.length):60,R=Math.max(3,Math.min(6,Math.floor(T/12)-1)),O=await p.send("voicings",{name:E,octave:R}),N=M.length>0?M.reduce((S,P)=>S+P.duration,0)/M.length:(I-b)*.95,A=O.close.map(S=>({pitch:Math.max(0,Math.min(127,S)),startTime:b,duration:N,velocity:90}));i.notes=[...C.filter(S=>S.startTime<b-.01||S.startTime>=I-.01),...A],console.log(`[composition-aide] Substituted: ${w} \u2192 ${E} at beat ${b.toFixed(2)} (octave ${R})`),await o(n)};o(d).catch(n=>console.error(n))}),t.ui.registerContextMenuAction("MidiClip","Analyze Harmony\u2026","aide.analyze"),t.commands.registerCommand("aide.chordPalette",d=>{(async o=>{let n=t.getObjectFromHandle(o,J),i=t.application.song,s=i?.rootNote??0,u=i?.scaleName??"Major",a=de[u]??"major",r=await Promise.all(Oe.flatMap(({id:I})=>[p.send("diatonic",{key:s,scale:I,sevenths:!1}).then(M=>({id:I,sevenths:!1,chords:M.chords})),p.send("diatonic",{key:s,scale:I,sevenths:!0}).then(M=>({id:I,sevenths:!0,chords:M.chords}))])),l={};for(let{id:I,sevenths:M,chords:T}of r)l[I]||(l[I]={triads:[],sevenths:[],intervals:Q[I]??Z}),M?l[I].sevenths=T:l[I].triads=T;let m={keyRoot:s,keyName:q[s]??"C",defaultScale:a,scaleOptions:Oe,scales:l},f=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Te.replace("__PALETTE_JSON__",ae(m)))}`,510,296),x;try{x=JSON.parse(f)}catch{return}if(!x||x.action!=="insert")return;let{chordName:k,length:y,voicing:w,octave:E,selectedScale:_}=x,C=(await p.send("voicings",{name:k,octave:E}))[w].map(I=>({pitch:Math.max(0,Math.min(127,I)),startTime:0,duration:y*.95,velocity:90})),v=n.clip;if(v instanceof B)v.name=k,v.notes=C;else{let I=await n.createMidiClip(y);I.name=k,I.notes=C}console.log(`[composition-aide] Inserted ${k} (${w}, oct ${E}, ${y} beats) \u2014 ${m.keyName} ${_}`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("ClipSlot","Insert Chord\u2026","aide.chordPalette"),t.commands.registerCommand("aide.sessionMap",d=>{(async o=>{let n=t.application.song;if(!n)return;let i=n.tracks,u=n.scenes.map(h=>h.name),a=[];for(let h=0;h<i.length;h++){let b=i[h];if(!b)continue;let C=b.clipSlots;for(let v=0;v<C.length;v++){let I=C[v];if(!I)continue;let M=I.clip;if(!(M instanceof B))continue;let T=M.notes;T.length!==0&&a.push({trackIndex:h,trackName:b.name,sceneIndex:v,notes:T,clipName:M.name||"(unnamed)"})}}let r=a.length;if(r===0){console.log("[composition-aide] No MIDI clips with notes found in session.");return}let m=a.reduce((h,b)=>Math.max(h,b.sceneIndex),0)+1,f=[];await t.ui.withinProgressDialog(`Analyzing session \u2014 ${r} clips\u2026`,{progress:0},async(h,b)=>{let C=0;await Promise.all(a.map(async v=>{if(b.aborted)return;let I=null,M=0;try{let T=G(v.notes),O=(await Promise.all([...T.entries()].map(([N,A])=>p.send("recognize_chord",{notes:A}).then(S=>({beatKey:N,r:S}))))).sort((N,A)=>N.beatKey-A.beatKey).flatMap(({beatKey:N,r:A})=>{let S=A.matches[0];return!S||S.score<.5?[]:[{beat:N/1e3,name:S.chord.name}]}).filter((N,A,S)=>A===0||N.name!==S[A-1]?.name);if(O.length>0){let N=await p.send("analyze",{chord_names:O.map(A=>A.name)});I=N.inferred_key.label,M=N.inferred_key.score}}catch(T){console.error(`[composition-aide] Could not analyze ${v.clipName}:`,T)}f.push({...v,key:I,score:M}),C++,await h(`${C} / ${r} clips\u2026`,Math.round(C/r*100))}))});let x=new Map;for(let h of f)h.key&&x.set(h.key,(x.get(h.key)??0)+1);let k=null,y=0;for(let[h,b]of x)b>y&&(y=b,k=h);let E=[...new Set(f.map(h=>h.trackIndex))].sort((h,b)=>h-b).map(h=>{let b=f.find(v=>v.trackIndex===h)?.trackName??`Track ${h+1}`,C=Array(m).fill(null);for(let v of f.filter(I=>I.trackIndex===h))C[v.sceneIndex]={clipName:v.clipName,key:v.key,score:v.score};return{name:b,clips:C}}),_={dominantKey:k,sceneCount:m,sceneNames:u.slice(0,m),totalMidiClips:r,analyzedClips:f.filter(h=>h.key!==null).length,tracks:E};await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(_e.replace("__SESSION_JSON__",ae(_)))}`,680,480),console.log(`[composition-aide] Session map: ${_.analyzedClips}/${r} clips`+(k?` \u2014 dominant key: ${k}`:""))})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("Scene","Map Session Keys\u2026","aide.sessionMap"),t.commands.registerCommand("aide.colorByKey",d=>{(async o=>{let n=t.application.song;if(!n)return;let i=[];for(let u of n.tracks)for(let a of u.clipSlots){let r=a.clip;if(!(r instanceof B))continue;let l=r.notes;l.length!==0&&i.push({clip:r,notes:l,clipName:r.name||"(unnamed)"})}if(i.length===0){console.log("[composition-aide] No MIDI clips with notes found.");return}let s=0;await t.ui.withinProgressDialog(`Coloring ${i.length} clips by key\u2026`,{progress:0},async(u,a)=>{let r=0;await Promise.all(i.map(async l=>{if(!a.aborted){try{let m=G(l.notes),x=(await Promise.all([...m.entries()].map(([k,y])=>p.send("recognize_chord",{notes:y}).then(w=>({beatKey:k,r:w}))))).sort((k,y)=>k.beatKey-y.beatKey).flatMap(({r:k})=>{let y=k.matches[0];return y&&y.score>=.5?[y.chord.name]:[]}).filter((k,y,w)=>y===0||k!==w[y-1]);if(x.length>0){let k=await p.send("analyze",{chord_names:x}),y=Y(k.inferred_key.label);y!==null&&(l.clip.color=y,s++)}}catch(m){console.error(`[composition-aide] Could not color "${l.clipName}":`,m)}r++,await u(`${r} / ${i.length} clips\u2026`,Math.round(r/i.length*100))}}))}),console.log(`[composition-aide] Colored ${s} / ${i.length} clips by key.`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("Scene","Color Clips by Key","aide.colorByKey"),t.commands.registerCommand("aide.generateInClip",d=>{(async o=>{let n=t.getObjectFromHandle(o,B),i=n.looping?n.loopEnd-n.loopStart:n.duration,s=i>0?i:8,u=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(ce)}`,380,416),a;try{a=JSON.parse(u)}catch{return}if(!a)return;let r=await $e(p,a),{voicings:l}=await p.send("voice_progression",{chords:r,strategy:a.voicing,octave:4}),m=s/r.length,f=se(l,m,a.rhythm);if(a.snapToScale){let x=Q[a.scale]??Z,k=new Set(x.map(y=>(a.key+y)%12));f=f.map(y=>({...y,pitch:pe(y.pitch,k)}))}n.notes=f,n.name=`${je(a)} \u2014 ${a.keyName} ${a.scale.replace(/_/g," ")}`,console.log(`[composition-aide] Generated "${n.name}": ${r.map(x=>x.name).join(" \u2013 ")} (${m.toFixed(2)} beats/chord)`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Fill Clip with Progression\u2026","aide.generateInClip"),t.commands.registerCommand("aide.voiceLead",d=>{(async o=>{let n=t.getObjectFromHandle(o,B),i=n.notes;if(i.length===0){console.log("[composition-aide] Clip has no notes.");return}let s=G(i),a=(await Promise.all([...s.entries()].map(([w,E])=>p.send("recognize_chord",{notes:E}).then(_=>({beatKey:w,r:_}))))).sort((w,E)=>w.beatKey-E.beatKey).flatMap(({beatKey:w,r:E})=>{let _=E.matches[0];return!_||_.score<.5?[]:[{beat:w/1e3,name:_.chord.name}]}).filter((w,E,_)=>E===0||w.name!==_[E-1]?.name);if(a.length===0){console.log("[composition-aide] No chords identified in clip.");return}let r=Math.round(i.reduce((w,E)=>w+E.pitch,0)/i.length),l=Math.max(3,Math.min(6,Math.floor(r/12)-1)),{voicings:m}=await p.send("voice_progression",{chords:a.map(w=>w.name),strategy:"smooth",octave:l}),f=new Map;for(let w of i){let E=Math.round(w.startTime/.25)*.25,_=Math.round(E*1e3),h=f.get(_)??[];h.push(w),f.set(_,h)}let x=new Set(a.map(w=>Math.round(w.beat*1e3))),k=[];for(let w=0;w<a.length;w++){let E=a[w],_=m[w]??[];if(!E||_.length===0)continue;let h=Math.round(E.beat*1e3),b=f.get(h)??[],C=b.length>0?b.reduce((I,M)=>I+M.duration,0)/b.length:2,v=b.length>0?Math.round(b.reduce((I,M)=>I+(M.velocity??90),0)/b.length):90;for(let I of _)k.push({pitch:Math.max(0,Math.min(127,I)),startTime:E.beat,duration:C,velocity:v})}let y=i.filter(w=>{let E=Math.round(Math.round(w.startTime/.25)*.25*1e3);return!x.has(E)});n.notes=[...y,...k],console.log(`[composition-aide] Voice-led "${n.name||"(unnamed)"}": ${a.length} chords, octave ${l}`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Optimize Voice Leading","aide.voiceLead"),t.commands.registerCommand("aide.snapToKey",d=>{(async o=>{let n=t.getObjectFromHandle(o,B),i=n.notes;if(i.length===0){console.log("[composition-aide] Clip has no notes.");return}let s=await U(i,p);if(!s){console.log("[composition-aide] Could not determine key for this clip.");return}let u=await p.send("scale_info",{key:s.root,scale:s.scale}),a=new Set(u.notes),r=i.filter(m=>a.has(m.pitch%12)),l=i.length-r.length;n.notes=r,console.log(`[composition-aide] Snapped "${n.name||"(unnamed)"}" to ${s.label}: removed ${l} out-of-key notes, kept ${r.length}`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Snap to Key","aide.snapToKey"),t.commands.registerCommand("aide.batchTranspose",d=>{(async o=>{let n=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Ae)}`,300,200),i;try{i=JSON.parse(n)}catch{return}if(!i||i.action!=="transpose")return;let{semitones:s}=i;if(s===0)return;let u=0;for(let a of o.selected_clip_slots){let l=t.getObjectFromHandle(a,J).clip;if(!(l instanceof B))continue;let m=l.notes;m.length!==0&&(l.notes=m.map(f=>({pitch:Math.max(0,Math.min(127,f.pitch+s)),startTime:f.startTime,duration:f.duration,velocity:f.velocity??90})),u++)}console.log(`[composition-aide] Transposed ${u} clips ${s>0?"+":""}${s} semitones`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("ClipSlotSelection","Transpose Selected Clips\u2026","aide.batchTranspose"),t.commands.registerCommand("aide.findCompatible",d=>{(async o=>{let n=t.getObjectFromHandle(o,B),i=n.notes;if(i.length===0){console.log("[composition-aide] Clip has no notes.");return}let s=await U(i,p);if(!s){console.log("[composition-aide] Could not determine key for reference clip.");return}let u=t.application.song;if(!u)return;let a=/minor|min\b/i.test(s.scale),r=[];for(let v of u.tracks)for(let I of v.clipSlots){let M=I.clip;if(!(M instanceof B))continue;let T=M.notes;T.length!==0&&r.push({trackName:v.name,clip:M,notes:T})}let l=[];await t.ui.withinProgressDialog("Scanning session for compatible clips\u2026",{progress:0},async(v,I)=>{let M=0;await Promise.all(r.map(async T=>{if(!I.aborted){try{let R=await U(T.notes,p);if(R){let O=/minor|min\b/i.test(R.scale),N=_t(s.root,a,R.root,O);N&&l.push({trackName:T.trackName,clipName:T.clip.name||"(unnamed)",key:R.label,compatibility:N,color:Y(R.label)??4473924})}}catch(R){console.error(`[composition-aide] Error scanning "${T.clip.name}":`,R)}M++,await v(`${M} / ${r.length} clips\u2026`,Math.round(M/r.length*100))}}))});let m=["Same key","Relative minor","Relative major","Parallel major","Parallel minor","Dominant (V)","Subdominant (IV)"];l.sort((v,I)=>{let M=m.indexOf(v.compatibility),T=m.indexOf(I.compatibility);return(M===-1?99:M)-(T===-1?99:T)});let f=[{root:s.root,scale:s.scale,label:s.label,relationship:"Same key"}],x=a?(s.root+3)%12:(s.root+9)%12;f.push({root:x,scale:a?"major":"natural_minor",label:`${q[x]??"C"} ${a?"major":"minor"}`,relationship:a?"Relative major":"Relative minor"});let k=(s.root+7)%12;f.push({root:k,scale:s.scale,label:`${q[k]??"C"} ${a?"minor":"major"}`,relationship:"Dominant (V)"});let y=(s.root+5)%12;f.push({root:y,scale:s.scale,label:`${q[y]??"C"} ${a?"minor":"major"}`,relationship:"Subdominant (IV)"});let w=["I-V-vi-IV","I-IV-V-I","ii-V-I"],E=[];await Promise.all(f.flatMap((v,I)=>(I===0?w:w.slice(0,2)).map(async T=>{try{let R=await p.send("progression",{key:v.root,scale:v.scale,template:T,sevenths:!1});E.push({relationship:v.relationship,keyLabel:v.label,template:T,chords:R.chords.map(O=>O.name),color:Y(v.label)??4473924})}catch{}})));let _=["Same key","Relative minor","Relative major","Dominant (V)","Subdominant (IV)"];E.sort((v,I)=>{let M=_.indexOf(v.relationship),T=_.indexOf(I.relationship);return(M===-1?99:M)-(T===-1?99:T)});let h={refClipName:n.name||"(unnamed)",refKey:s.label,results:l,suggestions:E},b=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Ne.replace("__COMPATIBLE_JSON__",ae(h)))}`,620,560),C=null;try{let v=JSON.parse(b);v&&typeof v.action=="string"&&(C=v)}catch{}if(C?.action==="writeProgression"){let v=C.suggestion,I=null;e:for(let M of u.tracks)if(M instanceof F){for(let T of M.clipSlots)if(T.clip===null){I=T;break e}}if(!I)console.log("[composition-aide] No empty MIDI slot found \u2014 add an empty slot to a MIDI track.");else{let T=v.chords.length*2,R=[];for(let N=0;N<v.chords.length;N++)try{let A=await p.send("voicings",{name:v.chords[N],octave:4});for(let S of A.close??[])R.push({pitch:Math.max(0,Math.min(127,S)),startTime:N*2,duration:2*.95,velocity:90})}catch{console.warn(`[composition-aide] Could not voice chord "${v.chords[N]}"`)}let O=await I.createMidiClip(T);O.notes=R,O.name=`${v.keyLabel} \xB7 ${v.template}`,O.color=v.color,console.log(`[composition-aide] Wrote "${O.name}" (${v.chords.join(" \u2013 ")}) to empty slot`)}}console.log(`[composition-aide] Found ${l.length} compatible clips for "${h.refClipName}" (${s.label})`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Find Compatible Clips\u2026","aide.findCompatible"),t.commands.registerCommand("aide.snapToScale",d=>{(async o=>{let n=t.getObjectFromHandle(o,B),i=n.notes;if(i.length===0){console.log("[composition-aide] Clip has no notes.");return}let s=await U(i,p);if(!s){console.log("[composition-aide] Could not determine key for this clip.");return}let u=await p.send("scale_info",{key:s.root,scale:s.scale}),a=new Set(u.notes),r=0,l=i.map(m=>{let f=pe(m.pitch,a);return f!==m.pitch&&r++,{...m,pitch:f}});n.notes=l,console.log(`[composition-aide] Snapped "${n.name||"(unnamed)"}" to ${s.label}: ${r} notes adjusted, ${i.length-r} already in scale`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Snap Notes to Scale","aide.snapToScale"),t.commands.registerCommand("aide.labelClipKey",d=>{(async o=>{let n=t.getObjectFromHandle(o,B),i=n.notes;if(i.length===0){console.log("[composition-aide] Clip has no notes.");return}let s=await U(i,p);if(!s){console.log("[composition-aide] Could not determine key for this clip.");return}let u=(n.name||"").replace(/ \[[^\]]*\]$/,"").trim(),a=u.length>0?`${u} [${X(s.label)}]`:`[${X(s.label)}]`;n.name=a,console.log(`[composition-aide] Labeled clip: "${a}" (${s.label})`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Label with Key","aide.labelClipKey"),t.commands.registerCommand("aide.labelAllKeys",d=>{(async o=>{let n=t.application.song;if(!n)return;let i=[];for(let u of n.tracks)for(let a of u.clipSlots){let r=a.clip;if(!(r instanceof B))continue;let l=r.notes;l.length!==0&&i.push({clip:r,notes:l})}if(i.length===0){console.log("[composition-aide] No MIDI clips with notes found.");return}let s=0;await t.ui.withinProgressDialog(`Labeling ${i.length} clips\u2026`,{progress:0},async(u,a)=>{let r=0;await Promise.all(i.map(async l=>{if(!a.aborted){try{let m=await U(l.notes,p);if(m){let f=(l.clip.name||"").replace(/ \[[^\]]*\]$/,"").trim();l.clip.name=f.length>0?`${f} [${X(m.label)}]`:`[${X(m.label)}]`,s++}}catch(m){console.error(`[composition-aide] Could not label "${l.clip.name}":`,m)}r++,await u(`${r} / ${i.length} clips\u2026`,Math.round(r/i.length*100))}}))}),console.log(`[composition-aide] Labeled ${s} / ${i.length} clips with key.`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("Scene","Label All Clips with Key","aide.labelAllKeys"),t.commands.registerCommand("aide.transposeSession",d=>{(async o=>{let n=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Pe)}`,300,250),i;try{i=JSON.parse(n)}catch{return}if(!i||i.action!=="transpose")return;let{semitones:s,recolor:u}=i,a=t.application.song;if(!a)return;let r=[];for(let m of a.tracks)for(let f of m.clipSlots){let x=f.clip;x instanceof B&&r.push({clip:x,clipName:x.name||"(unnamed)"})}if(r.length===0){console.log("[composition-aide] No MIDI clips found in session.");return}let l=u?`Transposing + recoloring ${r.length} clips\u2026`:`Transposing ${r.length} clips\u2026`;await t.ui.withinProgressDialog(l,{progress:0},async(m,f)=>{if(s!==0){let x=0;for(let k of r){if(f.aborted)return;let y=k.clip.notes;y.length>0&&(k.clip.notes=y.map(w=>({...w,pitch:Math.max(0,Math.min(127,w.pitch+s))}))),x++,await m(`Transposing: ${x} / ${r.length}\u2026`,Math.round(u?x/r.length*50:x/r.length*100))}}if(u&&!f.aborted){let x=0,k=0;await Promise.all(r.map(async y=>{if(!f.aborted){try{let w=y.clip.notes;if(w.length===0)return;let E=G(w),h=(await Promise.all([...E.entries()].map(([b,C])=>p.send("recognize_chord",{notes:C}).then(v=>({beatKey:b,r:v}))))).sort((b,C)=>b.beatKey-C.beatKey).flatMap(({r:b})=>{let C=b.matches[0];return C&&C.score>=.5?[C.chord.name]:[]}).filter((b,C,v)=>C===0||b!==v[C-1]);if(h.length>0){let b=await p.send("analyze",{chord_names:h}),C=Y(b.inferred_key.label);C!==null&&(y.clip.color=C,x++)}}catch{}k++,await m(`Recoloring: ${k} / ${r.length}\u2026`,50+Math.round(k/r.length*50))}})),console.log(`[composition-aide] Session transposed ${s>0?"+":""}${s} semitones, ${x} clips recolored.`)}else console.log(`[composition-aide] Session transposed ${s>0?"+":""}${s} semitones.`)})})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("Scene","Transpose Session\u2026","aide.transposeSession"),t.commands.registerCommand("aide.bassLine",d=>{(async o=>{let n=t.getObjectFromHandle(o,B),i=n.notes;if(i.length===0){console.log("[composition-aide] Clip has no notes.");return}let s=G(i),a=(await Promise.all([...s.entries()].map(([h,b])=>p.send("recognize_chord",{notes:b}).then(C=>({beatKey:h,result:C}))))).sort((h,b)=>h.beatKey-b.beatKey).flatMap(({beatKey:h,result:b})=>{let C=b.matches[0];return!C||C.score<.5?[]:[{beat:h/1e3,name:C.chord.name,root:C.chord.root,pitchClasses:C.chord.pitch_classes}]}).filter((h,b,C)=>b===0||h.name!==C[b-1]?.name);if(a.length===0){console.log("[composition-aide] Could not identify any chords in this clip.");return}let r=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Be)}`,340,300),l;try{l=JSON.parse(r)}catch{return}if(!l||l.action!=="bass")return;let m=n.looping?n.loopEnd-n.loopStart:n.duration,f=a[a.length-1]?.beat??0,x=m>f?m:f+4,k=Pt(a,x),y=Le(k,l.pattern,l.octave),w=t.application.song,E=null;if(w){e:for(let h of w.tracks)if(h instanceof F){for(let b of h.clipSlots)if(b.clip===null){E=b;break e}}}if(!E){console.log("[composition-aide] No empty MIDI slot found \u2014 add an empty slot to a MIDI track.");return}let _=await E.createMidiClip(x);_.notes=y,_.name=`Bass (${l.pattern.replace(/_/g," ")}) \u2014 ${n.name||a.map(h=>h.name).join(" \u2013 ")}`,console.log(`[composition-aide] Bass line: ${a.map(h=>h.name).join(" \u2013 ")} (${l.pattern}, octave ${l.octave}, ${y.length} notes)`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Generate Bass Line\u2026","aide.bassLine"),t.commands.registerCommand("aide.songForm",d=>{(async o=>{let n=t.getObjectFromHandle(o,W),i=t.application.song;if(!i)return;let s=i.rootNote??0,u=de[i.scaleName??"Major"]??"major",a=De.replace("</head>",`<script>window._INIT={key:${s},scale:${JSON.stringify(u)}};</script></head>`),r=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(a)}`,920,640),l;try{l=JSON.parse(r)}catch{return}if(!l||l.action!=="songform"||l.sections.length===0)return;let m=await Promise.all(l.sections.map(async h=>{let b=h.bars*4,C=Math.max(1,Math.floor(b/h.beatsPerChord)),v,I=h.customProgression.trim();if(I){let A=I.split(/[\s,|]+/).filter(Boolean);v=await Promise.all(A.map(S=>He(p,S,h.key,h.scale)))}else{let{chords:A}=await p.send("progression",{key:h.key,scale:h.scale,template:h.template,sevenths:l.sevenths});v=A}let M=[];for(let A=0;A<C;A++)M.push(v[A%v.length]);let{voicings:T}=await p.send("voice_progression",{chords:M,strategy:l.voicing,octave:4}),R=se(T,h.beatsPerChord,h.rhythm),O=null;if(h.bass!=="none"){let A=M.map((S,P)=>({start:P*h.beatsPerChord,span:h.beatsPerChord,rootPc:S.root,thirdIv:S.intervals[1]??4,fifthIv:S.intervals[2]??7,nextRootPc:M[P+1]?.root??null}));O=Le(A,h.bass,l.bassOctave)}let N=q[h.key]??"C";return{section:h,totalBeats:b,chordNotes:R,bassNotes:O,chordNames:[...new Set(M.map(A=>A.name))],color:Y(`${N} ${h.scale.replace(/_/g," ")}`)}})),f=i.scenes.findIndex(h=>h.handle.id===n.handle.id),x=f>=0?f+1:i.scenes.length,k=i.tracks.filter(h=>h instanceof F),y=k[0],w=k[1];if(!y){console.log("[composition-aide] No MIDI track found for the chord clips.");return}m.some(h=>h.bassNotes)&&!w&&console.log("[composition-aide] Only one MIDI track \u2014 bass clips skipped (add a second MIDI track).");for(let h=0;h<m.length;h++){let b=m[h],C=x+h,v=await i.createScene(C),I=X(`${q[b.section.key]??"C"} ${b.section.scale.replace(/_/g," ")}`);v.name=`${b.section.name} \u2014 ${I} \xB7 ${b.section.bars} bars`;let M=y.clipSlots[C];if(M){let T=await M.createMidiClip(b.totalBeats);T.notes=b.chordNotes,T.name=`${b.section.name} \xB7 ${b.chordNames.join(" ")}`,b.color!==null&&(T.color=b.color)}if(b.bassNotes&&w){let T=w.clipSlots[C];if(T){let R=await T.createMidiClip(b.totalBeats);R.notes=b.bassNotes,R.name=`${b.section.name} \xB7 Bass (${b.section.bass.replace(/_/g," ")})`,b.color!==null&&(R.color=b.color)}}}let _=m.reduce((h,b)=>h+b.section.bars,0);console.log(`[composition-aide] Song form: ${m.length} scenes, ${_} bars (${m.map(h=>h.section.name).join(" \u2192 ")})`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("Scene","Compose Song Form\u2026","aide.songForm"),t.commands.registerCommand("aide.theoryMachine",d=>{(async o=>{let n=t.getObjectFromHandle(o,J),i=t.application.song,s=i?.rootNote??0,u=de[i?.scaleName??"Major"]??"major",a=Re.replace("</head>",`<script>window._INIT={key:${s},scale:${JSON.stringify(u)}};</script></head>`),r=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(a)}`,1e3,700),l;try{l=JSON.parse(r)}catch{return}if(!l||l.action!=="writeClip")return;let{chords:m,beatsPerChord:f,totalBeats:x}=l,k=se(m.map(E=>E.notes),f,l.rhythm),y=m.map(E=>E.name).join(" \u2013 "),w=n.clip;if(w instanceof B)w.notes=k,w.name=y;else{let E=await n.createMidiClip(x);E.notes=k,E.name=y}console.log(`[composition-aide] Theory Machine: wrote ${m.length} chords (${f} beats each) \u2014 "${y}"`)})(d).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("ClipSlot","Modal Explorer\u2026","aide.theoryMachine")}0&&(module.exports={activate});

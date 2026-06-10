"use strict";var He=Object.create;var ee=Object.defineProperty;var ze=Object.getOwnPropertyDescriptor;var Fe=Object.getOwnPropertyNames;var qe=Object.getPrototypeOf,Ge=Object.prototype.hasOwnProperty;var We=(e,t)=>{for(var i in t)ee(e,i,{get:t[i],enumerable:!0})},he=(e,t,i,p)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of Fe(t))!Ge.call(e,l)&&l!==i&&ee(e,l,{get:()=>t[l],enumerable:!(p=ze(t,l))||p.enumerable});return e};var Ke=(e,t,i)=>(i=e!=null?He(qe(e)):{},he(t||!e||!e.__esModule?ee(i,"default",{value:e,enumerable:!0}):i,e)),Je=e=>he(ee({},"__esModule",{value:!0}),e);var Pt={};We(Pt,{activate:()=>Rt});module.exports=Je(Pt);var $=class ge{constructor(t,i,p){this.handle=t,this.dataModel=i,this.objectRegistry=p}get parent(){let t=this.dataModel.getObjectCanonicalParent(this.handle);return t?this.objectRegistry.getObjectFromHandle(t,ge):null}},V=(e,t,...i)=>new Promise((p,l)=>{e.withinTransaction(()=>t(...i,p,l))}),D=(e,t,i,p,...l)=>new Promise((h,o)=>{e.withinTransaction(()=>p(...l,s=>h(t.getObjectFromHandle(s,i)),o))}),K=class extends ${static className="Clip";get name(){return this.dataModel.clipGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetName(this.handle,e)})}get startTime(){return this.dataModel.clipGetStartTime(this.handle)}get endTime(){return this.dataModel.clipGetEndTime(this.handle)}get duration(){return this.dataModel.clipGetEndTime(this.handle)-this.dataModel.clipGetStartTime(this.handle)}get startMarker(){return this.dataModel.clipGetStartMarker(this.handle)}get endMarker(){return this.dataModel.clipGetEndMarker(this.handle)}get looping(){return this.dataModel.clipGetLooping(this.handle)}set looping(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetLooping(this.handle,e)})}get loopStart(){return this.dataModel.clipGetLoopStart(this.handle)}get loopEnd(){return this.dataModel.clipGetLoopEnd(this.handle)}get color(){return this.dataModel.clipGetColor(this.handle)}set color(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetColor(this.handle,e)})}get muted(){return this.dataModel.clipGetMuted(this.handle)}set muted(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetMuted(this.handle,e)})}},oe=class extends K{static className="AudioClip";get filePath(){return this.dataModel.audioclipGetFilePath(this.handle)}get warping(){return this.dataModel.audioclipGetWarping(this.handle)}set warping(e){this.dataModel.withinTransaction(()=>{this.dataModel.audioclipSetWarping(this.handle,e)})}get warpMode(){return this.dataModel.audioclipGetWarpMode(this.handle)}set warpMode(e){this.dataModel.withinTransaction(()=>{this.dataModel.audioclipSetWarpMode(this.handle,e)})}get warpMarkers(){return this.dataModel.audioclipGetWarpMarkers(this.handle)}},B=class extends K{static className="MidiClip";get notes(){return this.dataModel.midiclipGetNotes(this.handle)}set notes(e){this.dataModel.withinTransaction(()=>{this.dataModel.midiclipSetNotes(this.handle,e)})}},J=class extends ${static className="ClipSlot";get clip(){let e=this.dataModel.clipslotGetClip(this.handle);return e?this.objectRegistry.getObjectFromHandle(e,K):null}deleteClip(){return V(this.dataModel,this.dataModel.clipslotDeleteClip,this.handle)}createMidiClip(e){return D(this.dataModel,this.objectRegistry,B,this.dataModel.clipslotCreateMidiClip,this.handle,e)}createAudioClip(e){return D(this.dataModel,this.objectRegistry,oe,this.dataModel.clipslotCreateAudioClip,this.handle,{filePath:e.filePath,isWarped:e.isWarped,loopSettings:e.loopSettings})}},H=class extends ${static className="DeviceParameter";get name(){return this.dataModel.deviceParameterGetName(this.handle)}get min(){return this.dataModel.deviceParameterGetInternalMin(this.handle)}get max(){return this.dataModel.deviceParameterGetInternalMax(this.handle)}get isQuantized(){return this.dataModel.deviceParameterGetIsQuantized(this.handle)}get defaultValue(){return this.dataModel.deviceParameterGetDefaultValue(this.handle)}get valueItems(){return this.dataModel.deviceParameterGetValueItems(this.handle)}getValue(){return new Promise(e=>{this.dataModel.deviceParameterGetInternalValue(this.handle,e)})}setValue(e){return new Promise((t,i)=>{this.dataModel.withinTransaction(()=>{this.dataModel.deviceParameterSetInternalValue(this.handle,e,t,p=>i(new Error(p)))})})}},L=class extends ${static className="Device";get name(){return this.dataModel.deviceGetName(this.handle)}get parameters(){return this.dataModel.deviceGetParameters(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,H))}},ie=class extends ${static className="TakeLane";get clips(){return this.dataModel.takelaneGetClips(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,K))}get name(){return this.dataModel.takelaneGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.takelaneSetName(this.handle,e)})}createMidiClip(e,t){return D(this.dataModel,this.objectRegistry,B,this.dataModel.takelaneCreateMidiClip,this.handle,e,t)}createAudioClip(e){return D(this.dataModel,this.objectRegistry,oe,this.dataModel.takelaneCreateAudioClip,this.handle,{duration:e.duration,filePath:e.filePath,isWarped:e.isWarped,loopSettings:e.loopSettings,startTime:e.startTime})}},be=class extends ${static className="MixerDevice";get volume(){return this.objectRegistry.getObjectFromHandle(this.dataModel.mixerdeviceGetVolume(this.handle),H)}get panning(){return this.objectRegistry.getObjectFromHandle(this.dataModel.mixerdeviceGetPanning(this.handle),H)}get sends(){return this.dataModel.mixerdeviceGetSends(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,H))}},z=class fe extends ${static className="Track";get name(){return this.dataModel.trackGetName(this.handle)}set name(t){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetName(this.handle,t)})}get mute(){return this.dataModel.trackGetMute(this.handle)}set mute(t){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetMute(this.handle,t)})}get solo(){return this.dataModel.trackGetSolo(this.handle)}set solo(t){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetSolo(this.handle,t)})}get mutedViaSolo(){return this.dataModel.trackGetMutedViaSolo(this.handle)}get arm(){return this.dataModel.trackGetArm(this.handle)}set arm(t){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetArm(this.handle,t)})}get clipSlots(){return this.dataModel.trackGetClipSlots(this.handle).map(t=>this.objectRegistry.getObjectFromHandle(t,J))}get takeLanes(){return this.dataModel.trackGetTakeLanes(this.handle).map(t=>this.objectRegistry.getObjectFromHandle(t,ie))}get arrangementClips(){return this.dataModel.trackGetArrangementClips(this.handle).map(t=>this.objectRegistry.getObjectFromHandle(t,K))}get groupTrack(){let t=this.dataModel.trackGetGroupTrack(this.handle);return t?this.objectRegistry.getObjectFromHandle(t,fe):null}get devices(){return this.dataModel.trackGetDevices(this.handle).map(t=>this.objectRegistry.getObjectFromHandle(t,L))}get mixer(){return this.objectRegistry.getObjectFromHandle(this.dataModel.trackGetMixerDevice(this.handle),be)}createTakeLane(){return D(this.dataModel,this.objectRegistry,ie,this.dataModel.trackCreateTakeLane,this.handle)}insertDevice(t,i){return D(this.dataModel,this.objectRegistry,L,this.dataModel.trackInsertDevice,this.handle,t,BigInt(i))}deleteDevice(t){return V(this.dataModel,this.dataModel.trackDeleteDevice,this.handle,t.handle)}duplicateDevice(t){return D(this.dataModel,this.objectRegistry,L,this.dataModel.trackDuplicateDevice,this.handle,t.handle)}deleteClip(t){return V(this.dataModel,this.dataModel.trackDeleteClip,this.handle,t.handle)}clearClipsInRange(t,i){return V(this.dataModel,this.dataModel.trackClearClipsInRange,this.handle,t,i)}},ve=class extends z{static className="AudioTrack";createAudioClip(e){return D(this.dataModel,this.objectRegistry,oe,this.dataModel.trackCreateAudioClip,this.handle,{duration:e.duration,filePath:e.filePath,isWarped:e.isWarped,loopSettings:e.loopSettings,startTime:e.startTime})}},re=class extends ${static className="CuePoint";get time(){return this.dataModel.cuePointGetTime(this.handle)}get name(){return this.dataModel.cuePointGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.cuePointSetName(this.handle,e)})}},F=class extends z{static className="MidiTrack";createMidiClip(e,t){return D(this.dataModel,this.objectRegistry,B,this.dataModel.trackCreateMidiClip,this.handle,e,t)}},W=class extends ${static className="Scene";get name(){return this.dataModel.sceneGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.sceneSetName(this.handle,e)})}get tempo(){return this.dataModel.sceneGetTempo(this.handle)}get signatureNumerator(){return this.dataModel.sceneGetSignatureNumerator(this.handle)}get signatureDenominator(){return this.dataModel.sceneGetSignatureDenominator(this.handle)}},ye=class extends ${static className="Song";get tracks(){return this.dataModel.songGetTracks(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,z))}get returnTracks(){return this.dataModel.songGetReturnTracks(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,z))}get mainTrack(){return this.objectRegistry.getObjectFromHandle(this.dataModel.songGetMainTrack(this.handle),z)}get scenes(){return this.dataModel.songGetScenes(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,W))}get cuePoints(){return this.dataModel.songGetCuePoints(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,re))}get tempo(){return this.dataModel.songGetTempo(this.handle)}set tempo(e){this.dataModel.withinTransaction(()=>{this.dataModel.songSetTempo(this.handle,e)})}get gridQuantization(){return this.dataModel.songGetGridQuantization(this.handle)}get gridIsTriplet(){return this.dataModel.songGetGridIsTriplet(this.handle)}get rootNote(){return Number(this.dataModel.songGetRootNote(this.handle))}get scaleName(){return this.dataModel.songGetScaleName(this.handle)}get scaleMode(){return this.dataModel.songGetScaleMode(this.handle)}get scaleIntervals(){return this.dataModel.songGetScaleIntervals(this.handle).map(Number)}createAudioTrack(){return D(this.dataModel,this.objectRegistry,ve,this.dataModel.songCreateAudioTrack,this.handle)}createMidiTrack(){return D(this.dataModel,this.objectRegistry,F,this.dataModel.songCreateMidiTrack,this.handle)}createScene(e){return D(this.dataModel,this.objectRegistry,W,this.dataModel.songCreateScene,this.handle,BigInt(e))}deleteTrack(e){return V(this.dataModel,this.dataModel.songDeleteTrack,this.handle,e.handle)}deleteScene(e){return V(this.dataModel,this.dataModel.songDeleteScene,this.handle,e.handle)}duplicateTrack(e){return D(this.dataModel,this.objectRegistry,z,this.dataModel.songDuplicateTrack,this.handle,e.handle)}duplicateScene(e){return D(this.dataModel,this.objectRegistry,W,this.dataModel.songDuplicateScene,this.handle,e.handle)}createCuePoint(e){return D(this.dataModel,this.objectRegistry,re,this.dataModel.songCreateCuePoint,this.handle,e)}deleteCuePoint(e){return V(this.dataModel,this.dataModel.songDeleteCuePoint,this.handle,e.handle)}},xe=class extends ${static className="Application";get song(){return this.objectRegistry.getObjectFromHandle(this.dataModel.rootGetSong(this.handle),ye)}},Ue=class{module;constructor(e){this.module=e}registerCommand(e,t){this.module.registerCommand(e,t)}executeCommand(e,...t){this.module.executeCommand(e,...t)}},we=class extends ${static className="ChainMixerDevice";get volume(){return this.objectRegistry.getObjectFromHandle(this.dataModel.chainmixerdeviceGetVolume(this.handle),H)}get panning(){return this.objectRegistry.getObjectFromHandle(this.dataModel.chainmixerdeviceGetPanning(this.handle),H)}get sends(){return this.dataModel.chainmixerdeviceGetSends(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,H))}},te=class extends ${static className="Chain";get devices(){return this.dataModel.chainGetDevices(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,L))}get mixer(){return this.objectRegistry.getObjectFromHandle(this.dataModel.chainGetMixerDevice(this.handle),we)}insertDevice(e,t){return D(this.dataModel,this.objectRegistry,L,this.dataModel.chainInsertDevice,this.handle,e,BigInt(t))}deleteDevice(e){return V(this.dataModel,this.dataModel.chainDeleteDevice,this.handle,e.handle)}duplicateDevice(e){return D(this.dataModel,this.objectRegistry,L,this.dataModel.chainDuplicateDevice,this.handle,e.handle)}},ke=class extends te{static className="DrumChain";get receivingNote(){return Number(this.dataModel.drumchainGetReceivingNote(this.handle))}set receivingNote(e){this.dataModel.withinTransaction(()=>{this.dataModel.drumchainSetReceivingNote(this.handle,BigInt(e))})}},Ce=class extends L{static className="RackDevice";get chains(){return this.dataModel.rackdeviceGetChains(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,te))}insertChain(e){return D(this.dataModel,this.objectRegistry,te,this.dataModel.rackdeviceInsertChain,this.handle,BigInt(e))}},Ye=class extends Ce{static className="DrumRackDevice";get chains(){return this.dataModel.rackdeviceGetChains(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,ke))}},le=class extends ${static className="Sample";get filePath(){return this.dataModel.sampleGetFilePath(this.handle)}},Xe=class extends L{static className="Simpler";get sample(){let e=this.dataModel.simplerGetSample(this.handle);return e?this.objectRegistry.getObjectFromHandle(e,le):null}replaceSample(e){return D(this.dataModel,this.objectRegistry,le,this.dataModel.simplerReplaceSample,this.handle,e)}},Ze=[xe,ye,ve,F,z,oe,B,K,J,ie,Xe,Ye,Ce,L,le,ke,te,W,re,H,be,we],Qe=class{cache=new Map;dataModel;constructor(e){this.dataModel=e}getOrCreateObjectFromHandle(e){let t=this.cache.get(e.id);if(t)return t;let i=Ze.find(l=>this.dataModel.getObjectIsOfClass(e,l.className));if(!i)throw new Error("Unknown object type");let p=new i(e,this.dataModel,this);return this.cache.set(e.id,p),p}getObjectFromHandle(e,t){let i=this.getOrCreateObjectFromHandle(e);if(!(i instanceof t))throw new Error("Object of incorrect type");return i}},et=class{module;constructor(e){this.module=e}get storageDirectory(){return this.module.storageDirectory}get tempDirectory(){return this.module.tempDirectory}get language(){return this.module.language}},tt=class{module;constructor(e){this.module=e}renderPreFxAudio(e,t,i){return new Promise((p,l)=>{this.module.renderPreFxAudio(e.handle,{endTime:i,startTime:t},p,l)})}importIntoProject(e){return new Promise((t,i)=>{this.module.importIntoProject(e,t,i)})}},ue=(e,t)=>typeof t=="number"?{progress:t,text:e}:{text:e},ot=class{module;constructor(e){this.module=e}registerContextMenuAction(e,t,i){return new Promise(p=>{this.module.registerContextMenuAction(e,t,i,l=>{p(()=>new Promise(h=>{l(h)}))})})}showModalDialog(e,t,i){return new Promise((p,l)=>{this.module.showModalDialog(e,t,i,p,l)})}withinProgressDialog(e,t,i){let p=new AbortController;return new Promise((l,h)=>{this.module.showProgressDialog(ue(e,t.progress),({update:o,close:s})=>{let a=(b,r)=>new Promise(c=>{o(ue(b,r),c)}),n=()=>new Promise(b=>{s(b)});i(a,p.signal).finally(n).then(l).catch(h)},()=>{p.abort()})})}},Ie=(e,t)=>{let{commands:i,dataModel:p,environment:l,resources:h,ui:o}=e.initializeExtensionHost({apiVersion:t}),s=new Qe(p);return{application:s.getObjectFromHandle(p.getRoot(),xe),commands:new Ue(i),environment:new et(l),getObjectFromHandle:s.getObjectFromHandle.bind(s),resources:new tt(h),ui:new ot(o),withinTransaction:p.withinTransaction.bind(p)}};var Me=require("node:child_process"),ne=class{constructor(t,i="python"){this.cwd=t;this.pythonCmd=i}cwd;pythonCmd;proc=null;buffer="";pending=new Map;nextId=1;getProcess(){if(this.proc)return this.proc;let t=(0,Me.spawn)(this.pythonCmd,["-u","-m","chordgen.server"],{cwd:this.cwd,stdio:["pipe","pipe","pipe"],env:{...process.env,PYTHONDONTWRITEBYTECODE:"1",PYTHONUTF8:"1"}});return t.stdout.on("data",i=>{this.buffer+=i.toString("utf8");let p;for(;(p=this.buffer.indexOf(`
`))!==-1;){let l=this.buffer.slice(0,p).trim();if(this.buffer=this.buffer.slice(p+1),!l)continue;let h;try{h=JSON.parse(l)}catch{continue}let o=h.id;if(o===void 0)continue;let s=this.pending.get(o);s&&(this.pending.delete(o),"error"in h?s.reject(new Error(String(h.error))):s.resolve(h.result))}}),t.stderr.on("data",i=>{console.error(`[chordgen] ${i.toString("utf8").trimEnd()}`)}),t.on("error",i=>{console.error(`[chordgen] failed to start: ${i.message}`),this.drainPending(i),this.proc=null}),t.on("exit",i=>{i!==0&&i!==null&&console.error(`[chordgen] process exited with code ${i}`),this.drainPending(new Error(`chordgen process exited (code ${i})`)),this.proc=null}),this.proc=t,t}drainPending(t){for(let[,i]of this.pending)i.reject(t);this.pending.clear()}send(t,i={}){let p=this.getProcess(),l=this.nextId++;return new Promise((h,o)=>{this.pending.set(l,{resolve:s=>h(s),reject:o}),p.stdin.write(JSON.stringify({op:t,id:l,...i})+`
`)})}dispose(){this.proc?.kill(),this.proc=null}};var Le=Ke(require("node:path"),1);var ce=`<!DOCTYPE html>
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
`;var Se=`<!DOCTYPE html>
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
        prog.appendChild(box);
      });

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
            \`<button class="apply-btn" onclick="applySub(\${s.position}, '\${esc(s.original)}', '\${esc(s.replacement)}')">Apply</button>\`;
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
    }
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
      grid-template-columns: 7em 1fr auto;
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
    }

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
      <div class="section-label">Progression</div>
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
`;var Ee=`<!DOCTYPE html>
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
`;var Te=`<!DOCTYPE html>
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
`;var _e=`<!DOCTYPE html>
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
    btn.addEventListener('click', () => select(i));
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
    showMidiNote('No MIDI output selected');
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
    <option value="pump_8ths">Pumping 8ths</option>
    <option value="root_octave_8ths">Octave 8ths</option>
    <option value="walking">Walking</option>
    <option value="tresillo">Tresillo (3-3-2)</option>
    <option value="offbeats">Offbeat Skank</option>
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
`;var Be=`<!DOCTYPE html>
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
    ["none","No bass"],["roots","Roots"],["root_fifth","Root\u2013Fifth"],["pump_8ths","Pumping 8ths"],
    ["root_octave_8ths","Octave 8ths"],["walking","Walking"],["tresillo","Tresillo"],["offbeats","Offbeats"],
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
        S("A", 8, 2, "ii-V-I", "swung_8ths", "walking"),
        S("A", 8, 2, "ii-V-I", "swung_8ths", "walking"),
        S("B", 8, 2, "Circle of fifths", "swung_8ths", "walking"),
        S("A", 8, 2, "ii-V-I", "swung_8ths", "walking"),
      ];
    },
    blues: () => {
      document.getElementById("g-sevenths").checked = true;
      return [
        S("Chorus 1", 12, 4, "12-bar blues", "boom_chuck", "walking"),
        S("Chorus 2", 12, 4, "12-bar blues", "boom_chuck", "walking"),
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
        S("Vamp", 4, 2, "ii-V-I", "tresillo", "roots"),
        S("Vamp", 4, 2, "I-vi-IV-V", "tresillo", "roots"),
        S("Vamp", 4, 2, "ii-V-I", "tresillo", "roots"),
        S("Vamp", 4, 2, "vi-IV-I-V", "tresillo", "roots"),
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
`;var q=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],de={Major:"major",Minor:"natural_minor",Dorian:"dorian",Phrygian:"phrygian",Lydian:"lydian",Mixolydian:"mixolydian",Locrian:"locrian","Harmonic Minor":"harmonic_minor","Melodic Minor":"melodic_minor"},ht={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},ut=[0,7,2,9,4,11,6,1,8,3,10,5],Z=[0,2,4,5,7,9,11],gt=[0,2,3,5,7,8,10],bt=[0,2,3,5,7,9,10],ft=[0,1,3,5,7,8,10],vt=[0,2,4,6,7,9,11],yt=[0,2,4,5,7,9,10],xt=[0,1,3,5,6,8,10],wt=[0,2,3,5,7,8,11],kt=[0,2,3,5,7,9,11],Ct=[0,2,4,7,9],It=[0,3,5,7,10],Mt=[0,3,5,6,7,10],Q={major:Z,natural_minor:gt,dorian:bt,phrygian:ft,lydian:vt,mixolydian:yt,locrian:xt,harmonic_minor:wt,melodic_minor:kt,pentatonic_major:Ct,pentatonic_minor:It,blues:Mt},St={major:"major",natural_minor:"minor",dorian:"Dorian",phrygian:"Phrygian",lydian:"Lydian",mixolydian:"Mixolydian",locrian:"Locrian",harmonic_minor:"harmonic minor",melodic_minor:"melodic minor",pentatonic_major:"pentatonic major",pentatonic_minor:"pentatonic minor",blues:"blues"},De=[{id:"major",label:"Major"},{id:"natural_minor",label:"Natural Minor"},{id:"dorian",label:"Dorian"},{id:"phrygian",label:"Phrygian"},{id:"lydian",label:"Lydian"},{id:"mixolydian",label:"Mixolydian"},{id:"locrian",label:"Locrian"},{id:"harmonic_minor",label:"Harmonic Minor"},{id:"melodic_minor",label:"Melodic Minor"},{id:"pentatonic_major",label:"Pentatonic Major"},{id:"pentatonic_minor",label:"Pentatonic Minor"},{id:"blues",label:"Blues"}];function G(e,t=.25){let i=new Map;for(let p of e){let l=Math.round(p.startTime/t)*t,h=Math.round(l*1e3),o=i.get(h);o?o.push(p.pitch):i.set(h,[p.pitch])}return i}function ae(e){return JSON.stringify(e).replace(/</g,"\\u003C").replace(/>/g,"\\u003E")}function Et(e,t,i){let p=t/100,l=i/100,h=p*Math.min(l,1-l),o=s=>{let a=(s+e/30)%12;return l-h*Math.max(Math.min(a-3,9-a,1),-1)};return Math.round(o(0)*255)<<16|Math.round(o(8)*255)<<8|Math.round(o(4)*255)}function Y(e){let t=e.match(/^([A-G][#b]?)\s+(.*)/);if(!t)return null;let i=ht[t[1]??""];if(i===void 0)return null;let p=/minor|min\b/i.test(t[2]??""),l=(ut[i]??0)*30;return Et(l,p?55:70,p?35:45)}async function U(e,t){let i=G(e),l=(await Promise.all([...i.entries()].map(([a,n])=>t.send("recognize_chord",{notes:n}).then(b=>({beatKey:a,r:b}))))).sort((a,n)=>a.beatKey-n.beatKey).flatMap(({r:a})=>{let n=a.matches[0];return n&&n.score>=.5?[n.chord.name]:[]}).filter((a,n,b)=>n===0||a!==b[n-1]);if(l.length>0){let n=(await t.send("analyze",{chord_names:l})).inferred_key;return{root:n.root,scale:n.scale,label:n.label}}let h=new Array(12).fill(0);for(let a of e){let n=a.pitch%12;h[n]=(h[n]??0)+1}let o=-1,s=null;for(let a=0;a<12;a++)for(let[n,b]of Object.entries(Q)){let r=0;for(let c of b)r+=h[(a+c)%12]??0;if(r>o){o=r;let c=q[a]??"C",m=St[n]??n;s={root:a,scale:n,label:`${c} ${m}`}}}return s}function me(e,t){let i=e%12;if(t.has(i))return e;for(let p=1;p<=6;p++){let l=t.has((i+p)%12),h=t.has((i-p+12)%12);if(l&&h||l)return e+p;if(h)return e-p}return e}function X(e){let t=e.match(/^([A-G][#b]?)\s+(.+)$/);if(!t)return e;let i=t[1]??e,p=(t[2]??"").toLowerCase().trim();if(p==="major")return i;if(p==="minor"||p==="natural minor"||p==="natural_minor")return`${i}m`;if(p==="harmonic minor"||p==="harmonic_minor")return`${i}hm`;if(p==="melodic minor"||p==="melodic_minor")return`${i}mm`;let l=p.split(/[\s_]/)[0]??p;return`${i} ${l.slice(0,3)}`}function Tt(e,t,i,p){return e===i&&t===p?"Same key":e===i?t?"Parallel major":"Parallel minor":!t&&p&&i===(e+9)%12?"Relative minor":t&&!p&&i===(e+3)%12?"Relative major":i===(e+7)%12?"Dominant (V)":i===(e+5)%12?"Subdominant (IV)":null}var _t=/^[b#♭♯]?[ivIV]/;async function Ve(e,t,i,p){let l=async()=>(await e.send("parse_roman",{roman:t,key:i,scale:p})).chord,h=async()=>(await e.send("parse_chord",{name:t})).chord,[o,s]=_t.test(t)?[l,h]:[h,l];try{return await o()}catch{try{return await s()}catch{throw new Error(`Couldn't parse "${t}" as a Roman numeral or chord name`)}}}async function Oe(e,t){let i=t.customProgression?.trim();if(!i){let{chords:l}=await e.send("progression",{key:t.key,scale:t.scale,template:t.template,sevenths:t.sevenths});return l}let p=i.split(/[\s,|]+/).filter(Boolean);return Promise.all(p.map(l=>Ve(e,l,t.key,t.scale)))}function $e(e){return e.customProgression?.trim()||e.template}var Nt={halves:{span:4,hits:[{t:0,d:2,v:1},{t:2,d:2,v:.9}]},quarters:{span:4,hits:[{t:0,d:1,v:1},{t:1,d:1,v:.85},{t:2,d:1,v:.95},{t:3,d:1,v:.85}]},pump_8ths:{span:4,hits:[0,.5,1,1.5,2,2.5,3,3.5].map(e=>({t:e,d:.45,v:e%1===0?1:.8}))},swung_8ths:{span:4,hits:[0,1,2,3].flatMap(e=>[{t:e,d:.6,v:1},{t:e+.66,d:.3,v:.75}])},charleston:{span:4,hits:[{t:0,d:1.4,v:1},{t:1.5,d:2.4,v:.85}]},tresillo:{span:4,hits:[{t:0,d:1.4,v:1},{t:1.5,d:1.4,v:.85},{t:3,d:.9,v:.95}]},boom_chuck:{span:4,hits:[{t:0,d:.95,v:1},{t:1,d:.45,v:.75},{t:1.5,d:.45,v:.75},{t:2,d:.95,v:.95},{t:3,d:.45,v:.75},{t:3.5,d:.45,v:.75}]},syncopated:{span:4,hits:[{t:0,d:.7,v:1},{t:.75,d:.2,v:.7},{t:1,d:.45,v:.85},{t:1.5,d:1.4,v:.95},{t:3,d:.45,v:.85},{t:3.5,d:.45,v:.8}]},offbeats:{span:4,hits:[.5,1.5,2.5,3.5].map(e=>({t:e,d:.35,v:.95}))},arp_up_8ths:{span:4,arp:!0,hits:[0,.5,1,1.5,2,2.5,3,3.5].map(e=>({t:e,d:.5,v:e%1===0?.95:.8}))}},pe=90;function se(e,t,i){let p=i?Nt[i]:void 0;if(!p)return e.flatMap((h,o)=>h.map(s=>({pitch:Math.max(0,Math.min(127,s)),startTime:o*t,duration:t*.95,velocity:pe})));let l=t/p.span;return e.flatMap((h,o)=>{if(h.length===0)return[];let s=[...h].sort((a,n)=>a-n);return p.hits.flatMap((a,n)=>{let b=Math.max(1,Math.min(127,Math.round(pe*a.v)));return(p.arp?[s[n%s.length]??60]:s).map(c=>({pitch:Math.max(0,Math.min(127,c)),startTime:o*t+a.t*l,duration:a.d*l,velocity:b}))})})}function At(e,t){return e.map((i,p)=>{let l=e[p+1],h=l?l.beat:Math.max(t,i.beat+1),o=i.pitchClasses,s=(a,n)=>{let b=o[a];return b===void 0?n:(b-i.root+12)%12||n};return{start:i.beat,span:Math.max(.5,h-i.beat),rootPc:i.root,thirdIv:s(1,4),fifthIv:s(2,7),nextRootPc:l?l.root:null}})}function je(e,t,i){let p=12*(i+1),l=o=>Math.max(20,Math.min(64,o)),h=(o,s,a,n)=>({pitch:l(a),startTime:o,duration:s,velocity:Math.max(1,Math.min(127,Math.round(pe*n)))});return e.flatMap(o=>{let s=p+o.rootPc,a=s+o.thirdIv,n=s+o.fifthIv,b=[];switch(t){case"root_fifth":{if(o.span<2){b.push(h(o.start,o.span*.95,s,1));break}let r=o.span/2;b.push(h(o.start,r*.95,s,1)),b.push(h(o.start+r,r*.95,n,.85));break}case"pump_8ths":case"root_octave_8ths":{let r=Math.max(1,Math.round(o.span/.5)),c=o.span/r;for(let m=0;m<r;m++){let g=t==="root_octave_8ths"&&m%2===1?s+12:s;b.push(h(o.start+m*c,c*.9,g,m%2===0?1:.8))}break}case"walking":{let r=Math.max(1,Math.round(o.span)),c=o.span/r,m=[s,a,n,a];for(let g=0;g<r;g++){let v=m[g%m.length]??s;if(g===r-1&&r>1&&o.nextRootPc!==null){let y=p+o.nextRootPc;v=Math.abs(y-1-n)<=Math.abs(y+1-n)?y-1:y+1}b.push(h(o.start+g*c,c*.9,v,g===0?1:.88))}break}case"tresillo":{let r=o.span/4;b.push(h(o.start+0*r,1.4*r,s,1)),b.push(h(o.start+1.5*r,1.4*r,s,.85)),b.push(h(o.start+3*r,.9*r,n,.95));break}case"offbeats":{let r=o.span/4;for(let c of[.5,1.5,2.5,3.5])b.push(h(o.start+c*r,.35*r,s,.95));break}default:b.push(h(o.start,o.span*.95,s,1))}return b})}function Rt(e){let t=Ie(e,"1.0.0"),i=process.env.COMPOSITION_AIDE_PATH??Le.join(__dirname,"..","engine"),p=process.env.PYTHON_CMD??(process.platform==="win32"?"python":"python3"),l=new ne(i,p);l.send("list_ops").catch(()=>{}),t.commands.registerCommand("aide.generate",h=>{(async o=>{let s=o.selected_lanes.map(y=>t.getObjectFromHandle(y,$)).filter(y=>y instanceof F);if(!s.length){console.log("[composition-aide] No MIDI tracks in selection.");return}let a=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(ce)}`,380,416),n;try{n=JSON.parse(a)}catch{return}if(!n)return;let b=o.time_selection_end-o.time_selection_start,r=await Oe(l,n),{voicings:c}=await l.send("voice_progression",{chords:r,strategy:n.voicing,octave:4}),m=b/r.length,g=`${$e(n)} \u2014 ${n.keyName} ${n.scale.replace(/_/g," ")}`,v=se(c,m,n.rhythm);if(n.snapToScale){let y=Q[n.scale]??Z,k=new Set(y.map(x=>(n.key+x)%12));v=v.map(x=>({...x,pitch:me(x.pitch,k)}))}await Promise.all(s.map(async y=>{let k=await y.createMidiClip(o.time_selection_start,b);k.name=g,k.notes=v})),console.log(`[composition-aide] "${g}": ${r.map(y=>y.name).join(" \u2013 ")} (${m.toFixed(2)} beats/chord)`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiTrack.ArrangementSelection","Generate Progression\u2026","aide.generate"),t.commands.registerCommand("aide.analyze",h=>{let o=async s=>{let a=t.getObjectFromHandle(s,B),n=a.notes;if(n.length===0){console.log("[composition-aide] Clip has no notes.");return}let b=G(n),c=(await Promise.all([...b.entries()].map(([S,R])=>l.send("recognize_chord",{notes:R}).then(j=>({beatKey:S,result:j}))))).sort((S,R)=>S.beatKey-R.beatKey).flatMap(({beatKey:S,result:R})=>{let j=R.matches[0];return!j||j.score<.5?[]:[{beat:S/1e3,name:j.chord.name,score:j.score,pitchClasses:j.chord.pitch_classes,root:j.chord.root,quality:j.chord.quality}]}).filter((S,R,j)=>R===0||S.name!==j[R-1]?.name);if(c.length===0){console.log("[composition-aide] Could not identify any chords in this clip.");return}let m=c.map(S=>S.name),g=await l.send("analyze",{chord_names:m}),v={clipName:a.name||"(unnamed clip)",noteCount:n.length,inferredKey:g.inferred_key.label,scaleRoot:g.inferred_key.root,scaleIntervals:[...Q[g.inferred_key.scale]??Z],chords:m.map((S,R)=>({beat:c[R]?.beat??0,name:S,roman:g.roman_labels[R]??S,tension:g.tension[R]??0,score:c[R]?.score??0,pitchClasses:c[R]?.pitchClasses??[],root:c[R]?.root??0,quality:c[R]?.quality??"major"})),substitutions:g.substitutions.slice(0,5).map(S=>({position:S.position,original:S.original.name,replacement:S.replacement.name,rationale:S.rationale})),summary:g.summary},y=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Se.replace("__ANALYSIS_JSON__",ae(v)))}`,520,560);console.log(`[composition-aide] Analyzed "${v.clipName}": ${v.inferredKey} \u2014 ${m.join(" \u2013 ")}`);let k;try{k=JSON.parse(y)}catch{return}if(!k||k.action!=="substitute")return;let{position:x,original:w,replacement:E}=k,_=c[x];if(!_){console.error(`[composition-aide] Substitution position ${x} out of range.`);return}let d=c[x+1],u=_.beat,C=a.notes,f=Math.max(u+4,...C.map(S=>S.startTime+S.duration)),I=d?.beat??f,M=C.filter(S=>S.startTime>=u-.01&&S.startTime<I-.01),T=M.length>0?Math.round(M.reduce((S,R)=>S+R.pitch,0)/M.length):60,P=Math.max(3,Math.min(6,Math.floor(T/12)-1)),O=await l.send("voicings",{name:E,octave:P}),A=M.length>0?M.reduce((S,R)=>S+R.duration,0)/M.length:(I-u)*.95,N=O.close.map(S=>({pitch:Math.max(0,Math.min(127,S)),startTime:u,duration:A,velocity:90}));a.notes=[...C.filter(S=>S.startTime<u-.01||S.startTime>=I-.01),...N],console.log(`[composition-aide] Substituted: ${w} \u2192 ${E} at beat ${u.toFixed(2)} (octave ${P})`),await o(s)};o(h).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("MidiClip","Analyze Harmony\u2026","aide.analyze"),t.commands.registerCommand("aide.chordPalette",h=>{(async o=>{let s=t.getObjectFromHandle(o,J),a=t.application.song,n=a?.rootNote??0,b=a?.scaleName??"Major",r=de[b]??"major",c=await Promise.all(De.flatMap(({id:I})=>[l.send("diatonic",{key:n,scale:I,sevenths:!1}).then(M=>({id:I,sevenths:!1,chords:M.chords})),l.send("diatonic",{key:n,scale:I,sevenths:!0}).then(M=>({id:I,sevenths:!0,chords:M.chords}))])),m={};for(let{id:I,sevenths:M,chords:T}of c)m[I]||(m[I]={triads:[],sevenths:[],intervals:Q[I]??Z}),M?m[I].sevenths=T:m[I].triads=T;let g={keyRoot:n,keyName:q[n]??"C",defaultScale:r,scaleOptions:De,scales:m},v=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Ee.replace("__PALETTE_JSON__",ae(g)))}`,510,296),y;try{y=JSON.parse(v)}catch{return}if(!y||y.action!=="insert")return;let{chordName:k,length:x,voicing:w,octave:E,selectedScale:_}=y,C=(await l.send("voicings",{name:k,octave:E}))[w].map(I=>({pitch:Math.max(0,Math.min(127,I)),startTime:0,duration:x*.95,velocity:90})),f=s.clip;if(f instanceof B)f.name=k,f.notes=C;else{let I=await s.createMidiClip(x);I.name=k,I.notes=C}console.log(`[composition-aide] Inserted ${k} (${w}, oct ${E}, ${x} beats) \u2014 ${g.keyName} ${_}`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("ClipSlot","Insert Chord\u2026","aide.chordPalette"),t.commands.registerCommand("aide.sessionMap",h=>{(async o=>{let s=t.application.song;if(!s)return;let a=s.tracks,b=s.scenes.map(d=>d.name),r=[];for(let d=0;d<a.length;d++){let u=a[d];if(!u)continue;let C=u.clipSlots;for(let f=0;f<C.length;f++){let I=C[f];if(!I)continue;let M=I.clip;if(!(M instanceof B))continue;let T=M.notes;T.length!==0&&r.push({trackIndex:d,trackName:u.name,sceneIndex:f,notes:T,clipName:M.name||"(unnamed)"})}}let c=r.length;if(c===0){console.log("[composition-aide] No MIDI clips with notes found in session.");return}let g=r.reduce((d,u)=>Math.max(d,u.sceneIndex),0)+1,v=[];await t.ui.withinProgressDialog(`Analyzing session \u2014 ${c} clips\u2026`,{progress:0},async(d,u)=>{let C=0;await Promise.all(r.map(async f=>{if(u.aborted)return;let I=null,M=0;try{let T=G(f.notes),O=(await Promise.all([...T.entries()].map(([A,N])=>l.send("recognize_chord",{notes:N}).then(S=>({beatKey:A,r:S}))))).sort((A,N)=>A.beatKey-N.beatKey).flatMap(({beatKey:A,r:N})=>{let S=N.matches[0];return!S||S.score<.5?[]:[{beat:A/1e3,name:S.chord.name}]}).filter((A,N,S)=>N===0||A.name!==S[N-1]?.name);if(O.length>0){let A=await l.send("analyze",{chord_names:O.map(N=>N.name)});I=A.inferred_key.label,M=A.inferred_key.score}}catch(T){console.error(`[composition-aide] Could not analyze ${f.clipName}:`,T)}v.push({...f,key:I,score:M}),C++,await d(`${C} / ${c} clips\u2026`,Math.round(C/c*100))}))});let y=new Map;for(let d of v)d.key&&y.set(d.key,(y.get(d.key)??0)+1);let k=null,x=0;for(let[d,u]of y)u>x&&(x=u,k=d);let E=[...new Set(v.map(d=>d.trackIndex))].sort((d,u)=>d-u).map(d=>{let u=v.find(f=>f.trackIndex===d)?.trackName??`Track ${d+1}`,C=Array(g).fill(null);for(let f of v.filter(I=>I.trackIndex===d))C[f.sceneIndex]={clipName:f.clipName,key:f.key,score:f.score};return{name:u,clips:C}}),_={dominantKey:k,sceneCount:g,sceneNames:b.slice(0,g),totalMidiClips:c,analyzedClips:v.filter(d=>d.key!==null).length,tracks:E};await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Te.replace("__SESSION_JSON__",ae(_)))}`,680,480),console.log(`[composition-aide] Session map: ${_.analyzedClips}/${c} clips`+(k?` \u2014 dominant key: ${k}`:""))})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("Scene","Map Session Keys\u2026","aide.sessionMap"),t.commands.registerCommand("aide.colorByKey",h=>{(async o=>{let s=t.application.song;if(!s)return;let a=[];for(let b of s.tracks)for(let r of b.clipSlots){let c=r.clip;if(!(c instanceof B))continue;let m=c.notes;m.length!==0&&a.push({clip:c,notes:m,clipName:c.name||"(unnamed)"})}if(a.length===0){console.log("[composition-aide] No MIDI clips with notes found.");return}let n=0;await t.ui.withinProgressDialog(`Coloring ${a.length} clips by key\u2026`,{progress:0},async(b,r)=>{let c=0;await Promise.all(a.map(async m=>{if(!r.aborted){try{let g=G(m.notes),y=(await Promise.all([...g.entries()].map(([k,x])=>l.send("recognize_chord",{notes:x}).then(w=>({beatKey:k,r:w}))))).sort((k,x)=>k.beatKey-x.beatKey).flatMap(({r:k})=>{let x=k.matches[0];return x&&x.score>=.5?[x.chord.name]:[]}).filter((k,x,w)=>x===0||k!==w[x-1]);if(y.length>0){let k=await l.send("analyze",{chord_names:y}),x=Y(k.inferred_key.label);x!==null&&(m.clip.color=x,n++)}}catch(g){console.error(`[composition-aide] Could not color "${m.clipName}":`,g)}c++,await b(`${c} / ${a.length} clips\u2026`,Math.round(c/a.length*100))}}))}),console.log(`[composition-aide] Colored ${n} / ${a.length} clips by key.`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("Scene","Color Clips by Key","aide.colorByKey"),t.commands.registerCommand("aide.generateInClip",h=>{(async o=>{let s=t.getObjectFromHandle(o,B),a=s.looping?s.loopEnd-s.loopStart:s.duration,n=a>0?a:8,b=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(ce)}`,380,416),r;try{r=JSON.parse(b)}catch{return}if(!r)return;let c=await Oe(l,r),{voicings:m}=await l.send("voice_progression",{chords:c,strategy:r.voicing,octave:4}),g=n/c.length,v=se(m,g,r.rhythm);if(r.snapToScale){let y=Q[r.scale]??Z,k=new Set(y.map(x=>(r.key+x)%12));v=v.map(x=>({...x,pitch:me(x.pitch,k)}))}s.notes=v,s.name=`${$e(r)} \u2014 ${r.keyName} ${r.scale.replace(/_/g," ")}`,console.log(`[composition-aide] Generated "${s.name}": ${c.map(y=>y.name).join(" \u2013 ")} (${g.toFixed(2)} beats/chord)`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Fill Clip with Progression\u2026","aide.generateInClip"),t.commands.registerCommand("aide.voiceLead",h=>{(async o=>{let s=t.getObjectFromHandle(o,B),a=s.notes;if(a.length===0){console.log("[composition-aide] Clip has no notes.");return}let n=G(a),r=(await Promise.all([...n.entries()].map(([w,E])=>l.send("recognize_chord",{notes:E}).then(_=>({beatKey:w,r:_}))))).sort((w,E)=>w.beatKey-E.beatKey).flatMap(({beatKey:w,r:E})=>{let _=E.matches[0];return!_||_.score<.5?[]:[{beat:w/1e3,name:_.chord.name}]}).filter((w,E,_)=>E===0||w.name!==_[E-1]?.name);if(r.length===0){console.log("[composition-aide] No chords identified in clip.");return}let c=Math.round(a.reduce((w,E)=>w+E.pitch,0)/a.length),m=Math.max(3,Math.min(6,Math.floor(c/12)-1)),{voicings:g}=await l.send("voice_progression",{chords:r.map(w=>w.name),strategy:"smooth",octave:m}),v=new Map;for(let w of a){let E=Math.round(w.startTime/.25)*.25,_=Math.round(E*1e3),d=v.get(_)??[];d.push(w),v.set(_,d)}let y=new Set(r.map(w=>Math.round(w.beat*1e3))),k=[];for(let w=0;w<r.length;w++){let E=r[w],_=g[w]??[];if(!E||_.length===0)continue;let d=Math.round(E.beat*1e3),u=v.get(d)??[],C=u.length>0?u.reduce((I,M)=>I+M.duration,0)/u.length:2,f=u.length>0?Math.round(u.reduce((I,M)=>I+(M.velocity??90),0)/u.length):90;for(let I of _)k.push({pitch:Math.max(0,Math.min(127,I)),startTime:E.beat,duration:C,velocity:f})}let x=a.filter(w=>{let E=Math.round(Math.round(w.startTime/.25)*.25*1e3);return!y.has(E)});s.notes=[...x,...k],console.log(`[composition-aide] Voice-led "${s.name||"(unnamed)"}": ${r.length} chords, octave ${m}`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Optimize Voice Leading","aide.voiceLead"),t.commands.registerCommand("aide.snapToKey",h=>{(async o=>{let s=t.getObjectFromHandle(o,B),a=s.notes;if(a.length===0){console.log("[composition-aide] Clip has no notes.");return}let n=await U(a,l);if(!n){console.log("[composition-aide] Could not determine key for this clip.");return}let b=await l.send("scale_info",{key:n.root,scale:n.scale}),r=new Set(b.notes),c=a.filter(g=>r.has(g.pitch%12)),m=a.length-c.length;s.notes=c,console.log(`[composition-aide] Snapped "${s.name||"(unnamed)"}" to ${n.label}: removed ${m} out-of-key notes, kept ${c.length}`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Snap to Key","aide.snapToKey"),t.commands.registerCommand("aide.batchTranspose",h=>{(async o=>{let s=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(_e)}`,300,200),a;try{a=JSON.parse(s)}catch{return}if(!a||a.action!=="transpose")return;let{semitones:n}=a;if(n===0)return;let b=0;for(let r of o.selected_clip_slots){let m=t.getObjectFromHandle(r,J).clip;if(!(m instanceof B))continue;let g=m.notes;g.length!==0&&(m.notes=g.map(v=>({pitch:Math.max(0,Math.min(127,v.pitch+n)),startTime:v.startTime,duration:v.duration,velocity:v.velocity??90})),b++)}console.log(`[composition-aide] Transposed ${b} clips ${n>0?"+":""}${n} semitones`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("ClipSlotSelection","Transpose Selected Clips\u2026","aide.batchTranspose"),t.commands.registerCommand("aide.findCompatible",h=>{(async o=>{let s=t.getObjectFromHandle(o,B),a=s.notes;if(a.length===0){console.log("[composition-aide] Clip has no notes.");return}let n=await U(a,l);if(!n){console.log("[composition-aide] Could not determine key for reference clip.");return}let b=t.application.song;if(!b)return;let r=/minor|min\b/i.test(n.scale),c=[];for(let f of b.tracks)for(let I of f.clipSlots){let M=I.clip;if(!(M instanceof B))continue;let T=M.notes;T.length!==0&&c.push({trackName:f.name,clip:M,notes:T})}let m=[];await t.ui.withinProgressDialog("Scanning session for compatible clips\u2026",{progress:0},async(f,I)=>{let M=0;await Promise.all(c.map(async T=>{if(!I.aborted){try{let P=await U(T.notes,l);if(P){let O=/minor|min\b/i.test(P.scale),A=Tt(n.root,r,P.root,O);A&&m.push({trackName:T.trackName,clipName:T.clip.name||"(unnamed)",key:P.label,compatibility:A,color:Y(P.label)??4473924})}}catch(P){console.error(`[composition-aide] Error scanning "${T.clip.name}":`,P)}M++,await f(`${M} / ${c.length} clips\u2026`,Math.round(M/c.length*100))}}))});let g=["Same key","Relative minor","Relative major","Parallel major","Parallel minor","Dominant (V)","Subdominant (IV)"];m.sort((f,I)=>{let M=g.indexOf(f.compatibility),T=g.indexOf(I.compatibility);return(M===-1?99:M)-(T===-1?99:T)});let v=[{root:n.root,scale:n.scale,label:n.label,relationship:"Same key"}],y=r?(n.root+3)%12:(n.root+9)%12;v.push({root:y,scale:r?"major":"natural_minor",label:`${q[y]??"C"} ${r?"major":"minor"}`,relationship:r?"Relative major":"Relative minor"});let k=(n.root+7)%12;v.push({root:k,scale:n.scale,label:`${q[k]??"C"} ${r?"minor":"major"}`,relationship:"Dominant (V)"});let x=(n.root+5)%12;v.push({root:x,scale:n.scale,label:`${q[x]??"C"} ${r?"minor":"major"}`,relationship:"Subdominant (IV)"});let w=["I-V-vi-IV","I-IV-V-I","ii-V-I"],E=[];await Promise.all(v.flatMap((f,I)=>(I===0?w:w.slice(0,2)).map(async T=>{try{let P=await l.send("progression",{key:f.root,scale:f.scale,template:T,sevenths:!1});E.push({relationship:f.relationship,keyLabel:f.label,template:T,chords:P.chords.map(O=>O.name),color:Y(f.label)??4473924})}catch{}})));let _=["Same key","Relative minor","Relative major","Dominant (V)","Subdominant (IV)"];E.sort((f,I)=>{let M=_.indexOf(f.relationship),T=_.indexOf(I.relationship);return(M===-1?99:M)-(T===-1?99:T)});let d={refClipName:s.name||"(unnamed)",refKey:n.label,results:m,suggestions:E},u=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Ne.replace("__COMPATIBLE_JSON__",ae(d)))}`,620,560),C=null;try{let f=JSON.parse(u);f&&typeof f.action=="string"&&(C=f)}catch{}if(C?.action==="writeProgression"){let f=C.suggestion,I=null;e:for(let M of b.tracks)if(M instanceof F){for(let T of M.clipSlots)if(T.clip===null){I=T;break e}}if(!I)console.log("[composition-aide] No empty MIDI slot found \u2014 add an empty slot to a MIDI track.");else{let T=f.chords.length*2,P=[];for(let A=0;A<f.chords.length;A++)try{let N=await l.send("voicings",{name:f.chords[A],octave:4});for(let S of N.close??[])P.push({pitch:Math.max(0,Math.min(127,S)),startTime:A*2,duration:2*.95,velocity:90})}catch{console.warn(`[composition-aide] Could not voice chord "${f.chords[A]}"`)}let O=await I.createMidiClip(T);O.notes=P,O.name=`${f.keyLabel} \xB7 ${f.template}`,O.color=f.color,console.log(`[composition-aide] Wrote "${O.name}" (${f.chords.join(" \u2013 ")}) to empty slot`)}}console.log(`[composition-aide] Found ${m.length} compatible clips for "${d.refClipName}" (${n.label})`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Find Compatible Clips\u2026","aide.findCompatible"),t.commands.registerCommand("aide.snapToScale",h=>{(async o=>{let s=t.getObjectFromHandle(o,B),a=s.notes;if(a.length===0){console.log("[composition-aide] Clip has no notes.");return}let n=await U(a,l);if(!n){console.log("[composition-aide] Could not determine key for this clip.");return}let b=await l.send("scale_info",{key:n.root,scale:n.scale}),r=new Set(b.notes),c=0,m=a.map(g=>{let v=me(g.pitch,r);return v!==g.pitch&&c++,{...g,pitch:v}});s.notes=m,console.log(`[composition-aide] Snapped "${s.name||"(unnamed)"}" to ${n.label}: ${c} notes adjusted, ${a.length-c} already in scale`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Snap Notes to Scale","aide.snapToScale"),t.commands.registerCommand("aide.labelClipKey",h=>{(async o=>{let s=t.getObjectFromHandle(o,B),a=s.notes;if(a.length===0){console.log("[composition-aide] Clip has no notes.");return}let n=await U(a,l);if(!n){console.log("[composition-aide] Could not determine key for this clip.");return}let b=(s.name||"").replace(/ \[[^\]]*\]$/,"").trim(),r=b.length>0?`${b} [${X(n.label)}]`:`[${X(n.label)}]`;s.name=r,console.log(`[composition-aide] Labeled clip: "${r}" (${n.label})`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Label with Key","aide.labelClipKey"),t.commands.registerCommand("aide.labelAllKeys",h=>{(async o=>{let s=t.application.song;if(!s)return;let a=[];for(let b of s.tracks)for(let r of b.clipSlots){let c=r.clip;if(!(c instanceof B))continue;let m=c.notes;m.length!==0&&a.push({clip:c,notes:m})}if(a.length===0){console.log("[composition-aide] No MIDI clips with notes found.");return}let n=0;await t.ui.withinProgressDialog(`Labeling ${a.length} clips\u2026`,{progress:0},async(b,r)=>{let c=0;await Promise.all(a.map(async m=>{if(!r.aborted){try{let g=await U(m.notes,l);if(g){let v=(m.clip.name||"").replace(/ \[[^\]]*\]$/,"").trim();m.clip.name=v.length>0?`${v} [${X(g.label)}]`:`[${X(g.label)}]`,n++}}catch(g){console.error(`[composition-aide] Could not label "${m.clip.name}":`,g)}c++,await b(`${c} / ${a.length} clips\u2026`,Math.round(c/a.length*100))}}))}),console.log(`[composition-aide] Labeled ${n} / ${a.length} clips with key.`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("Scene","Label All Clips with Key","aide.labelAllKeys"),t.commands.registerCommand("aide.transposeSession",h=>{(async o=>{let s=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Ae)}`,300,250),a;try{a=JSON.parse(s)}catch{return}if(!a||a.action!=="transpose")return;let{semitones:n,recolor:b}=a,r=t.application.song;if(!r)return;let c=[];for(let g of r.tracks)for(let v of g.clipSlots){let y=v.clip;y instanceof B&&c.push({clip:y,clipName:y.name||"(unnamed)"})}if(c.length===0){console.log("[composition-aide] No MIDI clips found in session.");return}let m=b?`Transposing + recoloring ${c.length} clips\u2026`:`Transposing ${c.length} clips\u2026`;await t.ui.withinProgressDialog(m,{progress:0},async(g,v)=>{if(n!==0){let y=0;for(let k of c){if(v.aborted)return;let x=k.clip.notes;x.length>0&&(k.clip.notes=x.map(w=>({...w,pitch:Math.max(0,Math.min(127,w.pitch+n))}))),y++,await g(`Transposing: ${y} / ${c.length}\u2026`,Math.round(b?y/c.length*50:y/c.length*100))}}if(b&&!v.aborted){let y=0,k=0;await Promise.all(c.map(async x=>{if(!v.aborted){try{let w=x.clip.notes;if(w.length===0)return;let E=G(w),d=(await Promise.all([...E.entries()].map(([u,C])=>l.send("recognize_chord",{notes:C}).then(f=>({beatKey:u,r:f}))))).sort((u,C)=>u.beatKey-C.beatKey).flatMap(({r:u})=>{let C=u.matches[0];return C&&C.score>=.5?[C.chord.name]:[]}).filter((u,C,f)=>C===0||u!==f[C-1]);if(d.length>0){let u=await l.send("analyze",{chord_names:d}),C=Y(u.inferred_key.label);C!==null&&(x.clip.color=C,y++)}}catch{}k++,await g(`Recoloring: ${k} / ${c.length}\u2026`,50+Math.round(k/c.length*50))}})),console.log(`[composition-aide] Session transposed ${n>0?"+":""}${n} semitones, ${y} clips recolored.`)}else console.log(`[composition-aide] Session transposed ${n>0?"+":""}${n} semitones.`)})})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("Scene","Transpose Session\u2026","aide.transposeSession"),t.commands.registerCommand("aide.bassLine",h=>{(async o=>{let s=t.getObjectFromHandle(o,B),a=s.notes;if(a.length===0){console.log("[composition-aide] Clip has no notes.");return}let n=G(a),r=(await Promise.all([...n.entries()].map(([d,u])=>l.send("recognize_chord",{notes:u}).then(C=>({beatKey:d,result:C}))))).sort((d,u)=>d.beatKey-u.beatKey).flatMap(({beatKey:d,result:u})=>{let C=u.matches[0];return!C||C.score<.5?[]:[{beat:d/1e3,name:C.chord.name,root:C.chord.root,pitchClasses:C.chord.pitch_classes}]}).filter((d,u,C)=>u===0||d.name!==C[u-1]?.name);if(r.length===0){console.log("[composition-aide] Could not identify any chords in this clip.");return}let c=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Pe)}`,340,300),m;try{m=JSON.parse(c)}catch{return}if(!m||m.action!=="bass")return;let g=s.looping?s.loopEnd-s.loopStart:s.duration,v=r[r.length-1]?.beat??0,y=g>v?g:v+4,k=At(r,y),x=je(k,m.pattern,m.octave),w=t.application.song,E=null;if(w){e:for(let d of w.tracks)if(d instanceof F){for(let u of d.clipSlots)if(u.clip===null){E=u;break e}}}if(!E){console.log("[composition-aide] No empty MIDI slot found \u2014 add an empty slot to a MIDI track.");return}let _=await E.createMidiClip(y);_.notes=x,_.name=`Bass (${m.pattern.replace(/_/g," ")}) \u2014 ${s.name||r.map(d=>d.name).join(" \u2013 ")}`,console.log(`[composition-aide] Bass line: ${r.map(d=>d.name).join(" \u2013 ")} (${m.pattern}, octave ${m.octave}, ${x.length} notes)`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("MidiClip","Generate Bass Line\u2026","aide.bassLine"),t.commands.registerCommand("aide.songForm",h=>{(async o=>{let s=t.getObjectFromHandle(o,W),a=t.application.song;if(!a)return;let n=a.rootNote??0,b=de[a.scaleName??"Major"]??"major",r=Be.replace("</head>",`<script>window._INIT={key:${n},scale:${JSON.stringify(b)}};</script></head>`),c=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(r)}`,920,640),m;try{m=JSON.parse(c)}catch{return}if(!m||m.action!=="songform"||m.sections.length===0)return;let g=await Promise.all(m.sections.map(async d=>{let u=d.bars*4,C=Math.max(1,Math.floor(u/d.beatsPerChord)),f,I=d.customProgression.trim();if(I){let N=I.split(/[\s,|]+/).filter(Boolean);f=await Promise.all(N.map(S=>Ve(l,S,d.key,d.scale)))}else{let{chords:N}=await l.send("progression",{key:d.key,scale:d.scale,template:d.template,sevenths:m.sevenths});f=N}let M=[];for(let N=0;N<C;N++)M.push(f[N%f.length]);let{voicings:T}=await l.send("voice_progression",{chords:M,strategy:m.voicing,octave:4}),P=se(T,d.beatsPerChord,d.rhythm),O=null;if(d.bass!=="none"){let N=M.map((S,R)=>({start:R*d.beatsPerChord,span:d.beatsPerChord,rootPc:S.root,thirdIv:S.intervals[1]??4,fifthIv:S.intervals[2]??7,nextRootPc:M[R+1]?.root??null}));O=je(N,d.bass,m.bassOctave)}let A=q[d.key]??"C";return{section:d,totalBeats:u,chordNotes:P,bassNotes:O,chordNames:[...new Set(M.map(N=>N.name))],color:Y(`${A} ${d.scale.replace(/_/g," ")}`)}})),v=a.scenes.findIndex(d=>d.handle.id===s.handle.id),y=v>=0?v+1:a.scenes.length,k=a.tracks.filter(d=>d instanceof F),x=k[0],w=k[1];if(!x){console.log("[composition-aide] No MIDI track found for the chord clips.");return}g.some(d=>d.bassNotes)&&!w&&console.log("[composition-aide] Only one MIDI track \u2014 bass clips skipped (add a second MIDI track).");for(let d=0;d<g.length;d++){let u=g[d],C=y+d,f=await a.createScene(C),I=X(`${q[u.section.key]??"C"} ${u.section.scale.replace(/_/g," ")}`);f.name=`${u.section.name} \u2014 ${I} \xB7 ${u.section.bars} bars`;let M=x.clipSlots[C];if(M){let T=await M.createMidiClip(u.totalBeats);T.notes=u.chordNotes,T.name=`${u.section.name} \xB7 ${u.chordNames.join(" ")}`,u.color!==null&&(T.color=u.color)}if(u.bassNotes&&w){let T=w.clipSlots[C];if(T){let P=await T.createMidiClip(u.totalBeats);P.notes=u.bassNotes,P.name=`${u.section.name} \xB7 Bass (${u.section.bass.replace(/_/g," ")})`,u.color!==null&&(P.color=u.color)}}}let _=g.reduce((d,u)=>d+u.section.bars,0);console.log(`[composition-aide] Song form: ${g.length} scenes, ${_} bars (${g.map(d=>d.section.name).join(" \u2192 ")})`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("Scene","Compose Song Form\u2026","aide.songForm"),t.commands.registerCommand("aide.theoryMachine",h=>{(async o=>{let s=t.getObjectFromHandle(o,J),a=t.application.song,n=a?.rootNote??0,b=de[a?.scaleName??"Major"]??"major",r=Re.replace("</head>",`<script>window._INIT={key:${n},scale:${JSON.stringify(b)}};</script></head>`),c=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(r)}`,1e3,700),m;try{m=JSON.parse(c)}catch{return}if(!m||m.action!=="writeClip")return;let{chords:g,beatsPerChord:v,totalBeats:y}=m,k=se(g.map(E=>E.notes),v,m.rhythm),x=g.map(E=>E.name).join(" \u2013 "),w=s.clip;if(w instanceof B)w.notes=k,w.name=x;else{let E=await s.createMidiClip(y);E.notes=k,E.name=x}console.log(`[composition-aide] Theory Machine: wrote ${g.length} chords (${v} beats each) \u2014 "${x}"`)})(h).catch(o=>console.error(o))}),t.ui.registerContextMenuAction("ClipSlot","Modal Explorer\u2026","aide.theoryMachine")}0&&(module.exports={activate});

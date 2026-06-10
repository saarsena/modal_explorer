"use strict";var Re=Object.create;var X=Object.defineProperty;var Pe=Object.getOwnPropertyDescriptor;var je=Object.getOwnPropertyNames;var $e=Object.getPrototypeOf,Oe=Object.prototype.hasOwnProperty;var Be=(e,t)=>{for(var a in t)X(e,a,{get:t[a],enumerable:!0})},de=(e,t,a,c)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of je(t))!Oe.call(e,r)&&r!==a&&X(e,r,{get:()=>t[r],enumerable:!(c=Pe(t,r))||c.enumerable});return e};var Le=(e,t,a)=>(a=e!=null?Re($e(e)):{},de(t||!e||!e.__esModule?X(a,"default",{value:e,enumerable:!0}):a,e)),ze=e=>de(X({},"__esModule",{value:!0}),e);var xt={};Be(xt,{activate:()=>vt});module.exports=ze(xt);var j=class pe{constructor(t,a,c){this.handle=t,this.dataModel=a,this.objectRegistry=c}get parent(){let t=this.dataModel.getObjectCanonicalParent(this.handle);return t?this.objectRegistry.getObjectFromHandle(t,pe):null}},z=(e,t,...a)=>new Promise((c,r)=>{e.withinTransaction(()=>t(...a,c,r))}),R=(e,t,a,c,...r)=>new Promise((m,s)=>{e.withinTransaction(()=>c(...r,l=>m(t.getObjectFromHandle(l,a)),s))}),F=class extends j{static className="Clip";get name(){return this.dataModel.clipGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetName(this.handle,e)})}get startTime(){return this.dataModel.clipGetStartTime(this.handle)}get endTime(){return this.dataModel.clipGetEndTime(this.handle)}get duration(){return this.dataModel.clipGetEndTime(this.handle)-this.dataModel.clipGetStartTime(this.handle)}get startMarker(){return this.dataModel.clipGetStartMarker(this.handle)}get endMarker(){return this.dataModel.clipGetEndMarker(this.handle)}get looping(){return this.dataModel.clipGetLooping(this.handle)}set looping(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetLooping(this.handle,e)})}get loopStart(){return this.dataModel.clipGetLoopStart(this.handle)}get loopEnd(){return this.dataModel.clipGetLoopEnd(this.handle)}get color(){return this.dataModel.clipGetColor(this.handle)}set color(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetColor(this.handle,e)})}get muted(){return this.dataModel.clipGetMuted(this.handle)}set muted(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetMuted(this.handle,e)})}},ee=class extends F{static className="AudioClip";get filePath(){return this.dataModel.audioclipGetFilePath(this.handle)}get warping(){return this.dataModel.audioclipGetWarping(this.handle)}set warping(e){this.dataModel.withinTransaction(()=>{this.dataModel.audioclipSetWarping(this.handle,e)})}get warpMode(){return this.dataModel.audioclipGetWarpMode(this.handle)}set warpMode(e){this.dataModel.withinTransaction(()=>{this.dataModel.audioclipSetWarpMode(this.handle,e)})}get warpMarkers(){return this.dataModel.audioclipGetWarpMarkers(this.handle)}},D=class extends F{static className="MidiClip";get notes(){return this.dataModel.midiclipGetNotes(this.handle)}set notes(e){this.dataModel.withinTransaction(()=>{this.dataModel.midiclipSetNotes(this.handle,e)})}},q=class extends j{static className="ClipSlot";get clip(){let e=this.dataModel.clipslotGetClip(this.handle);return e?this.objectRegistry.getObjectFromHandle(e,F):null}deleteClip(){return z(this.dataModel,this.dataModel.clipslotDeleteClip,this.handle)}createMidiClip(e){return R(this.dataModel,this.objectRegistry,D,this.dataModel.clipslotCreateMidiClip,this.handle,e)}createAudioClip(e){return R(this.dataModel,this.objectRegistry,ee,this.dataModel.clipslotCreateAudioClip,this.handle,{filePath:e.filePath,isWarped:e.isWarped,loopSettings:e.loopSettings})}},H=class extends j{static className="DeviceParameter";get name(){return this.dataModel.deviceParameterGetName(this.handle)}get min(){return this.dataModel.deviceParameterGetInternalMin(this.handle)}get max(){return this.dataModel.deviceParameterGetInternalMax(this.handle)}get isQuantized(){return this.dataModel.deviceParameterGetIsQuantized(this.handle)}get defaultValue(){return this.dataModel.deviceParameterGetDefaultValue(this.handle)}get valueItems(){return this.dataModel.deviceParameterGetValueItems(this.handle)}getValue(){return new Promise(e=>{this.dataModel.deviceParameterGetInternalValue(this.handle,e)})}setValue(e){return new Promise((t,a)=>{this.dataModel.withinTransaction(()=>{this.dataModel.deviceParameterSetInternalValue(this.handle,e,t,c=>a(new Error(c)))})})}},L=class extends j{static className="Device";get name(){return this.dataModel.deviceGetName(this.handle)}get parameters(){return this.dataModel.deviceGetParameters(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,H))}},se=class extends j{static className="TakeLane";get clips(){return this.dataModel.takelaneGetClips(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,F))}get name(){return this.dataModel.takelaneGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.takelaneSetName(this.handle,e)})}createMidiClip(e,t){return R(this.dataModel,this.objectRegistry,D,this.dataModel.takelaneCreateMidiClip,this.handle,e,t)}createAudioClip(e){return R(this.dataModel,this.objectRegistry,ee,this.dataModel.takelaneCreateAudioClip,this.handle,{duration:e.duration,filePath:e.filePath,isWarped:e.isWarped,loopSettings:e.loopSettings,startTime:e.startTime})}},he=class extends j{static className="MixerDevice";get volume(){return this.objectRegistry.getObjectFromHandle(this.dataModel.mixerdeviceGetVolume(this.handle),H)}get panning(){return this.objectRegistry.getObjectFromHandle(this.dataModel.mixerdeviceGetPanning(this.handle),H)}get sends(){return this.dataModel.mixerdeviceGetSends(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,H))}},V=class ue extends j{static className="Track";get name(){return this.dataModel.trackGetName(this.handle)}set name(t){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetName(this.handle,t)})}get mute(){return this.dataModel.trackGetMute(this.handle)}set mute(t){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetMute(this.handle,t)})}get solo(){return this.dataModel.trackGetSolo(this.handle)}set solo(t){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetSolo(this.handle,t)})}get mutedViaSolo(){return this.dataModel.trackGetMutedViaSolo(this.handle)}get arm(){return this.dataModel.trackGetArm(this.handle)}set arm(t){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetArm(this.handle,t)})}get clipSlots(){return this.dataModel.trackGetClipSlots(this.handle).map(t=>this.objectRegistry.getObjectFromHandle(t,q))}get takeLanes(){return this.dataModel.trackGetTakeLanes(this.handle).map(t=>this.objectRegistry.getObjectFromHandle(t,se))}get arrangementClips(){return this.dataModel.trackGetArrangementClips(this.handle).map(t=>this.objectRegistry.getObjectFromHandle(t,F))}get groupTrack(){let t=this.dataModel.trackGetGroupTrack(this.handle);return t?this.objectRegistry.getObjectFromHandle(t,ue):null}get devices(){return this.dataModel.trackGetDevices(this.handle).map(t=>this.objectRegistry.getObjectFromHandle(t,L))}get mixer(){return this.objectRegistry.getObjectFromHandle(this.dataModel.trackGetMixerDevice(this.handle),he)}createTakeLane(){return R(this.dataModel,this.objectRegistry,se,this.dataModel.trackCreateTakeLane,this.handle)}insertDevice(t,a){return R(this.dataModel,this.objectRegistry,L,this.dataModel.trackInsertDevice,this.handle,t,BigInt(a))}deleteDevice(t){return z(this.dataModel,this.dataModel.trackDeleteDevice,this.handle,t.handle)}duplicateDevice(t){return R(this.dataModel,this.objectRegistry,L,this.dataModel.trackDuplicateDevice,this.handle,t.handle)}deleteClip(t){return z(this.dataModel,this.dataModel.trackDeleteClip,this.handle,t.handle)}clearClipsInRange(t,a){return z(this.dataModel,this.dataModel.trackClearClipsInRange,this.handle,t,a)}},ge=class extends V{static className="AudioTrack";createAudioClip(e){return R(this.dataModel,this.objectRegistry,ee,this.dataModel.trackCreateAudioClip,this.handle,{duration:e.duration,filePath:e.filePath,isWarped:e.isWarped,loopSettings:e.loopSettings,startTime:e.startTime})}},ie=class extends j{static className="CuePoint";get time(){return this.dataModel.cuePointGetTime(this.handle)}get name(){return this.dataModel.cuePointGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.cuePointSetName(this.handle,e)})}},K=class extends V{static className="MidiTrack";createMidiClip(e,t){return R(this.dataModel,this.objectRegistry,D,this.dataModel.trackCreateMidiClip,this.handle,e,t)}},Z=class extends j{static className="Scene";get name(){return this.dataModel.sceneGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.sceneSetName(this.handle,e)})}get tempo(){return this.dataModel.sceneGetTempo(this.handle)}get signatureNumerator(){return this.dataModel.sceneGetSignatureNumerator(this.handle)}get signatureDenominator(){return this.dataModel.sceneGetSignatureDenominator(this.handle)}},be=class extends j{static className="Song";get tracks(){return this.dataModel.songGetTracks(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,V))}get returnTracks(){return this.dataModel.songGetReturnTracks(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,V))}get mainTrack(){return this.objectRegistry.getObjectFromHandle(this.dataModel.songGetMainTrack(this.handle),V)}get scenes(){return this.dataModel.songGetScenes(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,Z))}get cuePoints(){return this.dataModel.songGetCuePoints(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,ie))}get tempo(){return this.dataModel.songGetTempo(this.handle)}set tempo(e){this.dataModel.withinTransaction(()=>{this.dataModel.songSetTempo(this.handle,e)})}get gridQuantization(){return this.dataModel.songGetGridQuantization(this.handle)}get gridIsTriplet(){return this.dataModel.songGetGridIsTriplet(this.handle)}get rootNote(){return Number(this.dataModel.songGetRootNote(this.handle))}get scaleName(){return this.dataModel.songGetScaleName(this.handle)}get scaleMode(){return this.dataModel.songGetScaleMode(this.handle)}get scaleIntervals(){return this.dataModel.songGetScaleIntervals(this.handle).map(Number)}createAudioTrack(){return R(this.dataModel,this.objectRegistry,ge,this.dataModel.songCreateAudioTrack,this.handle)}createMidiTrack(){return R(this.dataModel,this.objectRegistry,K,this.dataModel.songCreateMidiTrack,this.handle)}createScene(e){return R(this.dataModel,this.objectRegistry,Z,this.dataModel.songCreateScene,this.handle,BigInt(e))}deleteTrack(e){return z(this.dataModel,this.dataModel.songDeleteTrack,this.handle,e.handle)}deleteScene(e){return z(this.dataModel,this.dataModel.songDeleteScene,this.handle,e.handle)}duplicateTrack(e){return R(this.dataModel,this.objectRegistry,V,this.dataModel.songDuplicateTrack,this.handle,e.handle)}duplicateScene(e){return R(this.dataModel,this.objectRegistry,Z,this.dataModel.songDuplicateScene,this.handle,e.handle)}createCuePoint(e){return R(this.dataModel,this.objectRegistry,ie,this.dataModel.songCreateCuePoint,this.handle,e)}deleteCuePoint(e){return z(this.dataModel,this.dataModel.songDeleteCuePoint,this.handle,e.handle)}},fe=class extends j{static className="Application";get song(){return this.objectRegistry.getObjectFromHandle(this.dataModel.rootGetSong(this.handle),be)}},He=class{module;constructor(e){this.module=e}registerCommand(e,t){this.module.registerCommand(e,t)}executeCommand(e,...t){this.module.executeCommand(e,...t)}},ye=class extends j{static className="ChainMixerDevice";get volume(){return this.objectRegistry.getObjectFromHandle(this.dataModel.chainmixerdeviceGetVolume(this.handle),H)}get panning(){return this.objectRegistry.getObjectFromHandle(this.dataModel.chainmixerdeviceGetPanning(this.handle),H)}get sends(){return this.dataModel.chainmixerdeviceGetSends(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,H))}},Q=class extends j{static className="Chain";get devices(){return this.dataModel.chainGetDevices(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,L))}get mixer(){return this.objectRegistry.getObjectFromHandle(this.dataModel.chainGetMixerDevice(this.handle),ye)}insertDevice(e,t){return R(this.dataModel,this.objectRegistry,L,this.dataModel.chainInsertDevice,this.handle,e,BigInt(t))}deleteDevice(e){return z(this.dataModel,this.dataModel.chainDeleteDevice,this.handle,e.handle)}duplicateDevice(e){return R(this.dataModel,this.objectRegistry,L,this.dataModel.chainDuplicateDevice,this.handle,e.handle)}},ve=class extends Q{static className="DrumChain";get receivingNote(){return Number(this.dataModel.drumchainGetReceivingNote(this.handle))}set receivingNote(e){this.dataModel.withinTransaction(()=>{this.dataModel.drumchainSetReceivingNote(this.handle,BigInt(e))})}},xe=class extends L{static className="RackDevice";get chains(){return this.dataModel.rackdeviceGetChains(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,Q))}insertChain(e){return R(this.dataModel,this.objectRegistry,Q,this.dataModel.rackdeviceInsertChain,this.handle,BigInt(e))}},Ve=class extends xe{static className="DrumRackDevice";get chains(){return this.dataModel.rackdeviceGetChains(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,ve))}},re=class extends j{static className="Sample";get filePath(){return this.dataModel.sampleGetFilePath(this.handle)}},Fe=class extends L{static className="Simpler";get sample(){let e=this.dataModel.simplerGetSample(this.handle);return e?this.objectRegistry.getObjectFromHandle(e,re):null}replaceSample(e){return R(this.dataModel,this.objectRegistry,re,this.dataModel.simplerReplaceSample,this.handle,e)}},qe=[fe,be,ge,K,V,ee,D,F,q,se,Fe,Ve,xe,L,re,ve,Q,Z,ie,H,he,ye],Ge=class{cache=new Map;dataModel;constructor(e){this.dataModel=e}getOrCreateObjectFromHandle(e){let t=this.cache.get(e.id);if(t)return t;let a=qe.find(r=>this.dataModel.getObjectIsOfClass(e,r.className));if(!a)throw new Error("Unknown object type");let c=new a(e,this.dataModel,this);return this.cache.set(e.id,c),c}getObjectFromHandle(e,t){let a=this.getOrCreateObjectFromHandle(e);if(!(a instanceof t))throw new Error("Object of incorrect type");return a}},We=class{module;constructor(e){this.module=e}get storageDirectory(){return this.module.storageDirectory}get tempDirectory(){return this.module.tempDirectory}get language(){return this.module.language}},Ke=class{module;constructor(e){this.module=e}renderPreFxAudio(e,t,a){return new Promise((c,r)=>{this.module.renderPreFxAudio(e.handle,{endTime:a,startTime:t},c,r)})}importIntoProject(e){return new Promise((t,a)=>{this.module.importIntoProject(e,t,a)})}},me=(e,t)=>typeof t=="number"?{progress:t,text:e}:{text:e},Je=class{module;constructor(e){this.module=e}registerContextMenuAction(e,t,a){return new Promise(c=>{this.module.registerContextMenuAction(e,t,a,r=>{c(()=>new Promise(m=>{r(m)}))})})}showModalDialog(e,t,a){return new Promise((c,r)=>{this.module.showModalDialog(e,t,a,c,r)})}withinProgressDialog(e,t,a){let c=new AbortController;return new Promise((r,m)=>{this.module.showProgressDialog(me(e,t.progress),({update:s,close:l})=>{let n=(v,d)=>new Promise(i=>{s(me(v,d),i)}),o=()=>new Promise(v=>{l(v)});a(n,c.signal).finally(o).then(r).catch(m)},()=>{c.abort()})})}},we=(e,t)=>{let{commands:a,dataModel:c,environment:r,resources:m,ui:s}=e.initializeExtensionHost({apiVersion:t}),l=new Ge(c);return{application:l.getObjectFromHandle(c.getRoot(),fe),commands:new He(a),environment:new We(r),getObjectFromHandle:l.getObjectFromHandle.bind(l),resources:new Ke(m),ui:new Je(s),withinTransaction:c.withinTransaction.bind(c)}};var Me=require("node:child_process"),te=class{constructor(t,a="python"){this.cwd=t;this.pythonCmd=a}cwd;pythonCmd;proc=null;buffer="";pending=new Map;nextId=1;getProcess(){if(this.proc)return this.proc;let t=(0,Me.spawn)(this.pythonCmd,["-u","-m","chordgen.server"],{cwd:this.cwd,stdio:["pipe","pipe","pipe"],env:{...process.env,PYTHONDONTWRITEBYTECODE:"1"}});return t.stdout.on("data",a=>{this.buffer+=a.toString("utf8");let c;for(;(c=this.buffer.indexOf(`
`))!==-1;){let r=this.buffer.slice(0,c).trim();if(this.buffer=this.buffer.slice(c+1),!r)continue;let m;try{m=JSON.parse(r)}catch{continue}let s=m.id;if(s===void 0)continue;let l=this.pending.get(s);l&&(this.pending.delete(s),"error"in m?l.reject(new Error(String(m.error))):l.resolve(m.result))}}),t.stderr.on("data",a=>{console.error(`[chordgen] ${a.toString("utf8").trimEnd()}`)}),t.on("error",a=>{console.error(`[chordgen] failed to start: ${a.message}`),this.drainPending(a),this.proc=null}),t.on("exit",a=>{a!==0&&a!==null&&console.error(`[chordgen] process exited with code ${a}`),this.drainPending(new Error(`chordgen process exited (code ${a})`)),this.proc=null}),this.proc=t,t}drainPending(t){for(let[,a]of this.pending)a.reject(t);this.pending.clear()}send(t,a={}){let c=this.getProcess(),r=this.nextId++;return new Promise((m,s)=>{this.pending.set(r,{resolve:l=>m(l),reject:s}),c.stdin.write(JSON.stringify({op:t,id:r,...a})+`
`)})}dispose(){this.proc?.kill(),this.proc=null}};var De=Le(require("node:path"),1);var le=`<!DOCTYPE html>
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
        key:         keyIdx,
        keyName:     KEY_NAMES[keyIdx],
        scale:       document.getElementById('scale').value,
        template:    document.getElementById('template').value,
        voicing:     document.getElementById('voicing').value,
        sevenths:    document.getElementById('sevenths').checked,
        snapToScale: document.getElementById('snapToScale').checked,
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('keydown', e => {
        if (e.key === 'Enter') generate();
        if (e.key === 'Escape') closeWithResult(null);
      });
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

    <span class="label">Voicing</span>
    <select id="voicing">
      <option value="smooth">Smooth (voice-led)</option>
      <option value="close">Close Position</option>
      <option value="drop2">Drop 2</option>
      <option value="shell">Shell</option>
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
`;var Ce=`<!DOCTYPE html>
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
`;var ke=`<!DOCTYPE html>
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
`;var Ie=`<!DOCTYPE html>
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
`;var Se=`<!DOCTYPE html>
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
`;var Ee=`<!DOCTYPE html>
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
`;var Te=`<!DOCTYPE html>
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
`;var Ae=`<!DOCTYPE html>
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

  closeWithResult({ action: 'writeClip', chords: chordData, beatsPerChord, totalBeats });
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
`;var J=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],Ne={Major:"major",Minor:"natural_minor",Dorian:"dorian",Phrygian:"phrygian",Lydian:"lydian",Mixolydian:"mixolydian",Locrian:"locrian","Harmonic Minor":"harmonic_minor","Melodic Minor":"melodic_minor"},nt={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11},at=[0,7,2,9,4,11,6,1,8,3,10,5],U=[0,2,4,5,7,9,11],st=[0,2,3,5,7,8,10],it=[0,2,3,5,7,9,10],rt=[0,1,3,5,7,8,10],lt=[0,2,4,6,7,9,11],ct=[0,2,4,5,7,9,10],dt=[0,1,3,5,6,8,10],mt=[0,2,3,5,7,8,11],pt=[0,2,3,5,7,9,11],ht=[0,2,4,7,9],ut=[0,3,5,7,10],gt=[0,3,5,6,7,10],Y={major:U,natural_minor:st,dorian:it,phrygian:rt,lydian:lt,mixolydian:ct,locrian:dt,harmonic_minor:mt,melodic_minor:pt,pentatonic_major:ht,pentatonic_minor:ut,blues:gt},bt={major:"major",natural_minor:"minor",dorian:"Dorian",phrygian:"Phrygian",lydian:"Lydian",mixolydian:"Mixolydian",locrian:"Locrian",harmonic_minor:"harmonic minor",melodic_minor:"melodic minor",pentatonic_major:"pentatonic major",pentatonic_minor:"pentatonic minor",blues:"blues"},_e=[{id:"major",label:"Major"},{id:"natural_minor",label:"Natural Minor"},{id:"dorian",label:"Dorian"},{id:"phrygian",label:"Phrygian"},{id:"lydian",label:"Lydian"},{id:"mixolydian",label:"Mixolydian"},{id:"locrian",label:"Locrian"},{id:"harmonic_minor",label:"Harmonic Minor"},{id:"melodic_minor",label:"Melodic Minor"},{id:"pentatonic_major",label:"Pentatonic Major"},{id:"pentatonic_minor",label:"Pentatonic Minor"},{id:"blues",label:"Blues"}];function W(e,t=.25){let a=new Map;for(let c of e){let r=Math.round(c.startTime/t)*t,m=Math.round(r*1e3),s=a.get(m);s?s.push(c.pitch):a.set(m,[c.pitch])}return a}function oe(e){return JSON.stringify(e).replace(/</g,"\\u003C").replace(/>/g,"\\u003E")}function ft(e,t,a){let c=t/100,r=a/100,m=c*Math.min(r,1-r),s=l=>{let n=(l+e/30)%12;return r-m*Math.max(Math.min(n-3,9-n,1),-1)};return Math.round(s(0)*255)<<16|Math.round(s(8)*255)<<8|Math.round(s(4)*255)}function ne(e){let t=e.match(/^([A-G][#b]?)\s+(.*)/);if(!t)return null;let a=nt[t[1]??""];if(a===void 0)return null;let c=/minor|min\b/i.test(t[2]??""),r=(at[a]??0)*30;return ft(r,c?55:70,c?35:45)}async function G(e,t){let a=W(e),r=(await Promise.all([...a.entries()].map(([n,o])=>t.send("recognize_chord",{notes:o}).then(v=>({beatKey:n,r:v}))))).sort((n,o)=>n.beatKey-o.beatKey).flatMap(({r:n})=>{let o=n.matches[0];return o&&o.score>=.5?[o.chord.name]:[]}).filter((n,o,v)=>o===0||n!==v[o-1]);if(r.length>0){let o=(await t.send("analyze",{chord_names:r})).inferred_key;return{root:o.root,scale:o.scale,label:o.label}}let m=new Array(12).fill(0);for(let n of e){let o=n.pitch%12;m[o]=(m[o]??0)+1}let s=-1,l=null;for(let n=0;n<12;n++)for(let[o,v]of Object.entries(Y)){let d=0;for(let i of v)d+=m[(n+i)%12]??0;if(d>s){s=d;let i=J[n]??"C",p=bt[o]??o;l={root:n,scale:o,label:`${i} ${p}`}}}return l}function ce(e,t){let a=e%12;if(t.has(a))return e;for(let c=1;c<=6;c++){let r=t.has((a+c)%12),m=t.has((a-c+12)%12);if(r&&m||r)return e+c;if(m)return e-c}return e}function ae(e){let t=e.match(/^([A-G][#b]?)\s+(.+)$/);if(!t)return e;let a=t[1]??e,c=(t[2]??"").toLowerCase().trim();if(c==="major")return a;if(c==="minor"||c==="natural minor"||c==="natural_minor")return`${a}m`;if(c==="harmonic minor"||c==="harmonic_minor")return`${a}hm`;if(c==="melodic minor"||c==="melodic_minor")return`${a}mm`;let r=c.split(/[\s_]/)[0]??c;return`${a} ${r.slice(0,3)}`}function yt(e,t,a,c){return e===a&&t===c?"Same key":e===a?t?"Parallel major":"Parallel minor":!t&&c&&a===(e+9)%12?"Relative minor":t&&!c&&a===(e+3)%12?"Relative major":a===(e+7)%12?"Dominant (V)":a===(e+5)%12?"Subdominant (IV)":null}function vt(e){let t=we(e,"1.0.0"),a=process.env.COMPOSITION_AIDE_PATH??De.join(__dirname,"..","engine"),c=process.env.PYTHON_CMD??(process.platform==="win32"?"python":"python3"),r=new te(a,c);r.send("list_ops").catch(()=>{}),t.commands.registerCommand("aide.generate",m=>{(async s=>{let l=s.selected_lanes.map(y=>t.getObjectFromHandle(y,j)).filter(y=>y instanceof K);if(!l.length){console.log("[composition-aide] No MIDI tracks in selection.");return}let n=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(le)}`,380,322),o;try{o=JSON.parse(n)}catch{return}if(!o)return;let v=s.time_selection_end-s.time_selection_start,{chords:d}=await r.send("progression",{key:o.key,scale:o.scale,template:o.template,sevenths:o.sevenths}),{voicings:i}=await r.send("voice_progression",{chords:d,strategy:o.voicing,octave:4}),p=v/d.length,u=`${o.template} \u2014 ${o.keyName} ${o.scale.replace(/_/g," ")}`,b=i.flatMap((y,f)=>y.map(g=>({pitch:Math.max(0,Math.min(127,g)),startTime:f*p,duration:p*.95,velocity:90})));if(o.snapToScale){let y=Y[o.scale]??U,f=new Set(y.map(g=>(o.key+g)%12));b=b.map(g=>({...g,pitch:ce(g.pitch,f)}))}await Promise.all(l.map(async y=>{let f=await y.createMidiClip(s.time_selection_start,v);f.name=u,f.notes=b})),console.log(`[composition-aide] "${u}": ${d.map(y=>y.name).join(" \u2013 ")} (${p.toFixed(2)} beats/chord)`)})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("MidiTrack.ArrangementSelection","Generate Progression\u2026","aide.generate"),t.commands.registerCommand("aide.analyze",m=>{let s=async l=>{let n=t.getObjectFromHandle(l,D),o=n.notes;if(o.length===0){console.log("[composition-aide] Clip has no notes.");return}let v=W(o),i=(await Promise.all([...v.entries()].map(([k,_])=>r.send("recognize_chord",{notes:_}).then(B=>({beatKey:k,result:B}))))).sort((k,_)=>k.beatKey-_.beatKey).flatMap(({beatKey:k,result:_})=>{let B=_.matches[0];return!B||B.score<.5?[]:[{beat:k/1e3,name:B.chord.name,score:B.score,pitchClasses:B.chord.pitch_classes,root:B.chord.root,quality:B.chord.quality}]}).filter((k,_,B)=>_===0||k.name!==B[_-1]?.name);if(i.length===0){console.log("[composition-aide] Could not identify any chords in this clip.");return}let p=i.map(k=>k.name),u=await r.send("analyze",{chord_names:p}),b={clipName:n.name||"(unnamed clip)",noteCount:o.length,inferredKey:u.inferred_key.label,scaleRoot:u.inferred_key.root,scaleIntervals:[...Y[u.inferred_key.scale]??U],chords:p.map((k,_)=>({beat:i[_]?.beat??0,name:k,roman:u.roman_labels[_]??k,tension:u.tension[_]??0,score:i[_]?.score??0,pitchClasses:i[_]?.pitchClasses??[],root:i[_]?.root??0,quality:i[_]?.quality??"major"})),substitutions:u.substitutions.slice(0,5).map(k=>({position:k.position,original:k.original.name,replacement:k.replacement.name,rationale:k.rationale})),summary:u.summary},y=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Ce.replace("__ANALYSIS_JSON__",oe(b)))}`,520,560);console.log(`[composition-aide] Analyzed "${b.clipName}": ${b.inferredKey} \u2014 ${p.join(" \u2013 ")}`);let f;try{f=JSON.parse(y)}catch{return}if(!f||f.action!=="substitute")return;let{position:g,original:w,replacement:S}=f,A=i[g];if(!A){console.error(`[composition-aide] Substitution position ${g} out of range.`);return}let M=i[g+1],I=A.beat,E=n.notes,h=Math.max(I+4,...E.map(k=>k.startTime+k.duration)),x=M?.beat??h,C=E.filter(k=>k.startTime>=I-.01&&k.startTime<x-.01),T=C.length>0?Math.round(C.reduce((k,_)=>k+_.pitch,0)/C.length):60,P=Math.max(3,Math.min(6,Math.floor(T/12)-1)),O=await r.send("voicings",{name:S,octave:P}),N=C.length>0?C.reduce((k,_)=>k+_.duration,0)/C.length:(x-I)*.95,$=O.close.map(k=>({pitch:Math.max(0,Math.min(127,k)),startTime:I,duration:N,velocity:90}));n.notes=[...E.filter(k=>k.startTime<I-.01||k.startTime>=x-.01),...$],console.log(`[composition-aide] Substituted: ${w} \u2192 ${S} at beat ${I.toFixed(2)} (octave ${P})`),await s(l)};s(m).catch(l=>console.error(l))}),t.ui.registerContextMenuAction("MidiClip","Analyze Harmony\u2026","aide.analyze"),t.commands.registerCommand("aide.chordPalette",m=>{(async s=>{let l=t.getObjectFromHandle(s,q),n=t.application.song,o=n?.rootNote??0,v=n?.scaleName??"Major",d=Ne[v]??"major",i=await Promise.all(_e.flatMap(({id:x})=>[r.send("diatonic",{key:o,scale:x,sevenths:!1}).then(C=>({id:x,sevenths:!1,chords:C.chords})),r.send("diatonic",{key:o,scale:x,sevenths:!0}).then(C=>({id:x,sevenths:!0,chords:C.chords}))])),p={};for(let{id:x,sevenths:C,chords:T}of i)p[x]||(p[x]={triads:[],sevenths:[],intervals:Y[x]??U}),C?p[x].sevenths=T:p[x].triads=T;let u={keyRoot:o,keyName:J[o]??"C",defaultScale:d,scaleOptions:_e,scales:p},b=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(ke.replace("__PALETTE_JSON__",oe(u)))}`,510,296),y;try{y=JSON.parse(b)}catch{return}if(!y||y.action!=="insert")return;let{chordName:f,length:g,voicing:w,octave:S,selectedScale:A}=y,E=(await r.send("voicings",{name:f,octave:S}))[w].map(x=>({pitch:Math.max(0,Math.min(127,x)),startTime:0,duration:g*.95,velocity:90})),h=l.clip;if(h instanceof D)h.name=f,h.notes=E;else{let x=await l.createMidiClip(g);x.name=f,x.notes=E}console.log(`[composition-aide] Inserted ${f} (${w}, oct ${S}, ${g} beats) \u2014 ${u.keyName} ${A}`)})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("ClipSlot","Insert Chord\u2026","aide.chordPalette"),t.commands.registerCommand("aide.sessionMap",m=>{(async s=>{let l=t.application.song;if(!l)return;let n=l.tracks,v=l.scenes.map(M=>M.name),d=[];for(let M=0;M<n.length;M++){let I=n[M];if(!I)continue;let E=I.clipSlots;for(let h=0;h<E.length;h++){let x=E[h];if(!x)continue;let C=x.clip;if(!(C instanceof D))continue;let T=C.notes;T.length!==0&&d.push({trackIndex:M,trackName:I.name,sceneIndex:h,notes:T,clipName:C.name||"(unnamed)"})}}let i=d.length;if(i===0){console.log("[composition-aide] No MIDI clips with notes found in session.");return}let u=d.reduce((M,I)=>Math.max(M,I.sceneIndex),0)+1,b=[];await t.ui.withinProgressDialog(`Analyzing session \u2014 ${i} clips\u2026`,{progress:0},async(M,I)=>{let E=0;await Promise.all(d.map(async h=>{if(I.aborted)return;let x=null,C=0;try{let T=W(h.notes),O=(await Promise.all([...T.entries()].map(([N,$])=>r.send("recognize_chord",{notes:$}).then(k=>({beatKey:N,r:k}))))).sort((N,$)=>N.beatKey-$.beatKey).flatMap(({beatKey:N,r:$})=>{let k=$.matches[0];return!k||k.score<.5?[]:[{beat:N/1e3,name:k.chord.name}]}).filter((N,$,k)=>$===0||N.name!==k[$-1]?.name);if(O.length>0){let N=await r.send("analyze",{chord_names:O.map($=>$.name)});x=N.inferred_key.label,C=N.inferred_key.score}}catch(T){console.error(`[composition-aide] Could not analyze ${h.clipName}:`,T)}b.push({...h,key:x,score:C}),E++,await M(`${E} / ${i} clips\u2026`,Math.round(E/i*100))}))});let y=new Map;for(let M of b)M.key&&y.set(M.key,(y.get(M.key)??0)+1);let f=null,g=0;for(let[M,I]of y)I>g&&(g=I,f=M);let S=[...new Set(b.map(M=>M.trackIndex))].sort((M,I)=>M-I).map(M=>{let I=b.find(h=>h.trackIndex===M)?.trackName??`Track ${M+1}`,E=Array(u).fill(null);for(let h of b.filter(x=>x.trackIndex===M))E[h.sceneIndex]={clipName:h.clipName,key:h.key,score:h.score};return{name:I,clips:E}}),A={dominantKey:f,sceneCount:u,sceneNames:v.slice(0,u),totalMidiClips:i,analyzedClips:b.filter(M=>M.key!==null).length,tracks:S};await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Ie.replace("__SESSION_JSON__",oe(A)))}`,680,480),console.log(`[composition-aide] Session map: ${A.analyzedClips}/${i} clips`+(f?` \u2014 dominant key: ${f}`:""))})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("Scene","Map Session Keys\u2026","aide.sessionMap"),t.commands.registerCommand("aide.colorByKey",m=>{(async s=>{let l=t.application.song;if(!l)return;let n=[];for(let v of l.tracks)for(let d of v.clipSlots){let i=d.clip;if(!(i instanceof D))continue;let p=i.notes;p.length!==0&&n.push({clip:i,notes:p,clipName:i.name||"(unnamed)"})}if(n.length===0){console.log("[composition-aide] No MIDI clips with notes found.");return}let o=0;await t.ui.withinProgressDialog(`Coloring ${n.length} clips by key\u2026`,{progress:0},async(v,d)=>{let i=0;await Promise.all(n.map(async p=>{if(!d.aborted){try{let u=W(p.notes),y=(await Promise.all([...u.entries()].map(([f,g])=>r.send("recognize_chord",{notes:g}).then(w=>({beatKey:f,r:w}))))).sort((f,g)=>f.beatKey-g.beatKey).flatMap(({r:f})=>{let g=f.matches[0];return g&&g.score>=.5?[g.chord.name]:[]}).filter((f,g,w)=>g===0||f!==w[g-1]);if(y.length>0){let f=await r.send("analyze",{chord_names:y}),g=ne(f.inferred_key.label);g!==null&&(p.clip.color=g,o++)}}catch(u){console.error(`[composition-aide] Could not color "${p.clipName}":`,u)}i++,await v(`${i} / ${n.length} clips\u2026`,Math.round(i/n.length*100))}}))}),console.log(`[composition-aide] Colored ${o} / ${n.length} clips by key.`)})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("Scene","Color Clips by Key","aide.colorByKey"),t.commands.registerCommand("aide.generateInClip",m=>{(async s=>{let l=t.getObjectFromHandle(s,D),n=l.looping?l.loopEnd-l.loopStart:l.duration,o=n>0?n:8,v=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(le)}`,380,322),d;try{d=JSON.parse(v)}catch{return}if(!d)return;let{chords:i}=await r.send("progression",{key:d.key,scale:d.scale,template:d.template,sevenths:d.sevenths}),{voicings:p}=await r.send("voice_progression",{chords:i,strategy:d.voicing,octave:4}),u=o/i.length,b=p.flatMap((y,f)=>y.map(g=>({pitch:Math.max(0,Math.min(127,g)),startTime:f*u,duration:u*.95,velocity:90})));if(d.snapToScale){let y=Y[d.scale]??U,f=new Set(y.map(g=>(d.key+g)%12));b=b.map(g=>({...g,pitch:ce(g.pitch,f)}))}l.notes=b,l.name=`${d.template} \u2014 ${d.keyName} ${d.scale.replace(/_/g," ")}`,console.log(`[composition-aide] Generated "${l.name}": ${i.map(y=>y.name).join(" \u2013 ")} (${u.toFixed(2)} beats/chord)`)})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("MidiClip","Fill Clip with Progression\u2026","aide.generateInClip"),t.commands.registerCommand("aide.voiceLead",m=>{(async s=>{let l=t.getObjectFromHandle(s,D),n=l.notes;if(n.length===0){console.log("[composition-aide] Clip has no notes.");return}let o=W(n),d=(await Promise.all([...o.entries()].map(([w,S])=>r.send("recognize_chord",{notes:S}).then(A=>({beatKey:w,r:A}))))).sort((w,S)=>w.beatKey-S.beatKey).flatMap(({beatKey:w,r:S})=>{let A=S.matches[0];return!A||A.score<.5?[]:[{beat:w/1e3,name:A.chord.name}]}).filter((w,S,A)=>S===0||w.name!==A[S-1]?.name);if(d.length===0){console.log("[composition-aide] No chords identified in clip.");return}let i=Math.round(n.reduce((w,S)=>w+S.pitch,0)/n.length),p=Math.max(3,Math.min(6,Math.floor(i/12)-1)),{voicings:u}=await r.send("voice_progression",{chords:d.map(w=>w.name),strategy:"smooth",octave:p}),b=new Map;for(let w of n){let S=Math.round(w.startTime/.25)*.25,A=Math.round(S*1e3),M=b.get(A)??[];M.push(w),b.set(A,M)}let y=new Set(d.map(w=>Math.round(w.beat*1e3))),f=[];for(let w=0;w<d.length;w++){let S=d[w],A=u[w]??[];if(!S||A.length===0)continue;let M=Math.round(S.beat*1e3),I=b.get(M)??[],E=I.length>0?I.reduce((x,C)=>x+C.duration,0)/I.length:2,h=I.length>0?Math.round(I.reduce((x,C)=>x+(C.velocity??90),0)/I.length):90;for(let x of A)f.push({pitch:Math.max(0,Math.min(127,x)),startTime:S.beat,duration:E,velocity:h})}let g=n.filter(w=>{let S=Math.round(Math.round(w.startTime/.25)*.25*1e3);return!y.has(S)});l.notes=[...g,...f],console.log(`[composition-aide] Voice-led "${l.name||"(unnamed)"}": ${d.length} chords, octave ${p}`)})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("MidiClip","Optimize Voice Leading","aide.voiceLead"),t.commands.registerCommand("aide.snapToKey",m=>{(async s=>{let l=t.getObjectFromHandle(s,D),n=l.notes;if(n.length===0){console.log("[composition-aide] Clip has no notes.");return}let o=await G(n,r);if(!o){console.log("[composition-aide] Could not determine key for this clip.");return}let v=await r.send("scale_info",{key:o.root,scale:o.scale}),d=new Set(v.notes),i=n.filter(u=>d.has(u.pitch%12)),p=n.length-i.length;l.notes=i,console.log(`[composition-aide] Snapped "${l.name||"(unnamed)"}" to ${o.label}: removed ${p} out-of-key notes, kept ${i.length}`)})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("MidiClip","Snap to Key","aide.snapToKey"),t.commands.registerCommand("aide.batchTranspose",m=>{(async s=>{let l=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Se)}`,300,200),n;try{n=JSON.parse(l)}catch{return}if(!n||n.action!=="transpose")return;let{semitones:o}=n;if(o===0)return;let v=0;for(let d of s.selected_clip_slots){let p=t.getObjectFromHandle(d,q).clip;if(!(p instanceof D))continue;let u=p.notes;u.length!==0&&(p.notes=u.map(b=>({pitch:Math.max(0,Math.min(127,b.pitch+o)),startTime:b.startTime,duration:b.duration,velocity:b.velocity??90})),v++)}console.log(`[composition-aide] Transposed ${v} clips ${o>0?"+":""}${o} semitones`)})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("ClipSlotSelection","Transpose Selected Clips\u2026","aide.batchTranspose"),t.commands.registerCommand("aide.findCompatible",m=>{(async s=>{let l=t.getObjectFromHandle(s,D),n=l.notes;if(n.length===0){console.log("[composition-aide] Clip has no notes.");return}let o=await G(n,r);if(!o){console.log("[composition-aide] Could not determine key for reference clip.");return}let v=t.application.song;if(!v)return;let d=/minor|min\b/i.test(o.scale),i=[];for(let h of v.tracks)for(let x of h.clipSlots){let C=x.clip;if(!(C instanceof D))continue;let T=C.notes;T.length!==0&&i.push({trackName:h.name,clip:C,notes:T})}let p=[];await t.ui.withinProgressDialog("Scanning session for compatible clips\u2026",{progress:0},async(h,x)=>{let C=0;await Promise.all(i.map(async T=>{if(!x.aborted){try{let P=await G(T.notes,r);if(P){let O=/minor|min\b/i.test(P.scale),N=yt(o.root,d,P.root,O);N&&p.push({trackName:T.trackName,clipName:T.clip.name||"(unnamed)",key:P.label,compatibility:N,color:ne(P.label)??4473924})}}catch(P){console.error(`[composition-aide] Error scanning "${T.clip.name}":`,P)}C++,await h(`${C} / ${i.length} clips\u2026`,Math.round(C/i.length*100))}}))});let u=["Same key","Relative minor","Relative major","Parallel major","Parallel minor","Dominant (V)","Subdominant (IV)"];p.sort((h,x)=>{let C=u.indexOf(h.compatibility),T=u.indexOf(x.compatibility);return(C===-1?99:C)-(T===-1?99:T)});let b=[{root:o.root,scale:o.scale,label:o.label,relationship:"Same key"}],y=d?(o.root+3)%12:(o.root+9)%12;b.push({root:y,scale:d?"major":"natural_minor",label:`${J[y]??"C"} ${d?"major":"minor"}`,relationship:d?"Relative major":"Relative minor"});let f=(o.root+7)%12;b.push({root:f,scale:o.scale,label:`${J[f]??"C"} ${d?"minor":"major"}`,relationship:"Dominant (V)"});let g=(o.root+5)%12;b.push({root:g,scale:o.scale,label:`${J[g]??"C"} ${d?"minor":"major"}`,relationship:"Subdominant (IV)"});let w=["I-V-vi-IV","I-IV-V-I","ii-V-I"],S=[];await Promise.all(b.flatMap((h,x)=>(x===0?w:w.slice(0,2)).map(async T=>{try{let P=await r.send("progression",{key:h.root,scale:h.scale,template:T,sevenths:!1});S.push({relationship:h.relationship,keyLabel:h.label,template:T,chords:P.chords.map(O=>O.name),color:ne(h.label)??4473924})}catch{}})));let A=["Same key","Relative minor","Relative major","Dominant (V)","Subdominant (IV)"];S.sort((h,x)=>{let C=A.indexOf(h.relationship),T=A.indexOf(x.relationship);return(C===-1?99:C)-(T===-1?99:T)});let M={refClipName:l.name||"(unnamed)",refKey:o.label,results:p,suggestions:S},I=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Ee.replace("__COMPATIBLE_JSON__",oe(M)))}`,620,560),E=null;try{let h=JSON.parse(I);h&&typeof h.action=="string"&&(E=h)}catch{}if(E?.action==="writeProgression"){let h=E.suggestion,x=null;e:for(let C of v.tracks)if(C instanceof K){for(let T of C.clipSlots)if(T.clip===null){x=T;break e}}if(!x)console.log("[composition-aide] No empty MIDI slot found \u2014 add an empty slot to a MIDI track.");else{let T=h.chords.length*2,P=[];for(let N=0;N<h.chords.length;N++)try{let $=await r.send("voicings",{name:h.chords[N],octave:4});for(let k of $.close??[])P.push({pitch:Math.max(0,Math.min(127,k)),startTime:N*2,duration:2*.95,velocity:90})}catch{console.warn(`[composition-aide] Could not voice chord "${h.chords[N]}"`)}let O=await x.createMidiClip(T);O.notes=P,O.name=`${h.keyLabel} \xB7 ${h.template}`,O.color=h.color,console.log(`[composition-aide] Wrote "${O.name}" (${h.chords.join(" \u2013 ")}) to empty slot`)}}console.log(`[composition-aide] Found ${p.length} compatible clips for "${M.refClipName}" (${o.label})`)})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("MidiClip","Find Compatible Clips\u2026","aide.findCompatible"),t.commands.registerCommand("aide.snapToScale",m=>{(async s=>{let l=t.getObjectFromHandle(s,D),n=l.notes;if(n.length===0){console.log("[composition-aide] Clip has no notes.");return}let o=await G(n,r);if(!o){console.log("[composition-aide] Could not determine key for this clip.");return}let v=await r.send("scale_info",{key:o.root,scale:o.scale}),d=new Set(v.notes),i=0,p=n.map(u=>{let b=ce(u.pitch,d);return b!==u.pitch&&i++,{...u,pitch:b}});l.notes=p,console.log(`[composition-aide] Snapped "${l.name||"(unnamed)"}" to ${o.label}: ${i} notes adjusted, ${n.length-i} already in scale`)})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("MidiClip","Snap Notes to Scale","aide.snapToScale"),t.commands.registerCommand("aide.labelClipKey",m=>{(async s=>{let l=t.getObjectFromHandle(s,D),n=l.notes;if(n.length===0){console.log("[composition-aide] Clip has no notes.");return}let o=await G(n,r);if(!o){console.log("[composition-aide] Could not determine key for this clip.");return}let v=(l.name||"").replace(/ \[[^\]]*\]$/,"").trim(),d=v.length>0?`${v} [${ae(o.label)}]`:`[${ae(o.label)}]`;l.name=d,console.log(`[composition-aide] Labeled clip: "${d}" (${o.label})`)})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("MidiClip","Label with Key","aide.labelClipKey"),t.commands.registerCommand("aide.labelAllKeys",m=>{(async s=>{let l=t.application.song;if(!l)return;let n=[];for(let v of l.tracks)for(let d of v.clipSlots){let i=d.clip;if(!(i instanceof D))continue;let p=i.notes;p.length!==0&&n.push({clip:i,notes:p})}if(n.length===0){console.log("[composition-aide] No MIDI clips with notes found.");return}let o=0;await t.ui.withinProgressDialog(`Labeling ${n.length} clips\u2026`,{progress:0},async(v,d)=>{let i=0;await Promise.all(n.map(async p=>{if(!d.aborted){try{let u=await G(p.notes,r);if(u){let b=(p.clip.name||"").replace(/ \[[^\]]*\]$/,"").trim();p.clip.name=b.length>0?`${b} [${ae(u.label)}]`:`[${ae(u.label)}]`,o++}}catch(u){console.error(`[composition-aide] Could not label "${p.clip.name}":`,u)}i++,await v(`${i} / ${n.length} clips\u2026`,Math.round(i/n.length*100))}}))}),console.log(`[composition-aide] Labeled ${o} / ${n.length} clips with key.`)})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("Scene","Label All Clips with Key","aide.labelAllKeys"),t.commands.registerCommand("aide.transposeSession",m=>{(async s=>{let l=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(Te)}`,300,250),n;try{n=JSON.parse(l)}catch{return}if(!n||n.action!=="transpose")return;let{semitones:o,recolor:v}=n,d=t.application.song;if(!d)return;let i=[];for(let u of d.tracks)for(let b of u.clipSlots){let y=b.clip;y instanceof D&&i.push({clip:y,clipName:y.name||"(unnamed)"})}if(i.length===0){console.log("[composition-aide] No MIDI clips found in session.");return}let p=v?`Transposing + recoloring ${i.length} clips\u2026`:`Transposing ${i.length} clips\u2026`;await t.ui.withinProgressDialog(p,{progress:0},async(u,b)=>{if(o!==0){let y=0;for(let f of i){if(b.aborted)return;let g=f.clip.notes;g.length>0&&(f.clip.notes=g.map(w=>({...w,pitch:Math.max(0,Math.min(127,w.pitch+o))}))),y++,await u(`Transposing: ${y} / ${i.length}\u2026`,Math.round(v?y/i.length*50:y/i.length*100))}}if(v&&!b.aborted){let y=0,f=0;await Promise.all(i.map(async g=>{if(!b.aborted){try{let w=g.clip.notes;if(w.length===0)return;let S=W(w),M=(await Promise.all([...S.entries()].map(([I,E])=>r.send("recognize_chord",{notes:E}).then(h=>({beatKey:I,r:h}))))).sort((I,E)=>I.beatKey-E.beatKey).flatMap(({r:I})=>{let E=I.matches[0];return E&&E.score>=.5?[E.chord.name]:[]}).filter((I,E,h)=>E===0||I!==h[E-1]);if(M.length>0){let I=await r.send("analyze",{chord_names:M}),E=ne(I.inferred_key.label);E!==null&&(g.clip.color=E,y++)}}catch{}f++,await u(`Recoloring: ${f} / ${i.length}\u2026`,50+Math.round(f/i.length*50))}})),console.log(`[composition-aide] Session transposed ${o>0?"+":""}${o} semitones, ${y} clips recolored.`)}else console.log(`[composition-aide] Session transposed ${o>0?"+":""}${o} semitones.`)})})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("Scene","Transpose Session\u2026","aide.transposeSession"),t.commands.registerCommand("aide.theoryMachine",m=>{(async s=>{let l=t.getObjectFromHandle(s,q),n=t.application.song,o=n?.rootNote??0,v=Ne[n?.scaleName??"Major"]??"major",d=Ae.replace("</head>",`<script>window._INIT={key:${o},scale:${JSON.stringify(v)}};</script></head>`),i=await t.ui.showModalDialog(`data:text/html,${encodeURIComponent(d)}`,1e3,700),p;try{p=JSON.parse(i)}catch{return}if(!p||p.action!=="writeClip")return;let{chords:u,beatsPerChord:b,totalBeats:y}=p,f=u.flatMap((S,A)=>S.notes.map(M=>({pitch:Math.max(0,Math.min(127,M)),startTime:A*b,duration:b*.95,velocity:90}))),g=u.map(S=>S.name).join(" \u2013 "),w=l.clip;if(w instanceof D)w.notes=f,w.name=g;else{let S=await l.createMidiClip(y);S.notes=f,S.name=g}console.log(`[composition-aide] Theory Machine: wrote ${u.length} chords (${b} beats each) \u2014 "${g}"`)})(m).catch(s=>console.error(s))}),t.ui.registerContextMenuAction("ClipSlot","Modal Explorer\u2026","aide.theoryMachine")}0&&(module.exports={activate});

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(extension_exports);

// node_modules/@ableton-extensions/sdk/dist/index.mjs
var DataModelObject = class DataModelObject2 {
  /** @internal */
  constructor(handle, dataModel, objectRegistry) {
    this.handle = handle;
    this.dataModel = dataModel;
    this.objectRegistry = objectRegistry;
  }
  /** The canonical parent of this object in Live's object hierarchy, or `null` if it has none. */
  get parent() {
    const handle = this.dataModel.getObjectCanonicalParent(this.handle);
    return handle ? this.objectRegistry.getObjectFromHandle(handle, DataModelObject2) : null;
  }
};
var invokeAsync = (dataModel, fn, ...args) => new Promise((resolve, reject) => {
  dataModel.withinTransaction(() => fn(...args, resolve, reject));
});
var createAsync = (dataModel, registry, type, fn, ...args) => new Promise((resolve, reject) => {
  dataModel.withinTransaction(() => fn(...args, (handle) => resolve(registry.getObjectFromHandle(handle, type)), reject));
});
var Clip = class extends DataModelObject {
  static className = "Clip";
  get name() {
    return this.dataModel.clipGetName(this.handle);
  }
  set name(name) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.clipSetName(this.handle, name);
    });
  }
  get startTime() {
    return this.dataModel.clipGetStartTime(this.handle);
  }
  get endTime() {
    return this.dataModel.clipGetEndTime(this.handle);
  }
  get duration() {
    return this.dataModel.clipGetEndTime(this.handle) - this.dataModel.clipGetStartTime(this.handle);
  }
  get startMarker() {
    return this.dataModel.clipGetStartMarker(this.handle);
  }
  get endMarker() {
    return this.dataModel.clipGetEndMarker(this.handle);
  }
  /**
  * Whether the clip is looped. Enabling looping on an unwarped audio clip
  * automatically enables warping.
  */
  get looping() {
    return this.dataModel.clipGetLooping(this.handle);
  }
  set looping(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.clipSetLooping(this.handle, value);
    });
  }
  get loopStart() {
    return this.dataModel.clipGetLoopStart(this.handle);
  }
  get loopEnd() {
    return this.dataModel.clipGetLoopEnd(this.handle);
  }
  get color() {
    return this.dataModel.clipGetColor(this.handle);
  }
  set color(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.clipSetColor(this.handle, value);
    });
  }
  get muted() {
    return this.dataModel.clipGetMuted(this.handle);
  }
  set muted(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.clipSetMuted(this.handle, value);
    });
  }
};
var AudioClip = class extends Clip {
  static className = "AudioClip";
  get filePath() {
    return this.dataModel.audioclipGetFilePath(this.handle);
  }
  get warping() {
    return this.dataModel.audioclipGetWarping(this.handle);
  }
  set warping(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.audioclipSetWarping(this.handle, value);
    });
  }
  get warpMode() {
    return this.dataModel.audioclipGetWarpMode(this.handle);
  }
  set warpMode(warpMode) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.audioclipSetWarpMode(this.handle, warpMode);
    });
  }
  get warpMarkers() {
    return this.dataModel.audioclipGetWarpMarkers(this.handle);
  }
};
var MidiClip = class extends Clip {
  static className = "MidiClip";
  get notes() {
    return this.dataModel.midiclipGetNotes(this.handle);
  }
  set notes(notes) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.midiclipSetNotes(this.handle, notes);
    });
  }
};
var ClipSlot = class extends DataModelObject {
  static className = "ClipSlot";
  get clip() {
    const handle = this.dataModel.clipslotGetClip(this.handle);
    return handle ? this.objectRegistry.getObjectFromHandle(handle, Clip) : null;
  }
  /**
  * Deletes the clip in this slot. Await the returned promise to ensure the
  * deletion has been fully processed.
  */
  deleteClip() {
    return invokeAsync(this.dataModel, this.dataModel.clipslotDeleteClip, this.handle);
  }
  /** @param length - Length of the clip in beats. */
  createMidiClip(length) {
    return createAsync(this.dataModel, this.objectRegistry, MidiClip, this.dataModel.clipslotCreateMidiClip, this.handle, length);
  }
  /**
  * Creates an audio clip in this session slot.
  *
  * @param args.filePath - Absolute path to the audio file.
  * @param args.isWarped - See {@link AudioTrack.createAudioClip}.
  * @param args.loopSettings - See {@link AudioTrack.createAudioClip}.
  */
  createAudioClip(args) {
    return createAsync(this.dataModel, this.objectRegistry, AudioClip, this.dataModel.clipslotCreateAudioClip, this.handle, {
      filePath: args.filePath,
      isWarped: args.isWarped,
      loopSettings: args.loopSettings
    });
  }
};
var DeviceParameter = class extends DataModelObject {
  static className = "DeviceParameter";
  get name() {
    return this.dataModel.deviceParameterGetName(this.handle);
  }
  get min() {
    return this.dataModel.deviceParameterGetInternalMin(this.handle);
  }
  get max() {
    return this.dataModel.deviceParameterGetInternalMax(this.handle);
  }
  get isQuantized() {
    return this.dataModel.deviceParameterGetIsQuantized(this.handle);
  }
  get defaultValue() {
    return this.dataModel.deviceParameterGetDefaultValue(this.handle);
  }
  get valueItems() {
    return this.dataModel.deviceParameterGetValueItems(this.handle);
  }
  getValue() {
    return new Promise((resolve) => {
      this.dataModel.deviceParameterGetInternalValue(this.handle, resolve);
    });
  }
  setValue(value) {
    return new Promise((resolve, reject) => {
      this.dataModel.withinTransaction(() => {
        this.dataModel.deviceParameterSetInternalValue(this.handle, value, resolve, (error) => reject(new Error(error)));
      });
    });
  }
};
var Device = class extends DataModelObject {
  static className = "Device";
  get name() {
    return this.dataModel.deviceGetName(this.handle);
  }
  get parameters() {
    return this.dataModel.deviceGetParameters(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, DeviceParameter));
  }
};
var TakeLane = class extends DataModelObject {
  static className = "TakeLane";
  get clips() {
    return this.dataModel.takelaneGetClips(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, Clip));
  }
  get name() {
    return this.dataModel.takelaneGetName(this.handle);
  }
  set name(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.takelaneSetName(this.handle, value);
    });
  }
  /**
  * @param startTime - Position in the arrangement in beats.
  * @param duration - Length of the clip in beats.
  */
  createMidiClip(startTime, duration) {
    return createAsync(this.dataModel, this.objectRegistry, MidiClip, this.dataModel.takelaneCreateMidiClip, this.handle, startTime, duration);
  }
  /**
  * Creates an audio clip on this take lane. See {@link AudioTrack.createAudioClip}
  * for argument semantics.
  */
  createAudioClip(args) {
    return createAsync(this.dataModel, this.objectRegistry, AudioClip, this.dataModel.takelaneCreateAudioClip, this.handle, {
      duration: args.duration,
      filePath: args.filePath,
      isWarped: args.isWarped,
      loopSettings: args.loopSettings,
      startTime: args.startTime
    });
  }
};
var TrackMixer = class extends DataModelObject {
  static className = "MixerDevice";
  get volume() {
    return this.objectRegistry.getObjectFromHandle(this.dataModel.mixerdeviceGetVolume(this.handle), DeviceParameter);
  }
  get panning() {
    return this.objectRegistry.getObjectFromHandle(this.dataModel.mixerdeviceGetPanning(this.handle), DeviceParameter);
  }
  get sends() {
    return this.dataModel.mixerdeviceGetSends(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, DeviceParameter));
  }
};
var Track = class Track2 extends DataModelObject {
  static className = "Track";
  get name() {
    return this.dataModel.trackGetName(this.handle);
  }
  set name(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.trackSetName(this.handle, value);
    });
  }
  get mute() {
    return this.dataModel.trackGetMute(this.handle);
  }
  set mute(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.trackSetMute(this.handle, value);
    });
  }
  get solo() {
    return this.dataModel.trackGetSolo(this.handle);
  }
  set solo(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.trackSetSolo(this.handle, value);
    });
  }
  get mutedViaSolo() {
    return this.dataModel.trackGetMutedViaSolo(this.handle);
  }
  get arm() {
    return this.dataModel.trackGetArm(this.handle);
  }
  set arm(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.trackSetArm(this.handle, value);
    });
  }
  get clipSlots() {
    return this.dataModel.trackGetClipSlots(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, ClipSlot));
  }
  get takeLanes() {
    return this.dataModel.trackGetTakeLanes(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, TakeLane));
  }
  get arrangementClips() {
    return this.dataModel.trackGetArrangementClips(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, Clip));
  }
  get groupTrack() {
    const handle = this.dataModel.trackGetGroupTrack(this.handle);
    return handle ? this.objectRegistry.getObjectFromHandle(handle, Track2) : null;
  }
  get devices() {
    return this.dataModel.trackGetDevices(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, Device));
  }
  get mixer() {
    return this.objectRegistry.getObjectFromHandle(this.dataModel.trackGetMixerDevice(this.handle), TrackMixer);
  }
  /** Appended to the end of {@link takeLanes}. */
  createTakeLane() {
    return createAsync(this.dataModel, this.objectRegistry, TakeLane, this.dataModel.trackCreateTakeLane, this.handle);
  }
  /**
  * Inserts a built-in Live device with its default preset into the track's device chain.
  * Only devices native to Live are supported — third-party plug-ins cannot be loaded this way.
  *
  * @param deviceName - The name of the built-in Live device (e.g. `"Reverb"`, `"Auto Filter"`).
  * @param index - Zero-based position in the device chain at which to insert.
  */
  insertDevice(deviceName, index) {
    return createAsync(this.dataModel, this.objectRegistry, Device, this.dataModel.trackInsertDevice, this.handle, deviceName, BigInt(index));
  }
  /**
  * Deletes a device from this track's device chain. Await the returned
  * promise to ensure the deletion has been fully processed.
  */
  deleteDevice(device) {
    return invokeAsync(this.dataModel, this.dataModel.trackDeleteDevice, this.handle, device.handle);
  }
  /** The duplicate is inserted directly after the original in the device chain. */
  duplicateDevice(device) {
    return createAsync(this.dataModel, this.objectRegistry, Device, this.dataModel.trackDuplicateDevice, this.handle, device.handle);
  }
  /**
  * Deletes an arrangement clip. For session clips, use {@link ClipSlot.deleteClip}.
  * Await the returned promise to ensure the deletion has been fully processed.
  */
  deleteClip(clip) {
    return invokeAsync(this.dataModel, this.dataModel.trackDeleteClip, this.handle, clip.handle);
  }
  /**
  * Deletes clips within the range. Clips that overlap a boundary are truncated
  * to the range edge rather than fully deleted.
  *
  * @param startTime - Start of the range in beats.
  * @param endTime - End of the range in beats.
  */
  clearClipsInRange(startTime, endTime) {
    return invokeAsync(this.dataModel, this.dataModel.trackClearClipsInRange, this.handle, startTime, endTime);
  }
};
var AudioTrack = class extends Track {
  static className = "AudioTrack";
  /**
  * Creates an audio clip from a file in the track's arrangement timeline.
  *
  * @param args.filePath - Absolute path to the audio file.
  * @param args.startTime - Position in the arrangement timeline in beats.
  * @param args.duration - Length of the clip on the arrangement timeline,
  *   in beats. Capped at the sample's natural length for non-looping clips;
  *   looping clips repeat to fill the full length. Defaults to the sample's
  *   natural length at the current tempo when omitted.
  * @param args.isWarped - Whether warping is enabled. Defaults to the clip's
  *   saved `.asd` settings if present, otherwise Live's "Auto-Warp" preference.
  *   Must be provided when `loopSettings` is provided.
  * @param args.loopSettings - Initial loop settings. Requires `isWarped` to be
  *   defined. If `isWarped` is `false`, `loopSettings.looping` must be `false`.
  *
  * @example
  * const clip = await track.createAudioClip({ filePath: '/samples/kick.wav', startTime: 0 });
  *
  * @example
  * const clip = await track.createAudioClip({
  *   filePath: '/samples/ambient.wav',
  *   startTime: 16,
  *   isWarped: false,
  * });
  *
  * @example
  * // Clip view: Start=beat 0, End=beat 2, Loop position=beat 0, Loop length=1 beat.
  * const clip = await track.createAudioClip({
  *   filePath: '/samples/loop.wav',
  *   startTime: 0,
  *   isWarped: true,
  *   loopSettings: { looping: true, startMarker: 0, endMarker: 2, loopStart: 0, loopEnd: 1 },
  * });
  *
  * @example
  * const clip = await track.createAudioClip({
  *   filePath: '/samples/loop.wav',
  *   startTime: 0,
  *   isWarped: true,
  *   duration: 8,
  *   loopSettings: { looping: true, startMarker: 0, endMarker: 2, loopStart: 0, loopEnd: 2 },
  * });
  */
  createAudioClip(args) {
    return createAsync(this.dataModel, this.objectRegistry, AudioClip, this.dataModel.trackCreateAudioClip, this.handle, {
      duration: args.duration,
      filePath: args.filePath,
      isWarped: args.isWarped,
      loopSettings: args.loopSettings,
      startTime: args.startTime
    });
  }
};
var CuePoint = class extends DataModelObject {
  static className = "CuePoint";
  get time() {
    return this.dataModel.cuePointGetTime(this.handle);
  }
  get name() {
    return this.dataModel.cuePointGetName(this.handle);
  }
  set name(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.cuePointSetName(this.handle, value);
    });
  }
};
var MidiTrack = class extends Track {
  static className = "MidiTrack";
  /**
  * @param startTime - Position in the arrangement in beats.
  * @param duration - Length of the clip in beats.
  */
  createMidiClip(startTime, duration) {
    return createAsync(this.dataModel, this.objectRegistry, MidiClip, this.dataModel.trackCreateMidiClip, this.handle, startTime, duration);
  }
};
var Scene = class extends DataModelObject {
  static className = "Scene";
  get name() {
    return this.dataModel.sceneGetName(this.handle);
  }
  set name(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.sceneSetName(this.handle, value);
    });
  }
  get tempo() {
    return this.dataModel.sceneGetTempo(this.handle);
  }
  get signatureNumerator() {
    return this.dataModel.sceneGetSignatureNumerator(this.handle);
  }
  get signatureDenominator() {
    return this.dataModel.sceneGetSignatureDenominator(this.handle);
  }
};
var Song = class extends DataModelObject {
  static className = "Song";
  /** Regular tracks only — excludes return tracks and the main track. */
  get tracks() {
    return this.dataModel.songGetTracks(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, Track));
  }
  get returnTracks() {
    return this.dataModel.songGetReturnTracks(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, Track));
  }
  get mainTrack() {
    return this.objectRegistry.getObjectFromHandle(this.dataModel.songGetMainTrack(this.handle), Track);
  }
  get scenes() {
    return this.dataModel.songGetScenes(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, Scene));
  }
  get cuePoints() {
    return this.dataModel.songGetCuePoints(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, CuePoint));
  }
  get tempo() {
    return this.dataModel.songGetTempo(this.handle);
  }
  set tempo(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.songSetTempo(this.handle, value);
    });
  }
  /**
  * The current arrangement grid quantization. Use with {@link gridIsTriplet} to
  * determine the full grid setting.
  */
  get gridQuantization() {
    return this.dataModel.songGetGridQuantization(this.handle);
  }
  /**
  * Whether the arrangement grid uses triplet subdivisions of the current
  * {@link gridQuantization} value.
  */
  get gridIsTriplet() {
    return this.dataModel.songGetGridIsTriplet(this.handle);
  }
  /**
  * The root note of the scale currently selected in Live, as a MIDI note number
  * from 0 (C) to 11 (B).
  */
  get rootNote() {
    return Number(this.dataModel.songGetRootNote(this.handle));
  }
  /** The name of the scale selected in Live, as shown in the Current Scale Name chooser. */
  get scaleName() {
    return this.dataModel.songGetScaleName(this.handle);
  }
  /** Whether Live's Scale Mode is enabled. */
  get scaleMode() {
    return this.dataModel.songGetScaleMode(this.handle);
  }
  /** The intervals of the current scale as semitone offsets from the root note. */
  get scaleIntervals() {
    return this.dataModel.songGetScaleIntervals(this.handle).map(Number);
  }
  /** Inserted after the last selected track, or appended if no track is selected. */
  createAudioTrack() {
    return createAsync(this.dataModel, this.objectRegistry, AudioTrack, this.dataModel.songCreateAudioTrack, this.handle);
  }
  /** Inserted after the last selected track, or appended if no track is selected. */
  createMidiTrack() {
    return createAsync(this.dataModel, this.objectRegistry, MidiTrack, this.dataModel.songCreateMidiTrack, this.handle);
  }
  /**
  * @param index - 0-based insert position in the range `[0, song.scenes.length]`.
  * Pass `-1` to append at the end.
  */
  createScene(index) {
    return createAsync(this.dataModel, this.objectRegistry, Scene, this.dataModel.songCreateScene, this.handle, BigInt(index));
  }
  /**
  * Deletes a track from the song. Await the returned promise to ensure the
  * deletion has been fully processed.
  */
  deleteTrack(track) {
    return invokeAsync(this.dataModel, this.dataModel.songDeleteTrack, this.handle, track.handle);
  }
  /**
  * Deletes a scene from the song. Await the returned promise to ensure the
  * deletion has been fully processed.
  */
  deleteScene(scene) {
    return invokeAsync(this.dataModel, this.dataModel.songDeleteScene, this.handle, scene.handle);
  }
  /** Duplicates the track. The duplicate is inserted immediately after the original. */
  duplicateTrack(track) {
    return createAsync(this.dataModel, this.objectRegistry, Track, this.dataModel.songDuplicateTrack, this.handle, track.handle);
  }
  /** Duplicates the scene. The duplicate is inserted immediately after the original. */
  duplicateScene(scene) {
    return createAsync(this.dataModel, this.objectRegistry, Scene, this.dataModel.songDuplicateScene, this.handle, scene.handle);
  }
  /** @param time - Position in the arrangement in beats. */
  createCuePoint(time) {
    return createAsync(this.dataModel, this.objectRegistry, CuePoint, this.dataModel.songCreateCuePoint, this.handle, time);
  }
  /**
  * Deletes a cue point from the song. Await the returned promise to ensure
  * the deletion has been fully processed.
  */
  deleteCuePoint(cuePoint) {
    return invokeAsync(this.dataModel, this.dataModel.songDeleteCuePoint, this.handle, cuePoint.handle);
  }
};
var Application = class extends DataModelObject {
  static className = "Application";
  get song() {
    return this.objectRegistry.getObjectFromHandle(this.dataModel.rootGetSong(this.handle), Song);
  }
};
var Commands = class {
  module;
  /** @internal */
  constructor(module2) {
    this.module = module2;
  }
  /**
  * Registers a command that can be invoked by Live or via {@link Commands.executeCommand}.
  *
  * @param commandId - A unique string identifier for this command.
  * @param callback - Called when the command is invoked. May receive arguments passed by the invoker.
  */
  registerCommand(commandId, callback) {
    this.module.registerCommand(commandId, callback);
  }
  /**
  * Programmatically invokes a registered command.
  *
  * @param commandId - The ID of the command to invoke.
  * @param args - Arguments to pass to the command's callback.
  */
  executeCommand(commandId, ...args) {
    this.module.executeCommand(commandId, ...args);
  }
};
var ChainMixer = class extends DataModelObject {
  static className = "ChainMixerDevice";
  get volume() {
    return this.objectRegistry.getObjectFromHandle(this.dataModel.chainmixerdeviceGetVolume(this.handle), DeviceParameter);
  }
  get panning() {
    return this.objectRegistry.getObjectFromHandle(this.dataModel.chainmixerdeviceGetPanning(this.handle), DeviceParameter);
  }
  get sends() {
    return this.dataModel.chainmixerdeviceGetSends(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, DeviceParameter));
  }
};
var Chain = class extends DataModelObject {
  static className = "Chain";
  get devices() {
    return this.dataModel.chainGetDevices(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, Device));
  }
  get mixer() {
    return this.objectRegistry.getObjectFromHandle(this.dataModel.chainGetMixerDevice(this.handle), ChainMixer);
  }
  /**
  * Inserts a built-in Live device with its default preset into the chain.
  * Only devices native to Live are supported — third-party plug-ins cannot be loaded this way.
  *
  * @param deviceName - The name of the built-in Live device (e.g. `"Reverb"`, `"Auto Filter"`).
  * @param index - Zero-based position in the device chain at which to insert.
  */
  insertDevice(deviceName, index) {
    return createAsync(this.dataModel, this.objectRegistry, Device, this.dataModel.chainInsertDevice, this.handle, deviceName, BigInt(index));
  }
  /**
  * Deletes a device from this chain. Await the returned promise to ensure
  * the deletion has been fully processed.
  */
  deleteDevice(device) {
    return invokeAsync(this.dataModel, this.dataModel.chainDeleteDevice, this.handle, device.handle);
  }
  /** The duplicate is inserted directly after the original in the device chain. */
  duplicateDevice(device) {
    return createAsync(this.dataModel, this.objectRegistry, Device, this.dataModel.chainDuplicateDevice, this.handle, device.handle);
  }
};
var DrumChain = class extends Chain {
  static className = "DrumChain";
  get receivingNote() {
    return Number(this.dataModel.drumchainGetReceivingNote(this.handle));
  }
  set receivingNote(value) {
    this.dataModel.withinTransaction(() => {
      this.dataModel.drumchainSetReceivingNote(this.handle, BigInt(value));
    });
  }
};
var RackDevice = class extends Device {
  static className = "RackDevice";
  get chains() {
    return this.dataModel.rackdeviceGetChains(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, Chain));
  }
  /** @param index - 0-based insert position in the range `[0, rack.chains.length]`. */
  insertChain(index) {
    return createAsync(this.dataModel, this.objectRegistry, Chain, this.dataModel.rackdeviceInsertChain, this.handle, BigInt(index));
  }
};
var DrumRack = class extends RackDevice {
  static className = "DrumRackDevice";
  get chains() {
    return this.dataModel.rackdeviceGetChains(this.handle).map((handle) => this.objectRegistry.getObjectFromHandle(handle, DrumChain));
  }
};
var Sample = class extends DataModelObject {
  static className = "Sample";
  get filePath() {
    return this.dataModel.sampleGetFilePath(this.handle);
  }
};
var Simpler = class extends Device {
  static className = "Simpler";
  get sample() {
    const handle = this.dataModel.simplerGetSample(this.handle);
    return handle ? this.objectRegistry.getObjectFromHandle(handle, Sample) : null;
  }
  /** Replaces the loaded sample with the audio file at the given absolute path. */
  replaceSample(filePath) {
    return createAsync(this.dataModel, this.objectRegistry, Sample, this.dataModel.simplerReplaceSample, this.handle, filePath);
  }
};
var dataModelClasses = [
  Application,
  Song,
  AudioTrack,
  MidiTrack,
  Track,
  AudioClip,
  MidiClip,
  Clip,
  ClipSlot,
  TakeLane,
  Simpler,
  DrumRack,
  RackDevice,
  Device,
  Sample,
  DrumChain,
  Chain,
  Scene,
  CuePoint,
  DeviceParameter,
  TrackMixer,
  ChainMixer
];
var DataModelObjectRegistry = class {
  cache = /* @__PURE__ */ new Map();
  dataModel;
  /** @internal */
  constructor(dataModel) {
    this.dataModel = dataModel;
  }
  getOrCreateObjectFromHandle(handle) {
    const cached = this.cache.get(handle.id);
    if (cached) return cached;
    const ModelClass = dataModelClasses.find((cls) => this.dataModel.getObjectIsOfClass(handle, cls.className));
    if (!ModelClass) throw new Error("Unknown object type");
    const obj = new ModelClass(handle, this.dataModel, this);
    this.cache.set(handle.id, obj);
    return obj;
  }
  /**
  * Resolves a {@link Handle} into a typed SDK object.
  *
  * Pass {@link DataModelObject} as `type` when the exact type of the handle is not known
  * in advance, then use `instanceof` to branch on the actual type:
  *
  * ```ts
  * const obj = objects.getObjectFromHandle(handle, DataModelObject);
  * if (obj instanceof ClipSlot) {
  *   // ...
  * }
  * ```
  *
  * Throws if the underlying object has been deleted, if it is of a different
  * type than `type`, or if its type is not recognised.
  *
  * @param handle - The handle to resolve.
  * @param type - The expected SDK class (e.g. `ClipSlot`).
  */
  getObjectFromHandle(handle, type) {
    const obj = this.getOrCreateObjectFromHandle(handle);
    if (!(obj instanceof type)) throw new Error("Object of incorrect type");
    return obj;
  }
};
var Environment = class {
  module;
  /** @internal */
  constructor(module2) {
    this.module = module2;
  }
  /**
  * Per-extension directory for persistent storage. Use it for configuration, credentials,
  * and cached state — anything that should survive across Live sessions.
  */
  get storageDirectory() {
    return this.module.storageDirectory;
  }
  /**
  * Per-extension directory for temporary files, such as intermediate audio or analysis
  * results. May be cleaned up between sessions.
  */
  get tempDirectory() {
    return this.module.tempDirectory;
  }
  /** Live's current UI language as an uppercase ISO 639-1 code (e.g. `"EN"`, `"DE"`, `"JA"`). */
  get language() {
    return this.module.language;
  }
};
var Resources = class {
  module;
  /** @internal */
  constructor(module2) {
    this.module = module2;
  }
  /**
  * Renders the pre-effects audio of a track in the arrangement between two beat
  * positions. Returns a path to a WAV file written to the extension's temp directory.
  */
  renderPreFxAudio(track, startTime, endTime) {
    return new Promise((resolve, reject) => {
      this.module.renderPreFxAudio(track.handle, {
        endTime,
        startTime
      }, resolve, reject);
    });
  }
  /**
  * Copies a file into the Live project folder so that Live manages it.
  * Returns the path to the imported copy. Use the returned path in subsequent API
  * calls, not the original.
  */
  importIntoProject(filePath) {
    return new Promise((resolve, reject) => {
      this.module.importIntoProject(filePath, resolve, reject);
    });
  }
};
var toProgressOptions = (text, progress) => typeof progress === "number" ? {
  progress,
  text
} : { text };
var Ui = class {
  module;
  /** @internal */
  constructor(module2) {
    this.module = module2;
  }
  /**
  * Registers a context menu action in the given {@link ContextMenuScope}.
  *
  * When the user triggers the action, Live invokes the command identified by
  * `commandId`. Depending on the scope, the command receives either the triggered
  * object's {@link Handle}, an {@link ArrangementSelection}, or a
  * {@link ClipSlotSelection} as its first argument.
  *
  * Returns a function that unregisters the action when called.
  */
  registerContextMenuAction(scope, title, commandId) {
    return new Promise((resolve) => {
      this.module.registerContextMenuAction(scope, title, commandId, (unregister) => {
        resolve(() => new Promise((done) => {
          unregister(done);
        }));
      });
    });
  }
  /**
  * Opens a modal dialog that loads the given URL. Supported URL schemes are
  * `file:`, `data:`, `https:`, and `http://localhost`.
  *
  * To return a result and close the dialog, the dialog's HTML must post the message
  * `{ method: "close_and_send", params: [resultString] }` to the host's message
  * handler — `window.webkit.messageHandlers.live.postMessage` on macOS or
  * `window.chrome.webview.postMessage` on Windows. The returned promise resolves
  * with that string.
  *
  * Rejects if `url` is malformed or an unexpected error occurred.
  */
  showModalDialog(url, width, height) {
    return new Promise((resolve, reject) => {
      this.module.showModalDialog(url, width, height, resolve, reject);
    });
  }
  /**
  * Shows a progress dialog while `callback` runs.
  * The callback receives an `update` function to change the text/progress
  * (progress is a percentage, 0–100), and an `AbortSignal` that fires if
  * the user cancels the dialog.
  * The dialog closes automatically when the callback resolves or rejects.
  *
  * @example
  * ```ts
  * const wavPath = await ui.withinProgressDialog(
  *   "Rendering audio…",
  *   { progress: 0 },
  *   async (update, signal) => {
  *     await update("Analysing…", 30);
  *     if (signal.aborted) return;
  *     await update("Rendering…", 70);
  *     return await resources.renderPreFxAudio(track, startBeat, endBeat);
  *   },
  * );
  * ```
  */
  withinProgressDialog(text, options, callback) {
    const ac = new AbortController();
    return new Promise((resolve, reject) => {
      this.module.showProgressDialog(toProgressOptions(text, options.progress), ({ update, close }) => {
        const asyncUpdate = (updateText, progress) => new Promise((resolveUpdate) => {
          update(toProgressOptions(updateText, progress), resolveUpdate);
        });
        const asyncClose = () => new Promise((done) => {
          close(done);
        });
        callback(asyncUpdate, ac.signal).finally(asyncClose).then(resolve).catch(reject);
      }, () => {
        ac.abort();
      });
    });
  }
};
var initialize = (context, apiVersion) => {
  const { commands, dataModel, environment, resources, ui } = context.initializeExtensionHost({ apiVersion });
  const objectRegistry = new DataModelObjectRegistry(dataModel);
  return {
    application: objectRegistry.getObjectFromHandle(dataModel.getRoot(), Application),
    commands: new Commands(commands),
    environment: new Environment(environment),
    getObjectFromHandle: objectRegistry.getObjectFromHandle.bind(objectRegistry),
    resources: new Resources(resources),
    ui: new Ui(ui),
    withinTransaction: dataModel.withinTransaction.bind(dataModel)
  };
};

// src/engine.ts
var import_node_child_process = require("node:child_process");
var ChordgenEngine = class {
  constructor(cwd, pythonCmd = "python") {
    this.cwd = cwd;
    this.pythonCmd = pythonCmd;
  }
  cwd;
  pythonCmd;
  proc = null;
  buffer = "";
  pending = /* @__PURE__ */ new Map();
  nextId = 1;
  getProcess() {
    if (this.proc) return this.proc;
    const proc = (0, import_node_child_process.spawn)(this.pythonCmd, ["-u", "-m", "chordgen.server"], {
      cwd: this.cwd,
      stdio: ["pipe", "pipe", "pipe"],
      // PYTHONDONTWRITEBYTECODE: the bundled engine dir may not be writable
      // under the extension sandbox, so keep Python from writing __pycache__.
      // PYTHONUTF8: we write UTF-8 to stdin but Python defaults stdio to
      // cp1252 on Windows, which garbles non-ASCII input like "iiø7" or "♭".
      env: { ...process.env, PYTHONDONTWRITEBYTECODE: "1", PYTHONUTF8: "1" }
    });
    proc.stdout.on("data", (chunk) => {
      this.buffer += chunk.toString("utf8");
      let nl;
      while ((nl = this.buffer.indexOf("\n")) !== -1) {
        const line = this.buffer.slice(0, nl).trim();
        this.buffer = this.buffer.slice(nl + 1);
        if (!line) continue;
        let msg;
        try {
          msg = JSON.parse(line);
        } catch {
          continue;
        }
        const id = msg["id"];
        if (id === void 0) continue;
        const pending = this.pending.get(id);
        if (!pending) continue;
        this.pending.delete(id);
        if ("error" in msg) {
          pending.reject(new Error(String(msg["error"])));
        } else {
          pending.resolve(msg["result"]);
        }
      }
    });
    proc.stderr.on("data", (chunk) => {
      console.error(`[chordgen] ${chunk.toString("utf8").trimEnd()}`);
    });
    proc.on("error", (err) => {
      console.error(`[chordgen] failed to start: ${err.message}`);
      this.drainPending(err);
      this.proc = null;
    });
    proc.on("exit", (code) => {
      if (code !== 0 && code !== null) {
        console.error(`[chordgen] process exited with code ${code}`);
      }
      this.drainPending(new Error(`chordgen process exited (code ${code})`));
      this.proc = null;
    });
    this.proc = proc;
    return proc;
  }
  drainPending(err) {
    for (const [, pending] of this.pending) pending.reject(err);
    this.pending.clear();
  }
  send(op, params = {}) {
    const proc = this.getProcess();
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, {
        resolve: (v) => resolve(v),
        reject
      });
      proc.stdin.write(JSON.stringify({ op, id, ...params }) + "\n");
    });
  }
  dispose() {
    this.proc?.kill();
    this.proc = null;
  }
};

// src/extension.ts
var path = __toESM(require("node:path"), 1);

// src/interface.html
var interface_default = `<!DOCTYPE html>
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
`;

// src/results.html
var results_default = `<!DOCTYPE html>
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
`;

// src/palette.html
var palette_default = `<!DOCTYPE html>
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
`;

// src/sessionmap.html
var sessionmap_default = `<!DOCTYPE html>
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
`;

// src/transpose.html
var transpose_default = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<script>\n  const isWebKit = window.webkit?.messageHandlers?.live;\n  const isWebView2 = window.chrome?.webview;\n  function closeWithResult(result) {\n    const msg = { method: "close_and_send", params: [JSON.stringify(result)] };\n    if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);\n    else if (isWebView2) window.chrome.webview.postMessage(msg);\n  }\n</script>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n    font-size: 13px;\n    background: #1e1e1e;\n    color: #d4d4d4;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 100vh;\n    gap: 16px;\n    padding: 16px;\n  }\n  h2 { font-size: 14px; font-weight: 600; color: #e0e0e0; }\n  .row {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n  button.adj {\n    width: 28px; height: 28px;\n    background: #3a3a3a;\n    border: 1px solid #555;\n    border-radius: 4px;\n    color: #d4d4d4;\n    font-size: 18px;\n    cursor: pointer;\n    line-height: 1;\n  }\n  button.adj:hover { background: #4a4a4a; }\n  #display {\n    width: 56px;\n    text-align: center;\n    font-size: 20px;\n    font-weight: 700;\n    color: #fff;\n    background: #2a2a2a;\n    border: 1px solid #555;\n    border-radius: 4px;\n    padding: 4px 0;\n  }\n  .presets {\n    display: flex;\n    gap: 6px;\n    flex-wrap: wrap;\n    justify-content: center;\n  }\n  button.preset {\n    padding: 3px 10px;\n    background: #2a2a2a;\n    border: 1px solid #555;\n    border-radius: 4px;\n    color: #bbb;\n    font-size: 11px;\n    cursor: pointer;\n  }\n  button.preset:hover { background: #3a3a3a; color: #fff; }\n  .actions { display: flex; gap: 8px; margin-top: 4px; }\n  button.primary {\n    padding: 6px 22px;\n    background: #0e639c;\n    border: none;\n    border-radius: 4px;\n    color: #fff;\n    font-size: 13px;\n    cursor: pointer;\n    font-weight: 600;\n  }\n  button.primary:hover { background: #1177bb; }\n  button.cancel {\n    padding: 6px 16px;\n    background: #3a3a3a;\n    border: 1px solid #555;\n    border-radius: 4px;\n    color: #ccc;\n    font-size: 13px;\n    cursor: pointer;\n  }\n  button.cancel:hover { background: #4a4a4a; }\n</style>\n</head>\n<body>\n<h2>Batch Transpose</h2>\n<div class="row">\n  <button class="adj" id="down">\u2212</button>\n  <div id="display">0</div>\n  <button class="adj" id="up">+</button>\n</div>\n<div class="presets">\n  <button class="preset" data-v="-12">\u221212</button>\n  <button class="preset" data-v="-7">\u22127</button>\n  <button class="preset" data-v="-5">\u22125</button>\n  <button class="preset" data-v="-2">\u22122</button>\n  <button class="preset" data-v="-1">\u22121</button>\n  <button class="preset" data-v="1">+1</button>\n  <button class="preset" data-v="2">+2</button>\n  <button class="preset" data-v="5">+5</button>\n  <button class="preset" data-v="7">+7</button>\n  <button class="preset" data-v="12">+12</button>\n</div>\n<div class="actions">\n  <button class="cancel" id="cancelBtn">Cancel</button>\n  <button class="primary" id="transposeBtn">Transpose</button>\n</div>\n<script>\n  let semitones = 0;\n  const display = document.getElementById("display");\n  function update() {\n    display.textContent = semitones > 0 ? "+" + semitones : String(semitones);\n    display.style.color = semitones === 0 ? "#888" : semitones > 0 ? "#7ec8e3" : "#f28b82";\n  }\n  document.getElementById("up").addEventListener("click", () => { if (semitones < 24) { semitones++; update(); } });\n  document.getElementById("down").addEventListener("click", () => { if (semitones > -24) { semitones--; update(); } });\n  document.querySelectorAll(".preset").forEach(btn => {\n    btn.addEventListener("click", () => { semitones = parseInt(btn.dataset.v, 10); update(); });\n  });\n  document.getElementById("transposeBtn").addEventListener("click", () => {\n    if (semitones === 0) { closeWithResult(null); return; }\n    closeWithResult({ action: "transpose", semitones });\n  });\n  document.getElementById("cancelBtn").addEventListener("click", () => closeWithResult(null));\n</script>\n</body>\n</html>\n';

// src/compatible.html
var compatible_default = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<script>\n  const isWebKit = window.webkit?.messageHandlers?.live;\n  const isWebView2 = window.chrome?.webview;\n  function closeWithResult(result) {\n    const msg = { method: "close_and_send", params: [JSON.stringify(result)] };\n    if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);\n    else if (isWebView2) window.chrome.webview.postMessage(msg);\n  }\n</script>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n    font-size: 13px;\n    background: #1e1e1e;\n    color: #d4d4d4;\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    overflow: hidden;\n  }\n  header {\n    padding: 12px 16px 10px;\n    border-bottom: 1px solid #333;\n    flex-shrink: 0;\n  }\n  header h2 { font-size: 14px; font-weight: 600; color: #e0e0e0; }\n  header p { font-size: 11px; color: #888; margin-top: 3px; }\n  .list-wrap {\n    flex: 1;\n    overflow-y: auto;\n    padding: 0 0 8px;\n  }\n  table { width: 100%; border-collapse: collapse; }\n  thead th {\n    font-size: 11px;\n    color: #666;\n    text-align: left;\n    padding: 6px 8px 5px;\n    border-bottom: 1px solid #2a2a2a;\n    font-weight: 500;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n    position: sticky;\n    top: 0;\n    background: #1e1e1e;\n    z-index: 1;\n  }\n  tbody tr { border-bottom: 1px solid #252525; }\n  tbody tr:hover { background: #252525; }\n  tbody td { padding: 5px 8px; vertical-align: middle; }\n  .swatch {\n    display: inline-block;\n    width: 9px; height: 9px;\n    border-radius: 50%;\n    margin-right: 5px;\n    vertical-align: middle;\n    flex-shrink: 0;\n  }\n  .key-cell { display: flex; align-items: center; }\n  .compat-badge {\n    display: inline-block;\n    padding: 1px 6px;\n    border-radius: 3px;\n    font-size: 10px;\n    font-weight: 500;\n    white-space: nowrap;\n  }\n  .badge-same    { background: #1f4d2a; color: #7ec87e; }\n  .badge-rel     { background: #1a3d4d; color: #7ec8e3; }\n  .badge-dom     { background: #4d3a1a; color: #e3b87e; }\n  .badge-sub     { background: #3a1a4d; color: #c87ee3; }\n  .badge-par     { background: #2a2a2a; color: #aaa; }\n  .track-name    { font-size: 11px; color: #777; }\n\n  /* Section dividers */\n  .section-header {\n    font-size: 10px;\n    color: #555;\n    text-transform: uppercase;\n    letter-spacing: 0.07em;\n    font-weight: 600;\n    padding: 10px 8px 4px;\n    border-top: 1px solid #2a2a2a;\n    margin-top: 4px;\n  }\n  .section-header:first-child { border-top: none; margin-top: 0; }\n\n  /* Progression suggestions */\n  .sugg-table tbody td { padding: 5px 8px; }\n  .template-cell {\n    font-size: 11px;\n    color: #777;\n    white-space: nowrap;\n    font-variant-numeric: tabular-nums;\n  }\n  .chords-cell {\n    font-size: 12px;\n    color: #bbb;\n    letter-spacing: 0.02em;\n  }\n\n  .empty {\n    color: #555;\n    text-align: center;\n    padding: 20px 16px 4px;\n    font-size: 12px;\n    line-height: 1.8;\n  }\n\n  footer {\n    padding: 8px 16px;\n    border-top: 1px solid #333;\n    display: flex;\n    justify-content: flex-end;\n    flex-shrink: 0;\n  }\n  button.close-btn {\n    padding: 5px 18px;\n    background: #3a3a3a;\n    border: 1px solid #555;\n    border-radius: 4px;\n    color: #ccc;\n    font-size: 13px;\n    cursor: pointer;\n  }\n  button.close-btn:hover { background: #4a4a4a; }\n  button.write-btn {\n    padding: 2px 8px;\n    background: #1f3a1f;\n    border: 1px solid #3a6b3a;\n    border-radius: 3px;\n    color: #7ec87e;\n    font-size: 11px;\n    cursor: pointer;\n    white-space: nowrap;\n  }\n  button.write-btn:hover { background: #2a4f2a; border-color: #5a9e5a; }\n</style>\n</head>\n<body>\n<header>\n  <h2 id="title">Compatible Clips</h2>\n  <p id="subtitle"></p>\n</header>\n<div class="list-wrap" id="listWrap"></div>\n<footer>\n  <button class="close-btn" id="closeBtn">Close</button>\n</footer>\n<script>\n  const data = __COMPATIBLE_JSON__;\n\n  document.getElementById("title").textContent =\n    `Compatible \u2014 ${data.refClipName}`;\n  document.getElementById("subtitle").textContent =\n    `Reference key: ${data.refKey}  \xB7  ${data.results.length} clip${data.results.length !== 1 ? "s" : ""}  \xB7  ${data.suggestions.length} progression${data.suggestions.length !== 1 ? "s" : ""}`;\n\n  function badgeClass(compat) {\n    if (compat === "Same key") return "badge-same";\n    if (compat.startsWith("Relative")) return "badge-rel";\n    if (compat.startsWith("Dominant") || compat.startsWith("Subdominant")) return "badge-dom";\n    if (compat.startsWith("Parallel")) return "badge-par";\n    return "badge-sub";\n  }\n\n  function colorToCSS(n) {\n    const r = (n >> 16) & 0xff;\n    const g = (n >> 8) & 0xff;\n    const b = n & 0xff;\n    return `rgb(${r},${g},${b})`;\n  }\n\n  const wrap = document.getElementById("listWrap");\n\n  // \u2500\u2500 Compatible clips \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n\n  const clipsHeader = document.createElement("div");\n  clipsHeader.className = "section-header section-header:first-child";\n  clipsHeader.style.borderTop = "none";\n  clipsHeader.textContent = "Compatible Clips";\n  wrap.appendChild(clipsHeader);\n\n  if (data.results.length === 0) {\n    const empty = document.createElement("div");\n    empty.className = "empty";\n    empty.textContent = "No harmonically compatible clips found in session.";\n    wrap.appendChild(empty);\n  } else {\n    const table = document.createElement("table");\n    table.innerHTML = `\n      <thead>\n        <tr>\n          <th>Clip</th>\n          <th>Track</th>\n          <th>Key</th>\n          <th>Relationship</th>\n        </tr>\n      </thead>\n      <tbody id="clipBody"></tbody>\n    `;\n    wrap.appendChild(table);\n    const tbody = document.getElementById("clipBody");\n    for (const clip of data.results) {\n      const tr = document.createElement("tr");\n      tr.innerHTML = `\n        <td>${clip.clipName}</td>\n        <td class="track-name">${clip.trackName}</td>\n        <td>\n          <div class="key-cell">\n            <span class="swatch" style="background:${colorToCSS(clip.color)}"></span>\n            ${clip.key}\n          </div>\n        </td>\n        <td>\n          <span class="compat-badge ${badgeClass(clip.compatibility)}">${clip.compatibility}</span>\n        </td>\n      `;\n      tbody.appendChild(tr);\n    }\n  }\n\n  // \u2500\u2500 Compatible progressions \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n\n  if (data.suggestions && data.suggestions.length > 0) {\n    const suggHeader = document.createElement("div");\n    suggHeader.className = "section-header";\n    suggHeader.textContent = "Compatible Progressions";\n    wrap.appendChild(suggHeader);\n\n    const suggTable = document.createElement("table");\n    suggTable.className = "sugg-table";\n    suggTable.innerHTML = `<tbody id="suggBody"></tbody>`;\n    wrap.appendChild(suggTable);\n\n    const suggBody = document.getElementById("suggBody");\n    data.suggestions.forEach((s, idx) => {\n      const tr = document.createElement("tr");\n      tr.innerHTML = `\n        <td><span class="compat-badge ${badgeClass(s.relationship)}">${s.relationship}</span></td>\n        <td>\n          <div class="key-cell">\n            <span class="swatch" style="background:${colorToCSS(s.color)}"></span>\n            ${s.keyLabel}\n          </div>\n        </td>\n        <td class="template-cell">${s.template}</td>\n        <td class="chords-cell">${s.chords.join(" \xB7 ")}</td>\n        <td><button class="write-btn" data-idx="${idx}">Write \u2192</button></td>\n      `;\n      suggBody.appendChild(tr);\n    });\n\n    suggBody.addEventListener("click", e => {\n      const btn = e.target.closest(".write-btn");\n      if (!btn) return;\n      const s = data.suggestions[+btn.dataset.idx];\n      closeWithResult({ action: "writeProgression", suggestion: s });\n    });\n  }\n\n  document.getElementById("closeBtn").addEventListener("click", () => closeWithResult(null));\n</script>\n</body>\n</html>\n';

// src/transposesession.html
var transposesession_default = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<script>\n  const isWebKit = window.webkit?.messageHandlers?.live;\n  const isWebView2 = window.chrome?.webview;\n  function closeWithResult(result) {\n    const msg = { method: "close_and_send", params: [JSON.stringify(result)] };\n    if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);\n    else if (isWebView2) window.chrome.webview.postMessage(msg);\n  }\n</script>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n    font-size: 13px;\n    background: #1e1e1e;\n    color: #d4d4d4;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 100vh;\n    gap: 14px;\n    padding: 16px;\n  }\n  h2 { font-size: 14px; font-weight: 600; color: #e0e0e0; }\n  .row { display: flex; align-items: center; gap: 10px; }\n  button.adj {\n    width: 28px; height: 28px;\n    background: #3a3a3a; border: 1px solid #555;\n    border-radius: 4px; color: #d4d4d4;\n    font-size: 18px; cursor: pointer; line-height: 1;\n  }\n  button.adj:hover { background: #4a4a4a; }\n  #display {\n    width: 56px; text-align: center;\n    font-size: 20px; font-weight: 700; color: #888;\n    background: #2a2a2a; border: 1px solid #555;\n    border-radius: 4px; padding: 4px 0;\n  }\n  .presets { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }\n  button.preset {\n    padding: 3px 10px; background: #2a2a2a; border: 1px solid #555;\n    border-radius: 4px; color: #bbb; font-size: 11px; cursor: pointer;\n  }\n  button.preset:hover { background: #3a3a3a; color: #fff; }\n  .recolor-row {\n    display: flex; align-items: center; gap: 8px;\n    font-size: 12px; color: #aaa; cursor: pointer;\n  }\n  .recolor-row input { accent-color: #0e639c; cursor: pointer; }\n  .actions { display: flex; gap: 8px; }\n  button.primary {\n    padding: 6px 22px; background: #0e639c; border: none;\n    border-radius: 4px; color: #fff; font-size: 13px;\n    cursor: pointer; font-weight: 600;\n  }\n  button.primary:hover { background: #1177bb; }\n  button.cancel {\n    padding: 6px 16px; background: #3a3a3a; border: 1px solid #555;\n    border-radius: 4px; color: #ccc; font-size: 13px; cursor: pointer;\n  }\n  button.cancel:hover { background: #4a4a4a; }\n</style>\n</head>\n<body>\n<h2>Transpose Session</h2>\n<div class="row">\n  <button class="adj" id="down">\u2212</button>\n  <div id="display">0</div>\n  <button class="adj" id="up">+</button>\n</div>\n<div class="presets">\n  <button class="preset" data-v="-12">\u221212</button>\n  <button class="preset" data-v="-7">\u22127</button>\n  <button class="preset" data-v="-5">\u22125</button>\n  <button class="preset" data-v="-2">\u22122</button>\n  <button class="preset" data-v="-1">\u22121</button>\n  <button class="preset" data-v="1">+1</button>\n  <button class="preset" data-v="2">+2</button>\n  <button class="preset" data-v="5">+5</button>\n  <button class="preset" data-v="7">+7</button>\n  <button class="preset" data-v="12">+12</button>\n</div>\n<label class="recolor-row">\n  <input type="checkbox" id="recolor" checked />\n  Re-color clips by key after transposing\n</label>\n<div class="actions">\n  <button class="cancel" id="cancelBtn">Cancel</button>\n  <button class="primary" id="transposeBtn">Transpose</button>\n</div>\n<script>\n  let semitones = 0;\n  const display = document.getElementById("display");\n  function update() {\n    display.textContent = semitones > 0 ? "+" + semitones : String(semitones);\n    display.style.color = semitones === 0 ? "#888" : semitones > 0 ? "#7ec8e3" : "#f28b82";\n  }\n  document.getElementById("up").addEventListener("click", () => { if (semitones < 24) { semitones++; update(); } });\n  document.getElementById("down").addEventListener("click", () => { if (semitones > -24) { semitones--; update(); } });\n  document.querySelectorAll(".preset").forEach(btn => {\n    btn.addEventListener("click", () => { semitones = parseInt(btn.dataset.v, 10); update(); });\n  });\n  document.getElementById("transposeBtn").addEventListener("click", () => {\n    const recolor = document.getElementById("recolor").checked;\n    if (semitones === 0 && !recolor) { closeWithResult(null); return; }\n    closeWithResult({ action: "transpose", semitones, recolor });\n  });\n  document.getElementById("cancelBtn").addEventListener("click", () => closeWithResult(null));\n</script>\n</body>\n</html>\n';

// src/theory-machine.html
var theory_machine_default = `<!DOCTYPE html>
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
`;

// src/bass.html
var bass_default = `<!DOCTYPE html>
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
`;

// src/songform.html
var songform_default = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>Compose Song Form</title>\n<style>\n  *, *::before, *::after { box-sizing: border-box; margin: 0; }\n  input, button, select { font: inherit; }\n  :root {\n    --c-bg:           hsl(0,0%,21%);\n    --c-card:         hsl(0,0%,17%);\n    --c-control-bg:   hsl(0,0%,16%);\n    --c-control-bg-h: hsl(0,0%,13%);\n    --c-input-bg:     hsl(0,0%,12%);\n    --c-text:         hsl(0,0%,71%);\n    --c-text-dim:     hsl(0,0%,45%);\n    --c-border:       hsl(0,0%,7%);\n    --c-accent:       hsl(31,100%,67%);\n    --c-accent-fg:    hsl(0,0%,7%);\n    --c-bad:          hsl(0,65%,55%);\n  }\n  html { background: var(--c-bg); color: var(--c-text); font-family: "AbletonSansSmall", sans-serif; font-size: 11.5px; font-weight: 500; -webkit-font-smoothing: antialiased; }\n  body { padding: 1em 1.25em; display: flex; flex-direction: column; gap: 0.7em; height: 100vh; }\n  .title-row { display: flex; align-items: center; gap: 1em; }\n  .title { font-size: 1.15em; }\n  .spacer { flex: 1; }\n  select, input[type="text"], input[type="number"] {\n    background: var(--c-input-bg); color: var(--c-text);\n    border: 1px solid var(--c-border); height: 20px; padding: 0 0.3em;\n  }\n  select { appearance: none; -webkit-appearance: none; cursor: pointer; }\n  select:focus, input:focus { outline: 2px solid var(--c-text-dim); }\n  label.inline { display: flex; align-items: center; gap: 0.35em; color: var(--c-text-dim); white-space: nowrap; }\n  label.inline input[type="checkbox"] { accent-color: var(--c-accent); width: 12px; height: 12px; }\n  .globals { display: flex; align-items: center; gap: 0.9em; flex-wrap: wrap; }\n\n  #sections { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.45em; padding-right: 2px; }\n  .sec {\n    background: var(--c-card); border: 1px solid var(--c-border);\n    padding: 0.5em 0.6em; display: flex; flex-direction: column; gap: 0.4em;\n  }\n  .sec-line { display: flex; align-items: center; gap: 0.5em; flex-wrap: wrap; }\n  .sec-name { width: 7em; }\n  .sec input.custom { flex: 1; min-width: 12em; }\n  .lbl { color: var(--c-text-dim); white-space: nowrap; }\n  .sec button.icon {\n    width: 22px; height: 20px; line-height: 1; padding: 0;\n    background: var(--c-control-bg); color: var(--c-text);\n    border: 1px solid var(--c-border); cursor: pointer; border-radius: 3px;\n  }\n  .sec button.icon:hover { background: var(--c-control-bg-h); }\n  .sec input.custom.bad { border-color: var(--c-bad); color: var(--c-bad); }\n\n  .footer { display: flex; align-items: center; gap: 0.75em; }\n  #total { color: var(--c-text-dim); }\n  button.btn {\n    font-size: 1rem; line-height: 1; background: var(--c-control-bg); color: var(--c-text);\n    border: 1px solid var(--c-border); height: 22px; padding: 0 1.1em;\n    border-radius: 1em; cursor: pointer; white-space: nowrap;\n  }\n  button.btn:hover { background: var(--c-control-bg-h); }\n  button.btn.primary { background: var(--c-accent); color: var(--c-accent-fg); border-color: var(--c-accent); }\n  button.btn.primary:hover { filter: brightness(1.08); }\n</style>\n</head>\n<body>\n  <div class="title-row">\n    <span class="title">Compose Song Form</span>\n    <span class="spacer"></span>\n    <span class="lbl">Form</span>\n    <select id="preset">\n      <option value="">Load a form\u2026</option>\n      <option value="verse_chorus">Verse\u2013Chorus (pop)</option>\n      <option value="aaba">AABA (32-bar)</option>\n      <option value="blues">12-Bar Blues \xD72</option>\n      <option value="edm">EDM Arc</option>\n      <option value="lofi">Lo-fi Vamp Set</option>\n    </select>\n  </div>\n\n  <div class="globals">\n    <span class="lbl">Key</span>\n    <select id="g-key"></select>\n    <span class="lbl">Scale</span>\n    <select id="g-scale"></select>\n    <span class="lbl">Voicing</span>\n    <select id="g-voicing">\n      <option value="smooth">Smooth</option>\n      <option value="close">Close</option>\n      <option value="drop2">Drop 2</option>\n      <option value="shell">Shell</option>\n    </select>\n    <label class="inline"><input type="checkbox" id="g-sevenths" /> 7ths</label>\n    <span class="lbl">Bass register</span>\n    <select id="g-bassoct">\n      <option value="1">Low</option>\n      <option value="2" selected>Standard</option>\n      <option value="3">High</option>\n    </select>\n  </div>\n\n  <div id="sections"></div>\n\n  <div class="footer">\n    <button class="btn" id="add">+ Add Section</button>\n    <span id="total"></span>\n    <span class="spacer"></span>\n    <button class="btn" id="cancel">Cancel</button>\n    <button class="btn primary" id="write">Write to Session</button>\n  </div>\n\n<script>\n  const isWebKit = window.webkit?.messageHandlers?.live;\n  const isWebView2 = window.chrome?.webview;\n  function closeWithResult(result) {\n    const msg = { method: "close_and_send", params: [JSON.stringify(result)] };\n    if (isWebKit) window.webkit.messageHandlers.live.postMessage(msg);\n    else if (isWebView2) window.chrome.webview.postMessage(msg);\n  }\n\n  const KEY_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];\n  const SCALES = [\n    ["major","Major"],["natural_minor","Natural Minor"],["harmonic_minor","Harmonic Minor"],\n    ["melodic_minor","Melodic Minor"],["dorian","Dorian"],["phrygian","Phrygian"],\n    ["lydian","Lydian"],["mixolydian","Mixolydian"],\n  ];\n  const TEMPLATES = ["I-V-vi-IV","I-IV-V-I","I-vi-IV-V","vi-IV-I-V","ii-V-I","I-IV-vi-V",\n    "I-V-IV-V","I-iii-IV-V","12-bar blues","Andalusian cadence","Pachelbel","Circle of fifths"];\n  const RHYTHMS = [\n    ["block","Block Chords"],["halves","Halves"],["quarters","Quarters"],["pump_8ths","Pumping 8ths"],\n    ["swung_8ths","Swung 8ths"],["charleston","Charleston"],["tresillo","Tresillo"],\n    ["boom_chuck","Boom-Chuck"],["syncopated","Syncopated"],["offbeats","Offbeat Skank"],\n    ["arp_up_8ths","Arpeggio Up"],\n  ];\n  const BASSES = [\n    ["none","No bass"],["roots","Roots"],["root_fifth","Root\u2013Fifth"],["quarter_pulse","Quarter Pulse"],\n    ["pump_8ths","Pumping 8ths"],["root_octave_8ths","Octave 8ths"],["two_feel","Two-Feel"],\n    ["walking","Walking"],["boogie","Boogie Shuffle"],["bossa","Bossa Nova"],["tumbao","Tumbao"],\n    ["tresillo","Tresillo"],["reggaeton","Reggaeton"],["offbeats","Offbeats"],\n    ["funk_16ths","Funk 16ths"],["pedal_pickup","Pedal + Pickup"],\n  ];\n  const SECTION_NAMES = ["Intro","Verse","Chorus","Bridge","Build","Drop","Break","Outro","Vamp","A","B"];\n\n  const init = window._INIT ?? { key: 0, scale: "major" };\n  let sections = [];\n\n  function fillSelect(sel, pairs, value) {\n    sel.innerHTML = "";\n    for (const [v, label] of pairs) {\n      const o = document.createElement("option");\n      o.value = v; o.textContent = label;\n      if (v === value) o.selected = true;\n      sel.appendChild(o);\n    }\n  }\n\n  function defaultSection() {\n    return {\n      name: "Verse", bars: 4, beatsPerChord: 2,\n      key: Number(document.getElementById("g-key").value),\n      scale: document.getElementById("g-scale").value,\n      template: "I-V-vi-IV", customProgression: "",\n      rhythm: "block", bass: "none",\n    };\n  }\n\n  // \u2500\u2500 Engine validation for custom progressions (best-effort) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  const ENGINE = "http://127.0.0.1:7842";\n  const ROMAN_RE = /^[b#\u266D\u266F]?[ivIV]/;\n  async function engineOp(op, params) {\n    const r = await fetch(ENGINE, { method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify({ op, ...params }) });\n    const data = await r.json();\n    if (data.error) throw new Error(data.error);\n    return data.result;\n  }\n  async function validateCustom(inputEl, sec) {\n    const text = inputEl.value.trim();\n    if (!text) { inputEl.classList.remove("bad"); inputEl.title = ""; return; }\n    const tokens = text.split(/[\\s,|]+/).filter(Boolean);\n    try {\n      const names = await Promise.all(tokens.map(async tok => {\n        const roman = () => engineOp("parse_roman", { roman: tok, key: sec.key, scale: sec.scale });\n        const name  = () => engineOp("parse_chord", { name: tok });\n        const [a, b] = ROMAN_RE.test(tok) ? [roman, name] : [name, roman];\n        try { return (await a()).chord.name; } catch { return (await b()).chord.name; }\n      }));\n      inputEl.classList.remove("bad");\n      inputEl.title = names.join(" \u2013 ");\n    } catch (e) {\n      if (e instanceof TypeError) return; // engine HTTP unreachable \u2014 skip\n      inputEl.classList.add("bad");\n      inputEl.title = String(e.message || e);\n    }\n  }\n\n  // \u2500\u2500 Section rows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  function render() {\n    const host = document.getElementById("sections");\n    host.innerHTML = "";\n    sections.forEach((sec, i) => host.appendChild(buildRow(sec, i)));\n    updateTotal();\n  }\n\n  function sel(pairs, value, onChange, cls) {\n    const s = document.createElement("select");\n    if (cls) s.className = cls;\n    fillSelect(s, pairs, value);\n    s.addEventListener("change", () => onChange(s.value));\n    return s;\n  }\n  function lbl(text) {\n    const s = document.createElement("span");\n    s.className = "lbl"; s.textContent = text;\n    return s;\n  }\n\n  function buildRow(sec, i) {\n    const card = document.createElement("div");\n    card.className = "sec";\n\n    const l1 = document.createElement("div");\n    l1.className = "sec-line";\n\n    const nameSel = sel(SECTION_NAMES.map(n => [n, n]), sec.name, v => { sec.name = v; updateTotal(); }, "sec-name");\n    if (!SECTION_NAMES.includes(sec.name)) {\n      const o = document.createElement("option");\n      o.value = sec.name; o.textContent = sec.name; o.selected = true;\n      nameSel.appendChild(o);\n    }\n    l1.appendChild(nameSel);\n\n    l1.appendChild(lbl("Bars"));\n    l1.appendChild(sel([["1","1"],["2","2"],["4","4"],["8","8"],["12","12"],["16","16"]],\n      String(sec.bars), v => { sec.bars = Number(v); updateTotal(); }));\n\n    l1.appendChild(lbl("Beats/chord"));\n    l1.appendChild(sel([["1","1"],["2","2"],["4","4"]],\n      String(sec.beatsPerChord), v => { sec.beatsPerChord = Number(v); }));\n\n    l1.appendChild(lbl("Key"));\n    l1.appendChild(sel(KEY_NAMES.map((n, pc) => [String(pc), n]), String(sec.key),\n      v => { sec.key = Number(v); revalidate(); }));\n\n    l1.appendChild(lbl("Scale"));\n    l1.appendChild(sel(SCALES, sec.scale, v => { sec.scale = v; revalidate(); }));\n\n    const spacer1 = document.createElement("span");\n    spacer1.className = "spacer";\n    l1.appendChild(spacer1);\n\n    const up = document.createElement("button");\n    up.className = "icon"; up.textContent = "\u2191"; up.disabled = i === 0;\n    up.addEventListener("click", () => { [sections[i-1], sections[i]] = [sections[i], sections[i-1]]; render(); });\n    const down = document.createElement("button");\n    down.className = "icon"; down.textContent = "\u2193"; down.disabled = i === sections.length - 1;\n    down.addEventListener("click", () => { [sections[i+1], sections[i]] = [sections[i], sections[i+1]]; render(); });\n    const del = document.createElement("button");\n    del.className = "icon"; del.textContent = "\u2715";\n    del.addEventListener("click", () => { sections.splice(i, 1); render(); });\n    l1.append(up, down, del);\n\n    const l2 = document.createElement("div");\n    l2.className = "sec-line";\n\n    l2.appendChild(lbl("Progression"));\n    l2.appendChild(sel(TEMPLATES.map(t => [t, t]), sec.template, v => { sec.template = v; }));\n\n    const custom = document.createElement("input");\n    custom.type = "text"; custom.className = "custom";\n    custom.placeholder = "or custom: ii7 V7 Imaj7 \xB7 bVII \xB7 Dm7 G7";\n    custom.spellcheck = false; custom.value = sec.customProgression;\n    let t = null;\n    custom.addEventListener("input", () => {\n      sec.customProgression = custom.value.trim();\n      clearTimeout(t);\n      t = setTimeout(() => validateCustom(custom, sec), 250);\n    });\n    l2.appendChild(custom);\n\n    l2.appendChild(lbl("Rhythm"));\n    l2.appendChild(sel(RHYTHMS, sec.rhythm, v => { sec.rhythm = v; }));\n\n    l2.appendChild(lbl("Bass"));\n    l2.appendChild(sel(BASSES, sec.bass, v => { sec.bass = v; }));\n\n    function revalidate() { if (custom.value.trim()) validateCustom(custom, sec); }\n\n    card.append(l1, l2);\n    return card;\n  }\n\n  function updateTotal() {\n    const bars = sections.reduce((n, s) => n + s.bars, 0);\n    document.getElementById("total").textContent =\n      `${sections.length} section${sections.length === 1 ? "" : "s"} \xB7 ${bars} bars \xB7 ${bars * 4} beats`;\n  }\n\n  // \u2500\u2500 Form presets \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  // keyOff transposes relative to the global key; scale overrides global.\n  function S(name, bars, bpc, template, rhythm, bass, opts = {}) {\n    const gKey = Number(document.getElementById("g-key").value);\n    const gScale = document.getElementById("g-scale").value;\n    return {\n      name, bars, beatsPerChord: bpc, template, customProgression: opts.custom ?? "",\n      key: (gKey + (opts.keyOff ?? 0) + 12) % 12,\n      scale: opts.scale ?? gScale,\n      rhythm, bass,\n    };\n  }\n  const PRESETS = {\n    verse_chorus: () => [\n      S("Intro", 4, 2, "I-IV-V-I", "block", "none"),\n      S("Verse", 8, 2, "I-V-vi-IV", "quarters", "roots"),\n      S("Chorus", 8, 2, "I-IV-vi-V", "pump_8ths", "pump_8ths"),\n      S("Verse", 8, 2, "I-V-vi-IV", "quarters", "roots"),\n      S("Chorus", 8, 2, "I-IV-vi-V", "pump_8ths", "pump_8ths"),\n      S("Bridge", 4, 2, "vi-IV-I-V", "charleston", "root_fifth"),\n      S("Chorus", 8, 2, "I-IV-vi-V", "pump_8ths", "pump_8ths"),\n      S("Outro", 4, 4, "I-IV-V-I", "block", "roots"),\n    ],\n    aaba: () => {\n      document.getElementById("g-sevenths").checked = true;\n      return [\n        S("A", 8, 2, "ii-V-I", "swung_8ths", "two_feel"),\n        S("A", 8, 2, "ii-V-I", "swung_8ths", "two_feel"),\n        S("B", 8, 2, "Circle of fifths", "swung_8ths", "walking"),\n        S("A", 8, 2, "ii-V-I", "swung_8ths", "walking"),\n      ];\n    },\n    blues: () => {\n      document.getElementById("g-sevenths").checked = true;\n      return [\n        S("Chorus 1", 12, 4, "12-bar blues", "boom_chuck", "walking"),\n        S("Chorus 2", 12, 4, "12-bar blues", "boom_chuck", "boogie"),\n      ];\n    },\n    edm: () => [\n      S("Intro", 8, 2, "vi-IV-I-V", "block", "none"),\n      S("Build", 8, 2, "vi-IV-I-V", "quarters", "pump_8ths"),\n      S("Drop", 8, 2, "I-V-vi-IV", "pump_8ths", "root_octave_8ths"),\n      S("Break", 4, 4, "vi-IV-I-V", "block", "none"),\n      S("Build", 4, 2, "vi-IV-I-V", "quarters", "pump_8ths"),\n      S("Drop", 8, 2, "I-V-vi-IV", "pump_8ths", "root_octave_8ths"),\n    ],\n    lofi: () => {\n      document.getElementById("g-sevenths").checked = true;\n      return [\n        S("Vamp", 4, 2, "ii-V-I", "tresillo", "tumbao"),\n        S("Vamp", 4, 2, "I-vi-IV-V", "tresillo", "tumbao"),\n        S("Vamp", 4, 2, "ii-V-I", "tresillo", "tumbao"),\n        S("Vamp", 4, 2, "vi-IV-I-V", "tresillo", "tumbao"),\n      ];\n    },\n  };\n\n  // \u2500\u2500 Wiring \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  document.addEventListener("DOMContentLoaded", () => {\n    fillSelect(document.getElementById("g-key"), KEY_NAMES.map((n, pc) => [String(pc), n]), String(init.key));\n    fillSelect(document.getElementById("g-scale"), SCALES, SCALES.some(([v]) => v === init.scale) ? init.scale : "major");\n\n    document.getElementById("preset").addEventListener("change", e => {\n      const make = PRESETS[e.target.value];\n      if (make) { sections = make(); render(); }\n      e.target.value = "";\n    });\n    document.getElementById("add").addEventListener("click", () => {\n      sections.push(defaultSection()); render();\n    });\n    document.getElementById("cancel").addEventListener("click", () => closeWithResult(null));\n    document.getElementById("write").addEventListener("click", () => {\n      if (sections.length === 0) { closeWithResult(null); return; }\n      closeWithResult({\n        action: "songform",\n        voicing: document.getElementById("g-voicing").value,\n        sevenths: document.getElementById("g-sevenths").checked,\n        bassOctave: Number(document.getElementById("g-bassoct").value),\n        sections,\n      });\n    });\n    document.addEventListener("keydown", e => {\n      if (e.key === "Escape") closeWithResult(null);\n    });\n\n    sections = [defaultSection()];\n    render();\n  });\n</script>\n</body>\n</html>\n';

// src/extension.ts
var NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var ABLETON_SCALE_MAP = {
  "Major": "major",
  "Minor": "natural_minor",
  "Dorian": "dorian",
  "Phrygian": "phrygian",
  "Lydian": "lydian",
  "Mixolydian": "mixolydian",
  "Locrian": "locrian",
  "Harmonic Minor": "harmonic_minor",
  "Melodic Minor": "melodic_minor"
};
var NOTE_TO_PC = {
  "C": 0,
  "C#": 1,
  "Db": 1,
  "D": 2,
  "D#": 3,
  "Eb": 3,
  "E": 4,
  "F": 5,
  "F#": 6,
  "Gb": 6,
  "G": 7,
  "G#": 8,
  "Ab": 8,
  "A": 9,
  "A#": 10,
  "Bb": 10,
  "B": 11
};
var COF_POS = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];
var MAJOR_SCALE_PCS = [0, 2, 4, 5, 7, 9, 11];
var MINOR_SCALE_PCS = [0, 2, 3, 5, 7, 8, 10];
var DORIAN_SCALE_PCS = [0, 2, 3, 5, 7, 9, 10];
var PHRYGIAN_SCALE_PCS = [0, 1, 3, 5, 7, 8, 10];
var LYDIAN_SCALE_PCS = [0, 2, 4, 6, 7, 9, 11];
var MIXOLYDIAN_SCALE_PCS = [0, 2, 4, 5, 7, 9, 10];
var LOCRIAN_SCALE_PCS = [0, 1, 3, 5, 6, 8, 10];
var HARMONIC_MINOR_SCALE_PCS = [0, 2, 3, 5, 7, 8, 11];
var MELODIC_MINOR_SCALE_PCS = [0, 2, 3, 5, 7, 9, 11];
var PENTATONIC_MAJOR_PCS = [0, 2, 4, 7, 9];
var PENTATONIC_MINOR_PCS = [0, 3, 5, 7, 10];
var BLUES_SCALE_PCS = [0, 3, 5, 6, 7, 10];
var SCALE_PCS_MAP = {
  major: MAJOR_SCALE_PCS,
  natural_minor: MINOR_SCALE_PCS,
  dorian: DORIAN_SCALE_PCS,
  phrygian: PHRYGIAN_SCALE_PCS,
  lydian: LYDIAN_SCALE_PCS,
  mixolydian: MIXOLYDIAN_SCALE_PCS,
  locrian: LOCRIAN_SCALE_PCS,
  harmonic_minor: HARMONIC_MINOR_SCALE_PCS,
  melodic_minor: MELODIC_MINOR_SCALE_PCS,
  pentatonic_major: PENTATONIC_MAJOR_PCS,
  pentatonic_minor: PENTATONIC_MINOR_PCS,
  blues: BLUES_SCALE_PCS
};
var SCALE_DISPLAY_LABEL = {
  major: "major",
  natural_minor: "minor",
  dorian: "Dorian",
  phrygian: "Phrygian",
  lydian: "Lydian",
  mixolydian: "Mixolydian",
  locrian: "Locrian",
  harmonic_minor: "harmonic minor",
  melodic_minor: "melodic minor",
  pentatonic_major: "pentatonic major",
  pentatonic_minor: "pentatonic minor",
  blues: "blues"
};
var PALETTE_SCALES = [
  { id: "major", label: "Major" },
  { id: "natural_minor", label: "Natural Minor" },
  { id: "dorian", label: "Dorian" },
  { id: "phrygian", label: "Phrygian" },
  { id: "lydian", label: "Lydian" },
  { id: "mixolydian", label: "Mixolydian" },
  { id: "locrian", label: "Locrian" },
  { id: "harmonic_minor", label: "Harmonic Minor" },
  { id: "melodic_minor", label: "Melodic Minor" },
  { id: "pentatonic_major", label: "Pentatonic Major" },
  { id: "pentatonic_minor", label: "Pentatonic Minor" },
  { id: "blues", label: "Blues" }
];
function groupNotesByChord(notes, gridBeats = 0.25) {
  const groups = /* @__PURE__ */ new Map();
  for (const note of notes) {
    const snapped = Math.round(note.startTime / gridBeats) * gridBeats;
    const key = Math.round(snapped * 1e3);
    const existing = groups.get(key);
    if (existing) {
      existing.push(note.pitch);
    } else {
      groups.set(key, [note.pitch]);
    }
  }
  return groups;
}
function safeJson(data) {
  return JSON.stringify(data).replace(/</g, "\\u003C").replace(/>/g, "\\u003E");
}
function hslToRgbInt(h, s, l) {
  const sn = s / 100, ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    return ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return Math.round(f(0) * 255) << 16 | Math.round(f(8) * 255) << 8 | Math.round(f(4) * 255);
}
function keyLabelToColor(keyLabel) {
  const m = keyLabel.match(/^([A-G][#b]?)\s+(.*)/);
  if (!m) return null;
  const pc = NOTE_TO_PC[m[1] ?? ""];
  if (pc === void 0) return null;
  const isMinor = /minor|min\b/i.test(m[2] ?? "");
  const hue = (COF_POS[pc] ?? 0) * 30;
  return hslToRgbInt(hue, isMinor ? 55 : 70, isMinor ? 35 : 45);
}
async function inferClipKey(notes, eng) {
  const groups = groupNotesByChord(notes);
  const recognitions = await Promise.all(
    [...groups.entries()].map(
      ([beatKey, pitches]) => eng.send("recognize_chord", { notes: pitches }).then((r) => ({ beatKey, r }))
    )
  );
  const chordNames = recognitions.sort((a, b) => a.beatKey - b.beatKey).flatMap(({ r }) => {
    const best = r.matches[0];
    return best && best.score >= 0.5 ? [best.chord.name] : [];
  }).filter((name, i, arr) => i === 0 || name !== arr[i - 1]);
  if (chordNames.length > 0) {
    const analysis = await eng.send("analyze", { chord_names: chordNames });
    const k = analysis.inferred_key;
    return { root: k.root, scale: k.scale, label: k.label };
  }
  const histogram = new Array(12).fill(0);
  for (const note of notes) {
    const pc = note.pitch % 12;
    histogram[pc] = (histogram[pc] ?? 0) + 1;
  }
  let bestScore = -1;
  let bestKey = null;
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
function snapPitchToScale(pitch, scalePCs) {
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
function keyLabelShort(label) {
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
function compatibilityLabel(refPc, refIsMinor, otherPc, otherIsMinor) {
  if (refPc === otherPc && refIsMinor === otherIsMinor) return "Same key";
  if (refPc === otherPc) return refIsMinor ? "Parallel major" : "Parallel minor";
  if (!refIsMinor && otherIsMinor && otherPc === (refPc + 9) % 12) return "Relative minor";
  if (refIsMinor && !otherIsMinor && otherPc === (refPc + 3) % 12) return "Relative major";
  if (otherPc === (refPc + 7) % 12) return "Dominant (V)";
  if (otherPc === (refPc + 5) % 12) return "Subdominant (IV)";
  return null;
}
var ROMAN_TOKEN_RE = /^[b#♭♯]?[ivIV]/;
async function parseProgressionToken(eng, token, key, scale) {
  const asRoman = async () => (await eng.send("parse_roman", { roman: token, key, scale })).chord;
  const asName = async () => (await eng.send("parse_chord", { name: token })).chord;
  const [first, second] = ROMAN_TOKEN_RE.test(token) ? [asRoman, asName] : [asName, asRoman];
  try {
    return await first();
  } catch {
    try {
      return await second();
    } catch {
      throw new Error(`Couldn't parse "${token}" as a Roman numeral or chord name`);
    }
  }
}
async function resolveDialogChords(eng, params) {
  const text = params.customProgression?.trim();
  if (!text) {
    const { chords } = await eng.send("progression", {
      key: params.key,
      scale: params.scale,
      template: params.template,
      sevenths: params.sevenths
    });
    return chords;
  }
  const tokens = text.split(/[\s,|]+/).filter(Boolean);
  return Promise.all(
    tokens.map((tok) => parseProgressionToken(eng, tok, params.key, params.scale))
  );
}
function progressionLabel(params) {
  return params.customProgression?.trim() || params.template;
}
var RHYTHM_PATTERNS = {
  halves: { span: 4, hits: [
    { t: 0, d: 2, v: 1 },
    { t: 2, d: 2, v: 0.9 }
  ] },
  quarters: { span: 4, hits: [
    { t: 0, d: 1, v: 1 },
    { t: 1, d: 1, v: 0.85 },
    { t: 2, d: 1, v: 0.95 },
    { t: 3, d: 1, v: 0.85 }
  ] },
  pump_8ths: { span: 4, hits: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5].map((t) => ({ t, d: 0.45, v: t % 1 === 0 ? 1 : 0.8 })) },
  swung_8ths: { span: 4, hits: [0, 1, 2, 3].flatMap((b) => [
    { t: b, d: 0.6, v: 1 },
    { t: b + 0.66, d: 0.3, v: 0.75 }
  ]) },
  charleston: { span: 4, hits: [
    { t: 0, d: 1.4, v: 1 },
    { t: 1.5, d: 2.4, v: 0.85 }
  ] },
  tresillo: { span: 4, hits: [
    { t: 0, d: 1.4, v: 1 },
    { t: 1.5, d: 1.4, v: 0.85 },
    { t: 3, d: 0.9, v: 0.95 }
  ] },
  boom_chuck: { span: 4, hits: [
    { t: 0, d: 0.95, v: 1 },
    { t: 1, d: 0.45, v: 0.75 },
    { t: 1.5, d: 0.45, v: 0.75 },
    { t: 2, d: 0.95, v: 0.95 },
    { t: 3, d: 0.45, v: 0.75 },
    { t: 3.5, d: 0.45, v: 0.75 }
  ] },
  syncopated: { span: 4, hits: [
    { t: 0, d: 0.7, v: 1 },
    { t: 0.75, d: 0.2, v: 0.7 },
    { t: 1, d: 0.45, v: 0.85 },
    { t: 1.5, d: 1.4, v: 0.95 },
    { t: 3, d: 0.45, v: 0.85 },
    { t: 3.5, d: 0.45, v: 0.8 }
  ] },
  offbeats: { span: 4, hits: [0.5, 1.5, 2.5, 3.5].map((t) => ({ t, d: 0.35, v: 0.95 })) },
  arp_up_8ths: { span: 4, arp: true, hits: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5].map((t) => ({ t, d: 0.5, v: t % 1 === 0 ? 0.95 : 0.8 })) }
};
var BASE_VELOCITY = 90;
function buildRhythmNotes(voicings, beatsPerChord, rhythmName) {
  const pattern = rhythmName ? RHYTHM_PATTERNS[rhythmName] : void 0;
  if (!pattern) {
    return voicings.flatMap(
      (noteNums, i) => noteNums.map((pitch) => ({
        pitch: Math.max(0, Math.min(127, pitch)),
        startTime: i * beatsPerChord,
        duration: beatsPerChord * 0.95,
        velocity: BASE_VELOCITY
      }))
    );
  }
  const scale = beatsPerChord / pattern.span;
  return voicings.flatMap((noteNums, i) => {
    if (noteNums.length === 0) return [];
    const pitches = [...noteNums].sort((a, b) => a - b);
    return pattern.hits.flatMap((hit, hitIdx) => {
      const velocity = Math.max(1, Math.min(127, Math.round(BASE_VELOCITY * hit.v)));
      const hitPitches = pattern.arp ? [pitches[hitIdx % pitches.length] ?? 60] : pitches;
      return hitPitches.map((pitch) => ({
        pitch: Math.max(0, Math.min(127, pitch)),
        startTime: i * beatsPerChord + hit.t * scale,
        duration: hit.d * scale,
        velocity
      }));
    });
  });
}
function bassSpansFromChordEntries(entries, clipBeats) {
  return entries.map((e, i) => {
    const next = entries[i + 1];
    const end = next ? next.beat : Math.max(clipBeats, e.beat + 1);
    const pcs = e.pitchClasses;
    const iv = (idx, fallback) => {
      const pc = pcs[idx];
      return pc === void 0 ? fallback : (pc - e.root + 12) % 12 || fallback;
    };
    return {
      start: e.beat,
      span: Math.max(0.5, end - e.beat),
      rootPc: e.root,
      thirdIv: iv(1, 4),
      fifthIv: iv(2, 7),
      nextRootPc: next ? next.root : null
    };
  });
}
function approachPitch(target, ref) {
  return Math.abs(target - 1 - ref) <= Math.abs(target + 1 - ref) ? target - 1 : target + 1;
}
function buildBassNotes(spans, pattern, octave) {
  const anchor = 12 * (octave + 1);
  const clampPitch = (p) => Math.max(20, Math.min(64, p));
  const note = (start, dur, pitch, vMult) => ({
    pitch: clampPitch(pitch),
    startTime: start,
    duration: dur,
    velocity: Math.max(1, Math.min(127, Math.round(BASE_VELOCITY * vMult)))
  });
  return spans.flatMap((c) => {
    const root = anchor + c.rootPc;
    const third = root + c.thirdIv;
    const fifth = root + c.fifthIv;
    const out = [];
    switch (pattern) {
      case "root_fifth": {
        if (c.span < 2) {
          out.push(note(c.start, c.span * 0.95, root, 1));
          break;
        }
        const half = c.span / 2;
        out.push(note(c.start, half * 0.95, root, 1));
        out.push(note(c.start + half, half * 0.95, fifth, 0.85));
        break;
      }
      case "pump_8ths":
      case "root_octave_8ths": {
        const steps = Math.max(1, Math.round(c.span / 0.5));
        const step = c.span / steps;
        for (let s = 0; s < steps; s++) {
          const pitch = pattern === "root_octave_8ths" && s % 2 === 1 ? root + 12 : root;
          out.push(note(c.start + s * step, step * 0.9, pitch, s % 2 === 0 ? 1 : 0.8));
        }
        break;
      }
      case "walking": {
        const steps = Math.max(1, Math.round(c.span));
        const step = c.span / steps;
        const cycle = [root, third, fifth, third];
        for (let s = 0; s < steps; s++) {
          let pitch = cycle[s % cycle.length] ?? root;
          if (s === steps - 1 && steps > 1 && c.nextRootPc !== null) {
            pitch = approachPitch(anchor + c.nextRootPc, fifth);
          }
          out.push(note(c.start + s * step, step * 0.9, pitch, s === 0 ? 1 : 0.88));
        }
        break;
      }
      case "two_feel": {
        if (c.span < 2) {
          out.push(note(c.start, c.span * 0.95, root, 1));
          break;
        }
        const halves = Math.max(1, Math.round(c.span / 2));
        const step = c.span / halves;
        for (let s = 0; s < halves; s++) {
          let pitch = s % 2 === 0 ? root : fifth;
          if (s === halves - 1 && halves > 1 && c.nextRootPc !== null) {
            pitch = approachPitch(anchor + c.nextRootPc, fifth);
          }
          out.push(note(c.start + s * step, step * 0.92, pitch, s % 2 === 0 ? 1 : 0.85));
        }
        break;
      }
      case "boogie": {
        const cycle = [root, third, fifth, root + 9, root + 10, root + 9, fifth, third];
        const steps = Math.max(1, Math.round(c.span / 0.5));
        const step = c.span / steps;
        for (let s = 0; s < steps; s++) {
          out.push(note(
            c.start + s * step,
            step * 0.9,
            cycle[s % cycle.length] ?? root,
            s % 2 === 0 ? 1 : 0.8
          ));
        }
        break;
      }
      case "bossa": {
        const sc = c.span / 4;
        out.push(note(c.start + 0 * sc, 1.4 * sc, root, 1));
        out.push(note(c.start + 1.5 * sc, 0.4 * sc, fifth, 0.8));
        out.push(note(c.start + 2 * sc, 1.4 * sc, root, 0.95));
        out.push(note(c.start + 3.5 * sc, 0.4 * sc, fifth, 0.8));
        break;
      }
      case "tumbao": {
        const sc = c.span / 4;
        const ponche = c.nextRootPc !== null ? anchor + c.nextRootPc : root;
        out.push(note(c.start + 0 * sc, 0.4 * sc, root, 0.7));
        out.push(note(c.start + 1.5 * sc, 1.3 * sc, fifth, 0.95));
        out.push(note(c.start + 3 * sc, 0.95 * sc, ponche, 1));
        break;
      }
      case "quarter_pulse": {
        const steps = Math.max(1, Math.round(c.span));
        const step = c.span / steps;
        for (let s = 0; s < steps; s++) {
          out.push(note(c.start + s * step, step * 0.9, root, s === 0 ? 1 : 0.88));
        }
        break;
      }
      case "reggaeton": {
        const cells = Math.max(1, Math.round(c.span / 2));
        const cell = c.span / cells;
        const sc = cell / 2;
        for (let s = 0; s < cells; s++) {
          const t0 = c.start + s * cell;
          out.push(note(t0 + 0 * sc, 0.7 * sc, root, s === 0 ? 1 : 0.95));
          out.push(note(t0 + 0.75 * sc, 0.7 * sc, root, 0.8));
          out.push(note(t0 + 1.5 * sc, 0.45 * sc, root, 0.85));
        }
        break;
      }
      case "funk_16ths": {
        const sc = c.span / 4;
        const hits = [
          [0, 0.4, root, 1],
          [0.75, 0.2, root, 0.6],
          [1, 0.4, root + 12, 0.9],
          [1.75, 0.2, root, 0.6],
          [2, 0.4, root, 1],
          [2.75, 0.2, root, 0.6],
          [3, 0.4, root + 12, 0.9],
          [3.5, 0.4, root, 0.8]
        ];
        for (const [t, d, p, v] of hits) {
          out.push(note(c.start + t * sc, d * sc, p, v));
        }
        break;
      }
      case "pedal_pickup": {
        if (c.nextRootPc === null || c.span <= 1) {
          out.push(note(c.start, c.span * 0.95, root, 1));
          break;
        }
        out.push(note(c.start, c.span - 0.5, root, 1));
        out.push(note(
          c.start + c.span - 0.5,
          0.4,
          approachPitch(anchor + c.nextRootPc, root),
          0.85
        ));
        break;
      }
      case "tresillo": {
        const sc = c.span / 4;
        out.push(note(c.start + 0 * sc, 1.4 * sc, root, 1));
        out.push(note(c.start + 1.5 * sc, 1.4 * sc, root, 0.85));
        out.push(note(c.start + 3 * sc, 0.9 * sc, fifth, 0.95));
        break;
      }
      case "offbeats": {
        const sc = c.span / 4;
        for (const t of [0.5, 1.5, 2.5, 3.5]) {
          out.push(note(c.start + t * sc, 0.35 * sc, root, 0.95));
        }
        break;
      }
      default:
        out.push(note(c.start, c.span * 0.95, root, 1));
    }
    return out;
  });
}
function activate(activation) {
  const context = initialize(activation, "1.0.0");
  const cwd = process.env["COMPOSITION_AIDE_PATH"] ?? path.join(__dirname, "..", "engine");
  const pythonCmd = process.env["PYTHON_CMD"] ?? (process.platform === "win32" ? "python" : "python3");
  const engine = new ChordgenEngine(cwd, pythonCmd);
  void engine.send("list_ops").catch(() => void 0);
  context.commands.registerCommand(
    "aide.generate",
    (arg) => void (async (selection) => {
      const midiTracks = selection.selected_lanes.map((h) => context.getObjectFromHandle(h, DataModelObject)).filter((obj) => obj instanceof MidiTrack);
      if (!midiTracks.length) {
        console.log("[composition-aide] No MIDI tracks in selection.");
        return;
      }
      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(interface_default)}`,
        380,
        416
      );
      let params;
      try {
        params = JSON.parse(rawResult);
      } catch {
        return;
      }
      if (!params) return;
      const selectionBeats = selection.time_selection_end - selection.time_selection_start;
      const chords = await resolveDialogChords(engine, params);
      const { voicings } = await engine.send("voice_progression", {
        chords,
        strategy: params.voicing,
        octave: 4
      });
      const beatsPerChord = selectionBeats / chords.length;
      const clipName = `${progressionLabel(params)} \u2014 ${params.keyName} ${params.scale.replace(/_/g, " ")}`;
      let notes = buildRhythmNotes(voicings, beatsPerChord, params.rhythm);
      if (params.snapToScale) {
        const intervals = SCALE_PCS_MAP[params.scale] ?? MAJOR_SCALE_PCS;
        const scalePCs = new Set(intervals.map((i) => (params.key + i) % 12));
        notes = notes.map((n) => ({ ...n, pitch: snapPitchToScale(n.pitch, scalePCs) }));
      }
      await Promise.all(midiTracks.map(async (track) => {
        const clip = await track.createMidiClip(
          selection.time_selection_start,
          selectionBeats
        );
        clip.name = clipName;
        clip.notes = notes;
      }));
      console.log(
        `[composition-aide] "${clipName}": ${chords.map((c) => c.name).join(" \u2013 ")} (${beatsPerChord.toFixed(2)} beats/chord)`
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction(
    "MidiTrack.ArrangementSelection",
    "Generate Progression\u2026",
    "aide.generate"
  );
  context.commands.registerCommand("aide.analyze", (arg) => {
    const analyzeClip = async (handle) => {
      const clip = context.getObjectFromHandle(handle, MidiClip);
      const notes = clip.notes;
      if (notes.length === 0) {
        console.log("[composition-aide] Clip has no notes.");
        return;
      }
      const groups = groupNotesByChord(notes);
      const recognizeResults = await Promise.all(
        [...groups.entries()].map(
          ([beatKey, pitches]) => engine.send("recognize_chord", { notes: pitches }).then((result) => ({ beatKey, result }))
        )
      );
      const chordEntries = recognizeResults.sort((a, b) => a.beatKey - b.beatKey).flatMap(({ beatKey, result }) => {
        const best = result.matches[0];
        if (!best || best.score < 0.5) return [];
        return [{ beat: beatKey / 1e3, name: best.chord.name, score: best.score, pitchClasses: best.chord.pitch_classes, root: best.chord.root, quality: best.chord.quality }];
      }).filter((entry2, i, arr) => i === 0 || entry2.name !== arr[i - 1]?.name);
      if (chordEntries.length === 0) {
        console.log("[composition-aide] Could not identify any chords in this clip.");
        return;
      }
      const chordNames = chordEntries.map((e) => e.name);
      const analysis = await engine.send("analyze", {
        chord_names: chordNames
      });
      const displayData = {
        clipName: clip.name || "(unnamed clip)",
        noteCount: notes.length,
        inferredKey: analysis.inferred_key.label,
        scaleRoot: analysis.inferred_key.root,
        scaleIntervals: [...SCALE_PCS_MAP[analysis.inferred_key.scale] ?? MAJOR_SCALE_PCS],
        chords: chordNames.map((name, i) => ({
          beat: chordEntries[i]?.beat ?? 0,
          name,
          roman: analysis.roman_labels[i] ?? name,
          tension: analysis.tension[i] ?? 0,
          score: chordEntries[i]?.score ?? 0,
          pitchClasses: chordEntries[i]?.pitchClasses ?? [],
          root: chordEntries[i]?.root ?? 0,
          quality: chordEntries[i]?.quality ?? "major"
        })),
        substitutions: analysis.substitutions.slice(0, 5).map((s) => ({
          position: s.position,
          original: s.original.name,
          replacement: s.replacement.name,
          rationale: s.rationale
        })),
        summary: analysis.summary
      };
      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(
          results_default.replace("__ANALYSIS_JSON__", safeJson(displayData))
        )}`,
        520,
        560
      );
      console.log(
        `[composition-aide] Analyzed "${displayData.clipName}": ${displayData.inferredKey} \u2014 ${chordNames.join(" \u2013 ")}`
      );
      let modalResult;
      try {
        modalResult = JSON.parse(rawResult);
      } catch {
        return;
      }
      if (!modalResult || modalResult.action !== "substitute") return;
      const { position, original, replacement } = modalResult;
      const entry = chordEntries[position];
      if (!entry) {
        console.error(`[composition-aide] Substitution position ${position} out of range.`);
        return;
      }
      const nextEntry = chordEntries[position + 1];
      const chordStart = entry.beat;
      const currentNotes = clip.notes;
      const lastNoteEnd = Math.max(
        chordStart + 4,
        ...currentNotes.map((n) => n.startTime + n.duration)
      );
      const chordEnd = nextEntry?.beat ?? lastNoteEnd;
      const originalChordNotes = currentNotes.filter(
        (n) => n.startTime >= chordStart - 0.01 && n.startTime < chordEnd - 0.01
      );
      const avgPitch = originalChordNotes.length > 0 ? Math.round(
        originalChordNotes.reduce((sum, n) => sum + n.pitch, 0) / originalChordNotes.length
      ) : 60;
      const targetOctave = Math.max(3, Math.min(6, Math.floor(avgPitch / 12) - 1));
      const voicing = await engine.send("voicings", {
        name: replacement,
        octave: targetOctave
      });
      const avgDuration = originalChordNotes.length > 0 ? originalChordNotes.reduce((sum, n) => sum + n.duration, 0) / originalChordNotes.length : (chordEnd - chordStart) * 0.95;
      const newNotes = voicing.close.map((pitch) => ({
        pitch: Math.max(0, Math.min(127, pitch)),
        startTime: chordStart,
        duration: avgDuration,
        velocity: 90
      }));
      clip.notes = [
        ...currentNotes.filter(
          (n) => n.startTime < chordStart - 0.01 || n.startTime >= chordEnd - 0.01
        ),
        ...newNotes
      ];
      console.log(
        `[composition-aide] Substituted: ${original} \u2192 ${replacement} at beat ${chordStart.toFixed(2)} (octave ${targetOctave})`
      );
      await analyzeClip(handle);
    };
    void analyzeClip(arg).catch((e) => console.error(e));
  });
  context.ui.registerContextMenuAction("MidiClip", "Analyze Harmony\u2026", "aide.analyze");
  context.commands.registerCommand(
    "aide.chordPalette",
    (arg) => void (async (handle) => {
      const slot = context.getObjectFromHandle(handle, ClipSlot);
      const song = context.application.song;
      const rootNote = song?.rootNote ?? 0;
      const abletonScale = song?.scaleName ?? "Major";
      const defaultScale = ABLETON_SCALE_MAP[abletonScale] ?? "major";
      const scaleResults = await Promise.all(
        PALETTE_SCALES.flatMap(({ id }) => [
          engine.send("diatonic", { key: rootNote, scale: id, sevenths: false }).then((r) => ({ id, sevenths: false, chords: r.chords })),
          engine.send("diatonic", { key: rootNote, scale: id, sevenths: true }).then((r) => ({ id, sevenths: true, chords: r.chords }))
        ])
      );
      const scalesData = {};
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
        scales: scalesData
      };
      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(
          palette_default.replace("__PALETTE_JSON__", safeJson(paletteData))
        )}`,
        510,
        296
      );
      let paletteResult;
      try {
        paletteResult = JSON.parse(rawResult);
      } catch {
        return;
      }
      if (!paletteResult || paletteResult.action !== "insert") return;
      const { chordName, length, voicing, octave, selectedScale } = paletteResult;
      const voicingData = await engine.send("voicings", { name: chordName, octave });
      const voiced = voicingData[voicing];
      const newNotes = voiced.map((pitch) => ({
        pitch: Math.max(0, Math.min(127, pitch)),
        startTime: 0,
        duration: length * 0.95,
        velocity: 90
      }));
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
        `[composition-aide] Inserted ${chordName} (${voicing}, oct ${octave}, ${length} beats) \u2014 ${paletteData.keyName} ${selectedScale}`
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("ClipSlot", "Insert Chord\u2026", "aide.chordPalette");
  context.commands.registerCommand(
    "aide.sessionMap",
    (arg) => void (async (_handle) => {
      const song = context.application.song;
      if (!song) return;
      const tracks = song.tracks;
      const scenes = song.scenes;
      const sceneNames = scenes.map((s) => s.name);
      const clipTasks = [];
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
            clipName: clip.name || "(unnamed)"
          });
        }
      }
      const totalMidiClips = clipTasks.length;
      if (totalMidiClips === 0) {
        console.log("[composition-aide] No MIDI clips with notes found in session.");
        return;
      }
      const maxScene = clipTasks.reduce((m, t) => Math.max(m, t.sceneIndex), 0);
      const sceneCount = maxScene + 1;
      const results = [];
      await context.ui.withinProgressDialog(
        `Analyzing session \u2014 ${totalMidiClips} clips\u2026`,
        { progress: 0 },
        async (update, abortSignal) => {
          let completed = 0;
          await Promise.all(
            clipTasks.map(async (task) => {
              if (abortSignal.aborted) return;
              let key = null;
              let score = 0;
              try {
                const groups = groupNotesByChord(task.notes);
                const recognitions = await Promise.all(
                  [...groups.entries()].map(
                    ([beatKey, pitches]) => engine.send("recognize_chord", { notes: pitches }).then((r) => ({ beatKey, r }))
                  )
                );
                const chordEntries = recognitions.sort((a, b) => a.beatKey - b.beatKey).flatMap(({ beatKey, r }) => {
                  const best = r.matches[0];
                  if (!best || best.score < 0.5) return [];
                  return [{ beat: beatKey / 1e3, name: best.chord.name }];
                }).filter((e, i, arr) => i === 0 || e.name !== arr[i - 1]?.name);
                if (chordEntries.length > 0) {
                  const analysis = await engine.send("analyze", {
                    chord_names: chordEntries.map((e) => e.name)
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
                `${completed} / ${totalMidiClips} clips\u2026`,
                Math.round(completed / totalMidiClips * 100)
              );
            })
          );
        }
      );
      const keyCounts = /* @__PURE__ */ new Map();
      for (const r of results) {
        if (r.key) keyCounts.set(r.key, (keyCounts.get(r.key) ?? 0) + 1);
      }
      let dominantKey = null;
      let maxCount = 0;
      for (const [k, count] of keyCounts) {
        if (count > maxCount) {
          maxCount = count;
          dominantKey = k;
        }
      }
      const trackSet = new Set(results.map((r) => r.trackIndex));
      const mapTracks = [...trackSet].sort((a, b) => a - b).map((ti) => {
        const trackName = results.find((r) => r.trackIndex === ti)?.trackName ?? `Track ${ti + 1}`;
        const clips = Array(sceneCount).fill(null);
        for (const r of results.filter((r2) => r2.trackIndex === ti)) {
          clips[r.sceneIndex] = { clipName: r.clipName, key: r.key, score: r.score };
        }
        return { name: trackName, clips };
      });
      const mapData = {
        dominantKey,
        sceneCount,
        sceneNames: sceneNames.slice(0, sceneCount),
        totalMidiClips,
        analyzedClips: results.filter((r) => r.key !== null).length,
        tracks: mapTracks
      };
      await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(
          sessionmap_default.replace("__SESSION_JSON__", safeJson(mapData))
        )}`,
        680,
        480
      );
      console.log(
        `[composition-aide] Session map: ${mapData.analyzedClips}/${totalMidiClips} clips` + (dominantKey ? ` \u2014 dominant key: ${dominantKey}` : "")
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("Scene", "Map Session Keys\u2026", "aide.sessionMap");
  context.commands.registerCommand(
    "aide.colorByKey",
    (arg) => void (async (_handle) => {
      const song = context.application.song;
      if (!song) return;
      const colorTasks = [];
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
        `Coloring ${colorTasks.length} clips by key\u2026`,
        { progress: 0 },
        async (update, abortSignal) => {
          let completed = 0;
          await Promise.all(
            colorTasks.map(async (task) => {
              if (abortSignal.aborted) return;
              try {
                const groups = groupNotesByChord(task.notes);
                const recognitions = await Promise.all(
                  [...groups.entries()].map(
                    ([beatKey, pitches]) => engine.send("recognize_chord", { notes: pitches }).then((r) => ({ beatKey, r }))
                  )
                );
                const chordNames = recognitions.sort((a, b) => a.beatKey - b.beatKey).flatMap(({ r }) => {
                  const best = r.matches[0];
                  return best && best.score >= 0.5 ? [best.chord.name] : [];
                }).filter((name, i, arr) => i === 0 || name !== arr[i - 1]);
                if (chordNames.length > 0) {
                  const analysis = await engine.send("analyze", {
                    chord_names: chordNames
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
                `${completed} / ${colorTasks.length} clips\u2026`,
                Math.round(completed / colorTasks.length * 100)
              );
            })
          );
        }
      );
      console.log(
        `[composition-aide] Colored ${coloredCount} / ${colorTasks.length} clips by key.`
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("Scene", "Color Clips by Key", "aide.colorByKey");
  context.commands.registerCommand(
    "aide.generateInClip",
    (arg) => void (async (handle) => {
      const clip = context.getObjectFromHandle(handle, MidiClip);
      const clipBeats = clip.looping ? clip.loopEnd - clip.loopStart : clip.duration;
      const fillBeats = clipBeats > 0 ? clipBeats : 8;
      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(interface_default)}`,
        380,
        416
      );
      let params;
      try {
        params = JSON.parse(rawResult);
      } catch {
        return;
      }
      if (!params) return;
      const chords = await resolveDialogChords(engine, params);
      const { voicings } = await engine.send("voice_progression", {
        chords,
        strategy: params.voicing,
        octave: 4
      });
      const beatsPerChord = fillBeats / chords.length;
      let notes = buildRhythmNotes(voicings, beatsPerChord, params.rhythm);
      if (params.snapToScale) {
        const intervals = SCALE_PCS_MAP[params.scale] ?? MAJOR_SCALE_PCS;
        const scalePCs = new Set(intervals.map((i) => (params.key + i) % 12));
        notes = notes.map((n) => ({ ...n, pitch: snapPitchToScale(n.pitch, scalePCs) }));
      }
      clip.notes = notes;
      clip.name = `${progressionLabel(params)} \u2014 ${params.keyName} ${params.scale.replace(/_/g, " ")}`;
      console.log(
        `[composition-aide] Generated "${clip.name}": ${chords.map((c) => c.name).join(" \u2013 ")} (${beatsPerChord.toFixed(2)} beats/chord)`
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("MidiClip", "Fill Clip with Progression\u2026", "aide.generateInClip");
  context.commands.registerCommand(
    "aide.voiceLead",
    (arg) => void (async (handle) => {
      const clip = context.getObjectFromHandle(handle, MidiClip);
      const notes = clip.notes;
      if (notes.length === 0) {
        console.log("[composition-aide] Clip has no notes.");
        return;
      }
      const groups = groupNotesByChord(notes);
      const recognizeResults = await Promise.all(
        [...groups.entries()].map(
          ([beatKey, pitches]) => engine.send("recognize_chord", { notes: pitches }).then((r) => ({ beatKey, r }))
        )
      );
      const chordEntries = recognizeResults.sort((a, b) => a.beatKey - b.beatKey).flatMap(({ beatKey, r }) => {
        const best = r.matches[0];
        if (!best || best.score < 0.5) return [];
        return [{ beat: beatKey / 1e3, name: best.chord.name }];
      }).filter((e, i, arr) => i === 0 || e.name !== arr[i - 1]?.name);
      if (chordEntries.length === 0) {
        console.log("[composition-aide] No chords identified in clip.");
        return;
      }
      const avgPitch = Math.round(notes.reduce((s, n) => s + n.pitch, 0) / notes.length);
      const voiceOctave = Math.max(3, Math.min(6, Math.floor(avgPitch / 12) - 1));
      const { voicings } = await engine.send("voice_progression", {
        chords: chordEntries.map((e) => e.name),
        strategy: "smooth",
        octave: voiceOctave
      });
      const snapMap = /* @__PURE__ */ new Map();
      for (const note of notes) {
        const snapped = Math.round(note.startTime / 0.25) * 0.25;
        const key = Math.round(snapped * 1e3);
        const arr = snapMap.get(key) ?? [];
        arr.push(note);
        snapMap.set(key, arr);
      }
      const chordBeatMs = new Set(chordEntries.map((e) => Math.round(e.beat * 1e3)));
      const newNotes = [];
      for (let i = 0; i < chordEntries.length; i++) {
        const entry = chordEntries[i];
        const voicing = voicings[i] ?? [];
        if (!entry || voicing.length === 0) continue;
        const beatMs = Math.round(entry.beat * 1e3);
        const originals = snapMap.get(beatMs) ?? [];
        const avgDur = originals.length > 0 ? originals.reduce((s, n) => s + n.duration, 0) / originals.length : 2;
        const avgVel = originals.length > 0 ? Math.round(originals.reduce((s, n) => s + (n.velocity ?? 90), 0) / originals.length) : 90;
        for (const pitch of voicing) {
          newNotes.push({
            pitch: Math.max(0, Math.min(127, pitch)),
            startTime: entry.beat,
            duration: avgDur,
            velocity: avgVel
          });
        }
      }
      const nonChordNotes = notes.filter((n) => {
        const snapped = Math.round(Math.round(n.startTime / 0.25) * 0.25 * 1e3);
        return !chordBeatMs.has(snapped);
      });
      clip.notes = [...nonChordNotes, ...newNotes];
      console.log(
        `[composition-aide] Voice-led "${clip.name || "(unnamed)"}": ${chordEntries.length} chords, octave ${voiceOctave}`
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("MidiClip", "Optimize Voice Leading", "aide.voiceLead");
  context.commands.registerCommand(
    "aide.snapToKey",
    (arg) => void (async (handle) => {
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
      const scaleResult = await engine.send("scale_info", {
        key: keyInfo.root,
        scale: keyInfo.scale
      });
      const allowedPCs = new Set(scaleResult.notes);
      const kept = notes.filter((n) => allowedPCs.has(n.pitch % 12));
      const removed = notes.length - kept.length;
      clip.notes = kept;
      console.log(
        `[composition-aide] Snapped "${clip.name || "(unnamed)"}" to ${keyInfo.label}: removed ${removed} out-of-key notes, kept ${kept.length}`
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("MidiClip", "Snap to Key", "aide.snapToKey");
  context.commands.registerCommand(
    "aide.batchTranspose",
    (arg) => void (async (selection) => {
      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(transpose_default)}`,
        300,
        200
      );
      let modalResult;
      try {
        modalResult = JSON.parse(rawResult);
      } catch {
        return;
      }
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
        clip.notes = notes.map((n) => ({
          pitch: Math.max(0, Math.min(127, n.pitch + semitones)),
          startTime: n.startTime,
          duration: n.duration,
          velocity: n.velocity ?? 90
        }));
        transposedClips++;
      }
      console.log(
        `[composition-aide] Transposed ${transposedClips} clips ${semitones > 0 ? "+" : ""}${semitones} semitones`
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction(
    "ClipSlotSelection",
    "Transpose Selected Clips\u2026",
    "aide.batchTranspose"
  );
  context.commands.registerCommand(
    "aide.findCompatible",
    (arg) => void (async (handle) => {
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
      const scanTasks = [];
      for (const track of song.tracks) {
        for (const slot of track.clipSlots) {
          const c = slot.clip;
          if (!(c instanceof MidiClip)) continue;
          const cNotes = c.notes;
          if (cNotes.length === 0) continue;
          scanTasks.push({ trackName: track.name, clip: c, notes: cNotes });
        }
      }
      const compatible = [];
      await context.ui.withinProgressDialog(
        "Scanning session for compatible clips\u2026",
        { progress: 0 },
        async (update, abortSignal) => {
          let completed = 0;
          await Promise.all(
            scanTasks.map(async (task) => {
              if (abortSignal.aborted) return;
              try {
                const keyInfo = await inferClipKey(task.notes, engine);
                if (keyInfo) {
                  const otherIsMinor = /minor|min\b/i.test(keyInfo.scale);
                  const label = compatibilityLabel(
                    refKey.root,
                    refIsMinor,
                    keyInfo.root,
                    otherIsMinor
                  );
                  if (label) {
                    compatible.push({
                      trackName: task.trackName,
                      clipName: task.clip.name || "(unnamed)",
                      key: keyInfo.label,
                      compatibility: label,
                      color: keyLabelToColor(keyInfo.label) ?? 4473924
                    });
                  }
                }
              } catch (err) {
                console.error(
                  `[composition-aide] Error scanning "${task.clip.name}":`,
                  err
                );
              }
              completed++;
              await update(
                `${completed} / ${scanTasks.length} clips\u2026`,
                Math.round(completed / scanTasks.length * 100)
              );
            })
          );
        }
      );
      const ORDER = [
        "Same key",
        "Relative minor",
        "Relative major",
        "Parallel major",
        "Parallel minor",
        "Dominant (V)",
        "Subdominant (IV)"
      ];
      compatible.sort((a, b) => {
        const ai = ORDER.indexOf(a.compatibility);
        const bi = ORDER.indexOf(b.compatibility);
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });
      const suggTargets = [
        { root: refKey.root, scale: refKey.scale, label: refKey.label, relationship: "Same key" }
      ];
      const relRoot = refIsMinor ? (refKey.root + 3) % 12 : (refKey.root + 9) % 12;
      suggTargets.push({
        root: relRoot,
        scale: refIsMinor ? "major" : "natural_minor",
        label: `${NOTE_NAMES[relRoot] ?? "C"} ${refIsMinor ? "major" : "minor"}`,
        relationship: refIsMinor ? "Relative major" : "Relative minor"
      });
      const domRoot = (refKey.root + 7) % 12;
      suggTargets.push({
        root: domRoot,
        scale: refKey.scale,
        label: `${NOTE_NAMES[domRoot] ?? "C"} ${refIsMinor ? "minor" : "major"}`,
        relationship: "Dominant (V)"
      });
      const subRoot = (refKey.root + 5) % 12;
      suggTargets.push({
        root: subRoot,
        scale: refKey.scale,
        label: `${NOTE_NAMES[subRoot] ?? "C"} ${refIsMinor ? "minor" : "major"}`,
        relationship: "Subdominant (IV)"
      });
      const SUGG_TEMPLATES = ["I-V-vi-IV", "I-IV-V-I", "ii-V-I"];
      const suggestions = [];
      await Promise.all(
        suggTargets.flatMap((target, ti) => {
          const templates = ti === 0 ? SUGG_TEMPLATES : SUGG_TEMPLATES.slice(0, 2);
          return templates.map(async (template) => {
            try {
              const result = await engine.send("progression", {
                key: target.root,
                scale: target.scale,
                template,
                sevenths: false
              });
              suggestions.push({
                relationship: target.relationship,
                keyLabel: target.label,
                template,
                chords: result.chords.map((c) => c.name),
                color: keyLabelToColor(target.label) ?? 4473924
              });
            } catch {
            }
          });
        })
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
        suggestions
      };
      const rawCompatResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(
          compatible_default.replace("__COMPATIBLE_JSON__", safeJson(displayData))
        )}`,
        620,
        560
      );
      let modalResult = null;
      try {
        const p = JSON.parse(rawCompatResult);
        if (p && typeof p.action === "string") modalResult = p;
      } catch {
      }
      if (modalResult?.action === "writeProgression") {
        const sugg = modalResult.suggestion;
        let emptySlot = null;
        outer: for (const track of song.tracks) {
          if (!(track instanceof MidiTrack)) continue;
          for (const slot of track.clipSlots) {
            if (slot.clip === null) {
              emptySlot = slot;
              break outer;
            }
          }
        }
        if (!emptySlot) {
          console.log("[composition-aide] No empty MIDI slot found \u2014 add an empty slot to a MIDI track.");
        } else {
          const beatsPerChord = 2;
          const totalBeats = sugg.chords.length * beatsPerChord;
          const allNotes = [];
          for (let i = 0; i < sugg.chords.length; i++) {
            try {
              const v = await engine.send(
                "voicings",
                { name: sugg.chords[i], octave: 4 }
              );
              for (const pitch of v.close ?? []) {
                allNotes.push({
                  pitch: Math.max(0, Math.min(127, pitch)),
                  startTime: i * beatsPerChord,
                  duration: beatsPerChord * 0.95,
                  velocity: 90
                });
              }
            } catch {
              console.warn(`[composition-aide] Could not voice chord "${sugg.chords[i]}"`);
            }
          }
          const newClip = await emptySlot.createMidiClip(totalBeats);
          newClip.notes = allNotes;
          newClip.name = `${sugg.keyLabel} \xB7 ${sugg.template}`;
          newClip.color = sugg.color;
          console.log(`[composition-aide] Wrote "${newClip.name}" (${sugg.chords.join(" \u2013 ")}) to empty slot`);
        }
      }
      console.log(
        `[composition-aide] Found ${compatible.length} compatible clips for "${displayData.refClipName}" (${refKey.label})`
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction(
    "MidiClip",
    "Find Compatible Clips\u2026",
    "aide.findCompatible"
  );
  context.commands.registerCommand(
    "aide.snapToScale",
    (arg) => void (async (handle) => {
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
      const scaleResult = await engine.send("scale_info", {
        key: keyInfo.root,
        scale: keyInfo.scale
      });
      const scalePCs = new Set(scaleResult.notes);
      let snapped = 0;
      const newNotes = notes.map((n) => {
        const newPitch = snapPitchToScale(n.pitch, scalePCs);
        if (newPitch !== n.pitch) snapped++;
        return { ...n, pitch: newPitch };
      });
      clip.notes = newNotes;
      console.log(
        `[composition-aide] Snapped "${clip.name || "(unnamed)"}" to ${keyInfo.label}: ${snapped} notes adjusted, ${notes.length - snapped} already in scale`
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("MidiClip", "Snap Notes to Scale", "aide.snapToScale");
  context.commands.registerCommand(
    "aide.labelClipKey",
    (arg) => void (async (handle) => {
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
      const newName = baseName.length > 0 ? `${baseName} [${keyLabelShort(keyInfo.label)}]` : `[${keyLabelShort(keyInfo.label)}]`;
      clip.name = newName;
      console.log(`[composition-aide] Labeled clip: "${newName}" (${keyInfo.label})`);
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("MidiClip", "Label with Key", "aide.labelClipKey");
  context.commands.registerCommand(
    "aide.labelAllKeys",
    (arg) => void (async (_handle) => {
      const song = context.application.song;
      if (!song) return;
      const tasks = [];
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
        `Labeling ${tasks.length} clips\u2026`,
        { progress: 0 },
        async (update, abortSignal) => {
          let completed = 0;
          await Promise.all(
            tasks.map(async (task) => {
              if (abortSignal.aborted) return;
              try {
                const keyInfo = await inferClipKey(task.notes, engine);
                if (keyInfo) {
                  const baseName = (task.clip.name || "").replace(/ \[[^\]]*\]$/, "").trim();
                  task.clip.name = baseName.length > 0 ? `${baseName} [${keyLabelShort(keyInfo.label)}]` : `[${keyLabelShort(keyInfo.label)}]`;
                  labeled++;
                }
              } catch (err) {
                console.error(`[composition-aide] Could not label "${task.clip.name}":`, err);
              }
              completed++;
              await update(
                `${completed} / ${tasks.length} clips\u2026`,
                Math.round(completed / tasks.length * 100)
              );
            })
          );
        }
      );
      console.log(`[composition-aide] Labeled ${labeled} / ${tasks.length} clips with key.`);
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("Scene", "Label All Clips with Key", "aide.labelAllKeys");
  context.commands.registerCommand(
    "aide.transposeSession",
    (arg) => void (async (_handle) => {
      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(transposesession_default)}`,
        300,
        250
      );
      let modalResult;
      try {
        modalResult = JSON.parse(rawResult);
      } catch {
        return;
      }
      if (!modalResult || modalResult.action !== "transpose") return;
      const { semitones, recolor } = modalResult;
      const song = context.application.song;
      if (!song) return;
      const allClips = [];
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
      const progressLabel = recolor ? `Transposing + recoloring ${allClips.length} clips\u2026` : `Transposing ${allClips.length} clips\u2026`;
      await context.ui.withinProgressDialog(
        progressLabel,
        { progress: 0 },
        async (update, abortSignal) => {
          if (semitones !== 0) {
            let done = 0;
            for (const task of allClips) {
              if (abortSignal.aborted) return;
              const notes = task.clip.notes;
              if (notes.length > 0) {
                task.clip.notes = notes.map((n) => ({
                  ...n,
                  pitch: Math.max(0, Math.min(127, n.pitch + semitones))
                }));
              }
              done++;
              await update(
                `Transposing: ${done} / ${allClips.length}\u2026`,
                recolor ? Math.round(done / allClips.length * 50) : Math.round(done / allClips.length * 100)
              );
            }
          }
          if (recolor && !abortSignal.aborted) {
            let coloredCount = 0;
            let done = 0;
            await Promise.all(
              allClips.map(async (task) => {
                if (abortSignal.aborted) return;
                try {
                  const notes = task.clip.notes;
                  if (notes.length === 0) return;
                  const groups = groupNotesByChord(notes);
                  const recognitions = await Promise.all(
                    [...groups.entries()].map(
                      ([beatKey, pitches]) => engine.send("recognize_chord", { notes: pitches }).then((r) => ({ beatKey, r }))
                    )
                  );
                  const chordNames = recognitions.sort((a, b) => a.beatKey - b.beatKey).flatMap(({ r }) => {
                    const best = r.matches[0];
                    return best && best.score >= 0.5 ? [best.chord.name] : [];
                  }).filter((name, i, arr) => i === 0 || name !== arr[i - 1]);
                  if (chordNames.length > 0) {
                    const analysis = await engine.send("analyze", {
                      chord_names: chordNames
                    });
                    const color = keyLabelToColor(analysis.inferred_key.label);
                    if (color !== null) {
                      task.clip.color = color;
                      coloredCount++;
                    }
                  }
                } catch {
                }
                done++;
                await update(
                  `Recoloring: ${done} / ${allClips.length}\u2026`,
                  50 + Math.round(done / allClips.length * 50)
                );
              })
            );
            console.log(
              `[composition-aide] Session transposed ${semitones > 0 ? "+" : ""}${semitones} semitones, ${coloredCount} clips recolored.`
            );
          } else {
            console.log(
              `[composition-aide] Session transposed ${semitones > 0 ? "+" : ""}${semitones} semitones.`
            );
          }
        }
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("Scene", "Transpose Session\u2026", "aide.transposeSession");
  context.commands.registerCommand(
    "aide.bassLine",
    (arg) => void (async (handle) => {
      const clip = context.getObjectFromHandle(handle, MidiClip);
      const notes = clip.notes;
      if (notes.length === 0) {
        console.log("[composition-aide] Clip has no notes.");
        return;
      }
      const groups = groupNotesByChord(notes);
      const recognizeResults = await Promise.all(
        [...groups.entries()].map(
          ([beatKey, pitches]) => engine.send("recognize_chord", { notes: pitches }).then((result) => ({ beatKey, result }))
        )
      );
      const chordEntries = recognizeResults.sort((a, b) => a.beatKey - b.beatKey).flatMap(({ beatKey, result }) => {
        const best = result.matches[0];
        if (!best || best.score < 0.5) return [];
        return [{
          beat: beatKey / 1e3,
          name: best.chord.name,
          root: best.chord.root,
          pitchClasses: best.chord.pitch_classes
        }];
      }).filter((entry, i, arr) => i === 0 || entry.name !== arr[i - 1]?.name);
      if (chordEntries.length === 0) {
        console.log("[composition-aide] Could not identify any chords in this clip.");
        return;
      }
      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(bass_default)}`,
        340,
        300
      );
      let params;
      try {
        params = JSON.parse(rawResult);
      } catch {
        return;
      }
      if (!params || params.action !== "bass") return;
      const clipBeats = clip.looping ? clip.loopEnd - clip.loopStart : clip.duration;
      const lastBeat = chordEntries[chordEntries.length - 1]?.beat ?? 0;
      const totalBeats = clipBeats > lastBeat ? clipBeats : lastBeat + 4;
      const spans = bassSpansFromChordEntries(chordEntries, totalBeats);
      const bassNotes = buildBassNotes(spans, params.pattern, params.octave);
      const song = context.application.song;
      let emptySlot = null;
      if (song) {
        outer: for (const track of song.tracks) {
          if (!(track instanceof MidiTrack)) continue;
          for (const slot of track.clipSlots) {
            if (slot.clip === null) {
              emptySlot = slot;
              break outer;
            }
          }
        }
      }
      if (!emptySlot) {
        console.log("[composition-aide] No empty MIDI slot found \u2014 add an empty slot to a MIDI track.");
        return;
      }
      const newClip = await emptySlot.createMidiClip(totalBeats);
      newClip.notes = bassNotes;
      newClip.name = `Bass (${params.pattern.replace(/_/g, " ")}) \u2014 ${clip.name || chordEntries.map((e) => e.name).join(" \u2013 ")}`;
      console.log(
        `[composition-aide] Bass line: ${chordEntries.map((e) => e.name).join(" \u2013 ")} (${params.pattern}, octave ${params.octave}, ${bassNotes.length} notes)`
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("MidiClip", "Generate Bass Line\u2026", "aide.bassLine");
  context.commands.registerCommand(
    "aide.songForm",
    (arg) => void (async (handle) => {
      const clickedScene = context.getObjectFromHandle(handle, Scene);
      const song = context.application.song;
      if (!song) return;
      const initKey = song.rootNote ?? 0;
      const initScale = ABLETON_SCALE_MAP[song.scaleName ?? "Major"] ?? "major";
      const htmlWithInit = songform_default.replace(
        "</head>",
        `<script>window._INIT={key:${initKey},scale:${JSON.stringify(initScale)}};</script></head>`
      );
      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(htmlWithInit)}`,
        920,
        640
      );
      let result;
      try {
        result = JSON.parse(rawResult);
      } catch {
        return;
      }
      if (!result || result.action !== "songform" || result.sections.length === 0) return;
      const built = await Promise.all(result.sections.map(async (section) => {
        const totalBeats = section.bars * 4;
        const chordCount = Math.max(1, Math.floor(totalBeats / section.beatsPerChord));
        let base;
        const custom = section.customProgression.trim();
        if (custom) {
          const tokens = custom.split(/[\s,|]+/).filter(Boolean);
          base = await Promise.all(
            tokens.map((tok) => parseProgressionToken(engine, tok, section.key, section.scale))
          );
        } else {
          const { chords: chords2 } = await engine.send("progression", {
            key: section.key,
            scale: section.scale,
            template: section.template,
            sevenths: result.sevenths
          });
          base = chords2;
        }
        const chords = [];
        for (let i = 0; i < chordCount; i++) chords.push(base[i % base.length]);
        const { voicings } = await engine.send("voice_progression", {
          chords,
          strategy: result.voicing,
          octave: 4
        });
        const chordNotes = buildRhythmNotes(voicings, section.beatsPerChord, section.rhythm);
        let bassNotes = null;
        if (section.bass !== "none") {
          const spans = chords.map((c, i) => ({
            start: i * section.beatsPerChord,
            span: section.beatsPerChord,
            rootPc: c.root,
            thirdIv: c.intervals[1] ?? 4,
            fifthIv: c.intervals[2] ?? 7,
            nextRootPc: chords[i + 1]?.root ?? null
          }));
          bassNotes = buildBassNotes(spans, section.bass, result.bassOctave);
        }
        const keyName = NOTE_NAMES[section.key] ?? "C";
        return {
          section,
          totalBeats,
          chordNotes,
          bassNotes,
          chordNames: [...new Set(chords.map((c) => c.name))],
          color: keyLabelToColor(`${keyName} ${section.scale.replace(/_/g, " ")}`)
        };
      }));
      const sceneIdx = song.scenes.findIndex(
        (s) => s.handle.id === clickedScene.handle.id
      );
      const insertAt = sceneIdx >= 0 ? sceneIdx + 1 : song.scenes.length;
      const midiTracks = song.tracks.filter(
        (t) => t instanceof MidiTrack
      );
      const chordTrack = midiTracks[0];
      const bassTrack = midiTracks[1];
      if (!chordTrack) {
        console.log("[composition-aide] No MIDI track found for the chord clips.");
        return;
      }
      const wantsBass = built.some((b) => b.bassNotes);
      if (wantsBass && !bassTrack) {
        console.log("[composition-aide] Only one MIDI track \u2014 bass clips skipped (add a second MIDI track).");
      }
      for (let i = 0; i < built.length; i++) {
        const b = built[i];
        const slotIdx = insertAt + i;
        const scene = await song.createScene(slotIdx);
        const keyShort = keyLabelShort(
          `${NOTE_NAMES[b.section.key] ?? "C"} ${b.section.scale.replace(/_/g, " ")}`
        );
        scene.name = `${b.section.name} \u2014 ${keyShort} \xB7 ${b.section.bars} bars`;
        const chordSlot = chordTrack.clipSlots[slotIdx];
        if (chordSlot) {
          const clip = await chordSlot.createMidiClip(b.totalBeats);
          clip.notes = b.chordNotes;
          clip.name = `${b.section.name} \xB7 ${b.chordNames.join(" ")}`;
          if (b.color !== null) clip.color = b.color;
        }
        if (b.bassNotes && bassTrack) {
          const bassSlot = bassTrack.clipSlots[slotIdx];
          if (bassSlot) {
            const clip = await bassSlot.createMidiClip(b.totalBeats);
            clip.notes = b.bassNotes;
            clip.name = `${b.section.name} \xB7 Bass (${b.section.bass.replace(/_/g, " ")})`;
            if (b.color !== null) clip.color = b.color;
          }
        }
      }
      const totalBars = built.reduce((n, b) => n + b.section.bars, 0);
      console.log(
        `[composition-aide] Song form: ${built.length} scenes, ${totalBars} bars (${built.map((b) => b.section.name).join(" \u2192 ")})`
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("Scene", "Compose Song Form\u2026", "aide.songForm");
  context.commands.registerCommand(
    "aide.theoryMachine",
    (arg) => void (async (handle) => {
      const slot = context.getObjectFromHandle(handle, ClipSlot);
      const song = context.application.song;
      const initKey = song?.rootNote ?? 0;
      const initScale = ABLETON_SCALE_MAP[song?.scaleName ?? "Major"] ?? "major";
      const htmlWithInit = theory_machine_default.replace(
        "</head>",
        `<script>window._INIT={key:${initKey},scale:${JSON.stringify(initScale)}};</script></head>`
      );
      const rawResult = await context.ui.showModalDialog(
        `data:text/html,${encodeURIComponent(htmlWithInit)}`,
        1e3,
        700
      );
      let result;
      try {
        result = JSON.parse(rawResult);
      } catch {
        return;
      }
      if (!result || result.action !== "writeClip") return;
      const { chords, beatsPerChord, totalBeats } = result;
      const newNotes = buildRhythmNotes(
        chords.map((c) => c.notes),
        beatsPerChord,
        result.rhythm
      );
      const clipName = chords.map((c) => c.name).join(" \u2013 ");
      const existing = slot.clip;
      if (existing instanceof MidiClip) {
        existing.notes = newNotes;
        existing.name = clipName;
      } else {
        const clip = await slot.createMidiClip(totalBeats);
        clip.notes = newNotes;
        clip.name = clipName;
      }
      console.log(
        `[composition-aide] Theory Machine: wrote ${chords.length} chords (${beatsPerChord} beats each) \u2014 "${clipName}"`
      );
    })(arg).catch((e) => console.error(e))
  );
  context.ui.registerContextMenuAction("ClipSlot", "Modal Explorer\u2026", "aide.theoryMachine");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
//# sourceMappingURL=extension.js.map

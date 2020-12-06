"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const Patch_1 = require("./Patch");
const DEVICE_CONNECTED = Symbol();
const DEVICE_DISCONNECTED = Symbol();
const PRESET_NUMBER_CHANGED = Symbol();
const SETTINGS_LOADED = Symbol();
const SETTINGS_UPDATED = Symbol();
const PATCH_CHANGED = Symbol();
// noinspection JSUnusedGlobalSymbols
class CodeApi {
    constructor() {
        this.emitter = new events_1.EventEmitter();
        this.onStateChanged = this.onStateChanged.bind(this);
        this.onMidiMessage = this.onMidiMessage.bind(this);
    }
    // region Listeners
    addDeviceConnectedListener(listener) {
        this.emitter.on(DEVICE_CONNECTED, listener);
    }
    addDeviceDisconnectedListener(listener) {
        this.emitter.on(DEVICE_DISCONNECTED, listener);
    }
    addPresetNumberChanged(listener) {
        this.emitter.on(PRESET_NUMBER_CHANGED, listener);
    }
    addSettingsLoadedListener(listener) {
        this.emitter.on(SETTINGS_LOADED, listener);
    }
    addSettingsUpdatedListener(listener) {
        this.emitter.on(SETTINGS_UPDATED, listener);
    }
    addPatchChangedListener(listener) {
        this.emitter.on(PATCH_CHANGED, listener);
    }
    // endregion
    connect() {
        navigator.requestMIDIAccess({ sysex: true })
            .then(access => {
            this.onStateChanged(access);
            access.onstatechange = () => this.onStateChanged(access);
        });
    }
    switchToPreset(index) {
        var _a;
        (_a = this.output) === null || _a === void 0 ? void 0 : _a.send([0xc0, index]);
    }
    loadPatch() {
        var _a;
        (_a = this.output) === null || _a === void 0 ? void 0 : _a.send([0xf0, 0x00, 0x21, 0x15, 0x7f, 0x7f, 0x7f, 0x73, 0x01, 0x00, 0xf7]);
    }
    loadPreset(index) {
        var _a;
        (_a = this.output) === null || _a === void 0 ? void 0 : _a.send([0xf0, 0x00, 0x21, 0x15, 0x7f, 0x7f, 0x7f, 0x72, 0x01, index, 0xf7]);
    }
    onStateChanged(midiAccess) {
        let newOutput = undefined;
        midiAccess.outputs.forEach(output => {
            if (output.name === 'CODE') {
                newOutput = output;
            }
        });
        midiAccess.inputs.forEach(input => {
            if (input.name === 'CODE') {
                input.onmidimessage = this.onMidiMessage;
            }
        });
        if (this.output && !newOutput) {
            this.output = undefined;
            this.emitter.emit(DEVICE_DISCONNECTED);
        }
        if (!this.output && newOutput) {
            this.output = newOutput;
            this.emitter.emit(DEVICE_CONNECTED);
        }
    }
    onMidiMessage(e) {
        const data = e.data;
        console.log(data);
        switch (data[0]) {
            case 0xA0: // tuner
                break;
            case 0xB0:
                this.handleSettingsMessage(data[1], data[2]);
                break;
            case 0xC0:
                this.emitter.emit(PRESET_NUMBER_CHANGED, data[1]);
                break;
            case 0xF0:
                this.handlePresetSettingsMessage(data);
                break;
        }
    }
    handlePresetSettingsMessage(data) {
        // 0x72 - preset
        // 0x73 - current settings
        const target = data[7];
        // 1 - ->output - recall
        // 2 - ->output - set
        // 3 - input-> loaded
        // 4 - input-> updated
        const command = data[8];
        switch (command) {
            case 3:
                const patch = this.decodePatch(data);
                this.emitter.emit(SETTINGS_LOADED, patch);
                break;
            case 4:
                const index = data[9];
                this.emitter.emit(SETTINGS_UPDATED, index);
                break;
            default:
                throw {
                    message: 'Illegal Argument',
                    target: target,
                    command: command,
                };
        }
    }
    handleSettingsMessage(key, value) {
        switch (key) {
            case 31:
                return this.emitter.emit(PATCH_CHANGED, { delayTimeMsb: value });
            case 63:
                return this.emitter.emit(PATCH_CHANGED, { delayTimeLsb: value });
            case 70:
                return this.emitter.emit(PATCH_CHANGED, { gain: value });
            case 71:
                return this.emitter.emit(PATCH_CHANGED, { bass: value });
            case 72:
                return this.emitter.emit(PATCH_CHANGED, { middle: value });
            case 73:
                return this.emitter.emit(PATCH_CHANGED, { treble: value });
            case 74:
                return this.emitter.emit(PATCH_CHANGED, { volume: value });
            case 75:
                return this.emitter.emit(PATCH_CHANGED, { pedalEnabled: value === 1 });
            case 76:
                return this.emitter.emit(PATCH_CHANGED, {
                    // @ts-ignore
                    pedalType: Patch_1.PedalType[Patch_1.PedalType[value]],
                    pedalParam1: 0,
                    pedalParam2: 0,
                    pedalParam3: 0,
                    pedalParam4: 0,
                });
            case 77:
                return this.emitter.emit(PATCH_CHANGED, { pedalParam1: value });
            case 78:
                return this.emitter.emit(PATCH_CHANGED, { pedalParam2: value });
            case 79:
                return this.emitter.emit(PATCH_CHANGED, { pedalParam3: value });
            case 80:
                return this.emitter.emit(PATCH_CHANGED, { pedalParam4: value });
            case 81:
                return this.emitter.emit(PATCH_CHANGED, { preAmpEnabled: value === 1 });
            case 82:
                // @ts-ignore
                return this.emitter.emit(PATCH_CHANGED, { preAmpType: Patch_1.PreAmpType[Patch_1.PreAmpType[value]] });
            case 83:
                return this.emitter.emit(PATCH_CHANGED, { gate: value });
            case 85:
                return this.emitter.emit(PATCH_CHANGED, { modulationEnabled: value === 1 });
            case 86:
                // @ts-ignore
                return this.emitter.emit(PATCH_CHANGED, { modulationType: Patch_1.ModulationType[Patch_1.ModulationType[value]] });
            case 87:
                return this.emitter.emit(PATCH_CHANGED, { modulationParam1: value });
            case 89:
                return this.emitter.emit(PATCH_CHANGED, { modulationParam2: value });
            case 90:
                return this.emitter.emit(PATCH_CHANGED, { modulationParam3: value });
            case 102:
                return this.emitter.emit(PATCH_CHANGED, { modulationParam4: value });
            case 103:
                return this.emitter.emit(PATCH_CHANGED, { delayEnabled: value === 1 });
            case 104:
                // @ts-ignore
                return this.emitter.emit(PATCH_CHANGED, { delayType: Patch_1.DelayType[Patch_1.DelayType[value]] });
            case 105:
                return this.emitter.emit(PATCH_CHANGED, { delayParam2: value });
            case 106:
                return this.emitter.emit(PATCH_CHANGED, { delayParam3: value });
            case 107:
                return this.emitter.emit(PATCH_CHANGED, { delayParam4: value });
            case 108:
                return this.emitter.emit(PATCH_CHANGED, { reverbEnabled: value === 1 });
            case 109:
                // @ts-ignore
                return this.emitter.emit(PATCH_CHANGED, { reverbType: Patch_1.ReverbType[Patch_1.ReverbType[value]] });
            case 110:
                return this.emitter.emit(PATCH_CHANGED, { reverbParam1: value });
            case 111:
                return this.emitter.emit(PATCH_CHANGED, { reverbParam2: value });
            case 112:
                return this.emitter.emit(PATCH_CHANGED, { reverbParam3: value });
            case 113:
                return this.emitter.emit(PATCH_CHANGED, { reverbParam4: value });
            case 114:
                return this.emitter.emit(PATCH_CHANGED, { powerAmpEnabled: value === 1 });
            case 115:
                // @ts-ignore
                return this.emitter.emit(PATCH_CHANGED, { powerAmpType: Patch_1.PowerAmpType[Patch_1.PowerAmpType[value]] });
            case 116:
                return this.emitter.emit(PATCH_CHANGED, { cabinetEnabled: value === 1 });
            case 117:
                // @ts-ignore
                return this.emitter.emit(PATCH_CHANGED, { cabinetType: Patch_1.CabinetType[Patch_1.CabinetType[value]] });
            case 118:
                return this.emitter.emit(PATCH_CHANGED, { presence: value });
            case 119:
                return this.emitter.emit(PATCH_CHANGED, { resonance: value });
            default:
                break;
        }
    }
    decodePatch(data) {
        return {
            number: data[9],
            name: Array.from(data.slice(10, 28)).map(c => String.fromCharCode(c)).join('').trim(),
            gain: data[29],
            bass: data[30],
            middle: data[31],
            treble: data[32],
            volume: data[33],
            pedalEnabled: data[34] === 1,
            // @ts-ignore
            pedalType: Patch_1.PedalType[Patch_1.PedalType[data[35]]],
            pedalParam1: data[36],
            pedalParam2: data[37],
            pedalParam3: data[38],
            pedalParam4: data[39],
            preAmpEnabled: data[40] === 1,
            // @ts-ignore
            preAmpType: Patch_1.PreAmpType[Patch_1.PreAmpType[data[41]]],
            gate: data[42],
            modulationEnabled: data[43] === 1,
            // @ts-ignore
            modulationType: Patch_1.ModulationType[Patch_1.ModulationType[data[44]]],
            modulationParam1: data[45],
            modulationParam2: data[46],
            modulationParam3: data[47],
            modulationParam4: data[48],
            delayEnabled: data[49] === 1,
            // @ts-ignore
            delayType: Patch_1.DelayType[Patch_1.DelayType[data[50]]],
            delayTimeMsb: data[51],
            delayTimeLsb: data[52],
            delayParam2: data[53],
            delayParam3: data[54],
            delayParam4: data[55],
            reverbEnabled: data[56] === 1,
            // @ts-ignore
            reverbType: Patch_1.ReverbType[Patch_1.ReverbType[data[57]]],
            reverbParam1: data[58],
            reverbParam2: data[59],
            reverbParam3: data[60],
            reverbParam4: data[61],
            powerAmpEnabled: data[62] === 1,
            // @ts-ignore
            powerAmpType: Patch_1.PowerAmpType[Patch_1.PowerAmpType[data[63]]],
            cabinetEnabled: data[64] === 1,
            // @ts-ignore
            cabinetType: Patch_1.CabinetType[Patch_1.CabinetType[data[65]]],
            presence: data[66],
            resonance: data[67],
        };
    }
}
const codeApi = new CodeApi();
// noinspection JSUnusedGlobalSymbols
exports.default = codeApi;

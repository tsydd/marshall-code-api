"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Patch_1 = require("./Patch");
class CodeApi {
    constructor(options) {
        this.options = options;
        this.onStateChanged = this.onStateChanged.bind(this);
        this.onMidiMessage = this.onMidiMessage.bind(this);
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
        var _a, _b, _c, _d;
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
            (_b = (_a = this.options).onConnected) === null || _b === void 0 ? void 0 : _b.call(_a, false);
        }
        if (!this.output && newOutput) {
            this.output = newOutput;
            (_d = (_c = this.options).onConnected) === null || _d === void 0 ? void 0 : _d.call(_c, true);
        }
    }
    onMidiMessage(e) {
        var _a, _b;
        const data = e.data;
        if (this.options.debug) {
            console.log(data);
        }
        switch (data[0]) {
            case 0xA0: // tuner
                break;
            case 0xB0:
                this.handleSettingsMessage(data[1], data[2]);
                break;
            case 0xC0:
                (_b = (_a = this.options).onPresetNumberChanged) === null || _b === void 0 ? void 0 : _b.call(_a, data[1]);
                break;
            case 0xF0:
                this.handlePresetSettingsMessage(data);
                break;
        }
    }
    handlePresetSettingsMessage(data) {
        var _a, _b, _c, _d;
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
                const patch = Patch_1.factory.fromArray(data);
                (_b = (_a = this.options).onSettingsLoaded) === null || _b === void 0 ? void 0 : _b.call(_a, patch);
                break;
            case 4:
                const index = data[9];
                (_d = (_c = this.options).onSettingsUpdated) === null || _d === void 0 ? void 0 : _d.call(_c, index);
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53;
        switch (key) {
            case 31:
                return (_b = (_a = this.options).onPatchChanged) === null || _b === void 0 ? void 0 : _b.call(_a, { delayTimeMsb: value });
            case 63:
                return (_d = (_c = this.options).onPatchChanged) === null || _d === void 0 ? void 0 : _d.call(_c, { delayTimeLsb: value });
            case 70:
                return (_f = (_e = this.options).onPatchChanged) === null || _f === void 0 ? void 0 : _f.call(_e, { gain: value });
            case 71:
                return (_h = (_g = this.options).onPatchChanged) === null || _h === void 0 ? void 0 : _h.call(_g, { bass: value });
            case 72:
                return (_k = (_j = this.options).onPatchChanged) === null || _k === void 0 ? void 0 : _k.call(_j, { middle: value });
            case 73:
                return (_m = (_l = this.options).onPatchChanged) === null || _m === void 0 ? void 0 : _m.call(_l, { treble: value });
            case 74:
                return (_p = (_o = this.options).onPatchChanged) === null || _p === void 0 ? void 0 : _p.call(_o, { volume: value });
            case 75:
                return (_r = (_q = this.options).onPatchChanged) === null || _r === void 0 ? void 0 : _r.call(_q, { pedalEnabled: value === 1 });
            case 76:
                return (_t = (_s = this.options).onPatchChanged) === null || _t === void 0 ? void 0 : _t.call(_s, {
                    // @ts-ignore
                    pedalType: Patch_1.PedalType[Patch_1.PedalType[value]],
                    pedalParam1: 0,
                    pedalParam2: 0,
                    pedalParam3: 0,
                    pedalParam4: 0,
                });
            case 77:
                return (_v = (_u = this.options).onPatchChanged) === null || _v === void 0 ? void 0 : _v.call(_u, { pedalParam1: value });
            case 78:
                return (_x = (_w = this.options).onPatchChanged) === null || _x === void 0 ? void 0 : _x.call(_w, { pedalParam2: value });
            case 79:
                return (_z = (_y = this.options).onPatchChanged) === null || _z === void 0 ? void 0 : _z.call(_y, { pedalParam3: value });
            case 80:
                return (_1 = (_0 = this.options).onPatchChanged) === null || _1 === void 0 ? void 0 : _1.call(_0, { pedalParam4: value });
            case 81:
                return (_3 = (_2 = this.options).onPatchChanged) === null || _3 === void 0 ? void 0 : _3.call(_2, { preAmpEnabled: value === 1 });
            case 82:
                // @ts-ignore
                return (_5 = (_4 = this.options).onPatchChanged) === null || _5 === void 0 ? void 0 : _5.call(_4, { preAmpType: Patch_1.PreAmpType[Patch_1.PreAmpType[value]] });
            case 83:
                return (_7 = (_6 = this.options).onPatchChanged) === null || _7 === void 0 ? void 0 : _7.call(_6, { gate: value });
            case 85:
                return (_9 = (_8 = this.options).onPatchChanged) === null || _9 === void 0 ? void 0 : _9.call(_8, { modulationEnabled: value === 1 });
            case 86:
                // @ts-ignore
                return (_11 = (_10 = this.options).onPatchChanged) === null || _11 === void 0 ? void 0 : _11.call(_10, { modulationType: Patch_1.ModulationType[Patch_1.ModulationType[value]] });
            case 87:
                return (_13 = (_12 = this.options).onPatchChanged) === null || _13 === void 0 ? void 0 : _13.call(_12, { modulationParam1: value });
            case 89:
                return (_15 = (_14 = this.options).onPatchChanged) === null || _15 === void 0 ? void 0 : _15.call(_14, { modulationParam2: value });
            case 90:
                return (_17 = (_16 = this.options).onPatchChanged) === null || _17 === void 0 ? void 0 : _17.call(_16, { modulationParam3: value });
            case 102:
                return (_19 = (_18 = this.options).onPatchChanged) === null || _19 === void 0 ? void 0 : _19.call(_18, { modulationParam4: value });
            case 103:
                return (_21 = (_20 = this.options).onPatchChanged) === null || _21 === void 0 ? void 0 : _21.call(_20, { delayEnabled: value === 1 });
            case 104:
                // @ts-ignore
                return (_23 = (_22 = this.options).onPatchChanged) === null || _23 === void 0 ? void 0 : _23.call(_22, { delayType: Patch_1.DelayType[Patch_1.DelayType[value]] });
            case 105:
                return (_25 = (_24 = this.options).onPatchChanged) === null || _25 === void 0 ? void 0 : _25.call(_24, { delayParam2: value });
            case 106:
                return (_27 = (_26 = this.options).onPatchChanged) === null || _27 === void 0 ? void 0 : _27.call(_26, { delayParam3: value });
            case 107:
                return (_29 = (_28 = this.options).onPatchChanged) === null || _29 === void 0 ? void 0 : _29.call(_28, { delayParam4: value });
            case 108:
                return (_31 = (_30 = this.options).onPatchChanged) === null || _31 === void 0 ? void 0 : _31.call(_30, { reverbEnabled: value === 1 });
            case 109:
                // @ts-ignore
                return (_33 = (_32 = this.options).onPatchChanged) === null || _33 === void 0 ? void 0 : _33.call(_32, { reverbType: Patch_1.ReverbType[Patch_1.ReverbType[value]] });
            case 110:
                return (_35 = (_34 = this.options).onPatchChanged) === null || _35 === void 0 ? void 0 : _35.call(_34, { reverbParam1: value });
            case 111:
                return (_37 = (_36 = this.options).onPatchChanged) === null || _37 === void 0 ? void 0 : _37.call(_36, { reverbParam2: value });
            case 112:
                return (_39 = (_38 = this.options).onPatchChanged) === null || _39 === void 0 ? void 0 : _39.call(_38, { reverbParam3: value });
            case 113:
                return (_41 = (_40 = this.options).onPatchChanged) === null || _41 === void 0 ? void 0 : _41.call(_40, { reverbParam4: value });
            case 114:
                return (_43 = (_42 = this.options).onPatchChanged) === null || _43 === void 0 ? void 0 : _43.call(_42, { powerAmpEnabled: value === 1 });
            case 115:
                // @ts-ignore
                return (_45 = (_44 = this.options).onPatchChanged) === null || _45 === void 0 ? void 0 : _45.call(_44, { powerAmpType: Patch_1.PowerAmpType[Patch_1.PowerAmpType[value]] });
            case 116:
                return (_47 = (_46 = this.options).onPatchChanged) === null || _47 === void 0 ? void 0 : _47.call(_46, { cabinetEnabled: value === 1 });
            case 117:
                // @ts-ignore
                return (_49 = (_48 = this.options).onPatchChanged) === null || _49 === void 0 ? void 0 : _49.call(_48, { cabinetType: Patch_1.CabinetType[Patch_1.CabinetType[value]] });
            case 118:
                return (_51 = (_50 = this.options).onPatchChanged) === null || _51 === void 0 ? void 0 : _51.call(_50, { presence: value });
            case 119:
                return (_53 = (_52 = this.options).onPatchChanged) === null || _53 === void 0 ? void 0 : _53.call(_52, { resonance: value });
            default:
                break;
        }
    }
}
exports.default = CodeApi;

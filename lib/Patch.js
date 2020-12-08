"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = exports.CabinetType = exports.PowerAmpType = exports.ReverbType = exports.TremoloMode = exports.PhaserMode = exports.FlangerMode = exports.ChorusMode = exports.ModulationType = exports.DelayType = exports.PreAmpType = exports.AutoWahMode = exports.DistortionMode = exports.PedalType = void 0;
var PedalType;
(function (PedalType) {
    PedalType[PedalType["Compressor"] = 0] = "Compressor";
    PedalType[PedalType["Distortion"] = 1] = "Distortion";
    PedalType[PedalType["Auto Wah"] = 2] = "Auto Wah";
    PedalType[PedalType["Pitch Shifter"] = 3] = "Pitch Shifter";
})(PedalType = exports.PedalType || (exports.PedalType = {}));
var DistortionMode;
(function (DistortionMode) {
    DistortionMode[DistortionMode["GUV"] = 0] = "GUV";
    DistortionMode[DistortionMode["ODR"] = 1] = "ODR";
    DistortionMode[DistortionMode["DIS"] = 2] = "DIS";
})(DistortionMode = exports.DistortionMode || (exports.DistortionMode = {}));
var AutoWahMode;
(function (AutoWahMode) {
    AutoWahMode[AutoWahMode["ENV"] = 0] = "ENV";
    AutoWahMode[AutoWahMode["FLO"] = 1] = "FLO";
})(AutoWahMode = exports.AutoWahMode || (exports.AutoWahMode = {}));
var PreAmpType;
(function (PreAmpType) {
    PreAmpType[PreAmpType["JTM45"] = 0] = "JTM45";
    PreAmpType[PreAmpType["CL DSL"] = 1] = "CL DSL";
    PreAmpType[PreAmpType["CL American"] = 2] = "CL American";
    PreAmpType[PreAmpType["CL JVM"] = 3] = "CL JVM";
    PreAmpType[PreAmpType["Acoustic"] = 4] = "Acoustic";
    PreAmpType[PreAmpType["Bluesbreaker"] = 5] = "Bluesbreaker";
    PreAmpType[PreAmpType["Plexi"] = 6] = "Plexi";
    PreAmpType[PreAmpType["CR American"] = 7] = "CR American";
    PreAmpType[PreAmpType["JCM800"] = 8] = "JCM800";
    PreAmpType[PreAmpType["50's British"] = 9] = "50's British";
    PreAmpType[PreAmpType["OD JVM"] = 10] = "OD JVM";
    PreAmpType[PreAmpType["OD DSL"] = 11] = "OD DSL";
    PreAmpType[PreAmpType["OD American"] = 12] = "OD American";
    PreAmpType[PreAmpType["OD Silver Jubilee"] = 13] = "OD Silver Jubilee";
    PreAmpType[PreAmpType["Neutral"] = 14] = "Neutral";
})(PreAmpType = exports.PreAmpType || (exports.PreAmpType = {}));
var DelayType;
(function (DelayType) {
    DelayType[DelayType["Studio"] = 0] = "Studio";
    DelayType[DelayType["Vintage"] = 1] = "Vintage";
    DelayType[DelayType["Multi"] = 2] = "Multi";
    DelayType[DelayType["Reverse"] = 3] = "Reverse";
})(DelayType = exports.DelayType || (exports.DelayType = {}));
var ModulationType;
(function (ModulationType) {
    ModulationType[ModulationType["Chorus"] = 0] = "Chorus";
    ModulationType[ModulationType["Flanger"] = 1] = "Flanger";
    ModulationType[ModulationType["Phaser"] = 2] = "Phaser";
    ModulationType[ModulationType["Tremolo"] = 3] = "Tremolo";
})(ModulationType = exports.ModulationType || (exports.ModulationType = {}));
var ChorusMode;
(function (ChorusMode) {
    ChorusMode[ChorusMode["CLS"] = 0] = "CLS";
    ChorusMode[ChorusMode["VIB"] = 1] = "VIB";
})(ChorusMode = exports.ChorusMode || (exports.ChorusMode = {}));
var FlangerMode;
(function (FlangerMode) {
    FlangerMode[FlangerMode["JET"] = 0] = "JET";
    FlangerMode[FlangerMode["MET"] = 1] = "MET";
})(FlangerMode = exports.FlangerMode || (exports.FlangerMode = {}));
var PhaserMode;
(function (PhaserMode) {
    PhaserMode[PhaserMode["CLS"] = 0] = "CLS";
    PhaserMode[PhaserMode["VBE"] = 1] = "VBE";
})(PhaserMode = exports.PhaserMode || (exports.PhaserMode = {}));
var TremoloMode;
(function (TremoloMode) {
    TremoloMode[TremoloMode["VLV"] = 0] = "VLV";
    TremoloMode[TremoloMode["SQR"] = 1] = "SQR";
})(TremoloMode = exports.TremoloMode || (exports.TremoloMode = {}));
var ReverbType;
(function (ReverbType) {
    ReverbType[ReverbType["Room"] = 0] = "Room";
    ReverbType[ReverbType["Hall"] = 1] = "Hall";
    ReverbType[ReverbType["Spring"] = 2] = "Spring";
    ReverbType[ReverbType["Stadium"] = 3] = "Stadium";
})(ReverbType = exports.ReverbType || (exports.ReverbType = {}));
var PowerAmpType;
(function (PowerAmpType) {
    PowerAmpType[PowerAmpType["Classic Marshall 100w"] = 0] = "Classic Marshall 100w";
    PowerAmpType[PowerAmpType["Vintage Marshall 30w"] = 1] = "Vintage Marshall 30w";
    PowerAmpType[PowerAmpType["British Class A"] = 2] = "British Class A";
    PowerAmpType[PowerAmpType["American Class A/B"] = 3] = "American Class A/B";
})(PowerAmpType = exports.PowerAmpType || (exports.PowerAmpType = {}));
var CabinetType;
(function (CabinetType) {
    // @ts-ignore
    CabinetType[CabinetType["1960"] = 0] = "1960";
    CabinetType[CabinetType["1960V"] = 1] = "1960V";
    CabinetType[CabinetType["1960X"] = 2] = "1960X";
    CabinetType[CabinetType["1960HW"] = 3] = "1960HW";
    // @ts-ignore
    CabinetType[CabinetType["1936"] = 4] = "1936";
    CabinetType[CabinetType["1936V"] = 5] = "1936V";
    // @ts-ignore
    CabinetType[CabinetType["1912"] = 6] = "1912";
    CabinetType[CabinetType["1974CX"] = 7] = "1974CX";
})(CabinetType = exports.CabinetType || (exports.CabinetType = {}));
exports.factory = {
    default() {
        return {
            gain: 0,
            bass: 0,
            middle: 0,
            treble: 0,
            volume: 0,
            pedalEnabled: false,
            pedalType: PedalType.Compressor,
            pedalParam1: 0,
            pedalParam2: 0,
            pedalParam3: 0,
            pedalParam4: 0,
            preAmpEnabled: false,
            preAmpType: PreAmpType.JTM45,
            gate: 0,
            modulationEnabled: false,
            modulationType: ModulationType.Chorus,
            modulationParam1: 0,
            modulationParam2: 0,
            modulationParam3: 0,
            modulationParam4: 0,
            delayEnabled: false,
            delayType: DelayType.Studio,
            delayTimeMsb: 0,
            delayTimeLsb: 0,
            delayParam2: 0,
            delayParam3: 0,
            delayParam4: 0,
            reverbEnabled: false,
            reverbType: ReverbType.Room,
            reverbParam1: 0,
            reverbParam2: 0,
            reverbParam3: 0,
            reverbParam4: 0,
            powerAmpEnabled: false,
            powerAmpType: PowerAmpType['Classic Marshall 100w'],
            cabinetEnabled: false,
            cabinetType: CabinetType['1960'],
            presence: 0,
            resonance: 0,
        };
    },
    fromArray(data) {
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
            pedalType: PedalType[PedalType[data[35]]],
            pedalParam1: data[36],
            pedalParam2: data[37],
            pedalParam3: data[38],
            pedalParam4: data[39],
            preAmpEnabled: data[40] === 1,
            // @ts-ignore
            preAmpType: PreAmpType[PreAmpType[data[41]]],
            gate: data[42],
            modulationEnabled: data[43] === 1,
            // @ts-ignore
            modulationType: ModulationType[ModulationType[data[44]]],
            modulationParam1: data[45],
            modulationParam2: data[46],
            modulationParam3: data[47],
            modulationParam4: data[48],
            delayEnabled: data[49] === 1,
            // @ts-ignore
            delayType: DelayType[DelayType[data[50]]],
            delayTimeMsb: data[51],
            delayTimeLsb: data[52],
            delayParam2: data[53],
            delayParam3: data[54],
            delayParam4: data[55],
            reverbEnabled: data[56] === 1,
            // @ts-ignore
            reverbType: ReverbType[ReverbType[data[57]]],
            reverbParam1: data[58],
            reverbParam2: data[59],
            reverbParam3: data[60],
            reverbParam4: data[61],
            powerAmpEnabled: data[62] === 1,
            // @ts-ignore
            powerAmpType: PowerAmpType[PowerAmpType[data[63]]],
            cabinetEnabled: data[64] === 1,
            // @ts-ignore
            cabinetType: CabinetType[CabinetType[data[65]]],
            presence: data[66],
            resonance: data[67],
        };
    }
};

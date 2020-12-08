export declare enum PedalType {
    Compressor = 0,
    Distortion = 1,
    'Auto Wah' = 2,
    'Pitch Shifter' = 3
}
export declare enum DistortionMode {
    GUV = 0,
    ODR = 1,
    DIS = 2
}
export declare enum AutoWahMode {
    ENV = 0,
    FLO = 1
}
export declare enum PreAmpType {
    JTM45 = 0,
    'CL DSL' = 1,
    'CL American' = 2,
    'CL JVM' = 3,
    Acoustic = 4,
    Bluesbreaker = 5,
    Plexi = 6,
    'CR American' = 7,
    JCM800 = 8,
    '50\'s British' = 9,
    'OD JVM' = 10,
    'OD DSL' = 11,
    'OD American' = 12,
    'OD Silver Jubilee' = 13,
    'Neutral' = 14
}
export declare enum DelayType {
    Studio = 0,
    Vintage = 1,
    Multi = 2,
    Reverse = 3
}
export declare enum ModulationType {
    Chorus = 0,
    Flanger = 1,
    Phaser = 2,
    Tremolo = 3
}
export declare enum ChorusMode {
    CLS = 0,
    VIB = 1
}
export declare enum FlangerMode {
    JET = 0,
    MET = 1
}
export declare enum PhaserMode {
    CLS = 0,
    VBE = 1
}
export declare enum TremoloMode {
    VLV = 0,
    SQR = 1
}
export declare enum ReverbType {
    Room = 0,
    Hall = 1,
    Spring = 2,
    Stadium = 3
}
export declare enum PowerAmpType {
    'Classic Marshall 100w' = 0,
    'Vintage Marshall 30w' = 1,
    'British Class A' = 2,
    'American Class A/B' = 3
}
export declare enum CabinetType {
    '1960' = 0,
    '1960V' = 1,
    '1960X' = 2,
    '1960HW' = 3,
    '1936' = 4,
    '1936V' = 5,
    '1912' = 6,
    '1974CX' = 7
}
export interface Patch {
    number?: number;
    name?: string;
    gain: number;
    bass: number;
    middle: number;
    treble: number;
    volume: number;
    pedalEnabled: boolean;
    pedalType: PedalType;
    pedalParam1: number;
    pedalParam2: number;
    pedalParam3: number;
    pedalParam4: number;
    preAmpEnabled: boolean;
    preAmpType: PreAmpType;
    gate: number;
    modulationEnabled: boolean;
    modulationType: ModulationType;
    modulationParam1: number;
    modulationParam2: number;
    modulationParam3: number;
    modulationParam4: number;
    delayEnabled: boolean;
    delayType: DelayType;
    delayTimeMsb: number;
    delayTimeLsb: number;
    delayParam2: number;
    delayParam3: number;
    delayParam4: number;
    reverbEnabled: boolean;
    reverbType: ReverbType;
    reverbParam1: number;
    reverbParam2: number;
    reverbParam3: number;
    reverbParam4: number;
    powerAmpEnabled: boolean;
    powerAmpType: PowerAmpType;
    cabinetEnabled: boolean;
    cabinetType: CabinetType;
    presence: number;
    resonance: number;
}
export declare const factory: {
    default(): Patch;
    fromArray(data: Uint8Array): Patch;
};

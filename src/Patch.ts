export enum PedalType {
  Compressor,
  Distortion,
  'Auto Wah',
  'Pitch Shifter',
}

export enum DistortionMode {
  GUV,
  ODR,
  DIS,
}

export enum AutoWahMode {
  ENV,
  FLO,
}

export enum PreAmpType {
  JTM45,
  'CL DSL',
  'CL American',
  'CL JVM',
  Acoustic,
  Bluesbreaker,
  Plexi,
  'CR American',
  JCM800,
  '50\'s British',
  'OD JVM',
  'OD DSL',
  'OD American',
  'OD Silver Jubilee',
  'Neutral',
}

export enum DelayType {
  Studio,
  Vintage,
  Multi,
  Reverse,
}

export enum ModulationType {
  Chorus,
  Flanger,
  Phaser,
  Tremolo,
}

export enum ChorusMode {
  CLS,
  VIB,
}

export enum FlangerMode {
  JET,
  MET,
}

export enum PhaserMode {
  CLS,
  VBE,
}

export enum TremoloMode {
  VLV,
  SQR,
}

export enum ReverbType {
  Room,
  Hall,
  Spring,
  Stadium,
}

export enum PowerAmpType {
  'Classic Marshall 100w',
  'Vintage Marshall 30w',
  'British Class A',
  'American Class A/B'
}

export enum CabinetType {
  // @ts-ignore
  '1960',
  '1960V',
  '1960X',
  '1960HW',
  // @ts-ignore
  '1936',
  '1936V',
  // @ts-ignore
  '1912',
  '1974CX',
}

export interface Patch {
  number?: number
  name?: string

  gain: number
  bass: number
  middle: number
  treble: number
  volume: number

  pedalEnabled: boolean
  pedalType: PedalType
  pedalParam1: number
  pedalParam2: number
  pedalParam3: number
  pedalParam4: number

  preAmpEnabled: boolean
  preAmpType: PreAmpType

  gate: number

  modulationEnabled: boolean,
  modulationType: ModulationType,
  modulationParam1: number,
  modulationParam2: number,
  modulationParam3: number,
  modulationParam4: number,

  delayEnabled: boolean,
  delayType: DelayType,
  delayTimeMsb: number,
  delayTimeLsb: number,
  delayParam2: number,
  delayParam3: number,
  delayParam4: number,

  reverbEnabled: boolean,
  reverbType: ReverbType,
  reverbParam1: number,
  reverbParam2: number,
  reverbParam3: number,
  reverbParam4: number,

  powerAmpEnabled: boolean,
  powerAmpType: PowerAmpType,

  cabinetEnabled: boolean,
  cabinetType: CabinetType,

  presence: number,
  resonance: number,
}

export const factory = {
  default(): Patch {
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
    }
  },
  fromArray(data: Uint8Array): Patch {
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
}

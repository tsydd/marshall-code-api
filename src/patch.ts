export enum AutoWahMode {
  ENV = "ENV",
  FLO = "FLO",
}

export enum CabinetType {
  _1960 = "1960",
  _1960V = "1960V",
  _1960X = "1960X",
  _1960HW = "1960HW",
  _1936 = "1936",
  _1936V = "1936V",
  _1912 = "1912",
  _1974CX = "1974CX",
}

export enum ChorusMode {
  CLS = "CLS",
  VIB = "VIB",
}

export enum DelayType {
  STUDIO = "STUDIO",
  VINTAGE = "VINTAGE",
  MULTI = "MULTI",
  REVERSE = "REVERSE",
}

export enum DistortionMode {
  GUV = "GUV",
  ODR = "ODR",
  DIS = "DIS",
}

export enum FlangerMode {
  JET = "JET",
  MET = "MET",
}

export enum ModulationType {
  CHORUS = "CHORUS",
  FLANGER = "FLANGER",
  PHASER = "PHASER",
  TREMOLO = "TREMOLO",
}

export enum PedalType {
  COMPRESSOR = "COMPRESSOR",
  DISTORTION = "DISTORTION",
  AUTO_WAH = "AUTO_WAH",
  PITCH_SHIFTER = "PITCH_SHIFTER",
}

export enum PhaserMode {
  CLS = "CLS",
  VBE = "VBE",
}

export enum PowerAmpType {
  CLASSIC_MARSHALL_100W = "CLASSIC_MARSHALL_100W",
  VINTAGE_MARSHALL_30W = "VINTAGE_MARSHALL_30W",
  BRITISH_CLASS_A = "BRITISH_CLASS_A",
  AMERICAN_CLASS_A_B = "AMERICAN_CLASS_A_B",
}

export enum PreAmpType {
  JTM45 = "JTM45",
  CL_DSL = "CL_DSL",
  CL_AMERICAN = "CL_AMERICAN",
  CL_JVM = "CL_JVM",
  ACOUSTIC = "ACOUSTIC",
  BLUESBREAKER = "BLUESBREAKER",
  PLEXI = "PLEXI",
  CR_AMERICAN = "CR_AMERICAN",
  JCM800 = "JCM800",
  _50S_BRITISH = "50S_BRITISH",
  OD_JVM = "OD_JVM",
  OD_DSL = "OD_DSL",
  OD_AMERICAN = "OD_AMERICAN",
  OD_SILVER_JUBILEE = "OD_SILVER_JUBILEE",
  NEUTRAL = "NEUTRAL",
}

export enum ReverbType {
  ROOM = "ROOM",
  HALL = "HALL",
  SPRING = "SPRING",
  STADIUM = "STADIUM",
}

export enum TremoloMode {
  VLV = "VLV",
  SQR = "SQR",
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

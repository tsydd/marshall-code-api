import {
  AutoWahMode,
  CabinetType,
  ChorusMode,
  DelayType,
  DistortionMode,
  FlangerMode,
  ModulationType,
  Preset,
  PedalType,
  PhaserMode,
  PowerAmpType,
  PreAmpType,
  ReverbType,
  TremoloMode,
} from "./preset";
import { DeviceInformation } from "./system";

export function autoWahByCode(code: number): AutoWahMode {
  switch (code) {
    case 0:
      return AutoWahMode.ENV;
    case 1:
      return AutoWahMode.FLO;
    default:
      throw new Error(`AutoWahMode for code '${code}' is not defined`);
  }
}

export function autoWahToCode(autoWahMode: AutoWahMode): number {
  switch (autoWahMode) {
    case AutoWahMode.ENV:
      return 0;
    case AutoWahMode.FLO:
      return 1;
  }
}

export function cabinetTypeByCode(code: number) {
  switch (code) {
    case 0:
      return CabinetType._1960;
    case 1:
      return CabinetType._1960V;
    case 2:
      return CabinetType._1960X;
    case 3:
      return CabinetType._1960HW;
    case 4:
      return CabinetType._1936;
    case 5:
      return CabinetType._1936V;
    case 6:
      return CabinetType._1912;
    case 7:
      return CabinetType._1974CX;
    default:
      throw new Error(`CabinetType for code '${code}' is not defined`);
  }
}

export function cabinetTypeToCode(cabinetType: CabinetType): number {
  switch (cabinetType) {
    case CabinetType._1960:
      return 0;
    case CabinetType._1960V:
      return 1;
    case CabinetType._1960X:
      return 2;
    case CabinetType._1960HW:
      return 3;
    case CabinetType._1936:
      return 4;
    case CabinetType._1936V:
      return 5;
    case CabinetType._1912:
      return 6;
    case CabinetType._1974CX:
      return 7;
  }
}

export function chorusModeByCode(code: number): ChorusMode {
  switch (code) {
    case 0:
      return ChorusMode.CLS;
    case 1:
      return ChorusMode.VIB;
    default:
      throw new Error(`ChorusMode for code '${code}' is not defined`);
  }
}

export function chorusModeToCode(chorusMode: ChorusMode): number {
  switch (chorusMode) {
    case ChorusMode.CLS:
      return 0;
    case ChorusMode.VIB:
      return 1;
  }
}

export function delayTypeByCode(code: number): DelayType {
  switch (code) {
    case 0:
      return DelayType.STUDIO;
    case 1:
      return DelayType.VINTAGE;
    case 2:
      return DelayType.MULTI;
    case 3:
      return DelayType.REVERSE;
    default:
      throw new Error(`DelayType for code '${code}' is not defined`);
  }
}

export function delayTypeToCode(delayType: DelayType): number {
  switch (delayType) {
    case DelayType.STUDIO:
      return 0;
    case DelayType.VINTAGE:
      return 1;
    case DelayType.MULTI:
      return 2;
    case DelayType.REVERSE:
      return 3;
  }
}

export function distortionModeByCode(code: number): DistortionMode {
  switch (code) {
    case 0:
      return DistortionMode.GUV;
    case 1:
      return DistortionMode.ODR;
    case 2:
      return DistortionMode.DIS;
    default:
      throw new Error(`DistortionMode for code '${code}' is not defined`);
  }
}

export function distortionModeToCode(distortionMode: DistortionMode): number {
  switch (distortionMode) {
    case DistortionMode.GUV:
      return 0;
    case DistortionMode.ODR:
      return 1;
    case DistortionMode.DIS:
      return 2;
  }
}

export function flangerModeByCode(code: number): FlangerMode {
  switch (code) {
    case 0:
      return FlangerMode.JET;
    case 1:
      return FlangerMode.MET;
    default:
      throw new Error(`FlangerMode for code '${code}' is not defined`);
  }
}

export function flangerModeToCode(flangerMode: FlangerMode): number {
  switch (flangerMode) {
    case FlangerMode.JET:
      return 0;
    case FlangerMode.MET:
      return 1;
  }
}

export function modulationTypeByCode(code: number): ModulationType {
  switch (code) {
    case 0:
      return ModulationType.CHORUS;
    case 1:
      return ModulationType.FLANGER;
    case 2:
      return ModulationType.PHASER;
    case 3:
      return ModulationType.TREMOLO;
    default:
      throw new Error(`ModulationType for code '${code}' is not defined`);
  }
}

export function modulationTypeToCode(modulationType: ModulationType): number {
  switch (modulationType) {
    case ModulationType.CHORUS:
      return 0;
    case ModulationType.FLANGER:
      return 1;
    case ModulationType.PHASER:
      return 2;
    case ModulationType.TREMOLO:
      return 3;
  }
}

export function pedalTypeByCode(code: number): PedalType {
  switch (code) {
    case 0:
      return PedalType.COMPRESSOR;
    case 1:
      return PedalType.DISTORTION;
    case 2:
      return PedalType.AUTO_WAH;
    case 3:
      return PedalType.PITCH_SHIFTER;
    default:
      throw new Error(`PedalType for code '${code}' is not defined`);
  }
}

export function pedalTypeToCode(pedalType: PedalType): number {
  switch (pedalType) {
    case PedalType.COMPRESSOR:
      return 0;
    case PedalType.DISTORTION:
      return 1;
    case PedalType.AUTO_WAH:
      return 2;
    case PedalType.PITCH_SHIFTER:
      return 3;
  }
}

export function phaserModeByCode(code: number): PhaserMode {
  switch (code) {
    case 0:
      return PhaserMode.CLS;
    case 1:
      return PhaserMode.VBE;
    default:
      throw new Error(`PhaserMode for code '${code}' is not defined`);
  }
}

export function phaserModeToCode(phaserMode: PhaserMode): number {
  switch (phaserMode) {
    case PhaserMode.CLS:
      return 0;
    case PhaserMode.VBE:
      return 1;
  }
}

export function powerAmpTypeByCode(code: number): PowerAmpType {
  switch (code) {
    case 0:
      return PowerAmpType.CLASSIC_MARSHALL_100W;
    case 1:
      return PowerAmpType.VINTAGE_MARSHALL_30W;
    case 2:
      return PowerAmpType.BRITISH_CLASS_A;
    case 3:
      return PowerAmpType.AMERICAN_CLASS_A_B;
    default:
      throw new Error(`PowerAmpType for code '${code}' is not defined`);
  }
}

export function powerAmpTypeToCode(powerAmpType: PowerAmpType): number {
  switch (powerAmpType) {
    case PowerAmpType.CLASSIC_MARSHALL_100W:
      return 0;
    case PowerAmpType.VINTAGE_MARSHALL_30W:
      return 1;
    case PowerAmpType.BRITISH_CLASS_A:
      return 2;
    case PowerAmpType.AMERICAN_CLASS_A_B:
      return 3;
  }
}

export function preAmpTypeByCode(code: number): PreAmpType {
  switch (code) {
    case 0:
      return PreAmpType.JTM45;
    case 1:
      return PreAmpType.CL_DSL;
    case 2:
      return PreAmpType.CL_AMERICAN;
    case 3:
      return PreAmpType.CL_JVM;
    case 4:
      return PreAmpType.ACOUSTIC;
    case 5:
      return PreAmpType.BLUESBREAKER;
    case 6:
      return PreAmpType.PLEXI;
    case 7:
      return PreAmpType.CR_AMERICAN;
    case 8:
      return PreAmpType.JCM800;
    case 9:
      return PreAmpType._50S_BRITISH;
    case 10:
      return PreAmpType.OD_JVM;
    case 11:
      return PreAmpType.OD_DSL;
    case 12:
      return PreAmpType.OD_AMERICAN;
    case 13:
      return PreAmpType.OD_SILVER_JUBILEE;
    case 14:
      return PreAmpType.NEUTRAL;
    default:
      throw new Error(`PreAmpType for code '${code}' is not defined`);
  }
}

export function preAmpTypeToCode(preAmpType: PreAmpType): number {
  switch (preAmpType) {
    case PreAmpType.JTM45:
      return 0;
    case PreAmpType.CL_DSL:
      return 1;
    case PreAmpType.CL_AMERICAN:
      return 2;
    case PreAmpType.CL_JVM:
      return 3;
    case PreAmpType.ACOUSTIC:
      return 4;
    case PreAmpType.BLUESBREAKER:
      return 5;
    case PreAmpType.PLEXI:
      return 6;
    case PreAmpType.CR_AMERICAN:
      return 7;
    case PreAmpType.JCM800:
      return 8;
    case PreAmpType._50S_BRITISH:
      return 9;
    case PreAmpType.OD_JVM:
      return 10;
    case PreAmpType.OD_DSL:
      return 11;
    case PreAmpType.OD_AMERICAN:
      return 12;
    case PreAmpType.OD_SILVER_JUBILEE:
      return 13;
    case PreAmpType.NEUTRAL:
      return 14;
  }
}

export function reverbTypeByCode(code: number): ReverbType {
  switch (code) {
    case 0:
      return ReverbType.ROOM;
    case 1:
      return ReverbType.HALL;
    case 2:
      return ReverbType.SPRING;
    case 3:
      return ReverbType.STADIUM;
    default:
      throw new Error(`ReverbType for code '${code}' is not defined`);
  }
}

export function reverbTypeToCode(reverbType: ReverbType): number {
  switch (reverbType) {
    case ReverbType.ROOM:
      return 0;
    case ReverbType.HALL:
      return 1;
    case ReverbType.SPRING:
      return 2;
    case ReverbType.STADIUM:
      return 3;
  }
}

export function tremoloModeByCode(code: number): TremoloMode {
  switch (code) {
    case 0:
      return TremoloMode.VLV;
    case 1:
      return TremoloMode.SQR;
    default:
      throw new Error(`TremoloMode for code '${code}' is not defined`);
  }
}

export function tremoloModeToCode(tremoloMode: TremoloMode): number {
  switch (tremoloMode) {
    case TremoloMode.VLV:
      return 0;
    case TremoloMode.SQR:
      return 1;
  }
}

export function getString(
  data: Uint8Array,
  start: number,
  end?: number
): string {
  return Array.from(data.slice(start, end))
    .map((c) => String.fromCharCode(c))
    .join("")
    .trim();
}

export function presetFromArray(data: Uint8Array): Preset {
  return {
    number: data[9],
    name: getString(data, 10, 28),

    gain: data[29],
    bass: data[30],
    middle: data[31],
    treble: data[32],
    volume: data[33],

    pedalEnabled: data[34] === 1,
    pedalType: pedalTypeByCode(data[35]),
    pedalParam1: data[36],
    pedalParam2: data[37],
    pedalParam3: data[38],
    pedalParam4: data[39],

    preAmpEnabled: data[40] === 1,
    preAmpType: preAmpTypeByCode(data[41]),

    gate: data[42],

    modulationEnabled: data[43] === 1,
    modulationType: modulationTypeByCode(data[44]),
    modulationParam1: data[45],
    modulationParam2: data[46],
    modulationParam3: data[47],
    modulationParam4: data[48],

    delayEnabled: data[49] === 1,
    delayType: delayTypeByCode(data[50]),
    delayTimeMsb: data[51],
    delayTimeLsb: data[52],
    delayParam2: data[53],
    delayParam3: data[54],
    delayParam4: data[55],

    reverbEnabled: data[56] === 1,
    reverbType: reverbTypeByCode(data[57]),
    reverbParam1: data[58],
    reverbParam2: data[59],
    reverbParam3: data[60],
    reverbParam4: data[61],

    powerAmpEnabled: data[62] === 1,
    powerAmpType: powerAmpTypeByCode(data[63]),

    cabinetEnabled: data[64] === 1,
    cabinetType: cabinetTypeByCode(data[65]),

    presence: data[66],
    resonance: data[67],
  };
}

export function deviceInformationFromArray(
  data: Uint8Array
): DeviceInformation {
  return {
    familyId: data[4],
    modelId: data[5],
    deviceId: data[6],
    status: data[8],
    serialNumber: getString(data, 9, 19),
    hardwareVersion: data[19] + "." + data[20],
    bootloaderVersion: data[21] + "." + data[22],
    mcuFirmwareVersion: data[27] + "." + data[28],
    dspFirmwareVersion: data[32] + "." + data[33],
  } as DeviceInformation;
}

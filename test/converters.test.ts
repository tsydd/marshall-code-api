import each from "jest-each";
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
} from "../src";
import {
  autoWahByCode,
  autoWahToCode,
  cabinetTypeByCode,
  cabinetTypeToCode,
  chorusModeByCode,
  chorusModeToCode,
  delayTypeByCode,
  delayTypeToCode,
  distortionModeByCode,
  distortionModeToCode,
  flangerModeByCode,
  flangerModeToCode,
  modulationTypeByCode,
  modulationTypeToCode,
  presetFromArray,
  pedalTypeByCode,
  pedalTypeToCode,
  phaserModeByCode,
  phaserModeToCode,
  powerAmpTypeByCode,
  powerAmpTypeToCode,
  preAmpTypeByCode,
  preAmpTypeToCode,
  reverbTypeByCode,
  reverbTypeToCode,
  tremoloModeByCode,
  tremoloModeToCode,
  deviceInformationFromArray,
  bluetoothInformationFromArray,
  bluetoothFirmwareFromArray,
} from "../src/converters";
import {
  BluetoothFirmware,
  BluetoothInformation,
  DeviceInformation,
} from "../src/system";

describe("AutoWahMode", () => {
  const table = [
    { code: 0, autoWahMode: AutoWahMode.ENV },
    { code: 1, autoWahMode: AutoWahMode.FLO },
  ];

  each(table).test(
    "autoWahModeByCode($code) = $autoWahMode",
    ({ code, autoWahMode }) => {
      expect(autoWahByCode(code)).toBe(autoWahMode);
    }
  );

  test("autoWahModeByCode(3) throws exception", () => {
    expect(() => autoWahByCode(2)).toThrowError(
      Error("AutoWahMode for code '2' is not defined")
    );
  });

  each(table).test(
    "autoWahModeToCode($autoWahMode) = $code",
    ({ code, autoWahMode }) => {
      expect(autoWahToCode(autoWahMode)).toBe(code);
    }
  );
});

describe("CabinetType", () => {
  const table = [
    { code: 0, cabinetType: CabinetType._1960 },
    { code: 1, cabinetType: CabinetType._1960V },
    { code: 2, cabinetType: CabinetType._1960X },
    { code: 3, cabinetType: CabinetType._1960HW },
    { code: 4, cabinetType: CabinetType._1936 },
    { code: 5, cabinetType: CabinetType._1936V },
    { code: 6, cabinetType: CabinetType._1912 },
    { code: 7, cabinetType: CabinetType._1974CX },
  ];

  each(table).test(
    "cabinetTypeByCode($code) = $cabinetType",
    ({ code, cabinetType }) => {
      expect(cabinetTypeByCode(code)).toBe(cabinetType);
    }
  );

  test("cabinetTypeByCode(8) throws exception", () => {
    expect(() => cabinetTypeByCode(8)).toThrowError(
      "CabinetType for code '8' is not defined"
    );
  });

  each(table).test(
    "cabinetTypeToCode($cabinetType) = $code",
    ({ code, cabinetType }) => {
      expect(cabinetTypeToCode(cabinetType)).toBe(code);
    }
  );
});

describe("ChorusMode", () => {
  const table = [
    { code: 0, chorusMode: ChorusMode.CLS },
    { code: 1, chorusMode: ChorusMode.VIB },
  ];

  each(table).test(
    "chorusModeByCode($code) = $chorusMode",
    ({ code, chorusMode }) => {
      expect(chorusModeByCode(code)).toBe(chorusMode);
    }
  );

  test("chorusModeByCode(3) throws exception", () => {
    expect(() => chorusModeByCode(3)).toThrowError(
      Error("ChorusMode for code '3' is not defined")
    );
  });

  each(table).test(
    "chorusModeToCode($chorusMode) = $code",
    ({ code, chorusMode }) => {
      expect(chorusModeToCode(chorusMode)).toBe(code);
    }
  );
});

describe("DelayType", () => {
  const table = [
    { code: 0, delayType: DelayType.STUDIO },
    { code: 1, delayType: DelayType.VINTAGE },
    { code: 2, delayType: DelayType.MULTI },
    { code: 3, delayType: DelayType.REVERSE },
  ];

  each(table).test(
    "delayTypeByCode($code) = $delayType",
    ({ code, delayType }) => {
      expect(delayTypeByCode(code)).toBe(delayType);
    }
  );

  test("delayTypeByCode(4) throws exception", () => {
    expect(() => delayTypeByCode(4)).toThrowError(
      Error("DelayType for code '4' is not defined")
    );
  });

  each(table).test(
    "delayTypeToCode($delayType) = $code",
    ({ code, delayType }) => {
      expect(delayTypeToCode(delayType)).toBe(code);
    }
  );
});

describe("DistortionMode", () => {
  const table = [
    { code: 0, distortionMode: DistortionMode.GUV },
    { code: 1, distortionMode: DistortionMode.ODR },
    { code: 2, distortionMode: DistortionMode.DIS },
  ];

  each(table).test(
    `distortionModeByCode($code) = $distortionMode`,
    ({ code, distortionMode }) => {
      expect(distortionModeByCode(code)).toBe(distortionMode);
    }
  );

  test("distortionModeByCode(3) throws exception", () => {
    expect(() => distortionModeByCode(3)).toThrowError(
      "DistortionMode for code '3' is not defined"
    );
  });

  each(table).test(
    "distortionModeToCode($distortionMode) = $code",
    ({ code, distortionMode }) => {
      expect(distortionModeToCode(distortionMode)).toBe(code);
    }
  );
});

describe("FlangerMode", () => {
  const table = [
    { code: 0, flangerMode: FlangerMode.JET },
    { code: 1, flangerMode: FlangerMode.MET },
  ];

  each(table).test(
    "flangerModeByCode($code) = $flangerMode",
    ({ code, flangerMode }) => {
      expect(flangerModeByCode(code)).toBe(flangerMode);
    }
  );

  test("flangerModeByCode(2) throws exception", () => {
    expect(() => flangerModeByCode(2)).toThrowError(
      Error("FlangerMode for code '2' is not defined")
    );
  });

  each(table).test(
    "flangerModeToCode($flangerMode) = $code",
    ({ code, flangerMode }) => {
      expect(flangerModeToCode(flangerMode)).toBe(code);
    }
  );
});

describe("ModulationType", () => {
  const table = [
    { code: 0, modulationType: ModulationType.CHORUS },
    { code: 1, modulationType: ModulationType.FLANGER },
    { code: 2, modulationType: ModulationType.PHASER },
    { code: 3, modulationType: ModulationType.TREMOLO },
  ];

  each(table).test(
    "modulationTypeByCode($code) = $modulationType",
    ({ code, modulationType }) => {
      expect(modulationTypeByCode(code)).toBe(modulationType);
    }
  );

  test("modulationTypeByCode(4) throws exception", () => {
    expect(() => modulationTypeByCode(4)).toThrowError(
      Error("ModulationType for code '4' is not defined")
    );
  });

  each(table).test(
    "modulationTypeToCode($modulationType) = $code",
    ({ code, modulationType }) => {
      expect(modulationTypeToCode(modulationType)).toBe(code);
    }
  );
});

describe("PedalType", () => {
  const table = [
    { code: 0, pedalType: PedalType.COMPRESSOR },
    { code: 1, pedalType: PedalType.DISTORTION },
    { code: 2, pedalType: PedalType.AUTO_WAH },
    { code: 3, pedalType: PedalType.PITCH_SHIFTER },
  ];

  each(table).test(
    `pedalTypeByCode($code) = $pedalType`,
    ({ code, pedalType }) => {
      expect(pedalTypeByCode(code)).toBe(pedalType);
    }
  );

  test("pedalTypeByCode(4) throws exception", () => {
    expect(() => pedalTypeByCode(4)).toThrowError(
      "PedalType for code '4' is not defined"
    );
  });

  each(table).test(
    `pedalTypeToCode($pedalType) = $code`,
    ({ code, pedalType }) => {
      expect(pedalTypeToCode(pedalType)).toBe(code);
    }
  );
});

describe("PhaserMode", () => {
  const table = [
    { code: 0, phaserMode: PhaserMode.CLS },
    { code: 1, phaserMode: PhaserMode.VBE },
  ];

  each(table).test(
    "phaserModeByCode($code) = $phaserMode",
    ({ code, phaserMode }) => {
      expect(phaserModeByCode(code)).toBe(phaserMode);
    }
  );

  test("phaserModeByCode(2) throws exception", () => {
    expect(() => phaserModeByCode(2)).toThrowError(
      Error("PhaserMode for code '2' is not defined")
    );
  });

  each(table).test(
    "phaserModeToCode($phaserMode) = $code",
    ({ code, phaserMode }) => {
      expect(phaserModeToCode(phaserMode)).toBe(code);
    }
  );
});

describe("PowerAmpType", () => {
  const table = [
    { code: 0, powerAmpType: PowerAmpType.CLASSIC_MARSHALL_100W },
    { code: 1, powerAmpType: PowerAmpType.VINTAGE_MARSHALL_30W },
    { code: 2, powerAmpType: PowerAmpType.BRITISH_CLASS_A },
    { code: 3, powerAmpType: PowerAmpType.AMERICAN_CLASS_A_B },
  ];

  each(table).test(
    "powerAmpByTypeByCode($code) = $powerAmpType",
    ({ code, powerAmpType }) => {
      expect(powerAmpTypeByCode(code)).toBe(powerAmpType);
    }
  );

  test("powerAmpByTypeByCode(4) throws exception", () => {
    expect(() => powerAmpTypeByCode(4)).toThrowError(
      Error("PowerAmpType for code '4' is not defined")
    );
  });

  each(table).test(
    "powerAmpTypeToCode($powerAmpType) = $code",
    ({ code, powerAmpType }) => {
      expect(powerAmpTypeToCode(powerAmpType)).toBe(code);
    }
  );
});

describe("PreAmpType", () => {
  const table = [
    { code: 0, preAmpType: PreAmpType.JTM45 },
    { code: 1, preAmpType: PreAmpType.CL_DSL },
    { code: 2, preAmpType: PreAmpType.CL_AMERICAN },
    { code: 3, preAmpType: PreAmpType.CL_JVM },
    { code: 4, preAmpType: PreAmpType.ACOUSTIC },
    { code: 5, preAmpType: PreAmpType.BLUESBREAKER },
    { code: 6, preAmpType: PreAmpType.PLEXI },
    { code: 7, preAmpType: PreAmpType.CR_AMERICAN },
    { code: 8, preAmpType: PreAmpType.JCM800 },
    { code: 9, preAmpType: PreAmpType._50S_BRITISH },
    { code: 10, preAmpType: PreAmpType.OD_JVM },
    { code: 11, preAmpType: PreAmpType.OD_DSL },
    { code: 12, preAmpType: PreAmpType.OD_AMERICAN },
    { code: 13, preAmpType: PreAmpType.OD_SILVER_JUBILEE },
    { code: 14, preAmpType: PreAmpType.NEUTRAL },
  ];

  each(table).test(
    "preAmpTypeByCode($code) = $preAmpType",
    ({ code, preAmpType }) => {
      expect(preAmpTypeByCode(code)).toBe(preAmpType);
    }
  );

  test("preAmpTypeByCode(15) throws error", () => {
    expect(() => preAmpTypeByCode(15)).toThrowError(
      new Error("PreAmpType for code '15' is not defined")
    );
  });

  each(table).test(
    "preAmpTypeToCode($preAmpType) = $code",
    ({ code, preAmpType }) => {
      expect(preAmpTypeToCode(preAmpType)).toBe(code);
    }
  );
});

describe("ReverbType", () => {
  const table = [
    { code: 0, reverbType: ReverbType.ROOM },
    { code: 1, reverbType: ReverbType.HALL },
    { code: 2, reverbType: ReverbType.SPRING },
    { code: 3, reverbType: ReverbType.STADIUM },
  ];

  each(table).test(
    "reverbTypeByCode($code) = $reverbType",
    ({ code, reverbType }) => {
      expect(reverbTypeByCode(code)).toBe(reverbType);
    }
  );

  each(table).test(
    "reverbTypeToCode($reverbType) = $code",
    ({ code, reverbType }) => {
      expect(reverbTypeToCode(reverbType)).toBe(code);
    }
  );
});

describe("TremoloMode", () => {
  const table = [
    { code: 0, tremoloMode: TremoloMode.VLV },
    { code: 1, tremoloMode: TremoloMode.SQR },
  ];

  each(table).test(
    "tremoloModeByCode($code) = $tremoloMode",
    ({ code, tremoloMode }) => {
      expect(tremoloModeByCode(code)).toBe(tremoloMode);
    }
  );

  test("tremoloModeByCode(2) throws exception", () => {
    expect(() => tremoloModeByCode(2)).toThrowError(
      Error("TremoloMode for code '2' is not defined")
    );
  });

  each(table).test(
    "tremoloModeToCode($tremoloMode) = $code",
    ({ code, tremoloMode }) => {
      expect(tremoloModeToCode(tremoloMode)).toBe(code);
    }
  );
});

test("fromArray", () => {
  const rawPreset = new Uint8Array([
    240, 0, 33, 21, 48, 16, 2, 115, 3, 2, 83, 108, 105, 112, 107, 110, 111, 116,
    32, 83, 108, 105, 112, 107, 110, 111, 116, 32, 0, 80, 80, 40, 80, 50, 1, 1,
    0, 50, 50, 50, 1, 12, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 3, 1, 6, 63, 50, 12, 13, 26, 27, 28, 29, 247,
  ]);
  const preset = presetFromArray(rawPreset);
  expect(preset).toEqual({
    bass: 80,
    cabinetEnabled: true,
    cabinetType: CabinetType._1912,
    delayEnabled: false,
    delayParam2: 0,
    delayParam3: 0,
    delayParam4: 0,
    delayTimeLsb: 0,
    delayTimeMsb: 0,
    delayType: DelayType.STUDIO,
    gain: 80,
    gate: 50,
    middle: 40,
    modulationEnabled: false,
    modulationParam1: 0,
    modulationParam2: 0,
    modulationParam3: 0,
    modulationParam4: 0,
    modulationType: ModulationType.CHORUS,
    name: "Slipknot Slipknot",
    number: 2,
    pedalEnabled: true,
    pedalParam1: distortionModeToCode(DistortionMode.GUV),
    pedalParam2: 50,
    pedalParam3: 50,
    pedalParam4: 50,
    pedalType: PedalType.DISTORTION,
    powerAmpEnabled: true,
    powerAmpType: PowerAmpType.AMERICAN_CLASS_A_B,
    preAmpEnabled: true,
    preAmpType: PreAmpType.OD_AMERICAN,
    presence: 63,
    resonance: 50,
    reverbEnabled: true,
    reverbParam1: 0,
    reverbParam2: 0,
    reverbParam3: 0,
    reverbParam4: 0,
    reverbType: ReverbType.HALL,
    treble: 80,
    volume: 50,
  } as Preset);
});

test("parse device info", () => {
  const data = new Uint8Array([
    240, 0, 33, 21, 48, 16, 2, 17, 0, 86, 48, 50, 48, 50, 53, 65, 57, 57, 69, 1,
    0, 0, 6, 2, 1, 1, 0, 1, 46, 33, 1, 0, 1, 1, 0, 247,
  ]);

  const deviceInfo = deviceInformationFromArray(data);
  expect(deviceInfo).toEqual({
    bootloaderVersion: "0.6",
    deviceId: 2,
    familyId: 48,
    hardwareVersion: "1.0",
    modelId: 16,
    serialNumber: "V02025A99E",
    status: 0,
    mcuFirmwareVersion: "1.46",
    dspFirmwareVersion: "1.1",
  } as DeviceInformation);
});

test("parse bluetooth info", () => {
  const data = new Uint8Array([
    240, 0, 33, 21, 48, 16, 2, 98, 3, 3, 50, 67, 54, 66, 55, 68, 56, 49, 56, 65,
    48, 66, 247,
  ]);

  const bluetoothInfo = bluetoothInformationFromArray(data);

  expect(bluetoothInfo).toEqual({
    address: "2C6B7D818A0B",
  } as BluetoothInformation);
});

test("parse bluetooth firmware", () => {
  const data = new Uint8Array([
    240, 0, 33, 21, 48, 16, 2, 98, 3, 4, 86, 51, 46, 49, 32, 32, 32, 32, 32, 32,
    247,
  ]);

  const bluetoothFirmware = bluetoothFirmwareFromArray(data);

  expect(bluetoothFirmware).toEqual({
    version: "V3.1",
  } as BluetoothFirmware);
});

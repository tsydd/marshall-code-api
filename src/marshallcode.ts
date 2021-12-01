import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import MIDIOutput = WebMidi.MIDIOutput;
import MIDIInput = WebMidi.MIDIInput;
import { Preset } from "./preset";
import {
  bluetoothAddressFromArray,
  bluetoothVersionFromArray,
  deviceInformationFromArray,
  presetFromArray,
} from "./converters";
import {
  BluetoothAddress,
  BluetoothVersion,
  DeviceInformation,
} from "./system";

export interface CodeApi {
  onConnected: (connected: boolean) => void;
  onPresetNumberChanged: (index: number) => void;
  onCurrentPresetReceived: (preset: Preset) => void;
  onPresetReceived: (preset: Preset) => void;
  onPresetUpdated: (index: number) => void;
  onPresetModified: (changes: object) => void;
  onDeviceInfo: (info: DeviceInformation) => void;
  onBluetoothAddress: (address: BluetoothAddress) => void;
  onBluetoothVersion: (version: BluetoothVersion) => void;
  debug: boolean;

  init(): Promise<void>;

  switchToPreset(index: number): void;

  requestCurrentPreset(): void;

  requestPreset(index: number): void;

  requestDeviceInfo(): void;

  requestBluetoothAddress(): void;

  requestBluetoothVersion(): void;
}

class CodeClient implements CodeApi {
  private output?: MIDIOutput;
  debug = false;
  onConnected: (connected: boolean) => void = () => {
    //
  };
  onPresetNumberChanged: (index: number) => void = () => {
    //
  };
  onCurrentPresetReceived: (patch: Preset) => void = () => {
    //
  };
  onPresetReceived: (patch: Preset) => void = () => {
    //
  };
  onPresetUpdated: (index: number) => void = () => {
    //
  };
  onPresetModified: (changes: object) => void = () => {
    //
  };
  onDeviceInfo: (info: DeviceInformation) => void = () => {
    //
  };
  onBluetoothAddress: (info: BluetoothAddress) => void = () => {
    //
  };
  onBluetoothVersion: (version: BluetoothVersion) => void = () => {
    //
  };

  async init() {
    this.setInput = this.setInput.bind(this);
    this.setOutput = this.setOutput.bind(this);

    const access = await navigator.requestMIDIAccess({ sysex: true });

    access.inputs.forEach((input) => {
      this.setInput(input);
    });

    access.outputs.forEach((output) => {
      this.setOutput(output);
    });

    access.onstatechange = (e) => {
      switch (e.port.type) {
        case "input":
          this.setInput(e.port as MIDIInput);
          break;
        case "output":
          this.setOutput(e.port as MIDIOutput);
          break;
      }
    };
  }

  private setInput(input: MIDIInput) {
    if (input.name !== "CODE") {
      return;
    }
    if (input.state === "disconnected") {
      return;
    }
    if (input.connection === "open") {
      return;
    }
    input.addEventListener("midimessage", (e) => {
      this.onMidiMessage(e);
    });
  }

  private setOutput(output: MIDIOutput) {
    if (output.name !== "CODE") {
      return;
    }
    switch (output.state) {
      case "connected":
        this.output = output;
        this.onConnected(true);
        break;
      case "disconnected":
        this.output = undefined;
        this.onConnected(false);
        break;
    }
  }

  switchToPreset(index: number) {
    this.output?.send([0xc0, index]);
  }

  requestCurrentPreset() {
    this.output?.send([
      0xf0, 0x00, 0x21, 0x15, 0x7f, 0x7f, 0x7f, 0x73, 0x01, 0x00, 0xf7,
    ]);
  }

  requestPreset(index: number) {
    this.output?.send([
      0xf0,
      0x00,
      0x21,
      0x15,
      0x7f,
      0x7f,
      0x7f,
      0x72,
      0x01,
      index,
      0xf7,
    ]);
  }

  requestDeviceInfo() {
    this.output?.send([0xf0, 0x00, 0x21, 0x15, 0x7f, 0, 0, 0x10, 0xf7]);
  }

  requestBluetoothAddress() {
    this.output?.send([
      0xf0, 0x00, 0x21, 0x15, 0x7f, 0x7f, 0x7f, 0x62, 0x01, 0x03, 0xf7,
    ]);
  }

  requestBluetoothVersion() {
    this.output?.send([
      0xf0, 0x00, 0x21, 0x15, 0x7f, 0x7f, 0x7f, 0x62, 0x01, 0x04, 0xf7,
    ]);
  }

  private onMidiMessage(e: MIDIMessageEvent) {
    const data = e.data;
    if (this.debug) {
      console.log(e, e.data);
    }

    switch (data[0]) {
      case 0xa0: // tuner
        break;
      case 0xb0:
        this.handlePresetModification(data[1], data[2]);
        break;
      case 0xc0:
        this.onPresetNumberChanged(data[1]);
        break;
      case 0xf0:
        this.handlePresetSettingsMessage(data);
        break;
    }
  }

  private handlePresetSettingsMessage(data: Uint8Array) {
    const target = data[7];
    switch (target) {
      case 0x11: {
        const deviceInfo = deviceInformationFromArray(data);
        this.onDeviceInfo(deviceInfo);
        break;
      }
      case 0x72: {
        const preset = presetFromArray(data);
        this.onPresetReceived(preset);
        break;
      }
      case 0x73: {
        const preset = presetFromArray(data);
        this.onCurrentPresetReceived(preset);
        break;
      }
      case 0x62:
        switch (data[9]) {
          case 3: {
            const bluetoothInfo = bluetoothAddressFromArray(data);
            this.onBluetoothAddress(bluetoothInfo);
            break;
          }
          case 4: {
            const bluetoothFirmware = bluetoothVersionFromArray(data);
            this.onBluetoothVersion(bluetoothFirmware);
            break;
          }
        }
    }
  }

  private handlePresetModification(key: number, value: number) {
    switch (key) {
      case 31:
        return this.onPresetModified({ delayTimeMsb: value });
      case 63:
        return this.onPresetModified({ delayTimeLsb: value });
      case 70:
        return this.onPresetModified({ gain: value });
      case 71:
        return this.onPresetModified({ bass: value });
      case 72:
        return this.onPresetModified({ middle: value });
      case 73:
        return this.onPresetModified({ treble: value });
      case 74:
        return this.onPresetModified({ volume: value });
      case 75:
        return this.onPresetModified({ pedalEnabled: value === 1 });
      case 76:
        return this.onPresetModified({
          pedalType: value,
          pedalParam1: 0,
          pedalParam2: 0,
          pedalParam3: 0,
          pedalParam4: 0,
        });
      case 77:
        return this.onPresetModified({ pedalParam1: value });
      case 78:
        return this.onPresetModified({ pedalParam2: value });
      case 79:
        return this.onPresetModified({ pedalParam3: value });
      case 80:
        return this.onPresetModified({ pedalParam4: value });
      case 81:
        return this.onPresetModified({ preAmpEnabled: value === 1 });
      case 82:
        return this.onPresetModified({ preAmpType: value });
      case 83:
        return this.onPresetModified({ gate: value });
      case 85:
        return this.onPresetModified({ modulationEnabled: value === 1 });
      case 86:
        return this.onPresetModified({ modulationType: value });
      case 87:
        return this.onPresetModified({ modulationParam1: value });
      case 89:
        return this.onPresetModified({ modulationParam2: value });
      case 90:
        return this.onPresetModified({ modulationParam3: value });
      case 102:
        return this.onPresetModified({ modulationParam4: value });
      case 103:
        return this.onPresetModified({ delayEnabled: value === 1 });
      case 104:
        return this.onPresetModified({ delayType: value });
      case 105:
        return this.onPresetModified({ delayParam2: value });
      case 106:
        return this.onPresetModified({ delayParam3: value });
      case 107:
        return this.onPresetModified({ delayParam4: value });
      case 108:
        return this.onPresetModified({ reverbEnabled: value === 1 });
      case 109:
        return this.onPresetModified({ reverbType: value });
      case 110:
        return this.onPresetModified({ reverbParam1: value });
      case 111:
        return this.onPresetModified({ reverbParam2: value });
      case 112:
        return this.onPresetModified({ reverbParam3: value });
      case 113:
        return this.onPresetModified({ reverbParam4: value });
      case 114:
        return this.onPresetModified({ powerAmpEnabled: value === 1 });
      case 115:
        return this.onPresetModified({ powerAmpType: value });
      case 116:
        return this.onPresetModified({ cabinetEnabled: value === 1 });
      case 117:
        return this.onPresetModified({ cabinetType: value });
      case 118:
        return this.onPresetModified({ presence: value });
      case 119:
        return this.onPresetModified({ resonance: value });
      default:
        break;
    }
  }
}

export const codeApi: CodeApi = new CodeClient();

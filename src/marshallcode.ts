import { Patch } from "./patch";
import { patchFromArray } from "./converters";
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import MIDIOutput = WebMidi.MIDIOutput;
import MIDIInput = WebMidi.MIDIInput;

export interface CodeApi {
  onConnected: (connected: boolean) => void;
  onPresetNumberChanged: (index: number) => void;
  onSettingsLoaded: (patch: Patch) => void;
  onSettingsUpdated: (index: number) => void;
  onPatchChanged: (changes: object) => void;
  debug: boolean;

  init(): Promise<void>;

  switchToPreset(index: number): void;

  loadPatch(): void;

  loadPreset(index: number): void;
}

class CodeClient implements CodeApi {
  private output?: MIDIOutput;
  onConnected: (connected: boolean) => void = () => {
    //
  };
  onPresetNumberChanged: (index: number) => void = () => {
    //
  };
  onSettingsLoaded: (patch: Patch) => void = () => {
    //
  };
  onSettingsUpdated: (index: number) => void = () => {
    //
  };
  onPatchChanged: (changes: object) => void = () => {
    //
  };
  debug = false;

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

  loadPatch() {
    this.output?.send([
      0xf0, 0x00, 0x21, 0x15, 0x7f, 0x7f, 0x7f, 0x73, 0x01, 0x00, 0xf7,
    ]);
  }

  loadPreset(index: number) {
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

  private onMidiMessage(e: MIDIMessageEvent) {
    const data = e.data;
    if (this.debug) {
      console.log(data);
    }

    switch (data[0]) {
      case 0xa0: // tuner
        break;
      case 0xb0:
        this.handleSettingsMessage(data[1], data[2]);
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
    // 0x72 - preset
    // 0x73 - current settings
    const target = data[7];

    // 1 - ->output - recall
    // 2 - ->output - set
    // 3 - input-> loaded
    // 4 - input-> updated
    const command = data[8];

    if (command === 3) {
      const patch = patchFromArray(data);
      this.onSettingsLoaded(patch);
    } else if (command === 4) {
      const index = data[9];
      this.onSettingsUpdated(index);
    } else {
      throw {
        message: "Illegal Argument",
        target: target,
        command: command,
      };
    }
  }

  private handleSettingsMessage(key: number, value: number) {
    switch (key) {
      case 31:
        return this.onPatchChanged({ delayTimeMsb: value });
      case 63:
        return this.onPatchChanged({ delayTimeLsb: value });
      case 70:
        return this.onPatchChanged({ gain: value });
      case 71:
        return this.onPatchChanged({ bass: value });
      case 72:
        return this.onPatchChanged({ middle: value });
      case 73:
        return this.onPatchChanged({ treble: value });
      case 74:
        return this.onPatchChanged({ volume: value });
      case 75:
        return this.onPatchChanged({ pedalEnabled: value === 1 });
      case 76:
        return this.onPatchChanged({
          pedalType: value,
          pedalParam1: 0,
          pedalParam2: 0,
          pedalParam3: 0,
          pedalParam4: 0,
        });
      case 77:
        return this.onPatchChanged({ pedalParam1: value });
      case 78:
        return this.onPatchChanged({ pedalParam2: value });
      case 79:
        return this.onPatchChanged({ pedalParam3: value });
      case 80:
        return this.onPatchChanged({ pedalParam4: value });
      case 81:
        return this.onPatchChanged({ preAmpEnabled: value === 1 });
      case 82:
        return this.onPatchChanged({ preAmpType: value });
      case 83:
        return this.onPatchChanged({ gate: value });
      case 85:
        return this.onPatchChanged({ modulationEnabled: value === 1 });
      case 86:
        return this.onPatchChanged({ modulationType: value });
      case 87:
        return this.onPatchChanged({ modulationParam1: value });
      case 89:
        return this.onPatchChanged({ modulationParam2: value });
      case 90:
        return this.onPatchChanged({ modulationParam3: value });
      case 102:
        return this.onPatchChanged({ modulationParam4: value });
      case 103:
        return this.onPatchChanged({ delayEnabled: value === 1 });
      case 104:
        return this.onPatchChanged({ delayType: value });
      case 105:
        return this.onPatchChanged({ delayParam2: value });
      case 106:
        return this.onPatchChanged({ delayParam3: value });
      case 107:
        return this.onPatchChanged({ delayParam4: value });
      case 108:
        return this.onPatchChanged({ reverbEnabled: value === 1 });
      case 109:
        return this.onPatchChanged({ reverbType: value });
      case 110:
        return this.onPatchChanged({ reverbParam1: value });
      case 111:
        return this.onPatchChanged({ reverbParam2: value });
      case 112:
        return this.onPatchChanged({ reverbParam3: value });
      case 113:
        return this.onPatchChanged({ reverbParam4: value });
      case 114:
        return this.onPatchChanged({ powerAmpEnabled: value === 1 });
      case 115:
        return this.onPatchChanged({ powerAmpType: value });
      case 116:
        return this.onPatchChanged({ cabinetEnabled: value === 1 });
      case 117:
        return this.onPatchChanged({ cabinetType: value });
      case 118:
        return this.onPatchChanged({ presence: value });
      case 119:
        return this.onPatchChanged({ resonance: value });
      default:
        break;
    }
  }
}

export const codeApi: CodeApi = new CodeClient();

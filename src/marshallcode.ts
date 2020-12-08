import {
  CabinetType,
  DelayType,
  factory,
  ModulationType,
  Patch,
  PedalType,
  PowerAmpType,
  PreAmpType,
  ReverbType,
} from './Patch';
import MIDIAccess = WebMidi.MIDIAccess;
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import MIDIOutput = WebMidi.MIDIOutput;

interface CodeOptions {
  onConnected?: (connected: boolean) => any
  onPresetNumberChanged?: (index: number) => any
  onSettingsLoaded?: (patch: Patch) => any
  onSettingsUpdated?: (index: number) => any
  onPatchChanged?: (changes: object) => any
  debug?: boolean
}

class CodeApi {
  private output?: MIDIOutput;
  private options: CodeOptions;

  constructor(options: CodeOptions) {
    this.options = options;

    this.onStateChanged = this.onStateChanged.bind(this);
    this.onMidiMessage = this.onMidiMessage.bind(this);

    navigator.requestMIDIAccess({sysex: true})
      .then(access => {
        this.onStateChanged(access);
        access.onstatechange = () => this.onStateChanged(access);
      });
  }

  switchToPreset(index: number) {
    this.output?.send([0xc0, index]);
  }

  loadPatch() {
    this.output?.send([0xf0, 0x00, 0x21, 0x15, 0x7f, 0x7f, 0x7f, 0x73, 0x01, 0x00, 0xf7]);
  }

  loadPreset(index: number) {
    this.output?.send([0xf0, 0x00, 0x21, 0x15, 0x7f, 0x7f, 0x7f, 0x72, 0x01, index, 0xf7]);
  }

  private onStateChanged(midiAccess: MIDIAccess) {
    let newOutput: MIDIOutput | undefined = undefined;
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
      this.options.onConnected?.(false);
    }

    if (!this.output && newOutput) {
      this.output = newOutput;
      this.options.onConnected?.(true);
    }
  }

  private onMidiMessage(e: MIDIMessageEvent) {
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
        this.options.onPresetNumberChanged?.(data[1]);
        break;
      case 0xF0:
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

    switch (command) {
      case 3:
        const patch = factory.fromArray(data);
        this.options.onSettingsLoaded?.(patch);
        break;
      case 4:
        const index = data[9];
        this.options.onSettingsUpdated?.(index);
        break;
      default:
        throw {
          message: 'Illegal Argument',
          target: target,
          command: command,
        };
    }
  }

  private handleSettingsMessage(key: number, value: number) {
    switch (key) {
      case 31:
        return this.options.onPatchChanged?.({delayTimeMsb: value});
      case 63:
        return this.options.onPatchChanged?.({delayTimeLsb: value});
      case 70:
        return this.options.onPatchChanged?.({gain: value});
      case 71:
        return this.options.onPatchChanged?.({bass: value});
      case 72:
        return this.options.onPatchChanged?.({middle: value});
      case 73:
        return this.options.onPatchChanged?.({treble: value});
      case 74:
        return this.options.onPatchChanged?.({volume: value});
      case 75:
        return this.options.onPatchChanged?.({pedalEnabled: value === 1});
      case 76:
        return this.options.onPatchChanged?.({
          // @ts-ignore
          pedalType: PedalType[PedalType[value]],
          pedalParam1: 0,
          pedalParam2: 0,
          pedalParam3: 0,
          pedalParam4: 0,
        });
      case 77:
        return this.options.onPatchChanged?.({pedalParam1: value});
      case 78:
        return this.options.onPatchChanged?.({pedalParam2: value});
      case 79:
        return this.options.onPatchChanged?.({pedalParam3: value});
      case 80:
        return this.options.onPatchChanged?.({pedalParam4: value});
      case 81:
        return this.options.onPatchChanged?.({preAmpEnabled: value === 1});
      case 82:
        // @ts-ignore
        return this.options.onPatchChanged?.({preAmpType: PreAmpType[PreAmpType[value]]});
      case 83:
        return this.options.onPatchChanged?.({gate: value});
      case 85:
        return this.options.onPatchChanged?.({modulationEnabled: value === 1});
      case 86:
        // @ts-ignore
        return this.options.onPatchChanged?.({modulationType: ModulationType[ModulationType[value]]});
      case 87:
        return this.options.onPatchChanged?.({modulationParam1: value});
      case 89:
        return this.options.onPatchChanged?.({modulationParam2: value});
      case 90:
        return this.options.onPatchChanged?.({modulationParam3: value});
      case 102:
        return this.options.onPatchChanged?.({modulationParam4: value});
      case 103:
        return this.options.onPatchChanged?.({delayEnabled: value === 1});
      case 104:
        // @ts-ignore
        return this.options.onPatchChanged?.({delayType: DelayType[DelayType[value]]});
      case 105:
        return this.options.onPatchChanged?.({delayParam2: value});
      case 106:
        return this.options.onPatchChanged?.({delayParam3: value});
      case 107:
        return this.options.onPatchChanged?.({delayParam4: value});
      case 108:
        return this.options.onPatchChanged?.({reverbEnabled: value === 1});
      case 109:
        // @ts-ignore
        return this.options.onPatchChanged?.({reverbType: ReverbType[ReverbType[value]]});
      case 110:
        return this.options.onPatchChanged?.({reverbParam1: value});
      case 111:
        return this.options.onPatchChanged?.({reverbParam2: value});
      case 112:
        return this.options.onPatchChanged?.({reverbParam3: value});
      case 113:
        return this.options.onPatchChanged?.({reverbParam4: value});
      case 114:
        return this.options.onPatchChanged?.({powerAmpEnabled: value === 1});
      case 115:
        // @ts-ignore
        return this.options.onPatchChanged?.({powerAmpType: PowerAmpType[PowerAmpType[value]]});
      case 116:
        return this.options.onPatchChanged?.({cabinetEnabled: value === 1});
      case 117:
        // @ts-ignore
        return this.options.onPatchChanged?.({cabinetType: CabinetType[CabinetType[value]]});
      case 118:
        return this.options.onPatchChanged?.({presence: value});
      case 119:
        return this.options.onPatchChanged?.({resonance: value});
      default:
        break;
    }
  }
}

export default CodeApi;

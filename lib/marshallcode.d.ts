import { Patch } from './Patch';
declare class CodeApi {
    private emitter;
    private output?;
    constructor();
    addDeviceConnectedListener(listener: () => any): void;
    addDeviceDisconnectedListener(listener: () => any): void;
    addPresetNumberChanged(listener: (index: number) => any): void;
    addSettingsLoadedListener(listener: (patch: Patch) => any): void;
    addSettingsUpdatedListener(listener: (index: number) => any): void;
    addPatchChangedListener(listener: (changes: object) => any): void;
    connect(): void;
    switchToPreset(index: number): void;
    loadPatch(): void;
    loadPreset(index: number): void;
    private onStateChanged;
    private onMidiMessage;
    private handlePresetSettingsMessage;
    private handleSettingsMessage;
    private decodePatch;
}
declare const codeApi: CodeApi;
export default codeApi;

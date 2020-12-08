import { Patch } from './Patch';
interface CodeOptions {
    onConnected?: (connected: boolean) => any;
    onPresetNumberChanged?: (index: number) => any;
    onSettingsLoaded?: (patch: Patch) => any;
    onSettingsUpdated?: (index: number) => any;
    onPatchChanged?: (changes: object) => any;
    debug?: boolean;
}
declare class CodeApi {
    private output?;
    private options;
    constructor(options: CodeOptions);
    switchToPreset(index: number): void;
    loadPatch(): void;
    loadPreset(index: number): void;
    private onStateChanged;
    private onMidiMessage;
    private handlePresetSettingsMessage;
    private handleSettingsMessage;
}
export default CodeApi;

```javascript
import { codeApi } from 'marshall-code-api';

codeApi.onConnected = connected => {
    console.log('CODE is', connected ? 'Connected' : 'Disconnected');
    if (connected) {
        codeApi.loadPatch();
    }
};
codeApi.onPresetNumberChanged = number => {
    console.log('Preset number changed to', number);
    codeApi.loadPreset(number);
};
codeApi.onPatchChanged = changes => {
    console.log('Patch changed', changes);
};
codeApi.onSettingsUpdated = index => {
    console.log('Patch', index, 'updated');
};
codeApi.onSettingsLoaded = patch => {
    console.log('Patch loaded', patch)
};

await codeApi.init();

codeApi.switchToPreset(2);
```

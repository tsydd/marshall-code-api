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
codeApi.onPresetModified = changes => {
    console.log('Preset changed', changes);
};
codeApi.onPresetUpdated = index => {
    console.log('Preset', index, 'updated');
};
codeApi.onCurrentPresetReceived = patch => {
    console.log('Preset loaded', patch)
};

await codeApi.init();

codeApi.switchToPreset(2);
```

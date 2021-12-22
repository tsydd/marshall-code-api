![nodejs](https://github.com/tsydd/marshall-code-api/actions/workflows/publish.yml/badge.svg)

```javascript
import { codeApi } from 'marshall-code-api';

codeApi.onConnected = (connected) => {
    console.log(`CODE is ${connected ? 'Connected' : 'Disconnected'}`);
    if (connected) {
        codeApi.requestCurrentPreset();
    }
};
codeApi.onPresetNumberChanged = (number) => {
    console.log(`Preset number changed to ${number}`);
    codeApi.requestPreset(number);
};
codeApi.onPresetModified = (changes) => {
    console.log('Preset changed', changes);
};
codeApi.onPresetUpdated = (index) => {
    console.log(`Preset #${index} updated`);
};
codeApi.onCurrentPresetReceived = (preset) => {
    console.log('Preset loaded', preset);
};

await codeApi.init();

codeApi.switchToPreset(2);
```

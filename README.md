```javascript
import CodeApi from 'marshall-code-api';

const codeApi = new CodeApi({
  onConnected: connected => {
    console.log('CODE is', connected ? 'Connected' : 'Disconnected');
    if (connected) {
      codeApi.loadPatch();
    }
  },
  onPresetNumberChanged: number => {
    console.log('Preset number changed to', number);
    codeApi.loadPreset(number);
  },
  onPatchChanged: changes => {
    console.log('Patch changed', changes);
  },
  onSettingsUpdated: index => {
    console.log('Patch', index, 'updated');
  },
  onSettingsLoaded: patch => {
    console.log('Patch loaded', patch)
  }
});
codeApi.switchToPreset(2);
```

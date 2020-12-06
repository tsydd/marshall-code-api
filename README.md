```javascript
import codeApi from 'marshall-code-api';

codeApi.addDeviceConnectedListener(() => {
    console.log("Connected");
    codeApi.loadPatch();
});

codeApi.addDeviceDisconnectedListener(() => {
    console.log("Disconnected")
})

codeApi.addSettingsLoadedListener(patch => {
    console.log(patch)
})

codeApi.addPresetNumberChanged(index => {
    console.log('Preset number changed to', index);
})

codeApi.addPatchChangedListener(changes => {
    console.log(changes)
})

codeApi.connect();
```

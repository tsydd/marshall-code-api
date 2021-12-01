export interface DeviceInformation {
  familyId: number;
  modelId: number;
  deviceId: number;
  status: number;
  serialNumber: string;
  hardwareVersion: string;
  bootloaderVersion: string;
  mcuFirmwareVersion: string;
  dspFirmwareVersion: string;
}

export interface BluetoothInformation {
  address: string;
}

export interface BluetoothFirmware {
  version: string;
}

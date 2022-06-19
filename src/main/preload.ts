import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("api", {
  switchCamera: async (status: string) =>
    await ipcRenderer.invoke("swichCamera", status),
  on: (channel: string, callback: (event: any) => void) =>
    ipcRenderer.on(channel, (event: any) => callback(event)),
});

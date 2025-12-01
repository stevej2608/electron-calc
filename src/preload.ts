import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  // Send calculation request to main process
  calculate: (operand1: number, operand2: number, operator: string): Promise<number> => {
    return ipcRenderer.invoke('calculate', { operand1, operand2, operator });
  }
});

import { app, BrowserWindow, screen, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import * as calculatorLogic from './calculator-logic';

// Disable sandbox and GPU for containerized environments
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-gpu');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { x, y, width, height } = primaryDisplay.bounds;

  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    x: x + Math.floor((width - 400) / 2),
    y: y + Math.floor((height - 600) / 2),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    resizable: false,
    autoHideMenuBar: true,
  });

  mainWindow.removeMenu();

  // Load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// ============================================
// IPC HANDLER - Routes messages to business logic
// ============================================
// This demonstrates separation of concerns:
// - GUI (renderer) handles user input and display
// - Business logic (calculator-logic.ts) performs actual calculations
// - Main process routes IPC messages between them

ipcMain.handle('calculate', async (event, { operand1, operand2, operator }: { operand1: number; operand2: number; operator: string }) => {
  // Delegate to business logic module
  return await calculatorLogic.calculate(operand1, operand2, operator);
});

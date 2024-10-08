const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.setAlwaysOnTop(true, 'screen-saver', 1);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Set up the IPC listener in the createWindow function
  ipcMain.on('minimize-window', () => {
    if (mainWindow) {
      mainWindow.setSize(300, 100); // Adjust the window size as needed
      mainWindow.setResizable(false);
    }
  });

  ipcMain.on('restore-window', () => {
    if (mainWindow) {
      mainWindow.setSize(500, 300); // Restore the window to its original size
      mainWindow.setResizable(true);
      mainWindow.webContents.send('restore-content');
    }
  });
};

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
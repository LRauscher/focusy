// renderer.js

const minimizeBtn = document.getElementById('minimizeButton');
const headerEl = document.getElementById('header');
const mainEl = document.getElementById('main');
const miniEl = document.getElementById('miniMain');

minimizeBtn.addEventListener('click', () => {
  console.log('Minimize button clicked');
  originalContent = mainEl.innerHTML;
  headerEl.style.display = 'none';
  mainEl.style.display = 'none';
  miniEl.style.display = 'flex';

  window.electron.ipcRenderer.send('minimize-window');

  document.getElementById('mini').addEventListener('click', () => {
    console.log('Minimized window clicked');
    window.electron.ipcRenderer.send('restore-window');
  });
});

window.electron.ipcRenderer.on('restore-content', () => {
  console.log('Restoring content...');
  miniEl.style.display = 'none';
  headerEl.style.display = 'flex';
  mainEl.style.display = 'block';
});

ipcRenderer.on('update-available', () => {
  // Notify user that an update is available
  alert('Update available. Downloading...');
});

ipcRenderer.on('update-downloaded', () => {
  // Notify user that the update is downloaded
  alert('Update downloaded. Restarting app...');
  autoUpdater.quitAndInstall(); // This will restart the app and apply the update
});
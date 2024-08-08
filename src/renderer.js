const minimizeBtn = document.getElementById('minimizeButton');
const headerEl = document.getElementById('header');
const mainEl = document.getElementById('main');
const miniEl = document.getElementById('miniMain');

minimizeBtn.addEventListener('click', () => {
  console.log('Minimize button clicked');
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
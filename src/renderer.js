// renderer.js

const minimizeBtn = document.getElementById('minimizeButton');
const headerEl = document.getElementById('header');
const mainEl = document.getElementById('main');

minimizeBtn.addEventListener('click', () => {
  console.log('Minimize button clicked');
  headerEl.style.display = 'none';
  mainEl.innerHTML = `
    <div id="mini">
      <div id="logoDiv">
        <img src="../public/images/Web Staples Focusy.png" alt="Logo" >
      </div>
      <div id="timerDisplay"></div>
    </div>
  `;

  window.electron.ipcRenderer.send('minimize-window');

  document.getElementById('mini').addEventListener('click', () => {
    console.log('Minimized window clicked');
    window.electron.ipcRenderer.send('restore-window');
  });
});

window.electron.ipcRenderer.on('restore-content', () => {
  console.log('Restoring content...');
  headerEl.style.display = 'block';
  mainEl.innerHTML = ''; // Restore your original content here
});
const { ipcRenderer, remote } = require('electron');

const closeWindow = document.getElementById('closeWindow');
closeWindow.addEventListener('click', () => {
    ipcRenderer.send('quitApp');
});

const minimiseWindow = document.getElementById('minimiseWindow');
minimiseWindow.addEventListener('click', () => {
    remote.BrowserWindow.getFocusedWindow().minimize();
});
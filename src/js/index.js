const { ipcRenderer, remote } = require('electron');

const closeWindow = document.getElementById('closeWindow');
closeWindow.addEventListener('click', () => {
    ipcRenderer.send('invokeQuitModal');
    // window.open('../quitModal.html', '_blank', 'modal')
    // let modal = window.open('../quitModal.html', 'modal')
});

const minimiseWindow = document.getElementById('minimiseWindow');
minimiseWindow.addEventListener('click', () => {
    remote.BrowserWindow.getFocusedWindow().minimize();
});
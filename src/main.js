const { app, BrowserWindow, ipcMain, remote } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Used to timeout splashscreen
const timer = ms => new Promise( res => setTimeout(res, ms));

const createWindow = () => {
  const splashscreenWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    transparent: true,
    frame: false,
    alwaysOnTop: true
  });
  
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true
    },
    transparent: true,
    frame: false
  });
  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    if (frameName === 'modal') {
      // open window as modal
      event.preventDefault()
      Object.assign(options, {
        modal: true,
        parent: mainWindow,
        width: 100,
        height: 100
      })
      event.newGuest = new BrowserWindow(options)
    }
  })
  
  // // Create the quit confirmation window.
  // const quitWindow = new BrowserWindow({
  //   width: 250,
  //   height: 200,
  //   webPreferences: {
  //     nodeIntegration: true
  //   },
  //   parent: mainWindow,
  //   modal: true,
  //   show: false,
  //   transparent: true,
  //   frame: false
  // });
  
  // and load the index.html of the app.
  splashscreenWindow.loadFile(path.join(__dirname, 'splash.html'));
  // splashscreenWindow.webContents.openDevTools();
  
  // After 7.5s, close splashscreen and load main interface
  // timer(7500).then(function (_) {
  timer(500).then(function (_) {
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    splashscreenWindow.close();
    
    mainWindow.webContents.openDevTools();
  });
  
  // Open the DevTools.
  
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // Force light theme
  require('electron').nativeTheme.themeSource = 'light';
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('quitApp', (event, arg) => {
  app.quit();
})

// ipcMain.on('invokeQuitModal', (event, arg) => {

// })
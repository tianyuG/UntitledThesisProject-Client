const { app, BrowserWindow, ipcMain, remote } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Used to timeout splashscreen
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const createWindow = () => {
  const splashscreenWindow = new BrowserWindow({
    width: 600,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
    },
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      enableRemoteModule: true,
    },
    transparent: true,
    frame: false,
  });

  // When mainWindow becomes active window again, change window shade colour
  // from inactive (grey) to active (blue)
  ipcMain.on("doActivateMainTitleBar", (event, arg) => {
    mainWindow.webContents.send("activateMainTitleBar");
  });

  // Set up quit confirmation modal
  mainWindow.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options, additionalFeatures) => {
      if (frameName === "quitModal") {
        // open window as modal
        event.preventDefault();
        Object.assign(options, {
          modal: true,
          parent: mainWindow,
          transparent: true,
          frame: false,
          resizable: false,
          width: 250,
          height: 90,
          // useContentSize: true,
        });
        event.newGuest = new BrowserWindow(options);
        event.newGuest.center();
      }
    }
  );

  // and load splash screen.
  splashscreenWindow.loadFile(path.join(__dirname, "splash.html"));
  // splashscreenWindow.webContents.openDevTools();

  // After 7.5s, close splashscreen and load main interface
  // timer(7500).then(function (_) {
  timer(500).then(function (_) {
    splashscreenWindow.close();
    mainWindow.loadFile(path.join(__dirname, "index.html"));

    // Center mainWindow and prevent it from being resized
    mainWindow.center();
    mainWindow.setResizable(false);
    mainWindow.setMaximizable(false);

    mainWindow.webContents.openDevTools();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  // Force light theme
  require("electron").nativeTheme.themeSource = "light";
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on("quitApp", (event, arg) => {
  app.quit();
});

// ipcMain.on('invokeQuitModal', (event, arg) => {

// })

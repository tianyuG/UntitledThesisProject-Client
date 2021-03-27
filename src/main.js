const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");

global.remoteServerGeneratorURL = "http://34.69.37.51:1901/generate";

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
      // devTools: false,
    },
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    icon: path.join(__dirname, "bin/images/appIcon.png"),
  });

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      enableRemoteModule: true,
      webviewTag: true,
      // devTools: false,
    },
    transparent: true,
    frame: false,
    icon: path.join(__dirname, "bin/images/appIcon.png"),
  });

  // When mainWindow becomes active window again, change window shade colour
  // from inactive (grey) to active (blue)
  ipcMain.on("doActivateMainTitleBar", (event, arg) => {
    mainWindow.webContents.send("activateMainTitleBar");
  });

  // Deactivate window shade when window loses focus
  mainWindow.on("blur", () => {
    mainWindow.webContents.send("deactivateMainTitleBar");
  });

  // Reactivate window shade when window regains focus
  mainWindow.on("focus", () => {
    mainWindow.webContents.send("activateMainTitleBar");
  });

  // Toggle mainWindow DevTools
  ipcMain.on("toggleMainWindowDevTools", () => {
    mainWindow.webContents.toggleDevTools();
  });

  // Set new window properties
  mainWindow.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options, additionalFeatures) => {
      if (frameName === "quitModal") {
        // Set up quit confirmation modal
        event.preventDefault();
        Object.assign(options, {
          modal: true,
          parent: mainWindow,
          // webPreferences: {
          //   devTools: false,
          // },
          transparent: true,
          frame: false,
          resizable: false,
          width: 250,
          height: 90,
          icon: path.join(__dirname, "bin/images/appIcon.png"),
          // useContentSize: true,
        });
        event.newGuest = new BrowserWindow(options);
        event.newGuest.center();
      } else if (frameName === "aboutModal") {
        event.preventDefault();
        Object.assign(options, {
          modal: true,
          parent: mainWindow,
          // webPreferences: {
          //   devTools: false,
          // },
          transparent: true,
          frame: false,
          resizable: false,
          width: 450,
          height: 232,
          icon: path.join(__dirname, "bin/images/appIcon.png"),
          // useContentSize: true,
        });
        event.newGuest = new BrowserWindow(options);
        event.newGuest.center();
        // event.newGuest.openDevTools();
        // Set up media player modal
        // event.preventDefault();
        // Object.assign(options, {
        //   modal: true,
        //   parent: mainWindow,
        //   transparent: true,
        //   frame: false,
        //   resizable: false,
        //   width: 250,
        //   height: 90,
        //   icon: path.join(__dirname, "bin/images/appIcon.png"),
        //   // useContentSize: true,
        // });
        // event.newGuest = new BrowserWindow(options);
        // event.newGuest.center();
      } else if (frameName === "licenseSplash") {
        // TODO: Modify license splash window properties
        app.commandLine.appendSwitch(
          "autoplay-policy",
          "no-user-gesture-required"
        );
        console.log("license detected");
        event.preventDefault();
        Object.assign(options, {
          // webPreferences: {
          //   devTools: false,
          // },
          frame: false,
          resizable: false,
          fullscreen: true,
          transparent: false,
          // useContentSize: true,
        });
        event.newGuest = new BrowserWindow(options);
        event.newGuest.center();
        // event.newGuest.webContents.on("dom-ready", () => {
        //   event.newGuest.send("play-audio");
        // });
      } else if (frameName === "debugModal") {
        event.preventDefault();
        Object.assign(options, {
          modal: true,
          parent: mainWindow,
          // webPreferences: {
          //   devTools: false,
          // },
          transparent: true,
          frame: false,
          resizable: false,
          width: 300,
          height: 134,
          icon: path.join(__dirname, "bin/images/appIcon.png"),
          // useContentSize: true,
        });
        event.newGuest = new BrowserWindow(options);
        event.newGuest.center();
      } else if (frameName === "settingsModal") {
        event.preventDefault();
        Object.assign(options, {
          modal: true,
          parent: mainWindow,
          // webPreferences: {
          //   devTools: false,
          // },
          transparent: true,
          frame: false,
          resizable: false,
          width: 240,
          height: 88,
          icon: path.join(__dirname, "bin/images/appIcon.png"),
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

    // mainWindow.webContents.openDevTools();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  // Force light theme
  require("electron").nativeTheme.themeSource = "light";
  globalShortcut.registerAll(
    ["CommandOrControl+R", "CommandOrControl+Shift+R", "F5"],
    () => {
      console.log("Refresh keyboard shortcut detected. Ignoring.");
    }
  );
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    globalShortcut.unregisterAll();
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

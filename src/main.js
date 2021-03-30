const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");
const iR = require("is-reachable");

global.remoteServerURL = "http://34.69.37.51:1901";
// global.remoteServerURL = "http://google.com";
global.remoteServerGeneratorURL = "http://34.69.37.51:1901/generate";
global.isServerReachable = false;
// DEV FLAGS
global.allowCliFlags = true;
global.ignoreOfflineNags = false;
global.ignoreStartupSlowdown = false;
global.allowDevTools = false; // Unused
global.allowKeyboardShortcuts = true;

// // Handle creating/removing shortcuts on Windows when installing/uninstalling.
// // add "electron-squirrel-startup": "^1.0.0", to dependencies in package.json if uncommented
// if (require("electron-squirrel-startup")) {
//   // eslint-disable-line global-require
//   app.quit();
// }

// Code to deal with screen flickering when opening/closing frameless child window:
// https://www.electronjs.org/docs/api/browser-window#showing-window-gracefully
// And
// https://github.com/electron/electron/issues/10616

// Used to timeout splashscreen
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const createWindow = () => {
  let licenseSplash;
  let quitModal, aboutModal, debugModal, settingsModal;
  const splashscreenWindow = new BrowserWindow({
    width: 600,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
      devTools:
        global.allowDevTools || app.commandLine.hasSwitch("allow-devtools"),
    },
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    icon: path.join(__dirname, "bin/images/appIcon.png"),
    show: false,
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
      devTools:
        global.allowDevTools || app.commandLine.hasSwitch("allow-devtools"),
    },
    transparent: true,
    frame: false,
    icon: path.join(__dirname, "bin/images/appIcon.png"),
    show: false,
  });

  // When mainWindow becomes active window again, change window shade colour
  // from inactive (grey) to active (blue)
  ipcMain.on("doActivateMainTitleBar", (event, arg) => {
    mainWindow.webContents.send("activateMainTitleBar");
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Deactivate window shade when window loses focus
  mainWindow.on("blur", () => {
    mainWindow.webContents.send("deactivateMainTitleBar");
  });

  // Reactivate window shade when window regains focus
  mainWindow.on("focus", () => {
    mainWindow.webContents.send("activateMainTitleBar");
  });

  splashscreenWindow.on("ready-to-show", async () => {
    splashscreenWindow.show();
    var iRRet;
    if (
      app.commandLine.hasSwitch("ignore-startup-slowdown") ||
      global.ignoreStartupSlowdown
    ) {
      if (
        (app.commandLine.hasSwitch("ignore-offline-nags") ||
          global.ignoreOfflineNags) &&
        !app.commandLine.hasSwitch("force-offline")
      ) {
        iRRet = true;
      } else {
        iRRet = false;
      }
    } else if (app.commandLine.hasSwitch("force-offline")) {
      iRRet = false;
    } else {
      iRRet = await iR(global.remoteServerURL, { timeout: 3000 });
    }
    global.isServerReachable = iRRet;
  });

  // Toggle mainWindow DevTools
  ipcMain.on("toggleMainWindowDevTools", () => {
    mainWindow.webContents.toggleDevTools();
  });

  ipcMain.on("open-licenseSplash", () => {
    app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
    licenseSplash = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        devTools:
          global.allowDevTools || app.commandLine.hasSwitch("allow-devtools"),
        enableRemoteModule: true,
        nodeIntegration: true,
      },
      frame: false,
      resizable: false,
      // fullscreen: true,
      transparent: false,
      show: false,
    });
    licenseSplash.loadFile(path.join(__dirname, "licenseSplash.html"));
    mainWindow.setAlwaysOnTop(false);
    licenseSplash.once("ready-to-show", () => {
      licenseSplash.show();
    });
    licenseSplash.on("close", () => {
      licenseSplash.hide();
    });
    licenseSplash.on("blur", () => {
      aboutModal.webContents.send("stop-audio");
      licenseSplash.close();
    });
    licenseSplash.on("close", () => {
      aboutModal.webContents.send("stop-audio");
    });
  });

  ipcMain.on("open-aboutModal", () => {
    app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
    aboutModal = new BrowserWindow({
      modal: true,
      parent: mainWindow,
      webPreferences: {
        devTools:
          global.allowDevTools || app.commandLine.hasSwitch("allow-devtools"),
        enableRemoteModule: true,
        nodeIntegration: true,
      },
      transparent: true,
      frame: false,
      resizable: false,
      width: 432,
      height: 232,
      icon: path.join(__dirname, "bin/images/appIcon.png"),
      show: false,
    });
    aboutModal.loadFile(path.join(__dirname, "aboutModal.html"));
    aboutModal.once("ready-to-show", () => {
      aboutModal.show();
    });
    aboutModal.on("focus", () => {
      mainWindow.setAlwaysOnTop(true);
    });
    // aboutModal.on("blur", () => {
    //   mainWindow.setAlwaysOnTop(false);
    // });
    aboutModal.on("close", () => {
      ipcMain.send("stop-audio");
      mainWindow.setAlwaysOnTop(false);
    });
  });

  ipcMain.on("open-quitModal", () => {
    quitModal = new BrowserWindow({
      modal: true,
      parent: mainWindow,
      webPreferences: {
        devTools:
          global.allowDevTools || app.commandLine.hasSwitch("allow-devtools"),
        enableRemoteModule: true,
        nodeIntegration: true,
      },
      transparent: true,
      frame: false,
      resizable: false,
      width: 252,
      height: 92,
      icon: path.join(__dirname, "bin/images/appIcon.png"),
      show: false,
    });
    quitModal.loadFile(path.join(__dirname, "quitModal.html"));
    quitModal.once("ready-to-show", () => {
      quitModal.show();
    });
    quitModal.on("focus", () => {
      mainWindow.setAlwaysOnTop(true);
    });
    quitModal.on("blur", () => {
      mainWindow.setAlwaysOnTop(false);
    });
    quitModal.on("close", () => {
      mainWindow.setAlwaysOnTop(true);
    });
  });

  ipcMain.on("open-debugModal", () => {
    debugModal = new BrowserWindow({
      modal: true,
      parent: mainWindow,
      webPreferences: {
        devTools:
          global.allowDevTools || app.commandLine.hasSwitch("allow-devtools"),
        enableRemoteModule: true,
        nodeIntegration: true,
      },
      transparent: true,
      frame: false,
      resizable: false,
      width: 300,
      height: 140,
      icon: path.join(__dirname, "bin/images/appIcon.png"),
      show: false,
    });
    debugModal.loadFile(path.join(__dirname, "debugModal.html"));
    debugModal.once("ready-to-show", () => {
      debugModal.show();
    });
    debugModal.on("focus", () => {
      mainWindow.setAlwaysOnTop(true);
    });
    debugModal.on("blur", () => {
      mainWindow.setAlwaysOnTop(false);
    });
    debugModal.on("close", () => {
      mainWindow.setAlwaysOnTop(true);
    });
  });

  ipcMain.on("open-settingsModal", () => {
    settingsModal = new BrowserWindow({
      modal: true,
      parent: mainWindow,
      webPreferences: {
        devTools:
          global.allowDevTools || app.commandLine.hasSwitch("allow-devtools"),
        enableRemoteModule: true,
        nodeIntegration: true,
      },
      transparent: true,
      frame: false,
      resizable: false,
      width: 240,
      height: 88,
      icon: path.join(__dirname, "bin/images/appIcon.png"),
      show: false,
    });
    settingsModal.loadFile(path.join(__dirname, "settingsModal.html"));
    settingsModal.once("ready-to-show", () => {
      settingsModal.show();
    });
    settingsModal.on("focus", () => {
      mainWindow.setAlwaysOnTop(true);
    });
    settingsModal.on("blur", () => {
      mainWindow.setAlwaysOnTop(false);
    });
    settingsModal.on("close", () => {
      mainWindow.setAlwaysOnTop(true);
    });
  });

  // // Set new window properties
  // mainWindow.webContents.on(
  //   "new-window",
  //   (event, url, frameName, disposition, options, additionalFeatures) => {
  //     if (frameName === "quitModal") {
  //       // Set up quit confirmation modal
  //       event.preventDefault();
  //       Object.assign(options, {
  //         modal: true,
  //         parent: mainWindow,
  //         webPreferences: {
  //           devTools: false,
  //           enableRemoteModule: true,
  //         },
  //         transparent: true,
  //         frame: false,
  //         resizable: false,
  //         width: 250,
  //         height: 90,
  //         icon: path.join(__dirname, "bin/images/appIcon.png"),
  //         // useContentSize: true,
  //       });
  //       event.newGuest = new BrowserWindow(options);
  //       event.newGuest.center();
  //     } else if (frameName === "aboutModal") {
  //       event.preventDefault();
  //       Object.assign(options, {
  //         modal: true,
  //         parent: mainWindow,
  //         webPreferences: {
  //           devTools: true,
  //           enableRemoteModule: true,
  //         },
  //         transparent: true,
  //         frame: false,
  //         resizable: false,
  //         width: 430,
  //         height: 232,
  //         icon: path.join(__dirname, "bin/images/appIcon.png"),
  //         // useContentSize: true,
  //       });
  //       event.newGuest = new BrowserWindow(options);
  //       event.newGuest.center();
  //       // event.newGuest.openDevTools();
  //       // Set up media player modal
  //       // event.preventDefault();
  //       // Object.assign(options, {
  //       //   modal: true,
  //       //   parent: mainWindow,
  //       //   transparent: true,
  //       //   frame: false,
  //       //   resizable: false,
  //       //   width: 250,
  //       //   height: 90,
  //       //   icon: path.join(__dirname, "bin/images/appIcon.png"),
  //       //   // useContentSize: true,
  //       // });
  //       // event.newGuest = new BrowserWindow(options);
  //       // event.newGuest.center();
  //     } else if (frameName === "licenseSplash") {
  //       // TODO: Modify license splash window properties
  //       app.commandLine.appendSwitch(
  //         "autoplay-policy",
  //         "no-user-gesture-required"
  //       );
  //       // console.log("license detected");
  //       event.preventDefault();
  //       Object.assign(options, {
  //         webPreferences: {
  //           devTools: false,
  //           enableRemoteModule: true,
  //         },
  //         frame: false,
  //         resizable: false,
  //         fullscreen: true,
  //         transparent: false,
  //         // kiosk: true,
  //         // useContentSize: true,
  //       });
  //       event.newGuest = new BrowserWindow(options);
  //       event.newGuest.center();
  //       event.newGuest.setAlwaysOnTop(true, "modal-panel");
  //     } else if (frameName === "debugModal") {
  //       event.preventDefault();
  //       Object.assign(options, {
  //         modal: true,
  //         parent: mainWindow,
  //         webPreferences: {
  //           devTools: false,
  //           enableRemoteModule: true,
  //         },
  //         transparent: true,
  //         frame: false,
  //         resizable: false,
  //         width: 300,
  //         height: 138,
  //         icon: path.join(__dirname, "bin/images/appIcon.png"),
  //         // useContentSize: true,
  //       });
  //       event.newGuest = new BrowserWindow(options);
  //       event.newGuest.center();
  //     } else if (frameName === "settingsModal") {
  //       event.preventDefault();
  //       Object.assign(options, {
  //         modal: true,
  //         parent: mainWindow,
  //         webPreferences: {
  //           devTools: false,
  //           enableRemoteModule: true,
  //         },
  //         transparent: true,
  //         frame: false,
  //         resizable: false,
  //         width: 240,
  //         height: 88,
  //         icon: path.join(__dirname, "bin/images/appIcon.png"),
  //       });
  //       event.newGuest = new BrowserWindow(options);
  //       event.newGuest.center();
  //     }
  //   }
  // );

  // and load splash screen.
  splashscreenWindow.loadFile(path.join(__dirname, "splash.html"));
  // splashscreenWindow.webContents.openDevTools();

  // After 7.5s, close splashscreen and load main interface
  var splashDelay = 6750 + Math.floor(Math.random() * 500);
  if (
    (global.allowCliFlags &&
      app.commandLine.hasSwitch("ignore-startup-slowdown")) ||
    global.ignoreStartupSlowdown
  ) {
    splashDelay = 100;
  }
  if (
    global.allowCliFlags &&
    app.commandLine.hasSwitch("ignore-offline-nags") &&
    !app.commandLine.hasSwitch("force-offline")
  ) {
    global.ignoreOfflineNags = true;
  }
  if (app.commandLine.hasSwitch("force-offline")) {
    global.isServerReachable = false;
  }
  timer(splashDelay).then(function (_) {
    splashscreenWindow.close();
    mainWindow.loadFile(path.join(__dirname, "index.html"));

    // Center mainWindow and prevent it from being resized
    mainWindow.center();
    mainWindow.setResizable(false);
    mainWindow.setMaximizable(false);

    // Warn that server is not reachable
    if (!global.isServerReachable && !global.ignoreOfflineNags) {
      // Create the browser window.
      const crcModal = new BrowserWindow({
        modal: true,
        parent: mainWindow,
        webPreferences: {
          devTools: false,
          nodeIntegration: true,
          enableRemoteModule: true,
        },
        transparent: true,
        frame: false,
        resizable: false,
        width: 320,
        height: 150,
        icon: path.join(__dirname, "bin/images/appIcon.png"),
        show: false,
      });
      crcModal.loadFile(path.join(__dirname, "crcModal.html"));
      crcModal.once("ready-to-show", () => {
        crcModal.show();
      });
      crcModal.on("focus", () => {
        mainWindow.setAlwaysOnTop(true);
      });
      crcModal.on("blur", () => {
        mainWindow.setAlwaysOnTop(false);
      });
      crcModal.on("close", () => {
        mainWindow.setAlwaysOnTop(true);
      });
    }

    // console.log(global.isServerReachable);

    // mainWindow.webContents.openDevTools();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  // Force light theme
  require("electron").nativeTheme.themeSource = "light";
  if (
    !app.commandLine.hasSwitch("allow-keyboard-shortcuts") &&
    !global.allowKeyboardShortcuts
  ) {
    globalShortcut.registerAll(
      ["CommandOrControl+R", "CommandOrControl+Shift+R", "F5", "F11"],
      () => {
        console.log(
          "Refresh/full screen keyboard shortcut detected. Ignoring."
        );
      }
    );
  }

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

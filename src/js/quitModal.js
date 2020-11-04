const { ipcRenderer, remote } = require("electron");

const closeWindow = document.getElementById("closeWindow");
closeWindow.addEventListener("click", () => {
  ipcRenderer.send("doActivateMainTitleBar");
  var currWin = remote.getCurrentWindow();
  currWin.close();
});

const closeWindowBttn = document.getElementById("qMod-cancel");
closeWindowBttn.addEventListener("click", () => {
  ipcRenderer.send("doActivateMainTitleBar");
  var currWin = remote.getCurrentWindow();
  currWin.close();
});

const quitApp = document.getElementById("qMod-quit");
quitApp.addEventListener("click", () => {
  require("electron").remote.app.quit();
});

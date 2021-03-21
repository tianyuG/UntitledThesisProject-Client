const { ipcRenderer, remote } = require("electron");

const closeWindow = document.getElementById("closeWindow");
closeWindow.addEventListener("click", () => {
  ipcRenderer.send("doActivateMainTitleBar");
  var currWin = remote.getCurrentWindow();
  currWin.close();
});

const closeModal = document.getElementById("aMod-close");
closeModal.addEventListener("click", () => {
  ipcRenderer.send("doActivateMainTitleBar");
  var currWin = remote.getCurrentWindow();
  currWin.close();
});

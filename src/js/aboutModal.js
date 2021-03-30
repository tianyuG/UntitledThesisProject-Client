const { ipcRenderer, remote } = require("electron");
const audioContext = new AudioContext();

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

const licenseModal = document.getElementById("aMod-license");
licenseModal.addEventListener("click", () => {
  ipcRenderer.send("doActivateMainTitleBar");
  var currWin = remote.getCurrentWindow();
  // ipcRenderer.send("closeLicense");
  window.open("licenseSplash.html", "licenseSplash");
  // window.webContents.openDevTools();
  // currWin.close();
});

const { ipcRenderer, remote } = require("electron");

ipcRenderer.on("activateMainTitleBar", (event, message) => {
  document.getElementById("mainTitleBar").classList.remove("inactive");
});

const closeWindow = document.getElementById("closeWindow");
closeWindow.addEventListener("click", () => {
  window.open("quitModal.html", "quitModal");
  document.getElementById("mainTitleBar").classList.add("inactive");
});

const titleBarIcon = document.getElementById("titleBarIcon");
titleBarIcon.addEventListener("click", () => {
  console.log("HEE");
  window.open("quitModal.html", "quitModal");
  document.getElementById("mainTitleBar").classList.add("inactive");
});

const minimiseWindow = document.getElementById("minimiseWindow");
minimiseWindow.addEventListener("click", () => {
  remote.BrowserWindow.getFocusedWindow().minimize();
});

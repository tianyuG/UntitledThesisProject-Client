const { ipcRenderer, remote } = require("electron");

ipcRenderer.on("activateMainTitleBar", (event, message) => {
  document.getElementById("mainTitleBar").classList.remove("inactive");
});

ipcRenderer.on("deactivateMainTitleBar", (event, message) => {
  document.getElementById("mainTitleBar").classList.add("inactive");
});

const closeWindow = document.getElementById("closeWindow");
closeWindow.addEventListener("click", () => {
  window.open("quitModal.html", "quitModal");
  document.getElementById("mainTitleBar").classList.add("inactive");
});

const titleBarIcon = document.getElementById("titleBarIcon");
titleBarIcon.addEventListener("dblclick", () => {
  window.open("quitModal.html", "quitModal");
  document.getElementById("mainTitleBar").classList.add("inactive");
});

const minimiseWindow = document.getElementById("minimiseWindow");
minimiseWindow.addEventListener("click", () => {
  remote.BrowserWindow.getFocusedWindow().minimize();
});

const openDevTools = document.getElementById("mainMenuDevTools");
openDevTools.addEventListener("click", () => {
  ipcRenderer.send("toggleMainWindowDevTools");
});

const mainListDemo2 = document.getElementById("mainListDemo2");
mainListDemo2.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/demo2.html";
});

const mainListDemo1 = document.getElementById("mainListDemo1");
mainListDemo1.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/demo1.html";
});

const { ipcRenderer, remote } = require("electron");

document.onkeydown = function (e) {
  e = e || window.event;
  if (e.key == "Escape" || e.key == "q") {
    closeSelf();
  }
};

document.body.addEventListener("click", closeSelf, true);
document.body.addEventListener("contextmenu", closeSelf, true);
document.body.addEventListener("visibilitychange", closeSelf, true);

function closeSelf() {
  ipcRenderer.send("stop-audio");
  var currWin = remote.getCurrentWindow();
  currWin.close();
}

ipcRenderer.on("closeGuest", closeSelf);

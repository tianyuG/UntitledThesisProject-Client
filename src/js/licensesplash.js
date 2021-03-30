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

// document.body.addEventListener(
//   "mousemove",
//   () => {
//     console.log("playaudio");
//     const audioContext = new AudioContext();
//     var la0 = document.getElementById("la-preloop");
//     var la1 = document.getElementById("la-loop-noremainder");
//     var la2 = document.getElementById("la-loop");
//     const ael1 = document.getElementById("la-loop-noremainder");
//     const tr1 = audioContext.createMediaElementSource(ael1);
//     tr1.connect(audioContext.destination);
//   },
//   { once: true }
// );

function closeSelf() {
  // ipcRenderer.send("doActivateMainTitleBar");
  ipcRenderer.send("stop-audio");
  var currWin = remote.getCurrentWindow();
  currWin.close();
}

// TODO: Do this in aboutModal!
// ipcRenderer.on("play-audio", () => {});

ipcRenderer.on("closeGuest", closeSelf);

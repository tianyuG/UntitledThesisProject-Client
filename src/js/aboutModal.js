const { ipcRenderer, remote } = require("electron");

let aC = null;
let sources = [];
const a0 = new Audio("./bin/audio/la-preloop.mp3");
const a1 = new Audio("./bin/audio/la-loop-noremainder.mp3");
const a2 = new Audio("./bin/audio/la-loop.mp3");

const closeWindow = document.getElementById("closeWindow");
closeWindow.addEventListener("click", () => {
  ipcRenderer.send("doActivateMainTitleBar");
  var currWin = remote.getCurrentWindow();
  stopAudio();
  currWin.close();
});

const closeModal = document.getElementById("aMod-close");
closeModal.addEventListener("click", () => {
  ipcRenderer.send("doActivateMainTitleBar");
  var currWin = remote.getCurrentWindow();
  stopAudio();
  currWin.close();
});

const aModLogo = document.getElementById("aMod-logo-img");
const aModContentVersion = document.getElementById("aMod-content-version");
aModLogo.addEventListener("dblclick", () => {
  aModContentVersion.innerHTML = ipcRenderer.sendSync("get-app-path");
  aModContentVersion.addEventListener("dblclick", () => {
    ipcRenderer.send("open-temp");
  });
});

const licenseModal = document.getElementById("aMod-license");
licenseModal.addEventListener("click", () => {
  ipcRenderer.send("open-licenseSplash");
  if (aC != null) {
    aC.resume();
  } else {
    aC = new AudioContext();

    if (sources.length == 0) {
      sources.push(aC.createMediaElementSource(a0));
      sources.push(aC.createMediaElementSource(a1));
      sources.push(aC.createMediaElementSource(a2));
    }

    sources[0].connect(aC.destination);
    console.log(sources);
    ipcRenderer.send("doActivateMainTitleBar");
    var currWin = remote.getCurrentWindow();
    a0.play();
    a0.addEventListener("ended", () => {
      sources[1].connect(aC.destination);
      a1.play();
    });
    a1.addEventListener("ended", () => {
      sources[2].connect(aC.destination);
      a2.play();
    });
    a2.addEventListener("ended", () => {
      a2.play();
    });
  }
});

ipcRenderer.on("stop-audio", () => {
  stopAudio();
});

function stopAudio() {
  if (aC != null) {
    aC.suspend();
  }
}

const { ipcRenderer, remote } = require("electron");
// import wiki from "wikijs";
const wiki = require("wikijs").default;

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

const mainIndexA = document.getElementById("mainindexA");
mainIndexA.addEventListener("click", () => {
  document.getElementById("mainContentSection").src =
    "./frames/boilerplate.html";
});

const mainIndexB = document.getElementById("mainindexB");
mainIndexB.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/populate.html";
});

// var typEl = document.getElementById("typ");

// var typ = new Typewriter(typEl, {
//   loop: true,
//   cursor: " ",
// });

// typ
//   .pauseFor(500)
//   .typeString("Hello World!")
//   .pauseFor(2500)
//   .deleteAll()
//   .typeString("Strings can be removed")
//   .pauseFor(2500)
//   .deleteChars(7)
//   .typeString("<strong>altered!</strong>")
//   .pauseFor(2500)
//   .start();

const commitSearch = document.getElementById("commitSearch");
commitSearch.addEventListener("click", () => {
  var searchTerm = document.getElementById("findBar").value;
  if (searchTerm !== "") {
    var mainContent = document.getElementById("mainContentSection");
    mainContent.src = "./frames/populate.html";

    mainContent.addEventListener("dom-ready", () => {
      mainContent.send("change-tw1", searchTerm);
      mainContent.openDevTools();
    });
  }
});

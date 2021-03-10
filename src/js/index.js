const { ipcRenderer, remote } = require("electron");
// import wiki from "wikijs";
const wiki = require("wikijs").default;
// import wiki from "wiki.js";

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
  console.log(searchTerm);
  if (searchTerm !== "") {
    var mainContent = document.getElementById("mainContentSection");
    // mainContent.reloadIgnoringCache();
    mainContent.src = "./frames/populate.html";

    // mainContent.addEventListener("dom-ready", () => {
    // mainContent.send("clear-tw");

    // mainContent.openDevTools();

    // NEEDSWORK: If dom-ready event is observed, clicking the button will fire off getSearchResults with all previous search terms, and the result will be unpredictable. If dom-ready is not observed, sometimes clicking on the button will result in a blank page as the page was not fully loaded. Setting 500ms delay is a temp fix.
    setTimeout(getSearchResults(searchTerm), 1250);

    // wiki()
    //   .page(searchTerm)
    //   // TODO: Return random article suggestions.
    //   .then((page) => page.summary())
    //   .then((res) => {
    //     mainContent.send("change-tw1", searchTerm);
    //     mainContent.send("change-tw2", res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     mainContent.send("change-tw1", searchTerm);
    //     mainContent.send(
    //       "change-tw2",
    //       "Absolutely nothing related to your search term was found. Well done. We humbly suggest these topics: TODO"
    //     );
    //   });
    // });
  }
});

function getSearchResults(query) {
  var mainContent = document.getElementById("mainContentSection");

  var url = "https://en.wikipedia.org/w/api.php";

  var params = {
    action: "query",
    format: "json",
    prop: "extracts|pageprops",
    titles: query,
    exsentences: "2",
    exlimit: "1",
    exintro: 1,
    explaintext: 1,
    redirects: 1,
    ppprop: "disambiguation",
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });

  console.log(url);
  console.log(url.length);

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var artKey = Object.keys(response.query.pages)[0];
      // console.log(response.query.pages[artKey]);

      if (artKey === "-1") {
        console.log("Nothing");
        mainContent.send("change-tw1", query);
        mainContent.send(
          "change-tw2",
          "Absolutely nothing related to your search term was found. Well done. We humbly suggest these topics: TODO"
        );
      } else if (
        Object.keys(response.query.pages[artKey]).includes("pageprops")
      ) {
        if (
          Object.keys(response.query.pages[artKey].pageprops).includes(
            "disambiguation"
          )
        ) {
          console.log("disambiguation");
          mainContent.send("change-tw1", query);
          mainContent.send("change-tw2", response.query.pages[artKey].extract);
          mainContent.send(
            "change-tw3",
            "this is a disambiguation page. will be fixed to redirect to first result soon."
          );
        }
      } else {
        var artExtract = response.query.pages[artKey].extract;
        var splitArtExtract = [
          artExtract.substring(0, artExtract.search(/[\.!\?]+/) + 1),
          artExtract.substring(artExtract.search(/[\.!\?]+/) + 2),
        ];
        // console.log(splitArtExtract);
        mainContent.send("change-tw1", response.query.pages[artKey].title);
        // mainContent.send("change-tw2", response.query.pages[artKey].extract);
        mainContent.send("change-tw23", splitArtExtract);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getRandom(count) {
  var url = "https://en.wikipedia.org/w/api.php";
  var retArr = [];

  var params = {
    action: "query",
    format: "json",
    list: "random",
    rnnamespace: "0",
    rnlimit: String(count),
  };

  await fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      retArr.push(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  return retArr;
}

async function getArticleCandidates(term, count) {
  var url = "https://en.wikipedia.org/w/api.php";
  var retArr = [];

  var params = {
    action: "query",
    format: "json",
    list: "random",
    rnnamespace: "0",
    rnlimit: "5",
  };
}

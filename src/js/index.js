const { ipcRenderer, remote } = require("electron");
// import wiki from "wikijs";
// const wiki = require("wikijs").default;
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

const commitSearchButton = document.getElementById("commitSearch");
commitSearchButton.addEventListener("click", () => {
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
  }
});

const findBar = document.getElementById("findBar");
findBar.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    var searchTerm = document.getElementById("findBar").value;
    if (searchTerm !== "") {
      var mainContent = document.getElementById("mainContentSection");
      // mainContent.reloadIgnoringCache();
      mainContent.src = "./frames/populate.html";

      // mainContent.addEventListener("dom-ready", () => {
      // mainContent.send("clear-tw");

      // mainContent.openDevTools();

      // NEEDSWORK: If dom-ready event is observed, clicking the button will fire off getSearchResults with all previous search terms, and the result will be unpredictable. If dom-ready is not observed, sometimes clicking on the button will result in a blank page as the page was not fully loaded. Setting 500ms delay is a temp fix.
      setTimeout(getSearchResults(searchTerm), 1250);
    }
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

  // console.log(url);
  // console.log(url.length);

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var artKey = Object.keys(response.query.pages)[0];
      // console.log(response.query.pages[artKey]);

      if (artKey === "-1") {
        getRandom(5)
          .then((randRes) => {
            console.log("Nothing");
            mainContent.send("change-tw1", query);
            mainContent.send(
              "change-tw2",
              "Absolutely nothing related to your search term was found. Well done. We humbly suggest the following topics: ".concat(
                randRes.join(", ")
              )
            );
          })
          .catch((e) => {
            mainContent.send("change-tw1", "Come Again?");
            mainContent.send(
              "change-tw2",
              "An error occurred when trying to retrieve the content. Please try again. (Error: " +
                e +
                ")"
            );
          });
      } else {
        if (Object.keys(response.query.pages[artKey]).includes("pageprops")) {
          if (
            Object.keys(response.query.pages[artKey].pageprops).includes(
              "disambiguation"
            )
          ) {
            url = "https://en.wikipedia.org/w/api.php";
            params = {
              action: "query",
              format: "json",
              prop: "links",
              pageids: response.query.pages[artKey].pageid,
              pllimit: "10",
              pldir: "ascending",
            };

            url = url + "?origin=*";
            Object.keys(params).forEach(function (key) {
              url += "&" + key + "=" + params[key];
            });

            fetch(url)
              .then((r) => {
                return r.json();
              })
              .then((r) => {
                artKey = Object.keys(r.query.pages)[0];

                console.log(r);
                // TODO!!!
                // Get the page title for a random result
                var pageCount = r.query.pages[artKey].links.length;
                var pageTitle =
                  r.query.pages[artKey].links[
                    Math.floor(Math.random() * pageCount)
                  ].title;

                url = "https://en.wikipedia.org/w/api.php";
                var params = {
                  action: "query",
                  format: "json",
                  prop: "extracts|pageprops",
                  titles: pageTitle,
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
                url = encodeURI(url);
                // console.log(url);

                fetch(url)
                  .then((r) => {
                    return r.json();
                  })
                  .then((r) => {
                    displayContent(r, mainContent);
                  });
              })
              .catch((e) => {
                mainContent.send("change-tw1", "Come Again?");
                mainContent.send(
                  "change-tw2",
                  "An error occurred when trying to retrieve the content. Please try again. (Error: " +
                    e +
                    ")"
                );
              });

            console.log("disambiguation");
          }
        } else {
          displayContent(response, mainContent);
        }
      }
    })
    .catch((e) => {
      mainContent.send("change-tw1", "Come Again?");
      mainContent.send(
        "change-tw2",
        "An error occurred when trying to retrieve the content. Please try again. (Error: " +
          e +
          ")"
      );
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
    rnlimit: count,
  };
  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });

  // var res = await (await fetch(url)).json();
  // console.log(res);

  await fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      for (var i in response.query.random) {
        Object.keys(response.query.random[i]).forEach((k) => {
          if (k === "title") {
            retArr.push(response.query.random[i][k]);
          }
        });
      }
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
    action: "opensearch",
    format: "json",
    search: term,
    namespace: "0",
    limit: count,
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });
}

async function getGeneratedAbstract(term, count) {
  var url = remote.getGlobal("remoteServerGeneratorURL");
  var ret = "";

  var params = {
    text: term,
    max_length: count,
  };

  await fetch(url, {
    method: "POST",
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      ret = response.output;
    });

  return ret;
}

function sanitiseAbstract(term) {
  var outputString = term;
  var checkString = term.toLowerCase();
  console.log(checkString);
  if (checkString.includes(" (listen) ")) {
    outputString = outputString.replace(/\(listen\)/gi, "");
    checkString = outputString.toLowerCase();
  }
  if (checkString.includes("( ")) {
    outputString = outputString.replace(/\(([ ])+/gi, "(");
    checkString = outputString.toLowerCase();
  }
  if (checkString.includes(" )")) {
    outputString = outputString.replace(/([ ])+\)/gi, ")");
    checkString = outputString.toLowerCase();
  }

  return outputString;
}

function displayContent(r, c) {
  artKey = Object.keys(r.query.pages)[0];
  var artExtract = r.query.pages[artKey].extract;
  console.log(artKey + ": " + artExtract);
  var splitArtExtract = [
    artExtract.substring(0, artExtract.search(/[\.!\?]+/) + 1),
    artExtract.substring(artExtract.search(/[\.!\?]+/) + 2),
  ];

  // Remove remnants of Wikipedia-styled articles
  splitArtExtract[0] = sanitiseAbstract(splitArtExtract[0]);

  // console.log(splitArtExtract);
  c.send("enable-tw5");
  getGeneratedAbstract(splitArtExtract[0], 300).then((genCont) => {
    // console.log(genCont);
    c.send("change-tw3", genCont);
    c.send("change-tw4", splitArtExtract[1]);
    c.send("disable-tw5");
  });
  c.send("change-tw1", r.query.pages[artKey].title);
  // c.send("change-tw2", r.query.pages[artKey].extract);

  c.send("change-tw2", splitArtExtract[0]);
}

ipcRenderer.on("navigate-to", (e, m) => {
  if (m !== "") {
    var mainContent = document.getElementById("mainContentSection");
    mainContent.src = "./frames/populate.html";
    setTimeout(getSearchResults(m), 1250);
  }
});

ipcRenderer.on("change-findbar", (e, m) => {
  if (m !== "") {
    var findbar = document.getElementById("findBar");
    findbar.value = m;
  }
});

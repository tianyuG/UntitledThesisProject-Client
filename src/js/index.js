const { ipcRenderer, remote } = require("electron");
const path = require("path");

ipcRenderer.on("activateMainTitleBar", (event, message) => {
  document.getElementById("mainTitleBar").classList.remove("inactive");
});

ipcRenderer.on("deactivateMainTitleBar", (event, message) => {
  document.getElementById("mainTitleBar").classList.add("inactive");
});

const closeWindow = document.getElementById("closeWindow");
closeWindow.addEventListener("click", () => {
  // window.open("quitModal.html", "quitModal");
  ipcRenderer.send("open-quitModal");
  document.getElementById("mainTitleBar").classList.add("inactive");
});

const titleBarIcon = document.getElementById("titleBarIcon");
titleBarIcon.addEventListener("dblclick", () => {
  // window.open("quitModal.html", "quitModal");
  ipcRenderer.send("open-quitModal");
  document.getElementById("mainTitleBar").classList.add("inactive");
});

const minimiseWindow = document.getElementById("minimiseWindow");
minimiseWindow.addEventListener("click", () => {
  remote.BrowserWindow.getFocusedWindow().minimize();
});

const openDevTools = document.getElementById("mainMenuDevTools");
openDevTools.addEventListener("click", () => {
  // ipcRenderer.send("toggleMainWindowDevTools");
  document.getElementById("mainContentSection").openDevTools();
});

const openDebug = document.getElementById("mainMenuDebug");
openDebug.addEventListener("click", () => {
  // window.open("debugModal.html", "debugModal");
  ipcRenderer.send("open-debugModal");
  document.getElementById("mainTitleBar").classList.add("inactive");
});

const openSettings = document.getElementById("mainMenuSettings");
openSettings.addEventListener("click", () => {
  // window.open("settingsModal.html", "settingsModal");
  ipcRenderer.send("open-settingsModal");
  document.getElementById("mainTitleBar").classList.add("inactive");
});

const openHelp = document.getElementById("mainMenuHelp");
openHelp.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/howtouse.html";
});

const openAbout = document.getElementById("mainMenuAbout");
openAbout.addEventListener("click", () => {
  // window.open("aboutModal.html", "aboutModal");
  ipcRenderer.send("open-aboutModal");
  document.getElementById("mainTitleBar").classList.add("inactive");
});

const mainListWelcome = document.getElementById("mainListWelcome");
mainListWelcome.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/welcome.html";
});

const mainListNote = document.getElementById("mainListNote");
mainListNote.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/note.html";
});

const mainListHowToUse = document.getElementById("mainListHowToUse");
mainListHowToUse.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/howtouse.html";
});

const mainIndexA = document.getElementById("mainindexA");
mainIndexA.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/A.html";
});

const mainIndexB = document.getElementById("mainindexB");
mainIndexB.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/B.html";
});

const mainIndexC = document.getElementById("mainindexC");
mainIndexC.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/C.html";
});

const mainIndexD = document.getElementById("mainindexD");
mainIndexD.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/D.html";
});

const mainIndexE = document.getElementById("mainindexE");
mainIndexE.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/E.html";
});

const mainIndexF = document.getElementById("mainindexF");
mainIndexF.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/F.html";
});

const mainIndexG = document.getElementById("mainindexG");
mainIndexG.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/G.html";
});

const mainIndexH = document.getElementById("mainindexH");
mainIndexH.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/H.html";
});

const mainIndexI = document.getElementById("mainindexI");
mainIndexI.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/I.html";
});

const mainIndexJ = document.getElementById("mainindexJ");
mainIndexJ.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/J.html";
});

const mainIndexK = document.getElementById("mainindexK");
mainIndexK.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/K.html";
});

const mainIndexL = document.getElementById("mainindexL");
mainIndexL.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/L.html";
});

const mainIndexM = document.getElementById("mainindexM");
mainIndexM.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/M.html";
});

const mainIndexN = document.getElementById("mainindexN");
mainIndexN.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/N.html";
});

const mainIndexU = document.getElementById("mainindexU");
mainIndexU.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/U.html";
});

const mainIndexV = document.getElementById("mainindexV");
mainIndexV.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/V.html";
});

const mainIndexW = document.getElementById("mainindexW");
mainIndexW.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/W.html";
});

const mainIndexX = document.getElementById("mainindexX");
mainIndexX.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/X.html";
});

const mainIndexY = document.getElementById("mainindexY");
mainIndexY.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/Y.html";
});

const mainIndexZ = document.getElementById("mainindexZ");
mainIndexZ.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/Z.html";
});

const mainIndex0 = document.getElementById("mainindex0");
mainIndex0.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/0.html";
});

const mainIndex1 = document.getElementById("mainindex1");
mainIndex1.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/1.html";
});

const mainIndex2 = document.getElementById("mainindex2");
mainIndex2.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/2.html";
});

const mainIndex3 = document.getElementById("mainindex3");
mainIndex3.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/3.html";
});

const mainIndex4 = document.getElementById("mainindex4");
mainIndex4.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/4.html";
});

const mainIndex5 = document.getElementById("mainindex5");
mainIndex5.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/5.html";
});

const mainIndex6 = document.getElementById("mainindex6");
mainIndex6.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/6.html";
});

const mainIndex7 = document.getElementById("mainindex7");
mainIndex7.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/7.html";
});

const mainIndex8 = document.getElementById("mainindex8");
mainIndex8.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/8.html";
});

const mainIndex9 = document.getElementById("mainindex9");
mainIndex9.addEventListener("click", () => {
  document.getElementById("mainContentSection").src = "./frames/index/Z.html";
});

const mainIndexNonAN = document.getElementById("mainindexNonAN");
mainIndexNonAN.addEventListener("click", () => {
  document.getElementById("mainContentSection").src =
    "./frames/index/Symbol.html";
});

const mainListRandomPage = document.getElementById("mainListRandomPage");
mainListRandomPage.addEventListener("click", () => {
  var mainContent = document.getElementById("mainContentSection");
  mainContent.src = "./frames/populate.html";
  if (
    !remote.getGlobal("isServerReachable") &&
    !remote.getGlobal("ignoreOfflineNags")
  ) {
    mainContent.src = "./frames/crc.html";
  } else {
    getRandomPage();
  }
});

const commitSearchButton = document.getElementById("commitSearch");
commitSearchButton.addEventListener("click", () => {
  var searchTerm = document.getElementById("findBar").value;
  // console.log(searchTerm);
  if (searchTerm !== "") {
    var mainContent = document.getElementById("mainContentSection");
    mainContent.src = "./frames/populate.html";
    if (
      !remote.getGlobal("isServerReachable") &&
      !remote.getGlobal("ignoreOfflineNags")
    ) {
      mainContent.src = "./frames/crc.html";
      // mainContent.openDevTools();
    } else {
      // mainContent.openDevTools();

      getSearchResults(searchTerm);
    }
  }
});

const findBar = document.getElementById("findBar");
findBar.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    var searchTerm = document.getElementById("findBar").value;
    if (searchTerm !== "") {
      var mainContent = document.getElementById("mainContentSection");
      mainContent.src = "./frames/populate.html";
      if (
        !remote.getGlobal("isServerReachable") &&
        !remote.getGlobal("ignoreOfflineNags")
      ) {
        mainContent.src = "./frames/crc.html";
      } else {
        // mainContent.openDevTools();

        getSearchResults(searchTerm);
      }
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
        getArticleCandidates(query, 2)
          .then((randRes) => {
            console.log("Nothing");
            mainContent.send("change-tw1", query);
            mainContent.send(
              "change-tw2",
              "<p>Absolutely nothing related to your search term was found. Well done. We humbly suggest the following topics:</p>".concat(
                randRes.join("")
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
                    console.log(r.query.pages);
                    artKey = Object.keys(r.query.pages)[0];
                    if (
                      Object.keys(r.query.pages[artKey]).includes("pageprops")
                    ) {
                      if (
                        Object.keys(r.query.pages[artKey].pageprops).includes(
                          "disambiguation"
                        )
                      ) {
                        mainContent.send("change-tw1", pageTitle);
                        mainContent.send(
                          "change-tw2",
                          "You are reading this message because the page you are looking for does exist in the print edition of Encyclopaedia Mundi, but the digitization process for this article is not yet complete. For now, plesae try looking for something else."
                        );
                      } else {
                        displayContent(r, mainContent);
                      }
                    } else {
                      displayContent(r, mainContent);
                    }
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

            // console.log("disambiguation");
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

// Get a number of random wikipedia article titles.
async function getRandoms(count) {
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
      // console.log(response);
      for (var i in response.query.random) {
        Object.keys(response.query.random[i]).forEach((k) => {
          if (k === "title") {
            retArr.push("<li>" + response.query.random[i][k] + "</li>");
          }
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return retArr;
}

// Get and generate content from one random Wikipedia article.
async function getRandomPage() {
  await getRandoms(1).then((r) => {
    console.log(r);
    getSearchResults(r[0].slice(4, -5));
  });
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

  console.log(url);

  await fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      retArr = response[1].map((r) => "<li>" + r + "</li>");
    });

  await getRandoms(4).then((r) => {
    retArr = retArr.concat(r);
  });

  return retArr;
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
  getGeneratedAbstract(
    splitArtExtract[0],
    remote.getGlobal("maxAbstractCharLength")
  )
    .then((genCont) => {
      c.send("change-tw5", "");
      c.send("change-typ-speed", remote.getGlobal("acceleratedStreamingSpeed"));
      ipcRenderer.on("tw2-complete-m", () => {
        c.send("change-tw5", "");
        c.send(
          "change-typ-speed",
          remote.getGlobal("acceleratedStreamingSpeed")
        );
        c.send("change-tw3", genCont);
        c.send(
          "change-typ-speed",
          remote.getGlobal("acceleratedStreamingSpeed")
        );
      });
      ipcRenderer.on("tw3-complete-m", () => {
        c.send(
          "change-typ-speed",
          remote.getGlobal("acceleratedStreamingSpeed")
        );
        c.send("change-tw4", splitArtExtract[1]);
        c.send(
          "change-typ-speed",
          remote.getGlobal("acceleratedStreamingSpeed")
        );
        c.send("disable-tw5");
      });
    })
    .catch((err) => {
      c.send("change-tw5", "X");
    });
  c.send("change-tw1", r.query.pages[artKey].title);
  // c.send("change-tw2", r.query.pages[artKey].extract);

  ipcRenderer.on("tw1-complete-m", () => {
    console.log("tw1-complete-received");
    c.send("change-tw5", "Still decompressing...");
    c.send("change-tw2", splitArtExtract[0]);
  });
}

ipcRenderer.on("navigate-to", (e, m) => {
  if (m !== "") {
    var mainContent = document.getElementById("mainContentSection");
    mainContent.src = "./frames/populate.html";
    console.log(m);
    // setTimeout(getSearchResults(m), 1250);
  }
});

ipcRenderer.on("change-findbar", (e, m) => {
  if (m !== "") {
    var findbar = document.getElementById("findBar");
    findbar.value = m;
  }
});

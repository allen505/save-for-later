import * as warehouse from "./warehouse.js";
let prevSession = {};

let setupAccordion = () => {
  // setupAccordion() helps initialize all the Accordions in the  HTML document. Must be called every time
  // a new accordion is made
  let acc = document.getElementsByClassName("accExpand");
  let i;
  // This for-loop is setup so that it runs for all the accordion class nodes found in the HTML document
  for (i = 0; i < acc.length; i++) {
    let parent = acc[i].parentElement.parentElement;

    acc[i].addEventListener("click", function () {
      // Toggle between adding and removing the "active" class,
      // to highlight the button that controls the panel
      this.classList.toggle("active");
      // Toggle between hiding and showing the active panel
      var panel = parent.nextElementSibling;

      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  let accDel = document.getElementsByClassName("accDelete");
  for (i = 0; i < accDel.length; i++) {
    let parent = accDel[i].parentElement.parentElement;
    accDel[i].addEventListener("click", () => {
      let delElement = parent.getAttribute("id");
      warehouse.deleteHandler(delElement).then(() => {
        updater();
      });
    });
  }
};

export function updater() {
  warehouse.updateHandler().then(data => {
    let tabsList = document.getElementById("saved-content");

    tabsList.innerHTML = "";
    if (data != undefined) {
      tabsList.appendChild(data);
      setupAccordion();
    }
  });
}

function listenForClicks() {
  updater();

  document.addEventListener("click", e => {
    function saveIt() {
      var conditions = { currentWindow: true };
      let tabsList = document.getElementById("saved-content");

      warehouse.getCurrentWindowTabs()
        .then(tabs => {
          tabsList.textContent = "";
          warehouse.saveHandler(tabs).then(data => {
            tabsList.appendChild(data);
            setupAccordion();
          });
        });
    }

    function reportError(error) {
      console.error(`An error occured: ${error}`);
    }

    if (e.target.id == "saveBtn") {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(saveIt)
        .catch(reportError);
    } else if (e.target.id == "donateBtn") {
      browser.tabs.create({
        url: "https://allen505.github.io/save-for-later/contribute"
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", listenForClicks);
//listenForClicks()
//.catch(reportExecuteScriptError);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
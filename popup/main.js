import * as warehouse from "./warehouse.js";

let setupAccordion = () => {
	// setupAccordion() helps initialize all the Accordions in the  HTML document. Must be called every time
	// a new accordion is made
	var acc = document.getElementsByClassName("accordion");
	var i;
	// This for-loop is setup so that it runs for all the accordion class nodes found in the HTML document
	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function() {
			// Toggle between adding and removing the "active" class,
			// to highlight the button that controls the panel
			this.classList.toggle("active");

			// Toggle between hiding and showing the active panel
			var panel = this.nextElementSibling;
			if (panel.style.display === "block") {
				panel.style.display = "none";
			} else {
				panel.style.display = "block";
			}
		});
	}
};

function listenForClicks() {
	// The listenForClicks() is called as soon as HTML page is loaded
	setupAccordion();

	// Adding an eventListener so that whenever a click is registered within the pop-up,
	// the respective condition is called using the if statements written at the end
	// of the below function
	document.addEventListener("click", e => {
		function saveIt() {
			// The saveIt() is called whenever a node with the class "save" is clicked
			// saveIt() adds a new Accordion to the pop-up
			var conditions = { currentWindow: true };
			let tabsList = document.getElementById("saved-list");
			let currentTabs = document.createDocumentFragment();
			// conditions is used by the getCurrentWindowTabs() to access tabs only
			// in the current window
			// tabsList is used to access the div in which the Accordion is to be added
			// currentTabs is used to store the Accordion which will be added to the pop-up

			getCurrentWindowTabs().then(tabs => {
				// getCurrentWindowTabs() is defined below and helps access the tabs which
				// are present in the given window

				tabsList.textContent = "";
				// createList() is called to generate the code for Accordion
				currentTabs = warehouse.createList(tabs);
				tabsList.appendChild(currentTabs);
				setupAccordion();
				// currentTabs is updated by the createList() and setupAccordion is called
				// to initialize the newly added Accordion
			});

			function getCurrentWindowTabs() {
				return browser.tabs.query(conditions);
			}
		}

		function reset() {
			console.log("reset is called!!");
			browser.storage.local.clear();
		}

		function reportError(error) {
			console.error(`Could not saveIt: ${error}`);
		}

		if (e.target.classList.contains("save")) {
			browser.tabs
				.query({ active: true, currentWindow: true })
				.then(saveIt)
				.catch(reportError);
		} else if (e.target.classList.contains("reset")) {
			browser.tabs
				.query({ active: true, currentWindow: true })
				.then(reset)
				.catch(reportError);
		}
	});
}

document.addEventListener("DOMContentLoaded", listenForClicks);
//listenForClicks()
//.catch(reportExecuteScriptError);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import * as warehouse from "./warehouse.js";
let prevSession = {};

let setupAccordion = () => {
	// setupAccordion() helps initialize all the Accordions in the  HTML document. Must be called every time
	// a new accordion is made
	let acc = document.getElementsByClassName("accExpand");
	let i;
	// This for-loop is setup so that it runs for all the accordion class nodes found in the HTML document
	for (i = 0; i < acc.length; i++) {
		let parent = acc[i].parentElement;

		acc[i].addEventListener("click", function() {
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
		let parent = accDel[i].parentElement;
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
	// The listenForClicks() is called as soon as HTML page is loaded
	updater();

	// Adding an eventListener so that whenever a click is registered within the pop-up,
	// the respective condition is called using the if statements written at the end
	// of the below function
	document.addEventListener("click", e => {
		function saveIt() {
			// The saveIt() is called whenever a node with the class "save" is clicked
			// saveIt() adds a new Accordion to the pop-up
			var conditions = { currentWindow: true };
			let tabsList = document.getElementById("saved-content");

			// conditions is used by the getCurrentWindowTabs() to access tabs only
			// in the current window
			// tabsList is used to access the div in which the Accordion is to be added
			// currentTabs is used to store the Accordion which will be added to the pop-up

			getCurrentWindowTabs().then(tabs => {
				// getCurrentWindowTabs() is defined below and helps access the tabs which
				// are present in the given window

				tabsList.textContent = "";
				// createList() is called to generate the code for Accordion
				warehouse.saveHandler(tabs).then(data => {
					tabsList.appendChild(data);
					setupAccordion();
				});

				// currentTabs is updated by the createList() and setupAccordion is called
				// to initialize the newly added Accordion
			});

			function getCurrentWindowTabs() {
				return browser.tabs.query(conditions);
			}
		}

		function reset() {
			browser.storage.local.clear();
			document.getElementById("saved-content").innerHTML = "";
		}

		function reportError(error) {
			console.error(`An error occured: ${error}`);
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

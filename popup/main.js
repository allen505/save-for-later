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

				// createList() is called to generate the code for Accordion
				createList(tabs);
				tabsList.appendChild(currentTabs);
				setupAccordion();
				// currentTabs is updated by the createList() and setupAccordion is called
				// to initialize the newly added Accordion
			});

			function createList(tabs) {
				// createList() is used to create the Accordion which will be added to the
				// pop-up. It updates the currentTabs variable to store the newly created
				// Accordion.
				tabsList.textContent = "";

				//Create the accordion button and set the values of the button
				let accButton = document.createElement("button");
				accButton.textContent = Date.now();
				accButton.setAttribute("class", "accordion");
				let panelDiv = document.createElement("div");
				panelDiv.setAttribute("class", "panel");
				let pattern = /^(http|https|file):\/\//;
				// The pattern helps catch only http/https/file links excluding any about/ftp/ws/wss links

				// The for loop is run to go through each tab present in the current window
				for (let tab of tabs) {
					if (tab.url.match(pattern) != null) {
						//Create the li tag into which the link is inserted
						let listItem = document.createElement("li");

						//Create a link for each tab which is saved and set its respective parameters
						let tabLink = document.createElement("a");
						tabLink.textContent = tab.title || tab.url;
						tabLink.setAttribute("href", tab.url);

						listItem.appendChild(tabLink);
						panelDiv.appendChild(listItem);
					}
					
				}
				console.log(accButton);
				currentTabs.appendChild(accButton);
				currentTabs.appendChild(panelDiv);
			}

			function getCurrentWindowTabs() {
				return browser.tabs.query(conditions);
			}
		}

		function reset() {
			console.log("reset is called!!");
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

function reportExecuteScriptError(error) {
	document.querySelector("#popup-content").classList.add("hidden");
	document.querySelector("#error-content").classList.remove("hidden");
	console.error(`Failed to execute save content script: ${error.message}`);
}

document.addEventListener("DOMContentLoaded", listenForClicks);
//listenForClicks()
//.catch(reportExecuteScriptError);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

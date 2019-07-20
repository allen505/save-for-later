// warehouse.js is where all data handling related work happens
// such as creating the Accordion, storing the data to storage, etc

let pattern = /^(http|https|file):\/\//;
// The pattern helps catch only http/https/file links excluding any about/ftp/ws/wss links

export function createList(tabs) {
	// createList() is used to create the Accordion which will be added to the
	// pop-up. It updates the currentTabs variable to store the newly created
	// Accordion.

	// id will be the unique identifier of each element in the stored Array
	var id = Date.now();
	storeIt(tabs, id);
	let currentTabs = document.createDocumentFragment();

	// Create the accordion button and set the values of the button
	let accButton = document.createElement("button");
	accButton.textContent = id;
	accButton.setAttribute("class", "accordion");
	let panelDiv = document.createElement("div");
	panelDiv.setAttribute("class", "panel");

	// The for loop is run to go through each tab present in the current window
	for (let tab of tabs) {
		if (tab.url.match(pattern) != null) {
			// Create the li tag into which the link is inserted
			let listItem = document.createElement("li");

			// Create a link for each tab which is saved and set its respective parameters
			let tabLink = document.createElement("a");
			tabLink.textContent = tab.title || tab.url;
			tabLink.setAttribute("href", tab.url);

			listItem.appendChild(tabLink);
			panelDiv.appendChild(listItem);
		}
	}
	// console.log(accButton);
	currentTabs.appendChild(accButton);
	currentTabs.appendChild(panelDiv);
	return currentTabs;
}

function storeIt(tabs, id) {
	// dataToStore is the object which contains data of the window which is going to be saved
	let dataToStore = {};

	dataToStore.id = id;
	dataToStore.tabs = new Array();
	let count = 0;
	for (let tab of tabs) {
		if (tab.url.match(pattern) != null) {
			let newTab = {};
			newTab.textContent = tab.title || tab.url;
			newTab.url = tab.url;
			newTab.iconUrl = tab.favIconUrl || null;

			dataToStore.tabs.push(newTab);
			count++;
		}
	}
	dataToStore.numOfTabs = count;
	dataToStore.tags = null;

	// storageObject is the object which has the array of objects
	// This is needed as storing an Array of Objects directly gives errors
	let storageObject = {};

	retrieveIt().then(data => {
		// First we retrieve the data which is currently stored in the storage.local
		// and assign it to storageObject
		console.log("Retrieval is successful");
		storageObject = data;
		if (storageObject.data == undefined) {
			// If the Array of Objects is empty,we create it
			storageObject.data = new Array();
		}

		// We now add the object of the current Window to be saved into the Array of Objects
		storageObject.data.push(dataToStore);

		// Now store the updated storageObject into storage.local
		browser.storage.local
			.set(storageObject)
			.then(() => {
				console.log("Storage is successful");
			})
			.catch(error => {
				console.log("Storage error occured: " + error);
			});
	});
}

function retrieveIt() {
	// This function retrieves data from the storage.local and returns a Promise
	return browser.storage.local.get(null);
}

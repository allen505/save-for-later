// warehouse.js is where all data handling related work happens
// such as creating the Accordion, storing the data to storage, etc

let pattern = /^(http|https|file):\/\//;
// The pattern helps catch only http/https/file links excluding any about/ftp/ws/wss links

function createList(objArray) {
	// createList() is used to create the Accordion which will be added to the
	// pop-up. It updates the currentTabs variable to store the newly created
	// Accordion.

	// id will be the unique identifier of each element in the stored Array
	let currentTabs = document.createDocumentFragment();
	for (let c = 0; c < objArray.length; c++) {
		var obj = objArray[c];

		// Create the accordion button and set the values of the button
		let accButton = document.createElement("button");
		accButton.textContent = obj.id;
		accButton.setAttribute("class", "accordion");
		let panelDiv = document.createElement("div");
		panelDiv.setAttribute("class", "panel");

		// The for loop is run to go through each tab present in the current window
		for (let tab of obj.tabs) {
			if (tab.url.match(pattern) != null) {
				// Create the li tag into which the link is inserted
				let listItem = document.createElement("li");

				// Create a link for each tab which is saved and set its respective parameters
				let tabLink = document.createElement("a");
				tabLink.textContent = tab.textContent;
				tabLink.setAttribute("href", tab.url);

				listItem.appendChild(tabLink);
				panelDiv.appendChild(listItem);
			}
		}
		// console.log(accButton);
		currentTabs.appendChild(accButton);
		currentTabs.appendChild(panelDiv);
	}
	return currentTabs;
}

async function storeIt(tabs) {
	// storeIt takes only the required data from what is provided by the browser and
	// stores it into the storage.local

	// dataToStore is the object which contains data of the window which is going to be saved
	let dataToStore = {};

	var id = Date.now();
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

	let data = await retrieveIt();
	// .then(data => {
	// First we retrieve the data which is currently stored in the storage.local
	// and assign it to storageObject

	// console.log("Retrieval is successful");

	storageObject = data;
	if (storageObject.data == undefined) {
		// If the Array of Objects is empty,we create it
		storageObject.data = new Array();
	}

	// We now add the object of the current Window to be saved into the Array of Objects
	storageObject.data.unshift(dataToStore);

	// Now store the updated storageObject into storage.local
	browser.storage.local
		.set(storageObject)
		.then(() => {
			console.log("Storage is successful");
		})
		.catch(error => {
			console.log("Storage error occured: " + error);
		});
	// });
}

function retrieveIt() {
	// This function retrieves data from the storage.local and returns a Promise
	return browser.storage.local.get(null);
}

export async function saveHandler(tabs) {
	// Handles all the function calls related to saving a session
	
	let returnPromise = new Promise((resolve, reject) => {
		console.log("savehandler is running");
		storeIt(tabs)
			.then(() => {
				retrieveIt().then(obj => {
					console.log(obj.data);
					let returnTab = createList(obj.data);
					resolve(returnTab);
				});
			})
			.catch(error => {
				console.log("Error occured while saving: " + error);
				reject(error);
			});
	});
	return await returnPromise;
}

export async function updateHandler() {
	// updateHandler syncs the data in storage.local with data displayed
	// in the popup

	let returnPromise = new Promise((resolve, reject) => {
		retrieveIt()
			.then(obj => {
				if (obj.data != undefined) {
					let returnTab = createList(obj.data);
					resolve(returnTab);
				} else {
					resolve(undefined);
				}
			})
			.catch(error => {
				console.log("Error occured while updating: " + error);
				reject(error);
			});
	});
	return await returnPromise;
}

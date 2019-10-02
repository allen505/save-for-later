// warehouse.js is where all data handling related work happens
// such as creating the Accordion, storing the data to storage, etc

import * as mainjs from "./main.js";

let pattern = /^(http|https|file):\/\//;
// The pattern helps catch only http/https/file links excluding any about/ftp/ws/wss links

class storageObject {
	constructor(id, title, tabs, tags) {
		this.id = id;
		this.title = title;
		this.tabs = tabs;
		this.pinned=false;
		this.tags = tags;
	}
}

function createList(storeObj) {
	// createList() is used to create the Accordion which will be added to the
	// pop-up. It updates the currentTabs variable to store the newly created
	// Accordion.

	// id will be the unique identifier of each element in the stored Array
	let currentTabs = document.createDocumentFragment();
	let idArray = new Array();
	for (let id in storeObj) {
		idArray.unshift(id);
	}

	idArray.forEach(id => {
		if (storeObj.hasOwnProperty(id)) {
			// Create the accordion button and set the values of the button
			let obj = storeObj[id];

			let accDiv = document.createElement("div");
			let accButton = document.createElement("button");
			let expandImg = document.createElement("img");
			let accExpand = document.createElement("button");
			let delImg = document.createElement("img");
			let accDelete = document.createElement("button");

			accButton.textContent = obj.title;
			accButton.setAttribute("class", "btn btn-link accButton");
			accButton.addEventListener("click", () => {
				let windowObj = new Object();
				let urlArray = new Array();
				for (let tab of obj.tabs) {
					urlArray.push(tab.url.toString());
				}
				windowObj.url = urlArray;
				browser.windows.create(windowObj)
				// deleteHandler(obj.id.toString()).then(() => {
				// 	mainjs.updater();
				// });
			});

			expandImg.setAttribute("src", "./../icons/drop_down.png");
			expandImg.setAttribute("class", "icon");

			accExpand.setAttribute("class", "btn btn-link accExpand");
			accExpand.appendChild(expandImg);

			delImg.setAttribute("src", "./../icons/delete.svg");
			delImg.setAttribute("class", "icon");
			
			accDelete.setAttribute("class", "btn btn-link accDelete");
			accDelete.appendChild(delImg);

			accDiv.setAttribute("class", "accDiv");
			accDiv.setAttribute("id", obj.id);

			let panelDiv = document.createElement("div");
			panelDiv.setAttribute("class", "panel");

			accDiv.appendChild(accButton);
			accDiv.appendChild(accExpand);
			accDiv.appendChild(accDelete);

			// The for loop is run to go through each tab present in the current window
			for (let tab of obj.tabs) {
				// Create the li tag into which the link is inserted
				let listItem = document.createElement("li");

				// Create a link for each tab which is saved and set its respective parameters
				let tabLink = document.createElement("button");
				let cutoffLength=30;

				if (tab.textContent.length >= cutoffLength)
					tabLink.textContent =
						tab.textContent.slice(0, cutoffLength) + "...";
				else tabLink.textContent = tab.textContent;
				tabLink.setAttribute("class", "btn btn-link accButton");
				listItem.addEventListener("click", () => {
					browser.tabs.create({
						url:tab.url
					})
				})

				listItem.appendChild(tabLink);
				panelDiv.appendChild(listItem);
			}
			currentTabs.appendChild(accDiv);
			currentTabs.appendChild(panelDiv);
		}
	});
	return currentTabs;
}

async function storeIt(tabs) {
	// storeIt takes only the required data from what is provided by the browser and
	// stores it into the storage.local

	// dataToStore is the object which contains data of the window which is going to be saved

	let time = new Date();
	var id = time.getTime();
	let tabArray = new Array();

	for (let tab of tabs) {
		if (tab.url.match(pattern) != null) {
			let newTab = {};
			newTab.textContent = tab.title || tab.url;
			newTab.url = tab.url;
			newTab.iconUrl = tab.favIconUrl || null;
			tabArray.push(newTab);
		}
	}
	let title =
		time.getDate() +
		"/" +
		(time.getMonth() + 1) +
		" " +
		time.getHours() +
		":" +
		time.getMinutes() +
		" | " +
		tabArray.length +
		" tabs";
	let tags = null;

	var dataToStore = new storageObject(id, title, tabArray, tags);
	var obj = {};
	obj[id] = dataToStore;

	browser.storage.local
		.set(obj)
		.then(() => {})
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
		storeIt(tabs)
			.then(() => {
				retrieveIt().then(obj => {
					let returnTab = createList(obj);
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

	// counter()
	let returnPromise = new Promise((resolve, reject) => {
		retrieveIt()
			.then(obj => {
				if (obj != undefined) {
					let returnTab = createList(obj);
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

export async function deleteHandler(key) {
	let returnPromise = new Promise((resolve, reject) => {
		let returnValue = browser.storage.local.remove(key);
		if (returnValue === undefined) {
			reject("Error occured while deleting");
		} else {
			resolve("Deleted successfully");
		}
	});
	return await returnPromise;
}

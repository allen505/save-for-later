async function counter() {
	// This function retrieves data from the storage.local and returns a Promise
	return browser.storage.local.get(null);
}

async function setBadge() {
	while (1) {
		counter().then(obj => {
			let count = 0;
			for (i in obj) {
				count++;
			}
			if (count == 0) {
				browser.browserAction.setBadgeBackgroundColor({
					color: "#393939"
				});
			} else {
				browser.browserAction.setBadgeBackgroundColor({
					color: "#FF0E46"
				});
			}

			browser.browserAction.setBadgeText({
				text: count.toString()
			});
		});
		await sleep(500);
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

setBadge();

async function counter() {
  // This function retrieves data from the storage.local and returns a Promise
  return chrome.storage.local.get(null);
}

async function setBadge() {
  while (1) {
    counter().then(obj => {
      let numberOfSaves = Object.keys(obj).length;
      if (numberOfSaves == 0) {
        // chrome.action.setBadgeBackgroundColor({
        //   color: "#393939"
        // });
        chrome.action.setBadgeText({
          text: ""
        });
      } else {
        chrome.action.setBadgeBackgroundColor({
          color: "#c5e7ff"
        });
        chrome.action.setBadgeText({
          text: numberOfSaves.toString()
        });
      }   
    });
    await sleep(500);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

setBadge();

<p align="center">
    <img width="350" alt="Logo" src="icons/header.png">
</p>

# Save for Later
   Save for Later is a web extension used to save tabs and windows for later use. This web extension is built using the [Webextension APIs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions). As a result, this extension can be run on Firefox or any Chromium based browser. The extension is available on both [Chrome Web Store ](https://chrome.google.com/webstore/detail/save-for-later/nkphlkgkhmdaecflflapohlkkchmcacc) and [Firefox Add-ons store](https://addons.mozilla.org/en-US/firefox/addon/save-for-later/). 

## Permissions
The extension requires the following permissions:

- **tabs** permission is needed to access the details of the tabs which are open in the current window.
- **storage** permission is needed to store the details of the tabs so that the data persists even after a restart of browser

## Background scripts
There are two background scripts that run to ensure working of the extension.

- *background-script.js* is used to count the number of saves, to display the count in the extension's badge. This script is set to run every 500ms
- [*browser-polyfill.min.js*](https://github.com/mozilla/webextension-polyfill) is necessary to ensure that the above script run runs on a Chromium based browser


## Development setup

Clone this repository to your local machine using

`git clone https://github.com/allen505/save-for-later.git`

### Temporarily install the extension on the browser of your choice by following these instructions:

*The extension's directory is the folder which contains the `manifest.json` file*

For Firefox browser follow [this guide](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

For Chromium based browsers:

1. Open the Extension Management page by navigating to `chrome://extensions`.
   - The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the LOAD UNPACKED button and select the extension's directory.
   
   [Image for Steps 2 and 3](https://developer.chrome.com/static/images/get_started/load_extension.png)
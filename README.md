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

1. You'll need to make changes on your on version of the code. For this you need to fork this repo. Learn more about forking [here](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository)
2. Then you need to clone this forked repository to your local machine. Run the following command on a terminal  
`git clone <YOUR_GITHUB_REPO_URL>.git`
Learn more about cloning [here](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository#cloning-a-repository-using-the-command-line)
3. Next we need to Temporarily install the extension on the browser of your choice. Follow these instructions to do so:

   *Note: The extension's directory is the folder which contains the `manifest.json` file*

- For Firefox browser follow [this guide](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

- For Chrome/Chromium based browsers:  
  1. Open the Extension Management page by navigating to `chrome://extensions`.
     - The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
  2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
  3. Click the LOAD UNPACKED button and select the extension's directory.
     
     [Image for Steps 2 and 3](https://developer.chrome.com/static/images/get_started/load_extension.png)

## Tips for development
- For Firefox (Credits: @emecas)
  - [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) is a useful command line tool when developing extensions. Importantly, it automatically reloads the extension on changes to source files
  - You can inspect an extension just like you would any webpage. To do this:
     1. Open the Add-ons Manager `Ctr+Shift+A`:
     2. Under the gear icon, click on `Debug Add-ons`
     3. Click inspect to inspect any extension
     4. You can use the **Console** to `console.log()` values to debug and analyse running of the extension
     5. Use the *Extension Storage* Under the **Storage** tab to view data stored by the Extension
- For Chrome/Chromium based browsers
  - You can inspect an extension just like you would any webpage. To do this:
    1. Open an extension to Inspect
    2. Right click on the extension's Popup area
    3. Click on Inspect. This open the dev tools for the given extension

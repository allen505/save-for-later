# Save for Later (Firefox)
   This web extension is build using the Webextension APIs and is used to save the tabs in the current window for later use. 

## Permissions
Want to know what each of the permissions required by the extension are for?

 - **tabs** permission is needed to access the details of the tabs which are open in the current window.
 - **storage** permission is needed to store the details of the tabs so that the data persists even after a restart of Firefox


## Contributing

If you are interested in contributing to this repository or if you wish to view the contents of this extension, here are some details:

The file structure:

**Save for later**

├── **icons**

│   ├── delete.png

│   ├── drop_down.png

│   └── main.png

├── LICENSE.txt

├── manifest.json

├── **popup**

│   ├── bootstrap.min.css

│   ├── main.css

│   ├── main.html

│   ├── main.js

│   └── warehouse.js

└── README


 - **icons** folder contains the assets used by the extension
 - **main.css, html, js** are the files which are used to display the content of the popup.
 - **main.js** generally deals with the appearance, and event handling parts of the popup
 - **warehouse.js**, as the name suggests deals with storing and retrieving of data. This is the data which is stored in the browser's local storage to ensure persisting data.

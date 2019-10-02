# Save for Later
   This web extension is build using the Webextension APIs and is used to save the tabs in the current window for later use. 

## Permissions
Want to know what each of the permissions required by the extension are for?

 - **tabs** permission is needed to access the details of the tabs which are open in the current window.
 - **storage** permission is needed to store the details of the tabs so that the data persists even after a restart of Firefox


## Contributing

If you are interested in contributing to this repository or if you wish to view the contents of this extension, here are some details:

The file structure:

**Save for later**

|-- [ 674]  background-script.js

|-- [702K]  Fonts

|   `-- [698K]  liberation-sans

|       |-- [347K]  LiberationSans-Italic.ttf

|       |-- [342K]  LiberationSans-Regular.ttf

|       `-- [4.4K]  SIL Open Font License.txt

|-- [ 57K]  icons

|   |-- [ 448]  delete.svg

|   |-- [ 472]  drop_down.png

|   |-- [3.5K]  header.png

|   |-- [ 38K]  heart.gif

|   |-- [4.7K]  main-128.png

|   |-- [ 734]  main-36.png

|   |-- [ 958]  main-48.png

|   |-- [1.5K]  main-64.png

|   `-- [2.7K]  main-96.png

|-- [ 34K]  LICENSE

|-- [ 632]  manifest.json

|-- [ 69K]  node_modules

|   `-- [ 65K]  webextension-polyfill

|       `-- [ 61K]  dist

|           |-- [9.8K]  browser-polyfill.min.js

|           `-- [ 47K]  browser-polyfill.min.js.map

|-- [168K]  popup

|   |-- [152K]  bootstrap.min.css

|   |-- [1.6K]  main.css

|   |-- [ 891]  main.html

|   |-- [3.8K]  main.js

|   `-- [5.7K]  warehouse.js

`-- [2.3K]  README.md


 - **icons** folder contains the assets used by the extension.
 - **main.css, html, js** are the files which are used to display the content of the popup.
 - **main.js** generally deals with the appearance, and event handling parts of the popup.
 - **warehouse.js**, as the name suggests deals with storing and retrieving of data. This is the data which is stored in the browser's local storage to ensure persisting data.
 - **background-script.js** is used to count the number of saves and display the same in the badge.
 - **Fonts** This folder contains all the fonts required by the extension which is Liberation Sans, a free and open source font.
 - **webextension-polyfill** contains the polyfill provided by Mozilla to enable the extension on Chrome and Chrome based devices.

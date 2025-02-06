# Dontpad List!

This extension allows users to append highlighted text from the current webpage as a list entry, loosely based on the Brazilian ABNT reference for websites, to a [Dontpad](https://dontpad.com) page of their choice.

## Project Structure

- **manifest.json**: Contains metadata about the extension, permissions, and specifies scripts (content script, background service worker, popup).
- **popup.html**: Defines the HTML structure of the popup.
- **popup.js**: Handles the popup button click and communicates with the Dontpad API.
- **content.js**: Injected into web pages; listens for the message from popup.js, extracts the highlighted text, and logs it.
- **background.js**: Background service worker that currently logs when the extension is installed.
- **README.md**: Project documentation.

## Installation

1. Clone or download the repository containing the extension files.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click on "Load unpacked" and select the directory containing the extension files.

## Usage

1. Click on the extension icon in the Chrome toolbar to open the popup.
2. Highlight any text on the current webpage.
3. Click the "Add Highlighted Text" button in the popup.
4. The highlighted text will be logged to the browser console.
5. (Optional) Use functions in `main.js` to update or fetch content from a Dontpad page.

## License

This project is licensed under the MIT License.
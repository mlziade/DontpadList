# Dontpad List!

This extension allows users to append highlighted text from the current webpage as a list entry, loosely based on the Brazilian ABNT reference for websites, to a [Dontpad](https://dontpad.com) page of their choice.

## Examples
![Popup](/assets/docs/example1.png)
![Result](/assets/docs/example2.png)

## Observation and considerations

Unfortunately, the Dontpad API is very restrictive with its rate limiting when you make API calls outside of their own website (which is obviously understandable). So the extension itself is not the most useful one ☹️.

I could probably work around that using an automation library or something, but I suppose its their choice to rate limit the use. I personally love Dontpad (and missed it very much the last time it went out of service), so I'm going to respect their wishes 🤗 and also, not publish it to Chrome Web Store.

But I still had a lot of fun creating my first Chromium extension, and it actually took much less time than I thought it would!

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
2. Type in a valid Dontpad path.
3. Highlight any text on the current webpage.
4. Click the "Add Highlighted Text" button in the popup.
5. The highlighted text will stored in the Dontpad path as a "ABNT" style reference

## License

This project is licensed under the MIT License.
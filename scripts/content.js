function getSelectedText() {
    const selectedText = window.getSelection().toString();
    return selectedText ? selectedText : null;
}

function getCurrentPageUrl() {
    return window.location.href;
}

function getCurrentPageTitle() {
    return document.title;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getHighlightedText") {
        const selected = {
            text: getSelectedText(),
            url: getCurrentPageUrl(),
            title: getCurrentPageTitle(),
        };
        console.log(selected);
        sendResponse({
            ...selected
        });
    }
});
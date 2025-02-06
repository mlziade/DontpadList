function generateNewDontpadEntry(text, title, url) {
    const currentDate = new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).replace(".", "");

    const finalText = text.replace(/\n/g, " ");

    const titleInfo = title ? `${title}. ` : "";
    return `\n\n-"${finalText}". ${titleInfo}\n\t-Disponivel em: ${url}. Acesso em: ${currentDate}.`;
}

/* 
* Function to update the content of a dontpad page
* @param {string} targetUrl - The URL of the dontpad page
* @param {string} text - The text to be written in the dontpad page
*
* @throws {Error} If the URL is invalid
*
* @returns {Promise<any>} The timestamp of the last update of the page
*/
function updateDontpadPage(targetUrl, text) {
    const finalUrl = `http://api.dontpad.com/${targetUrl}`;

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            'text': text,
            'lastModified': Date.now(),
            'force': 'false',
        })
    };

    fetch(finalUrl, fetchOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            const updateTimestamp = response.json();
            return updateTimestamp;
        })
        .then(data => {
            console.log(data);
            resolve(data);
        })
        .catch(error => {
            console.error(error);
            reject(error);
        });
}

/* 
* Function to get the content of a Dontpad page
* @param {string} targetUrl - The URL of the Dontpad page
*
* @returns {Promise<string>} The content of the Dontpad page
*/
function getDontpadPageContent(targetUrl) {
    return new Promise((resolve, reject) => {
        const finalUrl = `http://api.dontpad.com/${targetUrl}.body.json?lastModified=0`;
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        fetch(finalUrl, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error while fetching content of ${targetUrl} ` + response.status);
                }
                return response.json();
            })
            .then(jsonData => {
                const body = jsonData.body;
                console.log(body);
                resolve(body);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('addTextToList');
    const input = document.getElementById('dontpadPath');
    const status = document.getElementById('status');

    // Load Dontpad path, first from sync, then fallback to local
    chrome.storage.sync.get("dontpadPath", function (result) {
        // If found in sync, use it
        if (result.dontpadPath) {
            input.value = result.dontpadPath;
        } else {
            // If not found in sync, try local storage
            const localPath = localStorage.getItem("dontpadPath");
            if (localPath) {
                input.value = localPath;
            }
        }
    });

    // Save Dontpad path, first to sync, then to local
    input.addEventListener('input', function () {
        // Save to sync
        chrome.storage.sync.set({ dontpadPath: input.value }, function () {
            // Also save to local storage as a fallback
            localStorage.setItem("dontpadPath", input.value);
        });
    });

    // Add selected text to Dontpad when button is clicked
    button.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // Send message to content script to get the selected text
            const response = chrome.tabs.sendMessage(tabs[0].id, { action: 'getHighlightedText' });
            response.then((res) => {
                if (res.text == null) {
                    alert("Please select some text on the page first!");
                } else {
                    const dontpadPath = input.value;

                    // Extract the selected text, URL, and title from the response
                    const text = res.text;
                    const url = res.url;
                    const title = res.title;

                    // Get current content of the dontpad page, append the selected text, and update the page
                    getDontpadPageContent(dontpadPath)
                        .then((content) => {
                            const newEntry = generateNewDontpadEntry(text, title, url);
                            const updatedContent = content + newEntry;
                            return updateDontpadPage(dontpadPath, updatedContent);
                        })
                        .then(() => {
                            // Show success message to user
                            status.style.color = "green";
                            status.textContent = "Text added to Dontpad!";
                            status.removeAttribute("hidden");
                        })
                        .catch((error) => {
                            // Show error message to user
                            status.style.color = "red";
                            status.textContent = "Error updating Dontpad page!";
                            status.removeAttribute("hidden");
                            console.error("Error updating Dontpad page:", error);
                        });
                }
            })
        });
    });
})
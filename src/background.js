function postData(url, data) {
    chrome.tabs.create(
        { url: chrome.runtime.getURL("src/post.html") },
        tab => {
            let handler = (tabId, changeInfo) => {
                if(tabId === tab.id && changeInfo.status === "complete"){
                    chrome.tabs.onUpdated.removeListener(handler);
                    chrome.tabs.sendMessage(tabId, {url: url, data: data})
                }
            }

            // Call handler once the tab loads
            chrome.tabs.onUpdated.addListener(handler);

            // In case the tab loaded before we could register the listener
            chrome.tabs.sendMessage(tab.id, {url: url, data: data});
        });
}

chrome.contextMenus.create({
    id: "saucenao",
    contexts: ["image"],
    title: "Search image on SauceNAO"
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    let imageUrl = info.srcUrl;
    postData("https://saucenao.com/search.php", {"url": imageUrl});
});
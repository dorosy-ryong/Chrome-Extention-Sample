chrome.runtime.sendMessage({
    action: "getPageSource",
    source: document.documentElement.innerHTML
});
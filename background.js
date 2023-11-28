let pageSource = '';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    console.log(request.action);
    if (request.action === "getPageSource") {
        console.log(request)
        pageSource = request.source; // 여기서 처리를 추가할 수 있습니다.
    }
});

// 팝업에서 요청할 때 페이지 소스를 보냅니다.
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if (msg.action === "fetchPageSource") {
            port.postMessage({ source: pageSource });
        }
    });
});
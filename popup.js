document.addEventListener('DOMContentLoaded', function() {
    var port = chrome.runtime.connect();
    port.postMessage({ action: "fetchPageSource" });
    document.getElementById('source').textContent = port.postMessage.action
    port.onMessage.addListener(function(msg) {
      console.log(msg)
      if (msg.source) {
        document.getElementById('source').textContent = "ABC" + msg.source;
      }
    });
  });
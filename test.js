function snippet_api(url, question, html) {
    fetch('http://agpuv9801.bai.nfra.io:9008/snippet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url: url,
            question: question,
            html: html,
        }),
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
        return response.json();
    })
    .then(data => {
        console.log(data); // 응답 데이터 처리
        document.getElementById('url').textContent = url
        document.getElementById('title').textContent = data['title']
        document.getElementById('snippet').textContent = data['results'][0]['contents']
        document.getElementById('relevance').textContent = data['relevance']
        //return data
    })
    .catch(error => {
        //console.error('There has been a problem with your fetch operation:', error);
    });
} 

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var currentTab = tabs[0];
      if (currentTab) {
        document.getElementById('url').textContent = currentTab.url; // URL을 표시합니다.
        //snippet_api(currentTab.url, "", "");
        //document.getElementById('url').textContent = currentTab.url;
        //document.getElementById('url').textContent = snippet_api(currentTab.url)['results'][0]['content']; // URL을 표시합니다.
      }
    });
  });
  
document.getElementById('queryButton').addEventListener('click', function() {
    url = document.getElementById('url').textContent
    question = document.getElementsByClassName('query')[0].value;
    console.log(question)
    snippet_api(url, question, "");
});

document.getElementById('query').addEventListener('keydown', function(event) {
    url = document.getElementById('url').textContent
    question = document.getElementsByClassName('query')[0].value;
    if (event.key === 'Enter') {
        snippet_api(url, question, "");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    url = ""
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0];
        if (currentTab) {
            document.getElementById('url').textContent = currentTab.url; // URL을 표시합니다.
            url = currentTab.url;
            //snippet_api(currentTab.url, "", "");
            //document.getElementById('url').textContent = currentTab.url;
            //document.getElementById('url').textContent = snippet_api(currentTab.url)['results'][0]['content']; // URL을 표시합니다.
        }
    });

    var port = chrome.runtime.connect();
    port.postMessage({ action: "fetchPageSource" });
    port.onMessage.addListener(function(msg) {
      if (msg.source) {
        snippet_api(url, "", msg.source);
      }
    });
});
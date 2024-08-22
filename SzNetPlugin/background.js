console.log("Background script loaded");

chrome.webNavigation.onCompleted.addListener(function(details) {
    console.log("Navigated to a page:", details.url);
    
    chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        func: () => {
            console.log("Injected script running");
            console.log("onLine? ", navigator.onLine);
            if (!navigator.onLine) {
                console.log("Redirecting to login page...");
                window.location.href = 'https://drcom.szu.edu.cn/a70.htm';
            }
        }
    }, () => {
        if (chrome.runtime.lastError) {
            console.error("Script injection error:", chrome.runtime.lastError.message);
        } else {
            console.log("Script injected successfully.");
        }
    });
}, {url: [{urlMatches: '.*'}]});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // 确保页面加载完成
    if (changeInfo.status === 'complete' && tab.url) {
        console.log("Page loaded:", tab.url);
        
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: () => {
                console.log("Injected script running");
                // 在此处添加你想在页面加载后执行的逻辑
                if (!navigator.onLine) {
                    console.log("Redirecting to login page...");
                    window.location.href = 'https://drcom.szu.edu.cn/a70.htm';
                }
            }
        }, () => {
            if (chrome.runtime.lastError) {
                console.error("Script injection error:", chrome.runtime.lastError.message);
            } else {
                console.log("Script injected successfully.");
            }
        });
    }
});

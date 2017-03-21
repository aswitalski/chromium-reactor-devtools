chrome.extension.onConnect.addListener(connection => {

  console.log('Connected:', connection.name);

  var extensionListener = (message, sender, sendResponse) => {
    if (message.tabId) {
      switch (message.action) {
        case 'code':
          return chrome.tabs.executeScript(message.tabId, {
            code: message.content
          });
        case 'script':
          return chrome.tabs.executeScript(message.tabId, {
            file: message.content
          });
        case 'inspect':
          return chrome.tabs.executeScript(message.tabId, {
            file: 'devtools-content-script.js'
          });
        default:
          return chrome.tabs.sendMessage(message.tabId, message, sendResponse);
      }
    } else {
      connection.postMessage(message);
    }
    sendResponse(message);
  }

  chrome.extension.onMessage.addListener(extensionListener);

  connection.onDisconnect.addListener(connection => {
    chrome.extension.onMessage.removeListener(extensionListener);
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('chrome.runtime.onMessage', request);
  return true;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_CURRENT_TAB_URL') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTabUrl = tabs[0].url;
      chrome.storage.sync.set({ currentTab: currentTabUrl }, () => {
        sendResponse({ url: currentTabUrl });
      });
    });
    // Returning true indicates you want to send a response asynchronously
    return true;
  }
});
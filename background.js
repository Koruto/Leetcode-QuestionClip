let activeTabId = 0;
let activeTabProblemName = '';

function setIconAndTitle(tabId, iconPath, title) {
  browser.browserAction.setIcon({
    path: iconPath,
    tabId: tabId,
  });
  browser.browserAction.setTitle({
    title: title,
    tabId: tabId,
  });
}

function resetIcon(time = 800) {
  setTimeout(() => {
    setCopyIcon(activeTabId, activeTabProblemName);
  }, time);
}

function setLoadingIcon() {
  setIconAndTitle(activeTabId, './icons/loading.png', 'Loading...');
}

function setSuccessIcon() {
  setIconAndTitle(
    activeTabId,
    './icons/success.png',
    'Question copied successfully!'
  );
  resetIcon();
}

function setErrorIcon() {
  setIconAndTitle(
    activeTabId,
    './icons/error.png',
    'Failed to copy the question!'
  );
  resetIcon(2000);
}

function setCopyIcon(tabId, title) {
  setIconAndTitle(
    tabId,
    './icons/copy.png',
    title ? `Copy: [${title}]` : 'Copy it!'
  );
}

function setDisabledIcon(tabId) {
  setIconAndTitle(
    tabId,
    './icons/forbidden.png',
    'Cannot copy!\nClick on a LeetCode problem description to enable copying.'
  );
}

function handleBrowserAction(tabId, tab) {
  const leetCodeProblemPattern = /leetcode\.com\/problems\/.*\/description\//;
  if (leetCodeProblemPattern.test(tab.url)) {
    browser.browserAction.enable(tabId);
    const tabProblemName = tab.title.replace(' - LeetCode', '');
    activeTabProblemName = tabProblemName;
    setCopyIcon(tabId, tabProblemName);
  } else {
    browser.browserAction.disable(tabId);
    setDisabledIcon(tabId);
  }
}

// Listen for tab updates
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  handleBrowserAction(tabId, tab);
});

// Listen for tab switching
browser.tabs.onActivated.addListener((activeInfo) => {
  browser.tabs.get(activeInfo.tabId, (tab) => {
    handleBrowserAction(activeInfo.tabId, tab);
  });
});

// Listen for response from content scripts
browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'copyToClipboardResponse') {
    if (message.success) {
      setSuccessIcon();
    } else {
      setErrorIcon();
      console.error('Failed to copy question to clipboard:', message.error);
    }
  }
});

// Trigger the copy action from the browser action click
browser.browserAction.onClicked.addListener((tab) => {
  activeTabId = tab.id;

  // Set loading icon
  setLoadingIcon();

  // Inject a script to wait for DOMContentLoaded
  browser.tabs
    .executeScript(tab.id, {
      code: `
      new Promise((resolve) => {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
          resolve(true);
        } else {
          document.addEventListener('DOMContentLoaded', () => resolve(true), { once: true });
        }
      });
    `,
    })
    .then((result) => {
      if (result[0] === true) {
        // Inject and execute the content script
        return browser.tabs.executeScript(tab.id, { file: 'content.js' });
      } else {
        throw new Error('DOM did not load properly.');
      }
    })
    .then((results) => {
      const result = results[0];
      if (result && result.success) {
        setSuccessIcon();
      } else {
        setErrorIcon();
        console.error('Failed to copy question to clipboard:', result.error);
      }
    })
    .catch((error) => {
      console.error('Error executing content script:', error);
      setErrorIcon();
    });
});

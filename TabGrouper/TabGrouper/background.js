chrome.action.onClicked.addListener(function (tab) {
    groupLeftTabs();
});

function groupLeftTabs() {
    performActionOnCurrentTab(function (activeTab) {
        if (activeTab) {
            chrome.tabs.query({currentWindow: true}, function (tabs) {
                const tabsToLeft = tabs.filter(tab => !tab.pinned && tab.index < activeTab.index);
                if (tabsToLeft.length > 0) {
                    chrome.tabs.group({tabIds: tabsToLeft.map(tab => tab.id)}, (groupId) => {
                        // Collapse the group
                        chrome.tabGroups.update(groupId, { collapsed: true });
                    });
                }
            });
        }
    });
}

function performActionOnCurrentTab(tabCallback) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        tabCallback(tabs[0]);
    });
}

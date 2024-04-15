chrome.action.onClicked.addListener(function (tab) {
    groupLeftTabs();
});

function groupLeftTabs() {
    performActionOnCurrentTab(function (activeTab) {
        if (activeTab) {
            chrome.tabs.query({currentWindow: true}, function (tabs) {
                //Checks for pinned and left conditionals
                const tabsToLeft = tabs.filter(tab => !tab.pinned && tab.groupId === -1 && tab.index < activeTab.index);
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

//Encapsulating the logic for fetching the active tab into a separate function, handles these asynchronous operations neatly, abstracts away promises and whatnot
function performActionOnCurrentTab(tabCallback) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        tabCallback(tabs[0]);
    });
}

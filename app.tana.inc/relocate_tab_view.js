// ==UserScript==
// @name         Relocate Tab View Bar in top dock
// @namespace    https://github.com/jamezpolley
// @version      0.2
// @description  If the top dock contains a tab-view panel, move the tab bar to top of window
// @author       jp@jamezpolley.com
// @match        https://app.tana.inc/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tana.inc
// @grant        none
// ==/UserScript==
'use strict';
let callback = (function() {
    'use strict';
    console.log("ONE");
    toolbarObserver.disconnect();
    var nav = document.querySelector("nav[class^='TabsView-module_tabsNav']");
    var panelToolbar = document.querySelector("div[data-dock='top'] >div >div> #panelToolbarId");
    var panelButtonRow = document.querySelector("div[data-dock='top'] >div >div> #panelToolbarId > .panelButtonRow");
    panelToolbar.insertBefore(nav, panelButtonRow);
    toolbarObserver.observe(panelToolbar, { childList: true });
});

let activateCallback = (function() {
    'use strict';
    console.log("TWO");
    if (document.querySelector('div[data-dock="top"] >div >div> #panelToolbarId')) {
        let toolBar = document.querySelector('div[data-dock="top"] >div >div> #panelToolbarId');
        toolbarObserver.observe(toolBar, { childList: true });
    } else {
        toolbarObserver.disconnect();
    }
});

let toolbarObserver = new MutationObserver(callback);
let observer = new MutationObserver(activateCallback);

// Call the observe() method to start observing the DOM changes
let targetNode = document.querySelector('div[data-role="layout-and-docks"]');
let config = { childList: true, subtree: true };
observer.observe(targetNode, config);
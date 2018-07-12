/* IE11 Polyfill
 * See: https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
 */
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

/**
 * block-navList
 */
function NavList(navList) {
  this.navList = navList;
  var inlineLists = navList.querySelectorAll(".bit-dropList");
  if (inlineLists.length !== 0) {
    inlineLists.forEach(function(inlineList) {
      if (inlineList.hasChildNodes()) {
        inlineList.parentNode.firstChild.classList.add("block-navList--sublistHeading");
      }
    });
  }

  var list = navList.querySelector('.block-navList--list');
  var expand = navList.querySelector('.block-navList--expand');

  if (expand) {
    expand.onclick = function() {
      list.classList.toggle('nav-show');
    }
  }
}

//Mount all nav lists
let navLists = document.querySelectorAll('.block-navList');
if (navLists.length > 0) {
  navLists.forEach((navList) => {
    new NavList(navList);
  });
}

/**
 * smart-modal
 */
function Dialog(navDialogEl) {
  this.modal = navDialogEl;
  var focusableEls = this.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
  this.focusableEls = Array.prototype.slice.call(focusableEls);

  this.firstFocusableEl = focusableEls[0];
  this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
}

Dialog.prototype.open = function () {
  var Dialog = this;
  Dialog.modal.removeAttribute('aria-hidden');
  Dialog.modal.removeAttribute('style');

  Dialog.focusedElBeforeOpen = document.activeElement;

  Dialog.modal.addEventListener('keydown', function (e) {
    Dialog._handleKeyDown(e);
  });

  Dialog.firstFocusableEl.focus();
};

Dialog.prototype.close = function() {
  this.modal.setAttribute('aria-hidden', true);
  this.modal.setAttribute('style', 'display: none');

  if(this.focusedElBeforeOpen) {
    this.focusedElBeforeOpen.focus();
  }
};

Dialog.prototype._handleKeyDown = function(e) {
  var Dialog = this;
  var KEY_TAB = 9;
  var KEY_ESC = 27;

  function handleBackwardTab() {
    if(document.activeElement === Dialog.firstFocusableEl) {
      e.preventDefault();
      Dialog.lastFocusableEl.focus();
    }
  }

  function handleForwardTab() {
    if( document.activeElement === Dialog.lastFocusableEl ) {
      e.preventDefault();
      Dialog.firstFocusableEl.focus();
    }
  }

  switch(e.keyCode) {
    case KEY_TAB:
      if (Dialog.focusableEls.length === 1) {
        e.preventDefault();
        break;
      }
      if( e.shiftKey ) {
        handleBackwardTab();
      } else {
        handleForwardTab();
      }
      break;

    case KEY_ESC:
      Dialog.close();
      break;
    default:
      break;
  }
};

Dialog.prototype.addEventListeners = function(openDialogSel, closeDialogSel) {
  var Dialog = this;

  var openDialogEls = document.querySelectorAll(openDialogSel);
  for(var i = 0; i < openDialogEls.length; i++) {
    openDialogEls[i].addEventListener('click', function() {
      Dialog.open();
    });
  }

  var closeDialogEls = document.querySelectorAll(closeDialogSel);
  for (var i = 0; i < closeDialogEls.length; i++) {
    closeDialogEls[i].addEventListener('click', function() {
      Dialog.close();
    });
  }
};

function openModal() {
  var navDialogEl = document.querySelector('.smart-modal');

  if (navDialogEl) {
    var modal = new Dialog(navDialogEl);
    modal.addEventListeners('.open-dialog', '.smart-modal--close');
    modal.open();
  }
}

/**
 * samrt-nav
 */

function Clock(outputElement) {
  var outputArea = outputElement;
  if (outputArea) {
    this.outputEl = outputArea;
    this.startClock();
  }
}

Clock.prototype.startClock = function() {
  this.currentDateTime = this.getTime();
  this.outputEl.textContent = this.currentDateTime;
  setTimeout(this.startClock.bind(this), 1000);
};

Clock.prototype.formatTime = function(value) {
  return (value < 10 ? '0' : '') + value;
};

Clock.prototype.getTime = function() {
  var currentTime = new Date();
  var year = currentTime.getFullYear().toString().slice(-2);
  var day = this.formatTime(currentTime.getDate());
  var month = this.formatTime(currentTime.getMonth() + 1);
  var hours = this.formatTime(currentTime.getHours());
  var minutes = this.formatTime(currentTime.getMinutes());
  var seconds = this.formatTime(currentTime.getSeconds());

  //format hours to reflect 12hr time
  if (hours > 12) {
    hours = this.formatTime(hours - 12);
  } else if (hours == 0) {
    hours = this.formatTime(12);
  }

  return month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
};

//mount all clocks
let clocks = document.querySelectorAll('.smart-nav--clock');
if (clocks.length > 0) {
  clocks.forEach((clock) => new Clock(clock));
}

/**
 * smart-search
 */

function SmartSearch(smartSearch) {
  this.smartSearch = smartSearch;

  if (this.smartSearch) {
    window.addEventListener('resize', this.resize.bind(this));
    this.searchBtn = this.smartSearch.querySelector('[class*=bit-icon-search]');
    this.exitBtn = this.smartSearch.querySelector('[class*=bit-icon-exit]');
    this.fieldContainer = this.smartSearch.querySelector('.smart-search--fieldContainer');
    this.isHidden = this.fieldContainer.classList.contains('is-hidden');
    this.initButtons();
  }
}

SmartSearch.prototype.initButtons = function() {
  this.searchBtn.onclick = this.toggle.bind(this);
  this.exitBtn.onclick = this.toggle.bind(this);

  //hide by default unless explicitly specified
  if (this.isHidden) {
    this.exitBtn.style.display = 'none';
    this.toggleDisabled(true);
  } else {
    this.searchBtn.style.display = 'none';
    this.resize();
  }
};

SmartSearch.prototype.resize = function() {
  if (!this.isHidden) {
    let search = this.smartSearch.querySelector('.smart-search--toggleContainer');
    let fieldContainer = this.fieldContainer;

    //do not add search height if screen is less than breakpoint
    let searchHeight = search.offsetHeight;

    fieldContainer.style.minHeight = searchHeight + 'px';
  }
};

SmartSearch.prototype.toggle = function() {
  if (this.isHidden) {
    this.isHidden = false;
    this.exitBtn.style.display = 'block';
    this.searchBtn.style.display = 'none';

    this.toggleDisabled(false);

    this.resize();
  } else {
    this.isHidden = true;
    this.smartSearch.querySelector('.smart-search--fieldContainer').style.minHeight = 0;
    this.exitBtn.style.display = 'none';
    this.searchBtn.style.display = 'block';
    this.toggleDisabled(true);
  }

  //this must toggle at the end, to ensure a smooth transition
  this.fieldContainer.classList.toggle('is-hidden');
};

SmartSearch.prototype.toggleDisabled = function(isDisabled) {
  let elsToDisable = this.fieldContainer.querySelectorAll('input, button');
  elsToDisable.forEach(function(el) {
    el.disabled = isDisabled;
  })
};

let smartSearches = document.querySelectorAll('.smart-search');
if (smartSearches.length > 0) {
  smartSearches.forEach((smartSearch) => new SmartSearch(smartSearch));
}

/**
 * smart-table
 */
function SmartTable(smartTable) {
  this.smartTable = smartTable;
  let tableExpandBtns = this.smartTable.querySelectorAll('.smart-table--expand > .bit-btn-expand');
  let self = this;
  tableExpandBtns.forEach(function(btn) {
    btn.onclick = function() {
      let row = self.findAncestor(btn, 'smart-table--row');
      row.classList.toggle('record-is-expanded');
    };
  });
}

SmartTable.prototype.findAncestor = function (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
};

//mount all smart-tables
let smartTables = document.querySelectorAll('.smart-table');
if (smartTables.length > 0) {
  smartTables.forEach((smartTable) => new SmartTable(smartTable));
}

/**
 * smart-tabs
 */

function SmartTabs(tabs) {
  this.tabs = tabs;

  let contentItems = this.findElements('.smart-tabs--content > .smart-tabs--item');
  if (contentItems.length > 0) {
    //hide all elements by default
    let defaultElements = this.findElements('.smart-tabs--default');
    defaultElements.forEach(function(el) {
      el.style.display = 'none';
    });

    //add click listeners
    let tabs = this.findElements('.smart-tabs--tab');
    tabs.forEach(function(tab) {
      tab.onclick = this.switchTab.bind(this);
    }, this);
  }
}

SmartTabs.prototype.switchTab = function(e) {
  let currentTab = e.target;

  if (currentTab.classList.contains('smart-tabs--activeTab')) {
    //don't switch tabs if the current tab is already active
    return;
  }

  //deactivate previously active tab
  this.deactivateItems('smart-tabs--activeTab');

  //activate current tab
  currentTab.classList.add('smart-tabs--activeTab');

  //look up index of current tab
  let tabList = [...currentTab.parentNode.children];
  let index = tabList.indexOf(currentTab);

  //deactivate previously active actions
  this.deactivateItems('smart-tabs--activeAction');

  //find action at the same index as the current tab and activate it
  let actionList = [...this.findElements('.smart-tabs--nav > .smart-tabs--action')];
  actionList[index].classList.add('smart-tabs--activeAction');

  //deactivate previously active item
  this.deactivateItems('smart-tabs--activeItem');

  //find item at the same index as the current tab and activate it
  let contentNodes = this.findElements('.smart-tabs--content > .smart-tabs--item');
  let contentList = [...contentNodes];
  contentList[index].classList.add('smart-tabs--activeItem');
};

SmartTabs.prototype.deactivateItems = function(className) {
  let currentItems = this.findElements(`.${className}`);
  currentItems.forEach(this.deactivateItem(className));
};

SmartTabs.prototype.deactivateItem = function(className) {
  return (item) => {
    item.classList.remove(className);
  }
};

SmartTabs.prototype.findElements = function(selector) {
  return this.tabs.querySelectorAll(selector);
};

let smartTabElements = document.querySelectorAll('.smart-tabs');
if (smartTabElements.length > 0) {
  smartTabElements.forEach(function(smartTab) {
    new SmartTabs(smartTab);
  });
}
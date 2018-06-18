/**
 * block-navList
 */
let inlineLists = document.querySelectorAll(".bit-dropList");
if (inlineLists.length !== 0) {
  for (let inlineList of inlineLists) {
    if (inlineList.hasChildNodes()) {
      inlineList.parentNode.firstChild.classList.add("block-navList--sublistHeading");
    }
  }
}

let list = document.querySelector('.block-navList--list');
let expand = document.querySelector('.block-navList--expand');

if (expand) {
  expand.onclick = function() {
    list.classList.toggle('nav-show');
  }
}

/**
 * smart-modal
 */
function Dialog(navDialogEl) {
  this.modal = navDialogEl;
  let focusableEls = this.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
  this.focusableEls = Array.prototype.slice.call(focusableEls);

  this.firstFocusableEl = focusableEls[0];
  this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
}

Dialog.prototype.open = function () {
  let Dialog = this;
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
  let Dialog = this;
  let KEY_TAB = 9;
  let KEY_ESC = 27;

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
  let Dialog = this;

  let openDialogEls = document.querySelectorAll(openDialogSel);
  for(let i = 0; i < openDialogEls.length; i++) {
    openDialogEls[i].addEventListener('click', function() {
      Dialog.open();
    });
  }

  let closeDialogEls = document.querySelectorAll(closeDialogSel);
  for (let i = 0; i < closeDialogEls.length; i++) {
    closeDialogEls[i].addEventListener('click', function() {
      Dialog.close();
    });
  }
};

function openModal() {
  let navDialogEl = document.querySelector('.smart-modal');

  if (navDialogEl) {
    let modal = new Dialog(navDialogEl);
    modal.addEventListeners('.open-dialog', '.smart-modal--close');
    modal.open();
  }
}

/**
 * samrt-nav
 */

function Clock(user, outputSelector) {
  this.user = user;
  let outputArea = document.querySelector(outputSelector);
  if (outputArea) {
    this.outputEl = outputArea;
    this.startClock();
  }
}

Clock.prototype.startClock = function() {
  this.currentDateTime = this.getTime();
  this.outputEl.innerHTML = this.user + ' ' + this.currentDateTime;
  setTimeout(this.startClock.bind(this), 1000);
};

Clock.prototype.formatTime = function(value) {
  return (value < 10 ? '0' : '') + value;
};

Clock.prototype.getTime = function() {
  let currentTime = new Date();
  let year = currentTime.getFullYear().toString().slice(-2);
  let day = this.formatTime(currentTime.getDate());
  let month = this.formatTime(currentTime.getMonth() + 1);
  let hours = this.formatTime(currentTime.getHours());
  let minutes = this.formatTime(currentTime.getMinutes());
  let seconds = this.formatTime(currentTime.getSeconds());

  //format hours to reflect 12hr time
  if (hours > 12) {
    hours = this.formatTime(hours - 12);
  } else if (hours == 0) {
    hours = this.formatTime(12);
  }

  return month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
};

let user = 'JMST225';
new Clock(user, '.smart-nav--userTime');

/**
 * smart-search
 */

function SmartSearch() {
  this.smartSearch = document.querySelector('.smart-search');
  this.isHidden = true;

  if (this.smartSearch) {
    window.addEventListener('resize', this.resize.bind(this));
    this.searchBtn = this.smartSearch.querySelector('.smart-search--btnSearch');
    this.exitBtn = this.smartSearch.querySelector('.smart-search--btnExit');
    this.fieldContainer = this.smartSearch.querySelector('.smart-search--fieldContainer');
    this.initButtons();
  }
}

SmartSearch.prototype.initButtons = function() {
  this.searchBtn.onclick = this.toggle.bind(this);
  this.exitBtn.onclick = this.toggle.bind(this);

  //hide by default
  this.exitBtn.style.display = 'none';
};

SmartSearch.prototype.resize = function() {
  if (!this.isHidden) {
    let heading = this.smartSearch.querySelector('.smart-search--heading');
    let search = this.fieldContainer;
    let titleSegment = heading.querySelector('.smart-search--headingSegment');
    let documentWidth = document.body.clientWidth + 15;

    //do not add search height if screen is less than breakpoint
    let searchHeight = documentWidth < 1024 ? search.offsetHeight + 30 : 0;
    let segmentHeight = documentWidth < 1024 ? titleSegment.offsetHeight : 0;

    heading.style.minHeight = searchHeight + segmentHeight + 'px';
  }
};

SmartSearch.prototype.toggle = function() {
  this.fieldContainer.classList.toggle('is-hidden');
  if (this.isHidden) {
    this.isHidden = false;
    this.exitBtn.style.display = 'block';
    this.searchBtn.style.display = 'none';
    this.resize();
  } else {
    this.isHidden = true;
    let self = this;
    setTimeout(function () {
      self.smartSearch.querySelector('.smart-search--heading').style.minHeight = 0;
    }, 400);
    this.exitBtn.style.display = 'none';
    this.searchBtn.style.display = 'block';
  }
};

new SmartSearch();
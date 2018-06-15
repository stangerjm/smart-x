// /**
//  * block-navList
//  */
// let inlineLists = document.querySelectorAll(".bit-dropList");
// if (inlineLists.length !== 0) {
//   for (let inlineList of inlineLists) {
//     if (inlineList.hasChildNodes()) {
//       inlineList.parentNode.firstChild.classList.add("block-navList--sublistHeading");
//     }
//   }
// }
//
// var list = document.querySelector('.block-navList--list');
// let expand = document.querySelector('.block-navList--expand');
//
// if (expand) {
//   expand.onclick = function() {
//     list.classList.toggle('nav-show');
//   }
// }
//
// /**
//  * smart-modal
//  */
// function Dialog(navDialogEl) {
//   this.modal = navDialogEl;
//   let focusableEls = document.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
//   this.focusableEls = Array.prototype.slice.call(focusableEls);
//
//   this.firstFocusableEl = focusableEls[0];
//   this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
// }
//
// Dialog.prototype.open = function () {
//   this.modal.removeAttribute('aria-hidden');
//   this.modal.removeAttribute('style');
//
//   this.focusedElBeforeOpen = document.activeElement;
//
//   this.modal.addEventListener('keydown', function(e) {
//     this._handleKeyDown(e);
//   });
//
//   this.firstFocusableEl.focus();
// };
//
// Dialog.prototype.close = function() {
//   this.modal.setAttribute('aria-hidden', true);
//   this.modal.setAttribute('style', 'display: none');
//
//   if(this.focusedElBeforeOpen) {
//     this.focusedElBeforeOpen.focus();
//   }
// };
//
// Dialog.prototype._handleKeyDown = function(e) {
//   let KEY_TAB = 9;
//   let KEY_ESC = 27;
//
//   function handleBackwardTab() {
//     if(document.activeElement === this.firstFocusableEl) {
//       e.preventDefault();
//       this.lastFocusableEl.focus();
//     }
//   }
//
//   function handleForwardTab() {
//     if( document.activeElement === this.lastFocusableEl ) {
//       e.preventDefault();
//       this.firstFocusableEl.focus();
//     }
//   }
//
//   switch(e.keyCode) {
//     case KEY_TAB:
//       if (this.focusableEls.length === 1) {
//         e.preventDefault();
//         break;
//       }
//       if( e.shiftKey ) {
//         handleBackwardTab();
//       } else {
//         handleForwardTab();
//       }
//       break;
//
//     case KEY_ESC:
//       this.close();
//       break;
//     default:
//       break;
//   }
// };
//
// Dialog.prototype.addEventListeners = function(openDialogSel, closeDialogSel) {
//   let Dialog = this;
//
//   let openDialogEls = document.querySelectorAll(openDialogSel);
//   for(let i = 0; i < openDialogEls.length; i++) {
//     openDialogEls[i].addEventListener('click', function() {
//       Dialog.open();
//     });
//   }
//
//   let closeDialogEls = document.querySelectorAll(closeDialogSel);
//   for (let i = 0; i < closeDialogEls.length; i++) {
//     closeDialogEls[i].addEventListener('click', function() {
//       Dialog.close();
//     });
//   }
// };
//
// function openModal() {
//   let navDialogEl = document.querySelector('.smart-modal');
//
//   if (navDialogEl) {
//     let modal = new Dialog(navDialogEl);
//     modal.addEventListeners('.open-dialog', '.smart-modal--close');
//     modal.open();
//   }
// }
/**
 * block-navList JavaScript
 */
let inlineLists = document.querySelectorAll(".bit-dropList");
if (inlineLists.length !== 0) {
  for (let inlineList of inlineLists) {
    if (inlineList.hasChildNodes()) {
      inlineList.parentNode.firstChild.classList.add("block-navList--sublistHeading");
    }
  }
}

var list = document.querySelector('.block-navList--list');
document.querySelector('.block-navList--expand').onclick = function() {
  list.classList.toggle('nav-show');
}
$(document).ready(function() {
    //var navList = $("[class^='nav-list']");

    // $('<span class="nav-expand">|||</span>').click(function() {
    //     navList.toggleClass("nav-show");
    // }).insertBefore(navList);

    // var inlineList = navList.find(".inline-list");
    // if (inlineList.length !== 0) {
    //     inlineList.each(function() {
    //         if($(this).children().length !== 0) {
    //             $(this).parent().find("> a").addClass("sublist-container");
    //         }
    //     });
    // }
});

$(document).ready(function() {
    // $('.smart-table').each(function(){
    //     $('<button class="bit-btn--expand"></button>')
    //         .appendTo($(this).find('.record').slice(1))
    //         .click(function() {
    //             if ($(document).width() <= 520) {
    //                 $(this).parent().toggleClass("record-is-expanded");
    //             }
    //         });
    // });

    // $('.sortable').append($("<span class='sort-icon'></span>"));
});


/*****************
 * MODAL SCRIPT
 *****************/
(function($){
    $(document).ready(function(){
        var navDialogEl = document.querySelector('#modal-container');

        if (navDialogEl) {
            var myDialog = new Dialog(navDialogEl);
            myDialog.addEventListeners('.open-dialog', '.modal-close');
            myDialog.open();
        }
    });
}(jQuery));

//WordPress Widget Method
function toggleShow() {
    $('.form-hide').toggleClass("form-show");
}

//Accessibility Script

function Dialog(dialogEl) {
    this.dialogEl = dialogEl;
    this.focusedElBeforeOpen;

    var focusableEls = this.dialogEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    this.focusableEls = Array.prototype.slice.call(focusableEls);

    this.firstFocusableEl = focusableEls[0];
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
}

Dialog.prototype.open = function() {
    var Dialog = this;

    this.dialogEl.removeAttribute('aria-hidden');
    this.dialogEl.removeAttribute('style');

    this.focusedElBeforeOpen = document.activeElement;

    this.dialogEl.addEventListener('keydown', function(e) {
        Dialog._handleKeyDown(e);
    });

    this.firstFocusableEl.focus();
};

Dialog.prototype.close = function() {
    this.dialogEl.setAttribute('aria-hidden', true);
    this.dialogEl.setAttribute('style', 'display: none');

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
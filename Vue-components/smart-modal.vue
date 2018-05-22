<template>
    <section class="smart-modal"
             role="dialog"
             aria-labelledby="be-a-trooper"
             aria-describedby="Join the Washington State Patrol">
        <div class="smart-modal--content">
            <header class="smart-modal--head">
                <button class="smart-modal--close">CLOSE</button>
                <h2 class="smart-modal--title">{{modalTitle}}</h2>
            </header>
            <main class="smart-modal--body">
                <slot name="main"></slot>
            </main>
            <footer class="smart-modal--footer">
                <slot name="footer"></slot>
            </footer>
        </div>
    </section>
</template>

<script>
  import { EventBus } from './event-bus';
  export default {
    name: "smart-modal",
    props: {
      modalTitle: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        focusableEls: null,
        firstFocusableEl: null,
        lastFocusableEl: null,
        focusedElBeforeOpen: null
      }
    },
    methods: {
      open: function() {
        let Dialog = this;

        this.$el.removeAttribute('aria-hidden');
        this.$el.removeAttribute('style');

        this.focusedElBeforeOpen = document.activeElement;

        this.$el.addEventListener('keydown', function(e) {
          Dialog._handleKeyDown(e);
        });

        this.firstFocusableEl.focus();
      },
      close: function() {
        this.$el.setAttribute('aria-hidden', true);
        this.$el.setAttribute('style', 'display: none');

        if(this.focusedElBeforeOpen) {
          this.focusedElBeforeOpen.focus();
        }
      },
      _handleKeyDown: function(e) {
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
      },
      addEventListeners: function(openDialogSel, closeDialogSel) {
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
      }
    },
    mounted: function() {
      let focusableEls = this.$el.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
      this.focusableEls = Array.prototype.slice.call(focusableEls);

      this.firstFocusableEl = focusableEls[0];
      this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];

      let navDialogEl = this.$el;

      if (navDialogEl) {
        this.addEventListeners('.open-dialog', '.smart-modal--close');
        this.open();
      }

      EventBus.$on('modal-open', () => {
        this.open();
      });
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/templates";
    @import "../sass/variables";

    ////
    /// @group Modal
    /// @author James Stanger
    ////

    /// Styles Modal Close button
    .smart-modal--close {
        height: 30px;
        background: none;
        margin: 5px;
        border: none;
        color: white;
    }

    /// Styles a responsive, accessible modal
    .smart-modal {
        position: fixed;
        z-index: $level-100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        /* fallback color */
        background-color: #0d0908;
        background-color: rgba(13, 9, 8, 0.5);
    }

    /// Sets styles for main content portion of a smart-modal
    .smart-modal--content {
        position: fixed;
        background: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: auto;
        width: 500px;

        @media screen and (max-width: 820px) {
            width: 80%;
            height: 80%;
        }

        @supports (display: grid) {
            display: grid;
            grid-template-rows: 2fr 7fr 1fr;
            height: 85%;
        }
    }

    /// Sets styles for smart-modal title
    .smart-modal--title {
        color: white;
        font-size: 35px;
        margin: 5px 20px;

        @media screen and (max-width: 820px) {
            font-size: 25px;
        }
    }

    /// Sets head section of a smart-modal
    .smart-modal--head {
        background: #13355b;
    }

    /// Sets body section of a smart-modal
    .smart-modal--body {

    }

    /// Sets styles for smart-modal footer section
    .smart-modal--footer {
        padding: 20px;
    }
</style>
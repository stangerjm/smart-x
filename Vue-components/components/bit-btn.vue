<template>
    <button type="button" :class="btnClass" v-if="!isLink" @click="emitEvent">
        <slot></slot>
    </button>
    <a :class="btnClass" href="path" v-else>
        <slot></slot>
    </a>
</template>

<script>
  import { EventBus } from '../event-bus';

  /**
   * A dynamic button that can be used as an various types of buttons and links.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: 'bit-btn',
    props: {
      /**
       * Button style options include:
       * `add, datepicker, delete, details, edit, exit, expand, plainExit, plainSearch, reset, search`
       */
      btnStyle: {
        type: String
      },
      /**
       * Renders the button as a link if set to true
       */
      isLink: {
        type: Boolean,
        default: false
      },
      btnEvent: {
        type: String
      },
      path: {
        type: String
      }
    },
    data() {
      return {
        btnClass: 'bit-btn ' + this.getClass(this.btnStyle)
      }
    },
    methods: {
      /**
       * Returns the correct class for the string passed into the btnStyle property
       * @param {string} type - button style
       */
      getClass: function (type) {
        if (!type) {
          return "bit-btn-clickable";
        }

        switch(type) {
          case 'add':
          case 'exit':
          case 'delete':
          case 'details':
          case 'edit':
          case 'expand':
          case 'plainExit':
          case 'plainSearch':
          case 'reset':
          case 'search':
            return 'bit-btn-' + type;
          default:
            return 'bit-btn-clickable';
        }
      },
      emitEvent: function () {
        if (this.btnEvent) {
          EventBus.$emit(this.btnEvent, this.path);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../../sass/global/variables";
    @import "../../sass/global/mixins";
    @import "../../sass/components/bit/btn/bit-btn";
</style>

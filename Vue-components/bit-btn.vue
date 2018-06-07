<template>
    <button type="button" :class="btnClass" v-if="!isLink" @click="emitEvent">
        <slot></slot>
    </button>
    <a :class="btnClass" href="path" v-else>
        <slot></slot>
    </a>
</template>

<script>
  import { EventBus } from './event-bus';

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
        btnClass: this.getClass(this.btnStyle)
      }
    },
    methods: {
      /**
       * Returns the correct class for the string passed into the btnStyle property
       * @param {string} type - button style
       */
      getClass: function (type) {
        let allowedValues = [
          'add',
          'datepicker',
          'delete',
          'details',
          'edit',
          'exit',
          'expand',
          'plainExit',
          'plainSearch',
          'reset',
          'search'
        ];

        if (!type) {
          return "bit-btn";
        } else if (allowedValues.includes(type)) {
          return "bit-btn-" + type;
        } else {
          return "bit-btn";
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
    @import "../sass/components/bit/btn/bit-btn";
</style>

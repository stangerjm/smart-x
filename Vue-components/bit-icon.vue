<template>
    <span :class="iconClass"></span>
</template>

<script>
  /**
   * A component that can render different types of icons.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: "bit-icon",
    props: {
      /**
       * Icon type options include:
       * `user, sort`
       */
      iconType: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
        iconClass: this.getClass(this.iconType)
      }
    },
    methods: {
      /**
       * Returns the correct class for the string passed into the iconType property
       * @param {string} type - icon style
       */
      getClass: function (type) {
        let allowedTypes = ['user', 'sort'];
        if (!type) {
          return 'bit-icon-error';
        } else if (allowedTypes.includes(type)) {
          return 'bit-icon-' + type;
        } else {
          return 'bit-icon-error';
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/base";
    @import "../sass/variables";
    @import "../sass/templates";

    /// Styles a user / profile icon.
    .bit-icon-user {
        height: 18px;

        &:before {
            @extend %icon;
            @include icon-url('user.png', 12px);
            height: 18px;
        }
    }

    /// Icon that is added to a sortable table column to indicate the
    /// column is sortable.
    .bit-icon-sort {
        display: inline-block;

        &:before {
            @extend %icon;
            @include icon-url('sort.png', 0.6em);
            height: 1em;
        }
    }

    .bit-icon-error {
        &:before {
            @extend %icon;
            content: '!';
            color: red;
        }
    }
</style>
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
    @import "../sass/components/bit/icon/bit-icon";
</style>
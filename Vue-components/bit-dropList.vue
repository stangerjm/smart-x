<template>
    <ul class="bit-dropList">
        <li class="bit-dropList--item" v-for="item in dropItems">
            <a :href="item.linkPath" class="bit-link">{{item.itemTitle}}</a>
        </li>
    </ul>
</template>

<script>
  /**
   * A component that renders a drop-down list to be part of a navigation.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: "bit-drop-list",
    props: {
      /**
       * The items to be rendered as part of the drop-down.
       */
      dropItems: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/global/variables";
    @import "../sass/components/bit/link/bit-link";
    @import "../sass/components/bit/dropList/bit-dropList";
</style>
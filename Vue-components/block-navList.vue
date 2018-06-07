<template>
    <div class="block-navList">
        <span class="block-navList--expand" @click="isExpanded = !isExpanded">|||</span>
        <ul :class="[isExpanded ? 'nav-show' : '', 'block-navList--items']">
            <li v-for="item in listItems">
                <a :href="item.linkPath" class="wsp-link">{{item.itemTitle}}</a>
                <bit-drop-list v-if="item.inlineItems" :drop-items="item.inlineItems"></bit-drop-list>
            </li>
        </ul>
    </div>
</template>

<script>
  import bitDropList from './bit-dropList'

  /**
   * A component that renders a flexible and mobile responsive list with drop-down capability.
   * @author James Stanger
   * @version 1.0
   */
  export default {
    name: "block-nav-list",
    props: {
      /**
       * An array containing the items and subsequent drop-down items to render.
       */
      listItems: {
        type: Array,
        required: true
      }
    },
    components: {
      bitDropList
    },
    data: function () {
      return {
        isExpanded: false
      }
    },
    mounted: function () {
      let inlineLists = this.$el.querySelectorAll(".bit-dropList");
      if (inlineLists.length !== 0) {
        for (let inlineList of inlineLists) {
          if (inlineList.hasChildNodes()) {
            inlineList.parentNode.firstChild.classList.add("sublist-container");
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/components/block/navList/block-navList";
</style>
<template>
    <ul class="bit-dropList">
        <li v-for="item in dropItems">
            <a :href="item.linkPath" class="wsp-link">{{item.itemTitle}}</a>
        </li>
    </ul>
</template>

<script>
  export default {
    name: "bit-drop-list",
    props: {
      dropItems: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/variables";

    /// Sets an sublist to display beneath its parent. Will show only on hover.
    .bit-dropList {
        /* display beneath parent. Hide by default. Set to outer z-index layer. */
        position: absolute;
        padding: 0;
        display: none;
        width: inherit;
        margin-top: 3px;
        z-index: $level-9;
        list-style: none;
        left: 0;
        right: 0;

        li {
            /* ensure children are not transparent */
            background: $uniform-blue;
            padding: 3px 0;
            box-shadow: 0 0 3px inset;

            &:hover {
                transition: border-top-width 100ms;
                border-top: 2px groove $patch-orange--deep;
            }
        }
    }
</style>
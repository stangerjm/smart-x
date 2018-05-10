<template>
    <div class="block-actionContainer">
        <bit-btn btn-style="details" is-link="true" :href="'/' + detailsContext + '/Details/' + itemId" v-if="detailsBtn"></bit-btn>
        <bit-btn btn-style="edit" is-link="true" :href="'/' + editContext + '/Edit/' + itemId" v-if="editBtn"></bit-btn>
        <bit-btn btn-style="delete" is-link="true" :href="'/' + deleteContext + '/Delete/' + itemId" v-if="deleteBtn"></bit-btn>
    </div>
</template>

<script>
    import bitBtn from './bit-button';
    export default {
        name: "block-action-container",
        props: {
          defaultCtx: {
            type: String,
            required: true
          },
          itemId: {
            type: Number,
            required: true
          },
          detailsBtn: {
            type: Boolean,
            default: true
          },
          editBtn: {
            type: Boolean,
            default: true
          },
          deleteBtn: {
            type: Boolean,
            default: true
          },
          editCtx: {
            type: String
          },
          detailsCtx: {
            type: String
          },
          deleteCtx: {
            type: String
          }
        },
        data() {
          return {
            editContext: this.editCtx ? this.editCtx : this.defaultCtx,
            deleteContext: this.deleteCtx ? this.deleteCtx : this.defaultCtx,
            detailsContext: this.detailsCtx ? this.detailsCtx : this.defaultCtx,
          }
        },
        components: {
            bitBtn
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/templates";

    /// Container that holds action items in a table cell.
    /// @example markup - Basic use
    ///     <td>
    ///       <div class="action-container">
    ///         <button class="bit-btn--details">
    ///         <button class="bit-btn--edit">
    ///         <button class="bit-btn--delete">
    ///       </div>
    ///     </td>
    .block-actionContainer {
        @include format-responsive(row, center, nowrap) {
            grid-auto-flow: column;
        }

        & > [class*=bit-btn] {
            margin: 0;
        }

        a {
            text-decoration: none;
        }
    }
</style>
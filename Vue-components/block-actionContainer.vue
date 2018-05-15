<template>
    <div class="block-actionContainer">
        <bit-btn btn-style="details" is-link="true" :href="'/' + detailsContext + '/Details/' + itemId"
                 v-if="detailsBtn"></bit-btn>
        <bit-btn btn-style="edit" is-link="true" :href="'/' + editContext + '/Edit/' + itemId" v-if="editBtn"></bit-btn>
        <bit-btn btn-style="delete" is-link="true" :href="'/' + deleteContext + '/Delete/' + itemId"
                 v-if="deleteBtn"></bit-btn>
    </div>
</template>

<script>
  import bitBtn from './bit-btn';

  /**
   * A component that renders an action container to be part of a table or other such structure.
   * The action container should be linked to a record or item in a table-like structure.
   * Contains action links that handle details, edit, and delete actions.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: "block-action-container",
    props: {
      /**
       * Default context for action links. If an action link context is omitted in the data object, this will be used.
       */
      defaultCtx: {
        type: String,
        required: true
      },
      /**
       * Id of the corresponding item.
       */
      itemId: {
        type: Number,
        required: true
      },
      /**
       * Flag to optionally omit the details button.
       */
      detailsBtn: {
        type: Boolean,
        default: true
      },
      /**
       * Flag to optionally omit the edit button.
       */
      editBtn: {
        type: Boolean,
        default: true
      },
      /**
       * Flag to optionally omit the delete button.
       */
      deleteBtn: {
        type: Boolean,
        default: true
      },
      /**
       * Context for the edit button.
       */
      editCtx: {
        type: String
      },
      /**
       * Context for the details button.
       */
      detailsCtx: {
        type: String
      },
      /**
       * Context for the delete button.
       */
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
    @import "../sass/templates";

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
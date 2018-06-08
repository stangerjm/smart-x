<template>
    <div class="block-actionContainer">
        <template v-if="detailsBtn">
            <template v-if="openModalDetails">
                <bit-btn btn-style="details"
                         btn-event="modal-open"
                         :path="getActionPath('Details', detailsContext)">
                </bit-btn>
            </template>
            <template v-else>
                <bit-btn btn-style="details"
                         :is-link="true"
                         :href="getActionPath('Details', detailsContext)">
                </bit-btn>
            </template>
        </template>

        <template v-if="editBtn">
            <template v-if="openModalEdit">
                <bit-btn btn-style="edit"
                         btn-event="modal-open"
                         :path="getActionPath('Edit', editContext)">
                </bit-btn>
            </template>
            <template v-else>
                <bit-btn btn-style="edit"
                         :is-link="true"
                         :href="getActionPath('Edit', editContext)">
                </bit-btn>
            </template>
        </template>

        <template v-if="deleteBtn">
            <template v-if="openModalDelete">
                <bit-btn btn-style="delete"
                         btn-event="modal-open"
                         :path="getActionPath('Delete', deleteContext)">
                </bit-btn>
            </template>
            <template v-else>
                <bit-btn btn-style="delete"
                         :is-link="true"
                         :href="getActionPath('Delete', deleteContext)">
                </bit-btn>
            </template>
        </template>
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
      },
      openModalEdit: {
        type: Boolean,
        default: false
      },
      openModalDelete: {
        type: Boolean,
        default: false
      },
      openModalDetails: {
        type: Boolean,
        default: false
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
    },
    methods: {
      getActionPath: function(action, context) {
        return '/' + context + '/' + action + '/' + this.itemId;
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/global/templates";
    @import "../sass/components/block/actionContainer/block-actionContainer";
</style>
<template>
    <table class="smart-table">
        <tr class="smart-table--row smart-table--head">
            <th class="smart-table--heading smart-table--sortableHeading" v-for="heading in Object.keys(tableData[0])" v-if="isDisplayHeading(heading)">
                <template v-if="!unsearchableHeadings.includes(heading)">
                    <a class="smart-table--link" :href="'/' + defaultContext + '?sortOrder=' + heading">
                        {{formatFromCamelCase(heading)}}
                    </a>
                    <bit-icon icon-type="sort"></bit-icon>
                </template>
                <template v-else>
                    {{formatFromCamelCase(heading)}}
                </template>
            </th>
            <th class="smart-table--heading">Actions</th>
        </tr>
        <tr class="smart-table--row" v-for="item in tableData">
            <td v-for="(key, index) in Object.keys(item)" v-if="isDisplayHeading(key)" :class="{'smart-table--cell': true, 'smart-table--key': index < 2}">
                <span class="smart-table--inlineHeading">{{formatFromCamelCase(key)}}:</span>
                <template v-if="typeof(item[key]) === typeof(true)">
                    <input type="checkbox" :checked="item[key]" disabled>
                </template>
                <template v-else>
                    {{getValue(item[key])}}
                </template>
            </td>
            <td class="smart-table--cell">
                <block-action-container
                        :default-ctx="defaultContext"
                        :item-id="getItemId(item)"
                        :details-btn="allowDetails"
                        :details-ctx="item.detailsContext"
                        :open-modal-details="openModalAll || openModalDetails"
                        :edit-btn="allowEdit"
                        :edit-ctx="item.editContext"
                        :open-modal-edit="openModalAll || openModalEdit"
                        :delete-btn="allowDelete"
                        :delete-ctx="item.deleteContext"
                        :open-modal-delete="openModalAll || openModalDelete">
                </block-action-container>
            </td>
            <bit-btn class="smart-table--expand" btn-style="expand" @click.native="expandRecord"></bit-btn>
        </tr>
    </table>
</template>

<script>
  import blockActionContainer from './block-actionContainer'
  import bitBtn from './bit-btn'
  import bitIcon from './bit-icon'
  import { parseJsonDate } from "./helpers";

  /**
   * A component that renders a responsive table from a data-set.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: "smart-table",
    components: {
      blockActionContainer,
      bitBtn,
      bitIcon
    },
    props: {
      /**
       * The data that will render as a table.
       */
      tableData: {
        type: Array,
        required: true
      },
      /**
       * The default context passed into the action container component
       * @see block-actionContainer
       */
      defaultContext: {
        type: String,
        required: true
      },
      /**
       * An array of key names that will render each
       * heading associated with the key as literal text and not a searchable link.
       */
      unsearchableHeadings: {
        type: Array,
        default: () => []
      },
      /**
       * Optionally renders the delete action link if true
       * @see block-actionContainer
       */
      allowDelete: {
        type: Boolean,
        default: true
      },
      /**
       * Optionally renders the edit action link if true
       * @see block-actionContainer
       */
      allowEdit: {
        type: Boolean,
        default: true
      },
      /**
       * Optionally renders the details action link if true
       * @see block-actionContainer
       */
      allowDetails: {
        type: Boolean,
        default: true
      },
      ignoreFields: {
        type: Array,
        default: () => []
      },
      openModalAll: {
        type: Boolean,
        default: false
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
    methods: {
      /**
       * Expands record on mobile screen.
       * @param event
       */
      expandRecord: function (event) {
        let row = event.target.parentNode;
        if (row.classList.contains("record-is-expanded")) {
          row.classList.remove("record-is-expanded");
        } else {
          row.classList.add("record-is-expanded");
        }

        /**
         * Emit to parent that a record has been expanded so parent can resize appropriately.
         * @event recordExpanded
         * @type null
         */
        this.$emit('recordExpanded');
      },
      /**
       * Ignores the detailsContext, editContext, and deleteContext keys needed to build action container
       * @param heading
       * @returns {boolean}
       */
      isDisplayHeading: function (heading) {
        if (this.ignoreFields.includes(heading)) {
          return false;
        }

        switch (heading) {
          case 'detailsContext':
          case 'editContext':
          case 'deleteContext':
            return false;
          default:
            return true;
        }
      },
      getItemId: function (item) {
        let keys = Object.keys(item);
        let idKey = keys.find(id => id.toLowerCase() === 'id');
        return item[idKey];
      },
      getValue: function(detail) {
        let detailValue = parseJsonDate(detail);
        if (detailValue !== null) {
          let options = {year: 'numeric', month: '2-digit', day: '2-digit'};
          return detailValue.toLocaleDateString('en-us', options);
        } else {
          return detail;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/global/mixins";
    @import "../sass/global/variables";
    @import "../sass/components/smart/table/smart-table";
</style>
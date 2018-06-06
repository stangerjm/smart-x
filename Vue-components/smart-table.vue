<template>
    <table class="smart-table">
        <tr class="record table-heading">
            <th class="sortable" v-for="heading in Object.keys(tableData[0])" v-if="isDisplayHeading(heading)">
                <template v-if="!unsearchableHeadings.includes(heading)">
                    <a class="wsp-link" :href="'/' + defaultContext + '?sortOrder=' + heading">
                        {{formatFromCamelCase(heading)}}
                    </a>
                    <bit-icon icon-type="sort"></bit-icon>
                </template>
                <template v-else>
                    {{formatFromCamelCase(heading)}}
                </template>
            </th>
            <th>Actions</th>
        </tr>
        <tr class="record" v-for="item in tableData">
            <td v-for="(key, index) in Object.keys(item)" v-if="isDisplayHeading(key)" :class="{'record-key': index < 2}">
                <template v-if="typeof(item[key]) === typeof(true)">
                    <input type="checkbox" :checked="item[key]" disabled>
                </template>
                <template v-else>
                    {{getValue(item[key])}}
                </template>
            </td>
            <td>
                <block-action-container
                        :default-ctx="defaultContext"
                        :item-id="getItemId(item)"
                        :details-btn="allowDetails"
                        :details-ctx="item.detailsContext"
                        :edit-btn="allowEdit"
                        :edit-ctx="item.editContext"
                        :delete-btn="allowDelete"
                        :delete-ctx="item.deleteContext">
                </block-action-container>
            </td>
            <bit-btn btn-style="expand" @click.native="expandRecord"></bit-btn>
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
    @import "../sass/smart-table";
</style>
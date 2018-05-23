<template>
    <div class="block-multiSelect">
        <label :for="'selectParent-' + inputId">{{parentTitle}}</label>
        <select class="block-multiSelect--parent" :name="parentTitle" v-model="selectedParent"
                :id="'selectParent-' + inputId">
            <option disabled>Please select a {{parentTitle}}</option>
            <option v-for="parentNode in selectData" :value="parentNode">{{parentNode[parentDisplayKey]}}</option>
        </select>

        <label :for="'selectChild-' + inputId">{{childTitle}}</label>
        <select class="block-multiSelect--child" :name="childTitle" v-model="selectedChild"
                :id="'selectChild-' + inputId">
            <option disabled>Please select a {{Object.keys(selectedParent).length !== 0 ? childTitle : parentTitle}}</option>
            <option v-for="childNode in selectedParent[arrayKey]">{{childNode[childDisplayKey]}}</option>
        </select>
    </div>
</template>

<script>
  import { EventBus } from './event-bus';

  /**
   * A component that renders two select elements that have a parent-child relationship.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: "block-multi-select",
    props: {
      /**
       * An array of objects that contains both the parent and child data. See object structure below.
       */
      optionsData: {
        required: true,
        type: Array
      },
      /**
       * The title to display before the parent select element.
       */
      parentTitle: {
        required: true,
        type: String
      },
      /**
       * The title to display before the child select element.
       */
      childTitle: {
        required: true,
        type: String
      },
      /**
       * The object key to use for displaying the parent information.
       */
      parentDisplayKey: {
        required: true,
        type: String
      },
      childDisplayKey: {
        required: true,
        type: String
      }
    },
    data() {
      return {
        selectedParent: {},
        selectedChild: {},
        inputId: Math.random().toString(36).substr(2, 9),
        selectData: this.optionsData
      }
    },
    computed: {
      arrayKey: function () {
        let firstData = this.selectData[0];
        for (let option in firstData) {
          if (Array.isArray(firstData[option])) {
            return option;
          }
        }
      }
    },
    mounted: function () {
      EventBus.$on('modal-data-received', (payload) => {
        this.selectData = payload;
      });

      EventBus.$on('modal-closed', () => {
        //Reset all data closed
        this.selectData = [];
        this.selectedParent = {};
        this.selectedChild = {};
      });
    }
  }
</script>

<style scoped lang="scss">
    @import '../sass/variables';

    %select {
        margin: 0 10px;
        padding: 2px;
        border-radius: 5px;
        box-shadow: 2px 2px 3px $generic-grey;
    }

    .block-multiSelect {
        display: flex;
        align-items: center;

        @media screen and (max-width: $break-med) {
            flex-direction: column;
            align-items: stretch;
        }
    }

    .block-multiSelect--parent {
        @extend %select;
    }

    .block-multiSelect--child {
        @extend %select;
    }
</style>
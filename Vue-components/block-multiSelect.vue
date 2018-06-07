<template>
    <div :class="stackElements ? 'block-multiSelect-stacked' : 'block-multiSelect'">
        <label :for="'selectParent-' + inputId">{{formatFromCamelCase(parentName)}}</label>
        <select class="block-multiSelect--parent" :name="parentName" v-model="selectedParent"
                :id="'selectParent-' + inputId">
            <option disabled>Please select a {{formatFromCamelCase(parentName)}}</option>
            <option v-for="parentNode in selectData" :value="parentNode">{{parentNode[parentDisplayKey]}}</option>
        </select>

        <label :for="'selectChild-' + inputId">{{formatFromCamelCase(childName)}}</label>
        <select class="block-multiSelect--child" :name="childName" v-model="selectedChild"
                :id="'selectChild-' + inputId">
            <option disabled>Please select a {{Object.keys(selectedParent).length !== 0 ? childName : parentName}}</option>
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
        type: Array,
        default: () => []
      },
      /**
       * The title to display before the parent select element.
       */
      parentName: {
        required: true,
        type: String
      },
      /**
       * The title to display before the child select element.
       */
      childName: {
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
      },
      stackElements: {
        type: Boolean,
        default: false
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
      EventBus.$on('modal-closed', () => {
        //Reset all data closed
        this.selectData = [];
        this.selectedParent = {};
        this.selectedChild = {};
      });

      EventBus.$on('form-data-updated', (payload) => {
        this.selectData = payload;
        console.log(this.selectData);
      });
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/components/block/multiSelect/block-multiSelect";
</style>
<template>
    <div class="block-multiSelect">
        <label :for="'selectParent-' + inputId">{{parentTitle}}</label>
        <select class="block-multiSelect--parent" :name="parentTitle" v-model="selectedParent" :id="'selectParent-' + inputId">
            <option disabled>Please select a {{parentTitle}}</option>
            <option v-for="parentNode in optionsData" :value="parentNode">{{parentNode[displayKey]}}</option>
        </select>

        <label :for="'selectChild-' + inputId">{{childTitle}}</label>
        <select class="block-multiSelect--child" :name="childTitle" v-model="selectedChild" :id="'selectChild-' + inputId">
            <option disabled>Please select a {{Object.keys(selectedParent).length !== 0 ? childTitle : parentTitle}}</option>
            <option v-for="childNode in selectedParent[arrayKey]">{{childNode}}</option>
        </select>
    </div>
</template>

<script>
  export default {
    name: "block-multi-select",
    props: {
      optionsData: {
        required: true,
        type: Array
      },
      parentTitle: {
        required: true,
        type: String
      },
      childTitle: {
        required: true,
        type: String
      },
      displayKey: {
        required: true,
        type: String
      }
    },
    data() {
      return {
        selectedParent: {},
        selectedChild: {},
        inputId: Math.random().toString(36).substr(2,9)
      }
    },
    computed: {
      arrayKey: function() {
        let firstData = this.optionsData[0];
        for (let option in firstData) {
          if (Array.isArray(firstData[option])) {
            return option;
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    @import '../../../sass/variables';

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
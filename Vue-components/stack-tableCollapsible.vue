<template>
    <smart-accordion :title="title">
        <smart-table
            v-on:recordExpanded="updateAccordionHeight"
            :table-data="tableData"
            :default-context="defaultContext"
            :unsearchable-headings="Object.keys(tableData)">
        </smart-table>
    </smart-accordion>
</template>

<script>
  import smartTable from './smart-table'
  import smartAccordion from './smart-accordion'
  export default {
    name: "stack-tableCollapsible",
    components: {
      smartTable,
      smartAccordion
    },
    props: {
      tableData: {
        type: Array,
        required: true
      },
      defaultContext: {
        type: String,
        required: true
      },
      title: {
        type: String,
        default: "Associated Data"
      }
    },
    methods: {
      updateAccordionHeight: function() {
        this.$children[0].expandData();
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
<template>
    <div class="smart-details">
        <div class="smart-details--container">
            <h3 class="smart-details--heading">{{title ? title : 'Details'}}</h3>
            <div class="smart-details--listContainer">
                <dl v-for="column in detailColumns" class="smart-details--list" :style="{width: 100 / detailColumns.length + '%'}">
                    <div v-for="(detail, key) in column" class="smart-details--detail">
                        <dt>{{formatFromCamelCase(key)}}</dt>
                        <dd v-if="typeof(detail) !== typeof(true)">{{detail}}</dd>
                        <dd v-else><input type="checkbox" :checked="detail" disabled></dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
  import smartTable from './smart-table'
  export default {
    name: "smart-details",
    components: {
      smartTable
    },
    props: {
      detailData: {
        type: Object,
        required: true
      },
      title: {
        type: String
      },
      detailsPerColumn: {
        type: Number,
        default: 8
      }
    },
    data() {
      return {
        detailColumns: []
      }
    },
    created: function() {
      // filter the details to remove the associated records as they
      // are beyond the scope of this component
      for (let prop in this.detailData) {
        if (Array.isArray(this.detailData[prop])) {
          delete this.detailData[prop];
        }
      }

      // Break up details object into smaller objects with eight properties each. This will allow
      // the view to display the details in dynamic columns of eight properties per column.
      let detailKeys = Object.keys(this.detailData);
      let newProps = {};
      for(let [index, key] of detailKeys.entries()) {
        //push key and value to a new object
        newProps[key] = this.detailData[key];
        //delete the property and value from old object
        delete this.detailData[key];

        // Check the index for the following conditions:
        //   Current iteration is not the first iteration, as this would cause an empty object to be pushed
        //   AND
        //   Loop has iterated seven times after last push. As this check comes last, it will push the eighth value to the array.
        //   OR (independent from previous AND check)
        //   Current iteration is the last iteration. If this is the case it will push the rest of the values to the array.
        if((index !== 0 && (index + 1) % this.detailsPerColumn === 0) || index === detailKeys.length - 1) {
          this.detailColumns.push(newProps);
          newProps = {};
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../../../sass/variables";
    @import "../../../sass/templates";

    .smart-details--heading {
        padding: 5px 10px;
        margin: 0;
        border-radius: 5px 5px 0 0;
        border-bottom: 1px solid grey;
        background: $generic-grey;
    }

    .smart-details--container {
        width: 80%;
        margin: 10px auto;
        border: 1px solid black;
        border-radius: 5px;
        //padding: 10px;
    }

    .smart-details--listContainer {
        display: flex;
        flex-direction: row;

        @media screen and (max-width: $break-med) {
            flex-direction: column;
        }
    }

    .smart-details--detail {
        @extend %flex-container;
        @media screen and (max-width: $break-xs) {
            font-size: 0.75em;
            overflow-wrap: break-word;
            margin: 10px 0;
        }

        > dt, > dd {
            display: inline-block;
            width: 50%;
            margin: 0;
            padding: 0 10px;
        }

        > dt {
            text-align: right;
            font-weight: bolder;
        }
    }

    .smart-details--list {
        @media screen and (max-width: $break-med) {
            width: 100% !important;
        }
    }
</style>
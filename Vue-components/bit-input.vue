<template>
    <div :class="[stackElements ? 'bit-input-stacked' : 'bit-input']">
        <template v-if="inputType === 'checkbox'">
            <label class="bit-input--label" :for="inputName">{{labelText}}</label>
            <input class="bit-input--field"
                   :id="inputName"
                   :type="inputType"
                   :name="inputName"
                   v-model="model"
                   value="true"
                   v-bind="$attrs">
            <input type="hidden" value="false" :name="inputName">
        </template>
        <template v-else-if="inputType !== 'date'">
            <label class="bit-input--label" :for="inputId ? inputId : randomId">{{labelText}}</label>
            <input class="bit-input--field"
                   :id="inputId ? inputId : randomId"
                   :type="inputType"
                   :name="inputName"
                   v-model="model"
                   v-bind="$attrs">
        </template>
        <template v-else>
            <label class="bit-input--label" :for="inputId ? inputId : randomId">{{labelText}}</label>
            <date-picker class="bit-input--field"
                         :id="inputId ? inputId : randomId"
                         v-model="model"
                         :name="inputName"
                         type="date"
                         :format="dateFormat"
                         v-bind="$attrs">
            </date-picker>
        </template>
    </div>
</template>

<script>
  /**
   * A component that can be rendered as a text, number, or datepicker input.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: "bit-input",
    props: {
      /**
       * Corresponds to the native HTML input attribute "type"
       */
      inputType: {
        type: String,
        required: true
      },
      /**
       * Display text for the related input label
       */
      labelText: {
        type: String,
        required: true
      },
      /**
       * Corresponds to the native HTML input attribute "name"
       */
      inputName: {
        type: String,
        required: true
      },
      /**
       * Flag to have input and label stack horizontally if set to true
       */
      stackElements: {
        type: Boolean,
        default: false
      },
      /**
       * Corresponds to the native HTML input attribute "id"
       */
      inputId: {
        type: String
      },
      /**
       * Optional date format for the input[type=date] element
       */
      dateFormat: {
        type: String
      },
      /**
       * Model for form inputs
       * @model
       */
      inputModel: {}
    },
    data() {
      return {
        randomId: 'input-' + Math.random().toString(36).substr(2, 9),
        // Setting inputModel to the a data property to avoid accidental overwriting of parent
        // See: https://vuejs.org/v2/guide/migration.html#Prop-Mutation-deprecated
        model: this.inputModel
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/global/variables";
    @import "../sass/global/templates";
    @import "../sass/global/misc";
    @import "../sass/components/bit/input/bit-input";

    /* Styles to correct third-party datepicker component styles */
    .bit-input--field {
        & /deep/ .el-input__inner {
            border: none;
            box-shadow: inset 1px 1px 4px $theme-black;
            border-radius: 3px;
            height: 35px;
            width: 100%;
        }

        &.el-date-editor {
            width: 100%;
            padding: 0;
        }
    }
</style>
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
            <flat-pickr class="bit-input--field"
                        :id="inputId ? inputId : randomId"
                        v-model="model"
                        :name="inputName"
                        v-bind="$attrs">
            </flat-pickr>
        </template>
    </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  /**
   * A component that can be rendered as a text, number, or datepicker input.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: "bit-input",
    components: {
      flatPickr
    },
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
    @import "../sass/global/mixins";
    @import "../sass/components/bit/input/bit-input";

    .flatpickr-input {
        background: url('/images/calendar.png') 5px / 20px no-repeat;
        padding-left: 30px;
    }
</style>
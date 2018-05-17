<template>
    <form :action="formAction" :method="formMethod" class="smart-form">
        <header class="smart-form--titleSection">
            <h3 class="smart-form--title">{{formTitle}}</h3>
        </header>
        <section class="smart-form--fieldSection">
            <template v-for="(item, key) in formData">
                <bit-input
                        class="smart-form--input"
                        :stack-elements="true"
                        :input-name="key"
                        :input-type="getType(item)"
                        :label-text="formatFromCamelCase(key)"
                        :is-readonly="readonlyInputs.includes(key)"
                        :input-model="emptyModel ? null : dataCopy[key]"
                        :date-format="getType(item) === 'date' ? dateFormat : null">
                </bit-input>
            </template>
        </section>
        <bit-btn type="submit">Submit</bit-btn>
    </form>
</template>

<script>
  import bitInput from './bit-input';
  import bitBtn from './bit-btn';

  /**
   * A component that renders a dynamic form based on a model.
   * @author James Stanger, Washington State Patrol
   * @version 1.0
   */
  export default {
    name: "smart-form",
    components: {
      bitInput,
      bitBtn
    },
    data() {
      return {
        /**
         * Will contain a non-reactive copy of the data when the component is created.
         */
        dataCopy: null
      }
    },
    props: {
      /**
       * Corresponds to the native HTML attribute "action"
       */
      formAction: {
        required: true,
        type: String
      },
      /**
       * The model that the form should use as a template.
       */
      formData: {
        required: true,
        type: Object
      },
      /**
       * A list of inputs that should be readonly.
       */
      readonlyInputs: {
        type: Array,
        default: () => []
      },
      /**
       * A list of inputs that should be required.
       */
      requiredInputs: {
        type: Array,
        default: () => []
      },
      /**
       * A title that will display at the top of the form.
       */
      formTitle: {
        type: String,
        default: 'Form'
      },
      /**
       * Corresponds to the native HTML attribute "method"
       */
      formMethod: {
        type: String
      },
      /**
       * An optional format for the date-picker input field to use.
       */
      dateFormat: {
        type: String,
        default: 'MM-dd-yyyy'
      },
      /**
       * Indicates the model is empty and the inputs should be empty be default.
       */
      emptyModel: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      /**
       * Gets the appropriate input type depending on the value's data type.
       * @param value
       * @returns {string}
       */
      getType: function(value) {
        if (typeof(value) === typeof(true)) {
          return 'checkbox';
        } else if (value !== null && value !== '' && !isNaN(value)) {
          return 'number';
        } else if (Date.parse(value)) {
          return 'date'
        } else {
          return 'text';
        }
      },
      /**
       * Parses a JSON date into a new Date object.
       * @param date
       * @returns {*}
       */
      parseJsonDate: function(date) {
        let dateRegex = /\/Date\((\d+)(?:-\d+)?\)\//i;
        if (dateRegex.test(date)) {
          return new Date(parseInt(dateRegex.exec(date)[1], 10));
        } else {
          return null;
        }
      }
    },
    /**
     * Loop through the properties in the model and replace all of the dates with the expected format.
     */
    created: function() {
      let model = this.formData;
      for (let prop in model) {
        let jsonDate = this.parseJsonDate(model[prop]);
        if (jsonDate !== null) {
          model[prop] = jsonDate.toString();
        }
      }

      this.dataCopy = Object.assign({}, model);
    },
    /**
     * Set each input specified in the requiredInputs array to have the native HTML attribute "required"
     */
    mounted: function() {
      for (let requiredInput of this.requiredInputs) {
        let domInput;

        if(this.getType(this.dataCopy[requiredInput]) === 'date') {
          domInput = this.$el.querySelector('.el-date-editor > input[name=' + requiredInput + ']');
        } else {
          domInput = this.$el.querySelector('input[name=' + requiredInput + ']');
        }

        domInput.required = true;
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../sass/variables";

    .smart-form {
        > .smart-form--input {
            margin: 10px 20px;
        }
    }

    .smart-form--titleSection {
        background: $generic-grey;
        padding: 10px;
    }

    .smart-form--title {
        margin: 0;
    }
</style>
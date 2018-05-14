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
                        :is-readonly="disabledInputs.includes(key)"
                        :input-model="emptyModel ? null : getModel(dataCopy[key])"
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

  export default {
    name: "smart-form",
    components: {
      bitInput,
      bitBtn
    },
    data() {
      return {
        time: '',
        time2: '',
        dataCopy: null
      }
    },
    props: {
      formAction: {
        required: true,
        type: String
      },
      formData: {
        required: true,
        type: Object
      },
      disabledInputs: {
        type: Array,
        default: () => []
      },
      requiredInputs: {
        type: Array,
        default: () => []
      },
      formTitle: {
        type: String,
        default: 'Form'
      },
      formMethod: {
        type: String
      },
      dateFormat: {
        type: String,
        default: 'MM-dd-yyyy'
      },
      emptyModel: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getModel: function(model) {
        //console.log(model);
        return model;
      },
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
      parseJsonDate: function(date) {
        let dateRegex = /\/Date\((\d+)(?:-\d+)?\)\//i;
        if (date === '/Date(-62135568000000)/') {
          return new Date().toUTCString();
        } else if (dateRegex.test(date)) {
          return new Date(parseInt(dateRegex.exec(date)[1], 10));
        } else {
          return null;
        }
      }
    },
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
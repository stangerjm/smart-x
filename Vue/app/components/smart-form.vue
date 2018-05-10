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
                        :input-value="item"
                        :is-readonly="disabledInputs.includes(key)">
                </bit-input>
            </template>
        </section>
        <bit-btn type="submit">Submit</bit-btn>
        <date-picker v-model="time" editable lang="en"></date-picker>
    </form>
</template>

<script>
  import bitInput from './bit-input';
  import bitBtn from './bit-btn';
  import DatePicker from 'vue2-datepicker';
  export default {
    name: "smart-form",
    components: {
      bitInput,
      bitBtn,
      DatePicker
    },
    data() {
      return {
        time: ''
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
        type: Array
      },
      formTitle: {
        type: String,
        default: 'Form'
      },
      formMethod: {
        type: String
      }
    },
    methods: {
      getType: function(value) {
        if (typeof(value) === typeof(true)) {
          return 'checkbox';
        } else if (value !== '' && !isNaN(value)) {
          return 'number';
        } else {
          return 'text';
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../../../sass/variables";

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
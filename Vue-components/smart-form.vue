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
                        :input-model="dataCopy[key]"
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
        dataCopy: Object.assign({}, this.formData)
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
      },
      dateFormat: {
        type: String,
        default: 'MM-dd-yyyy'
      }
    },
    methods: {
      getType: function(value) {
        if (typeof(value) === typeof(true)) {
          return 'checkbox';
        } else if (value !== '' && !isNaN(value)) {
          return 'number';
        } else if (Date.parse(value)) {
          return 'date'
        } else {
          return 'text';
        }
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
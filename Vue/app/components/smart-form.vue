<template>
    <form :action="formAction" class="smart-form">
        <template v-for="(item, key) in formData">
            <bit-input
                    class="smart-form--input"
                    :stack-elements="true"
                    :input-name="key"
                    :input-type="getType(item)"
                    :label-text="formatFromCamelCase(key)"
                    :input-value="item"
                    :is-disabled="disabledInputs.includes(key)">
            </bit-input>
        </template>
    </form>
</template>

<script>
  import bitInput from './bit-input';
  export default {
    name: "smart-form",
    components: {
      bitInput
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
    .smart-form {
        > .smart-form--input {
            margin: 10px 20px;
        }
    }
</style>
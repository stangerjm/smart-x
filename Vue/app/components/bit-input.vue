<template>
    <div :class="[stackElements ? 'bit-input-stacked' : 'bit-input']">
        <label class="bit-input--label" :for="inputId ? inputId : randomId">{{labelText}}</label>
        <input class="bit-input--field"
               :id="inputId ? inputId : randomId"
               :type="inputType"
               :disabled="isDisabled"
               :max="numMax"
               :min="numMin"
               :name="inputName"
               :readonly="isReadonly"
               :required="isRequired"
               :value="inputValue">
    </div>
</template>

<script>
    export default {
        name: "bit-input",
        props: {
          inputType: {
            type: String,
            required: true
          },
          labelText: {
            type: String,
            required: true
          },
          stackElements: {
            type: Boolean,
            default: false
          },
          isDisabled: {
            type: Boolean,
            default: false
          },
          numMax: {
            type: Number
          },
          numMin: {
            type: Number
          },
          inputName: {
            type: String
          },
          inputId: {
            type: String
          },
          isReadonly: {
            type: Boolean,
            default: false
          },
          isRequired: {
            type: Boolean,
            default: false
          },
          inputValue: {

          }
        },
        data() {
          return {
            randomId: 'input-' + Math.random().toString(36).substr(2,9)
          }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../sass/templates";
    @import "../../../sass/variables";

    .bit-input {
        display: flex;
        align-items: center;
        margin: 10px;

        @media screen and (max-width: $break-xs) {
            flex-direction: column;
            align-items: flex-start;
        }

        &-stacked {
            @extend %flex-container;
            flex-direction: column;
            margin: 10px;
        }
    }

    .bit-input--label {
        margin: 10px 10px 10px 0;
        display: inline-block;
    }

    /// Styles different types of form inputs, namely input[type=text] and input[type=number].
    .bit-input--field {
        &:not([type = checkbox]) {
            padding: 0.5em;
            border: none;
            box-shadow: 1px 1px 4px inset;
            border-radius: 3px;
            min-height: 20px;
        }

        &[type = number] {
            max-width: 50px;
        }
    }
</style>
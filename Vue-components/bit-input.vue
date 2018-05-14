<template>
    <div :class="[stackElements ? 'bit-input-stacked' : 'bit-input']">
        <template v-if="inputType === 'checkbox'">
            <label class="bit-input--label" :for="inputName">{{labelText}}</label>
            <input class="bit-input--field"
                   :id="inputName"
                   :type="inputType"
                   :disabled="isDisabled"
                   :max="numMax"
                   :min="numMin"
                   :name="inputName"
                   :readonly="isReadonly"
                   :required="isRequired"
                   v-model="model"
                   value="true">
            <input type="hidden" value="false" :name="inputName">
        </template>
        <template v-else-if="inputType !== 'date'">
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
                    :value="inputValue"
                    v-model="model">
        </template>
        <template v-else>
            <label class="bit-input--label" :for="inputId ? inputId : randomId">{{labelText}}</label>
            <date-picker class="bit-input--field"
                         :id="inputId ? inputId : randomId"
                         v-model="model"
                         :name="inputName"
                         :readonly="isReadonly"
                         :required="isRequired"
                         :disabled="isDisabled"
                         type="date"
                         :format="dateFormat">
            </date-picker>
        </template>
    </div>
</template>

<script>
    import { DatePicker } from 'element-ui';
    import Vue from 'vue';
    import en from "element-ui/lib/locale/lang/en"
    import locale from 'element-ui/lib/locale'

    locale.use(en)

    Vue.use(DatePicker);

    export default {
        name: "bit-input",
        components: {
          DatePicker
        },
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

          },
          inputModel: {

          },
          dateFormat: {
            type: String
          }
        },
        data() {
          return {
            randomId: 'input-' + Math.random().toString(36).substr(2,9),
            // Setting inputModel to the a data property to avoid accidental overwriting of parent
            // See: https://vuejs.org/v2/guide/migration.html#Prop-Mutation-deprecated
            model: this.inputModel
          }
        }
    }
</script>

<style scoped lang="scss">
    @import "../sass/templates";
    @import "../sass/variables";

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
        &:not([type = checkbox]):not(.el-date-editor) {
            padding: 0.5em;
            border: none;
            box-shadow: 1px 1px 4px inset;
            border-radius: 3px;
            min-height: 35px;
        }

        &[type = number] {
            max-width: 50px;
        }

        &.el-date-editor {
            width: 100%;
        }
    }
</style>
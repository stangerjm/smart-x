import {mount} from 'vue-test-utils'
import smartForm from '../smart-form'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'
import Vue from "vue";

let formData = {
  id: 1,
  name: 'James',
  date: '1/1/2010',
  isActive: true
};

let disabledInputs = ['id'];

function typeValue(value) {
  if (value === 'true' || value === 'false') {
    return value === 'true';
  } else if (value !== '' && !isNaN(value)) {
    return parseInt(value);
  } else {
    return value;
  }
}

Vue.mixin({
  methods: {
    formatFromCamelCase: text => {
      return text
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (substr) => { return substr.toUpperCase(); });
    }
  }
});

function mountForm(props) {
  if (!props) {
    props = {
      propsData: {
        formAction: '/',
        formData: formData,
        disabledInputs: disabledInputs
      }
    }
  }

  return mount(smartForm, props);
}

describe('smart-form.vue', () => {
  it('has "smart-form" as a class value', () => {
    const wrapper = mountForm();
    expect(wrapper.vm.$el.className).toEqual('smart-form');
  });

  it('requires a string to be passed into a "formAction" property', () => {
    const wrapper = mountForm();
    let formActionProp = wrapper.vm.$options.props.formAction;

    expect(formActionProp.required).toBeTruthy();
    expect(formActionProp.type).toEqual(String);
  });

  it('requires an object to be passed into a "formData" property', () => {
    const wrapper = mountForm();
    let formDataProp = wrapper.vm.$options.props.formData;

    expect(formDataProp.required).toBeTruthy();
    expect(formDataProp.type).toEqual(Object);
  });

  it('disables any inputs with names found in the optional "disabledInputs" array property', () => {
    const wrapper = mountForm();
    let disabledInputsProp = wrapper.vm.$options.props.disabledInputs;

    expect(disabledInputsProp.type).toEqual(Array);

    let disabledInputElements = wrapper.findAll('input[disabled]');
    expect(disabledInputElements.length).toEqual(disabledInputs.length);

    for (let disabledInput of disabledInputs) {
      let results = disabledInputElements.wrappers.filter((input) => {
        return input.attributes().name === disabledInput
      });

      expect(results.length > 0).toBeTruthy();
    }
  });

  it('dynamically sets the type of each input field to the type of the associated data', () => {
    const wrapper = mountForm();
    let inputs = wrapper.findAll('input');

    let formDataValues = Object.values(formData);
    for (let input of inputs.wrappers) {
      let inputType = input.attributes().type;
      let inputValue = typeValue(input.element.value);
      let dataValue = formDataValues.find((element) => {
        return element === inputValue
      });

      let expectedType = typeof(dataValue);

      if(expectedType === 'boolean') {
        expectedType = 'checkbox';
      } else if (expectedType === 'string') {
        expectedType = 'text';
      }

      expect(inputType).toEqual(expectedType);
    }
  });
});
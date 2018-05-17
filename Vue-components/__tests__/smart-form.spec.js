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

let readonlyInputs = ['id'];
let formMethod = 'get';
let requiredInputs = ['id', 'name'];

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

let formTitle = 'Test';

function mountForm(props) {
  if (!props) {
    props = {
      propsData: {
        formAction: '/',
        formData: formData,
        readonlyInputs: readonlyInputs,
        formTitle: formTitle,
        formMethod: formMethod,
        requiredInputs: requiredInputs
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

  it('renders a title from a "formTitle" property, or "Form" if nothing is passed', () => {
    const wrapper = mountForm();
    let formTitleProp = wrapper.vm.$options.props.formTitle;

    expect(formTitleProp.type).toEqual(String);
    expect(formTitleProp.default).toEqual('Form');
    expect(wrapper.find('.smart-form--title').text()).toEqual(formTitle);
  });

  it('renders a form with a method from the optional string passed into a "formMethod" property', () => {
    const wrapper = mountForm();
    let formMethodProp = wrapper.vm.$options.props.formMethod;

    expect(formMethodProp.type).toEqual(String);
    expect(wrapper.vm.$el.getAttribute('method')).toEqual(formMethod);
  });

  it('marks any inputs with names found in the optional "readonlyInputs" array property as readonly', () => {
    const wrapper = mountForm();
    let readonlyInputsProp = wrapper.vm.$options.props.readonlyInputs;

    expect(readonlyInputsProp.type).toEqual(Array);

    let readonlyInputElements = wrapper.findAll('input[readonly]');
    expect(readonlyInputElements.length).toEqual(readonlyInputs.length);

    for (let readonlyInput of readonlyInputs) {
      let results = readonlyInputElements.wrappers.filter((input) => {
        return input.attributes().name === readonlyInput
      });

      expect(results.length > 0).toBeTruthy();
    }
  });

  it('marks any inputs with names found in the optional "requiredInputs" array property as required', () => {
    const wrapper = mountForm();
    let requiredInputsProp = wrapper.vm.$options.props.requiredInputs;

    expect(requiredInputsProp.type).toEqual(Array);

    let requiredInputElements = wrapper.findAll('input[required]');
    expect(requiredInputElements.length).toEqual(requiredInputs.length);

    for (let requiredInput of requiredInputs) {
      let results = requiredInputElements.wrappers.filter((input) => {
        return input.attributes().name === requiredInput
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

      //ignore the hidden inputs
      if (inputType === 'hidden') {
        continue;
      }

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

  it('has the same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(smartForm, {
      propsData: {
        formAction: '/',
        formData: formData,
        readonlyInputs: readonlyInputs,
        formTitle: formTitle,
        formMethod: formMethod
      }
    });
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) {
        throw new Error(err);
      }
      expect(str).toMatchSnapshot();
    });
  });

  it('can parse a JSON date formatted by the .NET MVC framework', () => {
    const wrapper = mountForm();

    let parseDate = wrapper.vm.parseJsonDate;

    expect(parseDate('\/Date(1000000000000)\/')).not.toBeNull();
    expect(parseDate('\/Date(1234656000000)\/')).not.toBeNull();
    expect(parseDate('\/Date(1198908717056)\/')).not.toBeNull();
  });
});
import {mount} from 'vue-test-utils'
import bitInput from '../bit-input'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'

function mountInput(props) {
  if (!props) {
    props = {
      propsData: {
        stackElements: false,
        inputType: 'text',
        labelText: 'Test'
      }
    }
  }

  return mount(bitInput, props);
}

describe('bit-input.vue', () => {
  it('has "bit-input" as a class value', () => {
    const wrapper = mountInput();
    expect(wrapper.vm.$el.className.includes('bit-input')).toBeTruthy();
  });

  it('requires a string to be passed into the inputType property', () => {
    let wrapper = mountInput();

    let inputTypeProp = wrapper.vm.$options.props.inputType;
    expect(inputTypeProp.type).toEqual(String);
    expect(inputTypeProp.required).toBeTruthy();
  });

  it('requires a string to be passed into the labelText property', () => {
    let wrapper = mountInput();

    let labelTextProp = wrapper.vm.$options.props.inputType;
    expect(labelTextProp.type).toEqual(String);
    expect(labelTextProp.required).toBeTruthy();
  });

  it('sets boolean property stackElements value to false by default', () => {
    let wrapper = mountInput();

    expect(wrapper.vm.$options.props.stackElements.type).toEqual(Boolean);
    expect(wrapper.vm.$options.props.stackElements.default).toEqual(false);
  });

  it('allows the HTML input attributes "disabled", "max", "min", "name", "readonly", "required", and "value" to be set', () => {
    let props = {
      inputType: 'text',
      labelText: 'test',
      isDisabled: true,
      numMax: 999,
      numMin: -999,
      inputName: 'test-input',
      isReadonly: true,
      isRequired: true,
      inputValue: 'test',
      inputId: 'testId'
    };

    let wrapper = mountInput({
      propsData: props
    });

    let input = wrapper.vm.$el.querySelector('.bit-input--field');

    expect(input.disabled).toEqual(props.isDisabled);
    expect(parseInt(input.getAttribute('max'))).toEqual(props.numMax);
    expect(parseInt(input.getAttribute('min'))).toEqual(props.numMin);
    expect(input.required).toEqual(props.isRequired);
    expect(input.value).toEqual(props.inputValue);
    expect(input.name).toEqual(props.inputName);
    expect(input.readOnly).toEqual(props.isReadonly);
    expect(input.id).toEqual(props.inputId);
  });

  it('stacks vertically if stackElements property is true', () => {
    let wrapper = mountInput({
      propsData: {
        stackElements: true,
        inputType: 'text',
        labelText: 'test'
      }
    });

    expect(wrapper.vm.$el.getAttribute('class').includes('bit-input-stacked')).toBeTruthy();
  });

  it('sets the same unique id for the input[id] and form[for] attributes', () => {
    let wrapper = mountInput();
    let root = wrapper.vm.$el;

    let labelForAttr = root.querySelector('.bit-input--label').getAttribute('for');
    let inputId = root.querySelector('.bit-input--field').getAttribute('id');

    expect(inputId).toEqual(labelForAttr);
  });

  it('has same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(bitInput, {
      propsData: {
        stackElements: true,
        inputType: 'text',
        labelText: 'Test'
      }
    });

    wrapper.setData({inputId: 'input-id'});

    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) {
        throw new Error(err);
      }
      expect(str).toMatchSnapshot();
    });
  });
});
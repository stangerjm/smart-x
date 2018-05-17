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
        labelText: 'Test',
        inputName: 'test'
      }
    }
  }

  return mount(bitInput, props);
}

describe('bit-input.vue', () => {
  it('has "bit-input" as a class value', () => {
    const wrapper = mountInput();
    expect(wrapper.vm.$el.className.startsWith('bit-input')).toBeTruthy();
  });

  it('has "bit-input-stacked" as a class value if true is passed to the boolean "stackElements" property', () => {
    const wrapper = mountInput({
      propsData: {
        stackElements: true,
        inputType: 'text',
        labelText: 'test',
        inputName: 'test'
      }
    });

    expect(wrapper.vm.$options.props.stackElements.type).toEqual(Boolean);
    expect(wrapper.vm.$options.props.stackElements.default).toEqual(false);
    expect(wrapper.vm.$el.className).toEqual('bit-input-stacked');
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

  it('sets the same unique id for the input[id] and form[for] attributes', () => {
    let wrapper = mountInput();
    let root = wrapper.vm.$el;

    let labelForAttr = root.querySelector('.bit-input--label').getAttribute('for');
    let inputId = root.querySelector('.bit-input--field').getAttribute('id');

    expect(inputId).toEqual(labelForAttr);
  });

  describe('input[type = date]', () => {
    it('renders a date-picker when the value "date" is passed to the "inputType" property', () => {
      let wrapper = mountInput({
        propsData: {
          inputType: 'date',
          inputName: 'Test',
          labelText: 'Label',
          stackElements: false
        }
      });

      expect(wrapper.vm.$el.querySelector('.bit-input--field').tagName).toEqual('DATE-PICKER');
    });
  });

  describe('input[type = text]', () => {
    it('renders a text input when the value "text" is passed to the "inputType" property', () => {
      //mountInput sets the inputType to "text" by default
      let wrapper = mountInput();

      let textInput = wrapper.vm.$el.querySelector('.bit-input--field');
      expect(textInput.tagName).toEqual('INPUT');
      expect(textInput.type).toEqual('text');
    });

    it('allows the HTML input attributes "disabled", "name", "readonly", "required", to be set', () => {
      let props = {
        inputType: 'text',
        labelText: 'test',
        isDisabled: true,
        inputName: 'test-input',
        isReadonly: true,
        isRequired: true,
        inputId: 'testId'
      };

      let wrapper = mountInput({
        propsData: props
      });

      let input = wrapper.vm.$el.querySelector('.bit-input--field');

      expect(input.disabled).toEqual(props.isDisabled);
      expect(input.required).toEqual(props.isRequired);
      expect(input.name).toEqual(props.inputName);
      expect(input.readOnly).toEqual(props.isReadonly);
      expect(input.id).toEqual(props.inputId);
    });
  });

  describe('input[type = checkbox]', () => {
    it('renders a checkbox input when the value "checkbox" is passed to the "inputType" property', () => {
      let wrapper = mountInput({
        propsData: {
          inputType: 'checkbox',
          inputName: 'Test',
          labelText: 'Label',
          stackElements: false
        }
      });

      let numberInput = wrapper.vm.$el.querySelector('.bit-input--field');
      expect(numberInput.tagName).toEqual('INPUT');
      expect(numberInput.type).toEqual('checkbox');
    });

    it('allows the HTML input attributes "disabled", "name", and "readonly" to be set', () => {
      let props = {
        inputType: 'text',
        labelText: 'test',
        isDisabled: true,
        inputName: 'test-input',
        isReadonly: true,
        inputId: 'testId'
      };

      let wrapper = mountInput({
        propsData: props
      });

      let input = wrapper.vm.$el.querySelector('.bit-input--field');

      expect(input.disabled).toEqual(props.isDisabled);
      expect(input.name).toEqual(props.inputName);
      expect(input.readOnly).toEqual(props.isReadonly);
      expect(input.id).toEqual(props.inputId);
    });
  });

  describe('input[type = number]', () => {
    it('renders a number input when the value "number" is passed to the "inputType" property', () => {
      let wrapper = mountInput({
        propsData: {
          inputType: 'number',
          inputName: 'Test',
          labelText: 'Label',
          stackElements: false
        }
      });

      let numberInput = wrapper.vm.$el.querySelector('.bit-input--field');
      expect(numberInput.tagName).toEqual('INPUT');
      expect(numberInput.type).toEqual('number');
    });

    it('allows the HTML input attributes "disabled", "max", "min", "name", "readonly", "required", to be set', () => {
      let props = {
        inputType: 'text',
        labelText: 'test',
        isDisabled: true,
        numMax: 999,
        numMin: -999,
        inputName: 'test-input',
        isReadonly: true,
        isRequired: true,
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
      expect(input.name).toEqual(props.inputName);
      expect(input.readOnly).toEqual(props.isReadonly);
      expect(input.id).toEqual(props.inputId);
    });
  });

  it('has same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(bitInput, {
      propsData: {
        stackElements: true,
        inputType: 'text',
        labelText: 'Test',
        inputName: 'test'
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
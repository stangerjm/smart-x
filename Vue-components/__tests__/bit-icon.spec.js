import {mount} from 'vue-test-utils'
import bitIcon from '../bit-icon'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'

let allowedTypes = ['user', 'sort'];

function mountIcon(props) {
  if (!props) {
    props = {
      propsData: {
        iconType: 'user'
      }
    }
  }

  return mount(bitIcon, props);
}

describe('bit-icon.vue', () => {
  it('has a class that begins with "bit-icon"', () => {
    const wrapper = mountIcon();

    expect(wrapper.vm.$el.className.startsWith('bit-icon')).toBeTruthy();
  });

  it('requires a string to be passed into the iconType property', () => {
    const wrapper = mountIcon();

    let iconTypeProp = wrapper.vm.$options.props.iconType;

    expect(iconTypeProp.type).toEqual(String);
    expect(iconTypeProp.required).toBeTruthy();
  });

  it('only allows specified values to be passed into the iconType property', () => {
    const wrapper = mountIcon();

    for (let type of allowedTypes) {
      expect(wrapper.vm.getClass(type)).toBe('bit-icon-' + type);
    }

    expect(wrapper.vm.getClass(undefined)).toBe('bit-icon-error');
    expect(wrapper.vm.getClass('invalid-value')).toBe('bit-icon-error');
  });

  it('has same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(bitIcon, {
      propsData: {
        iconType: 'user'
      }
    });

    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) {
        throw new Error(err);
      }
      expect(str).toMatchSnapshot();
    });
  });
});
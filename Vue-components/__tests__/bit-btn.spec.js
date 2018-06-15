import {mount} from 'vue-test-utils'
import bitBtn from '../components/bit-btn'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'

describe('BitButton.vue', () => {
  it('class begins with "bit-btn"', () => {
    const wrapper = mount(bitBtn);
    expect(wrapper.vm.$el.className.startsWith('bit-btn')).toBeTruthy();
  });

  it('allows a string to be passed into a "btnStyle" property and correctly renders the appropriate style', () => {
    const wrapper = mount(bitBtn);
    expect(wrapper.vm.$options.props.btnStyle.type).toEqual(String);

    let allowedValues = ['search', 'add', 'reset', 'details', 'expand', 'delete', 'edit', 'datepicker', 'exit', 'plainSearch', 'plainExit'];
    for (let variation of allowedValues) {
      expect(wrapper.vm.getClass(variation)).toBe('bit-btn-' + variation);
    }

    expect(wrapper.vm.getClass(undefined)).toBe('bit-btn');
    expect(wrapper.vm.getClass('invalidValue')).toBe('bit-btn');
  });

  it('renders as a link if isLink property is true', () => {
    const wrapper = mount(bitBtn);
    expect(wrapper.vm.$options.props.isLink.type).toEqual(Boolean);

    wrapper.setProps({'isLink': true});
    expect(wrapper.vm.$el.tagName).toBe('A');
  });

  it('allows text to be passed in as button or link text', () => {
    let msg = 'TEST';
    let content = '<span>' + msg + '</span>';

    const btn = mount(bitBtn, {
      slots: {
        default: content
      }
    });

    expect(btn.find('span').text()).toBe(msg);

    const link = mount(bitBtn, {
      slots: {
        default: content
      },
      isLink: true
    });

    expect(link.find('span').text()).toBe(msg);
  });

  it('has same HTML structure', () => {
    const btnText = 'Click';
    const renderer = createRenderer();
    const wrapper = shallow(bitBtn, {propsData: {btnText}});
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) {
        throw new Error(err);
      }
      expect(str).toMatchSnapshot();
    });
  });
});
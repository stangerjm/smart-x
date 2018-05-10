import {mount} from 'vue-test-utils'
import smartAccordion from '../smart-accordion'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'

function mountSmartAccordion(props) {
  if(!props) {
    props = {
      propsData: {
        //default props go here
      }
    }
  }

  return mount(smartAccordion, props);
}

describe('smart-accordion.vue', () => {
  it('has "smart-accordion" as a class value', () => {
    const wrapper = mountSmartAccordion();
    expect(wrapper.vm.$el.className).toBe('smart-accordion');
  });

  it('has a string "title" property with a default value of: "Click to expand"', () => {
    const wrapper = mountSmartAccordion();
    let defaultTitle = 'Click to expand';
    let titleProp = wrapper.vm.$options.props.title;
    expect(titleProp.type).toEqual(String);
    expect(titleProp.default).toEqual(defaultTitle);
    expect(wrapper.vm.$el.querySelector('.smart-accordion--label').textContent).toEqual(defaultTitle);
  });

  it('toggles drop-down when clicked', () => {
    const wrapper = mountSmartAccordion();
    let toggleButton = wrapper.find('.smart-accordion--toggle');
    toggleButton.trigger('click');
    expect(toggleButton.element.checked).toBeTruthy();

    toggleButton.trigger('click');
    expect(toggleButton.element.checked).toBeFalsy();
  });

  it('has an input with a unique id', () => {
    let accordionId1 = mountSmartAccordion().vm.$el.querySelector('.smart-accordion--toggle').id;
    let accordionId2 = mountSmartAccordion().vm.$el.querySelector('.smart-accordion--toggle').id;

    expect(accordionId1).not.toEqual(accordionId2);
  });

  it('allows content to be passed in as the drop-down portion', () => {
    let msg = 'TEST';
    let content = '<span>' + msg + '</span>';

    const wrapper = mount(smartAccordion, {
      slots: {
        default: content
      }
    });

    expect(wrapper.find('.smart-accordion--content span').text()).toBe(msg);
  });

  it('has same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(smartAccordion, {title: 'Test'});
    wrapper.setData({inputId: 'input-id'});

    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) {
        throw new Error(err);
      }
      expect(str).toMatchSnapshot();
    });
  });
});
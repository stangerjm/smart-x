import {mount} from 'vue-test-utils'
import smartModal from '../components/smart-modal'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'

function mountModal(props) {
  if (!props) {
    props = {
      propsData: {
        modalTitle: 'Test Modal'
      }
    }
  }

  return mount(smartModal, props);
}

describe('smart-modal.vue', () => {
  it('has "smart-modal" as a class value', () => {
    const wrapper = mountModal();

    expect(wrapper.vm.$el.className).toEqual('smart-modal');
  });

  it('requries a string to be passed into a "modalTitle" property', () => {
    const wrapper = mountModal();
    let modalTitleProp = wrapper.vm.$options.props.modalTitle;

    expect(modalTitleProp.type).toEqual(String);
    expect(modalTitleProp.required).toBeTruthy();
  });

  it('allows content to be passed into a "main" and "footer" slot', () => {
    let msg = 'TEST';
    let mainContent = '<h1>' + msg + '</h1>';
    let footerContent = '<span>' + msg + '</span>';

    const wrapper = mount(smartModal, {
      propsData: {
        modalTitle: 'Test'
      },
      slots: {
        main: mainContent,
        footer: footerContent
      }
    });

    let main = wrapper.vm.$el.querySelector('.smart-modal--content > .smart-modal--body');
    let footer = wrapper.vm.$el.querySelector('.smart-modal--content > .smart-modal--footer');

    expect(main.innerHTML).toEqual(mainContent);
    expect(footer.innerHTML).toEqual(footerContent);
  });

  it('will close if the "smart-modal--close" button is clicked, or if the escape button is hit', () => {
    const wrapper = mountModal();

    //simulate pressing escape button
    wrapper.trigger('keydown', {
      keyCode: 27
    });

    expect(wrapper.vm.$el.style.display).toEqual('none');

    wrapper.vm.open();

    expect(wrapper.vm.$el.style.display).toEqual('');

    //simulate clicking the button
    wrapper.vm.close();

    expect(wrapper.vm.$el.style.display).toEqual('none');
  });

  it('has the same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(smartModal, {
      propsData: {
        modalTitle: 'Test'
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
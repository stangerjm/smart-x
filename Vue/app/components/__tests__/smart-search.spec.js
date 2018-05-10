import {mount} from 'vue-test-utils'
import smartSearch from '../smart-search'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'

function mountSearch(props) {
  if(!props) {
    props = {
      propsData: {
        action: '/',
        method: 'get',
        type: 'fancy',
        formTitle: 'Region'
      }
    }
  }

  return mount(smartSearch, props);
}

describe('smart-search.vue', () => {
  it('has "smart-search" as a class value', () => {
    const wrapper = mountSearch();
    expect(wrapper.vm.$el.className).toEqual('smart-search');
  });

  it('requires string values to be passed in to all props', () => {
    const wrapper = mountSearch();
    let props = wrapper.vm.$options.props;

    for (let prop in props) {
      expect(props[prop].required).toBeTruthy();
      expect(props[prop].type).toEqual(String);
    }
  });

  it('toggles when "smart-search--btnSearch" button is clicked', () => {
    const wrapper = mountSearch();
    let searchBtn = wrapper.find('.smart-search--btnSearch');
    let exitBtn = wrapper.find('.smart-search--btnExit');

    searchBtn.trigger('click');
    expect(searchBtn.element.style.display).toEqual('none');
    expect(exitBtn.element.style.display).not.toEqual('none');
    expect(wrapper.find('.smart-search--fieldContainer').element.className.includes('is-hidden')).toBeFalsy();

     exitBtn.trigger('click');
     expect(searchBtn.element.style.display).not.toEqual('none');
     expect(exitBtn.element.style.display).toEqual('none');
     expect(wrapper.find('.smart-search--fieldContainer').element.className.includes('is-hidden')).toBeTruthy();
  });

  it('has same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(smartSearch, {
      propsData: {
        action: '/',
        method: 'get',
        formTitle: 'Region'
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
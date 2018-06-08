import {mount} from 'vue-test-utils'
import blockNavList from '../block-navList'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'

let navItems = [
  {'itemTitle': 'Home', 'linkPath': '#'},
  {'itemTitle': 'WSP', 'linkPath': '#'},
  {
    'itemTitle': 'More',
    'linkPath': '#',
    'inlineItems': [{'itemTitle': 'Be a Trooper', 'linkPath': '#'}, {'itemTitle': 'Media', 'linkPath': '#'}]
  }
];

function mountNavList(props) {
  if (!props) {
    props = {
      propsData: {
        listItems: navItems
      }
    };
  }

  return mount(blockNavList, props);
}

describe('block-navList.vue', () => {
  it('has "block-navList" as a class value', () => {
    const wrapper = mountNavList();
    expect(wrapper.vm.$el.className).toBe('block-navList');
  });

  it('requires items to be passed in', () => {
    const wrapper = mountNavList();
    expect(wrapper.vm.$options.props.listItems.required).toBeTruthy();
  });

  it('correctly displays all of the items passed in with associated drop-down lists if needed', () => {
    const wrapper = mountNavList();
    let listItems = wrapper.findAll('ul[class*=block-navList--items] > li');

    expect(listItems.length).toEqual(navItems.length);

    for (let [index, listItem] of listItems.wrappers.entries()) {
      let link = listItem.find('.bit-link');
      expect(link.text()).toEqual(navItems[index].itemTitle);
      expect(link.element.getAttribute('href')).toEqual(navItems[index].linkPath);

      //Check that a dropList component is rendered if there are inline items
      if(navItems[index].inlineItems) {
        expect(link.element.nextElementSibling.className).toEqual('bit-dropList');
        expect(link.element.className.includes('sublist-container')).toBeTruthy();
      } else {
        //Ensure no inline items render if there are none
        expect(link.element.nextElementSibling).toBeNull();
        expect(link.element.className.includes('sublist-container')).toBeFalsy();
      }
    }
  });

  it('toggles display when expand button is clicked', () => {
    const wrapper = mountNavList();
    let expandBtn = wrapper.find('.block-navList--expand');
    expandBtn.trigger('click');
    expect(wrapper.vm.$el.querySelector('.nav-show')).not.toBeNull();
  });

  it('has same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(blockNavList, {
      propsData: {
        items: {
          navItems
        }
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
import {mount} from 'vue-test-utils'
import bitDropList from '../bit-dropList'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'

let dropItems = [
    {
      'itemTitle':'Home',
      'linkPath':'#'
    },
    {
      'itemTitle':'WSP',
      'linkPath':'#'
    },
    {
      'itemTitle':'About',
      'linkPath':'#'
    }
  ];

function mountDropList(props) {
  if (!props) {
    props = {
      propsData: {
        dropItems: dropItems
      }
    }
  }

  return mount(bitDropList, props);
}

describe('bit-dropList.vue', () => {
  it('has "bit-dropList" as a class value', () => {
    const wrapper = mountDropList();
    expect(wrapper.vm.$el.className).toBe('bit-dropList');
  });

  it('requires an array to be passed in to the dropItems property.', () => {
    const wrapper = mountDropList();

    let dropItemsProp = wrapper.vm.$options.props.dropItems;
    expect(dropItemsProp.type).toEqual(Array);
    expect(dropItemsProp.required).toBeTruthy();
  });

  it('renders all of the items passed in correctly.', () => {
    const wrapper = mountDropList();

    let dropListItems = wrapper.findAll('a');
    for(let dropItem of dropListItems.wrappers) {
      let itemText = dropItem.element.innerHTML;
      let itemHref = dropItem.element.getAttribute('href');

      let found = dropItems.find((item) => {
        return item.itemTitle === itemText
      });

      expect(found).not.toBeNull();
      expect(found.linkPath).toEqual(itemHref);
    }
  });

  it('has same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(bitDropList, {
      propsData: {
        dropItems: dropItems
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
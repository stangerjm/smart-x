import {mount} from 'vue-test-utils'
import stackTableCollapsible from '../components/stack-tableCollapsible'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'
import Vue from "vue";

let tableData = [
  {
    'id': 1,
    'code': '01',
    'name': 'test',
    'testProp': 'test',
    'anotherProp': 'more',
    'detailsContext': 'Manufacturer',
    'deleteContext': 'County'
  },
  {
    'id': 2,
    'code': '02',
    'name': 'SW Washington',
    'testProp': 'test',
    'anotherProp': 'more',
    'editContext': 'Bottle',
    'deleteContext': 'Google'
  },
  {
    'id': 3,
    'code': '03',
    'name': 'Central Washington',
    'testProp': 'test',
    'anotherProp': 'more',
    'editContext': 'Else',
    'detailsContext': 'Test'
  }
];

Vue.mixin({
  methods: {
    formatFromCamelCase: text => {
      return text
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (substr) => {
          return substr.toUpperCase();
        });
    }
  }
});

function mountTableCollapsible(props) {
  if (!props) {
    props = {
      propsData: {
        tableData: tableData,
        defaultContext: 'Region',
        title: 'Test'
      }
    }
  }

  return mount(stackTableCollapsible, props);
}

describe('stack-tableCollapsible.vue', () => {
  it('has "stack-tableCollapsible" as a class value', () => {
    const wrapper = mountTableCollapsible();

    expect(wrapper.vm.$el.className).toEqual('stack-tableCollapsible');
  });

  it('has the same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(stackTableCollapsible, {
      propsData: {
        tableData: tableData,
        defaultContext: 'Region',
        title: 'Test'
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
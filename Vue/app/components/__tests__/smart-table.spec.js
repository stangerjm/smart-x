import {mount} from 'vue-test-utils'
import smartTable from '../smart-table'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'
import Vue from "vue";

Vue.mixin({
  methods: {
    formatFromCamelCase: text => {
      return text
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (substr) => { return substr.toUpperCase(); });
    }
  }
});

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

let defaultContext = 'Region';

function mountTable(props) {
  if(!props) {
    props = {
      propsData: {}
    }
  }

  props.propsData["tableData"] = tableData;
  props.propsData["defaultContext"] = defaultContext;

  return mount(smartTable, props);
}

describe('SmartTable.vue', () => {
  it('allows unrequired properties to be undefined', () => {
    const wrapper = mountTable();

    expect(wrapper.vm).not.toBeNull();
  });

  it('renders all action buttons by default', () => {
    const wrapper = mountTable();

    expect(wrapper.contains('a.bit-btn-details')).toBe(true);
    expect(wrapper.contains('a.bit-btn-edit')).toBe(true);
    expect(wrapper.contains('a.bit-btn-delete')).toBe(true);
  });

  it('will not render details action if allowDetails is false', () => {
    let props = {
      propsData: {
        allowDetails: false
      }
    };

    const wrapper = mountTable(props);

    expect(wrapper.contains('a.bit-btn-details')).toBe(false);
  });

  it('will not render edit action if allowEdit is false', () => {
    let props = {
      propsData: {
        allowEdit: false
      }
    };

    const wrapper = mountTable(props);

    expect(wrapper.contains('a.bit-btn-edit')).toBe(false);
  });

  it('will not render delete action if allowDelete is false', () => {
    let props = {
      propsData: {
        allowDelete: false
      }
    };

    const wrapper = mountTable(props);

    expect(wrapper.contains('a.bit-btn-delete')).toBe(false);
  });

  it('will set the correct URL for each edit action link to perform the correct action', () => {
    const wrapper = mountTable();

    let editLinks = wrapper.findAll('a.bit-btn-edit');

    let i = 0;
    for (let editLink of editLinks.wrappers) {
      let record = tableData[i];
      let recordContext = record.editContext ? record.editContext : defaultContext;
      expect(editLink.element.getAttribute('href')).toEqual('/' + recordContext + '/Edit/' + record.id);
      i++;
    }
  });

  it('will set the correct URL for each delete action link to perform the correct action', () => {
    const wrapper = mountTable();

    let deleteLinks = wrapper.findAll('a.bit-btn-delete');

    let i = 0;
    for (let deleteLink of deleteLinks.wrappers) {
      let record = tableData[i];
      let recordContext = record.deleteContext ? record.deleteContext : defaultContext;
      expect(deleteLink.element.getAttribute('href')).toEqual('/' + recordContext + '/Delete/' + record.id);
      i++;
    }
  });

  it('will set the correct URL for each details action link to perform the correct action', () => {
    const wrapper = mountTable();

    let detailsLinks = wrapper.findAll('a.bit-btn-details');

    let i = 0;
    for (let detailsLink of detailsLinks.wrappers) {
      let record = tableData[i];
      let recordContext = record.detailsContext ? record.detailsContext : defaultContext;
      expect(detailsLink.element.getAttribute('href')).toEqual('/' + recordContext + '/Details/' + record.id);
      i++;
    }
  });

  it('has same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(smartTable, {
      propsData: {
        tableData: tableData,
        defaultContext: defaultContext
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
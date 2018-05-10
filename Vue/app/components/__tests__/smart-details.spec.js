import {mount} from 'vue-test-utils'
import smartDetails from '../smart-details'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'
import Vue from "vue";

let detailData = {
  id: 1,
  technicianIdentifier: 'DYNAT0001',
  technicianName: 'CHRISTOPHER IRWIN WALKER',
  manufacturerName: 'DYNASAFE INC',
  serviceCenterName: 'MARLBURG AND WESSON',
  driverLicenseNumber: 'WALKECR577DU',
  DriverLicenseState: 'WA',
  phone: '(421) 342-6532',
  email: 'CWalker@MAndW.net',
  birthDate: '03/01/1965',
  mobileTechnician: true,
  shopManager: false,
  deactivationDateNotes: 'It is good.',
  createdBy: 'JAMES, STANGER',
  createdDate: '04/22/2018 22:39',
  updatedBy: 'JAMES, STANGER',
  updatedDate: '',
  childRecords: [
    {
      id: 3,
      name: 'childTest',
      centerName: 'STANGERJM225',
      phone: '3604859925'
    },
    {
      id: 5,
      name: 'childTest2',
      centerName: 'JMST225',
      phone: '3604852599'
    },
    {
      id: 28,
      name: 'childTest3',
      centerName: 'STANGER225',
      phone: '4859925360'
    },
  ],
  associatedRecords: [
    {
      id: 2,
      manufacturerName: 'associatedTest',
      technicianName: 'JM225STANGER',
      email: 'jamesstanger@gmail.com'
    },
    {
      id: 8,
      manufacturerName: 'associatedTest2',
      technicianName: '225JMST',
      email: 'james@gmail.com'
    },
    {
      id: 39,
      manufacturerName: 'associatedTest3',
      technicianName: 'STANGER225JMST',
      email: 'stanger@gmail.com'
    }
  ]
};

Vue.mixin({
  methods: {
    formatFromCamelCase: text => {
      return text
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (substr) => { return substr.toUpperCase(); });
    }
  }
});

function isNumeric(value) {
  return value !== '' && !isNaN(value);
}

function mountSmartDetails(props) {
  if(!props) {
    props = {
      propsData: {
        detailData: detailData
      }
    }
  }

  return mount(smartDetails, props);
}

describe('smart-details.vue', () => {
  it('has "smart-details" as a class value', () => {
    const wrapper = mountSmartDetails();
    expect(wrapper.vm.$el.className).toEqual('smart-details');
  });

  it('requires an object to be passed in to a detailData property', () => {
    const wrapper = mountSmartDetails();
    let detailDataProp = wrapper.vm.$options.props.detailData;

    expect(detailDataProp.required).toBeTruthy();
    expect(detailDataProp.type).toEqual(Object);
  });

  it('will render a title if a string is passed into a title property, or the string "Details" if nothing is passed', () => {
    let titleValue = 'Test';
    const wrapper = mountSmartDetails();
    let titleProp = wrapper.vm.$options.props.title;

    expect(titleProp.type).toEqual(String);
    expect(wrapper.find('.smart-details--heading').text()).toEqual('Details');

    wrapper.setProps({title: titleValue});
    expect(wrapper.find('.smart-details--heading').text()).toEqual(titleValue);
  });

  it('will render details in columns according to the number passed into the detailsPerColumn property, or in columns of 8 if nothing is passed', () => {
    let detailsPerColumn = 10;
    const wrapper = mountSmartDetails({
      propsData: {
        detailData: detailData,
        detailsPerColumn: detailsPerColumn
      }
    });

    //check default option
    expect(wrapper.vm.$options.props.detailsPerColumn.type).toEqual(Number);
    expect(wrapper.vm.$options.props.detailsPerColumn.default).toEqual(8);

    //test when number is passed in
    let detailColumns = wrapper.vm.detailColumns;
    for (let [index, detailColumn] of detailColumns.entries()) {
      //don't check the last column, as it may be less than eight
      if (index !== detailColumns.length - 1) {
        expect(Object.keys(detailColumn).length).toEqual(detailsPerColumn);
      } else {
        //last column may be eight or less
        expect(Object.keys(detailColumn).length).toBeLessThanOrEqual(detailsPerColumn);
      }
    }

    //expect(wrapper.find('.smart-details--list').element.style.width).toEqual(100 / detailColumns.length + '%');
  });

  it('correctly renders all items passed in', () => {
    const wrapper = mountSmartDetails();
    let columns = wrapper.findAll('.smart-details--list');

    expect(columns.length).toEqual(wrapper.vm.detailColumns.length);

    for (let [i, column] of columns.wrappers.entries()) {
      let detailColumn = wrapper.vm.detailColumns[i];

      for (let [j, row] of column.element.childNodes.entries()) {
        let actualKey = row.firstChild;
        let expectedKey = Object.keys(detailColumn)[j];
        let value = row.lastChild;
        let actualValue;

        if (value.querySelector('input')) {
          actualValue = value.querySelector('input').checked;
        } else if(isNumeric(value.textContent)) {
          actualValue = parseInt(value.textContent);
        } else {
          actualValue = value.textContent;
        }

        expect(actualKey.textContent).toEqual(wrapper.vm.formatFromCamelCase(expectedKey));
        expect(actualValue).toEqual(detailColumn[expectedKey]);
      }
    }
  });

  it('has same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(smartDetails, {
      propsData: {
        detailData: detailData,
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
import {mount} from 'vue-test-utils'
import blockMultiSelect from '../block-multiSelect'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'

let optionsData = [
  {
    id: 1,
    name: 'USA',
    locations: [
      {place: 'Washington'},
      {place: 'Oregon'},
      {place: 'California'}
    ]
  },
  {
    id: 2,
    name: 'Japan',
    locations: [
      {place: 'Kyoto'},
      {place: 'Osaka'},
      {place: 'Uwajima'}
    ]
  }
];

function mountMultiSelect(props) {
  if (!props) {
    props = {
      propsData: {
        optionsData: optionsData,
        parentTitle: 'TestParent',
        childTitle: 'TestChild',
        parentDisplayKey: 'name',
        childDisplayKey: 'place'
      }
    }
  }

  return mount(blockMultiSelect, props);
}

describe('block-multiSelect.vue', () => {
  it('has "block-multiSelect" as a class value', () => {
    const wrapper = mountMultiSelect();
    expect(wrapper.vm.$el.className).toEqual('block-multiSelect');
  });

  it('requires an array to be passed in to the optionsData property', () => {
    const wrapper = mountMultiSelect();
    let optionsDataProp = wrapper.vm.$options.props.optionsData;
    expect(optionsDataProp.required).toBeTruthy();
    expect(optionsDataProp.type).toEqual(Array);
  });

  it('requires a string to be passed in to the parentTitle, childTitle, parentDisplayKey, and childDisplayKey properties', () => {
    const wrapper = mountMultiSelect();
    let parentTitleProp = wrapper.vm.$options.props.parentTitle;
    let parentKeyProp = wrapper.vm.$options.props.parentDisplayKey;

    let childTitleProp = wrapper.vm.$options.props.childTitle;
    let childKeyProp = wrapper.vm.$options.props.childDisplayKey;

    expect(parentTitleProp.required).toBeTruthy();
    expect(parentTitleProp.type).toEqual(String);
    expect(parentKeyProp.required).toBeTruthy();
    expect(parentKeyProp.type).toEqual(String);

    expect(childTitleProp.required).toBeTruthy();
    expect(childTitleProp.type).toEqual(String);
    expect(childKeyProp.required).toBeTruthy();
    expect(childKeyProp.type).toEqual(String);
  });

  it('has a unique id for both select elements that matches the associated label', () => {
    const wrapper = mountMultiSelect();

    let selectParent = wrapper.find('.block-multiSelect--parent');
    let selectParentLabel = selectParent.element.previousElementSibling;

    let selectChild = wrapper.find('.block-multiSelect--child');
    let selectChildLabel = selectChild.element.previousElementSibling;

    expect(selectParent.element.id).toEqual(selectParentLabel.getAttribute('for'));
    expect(selectChild.element.id).toEqual(selectChildLabel.getAttribute('for'));
  });

  it('correctly renders each object and its associated options', () => {
    const wrapper = mountMultiSelect({
      propsData: {
        optionsData: optionsData,
        parentTitle: 'TestParent',
        childTitle: 'TestChild',
        parentDisplayKey: 'name',
        childDisplayKey: 'place'
      }
    });

    let selectParent = wrapper.find('.block-multiSelect--parent');
    let selectChild = wrapper.find('.block-multiSelect--child');

    //filter function for filtering out results that are not options and are disabled
    let filterOptions = (element) => {
      return !element.disabled && element.tagName === 'OPTION';
    };

    //filter children with above filter function
    let parentOptions = [...selectParent.element.childNodes].filter(filterOptions);

    for (let [i, option] of parentOptions.entries()) {
      expect(option.textContent).toEqual(optionsData[i].name);

      //click the parent option to populate child options
      option.click();

      //filter children with above filter function
      let childOptions = [...selectChild.element.childNodes].filter(filterOptions);
      for (let [j, childOption] of childOptions.entries()) {
        expect(childOption.textContent).toEqual(optionsData[i].locations[j]);
      }
    }
  });

  it('has same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(blockMultiSelect, {
      propsData: {
        optionsData: optionsData,
        parentTitle: 'TestParent',
        childTitle: 'TestChild',
        parentDisplayKey: 'name',
        childDisplayKey: 'place'
      }
    });

    wrapper.setData({inputId: 'input-id'});

    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) {
        throw new Error(err);
      }
      expect(str).toMatchSnapshot();
    });
  });
});
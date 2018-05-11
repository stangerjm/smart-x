import {mount} from 'vue-test-utils'
import blockActionContainer from '../block-actionContainer'
import {createRenderer} from 'vue-server-renderer'

function mountActionContainer(props) {
  if(!props) {
    props = {
      propsData: {}
    }
  }

  if(!props.propsData['itemId']) {
    props.propsData['itemId'] = 1;
  }

  props.propsData['defaultCtx'] = "Region";

  return mount(blockActionContainer, props);
}

describe('block-actionContainer.vue', () => {
  it('has "block-actionContainer" as a class value', () => {
    const wrapper = mountActionContainer();
    expect(wrapper.vm.$el.className).toBe('block-actionContainer');
  });

  it('requires the "defautltCtx" and "itemId" properties to be passed in', () => {
    const wrapper = mountActionContainer();
    let properties = wrapper.vm.$options.props;
    expect(properties.defaultCtx.required).toBeTruthy();
    expect(properties.itemId.required).toBeTruthy();
  });

  it('only renders a button when the corresponding property is set to true', () => {
    const wrapper = mountActionContainer({
      propsData: {
        deleteBtn: true,
        editBtn: true,
        detailsBtn: true
      }
    });

    let buttonTypes = ["delete", "edit", "details"];

    for(let btnType of buttonTypes) {
      expect(wrapper.contains('a.bit-btn-' + btnType)).toBe(true);

      let propContainer = {};
      let falsePropKey = btnType + "Btn";
      propContainer[falsePropKey] = false;

      wrapper.setProps(propContainer);

      expect(wrapper.contains('a.bit-btn-' + btnType)).toBe(false);
    }
  });

  it('builds the correct href attribute when explicit values are passed in', () => {
    let itemId = 3;
    let ctxList = {
      edit: "Device",
      details: "Manufacturer",
      delete: "County"
    };
    const wrapper = mountActionContainer({
      propsData: {
        itemId: itemId,
        editCtx: ctxList.edit,
        detailsCtx: ctxList.details,
        deleteCtx: ctxList.delete
      }
    });

    let expectedCtx;
    for(let ctx in ctxList) {
      expectedCtx = "/" + ctxList[ctx] + "/" + ctx.charAt(0).toUpperCase() + ctx.substr(1) + "/" + itemId;
      expect(wrapper.find('a.bit-btn-' + ctx).attributes().href).toEqual(expectedCtx);
    }
  });

  it('builds the correct href attribute when implicitly building the context', () => {
    let itemId = 3;
    let ctxList = {
      edit: "Device",
      details: "Manufacturer",
      delete: "County"
    };
    const wrapper = mountActionContainer({
      propsData: {
        itemId: itemId,
        editCtx: ctxList.edit,
        detailsCtx: ctxList.details,
        deleteCtx: ctxList.delete
      }
    });

    let expectedCtx;
    for(let ctx in ctxList) {
      expectedCtx = "/" + ctxList[ctx] + "/" + ctx.charAt(0).toUpperCase() + ctx.substr(1) + "/" + itemId;
      expect(wrapper.find('a.bit-btn-' + ctx).attributes().href).toEqual(expectedCtx);
    }
  });

  it('has the same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = mountActionContainer({
      propsData: {
        defaultCtx: "Region",
        itemId: 1,
        editCtx: "County",
        detailsCtx: "Manufacturer",
        deleteCtx: "Region"
      }
    });

    renderer.renderToString(wrapper.vm, (err, str) => {
      if(err) {
        throw new Error(err);
      }

      expect(str).toMatchSnapshot();
    });
  });
});
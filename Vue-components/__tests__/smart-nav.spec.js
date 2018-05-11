import {mount} from 'vue-test-utils'
import smartNav from '../smart-nav'
import {shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'

let propsData = {
  navTitle: 'Test',
  usr: 'JMST225',
  navItems: [
    {'itemTitle': 'Home', 'linkPath': '#'},
    {'itemTitle': 'WSP', 'linkPath': '#'},
    {
      'itemTitle': 'More',
      'linkPath': '#',
      'inlineItems': [{'itemTitle': 'Be a Trooper', 'linkPath': '#'}, {'itemTitle': 'Media', 'linkPath': '#'}]
    },
    {
      'itemTitle': 'Links',
      'linkPath': '#',
      'inlineItems': [{'itemTitle': 'breathtest', 'linkPath': '#'}, {
        'itemTitle': 'wsp.wa.gov',
        'linkPath': '#'
      }, {'itemTitle': 'Google', 'linkPath': '#'}]
    },
    {'itemTitle': 'Contact', 'linkPath': '#'}
  ]
};

function mountNav(props) {
  if(!props) {
    props = {
      propsData: propsData
    }
  }

  return mount(smartNav, props);
}

describe('smart-nav.vue', () => {
  it('requires navTitle, usr, and navItems to be passed in', () => {
    const wrapper = mountNav();
    const props = wrapper.vm.$options.props;
    expect(props.navTitle.required).toBeTruthy();
    expect(props.usr.required).toBeTruthy();
    expect(props.navItems.required).toBeTruthy();
  });

  it('correctly displays the current time regardless of the hour', () => {
    const wrapper = mountNav();

    for (let i = 0; i <= 24; i++) {
      let time = wrapper.vm.getTime(new Date('April 24, 2018 ' + i + ':00:00'));

      let formatTime = (value) => {
        return (value < 10 ? '0' : '') + value;
      };

      let hour = formatTime(i);
      if (hour > 12) {
        hour = formatTime(hour - 12);
      } else if (hour == 0) {
        hour = formatTime(12);
      }

      expect(time.split(' ')[1].substring(0, 2)).toEqual(hour);
    }
  });

  it('has same HTML structure', () => {
    const renderer = createRenderer();
    const wrapper = shallow(smartNav, {
      propsData: propsData
    });

    wrapper.setData({
      currentDateTime: wrapper.vm.getTime(new Date("April 23, 2018 04:00:00"))
    });

    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) {
        throw new Error(err);
      }
      expect(str).toMatchSnapshot();
    });
  });
});
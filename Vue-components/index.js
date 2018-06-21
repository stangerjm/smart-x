import Vue from 'vue';
import bitBtn from './components/bit-btn';
import bitInput from './components/bit-input';
import bitIcon from './components/bit-icon';

//require all svg icons
// require('./svg').svg();

//Manually polyfill promise for asynchronous component loading
require('es6-promise').polyfill();

//Render base components globally
Vue.component('bit-btn', bitBtn);
Vue.component('bit-input', bitInput);
Vue.component('bit-icon', bitIcon);

//Apply base styles to all components
require('../sass/base/_base.scss');

Vue.mixin({
  mounted() {
    this.$emit('mounted');
  }
});

Vue.mixin({
  methods: {
    formatFromCamelCase: text => {
      return text
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (substr) => { return substr.toUpperCase(); });
    }
  }
});

new Vue({
    el: '#app',
    components: {
        //Load components asynchronously so that we only load the components that we need when we need them.
        bitDropList: () => import('./components/bit-dropList'),
        blockActionContainer: () => import('./components/block-actionContainer'),
        blockNavList: () => import('./components/block-navList'),
        blockMultiSelect: () => import('./components/block-multiSelect'),
        smartSearch: () => import('./components/smart-search'),
        smartNav: () => import('./components/smart-nav'),
        smartTable: () => import('./components/smart-table'),
        smartDetails: () => import('./components/smart-details'),
        smartAccordion: () => import('./components/smart-accordion'),
        smartForm: () => import('./components/smart-form'),
        smartModal: () => import('./components/smart-modal'),
        stackTableCollapsible: () => import('./components/stack-tableCollapsible')
    }
});
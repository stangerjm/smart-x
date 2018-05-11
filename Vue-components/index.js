import Vue from 'vue';
import bitBtn from './bit-btn';
import bitIcon from './bit-icon';
import bitInput from './bit-input';
import bitDropList from './bit-dropList';
import blockActionContainer from './block-actionContainer';
import blockFormHeading from './block-formHeading';
import blockFormFooter from './block-formFooter';
import blockFormBody from './block-formBody';
import blockNavList from './block-navList';
import smartSearch from './smart-search';
import smartNav from './smart-nav';
import smartTable from './smart-table';
import smartDetails from './smart-details';
import smartAccordion from './smart-accordion';
import blockMultiSelect from './block-multiSelect';
import stackTableCollapsible from './stack-tableCollapsible';
import smartForm from './smart-form';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);


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
        bitBtn,
        bitIcon,
        bitInput,
        bitDropList,
        blockActionContainer,
        blockFormHeading,
        blockFormFooter,
        blockFormBody,
        blockNavList,
        smartSearch,
        smartNav,
        smartTable,
        smartDetails,
        smartAccordion,
        blockMultiSelect,
        stackTableCollapsible,
        smartForm
    }
});
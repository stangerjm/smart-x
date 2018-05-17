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
import {DatePicker} from 'element-ui';
import en from "element-ui/lib/locale/lang/en";
import locale from 'element-ui/lib/locale';

locale.use(en);

Vue.component('date-picker', DatePicker);

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
        smartForm,
        DatePicker
    }
});
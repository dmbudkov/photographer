import Vue from 'vue';
import vSelect from 'vue-select';
if (process.browser) {
    Vue.use(vSelect, {})
}
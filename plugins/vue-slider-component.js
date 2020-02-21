import Vue from 'vue';
import vueSlider from 'vue-slider-component';
if (process.browser) {
    Vue.use(vueSlider, {})
}
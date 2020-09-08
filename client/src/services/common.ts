import Vue from "vue";

export var LOADER_EVENT = new Vue();

/**
 * Handle the loader show/hide event using gloabl event emmitter.
 */
Vue.prototype.$showLoader = (value: boolean) => {
    LOADER_EVENT.$emit('showLoader', value)
}
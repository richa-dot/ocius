import Vue from 'vue';

Vue.directive('num', {
    update: function (el: any, binding: any, vnode) {
        el.value = el.value.replace(/\D/g, '')
    }
})

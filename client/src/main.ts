import Vue from 'vue';
import App from '@/App.vue';
import Router from '@/routes'
import VeeValidate from 'vee-validate';
import Snotify from 'vue-snotify'
import VueMoment from 'vue-moment';
import "@/app.directive";
import 'vue-snotify/styles/material.css';
/**
 * Disable production tips
 */
Vue.config.productionTip = false;
/**
 * Hide VueJs dev tools
 */
Vue.config.devtools = false;

// Global registration
// Tell Vue to install the plugin.
Vue.use(VueMoment);
Vue.use(VeeValidate, { events: "change" }); //For validation
Vue.use(Snotify, { toast: { position: 'rightBottom', showProgressBar: false } });

Vue.filter('local', function (date) {
  date = new Date(date)
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();
  newDate.setHours(hours - offset);
  return newDate.toISOString();
})

new Vue({
  router: Router,
  render: h => h(App)
}).$mount('#Ocius')




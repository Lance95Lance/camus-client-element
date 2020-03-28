import 'babel-polyfill';

import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import store from './store';
// import axios from 'axios';

Vue.use(ElementUI);

Vue.config.productionTip = false;

sync(store, router);


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

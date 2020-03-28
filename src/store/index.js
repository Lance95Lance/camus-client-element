import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common';
import config from './modules/config';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    config,
  },
});

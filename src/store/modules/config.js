import * as apis from '../../services/apis';
import { GET_MONITOR_CONFIG } from '../types';

const state = {
  monitorConfig: null,
};

const actions = {
  getMonitorConfig({ commit }) {
    commit(GET_MONITOR_CONFIG);
  },
};

const mutations = {
  [GET_MONITOR_CONFIG](state) {
    apis.getMonitorConfig().then(res => (state.monitorConfig = res.data));
  },
};

const getters = {
  monitorConfig: state => state.monitorConfig,
};

export default {
  state,
  mutations,
  actions,
  getters,
};

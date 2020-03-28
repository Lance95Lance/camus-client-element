import { SET_CURRENT_MENU, ROUTE_PUSH, SET_BREAD_CRUMB_TITLE, SET_BREAD_CRUMB } from '../types';
import router from '../../router';
import { concat, take } from 'lodash';

const state = {
  currentMenu: {
    url: '',
    id: '',
    label: '',
    icon: '',
  },
  breadCrumb: [],
};

const actions = {
  setCurrentMenu({ commit }, menu) {
    commit(SET_CURRENT_MENU, menu);
  },
  setCurrentTitle({ commit }, title) {
    commit(SET_BREAD_CRUMB_TITLE, title);
  },
  setBreadCrumb({ commit }, bread) {
    commit(SET_BREAD_CRUMB, bread);
  },
  routePush({ commit }, routeParams) {
    commit(ROUTE_PUSH, routeParams);
  },
};

const mutations = {
  [ROUTE_PUSH](state, routeParams) {
    const { path, query = {} } = routeParams;
    router.push({
      path,
      query,
    });
  },
  [SET_CURRENT_MENU](state, menu) {
    state.currentMenu = menu;
    state.breadCrumb = [{ label: menu.label }];
  },
  [SET_BREAD_CRUMB_TITLE](state, label) {
    state.breadCrumb = [{ label }];
  },
  [SET_BREAD_CRUMB](state, bread) {
    let breadCrumb = concat(take(state.breadCrumb, bread.index), [...bread.arr]);
    state.breadCrumb = breadCrumb;
    localStorage.breadCrumb = JSON.stringify(breadCrumb);
  },
};

const getters = {
  currentMenu: state => state.currentMenu,
};

export default {
  state,
  mutations,
  actions,
  getters,
};

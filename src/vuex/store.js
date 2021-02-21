import Vue from 'vue'
import Vuex from 'vuex'

import commonActions from './actions/actions'
import apiRequests from './actions/api-requests'
import mutations from "./mutations/mutations"
import getters from "./getters/getters";

const actions = {...commonActions, ...apiRequests}

Vue.use(Vuex);
/* store - глобальная база знаний приложения */
let store = new Vuex.Store({
  /* state - состояние, хранятся переменные, объекты, массивы и т.д. */
  state: {
    searchValue: '',
    isMobile: false,
    isDesktop: true,
    products: [],
    cart: []
  },
  mutations, /* mutations - мутации синхронны, выполняются последовательно - меняем состояние */
  actions, /* actions - асинхронны */
  getters, /* getters - хранитель - короткий путь для получения данных из state */
});

export default store;

import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import routerList from './modules/routerList'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    User,
    routerList,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          User: val.User,
        }
      },
    }),
  ],
})

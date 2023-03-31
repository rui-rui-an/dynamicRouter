const state = {
  hasRoutes: false, // 用于标识用户是否登录
  routerList: '',
}
const mutations = {
  setRouterList(state, val) {
    state.routerList = val
  },
  setHasRoutes(state, val) {
    state.hasRoutes = val
  },
}
export default {
  namespaced: true,
  state,
  mutations,
}

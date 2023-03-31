const state = {
  token: '',
  username: '',
  avatar:'',
  desc:''
}
const mutations = {
  saveUserInfo(state, data) {
    state.token = data.token
    state.username = data.username
    state.avatar = data.avatar
    state.desc = data.desc
  },
  removeUserInfo(state) {
    state.token = ''
    state.username = ''
    state.avatar = ''
    state.desc = ''
  },
}
export default {
  namespaced: true,
  state,
  mutations,
}

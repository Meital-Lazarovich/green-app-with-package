import Vue from 'vue'
import Vuex from 'vuex'
import { userService } from '../services/userService'

Vue.use(Vuex)

const localLoggedinUser = userService.loadUser()

export default new Vuex.Store({
  state: {
    loggedinUser: localLoggedinUser
  },
  getters: {
    loggedinUser(state) {
      return state.loggedinUser;
    }
  },
  mutations: {
    setUser(state, { user }) {
      state.loggedinUser = user;
    },
  },
  actions: {
    async login(context, { credentials }) {
      const user = await userService.login(credentials);
      context.commit({ type: 'setUser', user });
      return user;
    },
    async logout(context) {
      await userService.logout()
      context.commit({ type: 'setUser', user: null })
    },
  }
})

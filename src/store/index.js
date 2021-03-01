import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'


Vue.use(Vuex)

const state = {
    cartList: []
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters: {
    getCartList(state) {
      return state.cartList
    },
    getCartListLength(state) {
      return state.cartList.length
    }
  },
  modules: {
  }
})

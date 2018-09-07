import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cityInfo: {},
    userInfo: {}
  },
  mutations: {
    updateCityInfo (state, data) {
      if (data) {
        state.cityInfo = data;
      }
    },
    updateUserInfo (state, data) {
      if (data) {
        state.userInfo = data;
      }
    }
  },
  actions: {
  }
});

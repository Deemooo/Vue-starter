import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cityInfo: {},
    userInfo: {},
    geohash: ''
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
    },
    saveGeohash (state, data) {
      if (data) {
        state.geohash = data;
      }
    }
  },
  actions: {
  }
});

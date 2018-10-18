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
    // 更新城市信息
    updateCityInfo (state, data) {
      if (data) {
        state.cityInfo = data;
      }
    },
    // 更新用户信息
    updateUserInfo (state, data) {
      if (data) {
        state.userInfo = data;
      }
    },
    // 更新地理位置信息
    saveGeohash (state, data) {
      if (data) {
        state.geohash = data;
      }
    },
    // 设置用户名
    saveUserName (state, name) {
      if (name) {
        Vue.set(state.userInfo, 'username', name);
      }
    }
  },
  actions: {
  }
});

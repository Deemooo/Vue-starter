import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cityInfo: {}
  },
  mutations: {
    updateCityInfo (state, data) {
      Object.keys(data).forEach((key) => {
        state.cityInfo[key] = data[key];
      });
    }
  },
  actions: {
  }
});

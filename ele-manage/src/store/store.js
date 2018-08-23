import Vue from 'vue';
import Vuex from 'vuex';
import https from  '../publicFn/https';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 登陆人信息
    adminInfo: {
      user_name: '',
      create_time: '',
      admin: '',
      id: '',
      avatar: 'default.jpg'
    }
  },
  mutations: {
    saveAdminInfo (state, data) {
      Object.keys(state.adminInfo).forEach((key) => {
        state.adminInfo[key] = data[key];
      });
      console.log('adminInfo', state.adminInfo);
    }
  },
  actions: {
  }
});

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cityInfo: {},
    userInfo: {},
    GEOHASH: '',
    specificSpaceName: '',
    addressList: [],
    question: {},
    orderDetail: {},
    shopDetail: {}
  },
  mutations: {
    // 更新城市信息
    UPDATECITYINFO (state, data) {
      if (data) {
        state.cityInfo = data;
      }
    },
    // 更新用户信息
    UPDATEUSERINFO (state, data) {
      if (data) {
        state.userInfo = data;
      }
    },
    // 更新地理位置信息
    SAVEGEOHASH (state, data) {
      if (data) {
        state.GEOHASH = data;
      }
    },
    // 设置用户名
    SAVEUSERNAME (state, name) {
      if (name) {
        Vue.set(state.userInfo, 'username', name);
      }
    },
    // 添加新地址
    ADDNEWADDRESS (state, data) {
      if (data) {
        state.addressList.push(data);
      }
    },
    // 移除一条地址
    REMOVEADDRESS (state, index) {
      if (typeof index !== 'undefined') {
        state.addressList.splice(index, 1);
      }
    },
    // 保存特殊地名
    SAVESPECIFICSPACENAME (state, name) {
      state.specificSpaceName = name;
    },
    // 保存问题详情
    SAVEQUESTIONS (state, data) {
      state.question = data;
    },
    // 保存订单详情
    SAVEORDERDETAIL (state, data) {
      state.orderDetail = data;
    },
    // 保存店铺详情
    SAVESHOPDETAIL (state, data) {
      state.shopDetail = data;
    }
  },
  actions: {
  }
});

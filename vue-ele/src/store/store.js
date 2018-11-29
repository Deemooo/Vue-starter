import Vue from 'vue';
import Vuex from 'vuex';
import { setListData, getListData, removeListData } from '../publicFn/toolFus';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    CITYINFO: {},
    USERINFO: {},
    GEOHASH: '',
    SPECIFICSPACENAME: '',
    ADDRESSLIST: [],
    QUESTION: {},
    ORDERDETAIL: {},
    SHOPDETAIL: {},
    CARTLIST: {}
  },
  mutations: {
    // 更新城市信息
    UPDATECITYINFO (state, data) {
      if (data) {
        state.CITYINFO = data;
      }
    },
    // 更新用户信息
    UPDATEUSERINFO (state, data) {
      if (data) {
        state.USERINFO = data;
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
        Vue.set(state.USERINFO, 'username', name);
      }
    },
    // 添加新地址
    ADDNEWADDRESS (state, data) {
      if (data) {
        state.ADDRESSLIST.push(data);
      }
    },
    // 移除一条地址
    REMOVEADDRESS (state, index) {
      if (typeof index !== 'undefined') {
        state.ADDRESSLIST.splice(index, 1);
      }
    },
    // 保存特殊地名
    SAVESPECIFICSPACENAME (state, name) {
      state.SPECIFICSPACENAME = name;
    },
    // 保存问题详情
    SAVEQUESTIONS (state, data) {
      state.QUESTION = data;
    },
    // 保存订单详情
    SAVEORDERDETAIL (state, data) {
      state.ORDERDETAIL = data;
    },
    // 保存店铺详情
    SAVESHOPDETAIL (state, data) {
      state.SHOPDETAIL = data;
    },
    // 购物车添加商品
    ADDFOODS (state, foods) {
      // 为重复商品则数量加一，新商品则数量为一
      let itemId = foods.item_id;
      if (state.CARTLIST.hasOwnProperty(itemId)) {
        let exFood = state.CARTLIST[itemId]['num'];
        Vue.set(state.CARTLIST[itemId], 'num', ++exFood);
      } else {
        Vue.set(state.CARTLIST, itemId, foods);
        Vue.set(state.CARTLIST[itemId], 'num', 1);
      }
      setListData('CARTLIST', state.CARTLIST);
    }
  },
  actions: {
  }
});

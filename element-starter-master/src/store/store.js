import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count: 0,
  actionFlag: '',
  actionArr: []
};
const computedActionArr = function (flag) {
  state.actionArr.push(flag);
  const limit = 5;
  let len = state.actionArr.length;
  const begin = len - limit < 0 ? 0 : len - limit;
  state.actionArr = state.actionArr.slice(begin, len);
};
const mutations = {
  increment (state, flag) {
    state.count++;
    computedActionArr(flag);
  },
  decrement (state, flag) {
    state.count--;
    computedActionArr(flag);
  }
};
const actions = {
  incrementAsync: context => setTimeout(() => context.commit('increment'), 1000),
  incrementIfOdd: context => context.count % 2 === 0 ? context.commit('increment') : null
};
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
  recentHistory () {
    return state.actionArr;
  }
};
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

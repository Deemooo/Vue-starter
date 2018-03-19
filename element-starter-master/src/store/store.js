import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    count: 0,
    actionFlag: '',
    actionArr: []
};
const mutations = {
    increment (state, flag) {
        state.count++;
        state.actionFlag = flag;
    },
    decrement (state, flag) {
        state.count--;
        state.actionFlag = flag;
    }
};
const actions = {
    incrementAsync: context => setTimeout(() => context.commit('increment'), 1000),
    incrementIfOdd: context => context.count % 2 === 0 ? context.commit('increment') : null
};
const getters = {
    evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
    recentHistory () {
        if (state.actionArr.length <= 5) {
            state.actionFlag === 'increment' ? state.actionArr.push('increment') : state.actionArr.push('decrement');
        } else {
            state.actionArr.splice(0, 1, state.actionFlag);
        }
        console.log(state.actionArr);
        return state.actionArr;
    }
};
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

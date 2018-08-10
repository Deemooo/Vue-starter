import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        contents: [],
        modalShow: false
    },
    getters: {

    },
    mutations: {
        updateContents (state, contents) {
            if (contents && contents.length !== 0) {
                state.contents = contents.data;
            }
        },
        updateModalShow (state, condition) {
            state.modalShow = condition;
        }
    },
    actions: {

    }
});

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        contents: []
    },
    getters: {

    },
    mutations: {
        updateContents (state, contents) {
            if (contents && contents.length !== 0) {
                state.contents = contents.data;
            }
        }
    },
    actions: {

    }
});

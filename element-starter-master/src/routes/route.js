import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from '../App.vue'
import counter from '../pages/counter.vue'

export default new VueRouter({
    routes: [
        {
            path: '/', component: resolve => require(['../App.vue'], resolve),
            path: '/counter', component: resolve => require(['../pages/counter.vue'], resolve)
        }
    ]
});
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: (resolve) => require(['./views/index.vue'], resolve)
        },
        {
            path: '/tags',
            name: 'tags',
            component: (resolve) => require(['./views/tags.vue'], resolve)
        },
        {
            path: '/about',
            name: 'about',
            component: (resolve) => require(['./views/about.vue'], resolve)
        },
        {
            path: '/article',
            name: 'article',
            component: (resolve) => require(['./views/article.vue'], resolve)
        }
    ]
});

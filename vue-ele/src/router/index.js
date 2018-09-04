import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    // 选择城市页
    {
      path: '/',
      name: 'home',
      component: resolve => require(['../pages/home.vue'], resolve)
    },
    // 当前选择城市页
    {
      path: '/city/:cityid',
      component: resolve => require(['../pages/city.vue'], resolve)
    }
  ]
});

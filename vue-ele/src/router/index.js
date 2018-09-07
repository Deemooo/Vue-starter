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
    // 登录注册页
    {
      path: '/login',
      component: resolve => require(['../pages/login.vue'], resolve)
    },
    // 个人信息页
    {
      path: '/profile',
      component: resolve => require(['../pages/profile.vue'], resolve)
    },
    // 重置密码页
    {
      path: '/forget',
      component: resolve => require(['../pages/forget.vue'], resolve)
    },
    // 当前选择城市页
    {
      path: '/city/:cityid',
      component: resolve => require(['../pages/city.vue'], resolve)
    },
    // 商铺列表页
    {
      path: '/msite',
      component: resolve => require(['../pages/msite.vue'], resolve)
    }
  ]
});

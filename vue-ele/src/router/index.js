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
      name: 'login',
      component: resolve => require(['../pages/login.vue'], resolve)
    },
    // 个人信息页
    {
      path: '/profile',
      name: 'profile',
      component: resolve => require(['../pages/profile.vue'], resolve)
    },
    // 账户信息
    {
      path: '/profileInfo',
      name: 'profileInfo',
      component: resolve => require(['../pages/subpages/profileInfo.vue'], resolve)
    },
    // 设置用户名
    {
      path: '/setUsername',
      name: 'setUsername',
      component: resolve => require(['../pages/subpages/setUsername.vue'], resolve)
    },
    // 收货地址
    {
      path: '/address',
      name: 'address',
      component: resolve => require(['../pages/subpages/address.vue'], resolve)
    },
    // 新增收货地址
    {
      path: '/addAddress',
      name: 'addAddress',
      component: resolve => require(['../pages/subpages/addAddress.vue'], resolve)
    },
    // 搜索特定地名
    {
      path: '/specificSpaceName',
      name: 'specificSpaceName',
      component: resolve => require(['../pages/subpages/specificSpaceName.vue'], resolve)
    },
    // 重置密码页
    {
      path: '/forget',
      name: 'forget',
      component: resolve => require(['../pages/forget.vue'], resolve)
    },
    // 当前选择城市页
    {
      path: '/city/:cityid',
      name: 'city',
      component: resolve => require(['../pages/city.vue'], resolve)
    },
    // 商铺列表页
    {
      path: '/msite',
      name: 'msite',
      component: resolve => require(['../pages/msite.vue'], resolve)
    },
    // 特色商铺列表页
    {
      path: '/food',
      name: 'food',
      component: resolve => require(['../pages/food.vue'], resolve)
    },
    // 搜索页
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['../pages/search.vue'], resolve)
    },
    // 订单页
    {
      path: '/order',
      name: 'order',
      component: resolve => require(['../pages/order.vue'], resolve)
    }
  ]
});

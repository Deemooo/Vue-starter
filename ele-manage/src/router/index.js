import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/login.vue'], resolve)
    },
    {
      path: '/manage',
      component: resolve => require(['../pages/manage.vue'], resolve),
      children: [
        {
          path: '/',
          name: 'home',
          component: resolve => require(['../pages/home.vue'], resolve)
        },
        {
          path: '/usersList',
          name: 'usersList',
          meta: ['数据管理', '用户列表'],
          component: resolve => require(['../pages/usersList.vue'], resolve)
        },
        {
          path: '/shopList',
          name: 'shopList',
          meta: ['数据管理', '商家列表'],
          component: resolve => require(['../pages/shopList.vue'], resolve)
        },
        {
          path: '/orderList',
          name: 'orderList',
          meta: ['数据管理', '订单列表'],
          component: resolve => require(['../pages/orderList.vue'], resolve)
        },
        {
          path: '/adminList',
          name: 'adminList',
          meta: ['数据管理', '管理员列表'],
          component: resolve => require(['../pages/adminList.vue'], resolve)
        },
        {
          path: '/visitor',
          name: 'visitor',
          meta: ['数据管理', '用户分布'],
          component: resolve => require(['../pages/visitor.vue'], resolve)
        },
        {
          path: '/adminConfig',
          name: 'adminConfig',
          meta: ['设置', '管理员设置'],
          component: resolve => require(['../pages/adminConfig.vue'], resolve)
        },
        {
          path: '/explain',
          name: 'explain',
          meta: ['关于', '说明'],
          component: resolve => require(['../pages/explain.vue'], resolve)
        },
        {
          path: '/textEdit',
          name: 'textEdit',
          meta: ['编辑', '文本编辑'],
          component: resolve => require(['../pages/textEdit.vue'], resolve)
        }
      ]
    }
  ]
});
// router.beforeEach((to, from, next) => {
//   // to: Route: 即将要进入的目标 路由对象
//   // from: Route: 当前导航正要离开的路由
//   // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//   // 判断是否登录
//   if (to.name !== 'login') {
//     router.push('login');
//   }
//   next();
// });
export default router;

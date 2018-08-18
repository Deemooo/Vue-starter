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

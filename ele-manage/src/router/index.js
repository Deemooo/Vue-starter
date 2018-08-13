import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['../pages/login.vue'], resolve)
    },
    {
      path: '/manage',
      name: 'manage',
      component: resolve => require(['../pages/manage.vue'], resolve)
    }
  ]
});

import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';
// 引入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 更改默认主题色
import './assets/style/myTheme/index.less';
// 全局混入
import publicFn from  './publicFn/mixins';
// 请求方法
import https from  './publicFn/https';
Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(https);
Vue.mixin(publicFn);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

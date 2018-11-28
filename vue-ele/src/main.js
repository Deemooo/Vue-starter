import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';

// 请求方法
import https from  './publicFn/https';
// 全局混入
import mixins from  './publicFn/mixins';
// 表单验证
import validate from  './publicFn/validate';

// 顶栏
import topHeader from './components/topHeader.vue';
// 底栏
import bottomFooter from './components/bottomFooter.vue';
// 触摸滑动组件
import Swiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
// markdown样式
import 'github-markdown-css/github-markdown.css';
// 弹出框
import 'vue-snotify/styles/material.css';
import Snotify from 'vue-snotify';
Vue.config.productionTip = false;

Vue.use(https);
Vue.mixin(mixins);
Vue.mixin(validate);
Vue.use(Swiper);
Vue.use(Snotify);

Vue.component('top-header', topHeader);
Vue.component('bottom-footer', bottomFooter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

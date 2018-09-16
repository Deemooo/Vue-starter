import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';

// 请求方法
import https from  './publicFn/https';
// 全局混入
import mixins from  './publicFn/mixins';

// 顶栏
import topHeader from './components/topHeader.vue';
// 顶栏
import bottomFooter from './components/bottomFooter.vue';

Vue.config.productionTip = false;

Vue.use(https);
Vue.mixin(mixins);

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
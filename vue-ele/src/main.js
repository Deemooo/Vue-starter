import Vue from 'vue';
import App from './App';
import router from './router';
// 顶栏
import topHeader from './components/topHeader.vue';

Vue.config.productionTip = false;

Vue.component('top-header', topHeader);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

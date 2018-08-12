import Vue from 'vue';
import App from './App';
import router from './router';
// 引入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/style/myTheme/index.less';
Vue.config.productionTip = false;

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

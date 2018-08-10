import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import './assets/style/myTheme/index.less';

Vue.use(iView);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

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
import mixins from  './publicFn/mixins';
// 表单验证方法
import validate from  './publicFn/validate';
// 请求方法
import https from  './publicFn/https';
// 顶栏
import topHeader from './components/topHeader.vue';
// 图表
import lineBarChart from './components/echarts/lineBarChart.vue';
// 数据表格
import dataTable from './components/dataTable.vue';
// 按钮
import actionButton from './components/actionButton.vue';
Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(https);
Vue.mixin(mixins);
Vue.mixin(validate);
Vue.component('top-header', topHeader);
Vue.component('line-bar-chart', lineBarChart);
Vue.component('data-table', dataTable);
Vue.component('action-button', actionButton);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

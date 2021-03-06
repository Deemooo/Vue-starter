import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
Vue.use(Router);

const router = new Router({
  routes: [
    // 主页
    {
      path: '/',
      name: 'home',
      component: resolve => require(['../pages/home.vue'], resolve)
    },
    // 当前选择城市页
    {
      path: '/city/:cityid',
      name: 'city',
      component: resolve => require(['../pages/city.vue'], resolve)
    },
    // 商铺列表页
    {
      path: '/msite',
      name: 'msite',
      component: resolve => require(['../pages/msite.vue'], resolve)
    },
    // 搜索页
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['../pages/search.vue'], resolve)
    },
    // 订单页
    {
      path: '/order',
      name: 'order',
      component: resolve => require(['../pages/order.vue'], resolve)
    },
    // 个人信息页
    {
      path: '/profile',
      name: 'profile',
      component: resolve => require(['../pages/profile.vue'], resolve)
    },
    // 登录注册页
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../pages/login.vue'], resolve)
    },
    // 账户信息
    {
      path: '/profileInfo',
      name: 'profileInfo',
      component: resolve => require(['../pages/subpages/profileInfo.vue'], resolve)
    },
    // 设置用户名
    {
      path: '/setUsername',
      name: 'setUsername',
      component: resolve => require(['../pages/subpages/setUsername.vue'], resolve)
    },
    // 收货地址
    {
      path: '/address',
      name: 'address',
      component: resolve => require(['../pages/subpages/address.vue'], resolve)
    },
    // 新增收货地址
    {
      path: '/addAddress',
      name: 'addAddress',
      component: resolve => require(['../pages/subpages/addAddress.vue'], resolve)
    },
    // 搜索特定地名
    {
      path: '/specificSpaceName',
      name: 'specificSpaceName',
      component: resolve => require(['../pages/subpages/specificSpaceName.vue'], resolve)
    },
    // 账户余额信息
    {
      path: '/balance',
      name: 'balance',
      component: resolve => require(['../pages/subpages/balance.vue'], resolve)
    },
    // 账户优惠信息
    {
      path: '/benefit',
      name: 'benefit',
      component: resolve => require(['../pages/subpages/benefit.vue'], resolve)
    },
    // 账户积分信息
    {
      path: '/points',
      name: 'points',
      component: resolve => require(['../pages/subpages/points.vue'], resolve)
    },
    // 余额说明
    {
      path: '/balanceDetail',
      name: 'balanceDetail',
      component: resolve => require(['../pages/subpages/balanceDetail.vue'], resolve)
    },
    // 积分说明
    {
      path: '/pointDetail',
      name: 'pointDetail',
      component: resolve => require(['../pages/subpages/pointDetail.vue'], resolve)
    },
    // 红包说明
    {
      path: '/benefitDetail',
      name: 'benefitDetail',
      component: resolve => require(['../pages/subpages/benefitDetail.vue'], resolve)
    },
    // 代金券说明
    {
      path: '/couponDetail',
      name: 'couponDetail',
      component: resolve => require(['../pages/subpages/couponDetail.vue'], resolve)
    },
    // APP下载
    {
      path: '/download',
      name: 'download',
      component: resolve => require(['../pages/subpages/download.vue'], resolve)
    },
    // 历史红包
    {
      path: '/benefitHistory',
      name: 'benefitHistory',
      component: resolve => require(['../pages/subpages/benefitHistory.vue'], resolve)
    },
    // 兑换红包
    {
      path: '/benefitExchange',
      name: 'benefitExchange',
      component: resolve => require(['../pages/subpages/benefitExchange.vue'], resolve)
    },
    // 推荐有奖
    {
      path: '/benefitRecommend',
      name: 'benefitRecommend',
      component: resolve => require(['../pages/subpages/benefitRecommend.vue'], resolve)
    },
    // 会员卡
    {
      path: '/vipcard',
      name: 'vipcard',
      component: resolve => require(['../pages/subpages/vipcard.vue'], resolve)
    },
    // 服务中心
    {
      path: '/service',
      name: 'service',
      component: resolve => require(['../pages/subpages/service.vue'], resolve)
    },
    // 问题详情
    {
      path: '/questionDetail',
      name: 'questionDetail',
      component: resolve => require(['../pages/subpages/questionDetail.vue'], resolve)
    },
    // 会员说明
    {
      path: '/vipDescription',
      name: 'vipDescription',
      component: resolve => require(['../pages/subpages/vipDescription.vue'], resolve)
    },
    // 兑换会员
    {
      path: '/exchangeVip',
      name: 'exchangeVip',
      component: resolve => require(['../pages/subpages/exchangeVip.vue'], resolve)
    },
    // 购买记录
    {
      path: '/bugRecord',
      name: 'bugRecord',
      component: resolve => require(['../pages/subpages/bugRecord.vue'], resolve)
    },
    // 重置密码页
    {
      path: '/forget',
      name: 'forget',
      component: resolve => require(['../pages/forget.vue'], resolve)
    },
    // 特色商铺列表页
    {
      path: '/food',
      name: 'food',
      component: resolve => require(['../pages/food.vue'], resolve)
    },
    // 订单详情
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: resolve => require(['../pages/subpages/orderDetail.vue'], resolve)
    },
    // 店铺页
    {
      path: '/shop',
      name: 'shop',
      component: resolve => require(['../pages/shop.vue'], resolve)
    },
    // 商品详情
    {
      path: '/foodDetail',
      name: 'foodDetail',
      component: resolve => require(['../pages/subpages/foodDetail.vue'], resolve)
    },
    // 店铺详情
    {
      path: '/shopDetail',
      name: 'shopDetail',
      component: resolve => require(['../pages/subpages/shopDetail.vue'], resolve)
    },
    // 店铺安全信息
    {
      path: '/shopSafe',
      name: 'shopSafe',
      component: resolve => require(['../pages/subpages/shopSafe.vue'], resolve)
    },
    // 确认订单
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: resolve => require(['../pages/subpages/confirmOrder.vue'], resolve)
    },
    // 确认订单-选择地址
    {
      path: '/chooseAddress',
      name: 'chooseAddress',
      component: resolve => require(['../pages/subpages/chooseAddress.vue'], resolve)
    },
    // 确认订单-订单备注
    {
      path: '/orderRemark',
      name: 'orderRemark',
      component: resolve => require(['../pages/subpages/orderRemark.vue'], resolve)
    },
    // 确认订单-发票
    {
      path: '/orderInvoice',
      name: 'orderInvoice',
      component: resolve => require(['../pages/subpages/orderInvoice.vue'], resolve)
    },
    // 确认订单-支付
    {
      path: '/payment',
      name: 'payment',
      component: resolve => require(['../pages/subpages/payment.vue'], resolve)
    }
  ]
});
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  // 判断是否登录
  const needCheckPages = ['order', 'profileInfo', 'balance', 'benefit', 'points', 'vipcard'];
  let userInfo = store.state.USERINFO;
  let homePath = to.path === '/';
  if (needCheckPages.indexOf(to.name) >= 0) {
    if (!userInfo.user_id) {
      next({name: 'login'});
    }
  }
  if (userInfo.user_id && homePath) {
    next({name: from.name});
  }
  next();
});
export default router;

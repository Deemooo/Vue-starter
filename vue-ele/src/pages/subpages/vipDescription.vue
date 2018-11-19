<template>
    <div class="vip-description">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="vip-description-title">我的优惠</span>
        </template>
      </top-header>
      <div class="vip-description-detail-content">
        <div class="content-title">Q1: 特权介绍</div>
        <div class="content-describe">
          <div class="content-describe-item">身份标识：饿了么会员服务有效期内，享有专属皇冠标识。</div>
          <div class="content-describe-item">减免配送费： 饿了么会员卡自绑定账户之日起31天内，在「蜂鸟专送」标识商家下单，享有30次减免配送费特权，每日最多减免3单，每单最高可减4元。</div>
          <div class="content-describe-item">更多特权，敬请期待！</div>
        </div>
        <div class="content-title">Q2: 资费介绍</div>
        <div class="content-describe">饿了么会员卡：20元。</div>
        <div class="content-title">Q3: 使用说明</div>
        <div class="content-describe">
          <div class="content-describe-item">当用户满足以下任一条件，会员服务自动失效：</div>
          <div class="content-describe-item">自绑定之日起超过31天；</div>
          <div class="content-describe-item">在31天内累计使用减免配送费的蜂鸟订单数量达到30单；</div>
        </div>
        <div class="content-title">Q4: 购卡说明</div>
        <div class="content-describe">在线购买：饿了么App>我的>饿了么会员卡</div>
      </div>
    </div>
</template>
<script>
  export default {
      components: {},
      computed: {},
      data () {
          return {};
      },
      methods: {},
      mounted () {
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .vip-description {
    width: 100%;
    overflow-y: auto;
    position: relative;
    color: #fff;
    svg {
      box-sizing: border-box;
    }
    .arrow-left {
      margin-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .vip-description-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
    }
    .vip-description-detail-content {
      margin-top: 1.95rem;
      padding: .4rem;
      background-color: #fff;
      .content-title {
        padding: .2rem;
        font-size: .65rem;
        font-weight: 700;
        color: @fontColor1;
      }
      .content-describe {
        padding: .2rem;
        font-size: .55rem;
        color: @fontColor1;
        .content-describe-item {
          padding: .1rem;
        }
      }
    }
  }
</style>

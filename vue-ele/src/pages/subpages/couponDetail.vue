<template>
  <div class="coupon-detail">
    <top-header>
      <template>
        <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
        <span class="coupon-detail-title">红包问题</span>
      </template>
    </top-header>
    <div class="coupon-detail-content">
      <div class="content-title">Q1: 什么是商家代金券？</div>
      <div class="content-describe">
        商家代金券是指由商家自己发放代金券，只限在指定的商家使用，可根据条件抵扣相应金额。
      </div>
      <div class="content-title">Q2: 怎么获得商家代金券？</div>
      <div class="content-describe">
        <div class="content-describe-item">进入有「进店领券」或「下单返券」标示的商家即有机会获得代金券。</div>
        <div class="content-describe-item">「下单返券」需要在指定商家完成满足返券金额要求的订单后才会返还，代金券可在下次下单时使用。</div>
        <div class="content-describe-item">抢微信朋友分享的红包获得</div>
      </div>
      <div class="content-title">Q3: 商家代金券使用条件</div>
      <div class="content-describe">
        <div class="content-describe-item">商家代金券仅限在指定商家使用</div>
        <div class="content-describe-item">商家代金券仅限在线支付使用</div>
        <div class="content-describe-item">每个订单只能使用一张商家代金券，不可与其他代金券叠加使用</div>
      </div>
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
  .coupon-detail {
    width: 100%;
    overflow-y: auto;
    position: relative;
    color: #fff;
    background-color: @backColor;
    svg, span {
      box-sizing: border-box;
      color: #fff;
    }
    .arrow-left {
      margin-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .coupon-detail-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .coupon-detail-content {
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

<template>
  <div class="point-detail">
    <top-header>
      <template>
        <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
        <span class="point-detail-title">积分问题</span>
      </template>
    </top-header>
    <div class="point-detail-content">
      <div class="content-title">Q1: 怎么获得积分？</div>
      <div class="content-describe">
        <div class="content-describe-item">在线支付的订单将获得订单积分奖励:</div>
        <div class="content-describe-item">积分将在用户完成评价后获得。</div>
        <div class="content-describe-item">可获得积分=订单金额×10（即1元=10点积分）。</div>
        <div class="content-describe-item">订单金额指实际付款金额，不包含活动优惠金额。</div>
        <div class="content-describe-item">每位用户每天最多可以获得2000积分，体验商家的订单和评价不会增加积分。</div>
      </div>
      <div class="content-title">Q2: 积分用来做什么？</div>
      <div class="content-describe">可以在积分商城兑换各种礼品。</div>
      <div class="content-title">Q3: 礼品兑换很多天了还没有收到，该怎么办？</div>
      <div class="content-describe">礼品从兑换日起，3个工作日（周末不算）内处理发货，发货后，通常会在3个工作日左右送达。</div>
      <div class="content-title">Q4: 礼品兑换中的手机充值卡兑换，怎么样进行充值，充值之前会和我电话确认嘛？</div>
      <div class="content-describe">不会，手机充值卡兑换，是直接充值到您填写的手机号上，充值之前不会和您电话确认，所以您在填写电话的时候，请确认电话是否正确。</div>
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
  .point-detail {
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
    .point-detail-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .point-detail-content {
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

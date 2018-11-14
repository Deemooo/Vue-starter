<template>
  <div class="benefit-detail">
    <top-header>
      <template>
        <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
        <span class="benefit-detail-title">红包问题</span>
      </template>
    </top-header>
    <div class="benefit-detail-content">
      <div class="content-title">Q1: 怎么获得红包？</div>
      <div class="content-describe">
        <div class="content-describe-item">通过邀请好友获得</div>
        <div class="content-describe-item">在下单返红包的商家下单获得</div>
        <div class="content-describe-item">抢微信朋友分享的红包获得</div>
      </div>
      <div class="content-title">Q2: 红包可以做什么？</div>
      <div class="content-describe">可以抵扣在线支付时的实际支付金额。</div>
      <div class="content-title">Q3: 红包的门槛金额按照什么金额计算？</div>
      <div class="content-describe">红包的的门槛金额按照（选购菜品折后价＋餐盒费）的金额作为计算门槛，即购物车显示的金额（7.3以上版本）。假设红包满30可用，只要选购的菜品现价（折后价）＋餐盒费超过30，就可以使用红包。</div>
      <div class="content-title">Q4: 一个红包能拆开多次使用吗？</div>
      <div class="content-describe">不能，一个红包只能一次性使用，不能分开使用。</div>
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
  .benefit-detail {
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
    .benefit-detail-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .benefit-detail-content {
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

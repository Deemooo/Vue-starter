<template>
    <div class="balance-detail">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="balance-detail-title">余额问题</span>
        </template>
      </top-header>
      <div class="balance-detail-content">
        <div class="content-title">Q1: 使用余额的条件</div>
        <div class="content-describe">为了保护账户安全，使用余额前必须先绑定手机号。</div>
        <div class="content-title">Q2: 余额可以怎么用？</div>
        <div class="content-describe">余额可以在饿了么平台上提现，当余额大于等于待支付金额时可以在支持在线支付的商家中进行消费。提现功能将于2016年12月25日00:00全面开放。</div>
        <div class="content-title">Q3:我要如何提现？</div>
        <div class="content-describe">为了保护账户和资金安全，您在提现前需要输入真实姓名和用该姓名开通的银行卡号、选择开户行，并验证已绑定饿了么账号的手机号。每日只能提现1次，每次限额50元。若提现金额超过50元，点击【提现】时系统会提示您已超额，请您修改提现金额。</div>
        <div class="content-title">Q4:为什么会提现失败？</div>
        <div class="content-describe">可能原因有：您的姓名、开户行、银行卡号等信息不匹配；您当日的提现次数和金额超过限制；您的账户存在异常，被风控拦截。</div>
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
  .balance-detail {
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
    .balance-detail-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .balance-detail-content {
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
      }
    }
  }
</style>

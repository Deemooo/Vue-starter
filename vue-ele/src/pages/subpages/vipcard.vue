<template>
    <div class="vipcard">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="vipcard-title">会员中心</span>
        </template>
      </top-header>
      <div class="vipcard-user">为账户 <span>{{ USERINFO.username }}</span> 购买会员</div>
      <div class="vipcard-privilege">
        <router-link to="vipDescription" tag="div" class="vip-description">
          <span>会员特权</span>
          <span class="vip-description-arrow">
            <span>会员说明</span>
            <svg fill="#ccc">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </router-link>
        <div class="vipcard-privilege-item">
          <span class="vipcard-privilege-img">
            <img src="../../assets/icon/sheng.jpeg" alt="省">
          </span>
          <span class="vipcard-privilege-item-des">
            <div class="vipcard-privilege-item-des-title">减免配送费</div>
            <div class="vipcard-privilege-item-des-text">每月减免30单，每日可减免3单，每单最高减4元</div>
            <div class="vipcard-privilege-item-des-text">蜂鸟专送专享</div>
          </span>
        </div>
        <div class="vipcard-privilege-item">
          <span class="vipcard-privilege-img">
            <img src="../../assets/icon/jifen.jpeg" alt="省">
          </span>
          <span class="vipcard-privilege-item-des">
            <div class="vipcard-privilege-item-des-title">减免配送费</div>
            <div class="vipcard-privilege-item-des-text">每月减免30单，每日可减免3单，每单最高减4元</div>
            <div class="vipcard-privilege-item-des-text">蜂鸟专送专享</div>
          </span>
        </div>
        <div class="vipcard-apply">
          <div class="vipcard-apply-text">开通会员</div>
          <div class="vipcard-apply-buy">
            <span class="vipcard-apply-buy-wrap">
              <span>1个月</span>
              <span class="vipcard-apply-buy-money"> ¥20</span>
            </span>
            <span class="vipcard-apply-buy-btn" @click="buyCart">购买</span>
          </div>
        </div>
        <router-link to="exchangeVip" tag="div" class="vip-description exchange-vip">
          <span>兑换会员</span>
          <span class="vip-description-arrow">
            <span>使用卡号卡密</span>
            <svg fill="#ccc">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </router-link>
        <router-link to="bugRecord" tag="div" class="vip-description bug-record">
          <span>购买记录</span>
          <span class="vip-description-arrow">
            <span>开发票</span>
            <svg fill="#ccc">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </router-link>
      </div>
      <vue-snotify></vue-snotify>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    components: {},
    computed: {
      ...mapState([
        'USERINFO'
      ])
    },
    data () {
        return {};
    },
    methods: {
      buyCart () {
        this.$snotify.warning('支付功能暂未开放！', {
          showProgressBar: false,
          timeout: 1000
        });
      }
    },
    mounted () {
    },
  destroyed () {
    this.$snotify.clear();
  },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .vipcard {
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
    .vipcard-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
    }
    .vipcard-user {
      margin-top: 1.95rem;
      padding-left: .4rem;
      font-size: .6rem;
      color: @fontColor1;
      line-height: 2rem;
      span {
        color: @fontColor;
        font-weight: 700;
      }
    }
    .vipcard-privilege {
      .vip-description {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .4rem;
        line-height: 2rem;
        border-top: .025rem solid @gray;
        span {
          font-size: .7rem;
          color: @fontColor;
        }
        .vip-description-arrow {
          display: flex;
          align-items: center;
          span {
            font-size: .6rem;
            color: #999;
          }
          svg {
            width: .5rem;
            height: .5rem;
          }
        }
      }
      .vipcard-privilege-item {
        display: flex;
        align-items: center;
        padding: .8rem;
        border-top: .025rem solid @gray;
        .vipcard-privilege-img {
          margin-right: .6rem;
          img {
            width: 1.6rem;
            height: 1.8rem;
          }
        }
        .vipcard-privilege-item-des {
          .vipcard-privilege-item-des-title {
            font-size: .7rem;
            color: @fontColor;
            font-weight: 400;
          }
          .vipcard-privilege-item-des-text {
            font-size: .5rem;
            color: @fontColor2;
            font-family: Helvetica Neue,Tahoma,Arial;
          }
        }
      }
      .vipcard-apply {
        border-top: .5rem solid @gray;
        border-bottom: .5rem solid @gray;
        font-size: .7rem;
        .vipcard-apply-text {
          padding-left: .8rem;
          border-bottom: .025rem solid @gray;
          line-height: 2rem;
          color: @fontColor;
        }
        .vipcard-apply-buy {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 .8rem;
          line-height: 2.6rem;
          color: @fontColor;
          .vipcard-apply-buy-wrap {
            .vipcard-apply-buy-money {
              font-weight: 700;
              color: @fontColor4;
            }
          }
          .vipcard-apply-buy-btn {
            border: .025rem solid @fontColor4;
            border-radius: .2rem;
            line-height: 1.2rem;
            height: 1.2rem;
            width: 2.6rem;
            text-align: center;
            font-size: .6rem;
            color: @fontColor4;
          }
        }
      }
      .exchange-vip {
        border-top: none;
      }
      .bug-record {
        border-top: .025rem solid @gray;
        border-bottom: .025rem solid @gray;
      }
    }
  }
</style>

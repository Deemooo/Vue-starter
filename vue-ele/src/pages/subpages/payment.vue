<template>
  <div class="payment">
    <top-header>
      <template>
        <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
        <span class="payment-title">支付</span>
      </template>
    </top-header>
    <section class="time-amount">
      <header>支付剩余时间</header>
      <p class="time">{{remaining}}</p>
    </section>
    <section class="pay-way-list">
      <header>选择支付方式</header>
      <section class="pay-item">
        <div class="pay-icon-contaienr">
          <img src="../../assets/icon/zhifubao.png" alt="" class="pay-icon">
          <span>支付宝</span>
        </div>
        <svg class="choose-icon" @click="payWay = 1" :class="{choosed: payWay === 1}">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
        </svg>
      </section>
      <section class="pay-item">
        <div class="pay-icon-contaienr">
          <svg class="pay-icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weixin"></use>
          </svg>
          <span>微信</span>
        </div>
        <svg class="choose-icon" @click="payWay = 2" :class="{choosed: payWay === 2}">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
        </svg>
      </section>
    </section>
    <div class="confirm-btn" @click="confirmPay">确定支付</div>
    <vue-snotify></vue-snotify>
  </div>
</template>
<script>
  export default {
    components: {},
    computed: {
      // 记时
      remaining () {
        let minute = parseInt(this.countNum / 60);
        if (minute < 10) {
          minute = '0' + minute;
        }
        let second = parseInt(this.countNum % 60);
        if (second < 10) {
          second = '0' + second;
        }
        return `00 : ${minute} : ${second}`;
      }
    },
    data () {
      return {
        timer: null,
        countNum: 900,
        payWay: 1
      };
    },
    methods: {
      // 支付记时
      remainingTime () {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.countNum--;
          if (this.countNum === 0) {
            clearInterval(this.timer);
            this.$snotify.warning('支付超时!', {
              showProgressBar: false,
              timeout: 1500
            });
          }
        }, 1000);
      },
      // 确认支付
      confirmPay () {
        this.$snotify.confirm('当前环境无法支付，请打开官方APP进行付款!', '支付提示', {
          showProgressBar: false,
          closeOnClick: false,
          timeout: 5000,
          buttons: [
            { text: '确定', action: () => this.$router.push('order') }
          ]
        });
      }
    },
    created () {
      this.remainingTime();
    },
    mounted () {
    },
    beforeDestroy () {
      clearInterval(this.timer);
    },
    destroyed () {
      this.$snotify.clear();
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .payment {
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
    .payment-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
    }
    .time-amount {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem .4rem;
      border-bottom: .4rem solid @gray;
      margin-top: 1.95rem;
      header {
        margin-bottom: .4rem;
        font-size: .7rem;
        color: @fontColor1;
      }
      .time {
        font-size: 1rem;
        color: @fontColor;
      }
    }
    .pay-way-list {
      margin-bottom: .4rem;
      header {
        padding: 0 .7rem;
        border-bottom: .025rem solid @gray;
        line-height: 1.8rem;
        font-size: .7rem;
        color: @fontColor1;
      }
      .pay-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .4rem .7rem;
        border-bottom: .025rem solid @gray;
        line-height: 2.6rem;
        .pay-icon-contaienr {
          display: flex;
          align-items: center;
          .pay-icon {
            width: 2rem;
            height: 2rem;
            margin-right: .2rem;
          }
          span {
            font-size: .7rem;
            color: @fontColor1;
          }
        }
        .choose-icon {
          width: 1rem;
          height: 1rem;
          fill: #ccc;
        }
        .choosed {
          fill: @btnColor;
        }
      }
    }
    .confirm-btn {
      width: 90%;
      margin: 0 auto;
      border-radius: .2rem;
      line-height: 1.8rem;
      background-color: @btnColor;
      font-size: .7rem;
      color: #fff;
      text-align: center;
    }
  }
</style>

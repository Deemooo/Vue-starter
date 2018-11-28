<template>
    <div class="exchange-vip">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="exchange-vip-title">兑换会员</span>
        </template>
      </top-header>
      <div class="vipcard-user">成功兑换后将关联到当前帐号: <span>{{ USERINFO.username }}</span></div>
      <form class="exchange-form" v-on:submit.prevent>
        <div class="password-wrap">
          <input type="text" name="cartNumber" placeholder="请输入10位卡号" required v-model='cartNumber'>
          <div v-if="checkcartNumber" class="input-error-tips">{{ this.erroTip('卡号') }}</div>
        </div>
        <div class="code-wrap">
          <input type="text" name="cartPassword" placeholder="请输入6位卡密" class="code" maxlength="6" v-model="cartPassword">
        </div>
        <div v-if="checkCartPassword" class="input-error-tips">{{ this.erroTip('卡密') }}</div>
        <div class="exchange-btn" @click="exchange">
          <input type="submit" name="submit" class="exchange-submit" value="兑换">
        </div>
      </form>
      <footer class="exchange-vip-tips">
        <div class="exchange-vip-tips-title">——温馨提示——</div>
        <div>新兑换的会员服务，权益以「会员说明」为准。</div>
        <div>月卡：<b>30次</b>减免配送费。</div>
        <div>季卡：<b>90次</b>减免配送费。</div>
        <div>年卡：<b>360</b>次减免配送费。</div>
        <div>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</div>
      </footer>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
      components: {},
      computed: {
        ...mapState([
          'USERINFO'
        ]),
        checkcartNumber () {
          return !(this.isNull(this.cartNumber) && this.validateCartNumber(this.cartNumber));
        },
        checkCartPassword () {
          return !(this.isNull(this.cartPassword) && this.validateCartPassword(this.cartPassword));
        }
      },
      data () {
          return {
            cartNumber: '',
            cartPassword: ''
          };
      },
      methods: {
        exchange () {
          if (!(this.checkcartNumber && this.checkCartPassword)) {
            let params = {
              number: this.cartNumber,
              password: this.cartPassword
            };
            this.https({url: '/member/v1/users/' + this.USERINFO.id + '/delivery_card/physical_card/bind', params, method: 'post'}).then(
              (res) => {
                if (res.message) {
                  this.$snotify.warning(res.message, {
                    showProgressBar: false,
                    timeout: 1000
                  });
                } else {
                  this.$snotify.success('兑换成功！', {
                    showProgressBar: false,
                    timeout: 1000
                  });
                }
              });
          }
        }
      },
      mounted () {
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .exchange-vip {
    width: 100%;
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
    .exchange-vip-title {
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
    .exchange-form {
      background-color: #fff;
      border-top: .025rem solid @gray;
      div {
        width: 100%;
        padding: .2rem 0;
        border-top: .025rem solid @gray;
        text-align: left;
        input {
          height: 1.4rem;
          width: 60%;
          margin-left: .4rem;
          border-radius: .1rem;
          padding: 0 .3rem;
          border: none;
          font-size: .65rem;
          color: @fontColor;
          outline: none;
        }
        input[type=submit] {
          margin-left: 0;
        }
      }
      .code-wrap {
        display: flex;
        align-items: center;
        img {
          margin-left: 1.4rem;
          background-color: @gray;
        }
      }
      .exchange-btn {
        position: relative;
        width: 100%;
        text-align: center;
        .exchange-submit {
          width: 90%;
          margin-top: .4rem;
          background-color: @blue;
          font-size: .65rem;
          color: #fff;
        }
      }
      .input-error-tips {
        width: 100%;
        height: 0.58rem;
        padding: .4rem;
        font-size: .58rem;
        color: @fontColor3;
        text-align: left;
      }
    }
    .exchange-vip-tips {
      text-align: center;
      div {
        margin-left: 10%;
        line-height: .8rem;
        text-align: left;
        font-size: .5rem;
        color: @fontColor2;
      }
      .exchange-vip-tips-title {
        margin: .6rem 0;
        text-align: center;
        font-weight: 400;
        font-size: .65rem;
        color: @fontColor2;
      }
    }
  }
</style>

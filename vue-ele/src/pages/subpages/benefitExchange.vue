<template>
    <div class="benefit-exchange">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="exchange-way-title">兑换红包</span>
        </template>
      </top-header>
      <form class="exchange-form" v-on:submit.prevent>
        <div class="exchange-code-wrap">
          <input type="text" name="exchangeCode" placeholder="请输入兑换码"  v-model='exchangeCode'>
          <div v-if="checkExchangeCode" class="input-error-tips">{{ this.erroTip('兑换码') }}</div>
        </div>
        <div class="code-wrap">
          <input type="text" name="codeNumber" placeholder="验证码" class="code" maxlength="4" v-model="codeNumber">
          <img v-show="captchaCodeImg" :src="captchaCodeImg" alt="验证码" @click="getCaptchaCode">
        </div>
        <div v-if="checkCodeNumber" class="input-error-tips">{{ this.erroTip('验证码') }}</div>
        <div class="exchange-btn" @click="exchange">
          <input type="submit" name="submit" class="exchange-submit" value="兑换">
        </div>
      </form>
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
      checkExchangeCode () {
        return !(this.isNull(this.exchangeCode) && this.validateExchangeCode(this.exchangeCode));
      },
      checkCodeNumber () {
        return !(this.isNull(this.codeNumber) && this.validateCodeNumber(this.codeNumber));
      }
    },
    data () {
        return {
          captchaCodeImg: '',
          exchangeCode: '',
          codeNumber: ''
        };
    },
    methods: {
      // 获取验证码
      getCaptchaCode () {
        let params = {};
        this.https({url: '/v1/captchas', params, method: 'post'}).then(
          (res) => {
            this.captchaCodeImg = res.code;
          });
      },
      exchange () {
        if (!(this.checkExchangeCode && this.checkCodeNumber)) {
          let params = {
            exchange_code: this.exchangeCode,
            captcha_code: this.codeNumber
          };
          this.https({url: '/v1/users/' + this.USERINFO.user_id + '/hongbao/exchange', params, method: 'post'}).then(
            (res) => {
              if (res.message) {
                this.$snotify.warning('res.message', {
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
      this.getCaptchaCode();
    },
    destroyed () {
      this.$snotify.clear();
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .benefit-exchange {
    width: 100%;
    overflow-y: auto;
    position: relative;
    font-size: .55rem;
    svg, span {
      box-sizing: border-box;
      color: #fff;
    }
    .arrow-left {
      margin-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .exchange-way-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .exchange-form {
      background-color: #fff;
      margin-top: 1.95rem;
      div {
        width: 100%;
        text-align: left;
        border-top: .025rem solid @gray;
        input {
          height: 1.4rem;
          width: 100%;
          padding: 0 .7rem;
          border-radius: .1rem;
          font-size: .65rem;
          color: @fontColor;
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
    }
  }
</style>

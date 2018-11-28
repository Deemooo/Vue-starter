<template>
    <div class="login">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="login-way">{{ loginWay ? '密码登录' : '手机登陆' }}</span>
          <span class="change-login-way" @click="changeLoginWay">登录方式</span>
        </template>
      </top-header>
      <!--密码登陆-->
      <form class="login-form" v-on:submit.prevent v-if="loginWay">
        <div>
          <input type="text" name="count" placeholder="账号" class="count" required v-model='userAccount'>
        </div>
        <div class="password-wrap">
          <input v-if="!showPassword" type="password" name="password" placeholder="密码" class="password" required v-model='password'>
          <input v-else type="text" name="password" placeholder="密码" class="password" required v-model='password'>
          <div class="switch" :class="{'password-show': showPassword }" @click="changePassWordType">
            <div class="switch-button" :class="{'switch-button-move': showPassword }"></div>
          </div>
        </div>
        <div class="code-wrap">
          <input type="text" name="codeNumber" placeholder="验证码" class="code" maxlength="4" v-model="codeNumber">
          <img v-show="captchaCodeImg" :src="captchaCodeImg" alt="验证码" @click="getCaptchaCode">
        </div>
        <div class="login-btn" @click="login">
          <input type="submit" name="submit" class="login-submit" value="登陆">
        </div>
        <div class="reset-btn" @click="$router.push('forget')">重置密码？</div>
      </form>
      <!--手机号登陆-->
      <form class="login-form" v-on:submit.prevent v-else>
        <div>
          <input type="text" placeholder="手机号码" name="phone" maxlength="11" required v-model='phoneNumber'>
          <span class="get-code-btn" :class="{'sended': !sendFlag}" @click.self="getVerifyCode" v-if="!sendFlag">获取验证码</span>
          <span class="get-code-btn" v-else>已发送 ({{ computeTime }}s)</span>
        </div>
        <div class="code-wrap">
          <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
        </div>
        <div class="login-btn">
          <input @click="login" type="submit" name="submit" class="login-submit" value="登陆">
        </div>
        <div class="reset-btn" @click="$router.push('forget')">重置密码？</div>
      </form>
    </div>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default {
        components: {},
        computed: {},
        data () {
            return {
              userAccount: '',
              password: '',
              codeNumber: '',
              captchaCodeImg: '',
              showPassword: false,
              loginWay: true,
              userInfo: {},
              phoneNumber: '',
              mobileCode: '',
              sendFlag: false,
              computeTime: 60
            };
        },
        methods: {
          ...mapMutations([
            'UPDATEUSERINFO'
          ]),
          // 获取验证码
          getCaptchaCode () {
            let params = {};
            this.https({url: '/v1/captchas', params, method: 'post'}).then(
              (res) => {
                this.captchaCodeImg = res.code;
              });
          },
          // 获取短信验证码
          getVerifyCode () {
            this.sendFlag = true;
            let clock = setInterval(() => {
              if (this.computeTime <= 0) {
                clearInterval(clock);
                this.sendFlag = false;
                this.computeTime = 60;
              } else {
                --this.computeTime;
              }
            }, 1000);
          },
          // 登陆
          login () {
            if (!this.userAccount) {
              alert('请输入手机号/邮箱/用户名！');
              return;
            } else if (!this.password) {
              alert('请输入密码！');
              return;
            } else if (!this.codeNumber) {
              alert('请输入验证码！');
              return;
            }
            let params = {
              username: this.userAccount,
              password: this.password,
              captcha_code: this.codeNumber
            };
            this.https({url: '/v2/login', params, method: 'post'}).then(
              (res) => {
                this.userInfo = res;
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (!this.userInfo.user_id) {
                  alert(this.userInfo.message);
                  this.getCaptchaCode();
                } else {
                  this.UPDATEUSERINFO(this.userInfo);
                  this.$router.go(-1);
                }
              });
          },
          changeLoginWay () {
            this.loginWay = !this.loginWay;
          },
          changePassWordType () {
            this.showPassword = !this.showPassword;
          }
        },
        mounted () {
          this.getCaptchaCode();
        },
        watch: {}
    };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .login {
    width: 100%;
    overflow-y: auto;
    position: relative;
    .login-way, .change-login-way {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      color: #fff;
      text-align: center;
      font-weight: 700;
    }
    .change-login-way {
      position: relative;
      left: .4rem;
      flex: 0 0 33.333%;
      font-size: .6rem;
      font-weight: 400;
      line-height: .6rem;
    }
    .arrow-left {
      flex: 0 0 33.333%;
      margin-left: .4rem;
      width: .6rem;
      height: .8rem;
      text-align: left;
    }
    .login-form {
      background-color: #fff;
      border-top: .025rem solid @gray;
      margin-top: 1.95rem;
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
        .get-code-btn {
          height: 1rem;
          padding: .28rem .4rem;
          border-radius: 0.15rem;
          background-color: @gray;
          font-size: .65rem;
          color: #fff;
        }
        .sended {
          background-color: @blue;
        }
      }
      .password-wrap {
        display: flex;
        align-items: center;
        .switch {
          position: relative;
          width: 2rem;
          height: 1rem;
          padding: 0 .2rem;
          margin-left: 1.2rem;
          border: .025rem;
          border-radius: .5rem;
          background-color: @backColor;
          .switch-button {
            position: absolute;
            top: -.1rem;
            left: 0;
            width: 1.2rem;
            height: 1.2rem;
            padding: 0;
            box-shadow: 0 0.02667rem 0.05333rem 0 rgba(0,0,0,.1);
            background-color: @gray;
            border-radius: 50%;
            transition: all .3s;
          }
          .switch-button-move {
            left: calc(~'100% - 1rem');
          }
        }
        .password-show {
          background-color: @blue;
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
      .login-btn {
        position: relative;
        width: 100%;
        text-align: center;
        .login-submit {
          width: 90%;
          margin-top: .4rem;
          background-color: @blue;
          font-size: .65rem;
          color: #fff;
        }
      }
      .reset-btn {
        box-sizing: border-box;
        padding-right: .6rem;
        border: none;
        font-size: .6rem;
        color: #3b95e9;
        text-align: right;
      }
    }
  }
</style>

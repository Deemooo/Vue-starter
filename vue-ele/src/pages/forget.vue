<template>
  <div class="login">
    <top-header>
      <template>
        <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
        <span class="login-way">重置密码</span>
      </template>
    </top-header>
    <!--密码登陆-->
    <form class="login-form" v-on:submit.prevent>
      <div>
        <input type="text" name="count" placeholder="账号" class="count" required v-model='userAccount'>
      </div>
      <div class="password-wrap">
        <input type="password" name="password" placeholder="旧密码" class="oldPassWord" required v-model='oldPassWord'>
      </div>
      <div class="password-wrap">
        <input type="password" name="password" placeholder="新密码" class="newPassWord" required v-model='newPassWord'>
      </div>
      <div class="password-wrap">
        <input type="password" name="password" placeholder="确认新密码" class="confirmPassWord" required v-model='confirmPassWord'>
      </div>
      <div class="code-wrap">
        <input type="text" name="codeNumber" placeholder="验证码" class="code" maxlength="4" v-model="codeNumber">
        <img v-show="captchaCodeImg" :src="captchaCodeImg" alt="验证码" @click="getCaptchaCode">
      </div>
      <div class="login-btn" @click="resetPassword">
        <input type="submit" name="submit" class="login-submit" value="确认修改">
      </div>
    </form>
    <vue-snotify></vue-snotify>
  </div>
</template>
<script>
  export default {
    components: {},
    computed: {},
    data () {
      return {
        userAccount: '',
        oldPassWord: '',
        newPassWord: '',
        confirmPassWord: '',
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
      // 获取验证码
      getCaptchaCode () {
        let params = {};
        this.https({url: '/v1/captchas', params, method: 'post'}).then(
          (res) => {
            this.captchaCodeImg = res.code;
          });
      },
      // 修改密码
      resetPassword () {
        if (!this.userAccount) {
          alert('请输入手机号/邮箱/用户名！');
          return;
        } else if (!this.oldPassWord) {
          alert('请输入密码！');
          return;
        } else if (!this.newPassWord) {
          alert('请输入新密码！');
          return;
        } else if (!this.confirmPassWord) {
          alert('请确认新密码！');
          return;
        } else if (this.newPassWord !== this.confirmPassWord) {
          alert('两次输入的密码不一致！');
          return;
        } else if (!this.codeNumber) {
          alert('请输入验证码！');
          return;
        }
        let params = {
          username: this.userAccount,
          oldpassWord: this.oldPassWord,
          newpassword: this.newPassWord,
          confirmpassword: this.confirmPassWord,
          captcha_code: this.codeNumber
        };
        this.https({url: '/v2/changepassword', params, method: 'post'}).then(
          (res) => {
            if (res.message) {
              this.$snotify.warning(res.message, {
                showProgressBar: false,
                timeout: 1000
              });
              this.getCaptchaCode();
            } else {
              alert('密码修改成功！');

            }
          });
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
    .login-way {
      flex: 0 0 92%;
      font-size: .8rem;
      line-height: .8rem;
      color: #fff;
      text-align: center;
      font-weight: 700;
    }
    .change-login-way {
      margin-right: .4rem;
      font-size: .6rem;
      font-weight: 400;
      line-height: .6rem;
    }
    .arrow-left {
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
      }
      .password-wrap {
        display: flex;
        align-items: center;
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
    }
  }
</style>

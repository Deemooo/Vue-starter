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
        <input type="text" name="count" placeholder="账号" class="count"  v-model='userAccount'>
        <div v-if="checkUserAccount" class="input-error-tips">{{ this.erroTip('账号') }}</div>
      </div>
      <div class="password-wrap">
        <input type="password" name="password" placeholder="旧密码" class="oldPassword"  v-model='oldPassword'>
        <div v-if="checkOldPassword" class="input-error-tips">{{ this.erroTip('旧密码') }}</div>
      </div>
      <div class="password-wrap">
        <input type="password" name="password" placeholder="新密码" class="newPassword"  v-model='newPassword'>
        <div v-if="checkNewPassword" class="input-error-tips">{{ this.erroTip('新密码') }}</div>
      </div>
      <div class="password-wrap">
        <input type="password" name="password" placeholder="确认新密码" class="confirmPassword"  v-model='confirmPassword'>
        <div v-if="checkConfirmPassword" class="input-error-tips">{{ this.erroTip('密码') }}</div>
      </div>
      <div class="code-wrap">
        <input type="text" name="codeNumber" placeholder="验证码" class="code" maxlength="4" v-model="codeNumber">
        <img v-show="captchaCodeImg" :src="captchaCodeImg" alt="验证码" @click="getCaptchaCode">
      </div>
      <div v-if="checkCodeNumber" class="input-error-tips">{{ this.erroTip('验证码') }}</div>
      <div class="login-btn" @click="resetPassword">
        <input type="submit" name="submit" class="login-submit" value="确认修改">
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    components: {},
    computed: {
      checkUserAccount () {
        return !(this.isNull(this.userAccount) && this.validateUser(this.userAccount));
      },
      checkOldPassword () {
        return !(this.isNull(this.oldPassword) && this.validatePassword(this.oldPassword));
      },
      checkNewPassword () {
        return !(this.isNull(this.newPassword) && this.validatePassword(this.newPassword));
      },
      checkConfirmPassword () {
        return this.newPassword === this.confirmPassword;
      },
      checkCodeNumber () {
        return !(this.isNull(this.codeNumber) && this.validateCodeNumber(this.codeNumber));
      }
    },
    data () {
      return {
        userAccount: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
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
        if (!(this.checkUserAccount && this.checkOldPassword && this.checkNewPassword && this.checkConfirmPassword && this.checkCodeNumber)) {
          let params = {
            username: this.userAccount,
            oldpassWord: this.oldPassword,
            newpassword: this.newPassword,
            confirmpassword: this.confirmPassword,
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
                this.$snotify.success('密码修改成功！', {
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
      margin-top: 1.95rem;
      div {
        width: 100%;
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

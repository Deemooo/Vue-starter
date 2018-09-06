<template>
    <div class="login">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="login-way">密码登录</span>
        </template>
      </top-header>
      <form class="login-form">
        <div>
          <input type="text" name="count" placeholder="账号" class="count" required v-model='userAccount'>
        </div>
        <div>
          <input type="password" name="password" placeholder="密码" class="password" required v-model='password'>
        </div>
        <div class="code-wrap">
          <input type="text" name="codeNumber" placeholder="验证码" class="code" maxlength="4" v-model="codeNumber">
          <img v-show="captchaCodeImg" :src="captchaCodeImg" alt="验证码" @click="getCaptchaCode">
        </div>
      </form>
    </div>
</template>
<script>
    export default {
        components: {},
        computed: {},
        data () {
            return {
              userAccount: '',
              password: '',
              codeNumber: '',
              captchaCodeImg: ''
            };
        },
        methods: {
          getCaptchaCode () {
            let params = {};
            this.https({url: '/v1/captchas', params, method: 'post'}).then(
              (res) => {
                this.captchaCodeImg = res.code;
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
      flex: 0 0 86%;
      font-size: .8rem;
      color: #fff;
      text-align: center;
      font-weight: 700;
    }
    .arrow-left {
      margin-left: .4rem;
      width: .6rem;
      height: .8rem;
      text-align: left;
    }
    .login-form {
      background-color: #fff;
      border-top: 1px solid @gray;
      border-bottom: 1px solid @gray;
      margin-top: 1.95rem;
      padding-top: .4rem;
      div {
        width: 90%;
        margin: 0 auto;
        text-align: left;
        input {
          height: 1.4rem;
          width: 60%;
          border-radius: .1rem;
          padding: 0 .3rem;
          margin-bottom: .4rem;
          border: 1px solid @gray;
          font-size: .65rem;
          color: @fontColor;
          outline: none;
        }
        .search-submit {
          background-color: @blue;
          font-size: .65rem;
          color: #fff;
        }
      }
      .code-wrap {
        display: flex;
        align-items: center;
        img {
          margin-bottom: .4rem;
          margin-left: 1.2rem;
          background-color: @gray;
        }
      }
    }
  }
</style>

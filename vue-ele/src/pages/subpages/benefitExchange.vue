<template>
    <div class="benefit-exchange">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="exchange-way">兑换红包</span>
        </template>
      </top-header>
      <form class="exchange-form" v-on:submit.prevent>
        <div class="password-wrap">
          <input type="text" name="password" placeholder="请输入兑换码" class="confirmPassWord" required v-model='confirmPassWord'>
        </div>
        <div class="code-wrap">
          <input type="text" name="codeNumber" placeholder="验证码" class="code" maxlength="4" v-model="codeNumber">
          <img v-show="captchaCodeImg" :src="captchaCodeImg" alt="验证码" @click="getCaptchaCode">
        </div>
        <div class="exchange-btn" @click="exchange">
          <input type="submit" name="submit" class="exchange-submit" value="兑换">
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
            captchaCodeImg: ''
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
        exchange () {}
      },
      mounted () {
        this.getCaptchaCode();
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .exchange-form {
    background-color: #fff;
    border-top: 1px solid @gray;
    margin-top: 1.95rem;
    div {
      width: 100%;
      padding: .2rem 0;
      border-top: 1px solid @gray;
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
  }
</style>

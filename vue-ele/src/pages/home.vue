<template>
    <div class="home">
      <top-header>
        <span class="head-logo" @click="reload">ele.me</span>
        <span class="head-login">登录 | 注册</span>
      </top-header>
      <nav class="city-nav">
        <div class="tip">
          <span>当前定位城市：</span>
          <span>定位不准时，请在城市列表中选择</span>
        </div>
        <router-link :to="'/city/' + guessCityid" class="guess-city">
          <span>{{ guessCity }}</span>
          <svg class="arrow-right">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
      </nav>
    </div>
</template>
<script>
    export default {
        components: {},
        computed: {},
        data () {
            return {
              guessCityid: '',
              guessCity: '北京'
            };
        },
        methods: {
          reload () {
            window.location.reload();
          }
        },
        mounted () {
        },
        watch: {}
    };
</script>
<style lang="less" scoped>
  .home {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    .head-logo {
      display: inline-block;
      margin-left: .4rem;
      font-weight: 400;
      font-size: .7rem;
      color: #fff;
    }
    .head-login {
      position: absolute;
      right: .4rem;
      display: inline-block;
      font-weight: 400;
      font-size: .7rem;
      color: #fff;
    }
    .city-nav {
      padding-top: 2.35rem;
      border-top: 1px solid #e4e4e4;
      background-color: #fff;
      margin-bottom: .4rem;
      .tip {
        display: flex;
        align-items: center;
        line-height: 1.45rem;
        border-bottom: 1px solid #e4e4e4;
        span:first-child {
          margin-left: .4rem;
          font-size: .55rem;
          color: #666;
        }
        span:last-child {
          font-weight: 900;
          font-size: .475rem;
          color: #9f9f9f;
        }
      }
      .guess-city {
        display: flex;
        align-items: center;
        height: 1.8rem;
        padding-left: .4rem;
        font-size: 0.75rem;
        text-decoration: none;
        border-bottom: 1px solid #e4e4e4;
        .arrow-right {
          position: absolute;
          right: .4rem;
          width: .6rem;
          height: .6rem;
          fill: #999;
        }
      }
    }
  }
</style>

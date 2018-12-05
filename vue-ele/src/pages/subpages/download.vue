<template>
    <div class="download">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="download-title">下载</span>
        </template>
      </top-header>
      <div class="download-content">
        <img src='../../assets/icon/elmlogo.jpeg' class="logo-img">
        <div class="download-content-text">下载饿了么APP</div>
        <div>
          <input type="submit" name="submit" class="search-submit" @click='download' value="下载">
        </div>
      </div>
      <vue-snotify></vue-snotify>
    </div>
</template>
<script>
  export default {
    components: {},
    computed: {},
    data () {
        return {};
    },
    methods: {
      download () {
        //判断系统
        let system = '';
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          system = 'Android';
        } else if (isIOS) {
          system = 'iOS';
        }
        if (system === 'IOS') {
          this.$snotify.warning('iOS用户请前往AppStore下载！', {
            showProgressBar: false,
            timeout: 1000
          });
        } else {
          try {
            let elemIF = document.createElement('iframe');
            elemIF.src = 'https://cangdu.org/files/elm.apk';
            elemIF.style.display = 'none';
            document.body.appendChild(elemIF);
          } catch (e) {
            this.$snotify.warning('下载失败！', {
              showProgressBar: false,
              timeout: 1000
            });
          }
        }
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
  .download {
    width: 100%;
    overflow-y: auto;
    position: relative;
    background-color: #fff;
    svg, span {
      box-sizing: border-box;
      color: #fff;
    }
    .arrow-left {
      margin-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .download-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .download-content {
      margin-top: 1.95rem;
      text-align: center;
      .logo-img {
        border-radius: 1rem;
        margin-top: 1rem;
      }
      .download-content-text {
        font-size: .8rem;
        color: @fontColor1;
        margin-bottom: 1rem;
      }
    }
    .search-submit {
      border-radius: .15rem;
      width: 95%;
      height: 1.4rem;
      background-color: @blue;
      font-size: .65rem;
      color: #fff;
    }
  }
</style>

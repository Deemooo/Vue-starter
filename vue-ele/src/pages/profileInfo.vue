<template>
    <div class="profile-info">
      <div class="profile-info-list">
        <router-link tag="div" to='/service' class="user-order">
          <svg class="icon" fill="#4aa5f0">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
          </svg>
          <span class="text">服务中心</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
        <router-link tag="div" to='/vipcard' class="user-order">
          <svg class="icon" fill="#3cabff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
          </svg>
          <span class="text">下载饿了么APP</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
      </div>
    </div>
</template>
<script>
  export default {
      components: {},
      computed: {},
      data () {
          return {};
      },
      methods: {},
      mounted () {
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .profile-info {
    width: 100%;
    overflow-y: auto;
    position: relative;
    color: #fff;
    background-color: @backColor;
    svg, span {
      box-sizing: border-box;
      color: #fff;
    }
    .arrow-left {
      margin-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .profile-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
  }
</style>

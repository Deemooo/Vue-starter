<template>
    <div class="bug-record">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="bug-record-title">购买记录</span>
        </template>
      </top-header>
      <div class="bug-record-content">
        <img src="../../assets/icon/no-log.png">
        <div class="no-record">没有购买记录</div>
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
  @import (reference) "../../assets/style/dynamic";
  .bug-record {
    width: 100%;
    overflow-y: auto;
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
    .bug-record-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
    }
    .bug-record-content {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.95rem;
      img {
        width: 8rem;
        height: 5rem;
      }
      .no-record {
        text-align: center;
        color: @fontColor1;
        font-size: .7rem;
      }
    }
  }
</style>

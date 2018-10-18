<template>
    <div class="address">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="address-title">编辑地址</span>
        </template>
      </top-header>
      <div class="address-list first-list">
        <router-link to="addAddress" class="address-list-item">
          <span class="text">新增收货地址</span>
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
  @import (reference) "../../assets/style/dynamic";
  .address {
    width: 100%;
    overflow-y: auto;
    position: relative;
    color: #fff;
    background-color: #fff;
    svg, span {
      box-sizing: border-box;
      color: #fff;
    }
    .arrow-left {
      flex: 0 0 33.333%;
      margin-left: .4rem;
      height: .8rem;
    }
    .address-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .address-list {
      .address-list-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: .6rem;
        border-bottom: .025rem solid @gray;
        .upload-avatar {
          display: none;
        }
        .text {
          flex: 1 0 60%;
          font-size: .7rem;
          color: @fontColor;
        }
        .avatar-default {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: #fff;
          margin: 0 .3rem;
        }
        .arrow {
          width: .46667rem;
          height: .46667rem;
        }
      }
    }
    .first-list {
      margin-top: 1.95rem;
    }
  }
</style>

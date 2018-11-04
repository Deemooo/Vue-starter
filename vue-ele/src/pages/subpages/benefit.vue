<template>
  <div class="benefit">
    <top-header>
      <template>
        <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
        <span class="benefit-title">我的优惠</span>
      </template>
    </top-header>
    <div class="tabs-title">
      <span :class="{selected: benefitType === 0}" @click="benefitType = 0">红包</span>
      <span :class="{selected: benefitType === 1}" @click="benefitType = 1">商家代金券</span>
    </div>
    <div class="current-benefit-head">
      <span class="head-title">有 {{ benefitList.length }}个红包即将到期</span>
      <router-link tag="span" to="benefitDetail" class="benefit-explain">
        <img src="../../assets/icon/description.png">
        <span>红包说明</span>
      </router-link>
    </div>
    <div class="benefit-item-wrap">

    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    computed: {},
    data () {
      return {
        benefitType: 0,
        benefitList: []
      };
    },
    methods: {},
    mounted () {
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .benefit {
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
    .benefit-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .tabs-title {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 1.95rem;
      height: 2rem;
      background-color: #fff;
      span {
        padding-bottom: .2rem;
        text-align: center;
        font-size: .65rem;
        color: @fontColor;
      }
      .selected {
        border-bottom: .025rem solid #3190e8;
        color: @blue;
      }
    }
    .current-benefit-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .4rem;
      background-color: #fff;
      span {
        font-size: .55rem;
      }
      .head-title {
        color: @fontColor1;
      }
      .benefit-explain {
        display: flex;
        align-items: center;
        img {
          width: .6rem;
          height: .6rem;
          margin-right: .2rem;
        }
        span {
          color: @blue;
        }
      }
    }
    .benefit-item-wrap {
      display: flex;
      align-items: center;
      background: #fff url(../../assets/icon/hongbao.png) repeat-x ;
      background-size: .5rem .2rem;
    }
  }
</style>

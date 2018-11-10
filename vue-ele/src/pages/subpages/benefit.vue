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
    <div v-show="benefitType === 0">
      <div class="current-benefit-head">
        <span class="head-title">有 {{ benefitList.length }}个红包即将到期</span>
        <router-link tag="span" to="benefitDetail" class="benefit-explain">
          <img src="../../assets/icon/description.png">
          <span>红包说明</span>
        </router-link>
      </div>
      <div class="benefit-item-wrap">
        <div class="benefit-item-left">
          <div class="benefit-item-left-money">
            <span>¥</span>
            <span class="number">1</span>
            <span>.0</span>
          </div>
          <div class="benefit-item-left-condition">满 20 元可用</div>
        </div>
        <div class="benefit-item-right">
          <div class="benefit-item-right-item">
            <div class="share-benefit">分享红包</div>
            <div class="benefit-item-right-condition">
              <div>2017-05-23到期</div>
              <div>限收货手机号为 13681711254</div>
            </div>
          </div>
          <div class="benefit-item-right-date">剩3日</div>
        </div>
      </div>
    </div>
    <div v-show="benefitType === 1">
      <div class="current-benefit-head">
        <router-link tag="span" to="couponDetail" class="benefit-explain">
          <img src="../../assets/icon/description.png">
          <span>商家代金券说明</span>
        </router-link>
      </div>
      <div class="benefit-item-wrap">

      </div>
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
        color: @fontColor2;
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
      background: url(../../assets/icon/hongbao.png) repeat-x ;
      background-size: .5rem .2rem;
      padding: .8rem .4rem;
      margin: 0 .5rem;
      box-shadow: .1rem .1rem .025rem .1rem @backColor;
      .benefit-item-left {
        flex: 0 0 20%;
        border-right: .025rem dotted @gray;
        .benefit-item-left-money {
          word-spacing: -.4rem;
          span {
            font-size: .75rem;
            color: @fontColor4;
            font-weight: 700;
          }
          .number {
            font-size: 1.5rem;
            color: @fontColor4;
          }
        }
        .benefit-item-left-condition {
          font-size: .4rem;
          color: @fontColor2;
        }
      }
      .benefit-item-right {
        flex: 0 0 70%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .benefit-item-right-item {
          margin-left: 1rem;
          .share-benefit {
            font-size: .7rem;
            color: @fontColor1;
          }
          .benefit-item-right-condition {
            font-size: .4rem;
            div {
              color: @fontColor2;
            }
          }
        }
        .benefit-item-right-date {
          margin-left: .4rem;
          font-size: .75rem;
          color: @fontColor4;
        }
      }
    }
  }
</style>

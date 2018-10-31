<template>
  <div class="point">
    <top-header>
      <template>
        <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
        <span class="point-title">我的积分</span>
      </template>
    </top-header>
    <div class="current-point">
      <div class="current-point-wrap">
        <div class="head">
          <span class="head-title">当前积分</span>
          <router-link tag="span" to="pointDetail" class="point-explain">
            <img src="../../assets/icon/description.png">
            <span>积分说明</span>
          </router-link>
        </div>
        <div class="count">
          <span class="count-number">0</span>
          <span class="count-unit">分</span>
        </div>
        <div class="btn-wrap">
          <input type="submit" class="search-submit" value="积分兑换商品">
        </div>
      </div>
    </div>
    <div class="point-detail">
      <div class="division">最近30天积分纪录</div>
      <img src="../../assets/icon/no-log.png">
      <div class="no-record">最近30天无积分纪录</div>
      <div class="no-record">快去下单赚取大量积分吧~</div>
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
  .point {
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
    .point-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .current-point {
      margin-top: 1.95rem;
      padding: .3rem;
      background-color: @blue;
      .current-point-wrap {
        padding: .4rem;
        border-radius: .15rem;
        background-color: #fff;
        .head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: .55rem;
          }
          .head-title {
            color: @fontColor1;
          }
          .point-explain {
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
        .count {
          margin: .5rem 0;
          .count-number {
            font-size: 1.8rem;
            color: @fontColor;
          }
          .count-unit {
            font-size: .7rem;
            color: @fontColor;
          }
        }
        .btn-wrap {
          width: 100%;
          margin: 0 auto;
          text-align: center;
          input {
            border: .025px solid @gray;
            padding: 0 .3rem;
            font-size: .65rem;
            outline: none;
          }
          .search-submit {
            border-radius: .15rem;
            width: 100%;
            height: 1.4rem;
            color: #fff;
          }
        }
      }
    }
    .point-detail {
      text-align: center;
      background-color: #fff;
      .division {
        padding: .4rem;
        text-align: left;
        font-size: .5rem;
        color: @fontColor1;
      }
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

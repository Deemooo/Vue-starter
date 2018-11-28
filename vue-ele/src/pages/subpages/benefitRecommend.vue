<template>
    <div class="benefit-recommend">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="benefit-recommend-title">推荐有奖</span>
        </template>
      </top-header>
      <div class="benefit-recommend-activity">
        <img src="../../assets/icon/activity.png" alt="推荐有奖" class="benefit-recommend-activity-img">
      </div>
      <div class="benefit-recommend-way" @click="shareWay">
        <div class="benefit-recommend-way-wrap">
          <img class="benefit-recommend-way-img" src="../../assets/icon/weixin.png" alt="微信">
          <div class="benefit-recommend-way-text">邀请微信好友</div>
        </div>
        <div class="benefit-recommend-way-wrap">
          <img class="benefit-recommend-way-img" src="../../assets/icon/qq.png" alt="QQ">
          <div class="benefit-recommend-way-text">邀请QQ好友</div>
        </div>
        <div class="benefit-recommend-way-wrap">
          <img class="benefit-recommend-way-img" src="../../assets/icon/fenxiang.png" alt="面对面分享">
          <div class="benefit-recommend-way-text">面对面分享</div>
        </div>
      </div>
      <div class="benefit-recommend-profit">
        <div class="benefit-recommend-profit-item">
          <div class="benefit-recommend-profit-item-text">累计收益</div>
          <div class="benefit-recommend-profit-item-num">
            <span class="number">0</span>
            <span>元</span>
          </div>
        </div>
        <div class="benefit-recommend-profit-item">
          <div class="benefit-recommend-profit-item-text">成功邀请</div>
          <div class="benefit-recommend-profit-item-num">
            <span class="number">0</span>
            <span>人</span>
          </div>
        </div>
      </div>
      <div class="benefit-recommend-detailed">-收益明细-</div>
      <div class="detailed-tips">
        <img src="../../assets/icon/qianbao.png">
        <div>还不赶紧去邀请好友</div>
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
      methods: {
        shareWay () {
          this.$snotify.warning('请在APP中打开！', {
            showProgressBar: false,
            timeout: 1000
          });
        }
      },
      mounted () {
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .benefit-recommend {
    width: 100%;
    overflow-y: auto;
    position: relative;
    font-size: .55rem;
    font-family: Helvetica Neue,Tahoma,Arial;
    svg, span {
      box-sizing: border-box;
      color: #fff;
    }
    .arrow-left {
      margin-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .benefit-recommend-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .benefit-recommend-activity {
      .benefit-recommend-activity-img {
        width: 100%;
        height: 10rem;
      }
    }
    .benefit-recommend-way {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 1rem 0;
      background-color: #fff;
      .benefit-recommend-way-img {
        width: 2.5rem;
        height: 2.5rem;
      }
      .benefit-recommend-way-text {
        font-size: .5rem;
        color: @fontColor;
      }
    }
    .benefit-recommend-profit {
      display: flex;
      align-items: center;
      padding-top: 1rem;
      font-size: .5rem;
      color: @fontColor1;
      border-top: .025rem solid @gray;
      .benefit-recommend-profit-item {
        flex: 0 0 50%;
        text-align: center;
        .number {
          font-size: .8rem;
          color: #ff5633;
          font-weight: 700;
        }
        span {
          color: @fontColor1;
        }
      }
      .benefit-recommend-profit-item:first-child {
        border-right: .025rem solid @gray;
      }
    }
    .benefit-recommend-detailed {
      margin-top: 1rem;
      text-align: center;
      font-size: .5rem;
      color: @fontColor1;
    }
    .detailed-tips {
      margin-top: 1rem;
      font-size: .5rem;
      text-align: center;
      img {
        width: 1.3rem;
        height: 1.6rem;
        margin-bottom: 0.2rem;
      }
      div {
        color: @fontColor2;
      }
    }
  }
</style>

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
        <span class="head-title">有 <span>{{ benefitList.length }}</span>个红包即将到期</span>
        <router-link tag="span" to="benefitDetail" class="benefit-explain">
          <img src="../../assets/icon/description.png">
          <span>红包说明</span>
        </router-link>
      </div>
      <div class="benefit-wrap" v-for="item in benefitList" :key="item.id">
        <div class="benefit-item-wrap">
          <div class="benefit-item-left">
            <div class="benefit-item-left-money">
              <span>¥</span>
              <span class="number">{{ String(item.amount).split('.')[0] }}</span>
              <span>.</span>
              <span>{{ String(item.amount).split('.')[1]||0 }}</span>
            </div>
            <div class="benefit-item-left-condition">{{ item.description_map.sum_condition }}</div>
          </div>
          <div class="benefit-item-right">
            <div class="benefit-item-right-item">
              <div class="share-benefit">{{ item.name }}</div>
              <div class="benefit-item-right-condition">
                <div>{{ item.description_map.validity_periods }}</div>
                <div>{{ item.description_map.phone }}</div>
              </div>
            </div>
            <div class="benefit-item-right-date">{{item.description_map.validity_delta}}</div>
          </div>
        </div>
        <div v-if="item.limit_map" class="benefit-item-limit">{{ item.limit_map.restaurant_flavor_ids }}</div>
      </div>
      <router-link tag="div" to="benefitHistory" class="benefit-history">
        <span class="check-history">查看历史红包</span>
        <svg class="history-right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
      <footer class="benefit-footer">
        <router-link to="benefitExchange" class="benefit-footer-action">
          兑换红包
        </router-link>
        <router-link to="benefitRecommend" class="benefit-footer-action">
          推荐有奖
        </router-link>
      </footer>
    </div>
    <div v-show="benefitType === 1">
      <div class="coupon-detail-head">
        <router-link tag="span" to="couponDetail" class="coupon-explain">
          <img src="../../assets/icon/description.png">
          <span>商家代金券说明</span>
        </router-link>
      </div>
      <div class="coupon-detail">
        <img src="../../assets/icon/voucher.png">
        <div class="no-record">无法使用代金券~</div>
        <div class="no-record-explain">非客户端或客户端版本过低</div>
        <router-link to="/download" tag="span" class="download-app">
          下载或升级客户端
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    components: {},
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    data () {
      return {
        benefitType: 0,
        benefitList: []
      };
    },
    methods: {
      getBenefitList () {
        if (this.userInfo) {
          this.https({url: '/promotion/v2/users/' + this.userInfo.id + '/hongbaos?limit=20&offset=0', method: 'get'}).then(
            (res) => {
              this.benefitList = res;
            });
        }
      }
    },
    mounted () {
      this.getBenefitList();
    },
    watch: {
      userInfo () {
        this.getBenefitList();
      }
    }
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
        color: @fontColor1;
        span {
          color: @fontColor4;
        }
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
    .coupon-detail-head {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: .4rem;
      background-color: #fff;
      span {
        font-size: .55rem;
      }
      .coupon-explain {
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
    .benefit-wrap {
      margin: .2rem 0;
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
            word-spacing: -.3rem;
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
      .benefit-item-limit {
        padding: .4rem;
        font-size: .4rem;
        color: @fontColor2;
        text-align: center;
      }
    }
    .benefit-history {
      padding: 1rem 0;
      text-align: center;
      .check-history {
        font-size: .5rem;
        color: @fontColor2;
      }
      .history-right {
        width: .4rem;
        height: .4rem;
        fill: #aaa;
      }
    }
    .benefit-footer {
      position: fixed;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      background-color: #fff;
      .benefit-footer-action {
        flex: 0 0 50%;
        line-height: 2rem;
        text-align: center;
        font-size: .7rem;
        color: @fontColor;
      }
      .benefit-footer-action:first-child {
        border-right: .025rem solid @gray;
      }
    }
    .coupon-detail {
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
      .no-record-explain {
        font-size: .5rem;
        color: @fontColor2;
        margin-top: .3rem;
        margin-bottom: .3rem;
      }
      .download-app {
        display: inline-block;
        padding: .3rem;
        border-radius: .15rem;
        background-color: @blue;
        font-size: .65rem;
        color: #fff;
      }
    }
  }
</style>

<template>
    <div class="benefit-history">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="benefit-history-title">历史红包</span>
        </template>
      </top-header>
      <div class="benefit-history-list">
        <div class="benefit-wrap" v-for="item in expiredList" :key="item.id">
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
              <div class="benefit-item-right-date">
                <svg class="expired">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#expired"></use>
                </svg>
              </div>
            </div>
          </div>
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
          'USERINFO'
        ])
      },
      data () {
          return {
            expiredList: []
          };
      },
    methods: {
      getExpiredList () {
        if (this.USERINFO) {
          this.https({url: '/promotion/v2/users/' + this.USERINFO.id + '/expired_hongbaos?limit=20&offset=0', method: 'get'}).then(
            (res) => {
              this.expiredList = res;
            });
        }
      }
    },
    mounted () {
      this.getExpiredList();
    },
    watch: {
      USERINFO () {
        this.getExpiredList();
      }
    }
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .benefit-history {
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
    .benefit-history-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .benefit-history-list {
      margin-top: 1.95rem;
      padding: .4rem;
      .benefit-wrap {
        margin: .2rem 0;
        .benefit-item-wrap {
          display: flex;
          align-items: center;
          background: url(../../assets/icon/expired.png) repeat-x ;
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
                color: @fontColor2;
                font-weight: 700;
              }
              .number {
                font-size: 1.5rem;
                color: @fontColor2;
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
              .expired {
                fill: #ddd;
                width: 3rem;
                height: 3rem;
              }
            }
          }
        }
      }
    }
  }
</style>

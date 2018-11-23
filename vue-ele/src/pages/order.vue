<template>
    <div class="order">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="order-title">订单列表</span>
        </template>
      </top-header>
      <div v-load-more="getMoreList" class="order-list-wrap">
        <div v-for="item in orderList" :key="item.id" class="order-list-item">
          <div @click="showOrderDetail(item)" class="order-item-shop">
            <img :src="imgBaseUrl + item.restaurant_image_url" alt="店铺图片" class="order-item-shop-img">
            <div class="order-item-shop-info">
              <div class="order-item-shop-info-left">
                <div class="shop-name">
                  <span>{{ item.restaurant_name }}</span>
                  <svg fill="#333" class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </div>
                <div class="order-time">{{ item.formatted_created_at }}</div>
              </div>
              <div class="order-item-shop-info-right">
                {{ item.status_bar.title }}
              </div>
            </div>
          </div>
          <div class="order-item-food">
            <div class="order-item-food-left">
              {{ item.basket.group[0][0].name }}{{ item.basket.group[0].length > 1 ? '等' + item.basket.group[0].length + '件商品' : '' }}
            </div>
            <div class="order-item-food-right">
              ¥{{ item.total_amount.toFixed(2) }}
            </div>
          </div>
          <div class="order-item-btn-wrap">
            <div v-if="item.status_bar.title == '等待支付'" class="order-item-btn-pay">等待支付</div>
            <div v-else class="order-item-btn-again">再来一单</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import { imgBaseUrl } from '../../config/env';
  import { loadMore } from '../publicFn/loadMore'
  export default {
    mixins: [loadMore],
    components: {},
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    data () {
        return {
          imgBaseUrl,
          orderList: [],
          offset: 0
        };
    },
    methods: {
      ...mapMutations([
        'SAVEORDERDETAIL'
      ]),
      // 获取订单列表
      getOrderList () {
        let params = this.setStrOfUrl({
          limit: 10,
          offset: this.offset
        });
        this.https({url: '/bos/v2/users/' + this.userInfo.user_id + '/orders' + params, method: 'get'}).then(
          (res) => {
            this.orderList = res;
          });
      },
      // 获取更多订单
      getMoreList () {
        this.offset += 10;
        let params = this.setStrOfUrl({
          limit: 10,
          offset: this.offset
        });
        this.https({url: '/bos/v2/users/' + this.userInfo.user_id + '/orders' + params, method: 'get'}).then(
          (res) => {
            this.orderList = [...this.orderList].concat(res);
          });
      },
      // 展示订单细节
      showOrderDetail (item) {
        this.SAVEORDERDETAIL(item);
        this.$router.push('orderDetail');
      }
    },
    mounted () {
      this.getOrderList();
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .order {
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
    .order-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
    }
    .order-list-wrap {
      margin-top: 1.95rem;
      .order-list-item {
        padding: .8rem;
        box-shadow: 0.025rem 0 0.25rem @gray;
        .order-item-shop {
          display: flex;
          align-items: center;
          .order-item-shop-img {
            flex: 0;
            width: 2rem;
            height: 2rem;
            margin-right: .4rem;
          }
          .order-item-shop-info {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .order-item-shop-info-left {
              .shop-name {
                display: flex;
                align-items: center;
                span {
                  margin-right: .2rem;
                  font-size: .75rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                svg {
                  width: .4rem;
                  height: .4rem;
                  fill: #ccc;
                }
              }
              .order-time {
                line-height: .8rem;
                font-size: .55rem;
                color: @fontColor2;
              }
            }
            .order-item-shop-info-right {
              font-size: .6rem;
              color: #333;
            }
          }
        }
        .order-item-food {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 2.4rem;
          line-height: 2rem;
          .order-item-food-left {
            font-size: .6rem;
            color: @fontColor1;
          }
          .order-item-food-right {
            font-size: .6rem;
            color: @fontColor4;
            font-weight: 700;
          }
        }
        .order-item-btn-wrap {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          div {
            padding: .1rem .2rem;
            border-radius: .15rem;
            font-size: .55rem;
          }
          .order-item-btn-again {
            border: .025rem solid @blue;
            color: @blue;
          }
          .order-item-btn-pay {
            border: .025rem solid @fontColor3;
            color: @fontColor3;
          }
        }
      }
    }
  }
</style>

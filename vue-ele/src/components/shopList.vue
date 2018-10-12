<!--商家列表-->
<template>
    <div class="shop-list">
      <div v-if="shopListArr.length">
        <router-link :to="{path: 'shop', query:{geohash, id: item.id}}" v-for="item in shopListArr" tag='div' :key="item.id" class="shop-list-item">
          <div class="img-wrap">
            <img :src="imgBaseUrl + item.image_path" class="shop-img">
          </div>
          <div class="shop-info">
            <div class="header">
              <span :class="{premium: item.is_premium}" class="shop-title">{{ item.name }}</span>
              <span class="shop-detail">
                <span v-for="item in item.supports" :key="item.id" class="supports">{{ item.icon_name }}</span>
              </span>
            </div>
            <div class="middle">
              <div class="rating-wrap">
                <rating-star :rating="item.rating"></rating-star>
                <span class="rating-num">{{ item.rating }}</span>
                <span class="order-wrap">
                月售{{ item.recent_order_num }}单
              </span>
              </div>
              <span class="shop-feature">
                <span class="delivery delivery-left" v-if="item.delivery_mode">{{ item.delivery_mode.text }}</span>
                <span class="delivery delivery-right" v-if="zhunshi(item.supports)">准时达</span>
              </span>
            </div>
            <div class="footer">
              <span class="fee">
                ¥{{ item.float_minimum_order_amount }}起送
                <span class="segmentation">/</span>
                {{ item.piecewise_agent_fee.tips }}
              </span>
              <span class="distance-time">
                <span class="distance" v-if="Number(item.distance)">{{ item.distance > 1000 ? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
                  <span class="segmentation">/</span>
                </span>
                <span class="distance" v-else>{{ item.distance }}</span>
                <span class="segmentation">/</span>
                <span class="order-time">{{ item.order_lead_time }}</span>
              </span>
            </div>
          </div>
        </router-link>
      </div>
      <div v-else class="no-shop-list">
        更多商家接入中，敬请期待~
      </div>
      <div class="back-top-btn" @click="backTop" v-if="showBackBtn">
        <svg class="back-top-btn-svg">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
        </svg>
      </div>
    </div>
</template>
<script>
  import { imgBaseUrl } from '../../config/env';
  import { mapState } from 'vuex';
  import ratingStar from '../components/ratingStar';
  export default {
    props: ['restaurantCategoryId', 'restaurantCategoryId1', 'sortByType', 'deliveryMode', 'supportIds', 'confirmStatus'],
    components: {
        ratingStar
      },
      computed: {
        ...mapState([
          'geohash'
        ])
      },
      data () {
          return {
            imgBaseUrl,
            shopListArr: [],
            offset: 0,
            showBackBtn: false
          };
      },
      methods: {
        getShopList () {
          let supportStr = '';
          if (this.supportIds) {
            this.supportIds.forEach(item => {
              if (item.status) {
                supportStr += '&support_ids[]=' + item.id;
              }
            });
          }
          let params = this.setStrOfUrl({
            latitude: this.latitude,
            longitude: this.longitude,
            offset: this.offset,
            limit: '20',
            'extras[]': 'activities',
            keyword: '',
            restaurant_category_id: this.restaurantCategoryId,
            'restaurant_category_ids[]': this.restaurantCategoryId1,
            order_by: this.sortByType,
            'delivery_mode[]': this.deliveryMode + supportStr
          });
          this.https({url: '/shopping/restaurants' + params, method: 'get'}).then(
            (res) => {
              this.shopListArr = res;
            });
        },
        zhunshi (supports) {
          return supports.some((item) => {
            return item.icon_name === '准';
          });
        },
        // scroll事件监听
        listenScroll () {
          document.addEventListener('scroll', () => {
            let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            this.showBackBtn = top > 500;
          });
        },
        // 返回顶部
        backTop () {
          if (document.documentElement.scrollTop) {
            document.documentElement.scrollTop = 0;
          } else if (document.body.scrollTop) {
            document.body.scrollTop = 0;
          }
        }
      },
      mounted () {
        this.getShopList();
        this.listenScroll();
      },
      watch: {
        restaurantCategoryId1 () {
          this.getShopList();
        },
        sortByType () {
          this.getShopList();
        },
        confirmStatus () {
          this.getShopList();
        }
      }
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .shop-list {
    .shop-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: .025rem solid #f1f1f1;
      padding: .7rem .4rem;
      .img-wrap {
        flex: 0 0 25%;
        .shop-img {
          display: block;
          width: 3rem;
          height: 3rem;
        }
      }
      .shop-info {
        flex: 1 0 65%;
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .shop-title {
            width: 8.5rem;
            color: @fontColor;
            padding-top: .01rem;
            font: .65rem/.65rem PingFangSC-Regular;
            font-weight: 700;
          }
          .premium::before {
            content: '品牌';
            display: inline-block;
            font-size: 0.5rem;
            line-height: .6rem;
            color: #333;
            background-color: #ffd930;
            padding: 0 0.1rem;
            border-radius: 0.1rem;
            margin-right: 0.2rem;
          }
          .shop-detail {
            display: flex;
            align-items: center;
            .supports {
              font-size: .5rem;
              color: #999;
              border: .025rem solid #f1f1f1;
              padding: 0 .04rem;
              border-radius: .08rem;
              margin-left: .05rem;
            }
          }
        }
        .middle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: .52rem 0;
          .rating-wrap {
            display: flex;
            align-items: center;
            .rating-num {
              font-size: .4rem;
              color: #ff6000;
              margin: 0 .2rem;
            }
          }
          .order-wrap {
            transform: scale(.8);
            margin-left: -.2rem;
            font-size: .4rem;
            color: @fontColor1;
          }
          .shop-feature {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            transform: scale(.7);
            min-width: 5rem;
            margin-right: -0.8rem;
            .delivery {
              font-size: .4rem;
              padding: .04rem .08rem 0;
              border-radius: .08rem;
              margin-left: .08rem;
            }
            .delivery-left {
              color: #fff;
              background-color: @blue;
              border: .025rem solid @blue;
            }
            .delivery-right {
              color: @blue;
              border: .025rem solid @blue;
            }
          }
        }
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .fee {
            transform: scale(.9);
            font-size: .5rem;
            color: #666;
          }
          .distance-time {
            font-size: .5rem;
            transform: scale(.9);
            .distance, .segmentation {
              color: @fontColor1;
            }
            .order-time {
              color: @blue;
            }
          }
        }
      }
    }
    .back-top-btn {
      position: fixed;
      bottom: 3rem;
      right: 1rem;
      .back-top-btn-svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }
  .no-shop-list {
    padding-top: .5rem;
    border-top: .025rem solid @gray;
    text-align: center;
    color: @fontColor1;
  }
</style>

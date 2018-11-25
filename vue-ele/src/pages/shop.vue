<template>
    <div class="shop">
      <img :src="imgBaseUrl + shopDetail.image_path" class="shop-info-bg">
      <top-header class="shop-header">
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
        </template>
      </top-header>
      <div class="shop-content">
        <div class="shop-info">
          <div class="shop-info-left">
            <img :src="imgBaseUrl + shopDetail.image_path">
          </div>
          <router-link div="tag" to="shopDetail" class="shop-info-right">
            <div class="shop-info-right-text">
              <div class="shop-name">
                {{ shopDetail.name }}
              </div>
              <div class="shop-desc">
                商家配送／{{ shopDetail.order_lead_time }}分钟送达／配送费¥{{ shopDetail.float_delivery_fee }}
              </div>
              <div class="shop-promotion">
                公告：{{ this.shopDetail.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。' }}
              </div>
            </div>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
              <path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
            </svg>
          </router-link>
        </div>
        <div class="shop-food-list">
          <div class="tabs-title">
            <span :class="{selected: tabType === 0}" @click="tabType = 0">商品</span>
            <span :class="{selected: tabType === 1}" @click="tabType = 1">评价</span>
          </div>
          <div v-show="tabType === 0" class="shop-food-wrap">
            <div class="food-menu">
              <li v-for="(item,index) in menuList" :key="index" class="menu-list-item">
                <span>{{ item.name }}</span>
              </li>
            </div>
            <div class="food-list">
              <div v-for="(item,index) in menuList" :key="index" class="food-item">
                <header class="food-item-header">
                  <span class="name">{{ item.name }}</span>
                  <span class="description">{{ item.description }}</span>
                </header>
              </div>
            </div>
          </div>
          <div v-show="tabType === 1">
            评价
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import { imgBaseUrl } from '../../config/env';
  export default {
    components: {},
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    data () {
        return {
          imgBaseUrl,
          geohash: '',
          shopId: '',
          shopDetail: {},
          tabType: 0,
          menuList: []
        };
    },
    methods: {
      ...mapMutations([
        'saveGeohash'
      ]),
      // 获取商铺信息
      getShopDetail () {
        let params = this.setStrOfUrl({
          latitude: this.geohash.split(',')[0],
          longitude: this.geohash.split(',')[1]
        });
        this.https({url: '/shopping/restaurant/' + this.shopId + params, method: 'get'}).then(
          (res) => {
            this.shopDetail = res;
          });
      },
      // 获取列表信息
      getMenuList () {
        this.https({url: '/shopping/v2/menu?restaurant_id=' + this.shopId, method: 'get'}).then(
          (res) => {
            this.menuList = res;
          });
      }
    },
    mounted () {
      this.geohash = this.$route.query.geohash;
      this.shopId = this.$route.query.id;
      this.getShopDetail();
      this.getMenuList();
      this.saveGeohash(this.geohash);
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .shop {
    width: 100%;
    overflow-y: auto;
    position: relative;
    color: #fff;
    .shop-header {
      background-color: rgba(119,103,137,.43);
    }
    svg {
      box-sizing: border-box;
    }
    .arrow-left {
      margin-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .shop-info-bg {
      position: absolute;
      width: 100%;
      height: 20%;
      z-index: 9;
      filter: blur(10px);
    }
    .shop-content {
      position: relative;
      margin-top: 1.95rem;
      z-index: 10;
      .shop-info {
        display: flex;
        align-items: center;
        padding: .4rem;
        background-color: rgba(119,103,137,.43);
        .shop-info-left {
          margin-right: .3rem;
          img {
            width: 2.9rem;
            height: 2.9rem;
          }
        }
        .shop-info-right {
          flex: 60%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .shop-info-right-text {
            & > div {
              color: #fff;
            }
            .shop-name {
              font-size: .8rem;
              font-weight: 700;
            }
            .shop-desc {
              font-size: .5rem;
              margin: .3rem 0;
            }
            .shop-promotion {
              font-size: .5rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
    .shop-food-list {
      background-color: #fff;
      .tabs-title {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 2rem;
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
      .shop-food-wrap {
        display: flex;
        border-top: .025rem solid @gray;
        .food-menu {
          width: 3.8rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-shadow: .025rem 0 .025rem @gray;
          .menu-list-item {
            display: flex;
            align-items: center;
            width: 100%;
            padding: .7rem .3rem;
            border-bottom: .025rem solid @gray;
            box-sizing: border-box;
            text-align: left;
            span {
              font-size: .6rem;
              font-weight: 500;
              color: @fontColor1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .food-list {
          flex: 70%;
          .food-item-header {
            display: flex;
            align-items: center;
            padding: .4rem;
            .name {
              font-size: .7rem;
              color: @fontColor;
              font-weight: 700;
            }
            .description {
              font-size: .5rem;
              color: @fontColor2;
              overflow: hidden;
            }

          }
        }
      }
    }
  }
</style>

<template>
    <div class="order-detail">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="order-detail-title">订单详情</span>
        </template>
      </top-header>
      <div class="order-detail-content">
        <div class="order-detail-content-title">
          <img :src="imgBaseUrl + orderDetail.restaurant_image_url">
          <div class="order-status">{{ orderDetail.status_bar.title }}</div>
          <div v-if="orderDetail.timeline_node.description" class="order-des">{{ orderDetail.timeline_node.description }}</div>
          <router-link tag="div" :to="{path: '/shop', query: {geohash, id: orderDetail.restaurant_id}}" class="order-item-btn-again">再来一单</router-link>
        </div>
        <div class="order-detail-info">
          <router-link tag="div" :to="{path: '/shop', query: {geohash, id: orderDetail.restaurant_id}}" class="order-detail-info-item">
            <div class="shop-name">
              <img :src="imgBaseUrl + orderDetail.restaurant_image_url">
              <span>{{ orderDetail.restaurant_name }}</span>
            </div>
            <svg fill="#333" class="arrow-right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </router-link>
          <div class="order-food-list">
            <div v-for="(item, index) in orderDetail.basket.group[0]" :key="index" class="order-detail-shop">
              <div class="food-name">{{ item.name }}</div>
              <div class="quantity-price">
                <span class="quantity-price-quantity">X{{ item.quantity }}</span>
                <span class="quantity-price-price">¥{{ item.price }}</span>
              </div>
            </div>
          </div>
          <div class="order-delivery-list">
            <span>配送费</span>
            <span>¥{{ orderDetail.basket.deliver_fee&&orderDetail.basket.deliver_fee.price || 0 }}</span>
          </div>
          <div class="order-detail-payment">实付¥{{ orderDetail.total_amount.toFixed(2) }}</div>
        </div>
        <div class="order-detail-delivery">
          <div class="order-detail-delivery-title">配送信息</div>
          <div class="delivery-item">
            <span class="name">送达时间：</span>
            <span class="value">{{ deliveryData.deliver_time }}</span>
          </div>
          <div class="delivery-item">
            <span class="name">送货地址：</span>
            <span class="value">{{ deliveryData.addressDetail }}</span>
          </div>
          <div class="delivery-item">
            <span class="name">联系人：</span>
            <span class="value">{{ deliveryData.consignee }}</span>
          </div>
          <div class="delivery-item">
            <span class="name">联系方式：</span>
            <span class="value">{{ deliveryData.phone }}</span>
          </div>
          <div class="delivery-item">
            <span class="name">送达时间：</span>
            <span class="value">蜂鸟专送</span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import { imgBaseUrl } from '../../../config/env';
  export default {
    components: {},
    computed: {
      ...mapState([
        'orderDetail',
        'geohash',
        'userInfo'
      ])
    },
    data () {
        return {
          imgBaseUrl,
          deliveryData: {}
        };
    },
    methods: {
      getDeliveryData () {
        this.https({url: `/bos/v1/users/${this.userInfo.user_id}/orders/${this.orderDetail.unique_id}/snapshot`, method: 'get'}).then(
          (res) => {
            this.deliveryData = res;
          });
      }
    },
    mounted () {
      this.getDeliveryData();
    },
    activated () {
      this.getDeliveryData();
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .order-detail {
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
    .order-detail-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .order-detail-content {
      margin-top: 1.95rem;
      div {

      }
      .order-detail-content-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: .8rem;
        img {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }
        .order-status {
          margin: .4rem 0;
          font-size: .9rem;
          color: @fontColor;
          font-weight: 700;
        }
        .order-item-btn-again {
          padding: .1rem .2rem;
          border: .025rem solid @blue;
          border-radius: .15rem;
          color: @blue;
          font-size: .55rem;
        }
      }
      .order-detail-info {
        border-top: .5rem solid @gray;
        border-bottom: .5rem solid @gray;
        & > div {
          padding: .2rem .4rem;
          line-height: 2rem;
          border-bottom: .025rem solid @gray;
        }
        .order-detail-info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .shop-name {
            display: flex;
            align-items: center;
            img {
              width: 1.2rem;
              height: 1.2rem;
              margin-right: .2rem;
            }
            span {
              font-size: .75rem;
              color: @fontColor;
              font-weight: 700;
            }
          }
          svg {
            width: .6rem;
            height: .6rem;
            fill: #666;
          }
        }
        .order-food-list {
          .order-detail-shop {
            display: flex;
            align-items: center;
            .food-name {
              flex: 4;
              font-size: .6rem;
              color: @fontColor1;
            }
            .quantity-price {
              flex: 1;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .quantity-price-quantity {
                font-size: .6rem;
                color: @fontColor2;
              }
              .quantity-price-price {
                font-size: .6rem;
                color: @fontColor1;
              }
            }
          }
        }
        .order-delivery-list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: .025rem solid @gray;
          span {
            font-size: .6rem;
            color: @fontColor1;
          }
        }
        .order-detail-payment {
          text-align: right;
          font-size: .6rem;
          color: @fontColor3;
          font-weight: 700;
        }
      }
      .order-detail-delivery {
        & > div {
          padding: .2rem .4rem;
          line-height: 2rem;
          border-bottom: .025rem solid @gray;
        }
        .order-detail-delivery-title {
          font-size: .75rem;
          color: @fontColor;
          font-weight: 700;
        }
        .delivery-item {
          display: flex;
          align-items: center;
          .name, .value {
            font-size: .65rem;
            color: @fontColor1;
          }
        }
      }
    }
  }
</style>

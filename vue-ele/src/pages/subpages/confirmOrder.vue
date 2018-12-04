<template>
    <div class="confirm-order">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="confirm-order-title">确认订单</span>
        </template>
      </top-header>
      <router-link :to='{path: "/chooseAddress", query: {shopId: this.shopId}}' class="address-list">
        <div class="address-item-left">
          <svg class="location-icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
          </svg>
          <div class="add-address" v-if="!defaultaddress">请添加一个收货地址</div>
          <div v-else class="address-detail">
            <header>
              <span>{{defaultaddress.name}}</span>
              <span>{{defaultaddress.sex == 1 ? '先生':'女士'}}</span>
              <span>{{defaultaddress.phone}}</span>
            </header>
            <div class="address-detail-info">
              <span v-if="defaultaddress.tag" :style="{backgroundColor: iconColor(defaultaddress.tag)}">{{defaultaddress.tag}}</span>
              <p>{{defaultaddress.address_detail}}</p>
            </div>
          </div>
        </div>
        <svg class="address-item-right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
      <section class="delivery-info">
        <div class="deliver-title">送达时间</div>
        <div class="deliver-time">
          <span>尽快送达(预计 {{orderData.delivery_reach_time}})</span>
          <span v-if="orderData.cart.is_deliver_by_fengniao" class="deliver-logo">蜂鸟专送</span>
        </div>
      </section>
      <section class="pay-way">
        <section class="pay-way-item">
          <span>支付方式</span>
          <div class="more-way">
            <span>在线支付</span>
            <svg class="arrow-right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </section>
        <section class="benefit">
          <span>红包</span>
          <span>暂时只在饿了么 APP 中支持</span>
        </section>
      </section>
      <section class="food-list-wrap">
        <header v-if="orderData.cart.restaurant_info">
          <img :src="imgBaseUrl + orderData.cart.restaurant_info.image_path">
          <span>{{orderData.cart.restaurant_info.name}}</span>
        </header>
        <ul class="food-list" v-if="orderData.cart.groups">
          <li v-for="item in orderData.cart.groups[0]" :key="item.id" class="food-item">
            <p class="food-name ellipsis">{{item.name}}</p>
            <div class="num-price">
              <span class="quantity">x {{item.quantity}}</span>
              <span>¥{{item.price}}</span>
            </div>
          </li>
          <li class="food-item" v-if="orderData.cart.extra">
            <p class="food-name ellipsis">{{orderData.cart.extra[0].name}}</p>
            <div class="num-price">
              <span>¥ {{orderData.cart.extra[0].price}}</span>
            </div>
          </li>
          <li class="food-item">
            <p class="food-name ellipsis">配送费</p>
            <div class="num-price">
              <span>¥ {{orderData.cart.deliver_amount || 0}}</span>
            </div>
          </li>
        </ul>
        <div class="total-price">
          <p class="total-price-name ellipsis">订单 ¥{{orderData.cart.total}}</p>
          <div class="num-price">
            <p>待支付</p>
            <p>¥{{orderData.cart.total}}</p>
          </div>
        </div>
      </section>
      <section class="order-remarks">
        <router-link tag="div" :to='{path: "/orderRemark", query: {id: orderData.cart.id, sig: orderData.sig}}' class="order-remarks-item">
          <span>订单备注</span>
          <div class="order-remarks-item-text">
            <span class="ellipsis">{{PRESETREMARK || CUSTOMREMARK ? orderRemark: '口味、偏好等'}}</span>
            <svg class="arrow-right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </router-link>
        <router-link tag="div" v-if="orderData.invoice.is_available" to="/orderInvoice" class="order-remarks-item">
          <span>发票抬头</span>
          <div class="order-remarks-item-text">
            <span>{{orderData.invoice.status_text}}</span>
            <svg class="arrow-right">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </router-link>
      </section>
      <section class="confrim-order">
        <span>待支付 ¥{{orderData.cart.total}}</span>
        <span @click="confrimOrder">确认下单</span>
      </section>
    </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import { imgBaseUrl } from '../../../config/env';
  export default {
    components: {},
    computed: {
      ...mapState([
        'DEFAULTADDRESS',
        'USERINFO',
        'GEOHASH',
        'CARTLIST',
        'ORDERDETAIL',
        'PRESETREMARK',
        'CUSTOMREMARK'
      ])
    },
    data () {
        return {
          imgBaseUrl,
          shopId: '',
          orderData: {
            cart: {
              id: ''
            },
            sig: '',
            invoice: {
              is_available: false
            }
          },
          addressList: [],
          orderRemark: ''
        };
    },
    methods: {
      ...mapMutations([
        'SETDEFAULTADDRESS'
      ]),
      // 获取订单数据
      getOrderData () {
        let entities = [];
        Object.values(this.CARTLIST).forEach((item) => {
          entities.push({
            attrs: [],
            extra: {},
            id: item.food_id,
            name: item.name,
            packing_fee: item.packing_fee,
            price: item.price,
            quantity: item.num,
            sku_id: item.sku_id,
            specs: [item.specs],
            stock: item.stock
          });
        });
        let params = {
          come_from: 'web',
          restaurant_id: this.shopId,
          geohash: this.GEOHASH,
          entities: [entities]
        };
        this.https({url: '/v1/carts/checkout', params, method: 'post'}).then(
          (res) => {
            this.orderData = res;
          });
      },
      // 获取地址信息
      getAddressList () {
        this.https({url: `/v1/users/${this.USERINFO.user_id}/addresses`, method: 'get'}).then(
          (res) => {
            if (res && res.length !== 0) {
              this.addressList = res;
              this.defaultaddress = this.addressList[0];
            }
          });
      },
      //地址备注颜色
      iconColor (name) {
        let color = '';
        if (name === '公司') {
          color = '#4cd964';
        } else if (name === '学校') {
          color = '@blue';
        }
        return color;
      },
      // 设置默认地址
      defaultaddress () {
        if (this.DEFAULTADDRESS) {
          return this.DEFAULTADDRESS;
        } else if (this.addressList && this.addressList.length !== 0) {
          return this.addressList[0];
        }
      },
      confrimOrder () {}
    },
    created () {
      this.shopId = this.$route.query.shopId;
      this.getOrderData();
      this.getAddressList();
    },
    mounted () {
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .confirm-order {
    width: 100%;
    overflow-y: auto;
    position: relative;
    color: #fff;
    background-color: @gray;
    font-family: Helvetica Neue,Tahoma,Arial;
    & > section {
      background-color: #fff;
    }
    svg {
      box-sizing: border-box;
    }
    .arrow-left {
      margin-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .confirm-order-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .address-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 3.5rem;
      padding: 0 .4rem;
      margin-top: 1.95rem;
      background: url(../../assets/icon/address_bottom.png) left bottom repeat-x;
      background-color: #fff;
      background-size: auto .12rem;
      .address-item-left {
        display: flex;
        align-items: center;
        .location-icon {
          width: .8rem;
          height: .8rem;
          fill: @blue;
          margin-right: .2rem;
        }
        .add-address {
          font-size: .7rem;
          color: @fontColor;
        }
        .address-detail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          header {
            display: flex;
            align-items: center;
            font-size: .65rem;
            color: @fontColor;
            span {
              margin-right: .2rem;
            }
            span:first-of-type {
              font-size: .8rem;
              font-weight: 700;
            }
          }
          .address-detail-info {
            display: flex;
            align-items: center;
            span {
              height: .7rem;
              padding: 0 .2rem;
              margin-right: .2rem;
              line-height: .7rem;
              font-size: .5rem;
              color: #fff;
              border-radius: .15rem;
            }
            p {
              font-size: .55rem;
              color: @fontColor1;
            }
          }
        }
      }
      .address-item-right {
        width: .6rem;
        height: .6rem;
        fill: #999;
      }
    }
    .delivery-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 4rem;
      padding: 0 .4rem;
      margin: .4rem 0;
      border-left: .2rem solid @blue;
      .deliver-title {
        font-size: .8rem;
        color: @fontColor;
        font-weight: 700;
      }
      .deliver-time {
        display: flex;
        flex-direction: column;
        justify-content: center;
        span {
          font-size: .7rem;
          color: @blue;
        }
        .deliver-logo {
          width: 2.4rem;
          padding: .1rem;
          border-radius: .12rem;
          margin-top: .5rem;
          text-align: center;
          font-size: .5rem;
          color: #fff;
          background-color: @blue;
        }
      }
    }
    .pay-way {
      margin: .4rem 0;
      & > section {
        padding: 0 .4rem;
      }
      .pay-way-item {
        display: flex;
        justify-content: space-between;
        line-height: 2rem;
        span {
          font-size: .7rem;
          color: @fontColor1;
        }
        .more-way {
          display: flex;
          align-items: center;
          font-size: .6rem;
          color: @fontColor2;
          span {
            font-size: .6rem;
            color: @fontColor2;
          }
          svg {
            width: .5rem;
            height: .5rem;
            fill: #ccc;
          }
        }
      }
      .benefit {
        display: flex;
        justify-content: space-between;
        line-height: 2rem;
        border-top: .025rem solid @gray;
        span {
          font-size: .6rem;
          color: @fontColor2;
        }
      }
    }
    .food-list-wrap {
      header {
        display: flex;
        align-items: center;
        padding: .4rem;
        border-bottom: .025rem solid @gray;
        img {
          width: 1.2rem;
          height: 1.2rem;
        }
        span {
          font-size: .8rem;
          color: @fontColor;
          margin-left: .2rem;
        }
      }
      .food-list {
        border-bottom: .025rem solid @gray;
        .food-item {
          display: flex;
          justify-content: space-between;
          line-height: 1.8rem;
          padding: 0 .8rem;
          .food-name {
            font-size: .65rem;
            color: @fontColor1;
          }
          .num-price {
            span {
              font-size: .65rem;
              color: @fontColor1;
              margin-right: .2rem;
            }
            .quantity {
              color: @fontColor4;
            }
          }
        }

      }
      .total-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .8rem;
        line-height: 1.8rem;
        .total-price-name {
          font-size: .65rem;
          color: @fontColor1;
        }
        .num-price {
          display: flex;
          align-items: center;
          font-size: .65rem;
          p {
            text-align: right;
            color: @fontColor4;
          }
          p:first-of-type {
            margin-right: .4rem;
          }
        }
      }

    }
    .order-remarks {
      padding: 0 .8rem;
      margin-top: .4rem;
      margin-bottom: 2rem;
      line-height: 2rem;
      .order-remarks-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > span {
          font-size: .65rem;
          color: @fontColor1;
        }
        .order-remarks-item-text {
          display: flex;
          align-items: center;
          span {
            font-size: .6rem;
            color: @fontColor2;
          }
          svg {
            width: .5rem;
            height: .5rem;
            fill: #ccc;
          }
        }
      }
    }
    .confrim-order {
      position: fixed;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      width: 100%;
      height: 2rem;
      span {
        line-height: 2rem;
        font-size: .75rem;
        color: #fff;
      }
      span:first-of-type {
        flex: 7;
        padding-left: .4rem;
        background-color: #3c3c3c;
      }
      span:last-of-type {
        flex: 3;
        text-align: center;
        background-color: #56d176;
      }
    }
  }
</style>

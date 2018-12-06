<template>
    <div class="msite">
      <top-header class="msite-head">
        <template>
          <router-link :to="'/search'" class="link-search">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
              <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
          </router-link>
          <router-link to="/" class="msite-title">
            <span class="msite-title-text">{{ msiteTitle }}</span>
          </router-link>
          <svg @click="$router.push('profile')"  v-if="USERINFO.id" class="user-avatar">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
          </svg>
          <span v-else @click="$router.push('login')" class="head-login">登录 | 注册</span>
        </template>
      </top-header>
      <swiper :options="swiperOption" class="nav" v-if="foodTypes.length">
        <div class="swiper-slide" v-for="(item, index) in foodTypes" :key="index">
          <router-link tag="span" :to="{path: '/food', query: {title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id">
            <figure>
              <img :src="imgBaseUrl + foodItem.image_url">
              <figcaption>{{ foodItem.title }}</figcaption>
            </figure>
          </router-link>
          <div class="swiper-pagination" slot="pagination"></div>
        </div>
      </swiper>
      <img src="../assets/images/fl.svg" class="no-food-types" v-else>
      <div class="shop-list-wrap">
        <div class="shop-list-title">
          <svg class="shop-icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
          </svg>
          <span class="title-text">附近商家</span>
        </div>
        <shop-list></shop-list>
      </div>
      <bottom-footer></bottom-footer>
    </div>
</template>
<script>
  import { mapMutations, mapState } from 'vuex';
  import shopList from '../components/shopList';
  export default {
    components: {
      shopList
    },
    computed: {
      ...mapState([
        'GEOHASH',
        'USERINFO'
      ])
    },
    data () {
        return {
          msiteTitle: '',
          foodTypes: [],
          imgBaseUrl: 'https://fuss10.elemecdn.com',
          swiperOption: {
            pagination: {
              el: '.swiper-pagination',
              dynamicBullets: true
            }
          }
        };
    },
    methods: {
      ...mapMutations([
        'SAVEGEOHASH',
        'INITUSERINFO',
        'INITGEOHASH'
      ]),
      getMsiteAddress () {
        this.https({url: '/v2/pois/' + this.GEOHASH, method: 'get'}).then(
          (res) => {
            this.msiteTitle = res.name;
          });
      },
      getFoodTypes () {
        let params = {
          geohash: this.GEOHASH,
          group_type: '1',
          'flags[]': 'F'
        };
        this.https({url: '/v2/index_entry', params, method: 'get'}).then(
          (res) => {
            this.foodTypes = [];
            for (let i = 0, len = res.length; i < len; i += 8) {
              this.foodTypes.push(res.slice(i, i + 8));
            }
          });
      },
      getCategoryId (url) {
        let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
        if (/restaurant_category_id/gi.test(urlData)) {
          return JSON.parse(urlData).restaurant_category_id.id;
        } else {
          return '';
        }
      }
    },
    created () {
      this.INITUSERINFO();
      this.INITGEOHASH();
    },
    mounted () {
      if (!this.GEOHASH) {
        let params = this.setStrOfUrl({
          type: 'guess'
        });
        this.https({url: '/v1/cities' + params, method: 'get'}).then(
          (res) => {
            this.SAVEGEOHASH(res.latitude + ',' + res.longitude);
          });
      }
      this.getMsiteAddress();
      this.getFoodTypes();
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .msite {
    position: relative;
    width: 100%;
    overflow-y: auto;
    color: #fff;
    .msite-head {
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 .4rem;
      a, span {
        box-sizing: border-box;
      }
      .link-search {
        display: flex;
        align-items: center;
        svg {
          width: .8rem;
          height: .8rem;
        }
      }
      .msite-title {
        font-size: .8rem;
        line-height: .8rem;
        text-align: center;
        color: #fff;
        .msite-title-text {
          font-size: .8rem;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .head-login {
        font-weight: 400;
        font-size: .6rem;
        color: #fff;
      }
      .user-avatar {
        width: .8rem;
        height: .8rem;
        fill: #fff;
      }
    }
    .nav {
      margin-top: 1.95rem;
      background-color: #fff;
      .swiper-slide {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        margin: .4rem 0;
        span {
          flex: 0 0 25%;
          padding: .3rem 0;
          figure {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0;
            img {
              margin-bottom: .3rem;
              width: 1.8rem;
              height: 1.8rem;
            }
            figcaption {
              text-align: center;
              font-size: .55rem;
              color: @fontColor1;
            }
          }
        }
      }
      .swiper-pagination {
        bottom: -.25rem;
      }
    }
    .no-food-types {
      width: 100%;
      height: 100%;
      margin-top: 1.95rem;
    }
    .shop-list-wrap {
      margin-bottom: 1.95rem;
      .shop-list-title {
        display: flex;
        align-items: center;
        margin-top: .5rem;
        .shop-icon {
          fill: #999;
          margin: 0 .2rem 0 .4rem;
          vertical-align: middle;
          width: .6rem;
          height: .6rem;
        }
        .title-text {
          color: #999;
          font: .55rem/1.6rem Microsoft YaHei;
        }
      }
      border-top: .025rem solid #e4e4e4;
      background-color: #fff;
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
</style>

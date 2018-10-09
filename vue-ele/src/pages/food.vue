<template>
    <div class="food">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="head-title">{{ headTitle }}</span>
        </template>
      </top-header>
      <div class="food-sort-wrap">
        <div class="food-sort-title"
          v-for="(item, index) in [headTitle, '排序', '筛选']"
          :key="index"
          @click="chooseSortType(index)">
          <span>{{ item }}</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort-icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
      </div>
      <shop-list class="food-shop-list"></shop-list>
      <div v-show="filterListShow" class="food-filter-list-wrap">
        <div v-show="filterType === 0" class="classify-wrap">
          <div class="classify-item-list">
            <div v-for="(item, index) in Category" :key="index" class="classify-list-item">
                <img :src="getImgPath(item.image_url)" v-if="index" class="classify-list-item-icon">
                <span class="classify-list-item-text">{{ item.name }}</span>
            </div>
          </div>
          <div class="classify-item-list">2</div>
        </div>
        <div v-show="filterType === 1" class="sort-wrap">
          <div @click="clickSortType('default')" class="sort-list-item">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
            </svg>
            <span>智能排序</span>
            <svg v-show="sortTypeSelected === 'default'">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
            </svg>
          </div>
          <div @click="clickSortType('distance')" class="sort-list-item">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
            </svg>
            <span>距离最近</span>
            <svg v-show="sortTypeSelected === 'distance'">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
            </svg>
          </div>
          <div @click="clickSortType('hot')" class="sort-list-item">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
            </svg>
            <span>销量最高</span>
            <svg v-show="sortTypeSelected === 'hot'">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
            </svg>
          </div>
          <div @click="clickSortType('price')" class="sort-list-item">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
            </svg>
            <span>起送价最低</span>
            <svg v-show="sortTypeSelected === 'price'">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
            </svg>
          </div>
          <div @click="clickSortType('speed')" class="sort-list-item">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
          </svg>
          <span>配送速度最快</span>
          <svg v-show="sortTypeSelected === 'speed'">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
          </svg>
        </div>
          <div @click="clickSortType('rating')" class="sort-list-item">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
            </svg>
            <span>评分最高</span>
            <svg v-show="sortTypeSelected === 'rating'">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
            </svg>
          </div>
        </div>
        <div v-show="filterType === 2" class="screen-wrap">
          <header class="screen-title">配送方式</header>
          <div class="screen-distribution-wrap">
            <div v-for="item in Delivery" :key="item.id" class="screen-distribution-list">
              <svg class="screen-svg">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#fengniao"></use>
              </svg>
              <span>{{ item.text }}</span>
            </div>
          </div>
          <header class="screen-title">商家属性(可多选)</header>
          <div class="screen-distribution-wrap">
            <div v-for="item in Activity" :key="item.id" class="screen-distribution-list">
              <span class="screen-distribution-item-icon" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{ item.icon_name }}</span>
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="screen-action-wrap">
            <span class="screen-action">清空</span>
            <span class="screen-action confirm-btn">确定</span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import shopList from '../components/shopList';
  export default {
      components: {
        shopList
      },
      computed: {},
      data () {
          return {
            geohash: '',
            headTitle: '',
            foodSort: [],
            filterListShow: false,
            filterType: '',
            sortTypeSelected: '',
            Delivery: [],
            Activity: [],
            Category: []
          };
      },
      methods: {
        // 获取food页面的配送方式
        getFoodDelivery () {
          let params = this.setStrOfUrl({
            latitude: this.geohash.split(',')[0],
            longitude: this.geohash.split(',')[1],
            kw: ''
          });
          this.https({url: '/shopping/v1/restaurants/delivery_modes' + params, method: 'get'}).then(
            (res) => {
              if (res) {
                this.Delivery = res;
              }
            });
        },
        // 获取food页面的配送方式
        getFoodActivity () {
          let params = this.setStrOfUrl({
            latitude: this.geohash.split(',')[0],
            longitude: this.geohash.split(',')[1],
            kw: ''
          });
          this.https({url: '/shopping/v1/restaurants/activity_attributes' + params, method: 'get'}).then(
            (res) => {
              if (res) {
                this.Activity = res;
              }
            });
        },
        // 获取food页面的配送方式
        getFoodCategory () {
          let params = this.setStrOfUrl({
            latitude: this.geohash.split(',')[0],
            longitude: this.geohash.split(',')[1]
          });
          this.https({url: '/shopping/v2/restaurant/category' + params, method: 'get'}).then(
            (res) => {
              if (res) {
                this.Category = res;
              }
            });
        },
        // 筛选方式选择
        chooseSortType (index) {
          this.filterListShow = !this.filterListShow;
          this.filterType = index;
        },
        // 排序方式选择
        clickSortType (sortType) {
          this.sortTypeSelected = sortType;
          this.filterListShow = false;
        }
      },
      mounted () {
        this.geohash = this.$route.query.geohash;
        this.headTitle = this.$route.query.title;
        this.getFoodDelivery();
        this.getFoodActivity();
        this.getFoodCategory();
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .food {
    width: 100%;
    overflow-y: auto;
    position: relative;
    font-size: .55rem;
    svg, span {
      box-sizing: border-box;
      color: #fff;
    }
    .arrow-left {
      margin-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .head-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .food-sort-wrap {
      position: fixed;
      top: 1.95rem;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      height: 1.6rem;
      width: 100%;
      background-color: #fff;
      border-bottom: .025rem solid #f1f1f1;
      .food-sort-title {
        flex: 0 0 33.333%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        height: 1rem;
        margin: 0.3rem 0;
        span {
          height: 1.6rem;
          margin-right: 0.2rem;
          line-height: 1.6rem;
          color: #444;
        }
        .sort-icon {
          vertical-align: middle;
          transition: all .3s;
          fill: #666;
        }
      }
      .food-sort-title:nth-child(2) {
        border-left: .025rem solid @gray;
        border-right: .025rem solid @gray;
      }
    }
    .food-shop-list {
      margin-top: 3.55rem;
      background-color: #fff;
    }
    .food-filter-list-wrap {
      position: fixed;
      top: 3.55rem;
      left: 0;
      width: 100%;
      background-color: #fff;
      z-index: 99999;
      .classify-wrap {
        display: flex;
        align-items: center;
        .classify-item-list {
          flex: 0 0 50%;
          .classify-list-item {
            display: flex;
            align-items: center;
            .classify-list-item-icon {
              width: .8rem;
              height: .8rem;
              margin: 0 .5rem;
            }
            .classify-list-item-text {
              font-size: .5rem;
              color: @fontColor1;
              line-height: 1.8rem;
            }
          }
        }
      }
      .sort-wrap {
        .sort-list-item {
          display: flex;
          align-items: center;
          height: 2.5rem;
          border-bottom: .025rem solid @gray;
          svg {
            width: .7rem;
            height: .7rem;
            margin: 0 .8rem;
          }
          span {
            flex: 0 0 70%;
            color: @fontColor1;
            text-align: left;
          }
        }
      }
      .screen-wrap {
        .screen-title {
          font-size: .5rem;
          color: @fontColor1;
          line-height: 1.5rem;
          height: 1.5rem;
          text-align: left;
          margin-left: .5rem;
          background-color: #fff;
        }
        .screen-distribution-wrap {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin: .2rem;
          .screen-distribution-list {
            flex: 0 0 30%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 4.7rem;
            height: 1.4rem;
            margin: .25rem;
            border-radius: .125rem;
            background-color: #fafafa;
            .screen-svg {
              width: .8rem;
              height: .8rem;
              margin-right: .125rem;
            }
            span {
              color: @fontColor;
            }
            .screen-distribution-item-icon {
              width: .8rem;
              height: .8rem;
              font-size: .5rem;
              border: .025rem solid #e4e4e4;
              border-radius: .15rem;
              margin-right: .25rem;
              line-height: .8rem;
              text-align: center;
            }
          }
        }
        .screen-action-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          .screen-action {
            flex: 0 0 50%;
            height: 1.8rem;
            font-size: .8rem;
            line-height: 1.8rem;
            border-radius: .2rem;
            background-color: #fff;
            color: #ddd;
            text-align: center;
          }
          .confirm-btn {
            color: #fff;
            background-color: #00d762;
          }
        }
      }
    }
  }
</style>

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
      <!--条件-->
      <div class="food-sort-wrap">
        <div class="food-sort-title" @click="chooseSortType(0)">
          <span :class="{'sort-selected': filterListShow && filterType === 0}">{{ headTitle }}</span>
          <svg :class="{'sort-icon-selected': filterListShow && filterType === 0 }" width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort-icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <div class="food-sort-title" @click="chooseSortType(1)">
          <span :class="{'sort-selected': filterListShow && filterType === 1}">排序</span>
          <svg :class="{'sort-icon-selected': filterListShow && filterType === 1 }" width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort-icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <div class="food-sort-title" @click="chooseSortType(2)">
          <span :class="{'sort-selected': filterListShow && filterType === 2}">筛选</span>
          <svg :class="{'sort-icon-selected': filterListShow && filterType === 2 }" width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort-icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
      </div>
      <!--条件面板-->
      <div v-show="filterListShow" class="food-filter-list-wrap">
        <!--分类-->
        <div v-show="filterType === 0" class="classify-wrap">
          <!--左侧分类-->
          <div class="classify-item-list">
            <div v-for="(item, index) in Category"
              :key="index"
              @click="selectCategoryDetail(item.id, index)"
              :class="{'classify-list-item-selected': restaurantCategoryId === item.id}"
              class="classify-list-item">
              <span>
                <img :src="getImgPath(item.image_url)" class="classify-list-item-icon">
                <span class="classify-list-item-text">{{ item.name }}</span>
              </span>
              <span>
                <span class="classify-list-item-count">{{ item.count }}</span>
                <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="classify-list-item-arrow" >
                  <path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
                </svg>
              </span>
            </div>
          </div>
          <!--右侧子类-->
          <div class="classify-item-list">
            <div v-for="(item, index) in CategoryDetail" v-if="index" :key="item.id" @click="classifyShopLIst(item.id, item.name)" class="classify-item-subitem">
              <span>{{ item.name }}</span>
              <span>{{ item.count }}</span>
            </div>
          </div>
        </div>
        <!--排序-->
        <div v-show="filterType === 1" class="sort-wrap">
          <div v-for="(item, index) in sortTypeList" :key="index" @click="clickSortType(item.id, item.value)" class="sort-list-item">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="item.id"></use>
            </svg>
            <span :class="{'sort-list-item-selected': sortTypeSelected === item.id}">{{ item.name }}</span>
            <svg v-show="sortTypeSelected === item.id">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
            </svg>
          </div>
        </div>
        <!--筛选-->
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
      <!--商家列表-->
      <shop-list class="food-shop-list" :restaurantCategoryId1="restaurantCategoryId1" :sortByType="sortByType"></shop-list>
      <!--遮罩-->
      <transition name="showcover">
        <div class="back-cover" v-show="filterListShow"></div>
      </transition>
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
            restaurantCategoryId: '',
            restaurantCategoryId1: '',
            latitude: '',
            longitude: '',
            foodSort: [],
            filterListShow: false,
            filterType: '',
            sortTypeList: [
              {
                id: '#default',
                value: '0',
                name: '智能排序'
              },
              {
                id: '#distance',
                value: '5',
                name: '距离最近'
              },
              {
                id: '#hot',
                value: '6',
                name: '销量最高'
              },
              {
                id: '#price',
                value: '1',
                name: '起送价最低'
              },
              {
                id: '#speed',
                value: '2',
                name: '配送速度最快'
              },
              {
                id: '#rating',
                value: '3',
                name: '评分最高'
              }
            ],
            sortTypeSelected: '',
            sortByType: '',
            Delivery: [],
            Activity: [],
            Category: [],
            CategoryDetail: []
          };
      },
      methods: {
        // 获取筛选的配送方式
        getFoodDelivery () {
          let params = this.setStrOfUrl({
            latitude: this.latitude,
            longitude: this.longitude,
            kw: ''
          });
          this.https({url: '/shopping/v1/restaurants/delivery_modes' + params, method: 'get'}).then(
            (res) => {
              if (res) {
                this.Delivery = res;
              }
            });
        },
        // 获取筛选的商家活动
        getFoodActivity () {
          let params = this.setStrOfUrl({
            latitude: this.latitude,
            longitude: this.longitude,
            kw: ''
          });
          this.https({url: '/shopping/v1/restaurants/activity_attributes' + params, method: 'get'}).then(
            (res) => {
              if (res) {
                this.Activity = res;
              }
            });
        },
        // 获取分类的商品种类
        getFoodCategory () {
          let params = this.setStrOfUrl({
            latitude: this.latitude,
            longitude: this.longitude
          });
          this.https({url: '/shopping/v2/restaurant/category' + params, method: 'get'}).then(
            (res) => {
              if (res) {
                this.Category = res.slice(1);
                // 设置默认子类
                this.Category.forEach(item => {
                  if (this.restaurantCategoryId === item.id) {
                    this.CategoryDetail = item.sub_categories || [];
                  }
                });
              }
            });
        },
        // 条件选择
        chooseSortType (index) {
          this.filterListShow = !this.filterListShow;
          this.filterType = index;
          if (index === 0) {
            this.headTitle = this.headTitle === '分类' ? this.$route.query.title : '分类';
          }
        },
        // 排序方式选择
        clickSortType (id, value) {
          this.sortTypeSelected = id;
          this.sortByType = value;
          this.filterListShow = false;
        },
        // 子类选择
        selectCategoryDetail (id, index) {
          this.restaurantCategoryId = id;
          this.CategoryDetail = this.Category[index].sub_categories;
        },
        classifyShopLIst (id, name) {
          this.restaurantCategoryId1 = id;
          this.headTitle = name;
          this.filterListShow = false;
        }
      },
      mounted () {
        this.geohash = this.$route.query.geohash || '';
        this.headTitle = this.$route.query.title || '';
        this.restaurantCategoryId = this.$route.query.restaurant_category_id || '';
        if (this.geohash) {
          this.latitude = this.geohash.split(',')[0];
          this.longitude = this.geohash.split(',')[1];
          this.getFoodDelivery();
          this.getFoodActivity();
          this.getFoodCategory();
        }
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
      z-index: 99999;
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
        .sort-selected {
          color: @blue;
        }
        .sort-icon-selected {
          transform: rotate(180deg);
          fill: @blue;
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
        .classify-item-list {
          flex: 0 0 50%;
          overflow-y: auto;
          .classify-list-item {
            display: flex;
            justify-content: space-around;
            align-items: center;
            span {
              display: flex;
              align-items: center;
            }
            .classify-list-item-icon {
              width: .8rem;
              height: .8rem;
              margin: 0 .4rem;
            }
            .classify-list-item-text {
              font-size: .5rem;
              color: @fontColor1;
              line-height: 1.8rem;
            }
            .classify-list-item-count {
              margin: 0 .4rem;
              padding: 0 .1rem;
              border: .025rem solid #ccc;
              border-radius: .8rem;
              background-color: #ccc;
              font-size: .4rem;
              color: #fff;
            }
          }
          .classify-list-item-selected {
            border-left: .1rem solid @blue;
          }
          .classify-item-subitem {
            display: flex;
            justify-content: space-between;
            height: 1.8rem;
            line-height: 1.8rem;
            padding-right: .5rem;
            border-bottom: .025rem solid @gray;
            span {
              color: @fontColor1;
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
          .sort-list-item-selected {
            color: @blue;
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
    .showcover-enter-active, .showcover-leave-active {
      transition: opacity .3s
    }
    .showcover-enter, .showcover-leave-active {
      opacity: 0
    }
    .back-cover {
      position: fixed;
      top: 1.95rem;
      width: 100%;
      height: 100%;
      z-index: 100;
      background-color: rgba(0,0,0,0.3);
    }
  }
</style>

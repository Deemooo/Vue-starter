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
      <div v-show="sortListShow" class="food-sort-list-wrap">
        <div v-show="sortType === 0">
          headTitle
        </div>
        <div v-show="sortType === 1">
          排序
        </div>
        <div v-show="sortType === 2">
          筛选
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
            sortListShow: false,
            sortType: ''
          };
      },
      methods: {
        // 排序方式选择
        chooseSortType (index) {
          this.sortListShow = !this.sortListShow;
          this.sortType = index;
        }
      },
      mounted () {
        this.geohash = this.$route.query.geohash;
        this.headTitle = this.$route.query.title;
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
          font-size: .55rem;
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
    .food-sort-list-wrap {
      position: fixed;
      top: 3.55rem;
      left: 0;
      background-color: #fff;
      z-index: 99999;
    }
  }
</style>

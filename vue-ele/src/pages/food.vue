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
        <div class="food-sort-title">
          <span>{{ headTitle }}</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort-icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <div class="food-sort-title">
          <span>排序</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort-icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <div class="food-sort-title">
          <span>筛选</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort-icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
      </div>
      <shop-list></shop-list>
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
            headTitle: ''
          };
      },
      methods: {},
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
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.95rem;
      box-sizing: border-box;
      width: 100%;
      background-color: #fff;
      border-bottom: .025rem solid @gray;
      .food-sort-title {
        flex: 0 0 33.333%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          height: 1.6rem;
          margin-right: 0.1rem;
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
  }
</style>

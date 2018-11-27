<template>
    <div class="food-detail">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="food-detail-title">{{ this.$route.query.name }}</span>
        </template>
      </top-header>
      <div class="food-detail-content">
        <div class="food-detail-img">
          <img :src="imgBaseUrl + this.$route.query.image_path" alt="商品图片">
        </div>
        <section class="food-detail-info">
          <p>{{this.$route.query.name}}</p>
          <p class="rating-sale">
            <span>评分</span>
            <rating-star :rating='this.$route.query.rating'></rating-star>
            <span class="rating-color">{{ this.$route.query.rating.toFixed(1) }}</span>
          </p>
          <p>
            <span>月售 {{ this.$route.query.month_sales }}单</span>
            <span>售价
              <span class="rating-color">¥{{ this.$route.query.foods.specfoods[0].price }}</span>
            </span>
            <span v-if="this.$route.query.foods.specfoods.length">起</span>
          </p>
          <p>
            <span>评论数 {{ this.$route.query.rating_count }}</span>
            <span>好评率
              <span class="rating-color">{{ this.$route.query.satisfy_rate }}%</span>
            </span>
          </p>
        </section>
      </div>
    </div>
</template>
<script>
  import { imgBaseUrl } from '../../../config/env';
  import ratingStar from '../../components/ratingStar';
  export default {
    components: {
      ratingStar
    },
    computed: {},
    data () {
        return {
          imgBaseUrl,
          foodDetailData: {}
        };
    },
    methods: {},
    mounted () {
      if (this.$route.query) {
        this.foodDetailData = this.$route.query;
      }
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .food-detail {
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
    .food-detail-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .food-detail-content {
      margin-top: 1.95rem;
      padding: .4rem;
      .food-detail-img {
        width: 100%;
        height: 30%;
        text-align: center;
      }
      .food-detail-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & > p {
          display: flex;
          align-items: center;
          margin-bottom: .4rem;
        }
        & span {
          padding: 0 .2rem;
          font-size: .7rem;
          color: #333;
        }
        .rating-color {
          color: @fontColor4;
        }
      }
    }
  }
</style>

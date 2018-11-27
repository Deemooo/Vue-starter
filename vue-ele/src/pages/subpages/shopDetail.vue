<template>
    <div class="shop-detail">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="shop-detail-title">商家详情</span>
        </template>
      </top-header>
      <section class="shop-activity">
        <header>活动与属性</header>
        <ul class="actibities-list">
          <li v-for="item in shopDetail.activities" :key="item.id">
            <span :style='{backgroundColor: "#" + item.icon_color}'>{{ item.icon_name }}</span>
            <span>{{ item.description }}(APP专享)</span>
          </li>
        </ul>
        <ul class="actibities-list">
          <li v-for="item in shopDetail.supports" :key="item.id">
            <span :style='{backgroundColor: "#" + item.icon_color}'>{{ item.icon_name }}</span>
            <span>{{ item.description }}(APP专享)</span>
          </li>
        </ul>
      </section>
      <section class="shop-status">
        <router-link tag="header" to="shopSafe" class="shop-status-header">
          <span class="title">食品监督安全公示</span>
          <div class="identification-detail-wrap">
            <span class="identification-detail">企业认证详情</span>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description-arrow" >
              <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
            </svg>
          </div>
        </router-link>
        <section class="shop-status-detail">
          <div class="shop-status-detail-left">
            <svg class="shop-status-svg" v-if="shopDetail.status === 1">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-well"></use>
            </svg>
            <svg class="shop-status-svg" v-else>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-bad"></use>
            </svg>
          </div>
          <div class="shop-status-detail-right">
            <p>
              <span>监督检查结果：</span>
              <span class="well" v-if="shopDetail.status === 1">良好</span>
              <span class="bad" v-else>差</span>
            </p>
            <p>
              <span>检查日期：</span>
              <span>{{ shopDetail.identification.identificate_date && shopDetail.identification.identificate_date.split('T')[0] }}</span>
            </p>
          </div>
        </section>
      </section>
      <section class="shop-status-info">
        <header>商家信息</header>
        <p>{{ shopDetail.name }}</p>
        <p>地址：{{ shopDetail.address }}</p>
        <p>营业时间：[{{ shopDetail.opening_hours[0] }}]</p>
        <p @click="showLicenseImg(shopDetail.license.business_license_image)" class="license-wrap">
          <span>营业执照</span>
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
            <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
          </svg></p>
        <p @click="showLicenseImg(shopDetail.license.catering_service_license_image)" class="license-wrap">
          <span>餐饮服务许可证</span>
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
            <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
          </svg>
        </p>
      </section>
      <div v-show="showLicense" @click="showLicense = false" class="shop-detail-cover">
        <img :src="imgBaseUrl + licenseImg" alt="picture">
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
          'shopDetail'
        ])
      },
      data () {
          return {
            imgBaseUrl,
            showLicense: false,
            licenseImg: ''
          };
      },
      methods: {
        showLicenseImg (img) {
          this.licenseImg = img;
          this.showLicense = true;
        }
      },
      mounted () {
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .shop-detail {
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
    .shop-detail-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .shop-activity {
      margin-top: 1.95rem;
      header {
        padding: .2rem .4rem;
        border-bottom: .025rem solid @gray;
        line-height: 1.8rem;
        font-size: .75rem;
        color: @fontColor;
      }
      .actibities-list {
        li {
          display: flex;
          align-items: center;
          padding: .4rem;
          span {
            font-size: .55rem;
            color: @fontColor1;
          }
          span:first-of-type {
            padding: .1rem;
            margin-right: .2rem;
            border-radius: .1rem;
            font-size: .45rem;
            color: #fff;
          }
        }
      }
    }
    .shop-status {
      border-top: .4rem solid @gray;
      border-bottom: .4rem solid @gray;
      .shop-status-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2rem .4rem;
        border-bottom: .025rem solid @gray;
        line-height: 1.8rem;
        font-size: .75rem;
        color: @fontColor;
        .identification-detail-wrap {
          .identification-detail {
            font-size: .7rem;
            color: @fontColor2;
          }
        }
      }
      .shop-status-detail {
        display: flex;
        align-items: center;
        padding: .4rem;
        .shop-status-detail-left {
          display: flex;
          align-items: center;
          .shop-status-svg {
            width: 2rem;
            height: 2rem;
            margin-right: .6rem;
          }
        }
        .shop-status-detail-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          span {
            font-size: .55rem;
            color: @fontColor1;
          }
          .well {
            color: #7ed321;
          }
          .bad {
            color: @fontColor3;
          }
        }
      }
    }
    .shop-status-info {
      header {
        padding: .2rem .4rem;
        border-bottom: .025rem solid @gray;
        line-height: 1.8rem;
        font-size: .75rem;
        color: @fontColor;
      }
      p {
        padding: .4rem;
        border-bottom: .025rem solid @gray;
        font-size: .6rem;
        color: @fontColor1;
      }
      .license-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .shop-detail-cover {
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.5);
      z-index: 100;
      img {
        width: 100%;
      }
    }
  }
</style>

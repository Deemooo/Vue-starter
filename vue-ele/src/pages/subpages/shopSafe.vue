<template>
    <div class="shop-safe">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="shop-safe-title">食品监督安全公示</span>
        </template>
      </top-header>
      <section class="shop-status">
        <header class="shop-status-header">
          <span class="title">食品监督安全公示</span>
        </header>
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
        <header>工商登记信息</header>
        <p>企业名称：{{shopDetail.identification.company_name}}</p>
        <p>工商执照注册号：{{shopDetail.identification.identificate_agency}}</p>
        <p>注册资本：{{shopDetail.identification.registered_number}}</p>
        <p>注册地址：{{shopDetail.identification.registered_address}}</p>
        <p>属地监管所：{{shopDetail.identification.registered_principal}}</p>
        <p>法定代表人：{{shopDetail.identification.legal_person}}</p>
        <p>经营范围：{{shopDetail.identification.operation_period}}</p>
      </section>
      <section class="shop-status-info">
        <header>餐饮许可证</header>
        <p>营业范围：{{shopDetail.identification.operation_period}}</p>
        <p>许可证有效期：{{shopDetail.identification.licenses_date}}</p>
        <p>许可证号：{{shopDetail.identification.licenses_number}}</p>
        <p>发证时间：{{shopDetail.identification.licenses_scope}}</p>
        <p>发证机关：{{shopDetail.identification.registered_principal}}</p>
      </section>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    components: {},
    computed: {
      ...mapState([
        'shopDetail'
      ])
    },
    data () {
        return {};
    },
    methods: {},
    mounted () {
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .shop-safe {
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
    .shop-safe-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .shop-status {
      margin-top: 1.95rem;
      .shop-status-header {
        padding: .2rem .4rem;
        border-bottom: .025rem solid @gray;
        line-height: 1.8rem;
        font-size: .75rem;
        color: @fontColor;
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
      border-top: .4rem solid @gray;
      border-bottom: .4rem solid @gray;
      header {
        padding: .2rem .4rem;
        border-bottom: .025rem solid @gray;
        line-height: 1.8rem;
        font-size: .75rem;
        color: @fontColor;
      }
      p {
        padding: .4rem;
        font-size: .6rem;
        color: @fontColor1;
      }
    }
    .shop-status-info:last-of-type {
      border: none;
    }
  }
</style>

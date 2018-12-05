<template>
  <div class="order-invoice">
    <top-header>
      <template>
        <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
        <span class="order-invoice-title">选择发票抬头</span>
      </template>
    </top-header>
    <section class="choose-invoice">
      <span>不需要开发票</span>
      <svg @click="chooseInvoice" :class="{choosed: invoice}">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
      </svg>
    </section>
    <div class="confirm-btn" @click="confirmInvoice">确定</div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default {
    components: {},
    computed: {},
    data () {
      return {
        invoice: false
      };
    },
    methods: {
      ...mapMutations([
        'SAVEORDERINVOICE'
      ]),
      // 选择发票
      chooseInvoice () {
        this.invoice = !this.invoice;
      },
      // 确认
      confirmInvoice () {
        this.SAVEORDERINVOICE(this.invoice);
        this.$router.go(-1);
      }
    },
    mounted () {
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .order-invoice {
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
    .order-invoice-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
    }
    .choose-invoice {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .7rem;
      margin-top: 1.95rem;
      line-height: 2.5rem;
      span {
        font-size: .75rem;
        color: @fontColor;
      }
      svg {
        width: .8rem;
        height: .8rem;
        fill: #999;
      }
      .choosed {
        fill: @btnColor;
      }
    }
    .confirm-btn {
      width: 90%;
      margin: 0 auto;
      border-radius: .2rem;
      line-height: 1.8rem;
      background-color: @btnColor;
      font-size: .7rem;
      color: #fff;
      text-align: center;
    }
  }
</style>

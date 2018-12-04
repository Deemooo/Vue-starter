<template>
    <div class="order-remarks">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="order-remarks-title">订单备注</span>
        </template>
      </top-header>
      <section class="quick-remark" v-if="remarkList.remarks.length">
        <header class="header">快速备注</header>
        <ul class="quick-remark-list">
          <li class="quick-remark-item" v-for="(item,index) in remarkList.remarks" :key="index">
            <span v-for="(remarkTtem, remarkIndex) in item" :key="remarkIndex">{{remarkTtem}}</span>
          </li>
        </ul>
      </section>
      <section class="custom-remark">
        <header class="header">其他备注</header>
        <seaction>
          <textarea class="custom-remark-textarea" v-model="customRemark" placeholder="请输入备注内容(可不填)"></textarea>
        </seaction>
      </section>
      <div class="confirm-btn" @click="confirmRemark">确定</div>
    </div>
</template>
<script>
  export default {
    components: {},
    computed: {},
    data () {
        return {
          remarkList: {
            remarks: []
          },
          customRemark: ''
        };
    },
    methods: {
      // 获取备注信息
      getAddressList () {
        let id = this.$route.query.id;
        let sig = this.$route.query.sig;
        let params = this.setStrOfUrl({
          sig
        });
        this.https({url: '/v1/carts/' + id + '/remarks', params, method: 'get'}).then(
          (res) => {
            this.remarkList = res;
          });
      },
      confirmRemark () {}
    },
    created () {
      this.getAddressList();
    },
    mounted () {
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .order-remarks {
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
    .order-remarks-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
    }
    .quick-remark {
      margin-top: 1.95rem;
      border-bottom: .4rem solid @gray;
      header {
        border-bottom: .025rem solid @gray;
        padding: .2rem .4rem;
        font-size: .65rem;
        color: @fontColor;
        line-height: 2rem;
      }
      .quick-remark-list {
        display: flex;
        flex-wrap: wrap;
        padding: .4rem;
        .quick-remark-item {
          display: flex;
          align-items: center;
          margin-right: .6rem;
          margin-bottom: .6rem;
          border: .025rem solid @blue;
          border-radius: .2rem;
          span {
            font-size: .6rem;
            color: @fontColor;
            padding: .3rem .6rem;
          }
          span:nth-child(even) {
            border-left: .025rem solid @blue;
            border-right: .025rem solid @blue;
          }
          span:last-child {
            border-right: none;
          }
        }
      }
    }
    .custom-remark {
      header {
        border-bottom: .025rem solid @gray;
        padding:.2rem .4rem;
        font-size: .65rem;
        color: @fontColor;
        line-height: 2rem;
      }
      seaction {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .4rem;
        .custom-remark-textarea {
          width: 90%;
          min-height: 4.5rem;
          padding: .5rem;
          border: .025rem solid @gray;
          border-radius: .2rem;
          background-color: @backColor;
          resize: none;
          font-size: .6rem;
          color: @fontColor1;
        }
      }
    }
    .confirm-btn {
      width: 90%;
      margin: 0 auto;
      border-radius: .2rem;
      line-height: 1.8rem;
      background-color: #4cd964;
      font-size: .7rem;
      color: #fff;
      text-align: center;
    }
  }
</style>

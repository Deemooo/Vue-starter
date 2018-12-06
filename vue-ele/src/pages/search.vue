<template>
    <div class="search">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="search-title">搜索</span>
        </template>
      </top-header>
      <form class="search-form" v-on:submit.prevent>
        <div>
          <input type="search" placeholder="请输入商家或美食名称" class="search-input"  v-model='inputValue'>
          <p v-if="checkInputValue" class="input-error-tips">{{ this.erroTip('名称') }}</p>
        </div>
        <div>
          <input type="submit" name="submit" class="search-submit" @click='searchRestaurant' value="搜索">
        </div>
      </form>
      <ul v-if="showFlag && historyArr.length !== 0" class="search-history">
          <div class="title">搜索历史</div>
          <div class="history-list">
            <ul v-for="(item, index) in historyArr" :key="index" @click='selectHistoryItem(item)' class="list-item">
              <li>
                <span class="local">{{ item }}</span>
              </li>
            </ul>
          </div>
        <div @click="clearAll" class="clear-all">清空所有</div>
      </ul>
      <ul v-else class="search-result">
        <li  @click="selectPlace(item)"
            v-for="item in restaurantsList"
            :key="item.id"
            class="search-result-item">
          <section class="shop-img-wrap">
            <img :src="imgBaseUrl + item.image_path" class="shop-img">
          </section>
          <section class="shop-info-wrap">
            <div class="shop-info">
              <p>
                <span class="shop-name">{{item.name}}</span>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
                  <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                  <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"/>
                  <text x="3.5" y="9" style="fill:#FF6000;font-size:9;font-weight:bold;">支付</text>
                </svg>
              </p>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
            </div>
          </section>
        </li>
        <p v-if="noResultFlag && restaurantsList.length === 0" class="no-result">很抱歉!无搜索结果。</p>
      </ul>
      <bottom-footer></bottom-footer>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import { imgBaseUrl } from '../../config/env';
  export default {
      components: {},
      computed: {
        ...mapState([
          'GEOHASH'
        ]),
        checkInputValue () {
          return !this.isNull(this.inputValue);
        }
      },
      data () {
          return {
            imgBaseUrl,
            inputValue: '',
            restaurantsList: [],
            historyArr: [],
            showFlag: true,
            noResultFlag: false
          };
      },
      methods: {
        // 搜索
        searchRestaurant () {
          if (!this.checkInputValue) {
            let params = this.setStrOfUrl({
              geohash: this.GEOHASH,
              keyword: this.inputValue
            });
            if (this.historyArr.indexOf(this.inputValue) === -1) {
              this.historyArr.push(this.inputValue);
            }
            this.https({url: '/v4/restaurants' + params, method: 'get'}).then(
              (res) => {
                this.restaurantsList = res;
                this.showFlag = false;
                this.noResultFlag = true;
              });
          } else {
            this.$snotify.warning('请输入商家或美食名称进行搜索！', {
              showProgressBar: false,
              timeout: 1000
            });
          }
        },
        // 点击搜索结果项
        selectPlace (item) {
          if (this.historyArr.indexOf(item.name) === -1) {
            this.historyArr.push(item.name);
          }
          this.$router.push({path: '/shop', query: {id: item.id}});
          this.setListData('searchShopHistory', this.historyArr);
        },
        // 点击搜索历史项
        selectHistoryItem (name) {
          this.inputValue = name;
          this.searchRestaurant();
        },
        // 清空搜索结果
        clearAll () {
          this.historyArr = [];
          this.removeListData('searchShopHistory');
          this.showFlag = false;
        }
      },
      mounted () {
        this.historyArr = this.getListData('searchShopHistory') || [];
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .search {
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
    .search-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .search-form {
      background-color: #fff;
      border-top: .025rem solid @gray;
      margin-top: 1.95rem;
      padding-top: .4rem;
      div {
        width: 90%;
        padding-bottom: .4rem;
        margin: 0 auto;
        text-align: center;
        input {
          border: .025rem solid @gray;
          padding: 0 .3rem;
          font-size: .65rem;
          color: @fontColor;
          outline: none;
        }
        .search-input, .search-submit {
          border-radius: .1rem;
          width: 100%;
          height: 1.4rem;
        }
        .search-submit {
          background-color: @blue;
          font-size: .65rem;
          color: #fff;
        }
      }
    }
    .search-history {
      margin-top: .4rem;
      background-color: #fff;
      border-top: .025rem solid @gray;
      .history-list {
        .list-item {
          padding: .4rem 0;
          margin: 0 auto;
          border-top: .025rem solid @gray;
          border-bottom: .025rem solid @gray;
          .local, .content {
            width: 90%;
            padding: .3rem;
            margin-left: .35rem;
            font-size: .65rem;
            color: @fontColor;
          }
          .content {
            padding-top: 0;
            font-size: .45rem;
            color: #999;
          }
        }
      }
      .title {
        padding: .4rem;
        text-align: left;
        font-size: .65rem;
        font-weight: 700;
      }
      .clear-all {
        padding: .4rem 0;
        text-align: center;
        font-size: .65rem;
        font-weight: 700;
        color: @fontColor;
      }
    }
    .search-result {
      border-top: .025rem solid @gray;
      margin-bottom: 1.95rem;
      background-color: #fff;
      .search-result-item {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding: .8rem;
        border-bottom: .025rem solid @gray;
        .shop-img-wrap {
          margin-right: 0.4rem;
          .shop-img {
            width: 2rem;
            height: 2rem;
          }
        }
        .shop-info-wrap {
          flex: 1;
          .shop-info {
            p {
              padding-bottom: .2rem;
              font-size: 0.55rem;
              color: @fontColor1;
              .shop-name {
                font-size: .65rem;
                font-weight: 700;
                color: @fontColor;
              }
            }
          }

        }
      }
      .no-result {
        padding-top: .5rem;
        text-align: center;
        font-size: .7rem;
        color: @fontColor1;
      }
    }
  }
</style>

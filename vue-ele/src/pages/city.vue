<template>
    <div class="city">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="city-name">{{ cityInfo.name }}</span>
          <span class="change-city" @click="$router.push('/')">切换城市</span>
        </template>
      </top-header>
      <form class="city-form" v-on:submit.prevent>
        <div>
          <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="search-input" required v-model='inputValue'>
        </div>
        <div>
          <input type="submit" name="submit" class="search-submit" @click='getPois' value="提交">
        </div>
      </form>
      <div v-if="showFlag && placeHistory.length !== 0" class="search-history">
        <div class="title">搜索历史</div>
        <div class="history-list">
          <div v-for="(item, index) in placeHistory" :key="index" @click='selectHistoryItem(item.geohash)' class="list-item">
            <div class="local">{{ item.name }}</div>
            <div class="content">{{ item.address }}</div>
          </div>
        </div>
        <div @click="clearAll" class="clear-all">清空所有</div>
      </div>
      <ul v-else class="search-result">
        <li v-for="(item, index) in placeList" :key="index" @click='selectPlace(index, item.geohash)' class="list-item">
          <div class="local">{{ item.name }}</div>
          <div class="content">{{ item.address }}</div>
        </li>
        <p v-if="noResultFlag && placeList.length === 0" class="no-result">很抱歉!无搜索结果。</p>
      </ul>
    </div>
</template>
<script>
  import { mapMutations, mapState } from 'vuex';
    export default {
      components: {},
      computed: {
        ...mapState([
          'cityInfo'
        ])
      },
      data () {
          return {
            cityId: '',
            inputValue: '',
            placeList: [],
            placeHistory: [],
            historyArr: [],
            showFlag: true,
            noResultFlag: false
          };
      },
      methods: {
        ...mapMutations([
          'UPDATECITYINFO',
          'SAVEGEOHASH'
        ]),
        getCurrentcity () {
          this.https({url: '/v1/cities/' + this.cityId, method: 'get'}).then(
            (res) => {
              this.UPDATECITYINFO(res);
            });
        },
        getPois () {
          if (this.inputValue) {
            let params = this.setStrOfUrl({
              type: 'search',
              city_id: this.cityId,
              keyword: this.inputValue
            });
            this.https({url: '/v1/pois' + params, method: 'get'}).then(
              (res) => {
                this.placeList = res;
                this.showFlag = false;
                this.noResultFlag = true;
              });
          } else {
            alert('请输入学校、商务楼、地址进行搜索！');
          }
        },
        selectHistoryItem (geohash) {
          this.$router.push('/msite');
          this.SAVEGEOHASH(geohash);
        },
        selectPlace (index, geohash) {
          let res = this.historyArr.every((item) => {
            return item.geohash !== geohash;
          });
          if (res) {
            this.historyArr.push(this.placeList[index]);
          }
          this.SAVEGEOHASH(geohash);
          this.selectHistoryItem(geohash);
          this.setListData('searchHistory', this.historyArr);
        },
        clearAll () {
          this.placeHistory = [];
          this.removeListData('searchHistory');
          this.showFlag = false;
        }
      },
      mounted () {
        this.cityId = this.$route.params.cityid || '';
        this.getCurrentcity();
        this.placeHistory = this.getListData('searchHistory') || [];
        this.historyArr = this.getListData('searchHistory') || [];
      },
      watch: {}
    };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .city {
    width: 100%;
    overflow-y: auto;
    position: relative;
    svg, span {
      box-sizing: border-box;
      color: #fff;
    }
    .city-name {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .arrow-left {
      padding-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .change-city {
      flex: 0 0 33.333%;
      padding-right: .4rem;
      font-size: .6rem;
      font-weight: 400;
      line-height: .6rem;
      text-align: right;
    }
    .city-form {
      background-color: #fff;
      border-top: .025rem solid @gray;
      border-bottom: .025rem solid @gray;
      margin-top: 1.95rem;
      padding-top: .4rem;
      div {
        width: 90%;
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
          margin-bottom: .4rem;
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
        border-bottom: .025rem solid @gray;
      }
    }
    .search-result {
      background-color: #fff;
      border-top: .025rem solid @gray;
      .list-item {
        margin: 0 auto;
        border-top: 1px solid @gray;
        border-bottom: 1px solid @gray;
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
      .no-result {
        padding-top: .5rem;
        text-align: center;
        font-size: .7rem;
        color: @fontColor1;
      }
    }
  }
</style>

<template>
    <div class="city">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="city-name">{{ cityInfo.name }}</span>
          <span class="change-city">切换城市</span>
        </template>
      </top-header>
      <form class="city-form" v-on:submit.prevent>
        <div>
          <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="search-input" required v-model='inputVaule'>
        </div>
        <div>
          <input type="submit" name="submit" class="search-submit" @click='postpois' value="提交">
        </div>
      </form>
      <div class="search-history">
        <div class="title">搜索历史</div>
        <div class="history-list">
          <div class="list-item">
            <div class="local">大雁塔</div>
            <div class="content">陕西省西安市雁塔区雁塔路</div>
          </div>
        </div>
        <div class="clear-all">清空所有</div>
      </div>
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
            cityId: ''
          };
      },
      methods: {
        ...mapMutations([
          'updateCityInfo'
        ]),
        getCurrentcity () {
          this.https({url: '/v1/cities/' + this.cityId, method: 'get'}).then(
            (res) => {
              this.updateCityInfo(res);
            });
        }
      },
      mounted () {
        this.cityId = this.$route.params.cityid || '';
        this.getCurrentcity();
      },
      watch: {}
    };
</script>
<style lang="less" scoped>
  .city {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    svg, span {
      box-sizing: border-box;
    }
    .city-name {
      flex: 0 0 86%;
      font-size: .8rem;
      color: #fff;
      text-align: center;
      font-weight: 700;
    }
    .arrow-left {
      margin-left: .4rem;
      width: .6rem;
      height: .8rem;
      text-align: left;
    }
    .change-city {
      position: absolute;
      right: .4rem;
      display: inline-block;
      font-weight: 400;
      font-size: .7rem;
      color: #fff;
      text-align: center;
    }
    .city-form {
      background-color: #fff;
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      margin-top: 1.95rem;
      padding-top: .4rem;
      div {
        width: 90%;
        margin: 0 auto;
        text-align: center;
        input {
          border: 1px solid #e4e4e4;
          padding: 0 .3rem;
          font-size: .65rem;
          color: #333;
          outline: none;
        }
        .search-input, .search-submit {
          border-radius: .1rem;
          margin-bottom: .4rem;
          width: 100%;
          height: 1.4rem;
        }
        .search-submit {
          background-color: #3190e8;
          font-size: .65rem;
          color: #fff;
        }
      }
    }
    .search-history {
      margin-top: .4rem;
      background-color: #fff;
      border-top: 1px solid #e4e4e4;
      .history-list {
        .list-item {
          margin: 0 auto;
          border-top: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          .local, .content {
            width: 90%;
            padding: .3rem;
            margin-left: .35rem;
            font-size: .65rem;
            color: #333;
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
        color: #333;
      }
    }
  }
</style>

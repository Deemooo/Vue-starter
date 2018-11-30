<template>
    <div class="home">
      <top-header class="home-head">
        <span class="head-logo" @click="reload">ele.me</span>
        <svg @click="$router.push('profile')"  v-if="USERINFO.id" class="user-avatar">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
        </svg>
        <span v-else @click="$router.push('login')" class="head-login">登录 | 注册</span>
      </top-header>
      <nav class="city-nav">
        <div class="tip">
          <span>当前定位城市：</span>
          <span>定位不准时，请在城市列表中选择</span>
        </div>
        <router-link :to="'/city/' + guessCityId" class="guess-city">
          <span>{{ guessCity }}</span>
          <svg class="arrow-right">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
      </nav>
      <section class="hot-cities">
        <div class="title">热门城市</div>
        <div class="city-list">
          <router-link  tag="span" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">
            {{ item.name }}
          </router-link>
        </div>
      </section>
      <section>
        <div v-for="(value, key) in sortgroupcity" :key="key" class="hot-cities group-city">
          <div class="title">{{ key }}</div>
          <div class="city-list">
            <router-link
              tag="span"
              v-for="item in value" :to="'/city/' + item.id"
              :key="item.id"
              :title="item.name"
              class="city">
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  export default {
    components: {},
    computed: {
      ...mapState([
        'USERINFO'
      ]),
      sortgroupcity () {
        let sortobj = {};
        for (let i = 65; i <= 90; i++) {
          if (this.groupcity[String.fromCharCode(i)]) {
            sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
          }
        }
        return sortobj
      }
    },
    data () {
        return {
          guessCityId: '',
          guessCity: '',
          hotcity: [],
          groupcity: {}
        };
    },
    methods: {
      ...mapMutations([
        'INITBUYUSERINFO'
      ]),
      reload () {
        window.location.reload();
      },
      // 获取热门城市
      getCurrentCity () {
        let params = this.setStrOfUrl({
          type: 'guess'
        });
        this.https({url: '/v1/cities' + params, method: 'get'}).then(
          (res) => {
            this.guessCity = res.name || '';
            this.guessCityId = res.id || '';
          });
      },
      // 获取热门城市
      getHotCity () {
        let params = this.setStrOfUrl({
          type: 'hot'
        });
        this.https({url: '/v1/cities' + params, method: 'get'}).then(
          (res) => {
            this.hotcity = res;
          });
      },
      // 获取所有城市
      getGroupCity () {
        let params = this.setStrOfUrl({
          type: 'group'
        });
        this.https({url: '/v1/cities' + params, method: 'get'}).then(
          (res) => {
            this.groupcity = res;
          });
      }
    },
    created () {
      this.INITBUYUSERINFO();
    },
    mounted () {
      this.getCurrentCity();
      this.getHotCity();
      this.getGroupCity();
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .home {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    .home-head {
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 .4rem;
      svg, span {
        box-sizing: border-box;
        color: #fff;
        font-weight: 400;
        font-size: .7rem;
        cursor: pointer;
      }
      .user-avatar {
        width: .8rem;
        height: .8rem;
        fill: #fff;
      }
    }
    .city-nav {
      padding-top: 2.35rem;
      border-top: .025rem solid @gray;
      background-color: #fff;
      margin-bottom: .4rem;
      .tip {
        display: flex;
        align-items: center;
        line-height: 1.45rem;
        border-bottom: .025rem solid @gray;
        span:first-child {
          margin-left: .4rem;
          font-size: .55rem;
          color: @fontColor1;
        }
        span:last-child {
          margin-left: 3rem;
          font-weight: 900;
          font-size: .475rem;
          color: #9f9f9f;
        }
      }
      .guess-city {
        display: flex;
        align-items: center;
        height: 1.8rem;
        padding-left: .4rem;
        font-size: 0.75rem;
        border-bottom: .025rem solid @gray;
        span {
          color: @blue;
        }
        .arrow-right {
          position: absolute;
          right: .4rem;
          width: .6rem;
          height: .6rem;
          fill: #999;
        }
      }
    }
    .hot-cities {
      background-color: #fff;
      margin-bottom: .4rem;
      .title {
        color: @fontColor1;
        font-weight: 400;
        padding-left: .4rem;
        border-top: .025rem solid @gray;
        border-bottom: .025rem solid @gray;
        font: .55rem/1.45rem Helvetica Neue;
      }
      .city-list {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        span {
          flex: 0 0 25%;
          box-sizing: border-box;
          text-align: center;
          color: @blue;
          border-bottom: .025rem solid @gray;
          border-right: .025rem solid @gray;
          height: 1.75rem;
          font: .6rem/1.75rem Microsoft YaHei;
        }
      }
    }
    .group-city {
        .city-list {
          .city {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: @fontColor1;
          }
        }
      }
  }
</style>

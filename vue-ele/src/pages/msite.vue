<template>
    <div class="msite">
      <top-header>
        <template>
          <router-link :to="'/search/geohash'" class="link-search">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
              <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
          </router-link>
          <router-link to="/" class="msite-title">
            <span class="msite-title-text">{{ msiteTitle }}</span>
          </router-link>
          <span class="head-login" @click="$router.push('login')">登录 | 注册</span>
        </template>
      </top-header>
    </div>
</template>
<script>
    export default {
        components: {},
        computed: {},
        data () {
            return {
              geohash: '',
              msiteTitle: ''
            };
        },
        methods: {
          getMsiteAddress () {
            this.https({url: '/v2/pois/' + this.geohash, method: 'get'}).then(
              (res) => {
                this.msiteTitle = res.name;
              });
          }
        },
       async mounted () {
          if (!this.$route.query.geohash) {
            let params = this.setStrOfUrl({
              type: 'guess'
            });
            this.https({url: '/v1/cities' + params, method: 'get'}).then(
              (res) => {
                this.geohash = res.latitude + ',' + res.longitude;
              });
          } else {
            this.geohash = this.$route.query.geohash;
          }
          this.getMsiteAddress();
        },
        watch: {}
    };
</script>
<style lang="less" scoped>
  .msite {
    width: 100%;
    overflow-y: auto;
    position: relative;
    color: #fff;
    .link-search {
      margin-left: .4rem;
      flex: 0 0 10%;
      height: .9rem;
    }
    .msite-title {
      flex: 0 0 64%;
      font-size: .8rem;
      text-align: center;
      text-decoration: none;
      color: #fff;
      .msite-title-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .head-login {
      flex: 0 0 33.333%;
      font-weight: 400;
      font-size: .7rem;
      color: #fff;
    }
  }
</style>

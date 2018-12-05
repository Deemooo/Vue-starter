<template>
    <div class="add-detail">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="add-detail-name">搜索地址</span>
        </template>
      </top-header>
      <form class="add-detail-form" v-on:submit.prevent>
        <div>
          <input type="search" placeholder="输入学校、商务楼、地址" class="search-input" required v-model='inputValue'>
        </div>
        <div>
          <input type="submit" name="submit" class="search-submit" @click='getPois' value="提交">
        </div>
      </form>
      <div class="search-result">
        <div v-for="(item, index) in placeList" :key="index" @click='selectPlace(index)' class="list-item">
          <div class="local">{{ item.name }}</div>
          <div class="content">{{ item.address }}</div>
        </div>
      </div>
      <vue-snotify></vue-snotify>
    </div>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default {
    components: {},
    computed: {},
    data () {
        return {
          inputValue: '',
          placeList: []
        };
    },
    methods: {
      ...mapMutations([
        'SAVESPECIFICSPACENAME'
      ]),
      // 获取地址列表
      getPois () {
        if (this.inputValue) {
          let params = this.setStrOfUrl({
            type: 'nearby',
            keyword: this.inputValue
          });
          this.https({url: '/v1/pois' + params, method: 'get'}).then(
            (res) => {
              this.placeList = res;
            });
        } else {
          this.$snotify.warning('请输入学校、商务楼、地址进行搜索！', {
            showProgressBar: false,
            timeout: 1000
          });
        }
      },
      // 选择地名
      selectPlace (index) {
        this.SAVESPECIFICSPACENAME(this.placeList[index].address);
        this.$router.go(-1);
      }
    },
    mounted () {},
    destroyed () {
      this.$snotify.clear();
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .add-detail {
    width: 100%;
    overflow-y: auto;
    position: relative;
    svg, span {
      box-sizing: border-box;
      color: #fff;
    }
    .arrow-left {
      flex: 0 0 33.333%;
      padding-left: .4rem;
      height: .8rem;
    }
    .add-detail-name {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .add-detail-form {
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
          box-sizing: border-box;
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
    .search-result {
      background-color: #fff;
      border-top: .025rem solid @gray;
      .list-item {
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
  }
</style>

<template>
    <div class="set-username">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="set-username-title">修改用户名</span>
        </template>
      </top-header>
      <form class="set-username-form" v-on:submit.prevent>
        <div>
          <input type="search" name="city" placeholder="输入用户名" class="search-input" required v-model='inputValue'>
        </div>
        <div>
          <input type="submit" name="submit" class="search-submit" @click='setUsername' value="提交">
        </div>
      </form>
    </div>
</template>
<script>
  import { mapMutations, mapState } from 'vuex';
  export default {
      components: {},
      computed: {
        ...mapState([
          'userInfo'
        ])
      },
      data () {
          return {
            inputValue: ''
          };
      },
      methods: {
        setUsername () {
          if (this.inputValue) {

          } else {
            alert('请输入商家或美食名称进行搜索！');
          }
        }
      },
      mounted () {
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .set-username {
    width: 100%;
    overflow-y: auto;
    position: relative;
    color: #fff;
    background-color: @backColor;
    svg, span {
      box-sizing: border-box;
      color: #fff;
    }
    .arrow-left {
      margin-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .set-username-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .set-username-form {
      background-color: #fff;
      border-top: 1px solid @gray;
      border-bottom: 1px solid @gray;
      margin-top: 1.95rem;
      padding-top: .4rem;
      div {
        width: 90%;
        margin: 0 auto;
        text-align: center;
        input {
          border: 1px solid @gray;
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
  }
</style>

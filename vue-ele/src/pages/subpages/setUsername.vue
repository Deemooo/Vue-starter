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
          <input type="search" v-model='inputValue' @input="checkInput" placeholder="输入用户名" :class="{'input-error': !effective}" class="search-input" required>
        </div>
        <div v-if="effective" class="input-tips">用户名只能修改一次(5-24字符之间)</div>
        <div v-else class="input-tips error">请输入5-24位的字符！</div>
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
            inputValue: '',
            effective: true
          };
      },
      methods: {
        ...mapMutations([
          'saveUserName'
        ]),
        // 输入检查
        checkInput () {
          if (this.inputValue.length < 5 || this.inputValue.length > 24) {
            this.effective = false;
            return false;
          } else {
            this.effective = true;
            return true;
          }
        },
        // 设置用户名
        setUsername () {
          if (this.checkInput) {
            this.saveUserName(this.inputValue);
            this.$router.go(-1);
          }
        }
      },
      mounted () {
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
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
          width: 100%;
          height: 1.4rem;
        }
        .input-error {
          border-color: @fontColor3;
        }
        .search-submit {
          background-color: @blue;
          font-size: .65rem;
          color: #fff;
        }
      }
      .input-tips {
        height: 0.58rem;
        font-size: .4rem;
        color: @fontColor1;
        text-align: left;
        padding: .4rem;
      }
      .error {
        font-size: .58rem;
        color: @fontColor3;
      }
    }
  }
</style>

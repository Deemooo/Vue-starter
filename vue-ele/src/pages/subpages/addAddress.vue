<template>
    <div class="add-address">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="add-address-title">新增收货地址</span>
        </template>
      </top-header>
      <form class="add-address-form" v-on:submit.prevent>
        <div>
          <input type="search" placeholder="请输入您的姓名" required v-model='inputName' @input="validateUser(inputName)" class="add-address-input">
          <div v-if="checkName" class="input-error-tips">{{ this._erroTip('姓名') }}</div>
        </div>
        <div>
          <input type="search" placeholder="请输入小区/写字楼/学校等" class="add-address-input" required v-model='inputAddress'>
        </div>
        <div>
          <input type="search" placeholder="请输入详细送餐地址" class="add-address-input" required v-model='inputDetailAddress'>
        </div>
        <div>
          <input type="search" placeholder="请输入您的手机号" class="add-address-input" required v-model='inputCellphoneNumber'>
        </div>
        <div>
          <input type="search" placeholder="请输入备用联系电话(选填)" class="add-address-input" required v-model='inputPhoneNumber'>
        </div>
        <div>
          <input type="submit" name="submit" class="add-address-submit" @click='addAddress' value="提交">
        </div>
      </form>
    </div>
</template>
<script>
  export default {
      components: {},
      computed: {
        checkName () {
          return this.validateUser(this.inputName);
        }
      },
      data () {
          return {
            inputName: '',
            inputAddress: '',
            inputDetailAddress: '',
            inputCellphoneNumber: '',
            inputPhoneNumber: ''
          };
      },
      methods: {
        addAddress () {}
      },
      mounted () {
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .add-address {
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
    .add-address-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .add-address-form {
      background-color: #fff;
      border-top: 0.25rem solid @gray;
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
        input::-webkit-input-placeholder {
          font-size: .6rem;
        }
        .add-address-input, .add-address-submit {
          border-radius: .1rem;
          width: 100%;
          height: 1.4rem;
        }
        .add-address-input:last-child {
          margin-bottom: .4rem;
        }
        .add-address-submit {
          background-color: @blue;
          font-size: .65rem;
          color: #fff;
        }
        .input-error-tips {
          width: 100%;
          height: 0.58rem;
          padding: .4rem;
          font-size: .58rem;
          color: @fontColor3;
          text-align: left;
        }
      }
    }
  }
</style>

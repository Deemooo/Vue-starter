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
          <input type="text" placeholder="请输入您的姓名" required v-model='inputName' class="add-address-input">
          <div v-if="checkName" class="input-error-tips">{{ this.erroTip('姓名') }}</div>
        </div>
        <router-link tag="div" to='specificSpaceName' class="add-detail">
          <input type="text" placeholder="请选择小区/写字楼/学校等" readonly="readonly" class="add-address-input" v-model='specificSpaceName'>
          <div v-if="checkAddress" class="input-error-tips">{{ this.erroTip('小区/写字楼/学校名称') }}</div>
        </router-link>
        <div>
          <input type="text" placeholder="请输入详细送餐地址" class="add-address-input" required v-model='inputDetailAddress'>
          <div v-if="checkDetailAddress" class="input-error-tips">{{ this.erroTip('详细送餐地址') }}</div>
        </div>
        <div>
          <input type="text" placeholder="请输入您的手机号" class="add-address-input" required v-model='inputCellphoneNumber'>
          <div v-if="checkCellphoneNumber" class="input-error-tips">{{ this.erroTip('手机号') }}</div>
        </div>
        <div>
          <input type="text" placeholder="请输入备用联系电话(选填)" class="add-address-input" v-model='inputPhoneNumber'>
          <div v-if="checkPhoneNumber" class="input-error-tips">{{ this.erroTip('备用联系电话') }}</div>
        </div>
        <div>
          <input type="submit" name="submit" class="add-address-submit" @click='asveAddress' value="提交">
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
        'userInfo',
        'specificSpaceName',
        'geohash'
      ]),
      checkName () {
        return !(this.isNull(this.inputName) && this.validateUser(this.inputName));
      },
      checkAddress () {
        return !this.isNull(this.specificSpaceName);
      },
      checkDetailAddress () {
        return !this.isNull(this.inputDetailAddress);
      },
      checkCellphoneNumber () {
        return !(this.isNull(this.inputCellphoneNumber) && this.validateCellPhone(this.inputCellphoneNumber));
      },
      checkPhoneNumber () {
        return !this.validatePhone(this.inputPhoneNumber);
      }
    },
    data () {
        return {
          inputName: '',
          inputDetailAddress: '',
          inputCellphoneNumber: '',
          inputPhoneNumber: ''
        };
    },
    methods: {
      ...mapMutations([
        'ADDNEWADDRESS',
        'SAVESPECIFICSPACENAME'
      ]),
      asveAddress () {
        if (!(this.checkName && this.checkAddress && this.checkDetailAddress && this.checkCellphoneNumber && this.checkPhoneNumber)) {
          let params = {
            address: this.specificSpaceName,
            address_detail: this.inputDetailAddress,
            geohash: this.geohash,
            name: this.inputName,
            phone: this.inputCellphoneNumber,
            phone_bk: this.inputPhoneNumber,
            poi_type: 0,
            sex: 1,
            tag: '公司',
            tag_type: 4
          };
          this.https({url: '/v1/users/' + this.userInfo.user_id + '/addresses', params, method: 'post'}).then(
            (res) => {
              if (res.message) {
                alert(res.message);
              } else {
                this.ADDNEWADDRESS({
                  name: this.inputName,
                  address: this.specificSpaceName,
                  address_detail: this.inputDetailAddress,
                  geohash: 'wtw37r7cxep4',
                  phone: this.inputCellphoneNumber,
                  phone_bk: this.inputPhoneNumber,
                  poi: this.specificSpaceName,
                  poi_type: 0
                });
                this.$router.go(-1);
              }
            });
        }
      }
    },
    mounted () {
    },
    deactivated () {
      this.inputDetailAddress = '';
      this.SAVESPECIFICSPACENAME('');
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

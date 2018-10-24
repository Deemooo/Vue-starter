<template>
    <div class="address">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="address-title">编辑地址</span>
        </template>
      </top-header>
      <div class="address-list first-list">
        <router-link to="addAddress" class="address-list-item">
          <span class="text">新增收货地址</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
        <div v-for="(item, index) in addressList" :key="index" @click="selectAddress(index)" :class="{'address-list-selected': addressIndex === index}" class="address-list-wrap">
          <div class="item-name">
            <span>{{ item.name }}</span>
            <span class="item-name-phone">{{ item.phone }}</span>
          </div>
          <div class="item-address">
            <span>{{ item.address }}</span>
          </div>
          <div @click="deleteAddress(index, item)" :class="{'address-list-delete-selected': addressIndex === index}" class="address-list-delete">X</div>
        </div>
      </div>
    </div>
</template>
<script>
  import { mapMutations, mapState } from 'vuex';
  export default {
      components: {},
      computed: {
        ...mapState([
          'userInfo',
          'addressList'
        ])
      },
      data () {
          return {
            addressIndex: ''
          };
      },
      methods: {
        ...mapMutations([
          'removeAddress'
        ]),
        selectAddress (index) {
          this.addressIndex = index;
        },
        async deleteAddress (index, item) {
          if (this.userInfo && this.userInfo.user_id) {
            let params = {};
            await this.https({url: '/v1/users/' + this.userInfo.user_id + '/addresses/' + item.id, params, method: 'delete'}).then(
              (res) => {
                this.removeAddress(index);
              });
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
  .address {
    width: 100%;
    overflow-y: auto;
    position: relative;
    background-color: #fff;
    svg, span {
      box-sizing: border-box;
    }
    .arrow-left {
      flex: 0 0 33.333%;
      margin-left: .4rem;
      height: .8rem;
      color: #fff;
    }
    .address-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
    }
    .address-list {
      .address-list-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: .6rem;
        border-bottom: .025rem solid @gray;
        .upload-avatar {
          display: none;
        }
        .text {
          flex: 1 0 60%;
          font-size: .7rem;
          color: @fontColor;
        }
        .avatar-default {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: #fff;
          margin: 0 .3rem;
        }
        .arrow {
          width: .46667rem;
          height: .46667rem;
        }
      }
      .address-list-wrap {
        position: relative;
        padding: .4em .6rem;
        border-bottom: .025rem solid @gray;
        .item-name, .item-address{
          margin: .1rem 0;
          text-align: left;
          color: @fontColor1;
        }
        .item-name {
          font-size: .5rem;
          .item-name-phone {
            margin-left: .4rem;
            color: @fontColor1;
          }
        }
        .item-address {
          display: flex;
          align-items: center;
          width: 90%;
          span {
            display: inline-block;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: .7rem;
          }
        }
        .address-list-delete {
          position: absolute;
          top: 50%;
          right: .5rem;
          display: none;
          transform: translateY(-50%);
          font-size: .7rem;
          color: @fontColor3;
        }
        .address-list-delete-selected {
          display: inline-block;
        }
      }
      .address-list-selected {
        background-color: @backColor;
      }
    }
    .first-list {
      margin-top: 1.95rem;
    }
  }
</style>

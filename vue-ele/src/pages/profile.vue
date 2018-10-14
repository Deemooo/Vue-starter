<template>
    <div class="profile">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="profile-title">我的</span>
        </template>
      </top-header>
      <!--账户信息-->
      <router-link :to="userInfo.user_id ? '/profile/profileInfo' : '/login'" tag="div" class="profile-info">
        <img :src="imgBaseUrl + userInfo.avatar" class="avatar-default" v-if="userInfo.user_id">
        <svg v-else class="avatar-default">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
        </svg>
        <div class="user-info">
          <div class="user-info-item">
            <div class="user-login">{{ username }}</div>
            <div class="user-phone">
              <svg class="user-phone-icon" fill="#fff">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
              </svg>
              <span class="icon-mobile-number">{{ mobile }}</span>
            </div>
          </div>
          <svg class="arrow-svg" fill="#fff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
      </router-link>
      <!--账户余额、优惠信息-->
      <div class="profile-wallet">
        <router-link to="/balance" tag="div" class="profile-wallet-item">
          <div class="profile-wallet-item-name">
            <span class="profile-wallet-item-name-count balance">{{ balance }}</span>
            <span class="profile-wallet-item-name-unit">元</span>
          </div>
          <div class="profile-wallet-item-value">我的余额</div>
        </router-link>
        <router-link to="/benefit" tag="div" class="profile-wallet-item">
          <div class="profile-wallet-item-name">
            <span class="profile-wallet-item-name-count count">{{ count }}</span>
            <span class="profile-wallet-item-name-unit">个</span>
          </div>
          <div class="profile-wallet-item-value">我的优惠</div>
        </router-link>
        <router-link to="/points" tag="div" class="profile-wallet-item">
          <div class="profile-wallet-item-name">
            <span class="profile-wallet-item-name-count point">{{ pointNumber }}</span>
            <span class="profile-wallet-item-name-unit">分</span>
          </div>
          <div class="profile-wallet-item-value">我的积分</div>
        </router-link>
      </div>
      <div class="profile-order">
        <router-link tag="div" to='/order' class="user-order">
          <svg class="icon" fill="#4aa5f0">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
          </svg>
          <span class="text">我的订单</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
        <a href='https://home.m.duiba.com.cn/#/chome/index' class="user-order">
          <svg class="icon" fill="#fc7b53">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
          </svg>
          <span class="text">积分商城</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </a>
        <router-link tag="div" to='/vipcard' class="user-order">
          <svg class="icon" fill="#ffc636">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
          </svg>
          <span class="text">饿了么会员卡</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
      </div>
      <div class="profile-order">
        <router-link tag="div" to='/service' class="user-order">
          <svg class="icon" fill="#4aa5f0">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
          </svg>
          <span class="text">服务中心</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
        <router-link tag="div" to='/vipcard' class="user-order">
          <svg class="icon" fill="#3cabff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
          </svg>
          <span class="text">下载饿了么APP</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
      </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import { imgBaseUrl } from '../../config/env';
  export default {
      components: {},
      computed: {
        ...mapState([
          'userInfo'
        ])
      },
      data () {
          return {
            imgBaseUrl,
            username: '登录/注册',
            mobile: '暂无绑定手机号',
            balance: 0,
            count: 0,
            pointNumber: 0,
            avatar: ''
          };
      },
      methods: {},
      mounted () {
        if (this.userInfo && this.userInfo.user_id) {
          this.avatar = this.userInfo.avatar;
          this.username = this.userInfo.username;
          this.mobile = this.userInfo.mobile || '暂无绑定手机号';
          this.balance = this.userInfo.balance;
          this.count = this.userInfo.gift_amount;
          this.pointNumber = this.userInfo.point;
        }
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .profile {
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
    .profile-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
    }
    .profile-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.95rem;
      padding: .666667rem .6rem;
      background-color: @blue;
      .avatar-default {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: #fff;
      }
      .user-info {
        flex: 1 0 60%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .user-info-item {
          flex: 1 0 80%;
          margin-left: .4rem;
          .user-login {
            font-weight: 500;
            font-size: .8rem;
            color: #fff;
          }
          .user-phone {
            display: flex;
            align-items: center;
            margin: .2rem 0;
            .user-phone-icon {
              width: .5rem;
              height: .75rem;
              margin-right: .2rem;
            }
            .icon-mobile-number {
              font-size: .57333rem;
              color: #fff;
            }
          }

        }
        .arrow-svg {
          width: .46667rem;
          height: .98rem;
        }
      }
    }
    .profile-wallet {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: .5rem 0;
      background-color: #fff;
      .profile-wallet-item {
        flex: 0 0 33.33%;
        border-right: .025rem solid @gray;
        text-align: center;
        .profile-wallet-item-name {
          text-align: center;
          word-spacing: -.25rem;
          padding-bottom: .4rem;
          .profile-wallet-item-name-count {
            font-size: 1.2rem;
            color: #f90;
            font-weight: 700;
            line-height: 1rem;
            font-family: Helvetica Neue,Tahoma;
          }
          .count {
            color: #ff5f3e;
          }
          .point {
            color: #6ac20b;
          }
          .profile-wallet-item-name-unit {
            color: @fontColor1;
            font-size: .55rem;
          }
        }
        .profile-wallet-item-value {
          font-size: .57333rem;
          color: @fontColor1;
          font-weight: 400;
        }
      }
    }
    .profile-order {
      margin: .4rem 0;
      background-color: #fff;
      .user-order {
        display: flex;
        align-items: center;
        padding: .6rem;
        border-bottom: .025rem solid @gray;
        .icon {
          width: .8rem;
          height: .8rem;
          margin-right: .2rem;
        }
        .text {
          flex: 1 0 60%;
          font-size: .7rem;
          color: @fontColor;
        }
        .arrow {
          width: .46667rem;
          height: .46667rem;
        }
      }
      .user-order:last-child {
        border-bottom: none;
      }
    }
  }
</style>

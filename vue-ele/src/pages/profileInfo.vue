<template>
    <div class="user-info">
      <div class="user-info-list">
        <div class="user-info-list-item"  @click="uploadAvatar">
          <input type="file" accept="image/*" class="upload-avatar">
          <span class="text">头像</span>
          <img :src="imgBaseUrl + userInfo.avatar" class="avatar-default" v-if="userInfo.user_id">
          <svg v-else class="avatar-default">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
          </svg>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <router-link tag="div" to='/setUsername' class="user-info-list-item">
          <span class="text">用户名</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
        <router-link to="address" class="user-info-list-item">
          <span class="text">收货地址</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
      </div>
      <div class="division">账号绑定</div>
      <div class="user-info-list">
        <router-link to="address" class="user-info-list-item">
          <span class="text">手机</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
      </div>
      <div class="division">安全设置</div>
      <div class="user-info-list">
        <router-link to="forget" class="user-info-list-item">
          <span class="text">登录密码</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </router-link>
      </div>
      <div class="exit-login">退出登录</div>
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
            imgBaseUrl
          };
      },
      methods: {
        // 上传头像
        async uploadAvatar () {
          document.querySelector('.upload-avatar').click();
        }
      },
      mounted () {
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .user-info {
    position: relative;
    width: 100%;
    margin-top: 1.95rem;
    overflow-y: auto;
    background-color: #fff;
    .user-info-list {
      .user-info-list-item {
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
          margin: 0px .3rem;
        }
        .arrow {
          width: .46667rem;
          height: .46667rem;
        }
      }
    }
    .division {
      padding: .4rem;
      text-align: left;
      font-size: .5rem;
      color: @fontColor1;
      background-color: @backColor;
    }
    .exit-login {
      width: 95%;
      height: 1.5rem;
      margin: 1.2rem auto;
      line-height: 1.5rem;
      border-radius: .1rem;
      text-align: center;
      background: #d8584a;
      font-size: .6rem;
      color: #fff;
    }
  }
</style>

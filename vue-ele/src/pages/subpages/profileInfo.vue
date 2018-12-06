<template>
    <div class="user-info">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="profile-title">个人信息</span>
        </template>
      </top-header>
      <div class="user-info-list first-list">
        <div class="user-info-list-item"  @click="uploadAvatar">
          <input type="file" accept="image/*" class="upload-avatar">
          <span class="text">头像</span>
          <img :src="imgBaseUrl + USERINFO.avatar" class="avatar-default" v-if="USERINFO.user_id">
          <svg v-else class="avatar-default">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
          </svg>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <router-link tag="div" to='setUsername' class="user-info-list-item">
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
        <div @click="setCellPhoneNumber" class="user-info-list-item">
          <span class="text">手机</span>
          <svg class="arrow" fill="#bbb">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
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
      <div @click="exitLogin" class="exit-login">退出登录</div>
    </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import { imgBaseUrl } from '../../../config/env';
  export default {
    components: {},
    computed: {
      ...mapState([
        'USERINFO'
      ])
    },
    data () {
        return {
          imgBaseUrl
        };
    },
    methods: {
      ...mapMutations([
        'OUTLOGIN'
      ]),
      // 上传头像
      uploadAvatar () {
        var uploadInput = document.querySelector('.upload-avatar');
        uploadInput.click();
        uploadInput.onload = (() =>  {
          let data = new FormData();
          data.append('file', uploadInput.files[0]);
          try {
            this.https({url: '/eus/v1/users/' + this.USERINFO.user_id + '/avatar', data, method: 'post'}).then(
              (res) => {
                if (res.status === 1) {
                  this.$set(this.USERINFO, 'avatar', res.image_path);
                } else {
                  throw new Error('上传失败!');
                }
              });
          } catch (e) {
            this.$snotify.warning(e, {
              showProgressBar: false,
              timeout: 1000
            });
          }
        })();
      },
      setCellPhoneNumber () {
        this.$snotify.warning('请在APP中设置！', {
          showProgressBar: false,
          timeout: 1000
        });
      },
      // 退出登录
      exitLogin () {
        this.$snotify.confirm('是否退出登陆?', '提示', {
          timeout: 0,
          buttons: [
            { text: '取消' },
            { text: '确认', action: this.confirmExitLogin }
          ]
        });
      },
      // 确认退出
      confirmExitLogin () {
        this.OUTLOGIN();
        this.$router.go(-1);
      }
    },
    mounted () {
    },
  destroyed () {
    this.$snotify.clear();
  },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .user-info {
    position: relative;
    width: 100%;
    overflow-y: auto;
    background-color: #fff;
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
    .first-list {
      margin-top: 1.95rem;
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

<template>
    <div class="header-warp">
      <span class="logo-wrap"></span>
      <Breadcrumb class="breadcrumb-wrap">
        <BreadcrumbItem to="/manage">首页</BreadcrumbItem>
        <BreadcrumbItem v-for="(item, index) in $route.meta" :key="index">{{ item }}</BreadcrumbItem>
      </Breadcrumb>
      <Dropdown
        class="color-palette-wrap"
        @on-click="changeThemeColor"
        trigger="hover">
        <Icon type="md-color-palette" size="38"/>
        <DropdownMenu slot="list">
          <DropdownItem
            v-for="(item, index) in colorPalette"
            :name="item.name"
            :key="index"
            :disabled="item.disabled"
            :divided="item.divided">
            {{ item.title }}
            <span class="color-wrap" :style="{backgroundColor: `#${item.name}`}"></span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        class="user-info-wrap"
        @on-click="loginOut"
        trigger="hover">
        <img :src="baseImgPath + adminInfo.avatar" class="header-warp-avatar"/>
        <DropdownMenu slot="list">
          <DropdownItem name="logOut">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
</template>
<script>
  import { baseImgPath } from '../../config/env';
  import { mapState } from 'vuex';
  export default {
        components: {},
        computed: {
          ...mapState(['adminInfo'])
        },
        data () {
            return {
              baseImgPath,
              colorPalette: [
                {
                  name: 'theme',
                  title: '皮肤',
                  disabled: true
                },
                {
                  name: 'index',
                  title: '默认',
                  divided: true
                },
                {
                  name: '2d8cf0',
                  title: '天空蓝'
                },
                {
                  name: '009688',
                  title: '翡翠绿'
                },
                {
                  name: 'ba68c8',
                  title: '石英紫'
                }
              ]
            };
        },
        methods: {
          loginOut (name) {
            this.https({url: '/admin/singout', method: 'get'}, (response) => {
              if (response.status === 1) {
                sessionStorage.removeItem('user_id');
                this.$Message.success(response.success);
                this.$router.push('/');
              }
            });
          }
        },
        mounted () {
        },
        watch: {}
    };
</script>
<style lang="less" scoped>
  .header-warp {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: #EFF2F7;
    .logo-wrap {
      display: inline-block;
      width: 100px;
      height: 60px;
      background-size: 100px 60px;
      background-image: url("../assets/images/icon/eleLogo.svg");
    }
    .breadcrumb-wrap {
      width: 300px;
      order: 0;
    }
    .color-palette-wrap {
      order: 1;
      margin-left: 69%;
      .color-wrap {
        position: relative;
        top: 5px;
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-left: 6px;
      }
    }
    .user-info-wrap {
      order: 2;
      padding: 0 20px;
      .header-warp-avatar {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
</style>

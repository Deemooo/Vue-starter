<template>
    <div class="header-warp">
      <span class="logo-wrap"></span>
      <Breadcrumb class="breadcrumb-wrap">
        <BreadcrumbItem to="/manage">首页</BreadcrumbItem>
        <BreadcrumbItem v-for="(item, index) in $route.meta" :key="index">{{ item }}</BreadcrumbItem>
      </Breadcrumb>
      <Dropdown
        class="user-info-wrap"
        @on-click="loginOut"
        trigger="hover">
        <img :src="baseImgPath + adminInfo.avatar" class="header-warp-avatar"/>
        <DropdownMenu slot="list">
          <ColorPicker v-model="themeColor" @on-active-change="changeThemeColor" :colors="recommendColors"/>
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
              themeColor: '#515a6e',
              recommendColors: ['#5cadff']
            };
        },
        methods: {
          loginOut (name) {
            this.https({url: '/admin/singout', method: 'get'}, (response) => {
              if (response.status === 1) {
                this.$Message.success(response.success);
                this.$router.push('/');
              }
            });
          },
          changeThemeColor (value) {
            if (value.indexOf('#') === 0) {
              console.log(typeof value);
              let color = value.substring(1);
              required(`../assets/style/myTheme/${color}.less`);
            }
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
    .user-info-wrap {
      margin-left: 70%;
      order: 1;
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

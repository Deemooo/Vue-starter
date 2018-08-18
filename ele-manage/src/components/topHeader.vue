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
        <span class="header-warp-avatar"></span>
        <DropdownMenu slot="list">
          <DropdownItem name="logOut">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
</template>
<script>
    export default {
        components: {},
        computed: {},
        data () {
            return {};
        },
        methods: {
          loginOut (name) {
            this.https({url: '/admin/singout', method: 'get'}, (response) => {
              if (response.status === 1) {
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
      order: 0;
    }
    .user-info-wrap {
      margin-left: 75%;
      order: 1;
      .header-warp-avatar {
        display: inline-block;
        width: 32px;
        height: 32px;
        background-image: url("../assets/images/icon/user.svg");
        cursor: pointer;
      }
    }
  }
</style>

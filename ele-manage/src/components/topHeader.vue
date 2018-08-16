<template>
    <div class="header-warp">
      <span class="logo-wrap"></span>
      <Breadcrumb class="breadcrumb-wrap">
        <BreadcrumbItem to="/manage">Home</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
      <Dropdown class="user-info-wrap">
        <span href="javascript:void(0)">
          用户头像
        </span>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
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
        methods: {},
        mounted () {
        },
        watch: {}
    };
</script>
<style lang="less" scoped>
  .header-warp {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
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
    }
  }
</style>

<template>
  <div class="manage-wrap">
    <top-header></top-header>
    <Row class="manage-wrap-content">
      <Col span="4">col-12</Col>
      <Col span="20">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </Col>
    </Row>
  </div>
</template>

<script>
  import topHeader from '../components/topHeader';
    export default {
      components: {
        topHeader
      }
    };
</script>

<style lang="less" scoped>
  .manage-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .manage-wrap-content {
      width: 100%;
      height: calc(100% - 60px);
      margin-top: 60px;
    }
  }
</style>

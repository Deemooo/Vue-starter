<template>
  <div class="img-wrap">
    <img class="upload-img" v-if="imgSrc" :src="imgSrc" alt="加载中..."/>
    <div v-else class="img-wrap-default"></div>
  </div>
</template>
<script>
  export default {
    props: {
      imgSrc: {
        type: String,
        required: true
      }
    },
    data () {
      return {};
    }
  };
</script>

<style lang="less" scoped>
  .img-wrap {
    width: 100%;
    height: 200px;
    border: 1px solid #ddd;
    background: #f4f4f4;
    color: #ddd;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
      img {
        width: 100%;
      }
      .img-wrap-default {
        width: 69px;
        height: 64px;
        background: url("../assets/images/icon/imageDefault.svg") no-repeat;
      }
  }
</style>

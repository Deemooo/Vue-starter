<template>
  <div id="app">
    <router-view/>
    <svg-icon></svg-icon>
  </div>
</template>
<script>
  import svgIcon from './components/svg';
  export default {
    components: {
      svgIcon
    }
  };
</script>
<style lang="less">
  @import './assets/style/common';
</style>

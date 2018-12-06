<template>
  <div id="app">
    <router-view/>
    <svg-icon></svg-icon>
    <vue-snotify></vue-snotify>
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
  @import './assets/style/extra';
</style>

<template>
  <header class="header">
    <slot></slot>
  </header>
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
  @import (reference) "../assets/style/dynamic";
  .header {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.95rem;
    background-color: @blue;
    z-index: 100;
  }
</style>

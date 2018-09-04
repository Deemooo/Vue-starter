<template>
    <div class="city">
      <top-header>
        <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
        <span class="change-city">切换城市</span>
      </top-header>
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
  .city {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    .arrow-left {
      position: absolute;
      left: .4rem;
      width: .6rem;
      height: .8rem;
    }
    .change-city {
      position: absolute;
      right: .4rem;
      display: inline-block;
      font-weight: 400;
      font-size: .7rem;
      color: #fff;
    }
  }
</style>

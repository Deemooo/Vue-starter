<template>
    <div class="city">
      <top-header>
        <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
        <span class="city-name">{{ headTitle }}</span>
        <span class="change-city">切换城市</span>
      </top-header>
      <form class="city-form" v-on:submit.prevent>
        <div>
          <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required v-model='inputVaule'>
        </div>
        <div>
          <input type="submit" name="submit" class="city_submit input_style" @click='postpois' value="提交">
        </div>
      </form>
    </div>
</template>
<script>
    export default {
      components: {},
      computed: {},
      data () {
          return {
            headTitle: '北京'
          };
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
    svg, span {
      flex: 0 0 33.333%;
      box-sizing: border-box;
    }
    .city-name {
      font-size: .8rem;
      color: #fff;
      text-align: center;
      font-weight: 700;
    }
    .arrow-left {
      margin-left: .4rem;
      width: .6rem;
      height: .8rem;
      text-align: left;
    }
    .change-city {
      display: inline-block;
      font-weight: 400;
      font-size: .7rem;
      color: #fff;
      text-align: center;
    }
  }
</style>

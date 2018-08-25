<template>
    <div class="main-right-content-wrap">
      <Steps :current="0" :style="{width: '80%'}">
        <Step title="初级" content="2017-2018"></Step>
        <Step title="中级" content="2018-2020"></Step>
        <Step title="高级" content="2020-2023"></Step>
        <Step title="专家" content="2023-?"></Step>
      </Steps>
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
  .main-right-content-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
  }
</style>

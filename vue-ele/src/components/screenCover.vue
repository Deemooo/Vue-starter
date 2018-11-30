<template>
    <div v-show="coverShow" class="cover">
      <slot></slot>
    </div>
</template>
<script>
  export default {
    props: ['coverShow'],
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
  .cover {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    z-index: 100;
  }
</style>

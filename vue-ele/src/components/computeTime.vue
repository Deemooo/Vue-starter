<template>
  <span class="time">
    {{remaining}}
    <vue-snotify></vue-snotify>
  </span>
</template>
<script>
  export default {
    props: {
      countNum: {
        type: Number,
        default: 900,
        required: true
      },
      tips: {
        type: String,
        default: '支付超时!'
      }
    },
    components: {},
    computed: {
      // 返回记时
      remaining () {
        let minute = parseInt(this.count / 60);
        if (minute < 10) {
          minute = '0' + minute;
        }
        let second = parseInt(this.count % 60);
        if (second < 10) {
          second = '0' + second;
        }
        return `00 : ${minute} : ${second}`;
      }
    },
    data () {
        return {
          count: 0,
          timer: null
        };
    },
    methods: {
      // 记时
      remainingTime () {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.count--;
          if (this.count === 0) {
            clearInterval(this.timer);
            this.$snotify.warning(this.tips, {
              timeout: 0,
              showProgressBar: false,
              buttons: [
                {text: '确定', action: () => this.$emit('listenTimeOutFlag', false)}
              ]
            });
          }
        }, 1000);
      }
    },
    created () {
      this.count = this.countNum;
    },
    mounted () {
      this.remainingTime();
    },
    beforeDestroy () {
      clearInterval(this.timer);
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
</style>

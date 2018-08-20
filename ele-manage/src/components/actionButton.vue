<template>
  <Button
    :type="type"
    :ghost="ghost"
    :size="size"
    :shape="shape"
    :long="long"
    :disabled="disabled"
    :icon="icon"
    @click="click"
    class="action-button"
  >
    {{ text }}
  </Button>
</template>
<script>
    export default {
      props: {
        text: {
          type: String,
          default: ''
        },
        // 按钮类型
        type: {
          type: String,
          default: 'default'
        },
        // 幽灵属性，使按钮背景透明
        ghost: {
          type: Boolean,
          default: false
        },
        // 按钮大小
        size: {
          type: String,
          default: 'default'
        },
        // 开启后，按钮的长度为 100%
        long: {
          type: Boolean,
          default: false
        },
        // 设置按钮为禁用状态
        disabled: {
          type: Boolean,
          default: false
        },
        // 设置按钮的图标类型
        icon: {
          type: String,
          default: ''
        }
      },
      components: {},
      computed: {},
      data () {
          return {};
      },
      methods: {
        click () {
          this.$emit('click');
        }
      },
      mounted () {
      },
      watch: {}
    };
</script>
<style lang="less" scoped>
</style>

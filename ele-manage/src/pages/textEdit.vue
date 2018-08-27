<template>
  <div class="main-right-content-wrap">
    <quill-editor
      v-if="editFlag"
      class="quill-editor"
      ref="quillEditor"
      v-model="content">
    </quill-editor>
    <div class="ql-container ql-snow" v-else>
      <div class="ql-editor">
        <div class="content-wrap" v-html="content"></div>
      </div>
    </div>
    <action-button @click="textAction" class="button" type="primary" :text="editFlag ? '保存' :  '返回'"></action-button>
  </div>
</template>
<script>
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import { quillEditor } from 'vue-quill-editor';
  export default {
    components: {
      quillEditor
    },
    computed: {},
    data () {
      return {
        content: '',
        editFlag: true
      };
    },
    methods: {
      textAction () {
        this.editFlag = !this.editFlag;
      }
    },
    mounted () {
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  .main-right-content-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    .quill-editor {
      width: 100%;
      height: 90%;
      box-sizing: border-box;
      margin: 10px 0;
      .ql-container {
        height: 90%;
      }
    }
    .ql-container {
      width: 100%;
      height: 90%;
      margin-bottom: 10px;
      .content-wrap {
        width: 100%;
        height: 90%;
        margin: 10px 0;
      }
    }
  }
</style>

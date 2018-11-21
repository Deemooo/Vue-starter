<template>
    <div class="question-detail">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="question-detail-title">{{ question.title }}</span>
        </template>
      </top-header>
      <div class="question-detail-content markdown-body" v-html="content"></div>
    </div>
</template>
<script>
  import marked from 'marked';
  import Prism from 'prismjs';
  import 'prismjs/themes/prism.css';
  import { mapState } from 'vuex';
  marked.setOptions({
    highlight: (code) => Prism.highlight(code, Prism.languages.javascript)
  });
  export default {
      components: {},
      computed: {
        ...mapState([
          'question'
        ]),
        content () {
          return marked(this.question.detail);
        }
      },
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
  @import (reference) "../../assets/style/dynamic";
  .question-detail {
    width: 100%;
    overflow-y: auto;
    position: relative;
    color: #fff;
    svg {
      box-sizing: border-box;
    }
    .arrow-left {
      margin-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .question-detail-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .question-detail-content {
      margin-top: 1.95rem;
      padding: .8rem;
    }
  }
</style>

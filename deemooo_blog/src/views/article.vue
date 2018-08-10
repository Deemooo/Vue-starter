<template>
    <div class="index-main">
        <div class="article-main-wrap">
            <p class="index-contents-item-title">{{ article.title }}</p>
            <div class="index-contents-item-footer">
                <span class="index-contents-item-footer-author">{{ article.author }}</span>
                <span class="index-contents-item-footer-date">{{ article.createdAt }}</span>
            </div>
            <p class="index-contents-item-content">
                <span>{{ article.abstract }}</span>
            </p>
            <div class="markdown-body" v-html="content"></div>
        </div>
    </div>
</template>

<script>
    import marked from 'marked';
    import Prism from 'prismjs';
    import 'prismjs/themes/prism.css';
    marked.setOptions({
        highlight: (code) => Prism.highlight(code, Prism.languages.javascript)
    });

    export default {
        data () {
            return {
                article: {},
                content: ''
            };
        },
        methods: {
            //  获取文章内容, 清除文章
            getArticle (id) {
                this.axios.get(this._API + 'api/article/' + id)
                    .then(response => {
                        this.article = response.data;
                        this.content = marked(response.data.content);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        computed: {},
        created () {
            if (this.$route.query.artcleId) {
                this.getArticle(this.$route.query.artcleId);
            }
        },
        mounted () {}
    };
</script>

<style lang="less" scoped>
    @import '../../node_modules/github-markdown-css/github-markdown.css';
    .article-main-wrap {
        width: 100%;
        min-height: 500px;
        margin: 50px auto;
        text-align: center;
        .index-contents-item-title {
            font-size: 3em;
            font-weight: 900;
        }
        .index-contents-item-footer {
            margin: 10px 0;
            color: #9eabb3;
        }
        .markdown-body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            margin-left: 490px;
            text-align: left;
        }
    }
    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>
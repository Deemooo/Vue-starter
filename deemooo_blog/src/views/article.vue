<template>
    <div class="index-main">
        <div class="article-main-wrap">
            <p class="index-contents-item-title">{{ article.title }}</p>
            <p class="index-contents-item-content">
                <span>{{ article.abstract }}</span>
            </p>
            <div class="index-contents-item-footer">
                <span class="index-contents-item-footer-author">{{ article.author }}</span>
                <span class="index-contents-item-footer-date">{{ article.createdAt }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                article: {}
            };
        },
        methods: {
            //  获取文章内容, 清除文章
            getArticle (id) {
                this.axios.get(this._API + 'api/article/' + id)
                    .then(response => {
                        this.article = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        created () {
            if (this.$route.query.artcleId) {
                this.getArticle(this.$route.query.artcleId);
            }
        },
        mounted () {}
    };
</script>

<style lang="less" scoped>
    .article-main-wrap {
        width: 100%;
        min-height: 500px;
        margin: 50px auto;
        text-align: center;
        .index-contents-item-title {
            font-size: 2em;
            font-weight: 900;
        }
    }
</style>
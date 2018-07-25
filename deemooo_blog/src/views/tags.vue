<template>
    <div class="tags-main">
        <div class="tags-main-wrap">
            <span @click="getContentsByTag(item.objectId)" v-for="(item, index) in tags" :key="index" class="tags-item">{{ item.tagName }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tags: []
            };
        },
        methods: {
            // 获取标签集, 获取指定标签列表
            getTags () {
                this.axios.get('https://bird.ioliu.cn/v1/?url=http://nickj.leanapp.cn/api/tags')
                    .then(response => {
                        this.tags = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getContentsByTag (tagId) {
                this.axios.get('https://bird.ioliu.cn/v1/?url=http://nickj.leanapp.cn/api/tags/' + tagId)
                    .then(response => {
                        this.$store.commit('updateContents', response);
                        this.$router.push({ path: '/' , query: { tagGo: true }});
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        mounted () {
            this.getTags();
        }
    };
</script>

<style lang="less" scoped>
    .tags-main {
        position: relative;
        width: 100%;
        min-height: 500px;
        margin: 0 auto;
        .tags-main-wrap {
            width: 50%;
            min-height: 500px;
            margin: 50px auto;
            text-align: center;
        }
        .tags-item {
            display: inline-block;
            min-width: 50px;
            height: 30px;
            padding: 0 10px;
            margin: 10px;
            line-height: 30px;
            text-align: center;
            border-radius: 4px ;
            color: #666;
            background-color: #eee;
            font-size: 1.5em;
            cursor: pointer;
        }
    }

</style>
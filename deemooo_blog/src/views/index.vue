<template>
    <div class="index-main">
        <div class="index-contents">
            <ul class="index-contents-wrap">
                <li v-for="(item, index) in contents" :key="index" class="index-contents-item">
                    <p class="index-contents-item-title">{{ item.title }}</p>
                    <p class="index-contents-item-content">
                        <span>{{ item.abstract }}</span>
                        <router-link :to="{ path: '/article',query: { artcleId: item.objectId } }" class="item">
                            <span class="index-contents-item-content-ellipsis">>>></span>
                        </router-link>
                    </p>
                    <div class="index-contents-item-footer">
                        <span class="index-contents-item-footer-author">{{ item.author }}</span>
                        <span class="index-contents-item-footer-date">{{ item.createdAt }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            contents () {
                return this.$store.state.contents;
            }
        },
        data () {
            return {
                nowTime: new Date().toLocaleString()
            };
        },
        methods: {
            getContents () {
                this.axios.get(this._API + 'api/contentAll')
                    .then((response) => {
                        if (response.data && response.data.length !== 0) {
                            this.$store.commit('updateContents', response.data);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }
        },
        mounted () {
            if (!this.$route.query.tagGo) {
                this.getContents();
            }
        }
    };
</script>
<style lang="less" scoped>
    .index-contents {
        width: 100%;
        min-height: 500px;
    }
    .index-contents-wrap {
        padding-top: 50px;
        box-sizing: border-box;
        width: 100%;
        min-height: 500px;
        text-align: center;
        .index-contents-item {
            width: 50%;
            height: 200px;
            margin: 0 auto;
            list-style-type: none;
            box-shadow: 0 2px 8px 0 rgba(7,17,27,.06);
            p {
                margin: 10px 0;
            }
            .index-contents-item-title {
                font-size: 2em;
                font-weight: 900;
            }
            .index-contents-item-content {
                overflow: hidden;
                .index-contents-item-content-ellipsis {
                    font-weight: 700;
                }
            }
            .index-contents-item-footer {
                color: #8492a6;
                .index-contents-item-footer-author {
                    padding-right: 10px;
                    margin-right: 10px;
                    border-right: 1px solid #8492a6;
                }
            }

        }
    }
</style>
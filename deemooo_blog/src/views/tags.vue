<template>
    <div class="tags-main">
        <div class="tags-main-wrap">
            <span class="tags-item">Vue</span>
            <span class="tags-item">NodeJS</span>
        </div>
    </div>
</template>

<script>
    export default {
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
            margin: 0 10px;
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
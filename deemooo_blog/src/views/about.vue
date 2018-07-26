<template>
    <div class="index-main">
        <div class="about-main-wrap">
            <Timeline>
                <TimelineItem>
                    <p class="time">2016年</p>
                    <p class="content">新手村</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">2017年</p>
                    <p class="content">心有猛虎，嗷呜嗷呜</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">2018年</p>
                    <p class="content">I Can Do Everything！</p>
                </TimelineItem>
            </Timeline>
        </div>
    </div>
</template>

<script>
    export default {
    };
</script>

<style lang="less" scoped>
    .about-main-wrap {
        width: 50%;
        min-height: 500px;
        margin: 50px auto;
        text-align: center;
        .time{
            font-size: 14px;
            font-weight: bold;
        }
        .content{
            padding-left: 5px;
        }
    }

</style>
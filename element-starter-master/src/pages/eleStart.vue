<template>
    <div>
        <img src="src/assets/logo.png">
        <div>
            <el-button @click="startHacking">Start</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ele-start",
        methods: {
            startHacking () {
                this.$notify({
                    title: 'It works!',
                    type: 'success',
                    message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
                    duration: 5000
                })
            }
        }
    }
</script>

<style scoped>

</style>
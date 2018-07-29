<template>
    <div class="layout">
        <Layout :breakpoint="breakpoint">
            <Header :style="{position: 'fixed', width: '100%'}">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="home"></Icon>
                            <router-link to="/" tag="span">主页</router-link>
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="pricetag"></Icon>
                            <router-link to="/tags" tag="span">标签</router-link>
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="paper-airplane"></Icon>
                            发布
                        </MenuItem>
                        <MenuItem name="4" @click.native="loginIn">
                            <Icon type="log-in"></Icon>
                            登陆
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            <router-link to="/about" tag="span">关于</router-link>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
                <router-view></router-view>
            </Content>
            <Footer class="layout-footer-center">2018-2019 &copy; Deemooo</Footer>
        </Layout>
        <login></login>
    </div>
</template>
<script>
    import login from './views/login';
    export default {
        components: {
            login
        },
        data() {
            return {
                // 触发响应式布局的断点
                breakpoint: {
                    xs: '480px',
                    sm: '768px',
                    md: '992px',
                    lg: '1200px',
                    xl: '1600px'
                }
            };
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            loginIn () {
                this.$store.commit('updateModalShow', true);
            }
        }
    };
</script>
<style lang="less" scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-nav{
        width: 520px;
        height: 100%;
        margin-left: 70%;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
<style lang="less">
    .index-main {
        position: relative;
        width: 100%;
        min-height: 500px;
        margin: 0 auto;
    }
</style>
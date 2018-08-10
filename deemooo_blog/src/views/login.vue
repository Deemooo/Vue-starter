<template>
    <Modal
    title="登陆"
    ok-text="登陆"
    cancel-text="取消"
    v-model="$store.state.modalShow"
    @on-ok="loginOk"
    @on-cancel="loginCancal"
    >
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="username">
                <Input type="text" v-model="formInline.username" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
    export default {
        props: {},
        computed: {},
        data () {
            const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('用户名不能为空！'));
                } else {
                    /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/.test(value) ? callback() : callback(new Error('请输入正确的用户名！'));
                }
            };
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空！'));
                } else {
                    /^[a-zA-Z0-9]\w{3,11}$/.test(value) ? callback() : callback(new Error('请输入正确的密码！'));
                }
            };
            return {
                formInline: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        { validator: validateUser, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            loginOk () {
                this.$refs.formInline.validate((valid) => {
                    if (valid) {
                        this.loginUser();
                    } else {
                        this.$Message.error('验证失败！');
                    }
                });
            },
            loginCancal () {
                this.$store.commit('updateModalShow', false);
            },
            // 管理员登录
            loginUser () {
                let data = this.formInline;
                this.axios.post('http://nickj.leanapp.cn/api/login', data)
                    .then((response) => {
                        if (response.data.isLogin) {
                            this.$Message.success('登陆成功！');
                            sessionStorage.setItem('username', response.data.username);
                            this.$refs['formInline'].resetFields();
                            this.$store.commit('updateModalShow', false);
                            this.$router.push('/');
                        }
                    })
                    .catch(() => {
                        this.$Message.error('登陆失败！');
                    });
            }
        }
    };
</script>

<style scoped>

</style>
<template>
    <Modal
    title="登陆"
    ok-text="登陆"
    cancel-text="取消"
    v-model="loginShow"
    @on-ok="loginOk"
    @on-cancel="loginCancal"
    >
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="Username">
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
        props: {
            modalShow: {
                default: false
            }
        },
        computed: {
            loginShow () {
                return this.modalShow;
            }
        },
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            loginOk () {
                this.$refs.formInline.validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                });
            },
            loginCancal () {
                this.loginShow = false;
            }
        }
    };
</script>

<style scoped>

</style>
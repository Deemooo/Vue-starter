<template>
    <div class="login-page">
      <div class="login-page-title">ele后台管理系统</div>
      <div class="login-page-form-wrap">
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
              <FormItem prop="user">
                  <Input type="text" v-model="formInline.user" placeholder="Username">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="password">
                  <Input type="password" v-model="formInline.password" placeholder="Password">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
              </FormItem>
          </Form>
      </div>
    </div>
</template>
<script>
export default {
    components: {},
    computed: {},
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
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
    },
    mounted () {},
    watch: {}
};
</script>
<style lang="less" scoped>
  .login-page {
    width: 100%;
    height: 100%;
    background-color: #515a6e;
    .login-page-title {
      position: relative;
      top: 50px;
      font-size: 25px;
      color: #f8f8f9;
    }
    .login-page-form-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -105px;
      margin-left: -160px;
      box-sizing: border-box;
      width: 320px;
      height: 210px;
      padding: 35px;
      background-color: #f8f8f9;
      border-radius: 4px;
    }
  }
</style>

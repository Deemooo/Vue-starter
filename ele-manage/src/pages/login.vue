<template>
    <div class="login-page">
      <div class="login-page-main">
        <div class="login-page-title">ele后台管理系统</div>
        <div class="login-page-form-wrap">
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="username">
              <Input type="text" v-model="formInline.username" placeholder="用户名">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formInline')">
                登陆
              </Button>
            </FormItem>
          </Form>
        </div>
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
              username: '',
              password: ''
            },
            ruleInline: {
              username: [
                { required: true, message: '用户名不能为空！', trigger: 'blur' },
                { validator: this.validateUser, trigger: 'blur' }
              ],
              password: [
                { required: true, message: '密码不能为空！', trigger: 'blur' },
                { validator: this.validatePassword, trigger: 'blur' }
              ]
            }
        };
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
              console.log('valid', valid);
                if (valid) {
                  let params = {
                    user_name: this.formInline.username,
                    password: this.formInline.password
                  };
                  this.https({url: '/admin/login', method: 'post', params}, (response) => {
                    if (response.status === 1) {
                      this.$Message.success(response.success);
                      this.$router.push('manage');
                    }
                  });
                } else {
                    this.$Message.error('请输入正确的用户名密码！');
                }
            })
        },
      keyBordLogin () {
        if (window.event.keyCode === 13) {
          this.handleSubmit('formInline');
        }
      }
    },
    mounted () {
      document.addEventListener('keydown', this.keyBordLogin, true);
    },
    watch: {}
};
</script>
<style lang="less" scoped>
  .login-page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #515a6e;
    .login-page-main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100%;
      margin: auto;
      margin-top: -50px;
      .login-page-title {
        width: 320px;
        padding: 20px;
        font-size: 25px;
        color: #f8f8f9;
        text-align: center;
      }
      .login-page-form-wrap {
        box-sizing: border-box;
        width: 320px;
        height: 210px;
        padding: 35px;
        background-color: #f8f8f9;
        border-radius: 4px;
        text-align: center;
      }
    }
  }
</style>

<template>
    <div class="login-page">
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
                  <Button type="primary" @click="handleSubmit('formInline')">登陆</Button>
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
              username: '',
              password: ''
            },
            ruleInline: {
              username: [
                { validator: this.validateUser, trigger: 'blur' }
              ],
              password: [
                { validator: this.validatePassword, trigger: 'blur' }
              ]
            }
        };
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('登录成功!');
                    this.$router.push('/manage');
                } else {
                    this.$Message.error('请输入正确的用户名密码!');
                }
            })
        }
    },
    mounted () {
      console.log(this.$data);
    },
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
      top: 28%;
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

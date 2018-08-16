// 表单验证方法
export default {
  data () {
    return {};
  },
  methods: {
    validateUser (rule, value, callback) {
      if (value === '') {
        callback(new Error('用户名不能为空！'));
      } else {
        /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/.test(value) ? callback() : callback(new Error('请输入正确的用户名！'));
      }
    },
    validatePassword (rule, value, callback) {
      if (value === '') {
        callback(new Error('密码不能为空！'));
      } else {
        /^[a-zA-Z0-9]\w{3,11}$/.test(value) ? callback() : callback(new Error('请输入正确的密码！'));
      }
    }
  }
};

// 表单验证方法
export default {
  data () {
    return {
      NOTNULL: false
    };
  },
  methods: {
    async validateUser (rule, value, callback) {
      this.NOTNULL = await this._nullTest(value, callback, '用户名');
      if (this.NOTNULL) {
        this._nameTest(value, callback, '用户名');
      }
    },
    async validatePassword (rule, value, callback) {
      this.NOTNULL = await this._nullTest(value, callback, '密码');
      if (this.NOTNULL) {
        this._passwordTest(value, callback, '密码');
      }
    },
    // 非空验证 val为需要验证的值
    _nullTest (val, callback, label) {
      let reg = /\S/;
      if (!reg.test(this.__Trim(val))) {
        this._erroTip(callback, `${label}不能为空！`);
        return false;
      } else {
        return true;
      }
    },
    // 名称验证
    _nameTest (val, callback, label) {
      let reg = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/;
      if (!reg.test(val)) {
        this._erroTip(callback, `请输入正确的${label}！`);
      } else {
        return callback();
      }
    },
    // 密码验证
    _passwordTest (val, callback, label) {
      let reg = /^[a-zA-Z0-9]\w{3,11}$/;
      if (!reg.test(val)) {
        this._erroTip(callback, `请输入正确的${label}！`);
      } else {
        return callback();
      }
    },
    // 错误提示
    _erroTip (callback, label) {
      return callback(new Error(label));
    },
    // 去除字符串两端空格
    __Trim (str) {
      if (this._typeCheck(str) === '[object String]') {
        return str.replace(/(^\s*)|(\s*$)/g, '');
      } else {
        return str;
      }
    }
  }
};

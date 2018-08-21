// 表单验证方法（只针对特殊的验证，长度、非空验证使用组件自带验证）
export default {
  methods: {
    validateUser (rule, value, callback) {
      this._nameTest(value) ? callback() : this._erroTip(callback, '用户名');
    },
    validatePassword (rule, value, callback) {
      this._passwordTest(value) ? callback() : this._erroTip(callback, '密码');
    },
    validateShopName (rule, value, callback) {
      this._nameTest(value) ? callback() : this._erroTip(callback, '店铺名称');
    },
    validatePhone (rule, value, callback) {
      (this._isTelephone(value) || this._isCellPhone(value)) ? callback() : this._erroTip(callback, '联系方式');
    },
    // 名称验证
    _nameTest (val) {
      let reg = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/;
      return val === '' || reg.test(val);
    },
    // 密码验证
    _passwordTest (val) {
      let reg = /^[a-zA-Z0-9]\w{3,11}$/;
      return val === '' || reg.test(val);
    },
    // 手机号码验证
    _isCellPhone (val) {
      let reg = /0?(13|14|15|16|17|18|19)[0-9]{9}/;
      return val === '' || reg.test(val);
    },
    // 电话号码验证
    _isTelephone (val) {
      let reg = /^[-0-9+()]{1,20}$/;
      return val === '' || reg.test(val);
    },
    // 错误提示
    _erroTip (callback, label) {
      return callback(new Error(`请填写正确的${label}！`));
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

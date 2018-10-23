// 表单验证方法
export default {
  methods: {
    validateUser (value) {
      this._nameTest(value);
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
    validateTime (rule, value, callback) {
      if (value) {
        this._dateCheck(this.formValidate.startTime, value) ? callback() : this._erroTip(callback, '结束时间');
      }
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
    /**
     * 时间校验
     * 用于判断结束时间大于开始时间，支持Date与字符串类型
     * starttime 开始时间
     * endtime 结束时间
     **/
    _dateCheck (starttime, endtime) {
      if (this._typeCheck(starttime) === this._typeCheck(endtime)) {
        return starttime < endtime;
      }
    },
    // 错误提示
    _erroTip (label) {
      return `请填写正确的${label}！`;
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

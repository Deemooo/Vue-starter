// 表单验证方法
export default {
  methods: {
    validateUser (value) {
      return this._nameTest(value);
    },
    validatePassword (value) {
      return this._passwordTest(value);
    },
    validateShopName (value) {
      return this._nameTest(value);
    },
    validatePhone (value) {
      return (this._isTelephone(value) || this._isCellPhone(value));
    },
    validateCellPhone (value) {
      return this._isCellPhone(value);
    },
    validateTime (value) {
      if (value) {
        return this._dateCheck(this.formValidate.startTime, value);
      }
    },
    isNull (val) {
      let reg = /\S/;
      return reg.test(this.__Trim(val));
    },
    // 名称验证
    _nameTest (val) {
      let reg = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
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
    erroTip (label) {
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

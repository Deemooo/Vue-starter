// 表单验证方法
import VALIDATEPUBLICFN from './validatePublicFn';
export default {
  methods: {
    // 定制验证
    validateUser (value) {
      return VALIDATEPUBLICFN._nameTest(value);
    },
    validatePassword (value) {
      return VALIDATEPUBLICFN._passwordTest(value);
    },
    validateShopName (value) {
      return VALIDATEPUBLICFN._nameTest(value);
    },
    validatePhone (value) {
      return (VALIDATEPUBLICFN._isTelephone(value) || VALIDATEPUBLICFN._isCellPhone(value));
    },
    validateCellPhone (value) {
      return VALIDATEPUBLICFN._isCellPhone(value);
    },
    validateTime (value) {
      if (value) {
        return VALIDATEPUBLICFN._dateCheck(VALIDATEPUBLICFN.formValidate.startTime, value);
      }
    },
    validateExchangeCode (value) {
      if (value) {
        return VALIDATEPUBLICFN._exchangeCode(value);
      }
    },
    validateCodeNumber (value) {
      if (value) {
        return VALIDATEPUBLICFN._codeNumber(value);
      }
    },
    validateCartPassword (value) {
      if (value) {
        return VALIDATEPUBLICFN._lengthTest(1, 6, value);
      }
    },
    validateCartNumber (value) {
      if (value) {
        return VALIDATEPUBLICFN._lengthTest(1, 10, value);
      }
    },
    // 非空验证
    isNull (val) {
      let reg = /\S/;
      return reg.test(VALIDATEPUBLICFN.__Trim(val));
    },
    // 错误提示
    erroTip (label) {
      return `请填写正确的${label}！`;
    }
  }
};

// 通用方法
export default {
  data () {
    return {};
  },
  methods: {
    // 对象转url所需字符串
    setStrOfUrl (data) {
      if (this._typeCheck(data) === '[object Object]') {
        let dataStr = '';
        Object.keys(data).forEach(key => {
          dataStr += key + '=' + data[key] + '&';
        });
        return dataStr.substr(0, dataStr.lastIndexOf('&'));
      }
    },
    // 类型检测
    _typeCheck (obj) {
      return Object.prototype.toString.call(obj);
    }
  }
};

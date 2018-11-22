// 通用方法
export default {
  data () {
    return {};
  },
  methods: {
    // 将数据写入sessionStorage
    setListData (key, data) {
      if (data && data.length !== 0) {
        sessionStorage.setItem(key, JSON.stringify(data));
      }
    },
    // 返回sessionStorage数据
    getListData (key) {
      return JSON.parse(sessionStorage.getItem(key)) || '';
    },
    // 删除某项数据
    removeListData (...arg) {
      if (arg && arg.length !== 0) {
        arg.forEach((item) => {
          sessionStorage.removeItem(item);
        });
      }
    },
    // 对象转url所需字符串
    setStrOfUrl (data) {
      if (this._typeCheck(data) === '[object Object]') {
        let dataStr = '';
        Object.keys(data).forEach(key => {
          dataStr += key + '=' + data[key] + '&';
        });
        return `?${dataStr.substr(0, dataStr.lastIndexOf('&'))}`;
      }
    },
    // 生成UUID
    generateUUID () {
      let d = new Date().getTime();
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    },
    /**
     * 时间对象格式话
     * formatStr 转换的时间格式 如：yyyy-mm-dd
     * date 要转换的时间对象
     **/
    dateFormat (formatStr, date) {
      let str = formatStr;
      let Week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

      str = str.replace(/yyyy|YYYY/, date.getFullYear());
      str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));

      str = str.replace(/MM/, date.getMonth() > 8 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
      str = str.replace(/M/g, date.getMonth());

      str = str.replace(/w|W/g, Week[date.getDay()]);

      str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
      str = str.replace(/d|D/g, date.getDate());

      str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
      str = str.replace(/h|H/g, date.getHours());
      str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
      str = str.replace(/m/g, date.getMinutes());

      str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
      str = str.replace(/s|S/g, date.getSeconds());

      return str;
    },
    //传递过来的图片地址需要处理后才能正常使用
    getImgPath (path) {
      let suffix;
      if (!path) {
        return '//elm.cangdu.org/img/default.jpg'
      }
      if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg'
      } else {
        suffix = '.png'
      }
      let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
      return 'https://fuss10.elemecdn.com' + url
    },
    // 类型检测
    _typeCheck (obj) {
      return Object.prototype.toString.call(obj);
    },
    /**
     * 获取style样式
     */
    getStyle (element, attr, NumberMode = 'int') {
      let target;
      // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
      if (attr === 'scrollTop') {
        target = element.scrollTop;
      } else if (element.currentStyle) {
        target = element.currentStyle[attr];
      } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
      }
      //在获取 opactiy 时需要获取小数 parseFloat
      return  NumberMode === 'float' ? parseFloat(target) : parseInt(target);
    }
  }
};

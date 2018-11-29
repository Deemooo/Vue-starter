// 项目通用方法
/**
 * 获取style样式
 */
const getStyle = (element, attr, NumberMode = 'int') => {
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
};
// 将数据写入sessionStorage
const setListData =  (key, data) => {
  if (data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};
// 返回sessionStorage数据
const getListData = (key) => {
  return JSON.parse(sessionStorage.getItem(key)) || '';
};
// 删除某项数据
const removeListData = (...arg) => {
  if (arg && arg.length !== 0) {
    arg.forEach((item) => {
      sessionStorage.removeItem(item);
    });
  }
};
export { getStyle, setListData, getListData, removeListData };

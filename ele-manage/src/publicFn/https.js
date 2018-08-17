'use strict';
export default {
  install (Vue) {
    const baseUrl = '//elm.cangdu.org';
    Vue.prototype.https = async (config, successCallBack) => {
      let url = baseUrl + config.url || '';
      let params = config.params || {};
      let requestConfig = {
        credentials: 'include',
        method: config.method || 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'force-cache'
      };
      if (config.method === 'post') {
        Object.defineProperty(requestConfig, 'body', {
          value: JSON.stringify(params)
        });
      }
      try {
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();
        successCallBack(responseJson);
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

// 请求方法
'use strict';
import { baseUrl } from '../../config/env';
export default {
  install (Vue) {
    Vue.prototype.https = async (config) => {
      let url = baseUrl + config.url || '';
      let params = config.params || {};
      let requestConfig = {
        credentials: 'include',
        method: config.method.toUpperCase() || 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'force-cache'
      };
      if (requestConfig.method === 'POST') {
        Object.defineProperty(requestConfig, 'body', {
          value: JSON.stringify(params)
        });
      }
      try {
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();
        return responseJson;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

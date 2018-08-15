export default {
  install (Vue) {
    const baseUrl = '//elm.cangdu.org';
    Vue.prototype.https = function (config, successCallBack) {
      let url = baseUrl + config.url || '';
      let params = config.params || {};
      let requestConfig = {
        credentials: 'include',
        method: config.method || 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
        mode: 'cors',
        cache: 'force-cache'
      };
      fetch(url, requestConfig)
        .then((response) => {
          if (response.ok) {
            successCallBack(response);
          } else {
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};

import axios from 'axios';
const {
  API_HOSTNAME,
} = process.env;


/**
 * 主要params参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
 */

export default class Server {

  axios(method, url, params) {
    return new Promise((resolve, reject) => {
      if (typeof params !== 'object') params = {};
      let _option = params;
      _option = {
        method,
        url,
        baseURL: API_HOSTNAME,
        timeout: 30000,
        params: null,
        data: params,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          //'accessToken': sessionStorage.accessToken || null
        },

        withCredentials: true, //是否携带cookies发起请求
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      };

      axios.request(_option).then(res => {
        if (sessionStorage.mobile && res.data.code === 900011 && sessionStorage.userToken && sessionStorage.userId) {
          Toast.info('登录失效啦，请尝试重新打开应用')
        }else if(res.data.code === 900011){
          //window.location.href =  '/login'
        }
        resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
      }, error => {
        if (error.response) {
          alert('网络有些不给力喔，请稍后再试');
          reject(error.response.data)
        } else {
          alert('网络有些不给力喔，请稍后再试');
          reject(error)
        }
      })

    })
  }
}

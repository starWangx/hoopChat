/**
 * name: 公共方法
 */

class Util {
  /**
   * [获取url参数https://a.com?a=1&b=2获取a,b的值]
   * @param  {[type]} name [参数名(a,b)]
   * @return {[type]}      [得到的值(1,2)]
   */
  getQueryString(name) {
    // 构造一个含有目标参数的正则表达式对象
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    // 匹配目标参数
    // let urls=window.location.search.substr(1);
    let urls = window.location.href.split('?')[1];
    if (urls) {
      let r = urls.match(reg);
      if (r != null) {
        return decodeURI(r[2]);
      }
    }
    return null;
  };

  /**
   * [description]
   * @param  {[type]} times  时间戳
   * @param  {[type]} format 时间格式，默认为[yyyy-MM-dd hh:mm:ss],注意大小写
   * @return {[type]} date      [description]
   */
  FormatDate(times, format = 'yyyy-MM-dd hh:mm:ss') {
    let date = {
      'M+': times.getMonth() + 1,
      'd+': times.getDate(),
      'h+': times.getHours(),
      'm+': times.getMinutes(),
      's+': times.getSeconds(),
      'q+': Math.floor((times.getMonth() + 3) / 3),
      'S+': times.getMilliseconds(),
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (times.getFullYear() + '')
        .substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1
          ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
      }
    }
    return format;
  };

  detect() {
    var equipmentType = "";
    var agent = navigator.userAgent.toLowerCase();
    var android = agent.indexOf("android");
    var iphone = agent.indexOf("iphone");
    var ipad = agent.indexOf("ipad");
    if (android != -1) {
      equipmentType = "android";
    }
    if (iphone != -1 || ipad != -1) {
      equipmentType = "ios";
    }
    return equipmentType;
  };

  getQueryJson(name) {
    let getQueryString = (name) => {
      // 构造一个含有目标参数的正则表达式对象
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      // 匹配目标参数
      // let urls=window.location.search.substr(1);
      let urls = window.location.href.split('?')[1];
      if (urls) {
        let r = urls.match(reg);
        if (r != null) {
          return decodeURI(r[2]);
        }
      }
      return null;
    };
    console.log(this);
    try {
      return JSON.parse(getQueryString(name))
    } catch (e) {
      console.log(e);
      return false
    }
  };

}

let util = new Util();
export default util


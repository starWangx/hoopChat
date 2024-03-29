/**
 * 验证的正则表达式
 */
export default {
  // 手机号
  mobile: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
  //车牌号
  carNo:/([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/,
  //座位数
  seatCount: /^([4-9]{1}|[1-9][0-9]{1}|100)$/ ,
  //身份证
  IDnumber: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 不能输入汉字
  passwordM: /^[^\u4e00-\u9fa5]{0,}$/
}
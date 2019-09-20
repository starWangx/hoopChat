/**
 * Created by vincent on 2018/8/7.
 */
/**
 * 调用接口路径配置文件，所有的调用接口路径统一在这配置
 */
const {
  API_HOSTNAME,
} = process.env;
console.log(API_HOSTNAME);
export default{
  //线路
  testapi: `${API_HOSTNAME}/api/lineClient/lineRecommendQuery`,  // 线路推荐列表
}
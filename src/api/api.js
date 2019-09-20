/**
 * Created by vincent on 2018/8/7.
 */
import Server from './server';
import Url from './url';

class API extends Server {
  async testapi(params = {}){
    try {
      let result = await this.axios('post',Url.testapi, params);
      if (result) {
        return result;
      } else {
        throw '失败';
      }
    } catch (err) {
      throw err;
    }
  };
}




export default new API();
/*action*/
export const INCREMENT = "counter/INCREMENT";
export const ERROR = "ERROR";
export const DECREMENT = "counter/DECREMENT";
export const RESET = "counter/RESET";
import API from '@/api/api'

/**
 * 异步请求，访问api
 * @returns {Function}
 */
export function increment(params) {
  return async dispatch => {
    try{
      let result = await API.Increment(params);
      dispatch({
        type: INCREMENT,
        data: result,
      })
    }catch(err){
      dispatch({
        type: ERROR,
        errMsg: '网络不给力哦，请稍后再试',
      })
      console.error(err);
    }
  }
}

export function decrement() {
  return {type: DECREMENT}
}

export function reset() {
  return {type: RESET}
}
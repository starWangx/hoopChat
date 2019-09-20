import {combineReducers} from "redux";

import counter from 'reducers/counter';

const app = (state= {
  appid: '2016091201894051',

}, action) => {
  return state
};




export default combineReducers({
  counter,
});
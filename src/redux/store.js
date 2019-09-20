import {createStore, applyMiddleware} from 'redux';
import combineReducers from './reducers.js';

// import promiseMiddleware from './middleware/promiseMiddleware'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
let store;
if (process.env.NODE_ENV === 'development') {
  // 如果是开发环境，则打印logger
  store = createStore(combineReducers, applyMiddleware(thunk,logger));
}else{
  store = createStore(combineReducers, applyMiddleware(thunk));
}


if (module.hot) {
  module.hot.accept("./reducers", () => {
    const nextCombineReducers = require("./reducers").default;
    store.replaceReducer(nextCombineReducers);
  });
}

export default store;
import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';
import {BrowserRouter as Router} from 'react-router-dom';
import App from 'components/App/App';
import './style/base.less';
import './utils/setRem';

import API from '@/api/api.js';

// if (process.env.NODE_ENV === 'development') {
//   // 如果是开发环境，则展示绿色皮肤。这里只是提供一个思路，不一定要用process.env来区分风格
//   import('./style/theme.less');
// }
// import '../mock/mockData'

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('components/App/App', () => {
      const NextApp = require('components/App/App').default;
      renderWithHotReload(NextApp);
    });
  }
}


AMap.plugin('AMap.Geolocation', function() {
  var geolocation = new AMap.Geolocation({
    enableHighAccuracy: true,//是否使用高精度定位，默认:true
    timeout: 10000,          //超过10秒后停止定位，默认：5s
    buttonPosition:'RB',    //定位按钮的停靠位置
    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

  });
  geolocation.getCurrentPosition(function(status,result){
    if(status=='complete'){
      sessionStorage.lng = result.position.lng;
      sessionStorage.lat = result.position.lat;
      renderWithHotReload(App);

    }else{
      onError(result)
    }
  });
});


function onError (data) {
  // 定位出错
  renderWithHotReload(App);
}


function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <RootElement/>
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

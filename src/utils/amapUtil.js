/**
 * Created by vincent on 2018/8/2.
 */
let mapUtil = {};
mapUtil.autoComplete = (keyword, opts = {city: '全国'}) => {
  return new Promise((res, rej) => {
    AMap.plugin('AMap.Autocomplete', function () {
      let opts = {};
      if(sessionStorage.appKey==='CTZH0001'){
        opts.city= '珠海'
      }else{
        opts.city= '杭州'
      }
      var autoComplete = new AMap.Autocomplete(opts);
      autoComplete.search(keyword, function (status, result) {
        // 搜索成功时，result即是对应的匹配数据
        if (result.tips && result.tips.length > 0) {
          let _tips = [];
          result.tips.forEach((each, index) => {
            if (each.id) {
              _tips.push(each)
            }
          })
          result.tips = _tips
        }
        res({status, result})
      })
    });
  })
};
mapUtil.geolocation = () => {
  return new Promise((res, rej) => {
    AMap.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      })

      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete)
      AMap.event.addListener(geolocation, 'error', onError)

      function onComplete(data) {
        // data是具体的定位信息
        sessionStorage.position = JSON.stringify(data);
        res(data)
      }

      function onError(data) {
        // 定位出错
        rej(data)
      }
    })
  })
};

mapUtil.Driving = (positionArr, map) => {
  console.log(111);

  function bouncer(arr) {
    // Don't show a false ID to this bouncer.
    return arr.filter(function(val){
      return !(!val || val === "");
    });
  }
  return new Promise((res, rej) => {
    AMap.plugin(['AMap.Driving'],function() {
      console.log(AMap);
      let waypoints = positionArr.map((each, index) => {
        console.log(each);
        if (index !== 0 && index !== positionArr.length - 1) {
          return new AMap.LngLat(each[0], each[1])
        } else {
          return null
        }
      }) || [];
      waypoints = bouncer(waypoints);
      console.log(waypoints);
      var driving = new AMap.Driving({
        policy: 'AMap.DrivingPolicy.LEAST_FEE',
        showTraffic: false,
        autoFitView: true,
        //map
      });
      console.log(waypoints);
      driving.search(
        new AMap.LngLat(positionArr[0][0], positionArr[0][1]),
        new AMap.LngLat(positionArr[positionArr.length - 1][0], positionArr[positionArr.length - 1][1]),
        {
          waypoints
        }, (status, result) => {
          let path = [];
          result.routes[0].steps.forEach((step) => {
            const stepPath = step.path.map((path) => {
              return [path.getLng(), path.getLat()];
            });

            path = path.concat(stepPath);
          });
          let mileage = window._amap.GeometryUtil.distanceOfLine(path);
          console.log(mileage);
          res({path,mileage});
        },)
    })
  })
}

export default mapUtil;
import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Map, Marker, InfoWindow} from 'react-amap';
import './index.less';
import closeimg from './icon/close.svg'
import mock from './mock'
import Geolocation from 'react-amap-plugin-geolocation';
import api from '../../api/api'

let mapInstance = null;
const pluginProps = {
  enableHighAccuracy:true,
  timeout: 10000,
  showButton: true
}



class Components extends Component {
  state = {
    players: [],
    infoWindowLng: '',
    infoWindowLat: '',
    closeWindow:true,
    infoData: null,

    mapConfig: {
      amapkey: '948487a53c1f87b5fbfc8efedf7febda',
      zoom: 16,
      viewMode: "3D",
      version: '1.4.15',
      center: [sessionStorage.lng || '121.471337', sessionStorage.lat || '31.27376'],
      plugins: [
        'Scale',
        'ControlBar', // v1.1.0 新增
        // {
        //   name: 'ToolBar',
        //   options: {
        //     visible: true,  // 不设置该属性默认就是 true
        //     onCreated(ins) {
        //       console.log(ins);
        //     },
        //   },
        // }
      ]
    }
  };

  constructor(props) {
    super(props);
    this.setView = false;
    this.mapEvents = {
      created: (map) => {
        console.log('map创建啦！');
        map.plugin('AMap.Geolocation', function () {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            buttonOffset: new AMap.Pixel(10, 20),
            zoomToAccuracy: true,
            buttonPosition: 'RB'
          });
          geolocation.getCurrentPosition();

          AMap.event.addListener(geolocation, 'complete', onComplete);
          AMap.event.addListener(geolocation, 'error', onError);

          mapInstance = map;

          function onComplete(data) {
            sessionStorage.lng = data.position.lng;
            sessionStorage.lat = data.position.lat;
            // data是具体的定位信息
          }

          function onError(data) {
            // 定位出错
          }
        })

      },
    };

    this.markerEvents = {
      click: (e) => {
       let targetData =  e.target.B.extData;
        console.log(targetData);

        this.setState({
          infoWindowLng:  targetData.lng,
          infoWindowLat:  targetData.lat,
          closeWindow:false,
          infoData:targetData
        });

      }
    }

  }


  componentDidMount() {
    // 获得api数据，这里是mock
    // api.testapi({data:'123'}).then(data=>{
    //   console.log(data);
    // })
    setTimeout(() => {
      this.setState({
        players: mock.data.players
      });
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {
    const {
      mapConfig,
      players,
      infoWindowLng,
      infoWindowLat,
      infoData,
      closeWindow
    } = this.state;


    const addMakers = (players) => {
      if (mapInstance && !this.setView) {
        setTimeout(() => {
          this.setView = true;
          mapInstance.setFitView(mapInstance.getAllOverlays('marker'))
        }, 500);
      }

      return players.map((player) => (
        <Marker
          events={this.markerEvents}
          key={player.id}
          extData={player}
          clickable
          offset={[-28,-10]}
          position={[player.lng, player.lat]}
          render={
            <div className='head-border'>
              <img src={player.headImg||'https://w1.hoopchina.com.cn/images/lrw/manage/userHead.png'} alt="" className='userHead'/>
            </div>
          }
        />
      ))
    };

    return <div className="container">
      <Map
        events={this.mapEvents}
        {...mapConfig}
      >
        <Geolocation {...pluginProps} />
      {/*
        本来想用来展示自己的位置，先用默认的
       <Marker
          position={[sessionStorage.lng, sessionStorage.lat]}
          render={
            <div className='head-border'>
              <img src={'https://w1.hoopchina.com.cn/images/lrw/manage/userHead.png'} alt="" className='userHead'/>
            </div>
          }
        />*/
      }

        {players.length > 0 && addMakers(players)}

        <InfoWindow
          position={[infoWindowLng, infoWindowLat]}
          visible={!closeWindow}
          isCustom={true}
        >
          <div className='info-window'>
            {
              [
                <div key='close' className={'close'} onClick={() => this.setState({closeWindow:true})}>
                  <img src={closeimg} alt=""/>
                </div>,

                infoData && <div key={'info-container'}>
                  <div className='head-border'>
                    <img src={infoData.headImg||'https://w1.hoopchina.com.cn/images/lrw/manage/userHead.png'} alt="" className='userHead'/>
                  </div>
                  <div className='btext'>{infoData.name}</div>
                  <div className='tag'>{infoData.tagNames.join()}</div>
                  <div className='text'>声望 7374723 等级 lv.80</div>
                  <div className='text'>24小时带上分</div>
                  <div className='sendBtn'>打招呼(5个虎扑币)</div>
                </div>
              ]
            }
          </div>
        </InfoWindow>
      </Map>
    </div>
  }
}

export default hot(module)(Components);

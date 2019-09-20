import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import PropTypes from "prop-types";
import { TabBar } from 'antd-mobile';
import Map from '../map'
import './index.less'

class Home extends Component {
  state = {
    counter: 0
  };
  static contextTypes = {
    router: PropTypes.object
  };


  render() {
    return <div className='home'>

      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
        tabBarPosition="bottom"
      >
        <TabBar.Item
          title="身边"
          key="near"
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
          }}
          />
          }
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
          }}
          />
          }
          selected={this.state.selectedTab === 'near'}
          badge={1}
          onPress={() => {
            this.setState({
              selectedTab: 'near',
            });
          }}
        >
          {<Map/>}
        </TabBar.Item>

        <TabBar.Item
          title="消息"
          key="message"
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
          }}
          />
          }
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
          }}
          />
          }
          selected={this.state.selectedTab === 'message'}
          badge={'new'}
          onPress={() => {
            this.setState({
              selectedTab: 'message',
            });
          }}
        >
          <div className='tabPage'>
            123
          </div>
        </TabBar.Item>

        <TabBar.Item
          title="我的"
          key="mine"
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
          }}
          />
          }
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
          }}
          />
          }
          selected={this.state.selectedTab === 'mine'}
          onPress={() => {
            this.setState({
              selectedTab: 'mine',
            });
          }}
        >
          <div className='tabPage'>
            123
          </div>
        </TabBar.Item>


      </TabBar>
    </div>
  }
}

export default hot(module)(Home);

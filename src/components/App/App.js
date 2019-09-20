import React, {Component} from 'react';
import getRouter from 'router/router';


export default class App extends Component {
    render() {
        return (
            <div style={{height:'100%'}}>
              {getRouter()}
            </div>
        )
    }
}
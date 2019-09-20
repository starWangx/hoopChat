import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Bundle from './Bundle';
import Loading from 'components/Loading/Loading';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Map from 'bundle-loader?lazy&name=map!pages/map/index';

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);
export default () => (
    <div style={{height:'100%'}}>
        <Switch>
            <Route exact path="/" component={createComponent(Home)}/>
            <Route exact path="/Map" component={createComponent(Map)}/>
        </Switch>
    </div>
);

import React, {Fragment} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

import RequestsElement from './Requests/index';
import ServicesElement from './Services/index';

const Dashboard = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.path}/requests`} component={RequestsElement}/>
                    <Route path={`${match.path}/services`} component={ServicesElement}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Dashboard;
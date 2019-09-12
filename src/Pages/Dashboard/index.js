import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

const Dashboard = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <h1>HOLA MUNDO</h1>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Dashboard;
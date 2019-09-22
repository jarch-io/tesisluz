import React, {Fragment} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import Header from '../../Layout/Customer/Header';

import ViewTicket from './Search/ViewTicket';
import SearchTicket from './Search/SearchTicket';

const Customer = ({match}) => (
    <Fragment>
        <Header />
        <div className="app-main">
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.path}search`} component={SearchTicket}/>
                    <Route path={`${match.path}search/:id`} component={ViewTicket}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Customer;
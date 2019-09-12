import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Forms

import LoginElement from "../Elements/Login/";

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

const Forms = ({match}) => (
    <Fragment>
        {/* Form Elements */}

        <Route path={`${match.url}/`} component={LoginElement}/>
    </Fragment>
);

export default Forms;
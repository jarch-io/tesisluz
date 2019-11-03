import React, {Fragment} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import OverviewElement from './Overview';

const ReportsElement = ({match}) => (
    <Route path={`${match.path}/services/general`} component={OverviewElement} />
);

export default ReportsElement;
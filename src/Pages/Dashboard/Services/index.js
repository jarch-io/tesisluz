import React, {Fragment} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import ListElement from './List';

const ServicesElement = ({match}) => (
    <Route path={`${match.path}/list`} component={ListElement} />
);

export default ServicesElement;
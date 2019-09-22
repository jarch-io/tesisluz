import React, {Fragment} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import ListElement from './MyRequests';
import RequestElement from './MyRequest';

const ServicesElement = ({match}) => (
	<Fragment>
		<Route path={`${match.path}/list`} component={ListElement} />
		<Route path={`${match.path}/:id/view`} component={RequestElement} />
   </Fragment>
);

export default ServicesElement;
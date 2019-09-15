import React, {Fragment} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

// Forms

import LoginElement from "../Elements/Login/";

const FormsLogin = () => (
	<Router>
   		<Route exact path="/login" component={LoginElement} />
   	</Router>
);

export default FormsLogin;
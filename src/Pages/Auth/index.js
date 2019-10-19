import React, {Fragment} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

// Forms

import LoginElement from "../Elements/Login";

const FormsLogin = ({match}) => (
   	<Route exact path={`${match.path}`} component={LoginElement} />
);

export default FormsLogin;
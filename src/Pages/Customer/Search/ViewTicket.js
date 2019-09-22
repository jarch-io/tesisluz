import React, {Fragment} from 'react';
import classnames from 'classnames';

import MyRequest from '../../Elements/Requests/MyRequest';

const RequestElement = ({match}) => (
	<MyRequest role="customer" />
);

export default RequestElement;
import React, {Fragment} from 'react';
import { withRouter } from 'react-router-dom';

import {Table, Media, Button}  from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Paginator from '../Commons/Paginator';

library.add(faEye);

class MyRequests extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			requests : []
		};
	}

	componentDidMount() {
		const requestsList = [
			{
				id : 1,
				customer : {
					id : 25,
					firstName : "José",
					lastName : "Ramos",
					avatar : "https://icon-library.net/images/person-image-icon/person-image-icon-7.jpg"
				},
				status : true
			}
		];

		this.setState({
			requests : requestsList
		});
	}

	viewRequest(id) {
		this.props.history.push('./' + id + '/view');
	}

	renderItem(request) {
		return (
			<tr>
				<td>
					<div>
						<img width={42} className="rounded-circle" src={request.customer.avatar} alt=""/>
						&nbsp;{request.customer.firstName + ' ' + request.customer.lastName}
					</div>
				</td>
				<td>
					<div>
						<ul>
							<li>Hola</li>
						</ul>
					</div>
				</td>
				<td><div className={['badge', request.status ? 'badge-success' : 'badge-danger'].join(' ')}>{request.status ? 'Activo' : 'Inactivo'}</div></td>
				<td><div>
					<Button outline color="primary" size="sm" onClick={this.viewRequest.bind(this, request.id)}><FontAwesomeIcon icon={faEye} /></Button>
				</div></td>
			</tr>
		);
	}

	render() {
		return (
			<Fragment>
				<Table dark>
			    	<thead>
			    		<tr>
			    			<th colspan="2">Customer</th>
			    			<th>Status</th>
			    			<th>Actions</th>
			    		</tr>
			    	</thead>
			    	<tbody>
			    		{
			    			this.state.requests.map((request, key) => this.renderItem(request))
			    		}
			    	</tbody>
			    </Table>
			    <Paginator />
			</Fragment>
			);
	}
}

export default withRouter(MyRequests);
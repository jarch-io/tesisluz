import React, {Fragment} from 'react';
import { withRouter } from 'react-router-dom';

import {find as requestFind} from '../../../Secure/Request';

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
		requestFind({
			filter : {
				adviser : '_ME_',
				isClosed : false
			}
		})
		.then(requests => {
			this.setState({
				requests : requests
			});
		})
		.catch(err => {
			alert('Ocurrio un error al obtener tu lista de solicitudes.');
		});
	}

	viewRequest(id) {
		this.props.history.push(`./${id}/view`);
	}

	renderItem(request) {
		const {customer} = request;

		return (
			<tr>
				<td>
					<div>
						<img width={42} className="rounded-circle" src={customer.avatar || ''} alt=""/>
						&nbsp;{customer.type == 'person' ? customer.firstName + ' ' + customer.lastName : customer.name || customer.brandName}
					</div>
				</td>
				<td>
					<div>
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
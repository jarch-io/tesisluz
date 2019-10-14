import React, {Fragment} from 'react';
import { withRouter } from 'react-router-dom';

import {find as requestFind, assign as requestAssign} from '../../../Secure/Request';

import {Table, Media, Button}  from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class RequestListUnsigned extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			requests : []
		};
	}

	componentDidMount() {
		requestFind({
			filter : {
				adviser : '_NULL_',
				isClosed : false
			}
		})
		.then(requests => {
			this.setState({
				requests : requests
			});
		})
		.catch(err => {
			alert('Error, no se pudieron cargar la lista de peticiones sin asignar.');
		});
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
	}

	selfAssingRequest(id) {
		requestAssign(id, {
			id : '_ME_'
		})
			.then(request => {
				this.props.history.push(`./${id}/view`);
			})
			.catch(err => {
				alert('No se pudo tomar la solicitud.');
			});
	}

	renderItem(request) {
		const {customer} = request;

		return (
			<tr>
				<td>
					<div>
						<img width={42} className="rounded-circle" src={request.customer.avatar} alt=""/>
						{' '}{customer.type == 'person' ? request.customer.firstName + ' ' + request.customer.lastName : (request.customer.name || request.customer.brandName)}
					</div>
				</td>
				<td>
					<div>
					</div>
				</td>
				<td><div className={['badge', request.status ? 'badge-success' : 'badge-danger'].join(' ')}>{request.status ? 'Activo' : 'Inactivo'}</div></td>
				<td><div>
					<Button outline color="primary" size="sm" onClick={this.selfAssingRequest.bind(this, request.id)}>Tomar</Button>
				</div></td>
			</tr>
		);
	}

	render() {
		const {requests} = this.state;

		return (
			<Fragment>
				{
					requests.length > 0 ? <Table dark>
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
				    </Table> : <p>No hay solicitudes.</p>
				}
			</Fragment>
			);
	}
}

export default withRouter(RequestListUnsigned);
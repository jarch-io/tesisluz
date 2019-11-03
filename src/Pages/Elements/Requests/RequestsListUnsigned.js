import React, {Fragment} from 'react';
import { withRouter } from 'react-router-dom';

import {find as requestFind, assign as requestAssign} from '../../../Secure/Request';
import {find as employeeFind} from '../../../Secure/Employee';

import {Table, Media, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, ListGroup, ListGroupItem}  from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class RequestListUnsigned extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			requests : [],
			modal : false,
			currentRequest : null,
			employeesList : []
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
	}

	assingRequest(idUser) {
		const {currentRequest} = this.state;

		requestAssign(currentRequest, {
			id : idUser
		})
			.then(request => {
				alert("Se asigno correctamente el asesor.");
				this.setState({
					currentRequest : undefined,
					modal : false
				});
			})
			.catch(err => {
				alert('No se pudo tomar la solicitud.');
			});
	}

	toggle() {
		this.setState({
			modal : !this.state.modal
		});
	}

	openModal(id) {
		this.setState({
			currentRequest : id,
			modal : true
		});
	}

	searchEmployee(evt) {
		const {value} = evt.target;

		if(value.length < 3) return;

		employeeFind({
			search : value
		})
			.then(employees => {
					this.setState({
						employeesList : employees
					});
				}).catch(err => {
					alert("No se puede buscar a los asesores");
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
					<Button outline color="primary" size="sm" onClick={this.openModal.bind(this, request.id)}>Asignar</Button>
				</div></td>
			</tr>
		);
	}

	render() {
		const {requests} = this.state;

		if(!requests) return "No hay solicitudes pendientes.";

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
				{
					this.state.modal ? <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
				        <ModalHeader toggle={this.toggle.bind(this)}>Gracias por su solicitud!</ModalHeader>
				        <ModalBody>
				        	<div>
				        		<Input name="search" placeholder="Nombre del empleado" onChange={this.searchEmployee.bind(this)}/>
				        		<br/>
				        		<ListGroup>
				        			{
				        				this.state.employeesList.length == 0 ? '' : this.state.employeesList.map((employee) => {
							        		return <ListGroupItem><Button onClick={this.assingRequest.bind(this, employee.id_employee)}>Asignar</Button> {employee.firstname} {employee.lastname}</ListGroupItem>
				        				})
				        			}
							    </ListGroup>
				        	</div>
				        </ModalBody>
				        <ModalFooter>
				          <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
				        </ModalFooter>
  					</Modal> : ''
				}
			</Fragment>
			);
	}
}

export default withRouter(RequestListUnsigned);
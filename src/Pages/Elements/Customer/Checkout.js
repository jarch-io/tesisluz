import React, {Fragment} from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {fetchCart as fetchCartAction, clearCart as clearCartAction} from '../../../Fetchs/Cart';
import {getCart, getCartError, getCartPending, clearCart} from '../../../reducers/Cart';

import {create as requestCreate} from '../../../Services/Request';

import {Row, Col, Form, FormGroup, Label, Input, Button, Nav, NavItem, NavLink, Card, CardHeader, CardBody, cardFooter, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class Checkout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isCompany : false,
			modal : false
		};
	}

	listServices() {
		this.props.history.push('/');
	}

	redirectRequest() {
		this.props.history.push(`search/${this.state.request.id}`);
	}

	handleChangeInputBool(evt) {
		const {name}  = evt.target;

		this.setState({
			[name] : !this.state[name]
		});
	}

	handleChangeInput(evt) {
		const {name, value}  = evt.target;

		this.setState({
			[name] : value
		});
	}

	createRequest() {
		const {cart} = this.props;

		requestCreate({
			customer : {
				isCompany : this.state.isCompany,
				firstname : this.state.firstname,
				lastname : this.state.lastname,
				email : this.state.email,
				documentType : this.state.documentType,
				document : this.state.document,
				phone: this.state.phone,
				telephone : this.state.telephone,
				street : this.state.street,
				name : this.state.name,
				ruc : this.state.ruc,
				brandName : this.state.brandName
			},
			additionals : {
				acceptTerms : this.state.acceptTerms ? 1 : 0,
				sendPassword : this.state.sendPassword ? 1 : 0,
				emailChannel : this.state.emailChannel ? 1 : 0,
				phoneChannel : this.state.phoneChannel ? 1 : 0,
				comment : this.state.comment
			},
			quote : cart
		})
		.then(request => {
			const {clearCart} = this.props;

			clearCart();

			this.setState({
				request : request
			});

			this.toggle();
		})
		.catch(err => {
			alert("ocurrio un error :(");
		});
	}

	toggle() {
		this.setState({
			modal : !this.state.modal
		});
	}

	render() {
		const {cart} = this.props;

		if(!cart) {
			return (
				<Fragment>
					<div className="text-center">
						Aún no tiene items en su carrito. Por favor agréguelos.<br/>
						<Button color="dark" onClick={this.listServices.bind(this)}>
							Ver listado de servicios
						</Button>
					</div>
					{
						this.state.modal ? <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
					        <ModalHeader toggle={this.toggle.bind(this)}>Gracias por su solicitud!</ModalHeader>
					        <ModalBody>
					        	La solicitud fue creada con éxito, el número de ticket es {this.state.request.code}.<br/>
					        	{this.state.request.password != '' ? ('Se genero la siguiente clave' + <b>{this.state.request.password}</b>) : ''}
					        </ModalBody>
					        <ModalFooter>
					          <Button color="primary" onClick={this.listServices.bind(this)}>Ver listado de servicios</Button>{' '}
					          <Button color="success" onClick={this.redirectRequest.bind(this)}>Ver solicitud</Button>{' '}
					          <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
					        </ModalFooter>
      					</Modal> : ''
					}
				</Fragment>
				);
		}

		let total = 0;

        if(cart) {
            cart.items.map((service) => {
                total += service.price * service.quantity
            });
        }

        const {isCompany} = this.state;

		return (<Fragment>
					<Row>
						<Col sm="7">
							<Card>
								<CardHeader tag="h3">
									<Col md={6}>
										Complete sus datos
									</Col>
									<Col md={6} className="text-right">
										<FormGroup>
											<CustomInput type="switch" id="iscompany" name="isCompany" inline label="SOy Empresa" onChange={this.handleChangeInputBool.bind(this)} />
										</FormGroup>
									</Col>
								</CardHeader>
								<CardBody>
									<Form>
										{isCompany ? <Fragment>
												<Row form>
													<Col md={12}>
														<FormGroup>
												        	<Label for="namecompany">Razón Social</Label>
												        	<Input onChange={this.handleChangeInput.bind(this)} type="text" name="name" id="namecompany" bsSize='sm' />
												        </FormGroup>
													</Col>
												</Row>
												<Row form>
													<Col md={6}>
														<FormGroup>
												        	<Label for="ruc">RUC</Label>
												        	<Input onChange={this.handleChangeInput.bind(this)} type="text" name="ruc" id="ruc" bsSize='sm' />
												        </FormGroup>
													</Col>
													<Col md={6}>
														<FormGroup>
												        	<Label for="brandname">Nombre comercial</Label>
												        	<Input onChange={this.handleChangeInput.bind(this)} type="text" name="brandName" id="brandname" bsSize='sm' />
												        </FormGroup>
													</Col>
												</Row>
											</Fragment> : <Fragment>
												<Row form>
													<Col md={6}>
														<FormGroup>
												        	<Label for="firstname">Nombres</Label>
												        	<Input onChange={this.handleChangeInput.bind(this)} type="text" name="firstname" id="firstname" bsSize='sm' />
												        </FormGroup>
													</Col>
													<Col md={6}>
														<FormGroup>
												        	<Label for="lastname">Apellidos</Label>
												        	<Input onChange={this.handleChangeInput.bind(this)} type="text" name="lastname" id="lastname" bsSize='sm' />
												        </FormGroup>
													</Col>
												</Row>
												<Row form>
													<Col md={6}>
														<FormGroup>
												        	<Label for="documentType">Tipo de documento</Label>
												        	<CustomInput onChange={this.handleChangeInput.bind(this)} type="select" id="documentType" name="documentType " bsSize='sm'>
												        		<option value="dni">DNI</option>
												        		<option value="pas">Pasaporte</option>
												        		<option value="ce">Carnét Extranjeria</option>
												        	</CustomInput>
												        </FormGroup>
													</Col>
													<Col md={6}>
														<FormGroup>
												        	<Label for="document">Número de documento</Label>
												        	<Input onChange={this.handleChangeInput.bind(this)} type="text" name="document" id="document" bsSize='sm' />
												        </FormGroup>
													</Col>
												</Row>
											</Fragment>}
										<Row form>
											<Col md={3}>
												<FormGroup>
										        	<Label for="telephone">Teléfono</Label>
										        	<Input onChange={this.handleChangeInput.bind(this)} type="text" name="telephone" id="telephone" bsSize='sm' />
										        </FormGroup>
											</Col>
											<Col md={3}>
												<FormGroup>
										        	<Label for="phone">Celular</Label>
										        	<Input onChange={this.handleChangeInput.bind(this)} type="text" name="phone" id="phone" bsSize='sm' />
										        </FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup>
										        	<Label for="email">Correo Electronico</Label>
										        	<Input onChange={this.handleChangeInput.bind(this)} type="email" name="email" id="email" bsSize='sm' />
										        </FormGroup>
											</Col>
										</Row>
										<Row form>
											<Col md={12}>
												<FormGroup>
										        	<Label for="street">Dirección</Label>
										        	<Input onChange={this.handleChangeInput.bind(this)} type="text" name="street" id="street" bsSize='sm' />
										        </FormGroup>
											</Col>
										</Row>
										<Row form>
											<Col md={12}>
												<FormGroup>
										        	<Label for="comment">Comentario</Label>
										        	<Input onChange={this.handleChangeInput.bind(this)} type="textarea" name="comment" id="comment" bsSize='sm' />
										        </FormGroup>
											</Col>
										</Row>
										<Row form>
											<Col md={12}>
												<FormGroup>
										        	<CustomInput type="switch" name="acceptTerms" id="acceptterms" bsSize='sm' label="Acepto los términos y condiciones." onChange={this.handleChangeInputBool.bind(this)} checked={this.state.acceptTerms}/>
										        	{
										        		this.state.email ? <CustomInput type="switch" name="emailChannel" id="emailchannel" bsSize='sm' label="Usar correo eléctronico como medio de comunicación." onChange={this.handleChangeInputBool.bind(this)} checked={this.state.emailChannel}/> : ''
										        	}
										        	{
										        		this.state.phone ? <CustomInput type="switch" name="phoneChannel" id="phonechannel" bsSize='sm' label="Usar celular como medio de comunicación." onChange={this.handleChangeInputBool.bind(this)} checked={this.state.phoneChannel}/> : ''
										        	}
										        	{
										        		this.state.phoneChannel || this.state.emailChannel ? <CustomInput type="switch" name="sendPassword" id="sendpassword" bsSize='sm' label="Enviar contraseña para hacer seguimiento de mas de una solicitud." onChange={this.handleChangeInputBool.bind(this)} checked={this.state.sendPassword}/> : ''
										        	}
										        </FormGroup>
											</Col>
										</Row>
									</Form>
								</CardBody>
							</Card>
						</Col>
						<Col sm="5">
							<Card>
								<CardHeader tag="h3">
									Detalle de la solicitud
								</CardHeader>
								<CardBody>
                                    <Button block color="success" onClick={this.listServices.bind(this)}>
                                        Continuar agregando
                                    </Button>
                                    <Button block color="dark" disabled={!this.state.acceptTerms} onClick={this.createRequest.bind(this)}>
                                        Solicitar Ahora S/ {total.toFixed(2)}
                                    </Button>
									<Nav vertical>
		                                {
		                                    cart.items.map((service, idx) => {
		                                        return (
		                                            <NavItem>
		                                                <NavLink>
		                                                    <img width={100} className="" src={service.image}/>
		                                                    {service.title}
		                                                    <div className="ml-auto badge badge-pill badge-info">S/ {service.price.toFixed(2)}</div>
		                                                </NavLink>
		                                            </NavItem>
		                                            );
		                                    })
		                                }
		                            </Nav>
								</CardBody>
                            </Card>
						</Col>
					</Row>
				</Fragment>);
	}
}

const mapStateToProps = state => ({
    error : getCartError(state),
    cart : getCart(state),
    pending : getCartPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    clearCart : clearCartAction
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout));
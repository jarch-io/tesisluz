import React, {Fragment} from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {injector} from 'react-services-injector';

import {Row, Col, Form, FormGroup, Label, Button, Card, CardBody, CardTitle, CardText, CardLink, CardImg, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, TabContent, TabPane, Nav, NavItem, NavLink, CardHeader, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';

import {list as serviceList} from '../../../Services/Service';
import {register as registerTracker} from '../../../Services/Tracker';

import {addToCart as addCartAction} from '../../../Fetchs/Cart';
import {getCart, getCartError, getCartPending} from '../../../reducers/Cart';

class ListServices extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			services : [],
			selected : undefined,
			messageError : "",
			modal : false,
			toggle : false,
			tabActive : 2
		};
	}

	componentDidMount() {
		serviceList()
			.then(services => {
				if(services == undefined) {
					this.setState({
						messageError :  "No se pudieron cargar los servicios. Intente nuevamente."
					});
					return;
				}

				this.setState({
					services : services
				});

				registerTracker({
					pageKey : 'servicesList'
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	addToCart(serviceId) {
		const {addToCart} = this.props;

		addToCart(serviceId);
	}

	toggle() {
		this.setState({
			toggle : !this.state.toggle,
			modal : !this.state.modal
		});
	}

	selectedServiceAction(service) {
		this.setState({
			toggle : true,
			modal : true,
			selected : service
		});
	}

	toggleTab(tab) {
		this.setState({
			tabActive : tab
		})
	}

	render() {
		const {services, selected, messageError, modal, tabActive} = this.state;

		return (<Fragment>
					<Row>
						<Col sm={12}>
							<Row>
							{
								services.map((service, i) => {
									return (
										<Col sm={4}>
											<Card>
												<CardImg top width="100%" src={service.images} />
												<CardBody>
													<CardTitle>{service.title}</CardTitle>
													<Button onClick={this.selectedServiceAction.bind(this, service)}>Detalle</Button>
												</CardBody>
											</Card>
										</Col>
									);
								})
							}
							</Row>
						</Col>
					</Row>
					<div>
				      <Modal isOpen={modal} toggle={this.toggle.bind(this)}>
				        <ModalHeader toggle={this.toggle.bind(this)}>{selected && selected.title}</ModalHeader>
				        <ModalBody>
				        	<CardImg top width="100%" src={selected && selected.images} />
				        	{
				        		selected && selected.type == 'simple' ? 
				        			<div>
				        				<ListGroup>
									    	<ListGroupItem>
									    		<Row>
									    			<Col xs={6}><b>S/ {selected.price}</b></Col>
									    			<Col xs={6}><Button color="success" onClick={this.addToCart.bind(this, selected.id)} className="rigth">Adquirir</Button></Col>
									    		</Row>
									    	</ListGroupItem>
									    	<ListGroupItem>
				        						<p>{selected.description}</p>
									    	</ListGroupItem>
									    </ListGroup>
				        			</div>
				        		 : 
						        	<Card tabs="true" className="mb-3">
		                				<CardHeader>
							        		<Nav justified>
						                        <NavItem>
						                            <NavLink
						                                className={classnames({active: tabActive === 1})}
						                                onClick={this.toggleTab.bind(this, 1)}
						                            >
						                                Descripcion
						                            </NavLink>
						                        </NavItem>
						                        <NavItem>
						                            <NavLink
						                                className={classnames({active: tabActive === 2})}
						                                onClick={this.toggleTab.bind(this, 2)}
						                            >
						                                Planes
						                            </NavLink>
						                        </NavItem>
						                    </Nav>
						                </CardHeader>
						                <CardBody>
								        	<TabContent activeTab={tabActive}>
									        	<TabPane tabId={2}>
									        		{
									        			selected ? (selected.type == 'configurable' ? 
									        				<ListGroup>
									        					{selected.planes.map((plan) => {
														      		return (
														      			<ListGroupItem>
														      				<ListGroupItemHeading>{plan.title}</ListGroupItemHeading>
														      				<ListGroupItemText>
														      					<Row>
														      						<Col xs="6"><b>S/ {plan.price}</b></Col>
														      						<Col xs="6"><Button color="success" onClick={this.addToCart.bind(this, plan.id)} className="rigth">Adquirir</Button></Col>
														      					</Row>
														      					<p>{plan.description}</p>
														      				</ListGroupItemText>
														      			</ListGroupItem>
														      		);
									        					})}
														    </ListGroup> : 
									        				<ListGroup>
														      <ListGroupItem>S/ {selected.price}</ListGroupItem>
														    </ListGroup>
									        		) : ''
									        		}
							                    </TabPane>
								        		<TabPane tabId={1}>
								        			<p>{selected && selected.description}</p>
						                        </TabPane>
								        	</TabContent>
								        </CardBody>
								    </Card>
				        	}
				        </ModalBody>
				        <ModalFooter>
				          <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
				        </ModalFooter>
				      </Modal>
				    </div>
				</Fragment>);
	}
}

const mapStateToProps = state => ({
    error : getCartError(state),
    cart : getCart(state),
    pending : getCartPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addToCart : addCartAction
}, dispatch);

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(ListServices));
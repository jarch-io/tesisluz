import React, {Fragment} from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {injector} from 'react-services-injector';

import {Row, Col, Form, FormGroup, Label, Button, Card, CardBody, CardTitle, CardText, CardLink, CardImg, CardSubtitle} from 'reactstrap';

import {list as serviceList} from '../../../Services/Service';

import {addToCart as addCartAction} from '../../../Fetchs/Cart';
import {getCart, getCartError, getCartPending} from '../../../reducers/Cart';

class ListServices extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			services : [],
			selected : undefined,
			messageError : ""
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
			})
			.catch(err => {
				console.log(err);
			});
	}

	addToCart(serviceId) {
		const {addToCart} = this.props;

		addToCart(serviceId);
	}

	render() {
		const {services, selected, messageError} = this.state;

		const selectedService = () => {
			if(!selected) return (
				<span>{messageError}</span>
			);

			const {cart} = this.props;
			let servicesInCart = [];

			if(cart) {
				cart.items.map((service) => {
					servicesInCart.push(service.service);
				});
			}

			return (
				<Col sm="4">
					<Card body outline color="primary">
						<CardImg top width="100%" src={selected.images} />
						<CardBody>
							<CardTitle>{selected.title}</CardTitle>
							<CardSubtitle>{selected.price}</CardSubtitle>
							{
								servicesInCart.indexOf(parseInt(selected.id)) !== -1 ? '' : <CardLink href="#" onClick={this.addToCart.bind(this, selected.id)}>Agregar</CardLink>
							}
							<CardText>{selected.description}</CardText>
						</CardBody>
					</Card>
				</Col>
			);
		}

		return (<Fragment>
					<Row>
						<Col sm={selected ? 8 : 12}>
							<Row>
							{
								services.map((service, i) => {
									if(selected && selected.id === service.id) return "";
									return (
										<Col sm={selected ? 6 : 4}>
											<Card>
												<CardImg top width="100%" src={service.images} />
												<CardBody>
													<CardTitle>{service.title}</CardTitle>
													<Button onClick={() => {this.setState({selected : service})}}>Detalle</Button>
												</CardBody>
											</Card>
										</Col>
									);
								})
							}
							</Row>
						</Col>
						{selectedService()}
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
    addToCart : addCartAction
}, dispatch);

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(ListServices));
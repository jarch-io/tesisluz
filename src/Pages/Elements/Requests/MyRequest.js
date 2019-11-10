import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import { Card, CardBody, Row, Col, Progress, Popover, PopoverBody, PopoverHeader, UncontrolledPopover, ListGroup, ListGroupItem, Form, FormGroup, Label, Input, Button, CustomInput } from 'reactstrap';

import {getById as requestGetById, setRating, addComment as requestAddCommentPublic} from '../../../Services/Request';
import {addComment as requestAddCommentSecure} from '../../../Secure/Request';
import {register as registerTracker} from '../../../Services/Tracker';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faUser, faGift, faShoppingCart, faQuestionCircle, faAddressCard, faAt, faMapMarker, faPhone, faCalendar, faBuilding, faChild, faComment, faStar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Rating from 'react-rating';

library.add(faUser, faGift, faShoppingCart, faQuestionCircle, faAddressCard, faAt, faMapMarker, faPhone, faCalendar, faBuilding, faChild, faComment, faStar);

class MyRequest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			request : undefined,
			totals : {
				services : 0,
				offers : 0
			},
			cancelRequest : false,
			rating : 0
		};

		this.role = props.role;
	}

	componentDidMount() {
		const {match: {params}} = this.props;

		let isUserRoute = window.location.pathname.indexOf('dashboard') == -1;
		
		requestGetById(parseInt(params.id))
			.then((request) => {
				let totalOffer = 0;
				let totalService = 0;

				request.offers.map((offer) => {
					totalOffer += offer.ammount;
				});

				request.services.map((service) => {
					totalService += service.price - service.discount
				})

				this.setState({
					request : request,
					totals : {
						offers : totalOffer,
						services : totalService
					},
					rating : request.rating
				});

				if(isUserRoute) {
					registerTracker({
						pageKey : 'userViewRequest',
						requestId : request.id
					});
				}
			})
			.catch((err) => {
				alert('ocurrio un error :(');
			});
	}

	handleChangeInput(evt) {
		const {name, value}  = evt.target;

		this.setState({
			[name] : value
		});
	}

	handleChangeInputBool(evt) {
		const {name}  = evt.target;

		this.setState({
			[name] : !this.state[name]
		});
	}

	changeRating(rating) {
		const {request} = this.state;

		setRating(request.id, rating)
			.then(response => {
				this.setState({
					rating : rating
				});
			});
	}

	addComment() {
		const {request, message, cancelRequest, rating, status} = this.state;
		const requestAddComment = this.role == 'customer' ? requestAddCommentPublic : requestAddCommentSecure;

		requestAddComment(request.id, {
			message : message,
			type : this.role,
			fromId : this.role == 'customer' ? this.state.request.customer.id : this.state.request.adviser.id,
			cancel : cancelRequest,
			rating : rating,
			status : status
		})
		.then(history => {
			request.history = history;

			this.setState({
				request : request
			})
		})
		.catch(err => {
			alert('No se pudo agregar el nuevo comentario.');
		});
	}

	setPopover(status) {
		return (<Fragment>
					<span id="popover">
						{status.detail} <FontAwesomeIcon icon={faQuestionCircle} />
					</span>
					<UncontrolledPopover trigger="legacy" placement="bottom" target="popover">
						<PopoverHeader>{status.detail}</PopoverHeader>
						<PopoverBody>{status.detail}</PopoverBody>
					</UncontrolledPopover>
				</Fragment>);
	}

	renderAdviser() {
		const {request} = this.state;

		if(!request) return "";

		const {adviser} = request;

		return (<Fragment>
					<Col sm="12">
						<div className="widget-chart bg-dark">
							<Row>
								{
									adviser.firstName ? <Fragment>
										{
											adviser.avatar ? <Col sm="4">
												<img width={100} height={100} className="rounded-circle" src={adviser.avatar} alt=""/>
											</Col> : ''
										}
										<Col sm="8" className="text-left text-warning">
											<p>{adviser.firstName + " " + adviser.lastName}</p>
											<p><FontAwesomeIcon icon={faPhone} /> {adviser.phone} {adviser.telephone}</p>
										</Col>
									</Fragment> : <Col sm="12" className="text-warning">
										<p>Aun no se le ha asignado un asesor</p>
									</Col>
								}
							</Row>
						</div>
					</Col>
				</Fragment>);
	}

	renderForm() {
		if(this.role != "customer" && this.role != "adviser") return "";

		const {cancelRequest, rating} = this.state;
		const {request} = this.state;

		if(request.isClosed) return '';

		const adviserControls = (
			<Fragment>
				<FormGroup>
					<Label for="status">Status</Label>
		          	<CustomInput type="select" id="status" name="status" onChange={this.handleChangeInput.bind(this)}>
		           		{request && request.progress && request.progress.length > 0 ? request.progress.map((state) => {
		           			return <option value={state.id} selected={state.isCurrent} disabled={state.isCurrent}>{state.detail}</option>
		           		}) : ''}
		          	</CustomInput>
				</FormGroup>
				{/* <FormGroup>
					<CustomInput type="switch" id="finishState" name="finishState" label="Deseo cerrar la solicitud." onChange={this.handleChangeInputBool.bind(this)}/>
				</FormGroup>*/}
			</Fragment>
		);

		return (<VerticalTimelineElement
				    className="vertical-timeline-element--work"
				    contentStyle={{ background: this.role == "customer" ? 'rgb(33, 150, 243)' : 'rgb(33, 150, 56)', color: '#fff' }}
				    contentArrowStyle={{ borderRight: this.role == "customer" ? '7px solid  rgb(33, 150, 243)' : '7px solid  rgb(33, 150, 56)' }}
				    iconStyle={{ background: this.role == "customer" ? 'rgb(33, 150, 243)' : 'rgb(33, 150, 56)', color: '#fff' }}
				    icon={<FontAwesomeIcon icon={faComment} className="fa-2x" />}
				  >
				    <Form>
				    	{this.role == 'adviser' && adviserControls}
				    	<FormGroup>
          					<Input type="textarea" name="message" id="message" placeholder="Comment" onChange={this.handleChangeInput.bind(this)} />
				    	</FormGroup>
				    	<CustomInput type="switch" id="cancelrequest" name="cancelRequest" label="Deseo cancelar la solicitud." onChange={this.handleChangeInputBool.bind(this)}/>
				    	<Button color="primary" onClick={this.addComment.bind(this)}>Submit</Button>
				    </Form>
				  </VerticalTimelineElement>);
	}

	render() {
		const {request, totals, rating} = this.state;

		if(!request) {
			return <div>Espere ...</div>;
		}

		const {customer, dates, progress, services, preferenceStore, offers, history} = request;

		const progressValue = 20;
		const progressMax = progress.length * progressValue;
		const isCompany = customer.type === 'company';

		return (
			<Fragment>
				<Card>
					<Row>
						<Col sm="6">
							<div className="widget-chart">
                                <div className="widget-chart-content">
                                    <div className="icon-wrapper rounded-circle">
                                        <div className="icon-wrapper-bg bg-primary"/>
                                        <div style={{width : '54px'}}>
                                        	<FontAwesomeIcon icon={isCompany ? faBuilding : faChild} className="fa-2x" />
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-numbers">
                                	<small># {this.state.request.ticket}</small>
                                	{
                                		customer.firstName || customer.lastName ? <p>{customer.firstName} {customer.lastName}</p> : (customer.name ? <p>{customer.name}</p> : '')
                                	}
                                </div>
                                {
                                	dates.requestCreate && <div>
                                		<FontAwesomeIcon icon={faCalendar} /> {dates.requestCreate}
                                	</div>
                                }
                                {
						    		(request.isClosed) ? <Fragment>
						    			<Rating
							    			emptySymbol={<FontAwesomeIcon icon={faStar} size="2x" />}
			  								fullSymbol={<FontAwesomeIcon icon={faStar} size="2x" color="yellow"/>}
			  								onChange={this.changeRating.bind(this)}
			  								initialRating={rating}
			  								readonly={this.role !== 'customer'}
							    		/><br />
							    	</Fragment> : ''
						    	}
                                {
                                	progress.length > 0 && <div>
	                                	<Progress multi>
	                                		{
	                                			progress.map((steep) => {
									        		return <Progress bar value={progressValue} max={progressMax} color={steep.isCurrent ? 'success' : 'dark'}>
									        				{!steep.isCurrent ? steep.detail : this.setPopover(steep)}
									        			</Progress>
	                                			})
	                                		}
									      </Progress>
	                                </div>
                                }
                                <div>
                        			<ListGroup flush className="text-left">
                        				<ListGroupItem disabled tag="li"><FontAwesomeIcon icon={faAt} /> {customer.email || ''}</ListGroupItem>
                        				<ListGroupItem disabled tag="li"><FontAwesomeIcon icon={faPhone} /> {customer.phone || ''}</ListGroupItem>
                        				<ListGroupItem disabled tag="li"><FontAwesomeIcon icon={faMapMarker} /> {customer.address || ''}</ListGroupItem>
                        				<ListGroupItem disabled tag="li"><FontAwesomeIcon icon={faAddressCard} /> {customer.document || ''}</ListGroupItem>
                        			</ListGroup>
                                </div>
                            </div>
						</Col>
						<Col sm="6">
							<Row>
								{
									services.length > 0 && <Col sm="12">
										<div className="widget-chart">
			                                <div className="widget-chart-content">
			                                    <div className="icon-wrapper rounded-circle">
			                                        <div className="icon-wrapper-bg bg-warning"/>
			                                        <div style={{width : '54px'}}>
			                                        	<FontAwesomeIcon icon={faShoppingCart} className="fa-2x" />
			                                        </div>
			                                    </div>
			                                    <div className="widget-numbers">
			                                        {preferenceStore.currency.symbol} {totals.services.toFixed(2)}
			                                    </div>
			                                    <div className="widget-description">
			                                        <ListGroup flush className="text-left">
			                                        {
			                                        	services.map((service) => {
			                                        		return (<ListGroupItem tag="li">
			                                        				{preferenceStore.currency.symbol} {(service.price - service.discount).toFixed(2)} - {service.title}
			                                        			</ListGroupItem>);
			                                        	})
			                                        }
			                                        </ListGroup>
			                                    </div>
			                                </div>
			                                <div className="widget-chart-wrapper chart-wrapper-relative">
			                                    
			                                </div>
			                            </div>
									</Col>
								}
								{
									offers.length > 0 && <Col sm="6">
										<div className="widget-chart">
			                                <div className="widget-chart-content">
			                                    <div className="icon-wrapper rounded-circle">
			                                        <div className="icon-wrapper-bg bg-success"/>
			                                        <div style={{width : '54px'}}>
			                                        	<FontAwesomeIcon icon={faGift} className="fa-2x" />
			                                        </div>
			                                    </div>
			                                    <div className="widget-numbers">
			                                        {preferenceStore.currency.symbol} {totals.offers.toFixed(2)}
			                                    </div>
			                                    <div className="widget-description">
			                                        <ListGroup flush className="text-left">
			                                        {
			                                        	offers.map((offer) => {
			                                        		return (<ListGroupItem tag="li">
			                                        				{preferenceStore.currency.symbol} {offer.ammount} - {offer.name}
			                                        			</ListGroupItem>);
			                                        	})
			                                        }
			                                        </ListGroup>
			                                    </div>
			                                </div>
			                            </div>
									</Col>
								}
								{this.renderAdviser()}
							</Row>
						</Col>
						<Col sm="12" className="bg-dark">
							<VerticalTimeline layout="1-column" animate={true}>
								{this.renderForm.bind(this).apply()}
								{
									history.map((itemHistory) => {
										return (<VerticalTimelineElement
										    className="vertical-timeline-element--work"
										    contentStyle={{ background: itemHistory.type == "customer" ? 'rgb(33, 150, 243)' : 'rgb(33, 150, 56)', color: '#fff' }}
										    contentArrowStyle={{ borderRight: itemHistory.type == "customer" ? '7px solid  rgb(33, 150, 243)' : '7px solid  rgb(33, 150, 56)' }}
										    date={itemHistory.createAt}
										    iconStyle={{ background: itemHistory.type == "customer" ? 'rgb(33, 150, 243)' : 'rgb(33, 150, 56)', color: '#fff' }}
										    icon={itemHistory.type == "customer" ? <FontAwesomeIcon icon={!isCompany ? faChild : faBuilding} className="fa-2x" /> : <img width={40} height={40} className="rounded-circle" src={request.adviser.avatar} alt=""/>}
										  >
										    <h3 className="vertical-timeline-element-title"></h3>
										    {itemHistory.status ? <p><b>Estado : </b> {itemHistory.detail}</p> : ''}
										    <p>
										      {itemHistory.message}
										    </p>
										  </VerticalTimelineElement>);
									})
								}
							</VerticalTimeline>
						</Col>
					</Row>
				</Card>
			</Fragment>
			);
	}
}

export default withRouter(MyRequest);
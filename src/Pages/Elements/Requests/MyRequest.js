import React, {Fragment} from 'react';
import { Card, CardBody, Row, Col, Progress, Popover, PopoverBody, PopoverHeader, UncontrolledPopover, ListGroup, ListGroupItem, Form, FormGroup, Label, Input, Button, CustomInput } from 'reactstrap';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faUser, faGift, faShoppingCart, faQuestionCircle, faAddressCard, faAt, faMapMarker, faPhone, faCalendar, faBuilding, faChild, faComment} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(faUser, faGift, faShoppingCart, faQuestionCircle, faAddressCard, faAt, faMapMarker, faPhone, faCalendar, faBuilding, faChild, faComment);

export default class MyRequest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			request : undefined,
			totals : {
				services : 0,
				offers : 0
			}
		};

		this.role = props.role;
	}

	componentDidMount() {
		const request = {
			id : 1,
			ticket : "ddosk5435aLSDS",
			progress : [
				{
					label : "Initial",
					success : true
				},
				{
					label : "Initial",
					success : true,
					status : {
						code : "initial",
						label : "Initial",
						description : "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \
										tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
										quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
										consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
										cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
										proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
					}
				},
				{
					label : "Initial",
					success : false
				},
				{
					label : "Initial",
					success : false
				},
				{
					label : "Initial",
					success : false
				}
			],
			customer : {
				id : 25,
				firstName : "José",
				lastName : "Ramos",
				email : "jramosch@klikealo.com",
				phone : "950119887",
				document : "70043215",
				address : "El derby 254, Surco, Lima, Perú",
				type : 'company'
			},
			adviser : {
				id : 48,
				firstName : "Jhon",
				lastName : "Doe",
				phone : "950119887",
				avatar : "https://www.fbi.gov/wanted/ecap/unknown-individual-4/johndoe30c.jpg/@@images/e9a5ce12-77f4-46d7-be88-3901239ea246.jpeg"
			},
			services : [
				{
					id : 26,
					name : "Venta de software",
					price: 263.36,
					discount : 0
				},
				{
					id : 26,
					name : "Venta de software",
					price: 263.36,
					discount : 23
				},
				{
					id : 26,
					name : "Venta de software",
					price: 263.36,
					discount : 2
				}
			],
			offers : [
				{
					id : 58,
					name : "2X1",
					ammount : 23
				}
			],
			dates : {
				lastAccess : "2019-02-03 16:23:23",
				requestCreate : "2019-01-01 16:23:23"
			},
			history : [
				{
					type : 'customer',
					message : 'lorem sad adaslkdasjkldajdakldsaldnad',
					status : null,
					date : '2019-01-06 56:45:41'
				},
				{
					type : 'customer',
					message : 'lorem sad adaslkdasjkldajdakldsaldnad',
					status : null,
					date : '2019-01-06 56:45:41'
				},
				{
					type : 'adviser',
					message : 'lorem sad adaslkdasjkldajdakldsaldnad',
					status : null,
					date : '2019-01-06 56:45:41'
				},{
					type : 'customer',
					message : 'lorem sad adaslkdasjkldajdakldsaldnad',
					status : null,
					date : '2019-01-06 56:45:41'
				}
				,{
					type : 'adviser',
					message : 'lorem sad adaslkdasjkldajdakldsaldnad',
					status : {
						id : 59,
						label : "Complete"
					},
					date : '2019-01-06 56:45:41'
				}
				,{
					type : 'customer',
					message : 'lorem sad adaslkdasjkldajdakldsaldnad',
					status : null,
					date : '2019-01-06 56:45:41'
				},
				{
					type : 'adviser',
					message : 'lorem sad adaslkdasjkldajdakldsaldnad',
					status : null,
					date : '2019-01-06 56:45:41'
				}
			],
			preferenceStore : {
				currency : {
					symbol : "S/",
					code : "PEN"
				}
			}
		};

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
			}
		});
	}

	setPopover(status) {
		return (<Fragment>
					<span id="popover">
						{status.label} <FontAwesomeIcon icon={faQuestionCircle} />
					</span>
					<UncontrolledPopover trigger="legacy" placement="bottom" target="popover">
						<PopoverHeader>{status.label}</PopoverHeader>
						<PopoverBody>{status.description}</PopoverBody>
					</UncontrolledPopover>
				</Fragment>);
	}

	renderAdviser() {
		if(this.role == "adviser") return "";

		const adviser = this.state.request.adviser;

		return (<Fragment>
					<Col sm="12">
						<div className="widget-chart bg-dark">
							<Row>
								<Col sm="4">
									<img width={100} height={100} className="rounded-circle" src={adviser.avatar} alt=""/>
								</Col>
								<Col sm="8" className="text-left text-warning">
									<p>{adviser.firstName + " " + adviser.lastName}</p>
									<p><FontAwesomeIcon icon={faPhone} /> {adviser.phone}</p>
								</Col>
							</Row>
						</div>
					</Col>
				</Fragment>);
	}

	renderForm() {
		if(this.role != "customer" && this.role != "adviser") return "";

		const adviserControls = (
			<Fragment>
				<FormGroup>
					<Label for="status">Status</Label>
		          	<CustomInput type="select" id="status" name="status">
		           		<option value="">Select</option>
		            	<option>Value 1</option>
		            	<option>Value 2</option>
		            	<option>Value 3</option>
		            	<option>Value 4</option>
		            	<option>Value 5</option>
		          	</CustomInput>
				</FormGroup>
				<FormGroup>
					<CustomInput type="switch" id="notifyCustomer" name="notifyCustomer" label="Notify customer?" />
				</FormGroup>
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
          					<Input type="textarea" name="message" id="message" placeholder="Comment" />
				    	</FormGroup>
				    	<Button className="bg-success">Submit</Button>
				    </Form>
				  </VerticalTimelineElement>);
	}

	render() {
		const request = this.state.request;

		if(request == undefined) {
			return <div>Espere ...</div>;
		}

		const progressValue = 20;
		const progressMax = request.progress.length * progressValue;
		const isCompany = request.customer.type === 'company';

		return (
			<Fragment>
				<Card>
					<Row>
						<Col sm="6">
							<div className="widget-chart">
                                <div className="widget-chart-content">
                                    <div className="icon-wrapper rounded-circle">
                                        <div className="icon-wrapper-bg bg-primary"/>
                                        <FontAwesomeIcon icon={isCompany ? faBuilding : faChild} className="fa-2x" />
                                    </div>
                                </div>
                                <div className="widget-numbers">
                                	<small># {this.state.request.ticket}</small>
                                	<p>{this.state.request.customer.firstName + ' ' + this.state.request.customer.lastName}</p>
                                </div>
                                <div>
                                	<FontAwesomeIcon icon={faCalendar} /> {request.dates.requestCreate}
                                </div>
                                <div>
                                	<Progress multi>
                                		{
                                			request.progress.map((steep) => {
								        		return <Progress bar value={progressValue} max={progressMax} color={steep.success ? 'success' : 'dark'}>
								        				{steep.status == undefined ? steep.label : this.setPopover(steep.status)}
								        			</Progress>
                                			})
                                		}
								      </Progress>
                                </div>
                                <div>
                        			<ListGroup flush className="text-left">
                        				<ListGroupItem disabled tag="li"><FontAwesomeIcon icon={faAt} /> {request.customer.email || ''}</ListGroupItem>
                        				<ListGroupItem disabled tag="li"><FontAwesomeIcon icon={faPhone} /> {request.customer.phone || ''}</ListGroupItem>
                        				<ListGroupItem disabled tag="li"><FontAwesomeIcon icon={faMapMarker} /> {request.customer.address || ''}</ListGroupItem>
                        				<ListGroupItem disabled tag="li"><FontAwesomeIcon icon={faAddressCard} /> {request.customer.document || ''}</ListGroupItem>
                        			</ListGroup>
                                </div>
                            </div>
						</Col>
						<Col sm="6">
							<Row>
								<Col sm="6">
									<div className="widget-chart">
		                                <div className="widget-chart-content">
		                                    <div className="icon-wrapper rounded-circle">
		                                        <div className="icon-wrapper-bg bg-warning"/>
		                                        <FontAwesomeIcon icon={faShoppingCart} className="fa-2x" />
		                                    </div>
		                                    <div className="widget-numbers">
		                                        {request.preferenceStore.currency.symbol} {this.state.totals.services}
		                                    </div>
		                                    <div className="widget-description">
		                                        <ListGroup flush className="text-left">
		                                        {
		                                        	request.services.map((service) => {
		                                        		return (<ListGroupItem tag="li">
		                                        				{request.preferenceStore.currency.symbol} {service.price - service.discount} - {service.name}
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
								<Col sm="6">
									<div className="widget-chart">
		                                <div className="widget-chart-content">
		                                    <div className="icon-wrapper rounded-circle">
		                                        <div className="icon-wrapper-bg bg-success"/>
		                                        <FontAwesomeIcon icon={faGift} className="fa-2x" />
		                                    </div>
		                                    <div className="widget-numbers">
		                                        {request.preferenceStore.currency.symbol} {this.state.totals.offers}
		                                    </div>
		                                    <div className="widget-description">
		                                        <ListGroup flush className="text-left">
		                                        {
		                                        	request.offers.map((offer) => {
		                                        		return (<ListGroupItem tag="li">
		                                        				{request.preferenceStore.currency.symbol} {offer.ammount} - {offer.name}
		                                        			</ListGroupItem>);
		                                        	})
		                                        }
		                                        </ListGroup>
		                                    </div>
		                                </div>
		                            </div>
								</Col>
								{this.renderAdviser()}
							</Row>
						</Col>
						<Col sm="12" className="bg-dark">
							<VerticalTimeline layout="1-column" animate={true}>
								{this.renderForm()}
								{
									request.history.map((itemHistory) => {
										return (<VerticalTimelineElement
										    className="vertical-timeline-element--work"
										    contentStyle={{ background: itemHistory.type == "customer" ? 'rgb(33, 150, 243)' : 'rgb(33, 150, 56)', color: '#fff' }}
										    contentArrowStyle={{ borderRight: itemHistory.type == "customer" ? '7px solid  rgb(33, 150, 243)' : '7px solid  rgb(33, 150, 56)' }}
										    date={itemHistory.date}
										    iconStyle={{ background: itemHistory.type == "customer" ? 'rgb(33, 150, 243)' : 'rgb(33, 150, 56)', color: '#fff' }}
										    icon={itemHistory.type == "customer" ? <FontAwesomeIcon icon={!isCompany ? faChild : faBuilding} className="fa-2x" /> : <img width={40} height={40} className="rounded-circle" src={request.adviser.avatar} alt=""/>}
										  >
										    <h3 className="vertical-timeline-element-title">Creative Director</h3>
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
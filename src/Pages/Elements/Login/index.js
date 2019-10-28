import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {fetchAuth as fetchAuthAction} from '../../../Fetchs/Auth';
import {getUser, getAuthPending, getAuthError, getIsAuthorize} from '../../../reducers/Auth';

import {
    Card, CardTitle, Button, Row, Col, Form, FormGroup, Label, Input
} from 'reactstrap';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	login() {
		const {fetchAuth, history} = this.props;
		const {email, password} = this.state;

		fetchAuth({
				username : email,
				password : password
			},function () {
			history.push('/dashboard');
		}.bind(this));
	}

	handleChangeInput(evt) {
		const {name, value}  = evt.target;

		this.setState({
			[name] : value
		});
	}

	render() {
		return <Row className="align-items-center">
				<Col md="4" className="offset-md-4">
				 	<Card className="mb-3" body>
		            	<CardTitle>Login</CardTitle>
		            	<Form>
		            		<FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail"
                                       placeholder="example@domain.com" onChange={this.handleChangeInput.bind(this)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword"
                                       placeholder="your pasword" onChange={this.handleChangeInput.bind(this)} />
                            </FormGroup>
                             <Button type="button" onClick={this.login.bind(this)} color="primary">Login</Button>
		            	</Form>
		        	</Card>
				</Col>
			</Row>
	}
}

const mapStateToProps = state => ({
    error : getAuthError(state),
    user : getUser(state),
    isAuthorize : getIsAuthorize(state),
    pending : getAuthPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAuth : fetchAuthAction
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
	)(Login);
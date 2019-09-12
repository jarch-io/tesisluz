import React from 'react';

import {
    Card, CardTitle, Button, Row, Col, Form, FormGroup, Label, Input
} from 'reactstrap';

class Login extends React.Component {
	constructor(props) {
		super(props);
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
                                       placeholder="example@domain.com"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword"
                                       placeholder="your pasword"/>
                            </FormGroup>
                             <Button color="primary">Login</Button>
		            	</Form>
		        	</Card>
				</Col>
			</Row>
	}
}

export default Login;
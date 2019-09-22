import React, {Fragment} from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import {Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';

class SearchTicket extends React.Component {
	search() {
		this.props.history.push('search/646');
	}

	render() {
		return (<Fragment>
					<Row>
						<Col sm="6" className="offset-3 text-center">
							<Form onSubmit={this.search.bind(this)}>
								<FormGroup>
						        	<Label for="ticket">Ticket</Label>
						        	<Input type="text" name="ticket" id="ticket" placeholder="Input # ticket" />
						        </FormGroup>
						        <Button onClick={this.search.bind(this)} type="button">Consultar</Button>
							</Form>
						</Col>
					</Row>
				</Fragment>);
	}
}

export default withRouter(SearchTicket);
import React, {Fragment} from 'react';

import {Table, Media, Button}  from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Paginator from '../Commons/Paginator';

library.add(faEdit);

export default class Services extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			services : []
		};
	}

	componentDidMount() {
		const serviceList = [
			{
				id : 1,
				title : "Hola mundo cruel",
				price : '$ 5,236.25',
				status : true
			},
			{
				id : 2,
				title : "Hola mundo cruel",
				price : '$ 36.25',
				status : false
			}
		];

		this.setState({
			services : serviceList
		});
	}

	render() {
		return (
			<Fragment>
				<Table dark>
			    	<thead>
			    		<tr>
			    			<th>#</th>
			    			<th>Title</th>
			    			<th>Price</th>
			    			<th>Status</th>
			    			<th>Actions</th>
			    		</tr>
			    	</thead>
			    	<tbody>
			    		{
			    			this.state.services.map((service, key) => <RowItem service={service} key={key} />)
			    		}
			    	</tbody>
			    </Table>
			    <Paginator />
			</Fragment>
			);
	}
}

class RowItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	render() {
		return (
			<tr>
				<th><span>{this.props.service.id}</span></th>
				<td><div>{this.props.service.title}</div></td>
				<td><div>{this.props.service.price}</div></td>
				<td><div className={['badge', this.props.service.status ? 'badge-success' : 'badge-danger'].join(' ')}>{this.props.service.status ? 'Activo' : 'Inactivo'}</div></td>
				<td><div>
					<Button outline color="primary" size="sm"><FontAwesomeIcon icon={faEdit} /></Button>
				</div></td>
			</tr>
		);
	}
}
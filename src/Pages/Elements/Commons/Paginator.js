import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

export default class Paginator extends React.Component {
	constructor(props) {
		super(props);

		this.range = props.range || 5;

		this.state = {
			minPage : 5,
			maxPage : 9,
			currentPage : 6,
			totalPage : 10
		};
	}

	nextPage() {
		if(this.state.currentPage === this.state.totalPage) return;

		this.setState({
			currentPage : this.state.currentPage + 1,
		});

		this.calculateRange();
	}

	prevPage() {
		if(this.state.currentPage === 1) return;

		this.setState({
			currentPage : this.state.currentPage - 1,
		});

		this.calculateRange();
	}

	calculateRange() {
		const minPage = Math.ceil(this.state.currentPage / 2);

		if(minPage == 0) minPage = 1;

		this.setState({
			minPage : minPage,
			maxPage : minPage + this.range
		});
	}

	render() {
		const itemsPages = [];

		for(let i = this.state.minPage; i <= this.state.maxPage; i++) {
			if(i > this.state.totalPage) break;

			itemsPages.push(<PaginationItem active={this.state.currentPage === i}>
                        		<PaginationLink href="javascript:void(0);">
                            		{i}
                        		</PaginationLink>
                    		</PaginationItem>);
		}

		return (
				<Pagination>
					<PaginationItem onClick={this.prevPage.bind(this)} className="pagination-rounded" disabled={this.state.currentPage === 1}>
						<PaginationLink previous  />
					</PaginationItem>
					{itemsPages}
                    <PaginationItem onClick={this.nextPage.bind(this)} disabled={this.state.currentPage === this.state.totalPage}>
                        <PaginationLink next href="javascript:void(0);"/>
                    </PaginationItem>
				</Pagination>
			);
	}
}
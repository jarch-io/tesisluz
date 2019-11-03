import React, {Fragment} from 'react';

import ReactHighcharts from 'react-highcharts';

import {getHistoryStatus} from '../../../Secure/Report';

class Overview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			categories : [],
			series : []
		};
	}

	afterRender(chart) {
		console.log(chart);
	}

	componentDidMount() {
		getHistoryStatus()
				.then((data) => {
					this.setState({
						categories: data.categories,
						series : data.series
					});
				});

	}

	render() {
		const {categories, series} = this.state;

		const config = {
			title: {
		        text: 'Comparativo de estado de solicitudes'
		    },
		     tooltip: {
		        shared: true,
		        crosshairs: true
		    },
			xAxis: {
			    categories: categories
			},
			series: series
		};

		return (<ReactHighcharts config={config} callback={this.afterRender.bind(this)}></ReactHighcharts>);
	}
}

export default Overview;
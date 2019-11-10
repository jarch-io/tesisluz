import React, {Fragment} from 'react';

import ReactHighcharts from 'react-highcharts';

import {getHistoryStatus, getRequestHistory} from '../../../Secure/Report';

class Overview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			categories : [],
			series : [],
			categoriesTrack : [],
			seriesTrack : []
		};
	}

	afterRender(chart) {
		
	}

	componentDidMount() {
		getHistoryStatus()
				.then((data) => {
					this.setState({
						categories: data.categories,
						series : data.series
					});
				});

		getRequestHistory()
				.then((data) => {
					if(data) {
						this.setState({
							categoriesTrack: data.categories,
							seriesTrack : data.series
						});
					}
				});
	}

	render() {
		const {categories, series, categoriesTrack, seriesTrack} = this.state;

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

		const configTrack = {
			title: {
		        text: 'Navegacion'
		    },
		     tooltip: {
		        shared: true,
		        crosshairs: true
		    },
			xAxis: {
			    categories: categoriesTrack
			},
			series: seriesTrack
		};

		return (
			<Fragment>
				{
					categoriesTrack.length == 0 ? '' : <ReactHighcharts config={configTrack}></ReactHighcharts>
				}
				{
					categories.length == 0 ? '' : <ReactHighcharts config={config}></ReactHighcharts>
				}
			</Fragment>
		);
	}
}

export default Overview;
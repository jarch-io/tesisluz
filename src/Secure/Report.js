import API from './rest'

function getHistoryStatus(params) {
	return API.get(`reports/requests/status`, {
		params : {
			query : params
		}
	})
			.then(res => res.data)
			.then(res => res.data);
}

export {
	getHistoryStatus
};
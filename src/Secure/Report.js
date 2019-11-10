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

function getRequestHistory(params) {
	return API.get(`reports/tracker/requests`, {
		params : {
			query : params
		}
	})
			.then(res => res && res.data ? res.data : "")
			.then(res => res && res.data ? res.data : "");
}

export {
	getHistoryStatus,
	getRequestHistory
};
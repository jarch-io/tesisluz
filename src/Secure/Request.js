import API from './rest'

function getById(requestId) {
	return API.get(`requests/${requestId}`)
			.then(res => res.data)
			.then(res => res.request);
}

function find(params) {
	return API.get(`requests`, {
		params : {
			query : params
		}
	})
			.then(res => res.data)
			.then(res => res.requests);
}

function assign(requestId, adviser) {
	return API.put(`requests/${requestId}/assigns`, {adviser : adviser})
			.then(res => res.data)
			.then(res => res.request)
}

function addComment(requestId, comment) {
	return API.post(`requests/${requestId}/comments`, {comment : comment})
			.then(res => res.data)
			.then(res => res.history);
}

export {
	getById,
	find,
	addComment,
	assign
};
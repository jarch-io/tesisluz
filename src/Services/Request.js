import API from './rest.js'

function getById(requestId) {
	return API.get(`requests/${requestId}`)
			.then(res => res.data)
			.then(res => res.request);
}

function find(terms) {
	return API.get(`requests`, terms)
			.then(res => res.data)
			.then(res => res.request);
}

function create(request) {
	return API.post(`requests`, JSON.stringify({request : request}))
			.then(res => res.data)
			.then(res => res.request);
}

function addComment(requestId, comment) {
	return API.post(`requests/${requestId}/comments`, {comment : comment})
			.then(res => res.data)
			.then(res => res.history);
}

export {
	getById,
	create,
	find,
	addComment
};
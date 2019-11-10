import API from './rest.js'

function getById(quoteId) {
	return API.get(`quotes/${quoteId}`)
			.then(res => res.data)
			.then(res => res.quote);
}

function create(items) {
	return API.post(`quotes`, {items : items})
			.then(res => res.data)
			.then(res => res.quote);
}

function update(quoteId, items) {
	return API.put(`quotes/${quoteId}`, {items : items})
			.then(res => res.data)
			.then(res => res.quote);
}

export {
	getById,
	create,
	update
};
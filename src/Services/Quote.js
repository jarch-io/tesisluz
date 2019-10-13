import API from './rest.js'

function getById(quoteId) {
	return API.get(`quotes/${quoteId}`)
			.then(res => res.data)
			.then(res => res.quote);
}

function create(items) {
	return API.post(`quotes`, JSON.stringify({items : items}))
			.then(res => res.data)
			.then(res => res.quote);
}

function update(quoteId, items) {
	return API.put(`quotes/${quoteId}`, JSON.stringify({items : items}))
			.then(res => res.data)
			.then(res => res.quote);
}

export {
	getById,
	create,
	update
};
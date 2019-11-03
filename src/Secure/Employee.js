import API from './rest'

function find(params) {
	return API.get(`employees`, {
		params : {
			query : params
		}
	})
			.then(res => res.data)
			.then(res => res.employees);
}

export {
	find
};
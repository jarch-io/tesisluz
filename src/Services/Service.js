import API from './rest.js'

function list() {
	return API.get(`services`)
			.then(res => res.data)
			.then(res => res.services)
			.catch((err) => {
				console.log("Ocurrio un error :(");
			});
}

export {list};
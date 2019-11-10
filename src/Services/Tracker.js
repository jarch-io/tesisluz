import API from './rest.js'

function register(track) {
	return API.post(`tracker`, {tracker : track})
			.then(res => res.data)
			.catch((err) => {
				console.log("Ocurrio un error :(");
			});
}

export {register};
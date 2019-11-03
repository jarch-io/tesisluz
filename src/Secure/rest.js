import axios from 'axios';

var service =  axios.create({
	baseURL : "http://api.luz.localhost/v1/secure/",
	headers : {
      'Accept' : 'application/json;charset=UTF-8',
      'Content-Type' : 'application/json;charset=UTF-8'
  	}
});

service.interceptors.request.use(
	 config => {
	 	config.headers['Authorization'] = "Bearer " + (localStorage.getItem('AuthToken') || 'madre mia!!!');
	 	return config;
	 },
	 error => {
	 	Promise.reject(error);
	 }
	);

service.interceptors.response.use((response) => {
	return response;
}, (error) => {
	if(error.response) {
		switch(error.response.status){
			case 401:
			console.log("Tienes que iniciar sesion.");
			localStorage.removeItem('AuthToken');
			localStorage.removeItem('AuthUser');
			window.location.href = '/#/login';
			break;
			case 403:
			console.log("No tienes permisos para realizar esta accion.");
			break;
			default:
			console.log("No hay codigo de error");
		}
	}
});

export default service;
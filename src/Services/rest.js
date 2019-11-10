import axios from 'axios';

var service = axios.create({
	baseURL : "http://api.luz.localhost/v1/",
	headers : {
      'Accept' : 'application/json;charset=UTF-8',
      'Content-Type' : 'application/json;charset=UTF-8'
  	}
});

service.interceptors.request.use(
	config => {
		if(config.data) {
			config.data.sessionKey = sessionStorage.getItem('session_key_app');
			config.data = JSON.stringify(config.data);
		}
		return config;
	},
	error => {
		Promise.reject(error);
	}
);

export default service;
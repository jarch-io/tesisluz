import axios from 'axios';

var service =  axios.create({
	baseURL : "http://api.luz.localhost/v1/secure/",
	headers : {
      'Accept' : 'application/json;charset=UTF-8',
      'Content-Type' : 'application/json;charset=UTF-8',
      'Authorization' : 'Bearer ' + (localStorage.getItem('AuthToken') || 'madre mia!!!')
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

export default service;
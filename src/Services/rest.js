import axios from 'axios';

export default axios.create({
	baseURL : "http://api.luz.localhost/v1/",
	headers : {
      'Accept' : 'application/json;charset=UTF-8',
      'Content-Type' : 'application/json;charset=UTF-8'
  	}
});
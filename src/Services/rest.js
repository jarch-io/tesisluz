import axios from 'axios';

export default axios.create({
	baseURL : "http://3.15.116.94/v1/",
	headers : {
      'Accept' : 'application/json;charset=UTF-8',
      'Content-Type' : 'application/json;charset=UTF-8'
  	}
});
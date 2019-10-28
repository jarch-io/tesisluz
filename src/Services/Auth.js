import API from './rest';

function login(user) {
	return API.post('auth', {user : user})
				.then(res => res.data);
}

export {
	login
};
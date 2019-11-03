import {fetchAuthPending, fetchAuthSuccess, fetchAuthError} from '../Actions/Auth';

import {login} from '../Services/Auth';

export function fetchAuth(user, callback) {
	return dispatch => {
		dispatch(fetchAuthPending());

		const authToken = localStorage.getItem('AuthToken');
		const authUser = localStorage.getItem('AuthUser');

		if(authToken && authUser) {
			callback && callback.apply();
			dispatch(fetchAuthSuccess(JSON.parse(authUser), authToken));
		}else{
			login(user || {
				username : 'none',
				password : 'none'
			})
				.then(dataAuth => {
					localStorage.setItem('AuthToken', dataAuth.auth.token);
					localStorage.setItem('AuthUser', JSON.stringify(dataAuth.user))
					dispatch(fetchAuthSuccess(dataAuth.user, dataAuth.auth.token))
					callback && callback.apply();
				})
				.catch(err => {
					dispatch(fetchAuthError(err));
				});
		}

	}
}

export function logoutAuth() {
	return dispatch => {
		localStorage.removeItem('AuthToken');
		localStorage.removeItem('AuthUser');
		window.location.href = '/#/login';
	}
}
import {fetchAuthPending, fetchAuthSuccess, fetchAuthError} from '../Actions/Auth';

export function fetchAuth(callback) {
	return dispatch => {
		dispatch(fetchAuthPending());

		dispatch(fetchAuthSuccess({}))
		callback.apply();
	}
}
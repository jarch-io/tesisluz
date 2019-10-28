export const FETCH_AUTH_PENDING = "FETCH_AUTH_PENDING";
export const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
export const FETCH_AUTH_ERROR = "FETCH_AUTH_ERROR";
export const FETCH_AUTH_UNAUTHORIZE = "FETCH_AUTH_UNAUTHORIZE";
export const FETCH_AUTH_AUTHORIZE = "FETCH_AUTH_AUTHORIZE";

export function fetchAuthPending() {
	return {
		type : FETCH_AUTH_PENDING
	};
}

export function fetchAuthSuccess(user, token) {
	return {
	type: FETCH_AUTH_SUCCESS,
	user : user,
	token : token,
	isAuthorize : true
	}
}

export function fetchAuthError(err) {
	return {
		type : FETCH_AUTH_ERROR,
		user : undefined,
		error : err
	}
}

export function fetchAuthUnauthorize() {
	return {
		type : FETCH_AUTH_UNAUTHORIZE,
		user : undefined,
		isAuthorize : false
	}
}

export function fetchAuthAuthorize(user) {
	return {
		type : FETCH_AUTH_AUTHORIZE,
		user : user,
		isAuthorize : true
	}
}
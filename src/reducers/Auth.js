import {FETCH_AUTH_PENDING, FETCH_AUTH_SUCCESS, FETCH_AUTH_ERROR, FETCH_AUTH_AUTHORIZE, FETCH_AUTH_UNAUTHORIZE} from '../Actions/Auth';

const initialState = {
	pending : false,
	user : undefined,
	error : null,
	isAuthorize : false
};

export function authReducer(state = initialState, action) {
	switch(action.type) {
		case FETCH_AUTH_PENDING:
			return {
				...state,
				pending : true,
				isAuthorize : false
			}
		case FETCH_AUTH_SUCCESS:
			return {
				...state,
				pending : false,
				user : action.user,
				isAuthorize : true
			}
		case FETCH_AUTH_ERROR:
			return {
				...state,
				pending : false,
				user : undefined,
				isAuthorize : false,
				error : action.error
			}
		case FETCH_AUTH_UNAUTHORIZE:
			return {
				...state,
				user : undefined,
				pending: false,
				isAuthorize: false
			}
		case FETCH_AUTH_AUTHORIZE:
			return {
				...state,
				user : action.user,
				isAuthorize : true,
				error : null
			}
		default:
			return state
	}
}

export const getUser = state => state.Auth.user;
export const getAuthPending = state => state.Auth.pending;
export const getAuthError = state => state.Auth.error;
export const getIsAuthorize = state => state.Auth.isAuthorize;
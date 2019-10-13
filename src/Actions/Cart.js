export const FETCH_CART_PENDING = 'FETCH_CART_PENDING';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_ERROR = 'FETCH_CART_ERROR';

export const PUSH_CART_ITEM = 'PUSH_CART_ITEM';

export const CLEAR_CART = 'CLEAR_CART';

export function fetchCartPending() {
	return {
		type : FETCH_CART_PENDING
	}
}

export function fetchCartSuccess(cart) {
	return {
		type : FETCH_CART_SUCCESS,
		cart : cart
	}
}

export function fetchCartError(err) {
	return {
		type : FETCH_CART_ERROR,
		error : err
	}
}

export function pushCartItem(serviceId) {
	return {
		type : PUSH_CART_ITEM,
		serviceId : serviceId
	}
}

export function clearCartAll() {
	return {
		type : CLEAR_CART
	}
}
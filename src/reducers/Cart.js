import {FETCH_CART_PENDING, FETCH_CART_SUCCESS, FETCH_CART_ERROR, CLEAR_CART} from '../Actions/Cart';

const initialState = {
	pending : false,
	cart : undefined,
	error: null
};

export function cartReducer(state = initialState, action) {
	switch(action.type){
		case FETCH_CART_PENDING:
			return {
				...state,
				pending : true
			};
		case FETCH_CART_SUCCESS:
			return {
				...state,
				pending: false,
				cart: action.cart
			};
		case FETCH_CART_ERROR:
			return {
				...state,
				pending : false,
				error : action.error
			};
		case CLEAR_CART:
			return {
				...state,
				cart : undefined
			};
		default:
			return state;
	}
}

export const getCart = state => state.Cart.cart;
export const getCartPending = state => state.Cart.pending;
export const getCartError = state => state.Cart.error;
export const clearCart = state => state.Cart.cart;
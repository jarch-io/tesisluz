import {fetchCartPending, fetchCartSuccess, fetchCartError, clearCartAll} from '../Actions/Cart';

import {getById, create, update} from '../Services/Quote';

export function fetchCart() {
	return dispatch => {
		dispatch(fetchCartPending());

		if(localStorage.getItem('quote')) {
			getById(localStorage.getItem('quote'))
				.then(quote => {
					dispatch(fetchCartSuccess(quote));
					return quote;
				})
				.catch(err => {
					dispatch(fetchCartError(err));
				});
		}
	}
}

export function addToCart(serviceId) {
	return dispatch => {
		dispatch(fetchCartPending());

		if(localStorage.getItem('quote')) {
			update(localStorage.getItem('quote'), [{
				id : serviceId,
				quantity : 1
			}])
			.then(quote => {
				dispatch(fetchCartSuccess(quote));

				return quote;
			})
			.catch(err => {
				dispatch(fetchCartError(err));
			});
		}else {
			create([{
				id : serviceId,
				quantity : 1
			}])
			.then(quote => {
				dispatch(fetchCartSuccess(quote));

				localStorage.setItem('quote', quote.id);

				return quote;
			})
			.catch(err => {
				dispatch(fetchCartError(err));
			});
		}

	}
}

export function clearCart() {
	return dispatch => {
		localStorage.removeItem('quote');
		dispatch(clearCartAll());
	}
}
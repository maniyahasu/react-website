import { CartConstant } from "../constants/CartContant"


export const addItemToCart = (payload) => {
    return {
        type: CartConstant.ADD_ITEM,
        payload: payload
    }
} 

export const addItemToCartError = () => {
    return {
        type: CartConstant.ADD_ITEM_ERROR,
    }
}

export const removeItemFromCart = (payload) => {
    return {
        type: CartConstant.REMOVE_ITEM,
        payload: payload
    }
}

export const removeAllItemFromCart = () => {
    return {
        type: CartConstant.REMOVE_ITEM_ALL
    }
}

export const increaseQuantity = (payload) => {
    return {
        type: CartConstant.INCREASE_QUANTITY, payload
    }
}

export const decreaseQuantity = (payload) => {
    return {
        type: CartConstant.DECREASE_QUANTITY, payload
    }
}

export const fetchCartItemsStart = () => ({type: CartConstant.FETCH_CART_ITEMS_START});
export const fetchAndSetCartItems = (payload) => ({type: CartConstant.FETCH_CART_ITEMS, payload});
export const fetchCartItemsError = () => ({type: CartConstant.FETCH_CART_ITEMS_ERROR});
export const fetchCartItemsSuccess = () => ({type: CartConstant.FETCH_CART_ITEMS_SUCCESS});

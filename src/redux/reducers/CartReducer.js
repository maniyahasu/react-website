import { CartConstant } from "../constants/CartContant"

const initialState = {
    cart: [],
    cartCount: 0,
    totalAmount: 0,
    isCartItemLoading: false
}

export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CartConstant.FETCH_CART_ITEMS:
            const totalAmounts = payload.map(el => el.price).reduce((el, total) => el + total, 0).toFixed(2);
            return {
                ...state, cart: payload, cartCount: payload.length, totalAmount: totalAmounts
            }
        case CartConstant.FETCH_CART_ITEMS_START:
            return { ...state, isCartItemLoading: true }
        case CartConstant.FETCH_CART_ITEMS_SUCCESS:
            return { ...state, isCartItemLoading: false }
        case CartConstant.FETCH_CART_ITEMS_ERROR:
            return { ...state, isCartItemLoading: false }
        case CartConstant.ADD_ITEM:
            const newProducts = [...state.cart];
            const totalAmount = state.totalAmount += +payload.price;
            const existingItem = newProducts.find(item => item.id === payload.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                newProducts.push(payload);
            }
            return { ...state, cart: newProducts, cartCount: state.cartCount + 1, totalAmount: +totalAmount.toFixed(2) }
        case CartConstant.ADD_ITEM_ERROR:
            return { ...state }
        case CartConstant.REMOVE_ITEM:
            let cart = [...state.cart];
            if (cart.length === 1) {
                return { ...state, cart: [], cartCount: 0, totalAmount: 0 };
            } else {
                const totalAmount = +(state.totalAmount -= +(payload.price * payload.quantity)).toFixed(2);
                cart = cart.filter(item => item.id !== payload.id);
                const quantity = state.cartCount - payload.quantity;
                return {
                    ...state,
                    cart: cart,
                    totalAmount: +totalAmount.toFixed(2),
                    cartCount: quantity
                }
            }
        case CartConstant.INCREASE_QUANTITY:
            const cartItems = [...state.cart];
            let amt = +state.totalAmount;
            const totalAmt = amt += +payload.price;
            const item = cartItems.find(item => item.id === payload.id);
            item.quantity++;
            const quantity = state.cartCount + 1;
            return { ...state, cart: cartItems, totalAmount: totalAmt.toFixed(2), cartCount: quantity }
        case CartConstant.DECREASE_QUANTITY:
            let cartCopy = [...state.cart];
            if (cartCopy.length === 1 && payload.quantity === 1) {
                return { ...state, cart: [], cartCount: 0, totalAmount: 0 };
            }
            const total = +(state.totalAmount -= +payload.price).toFixed(2);
            const cartTtem = cartCopy.find(item => item.id === payload.id);
            if (cartTtem.quantity === 1) {
                cartCopy = cartCopy.filter(el => el.id !== payload.id);
            } else {
                cartTtem.quantity--;
            }
            const itemQuantity = state.cartCount - 1;
            return { ...state, cart: cartCopy, totalAmount: total, cartCount: itemQuantity }
        default:
            return state;
    }
};
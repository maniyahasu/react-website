import { ProductActions } from '../constants/ProductConstant';

export const fetchAllProducts = (payload) => {
    return {
        type: ProductActions.FETCH_PRODUCTS,
        payload: payload
    }
};

export const productDetail = (payload) => {
    return {
        type: ProductActions.PRODUCT_DETAIL,
        payload: payload
    }
}

export const removeSelectedProducts = () => {
    return {
        type: ProductActions.REMOVE_SELECTED_PRODUCT
    }
}
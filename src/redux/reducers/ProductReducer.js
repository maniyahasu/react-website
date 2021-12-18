import { ProductActions } from "../constants/ProductConstant";

const initialState = {
  products: []
};

export const fetchProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActions.FETCH_PRODUCTS:
      return {...state, products: action.payload};
    default:
      return state;
  }
};

export const productDetailReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case ProductActions.PRODUCT_DETAIL:
      return {...state, ...payload};
    case ProductActions.REMOVE_SELECTED_PRODUCT:
      return {}
    default:
      return state;
  }
};

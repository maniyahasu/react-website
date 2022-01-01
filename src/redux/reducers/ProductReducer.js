import { ProductActions } from "../constants/ProductConstant";

const initialState = {
  products: [],
  productCategory: [],
  masterProducts: [],
  isProductFiltered: false,
};

export const fetchProductsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ProductActions.FETCH_PRODUCTS:
      const category = payload
        .map((p) => p.category)
        .filter((item, i, self) => i === self.indexOf(item));
      return {
        ...state,
        products: payload,
        productCategory: category,
        masterProducts: payload,
        isProductFiltered: false
      };
    case ProductActions.FILTERED_PRODUCT:
      return {
        ...state,
        products: state.masterProducts.filter(
          (product) => product.category === payload
        ),
        isProductFiltered: true
      };
    case ProductActions.RESET_FILTER:
      return { ...state, products: state.masterProducts, isProductFiltered: false };
      
    default:
      return state;
  }
};

export const productDetailReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ProductActions.PRODUCT_DETAIL:
      return { ...state, ...payload };
    case ProductActions.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

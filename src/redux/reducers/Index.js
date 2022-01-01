import { combineReducers } from 'redux';
import { fetchProductsReducer, productDetailReducer } from './ProductReducer';
import { fetchAllTodoReducer } from './TodoReducer';
import { cartReducer } from './CartReducer';

const reducers = combineReducers({
    allProducts: fetchProductsReducer,
    product: productDetailReducer,
    todoList: fetchAllTodoReducer,
    cartItems: cartReducer
});

export default reducers;
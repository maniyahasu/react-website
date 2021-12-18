import { combineReducers } from 'redux';
import { fetchProductsReducer, productDetailReducer } from './ProductReducer';
import { fetchAllTodoReducer } from './TodoReducer';

const reducers = combineReducers({
    allProducts: fetchProductsReducer,
    product: productDetailReducer,
    todoList: fetchAllTodoReducer,
});

export default reducers;
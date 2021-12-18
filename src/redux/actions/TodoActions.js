import { TodoConstants } from "../constants/TodoConstants";

export const fetchAllTodos = (payload) => {
  return {
    type: TodoConstants.FETCH_ALL_TODOS,
    payload: payload,
  };
};

export const addTodo = (payload) => {
  return {
    type: TodoConstants.ADD_TODO,
    payload: payload,
  };
};

export const deleteTodo = (payload) => {
  return {
    type: TodoConstants.DELETE_TODO,
    payload: payload,
  };
};

export const editTodo = (payload) => {
  return {
    type: TodoConstants.UPDATE_TODO,
    payload: payload,
  };
};

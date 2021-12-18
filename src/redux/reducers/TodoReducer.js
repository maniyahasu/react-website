import { TodoConstants } from "../constants/TodoConstants";

const initialState = {
  todos: [],
};

export const fetchAllTodoReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case TodoConstants.FETCH_ALL_TODOS:
      return { ...state, todos: payload };
    case TodoConstants.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    case TodoConstants.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload),
      };
    case TodoConstants.UPDATE_TODO:
      debugger;
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? payload : todo
        ),
      };
    default:
      return state;
  }
};

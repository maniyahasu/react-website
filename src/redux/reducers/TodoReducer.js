import { TodoConstants } from "../constants/TodoConstants";

const initialState = {
  todos: [],
  isLoading: false,
  isEditing: false,
  editingTodo: {},
  error: "",
};

export const fetchAllTodoReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case TodoConstants.FETCH_ALL_TODOS:
      return { ...state, isLoading: true };
    case TodoConstants.FETCH_ALL_TODOS_SUCCESS:
      return { ...state, todos: payload, isLoading: false };
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
    case TodoConstants.UPDATE_TODO_START:
      return {
        ...state,
        editingTodo: payload,
        isEditing: true,
      };
    case TodoConstants.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? payload : todo
        ),
      };
    case TodoConstants.UPDATE_TODO_END:
      return {
        ...state,
        editingTodo: {},
        isEditing: false,
      };
    default:
      return state;
  }
};

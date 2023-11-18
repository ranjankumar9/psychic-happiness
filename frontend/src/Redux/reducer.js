import {
  TODO_ADD_ERROR,
  TODO_ADD_REQUEST,
  TODO_ADD_SUCCESS,
  TODO_DELETE_ERROR,
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_GET_ERROR,
  TODO_GET_REQUEST,
  TODO_GET_SUCCESS,
  TODO_UPDATE_ERROR,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
  TODO_TOGGLE_COMPLETION_ERROR,
  TODO_TOGGLE_COMPLETION_REQUEST,
  TODO_TOGGLE_COMPLETION_SUCCESS,
} from "./actionTypes";

const initialState = {
  Todo: {
    todo: [],
  },
  isLoading: false,
  isError: false,
};

const reducer = (state = initialState, { type, payload, id }) => {
  switch (type) {
    case TODO_GET_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case TODO_GET_SUCCESS:
      return { ...state, isLoading: false, isError: false, Todo: payload };
    case TODO_GET_ERROR:
      return { ...state, isLoading: false, isError: true };
    case TODO_ADD_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case TODO_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        Todo: [...state.Todo, payload],
      };
    case TODO_ADD_ERROR:
      return { ...state, isLoading: false, isError: true };
    case TODO_DELETE_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case TODO_DELETE_SUCCESS:
      const deletedTodo = state.Todo.filter((item) => item._id !== id);
      return { ...state, isLoading: false, isError: false, Todo: deletedTodo };
    case TODO_DELETE_ERROR:
      return { ...state, isLoading: false, isError: true };
    case TODO_UPDATE_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case TODO_UPDATE_SUCCESS:
      const updatedTodo = state.Todo.map((item) => {
        if (item._id === id) {
          return { ...item, ...payload };
        } else {
          return item;
        }
      });
      return { ...state, isLoading: false, isError: false, Todo: updatedTodo };
    case TODO_UPDATE_ERROR:
      return { ...state, isLoading: false, isError: true };
    case TODO_TOGGLE_COMPLETION_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case TODO_TOGGLE_COMPLETION_SUCCESS:
      const toggledTodo = state.Todo.map((item) => {
        if (item._id === id) {
          return { ...item, status: payload.status };
        } else {
          return item;
        }
      });
      return { ...state, isLoading: false, isError: false, Todo: toggledTodo };
    case TODO_TOGGLE_COMPLETION_ERROR:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default reducer;

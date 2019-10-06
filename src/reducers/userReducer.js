// imports
import {
  GET_LOGGED_IN_USER,
  GET_ALL_USER,
  ADD_NEW_USER
} from "../actions/actionTypes";
const initialState = {
  userLogged: {},
  users: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGGED_IN_USER:
      return {
        ...state,
        userLogged: action.payload
      };
    case GET_ALL_USER:
      return {
        ...state,
        users: [...action.payload]
      };
    case ADD_NEW_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    default:
      return state;
  }
};

export default userReducer;

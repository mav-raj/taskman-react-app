import { LOGIN, LOGOUT } from "../actions/actionTypes";

const defaultState = {
  user: null,
  token: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      state = {
        user: action.payload.user,
        token: action.payload.token
      };
      return state;
    case LOGOUT:
      return {
        user: null,
        token: null
      };
    default:
      return state;
  }
};

// imports
import { LOGIN, LOGOUT } from "./actionTypes";
import { saveUser, deleteUser } from "../api/storage";

// exports

export const loginAction = (user, token) => async dispatch => {
  try {
    saveUser(user, token);
    dispatch({
      type: LOGIN,
      payload: { user, token }
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logoutAction = () => async dispatch => {
  deleteUser();
  dispatch({
    type: LOGOUT
  });
};

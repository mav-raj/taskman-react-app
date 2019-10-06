// imports
import { GET_LOGGED_IN_USER, GET_ALL_USER, ADD_NEW_USER } from "./actionTypes";

//apis
import { getUser, getUsers, createNewUser } from "../api/user";

export const getLoggedInUser = id => {
  return async dispatch => {
    try {
      const user = await getUser(id);
      dispatch({
        type: GET_LOGGED_IN_USER,
        payload: user
      });
    } catch (e) {
      window.alert("Error getting logged in user");
      console.log("Error :", e);
    }
  };
};

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const users = await getUsers();
      dispatch({
        type: GET_ALL_USER,
        payload: users
      });
    } catch (e) {
      window.alert("Error fetching users");
      console.log("Error:", e);
    }
  };
};

export const addNewUser = (name, email, password) => {
  return async dispatch => {
    try {
      const newUser = await createNewUser(name, email, password);
      dispatch({
        type: ADD_NEW_USER,
        payload: newUser
      });
    } catch (e) {
      window.alert("Error creating user, Try Again!", e);
      console.log("Error:", e);
    }
  };
};

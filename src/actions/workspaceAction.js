import { GET_ALL_WORKSPACE, ADD_NEW_WORKSPACE } from "./actionTypes";

//apis
import { getWorkspaces, createNewWorkspace } from "../api/workspace";

export const fetchWorkspaces = () => {
  return async dispatch => {
    try {
      const workspaces = await getWorkspaces();
      dispatch({
        type: GET_ALL_WORKSPACE,
        payload: workspaces
      });
    } catch (e) {
      window.alert("Error fetching workspaces");
      console.log("Error:", e);
    }
  };
};

export const addNewWorkspace = (name, description) => {
  return async dispatch => {
    try {
      const newWorkspace = await createNewWorkspace(name, description);
      dispatch({
        type: ADD_NEW_WORKSPACE,
        payload: newWorkspace
      });
    } catch (e) {
      window.alert("Error creating workspace, Try Again!", e);
      console.log("Error:", e);
    }
  };
};

import { GET_ALL_WORKSPACE } from "./actionTypes";

//apis
import { getWorkspaces } from "../api/workspace";

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

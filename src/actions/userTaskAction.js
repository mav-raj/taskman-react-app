import { GET_USER_TASK } from "./actionTypes";

//apis
import { getUserTasksById } from "../api/user";

export const fetchUserTasksById = id => {
  return async dispatch => {
    try {
      const tasks = await getUserTasksById(id);
      dispatch({
        type: GET_USER_TASK,
        payload: tasks
      });
    } catch (e) {
      window.alert("Error fetching tasks");
      console.log("Error:", e);
    }
  };
};

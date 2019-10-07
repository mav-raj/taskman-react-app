import { GET_ALL_TASK, ADD_NEW_TASK } from "./actionTypes";

//apis
import { getTasks, createNewTask } from "../api/task";

export const fetchTasks = () => {
  return async dispatch => {
    try {
      const tasks = await getTasks();
      dispatch({
        type: GET_ALL_TASK,
        payload: tasks
      });
    } catch (e) {
      window.alert("Error fetching tasks");
      console.log("Error:", e);
    }
  };
};

export const addNewTask = (
  name,
  description,
  startTime,
  endTime,
  priority,
  userAssigned,
  project
) => {
  return async dispatch => {
    try {
      const newTask = await createNewTask(
        name,
        description,
        startTime,
        endTime,
        priority,
        userAssigned,
        project
      );
      dispatch({
        type: ADD_NEW_TASK,
        payload: newTask
      });
    } catch (e) {
      window.alert("Error creating Task, Try Again!", e);
      console.log("Error:", e);
    }
  };
};

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import workspaceReducer from "./workspaceReducer";
import teamReducer from "./teamReducer";
import projectReducer from "./projectReducer";
import taskReducer from "./taskReducer";
import userTaskReducer from "./userTaskReducer";

import { LOGOUT } from "../actions/actionTypes";

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  workspace: workspaceReducer,
  team: teamReducer,
  project: projectReducer,
  task: taskReducer,
  userTasks: userTaskReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;

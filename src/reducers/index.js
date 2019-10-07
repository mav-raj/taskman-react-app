import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import workspaceReducer from "./workspaceReducer";
import teamReducer from "./teamReducer";
import projectReducer from "./projectReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  workspace: workspaceReducer,
  team: teamReducer,
  project: projectReducer,
  task: taskReducer
});

// const rootReducer = (state, action) => {
//   if (action.type === "SIGNOUT_REQUEST") {
//     // for all keys defined in your persistConfig(s)
//     storage.removeItem("persist:root");
//     // storage.removeItem('persist:otherKey')

//     state = undefined;
//   }
//   return appReducer(state, action);
// };

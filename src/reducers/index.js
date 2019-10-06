import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import workspaceReducer from "./workspaceReducer";
import teamReducer from "./teamReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  workspace: workspaceReducer,
  team: teamReducer
});

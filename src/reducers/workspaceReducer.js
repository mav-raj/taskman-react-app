import { GET_ALL_WORKSPACE } from "../actions/actionTypes";
const initialState = {
  workspaces: []
};

const workspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_WORKSPACE:
      return {
        ...state,
        workspaces: [...action.payload]
      };
    default:
      return state;
  }
};

export default workspaceReducer;

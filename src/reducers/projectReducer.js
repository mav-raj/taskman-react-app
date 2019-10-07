import { GET_ALL_PROJECTS, ADD_NEW_PROJECT } from "../actions/actionTypes";
const initialState = {
  projects: []
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECTS:
      return {
        ...state,
        projects: [...action.payload]
      };
    case ADD_NEW_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    default:
      return state;
  }
};

export default projectReducer;

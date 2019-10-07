import { GET_ALL_TASK, ADD_NEW_TASK } from "../actions/actionTypes";
const initialState = {
  tasks: []
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASK:
      return {
        ...state,
        tasks: [...action.payload]
      };
    case ADD_NEW_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    default:
      return state;
  }
};

export default taskReducer;

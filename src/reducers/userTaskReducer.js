import { GET_USER_TASK, PUT_TASK_COMPLETE } from "../actions/actionTypes";
const initialState = {
  tasks: []
};

const userTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_TASK:
      return {
        ...state,
        tasks: [...action.payload]
      };
    default:
      return state;
  }
};

export default userTaskReducer;

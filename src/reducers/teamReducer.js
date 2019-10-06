import { GET_ALL_TEAM } from "../actions/actionTypes";
const initialState = {
  teams: []
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TEAM:
      return {
        ...state,
        teams: [...action.payload]
      };
    default:
      return state;
  }
};

export default teamReducer;

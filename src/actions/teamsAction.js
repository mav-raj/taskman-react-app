import { GET_ALL_TEAM } from "./actionTypes";

//apis
import { getTeams } from "../api/team";

export const fetchTeams = () => {
  return async dispatch => {
    try {
      const teams = await getTeams();
      dispatch({
        type: GET_ALL_TEAM,
        payload: teams
      });
    } catch (e) {
      window.alert("Error fetching teams");
      console.log("Error:", e);
    }
  };
};

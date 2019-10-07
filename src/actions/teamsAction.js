import { GET_ALL_TEAM, ADD_NEW_TEAM } from "./actionTypes";

//apis
import { getTeams, createNewTeam } from "../api/team";

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

export const addNewTeam = (name, description, users) => {
  return async dispatch => {
    try {
      const newTeam = await createNewTeam(name, description, users);
      dispatch({
        type: ADD_NEW_TEAM,
        payload: newTeam
      });
    } catch (e) {
      window.alert("Error creating Team, Try Again!", e);
      console.log("Error:", e);
    }
  };
};

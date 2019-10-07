import { GET_ALL_PROJECTS, ADD_NEW_PROJECT } from "./actionTypes";

//apis
import { getProjects, createNewProject } from "../api/projects";

export const fetchProjects = () => {
  return async dispatch => {
    try {
      const projects = await getProjects();
      dispatch({
        type: GET_ALL_PROJECTS,
        payload: projects
      });
    } catch (e) {
      window.alert("Error fetching projects");
      console.log("Error:", e);
    }
  };
};
export const addNewProject = (name, description, workspace) => {
  return async dispatch => {
    try {
      const newProject = await createNewProject(name, description, workspace);
      dispatch({
        type: ADD_NEW_PROJECT,
        payload: newProject
      });
    } catch (e) {
      window.alert("Error creating Project, Try Again!", e);
      console.log("Error:", e);
    }
  };
};

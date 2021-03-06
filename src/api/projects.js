import axios from "axios";
import baseURL from "../assets/baseURL";
import QueryString from "query-string";

import { getAuthToken } from "./storage";

// URL for project
const URL = `${baseURL}/project`;

export const getProjects = async () => {
  const token = getAuthToken();
  let res = await axios.get(URL, {
    headers: {
      Authorization: token
    }
  });
  return res.data;
};
export const createNewProject = async (name, description, workspace) => {
  const token = getAuthToken();

  let res = await axios.post(
    URL,
    QueryString.stringify({ name, description, workspace }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token
      }
    }
  );
  return res.data;
};

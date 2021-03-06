import axios from "axios";
import baseURL from "../assets/baseURL";
import QueryString from "query-string";

import { getAuthToken } from "./storage";

// URL for team
const URL = `${baseURL}/team`;

export const getTeams = async () => {
  const token = getAuthToken();
  let res = await axios.get(URL, {
    headers: {
      Authorization: token
    }
  });
  return res.data;
};
export const createNewTeam = async (name, description, users) => {
  const token = getAuthToken();

  let res = await axios.post(
    URL,
    QueryString.stringify({ name, description, users }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token
      }
    }
  );
  return res.data;
};

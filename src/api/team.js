import axios from "axios";
import baseURL from "../assets/baseURL";
// import QueryString from "query-string";

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

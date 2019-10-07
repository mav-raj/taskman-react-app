import axios from "axios";
import baseURL from "../assets/baseURL";
import QueryString from "query-string";

import { getAuthToken } from "./storage";

// URL for workpace
const URL = `${baseURL}/workspace`;

export const getWorkspaces = async () => {
  const token = getAuthToken();
  let res = await axios.get(URL, {
    headers: {
      Authorization: token
    }
  });
  return res.data;
};

export const createNewWorkspace = async (name, description) => {
  const token = getAuthToken();

  let res = await axios.post(
    URL,
    QueryString.stringify({ name, description }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token
      }
    }
  );
  return res.data;
};

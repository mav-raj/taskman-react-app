import axios from "axios";
import baseURL from "../assets/baseURL";
import QueryString from "query-string";

import { getAuthToken } from "./storage";

// URL for task
const URL = `${baseURL}/task`;

export const getTasks = async () => {
  const token = getAuthToken();
  let res = await axios.get(URL, {
    headers: {
      Authorization: token
    }
  });
  return res.data;
};
export const createNewTask = async (
  name,
  description,
  start_time,
  end_time,
  priority,
  user_assigned,
  project
) => {
  const token = getAuthToken();

  let res = await axios.post(
    URL,
    QueryString.stringify({
      name,
      description,
      start_time,
      end_time,
      priority,
      user_assigned,
      project
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token
      }
    }
  );
  return res.data;
};

import axios from "axios";
import baseURL from "../assets/baseURL";
import QueryString from "query-string";

import { getAuthToken } from "./storage";

// URL for user
const URL = `${baseURL}/user`;

export const getUser = async userid => {
  const token = getAuthToken();
  let res = await axios.get(`${URL}/${userid}`, {
    headers: {
      Authorization: token
    }
  });
  return res.data;
};

export const getUsers = async () => {
  const token = getAuthToken();
  let res = await axios.get(URL, {
    headers: {
      Authorization: token
    }
  });
  return res.data;
};

export const createNewUser = async (name, email, password) => {
  const token = getAuthToken();
  console.log(name, email, password);

  let res = await axios.post(
    URL,
    QueryString.stringify({ name, email, password }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token
      }
    }
  );
  return res.data;
};

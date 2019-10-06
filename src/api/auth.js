// imports
import baseURL from "../assets/baseURL";
import axios from "axios";
import QueryString from "query-string";

class Auth {
  constructor() {
    this.isAuth = false;
    this.user = null;
    this.token = null;
  }
  authenticate = async credentials => {
    const user = await axios.post(
      `${baseURL}/login`,
      QueryString.stringify(credentials),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    this.user = user.data.user;
    this.isAuth = true;
    this.token = user.data.token;
  };
}

const auth = new Auth();
export default auth;

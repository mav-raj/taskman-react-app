import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//api
import auth from "../../api/auth";
import { getUser } from "../../api/storage";

//actions
import { loginAction } from "../../actions/authActions";
import { fetchWorkspaces } from "../../actions/workspaceAction";
import { fetchTeams } from "../../actions/teamsAction";
import { fetchUsers } from "../../actions/userAction";
import { fetchProjects } from "../../actions/projectsAction";
import { fetchTasks } from "../../actions/taskAction";
import { fetchUserTasksById } from "../../actions/userTaskAction";

import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      isAdmin: false
    };
  }

  componentDidMount() {
    let currentUser = {
      token: "",
      user: {}
    };
    currentUser = getUser();
    console.log(currentUser);

    if (currentUser.user && currentUser.user.role === "admin") {
      this.setState({ isLoggedIn: true, isAdmin: true });
      this.props.loginUser(currentUser.user, currentUser.token);
      this.props.getWorkspaces();
      this.props.getProjects();
      this.props.getTeams();
      this.props.getUsers();
      this.props.getTasks();
    }
    if (currentUser.user && currentUser.user.role === "user") {
      this.setState({ isLoggedIn: true, isAdmin: false });
      this.props.loginUser(currentUser.user, currentUser.token);
      this.props.getUserTasksById(currentUser.user.id);
    }
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const credentials = { ...this.state };

      await auth.authenticate(credentials);
      const { token, user } = auth;

      this.props.loginUser(user, token);
      let pathname = "";
      if (user.role === "admin") {
        pathname = "/dashboard/workspace";
      } else {
        pathname = "/user/dashboard";
      }
      const { state } = this.props.location;
      if (state) {
        pathname = state.from.pathname;
      }

      this.props.history.push(pathname);
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    const { email, password, isLoggedIn, isAdmin } = this.state;

    return !isLoggedIn ? (
      <div style={container}>
        <div style={cardContainer} className="card">
          <div className="row">
            <div className="col s12 center">
              <span style={{ fontSize: "20px", color: "#222" }}>Login</span>
            </div>
            <div className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    value={password}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="col s12 center">
                <a
                  className="waves-effect waves-light btn blue"
                  onClick={this.handleSubmit}
                >
                  login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : isAdmin ? (
      <Redirect to="/dashboard/workspace" />
    ) : (
      <Redirect to="/user/dashboard" />
    );
  }
}
const mapDispatchToProps = dispatch => ({
  loginUser: (user, token) => dispatch(loginAction(user, token)),
  getWorkspaces: () => dispatch(fetchWorkspaces()),
  getTeams: () => dispatch(fetchTeams()),
  getUsers: () => dispatch(fetchUsers()),
  getProjects: () => dispatch(fetchProjects()),
  getTasks: () => dispatch(fetchTasks()),
  getUserTasksById: id => dispatch(fetchUserTasksById(id))
});
export default connect(
  null,
  mapDispatchToProps
)(Login);

const container = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

const cardContainer = {
  width: "500px",
  height: "270px",
  padding: "15px"
};

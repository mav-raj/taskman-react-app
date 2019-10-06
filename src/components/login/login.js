import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//api
import auth from "../../api/auth";
import { getUser } from "../../api/storage";

//actions
import { loginAction } from "../../actions/authActions";

import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false
    };
  }

  componentDidMount() {
    const currentUser = getUser();
    if (currentUser) {
      this.setState({ isLoggedIn: true });
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

      this.props.loginAction(user, token);

      let pathname = "/dashboard/workspace";
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
    const { email, password, isLoggedIn } = this.state;

    return !isLoggedIn ? (
      <div style={container}>
        <div style={cardContainer} className="card">
          <div className="row">
            <div className="col s12 center">
              <span style={{ fontSize: "20px", color: "#222" }}>
                User Login
              </span>
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
    ) : (
      <Redirect to="/dashboard/workspace" />
    );
  }
}

export default connect(
  null,
  { loginAction }
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
  height: "310px",
  padding: "15px"
};

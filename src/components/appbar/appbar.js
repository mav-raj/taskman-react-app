import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import M from "materialize-css";
import "./appbar.css";

import { connect } from "react-redux";

import { deleteUser } from "../../api/storage";
import { logoutAction } from "../../actions/authActions";

class Appbar extends Component {
  state = {
    loggedInUser: {
      name: ""
    }
  };

  componentDidMount() {
    this.setState({
      loggedInUser: this.props.auth.user
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let dropdown = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdown, {});
  }

  handleLogoutClick = () => {
    this.props.logoutUser();
  };

  render() {
    const { loggedInUser } = this.state;

    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <NavLink onClick={this.handleLogoutClick} exact to="/">
              Logout
            </NavLink>
          </li>
        </ul>
        <nav>
          <div className="nav-wrapper teal">
            <NavLink
              className="brand-logo center"
              activeClassName="active"
              exact
              to="/"
            >
              Taskman
            </NavLink>

            <ul className="right hide-on-med-and-down">
              {loggedInUser && loggedInUser.role === "admin" ? (
                <span>
                  <li>
                    <NavLink
                      activeClassName="active"
                      exact
                      className="nav-link"
                      to="/dashboard/workspace"
                    >
                      Workspaces
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName="active"
                      exact
                      className="nav-link"
                      to="/dashboard/team"
                    >
                      Teams
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName="active"
                      exact
                      className="nav-link"
                      to="/dashboard/user"
                    >
                      Users
                    </NavLink>
                  </li>
                  <li>
                    <a href="#">
                      <i className="material-icons">notifications</i>
                    </a>
                  </li>
                </span>
              ) : null}

              <li style={avatarContainer}>
                <a
                  className="dropdown-trigger"
                  data-target="dropdown1"
                  style={avatarCustom}
                >
                  {loggedInUser.name !== ""
                    ? loggedInUser.name.split("")[0]
                    : null}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutAction())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Appbar);

// Styles

const avatarContainer = {
  position: "relative",
  width: "40px",
  height: "40px",
  background: "#fff",
  borderRadius: "35px",
  top: "10px",
  margin: "0px 10px"
};
const avatarCustom = {
  position: "absolute",
  width: "40px",
  height: "40px",
  textAlign: "center",
  lineHeight: "40px",
  verticalAlign: "middle",
  fontSize: "17px",
  color: "#222"
};

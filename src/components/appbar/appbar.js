import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import M from "materialize-css";
import "./appbar.css";

import { deleteUser } from "../../api/storage";

class Appbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    let dropdown = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdown, {});
  }

  handleLogoutClick = () => {
    deleteUser();
  };

  render() {
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
              <li style={avatarContainer}>
                <a
                  className="dropdown-trigger"
                  data-target="dropdown1"
                  style={avatarCustom}
                >
                  A
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

// const mapStateToProps = ({}) => ({});
export default Appbar;

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

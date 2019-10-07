import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import M from "materialize-css";
import "./user.css";

import { fetchUsers, addNewUser } from "../../actions/userAction";
import { connect } from "react-redux";

class User extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  componentDidMount() {
    this.props.getUsers();
    let modal = document.querySelectorAll(".modal");
    M.Modal.init(modal, {});
  }

  // componentDidUpdate(prevProps, prevState) {
  //   let modal = document.querySelectorAll(".modal");
  //   M.Modal.init(modal, {});
  // }

  handleInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleAddUserClick = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    this.props.addUser(name, email, password);
  };
  renderSingleuserItem = (id, name, description) => {
    return (
      <li className="collection-item" key={id}>
        <div>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>{name}</span>
          <br />
          <span style={{ marginLeft: "5px" }}>{description}</span>
          {/* <a href="#!" className="secondary-content">
            <i className="material-icons">arrow_forward</i>
          </a> */}
        </div>
      </li>
    );
  };

  render() {
    let users = [];
    users = this.props.user.users;
    let { name, email, password } = this.state;
    return (
      <div>
        <div className="container">
          <ul className="collection with-header">
            <li className="collection-header">
              {users.length === 0 ? (
                <h4>No user created..create one</h4>
              ) : (
                <h4>Active users</h4>
              )}
            </li>
            {users.map(user =>
              this.renderSingleuserItem(user._id, user.name, user.email)
            )}
            <li className="collection-item">
              <a className="modal-trigger" href="#add">
                Add more users
              </a>
            </li>
          </ul>
        </div>

        <div id="add" className="modal">
          <div className="container">
            <div className="modal-content">
              <h4>Add User</h4>
              <div className="row">
                <form
                  className="col s12 m12 l12"
                  onSubmit={this.handleAddUserClick}
                >
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="validate"
                      value={name}
                      required
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="validate"
                      required
                      value={email}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix">fingerprint</i>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="validate"
                      required
                      value={password}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="col s12">
                    <input
                      type="submit"
                      className="btn teal"
                      value="Add"
                      style={{ cursor: "pointer", fontSize: "20px" }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(fetchUsers()),
  addUser: (name, email, password) =>
    dispatch(addNewUser(name, email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

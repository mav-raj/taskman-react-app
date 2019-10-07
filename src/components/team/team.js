import React, { Component } from "react";
import M from "materialize-css";

import { fetchTeams, addNewTeam } from "../../actions/teamsAction";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Team extends Component {
  state = {
    name: "",
    description: "",
    users: []
  };
  select = null;
  users = [];
  componentDidMount() {
    this.props.getTeams();
    let modal = document.querySelectorAll(".modal");
    let select = document.querySelectorAll("select");
    this.select = M.FormSelect.init(select);
    M.FormSelect.init(select, {});
    M.Modal.init(modal, {});
    this.setState({
      users: this.props.user.users
    });
  }
  componentDidUpdate(prevProps, prevState) {
    let elem = document.querySelectorAll("select");
    this.select = M.FormSelect.init(elem, {});
    M.FormSelect.init(elem, {});
  }
  handleInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleAddTeamClick = event => {
    event.preventDefault();
    const { name, description } = this.state;
    this.props.addTeam(name, description, this.users);
  };
  handleSelectChange = () => {
    let selectedOptionHTML = [...this.select[0].el.selectedOptions];
    this.users = [];
    for (const item of selectedOptionHTML) {
      this.users.push(item.value);
    }
  };

  renderSingleTeamItem = (id, name, description) => {
    return (
      <li className="collection-item" key={id}>
        <div>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>{name}</span>
          <br />
          <span style={{ marginLeft: "5px" }}>{description}</span>
          <a href="#!" className="secondary-content">
            <i className="material-icons">arrow_forward</i>
          </a>
        </div>
      </li>
    );
  };

  render() {
    let { name, description, users } = this.state;
    let teams = [];
    teams = this.props.team.teams;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s12 m6 l6">
              <ul className="collection with-header">
                <li className="collection-header">
                  {teams.length === 0 ? (
                    <h4>No teams..create one</h4>
                  ) : (
                    <h4>Teams</h4>
                  )}
                </li>
                {teams.map(team =>
                  this.renderSingleTeamItem(
                    team._id,
                    team.name,
                    team.description
                  )
                )}
                <li className="collection-item">
                  <a className="modal-trigger" href="#add">
                    Add more teams
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="add" className="modal">
          <div className="container">
            <div className="modal-content">
              <h4>Add new team</h4>
              <div className="row">
                <form
                  className="col s12 m12 l12"
                  onSubmit={this.handleAddTeamClick}
                >
                  <div className="input-field col s12">
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
                    <input
                      id="description"
                      name="description"
                      type="text"
                      className="validate"
                      value={description}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="email">Description</label>
                  </div>
                  <div className="input-field col s12">
                    <select multiple onChange={this.handleSelectChange}>
                      <option value="" disabled defaultValue>
                        Select Users
                      </option>
                      {users.map(user => {
                        return (
                          <option value={user._id} key={user._id}>
                            {user.name}
                          </option>
                        );
                      })}
                    </select>
                    <label>Add Users</label>
                  </div>
                  <div className="col s12">
                    <input
                      type="submit"
                      className="btn teal"
                      value="Add"
                      style={{ cursor: "pointer", fontSize: "16px" }}
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

const mapStateToProps = ({ team, user }) => ({ team, user });
const mapDispatchToProps = dispatch => ({
  getTeams: () => dispatch(fetchTeams()),
  addTeam: (name, description, users) =>
    dispatch(addNewTeam(name, description, users))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team);

import React, { Component } from "react";

import { fetchTeams } from "../../actions/teamsAction";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Team extends Component {
  componentDidMount() {
    this.props.getTeams();
  }

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
    let teams = [];
    teams = this.props.team.teams;
    return (
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
                this.renderSingleTeamItem(team._id, team.name, team.description)
              )}
              <li className="collection-item">
                <NavLink to="/">Create team</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ team }) => ({ team });
const mapDispatchToProps = dispatch => ({
  getTeams: () => dispatch(fetchTeams())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team);

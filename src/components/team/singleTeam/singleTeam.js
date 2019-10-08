import React, { Component } from "react";
import { connect } from "react-redux";

class SingleTeam extends Component {
  state = {
    name: "",
    description: "",
    users: []
  };
  teamId = "";
  componentDidMount() {
    this.teamId = this.props.match.params.id;
    let team = {};
    if (!this.teamId) {
      team = {
        name: "",
        description: "",
        users: []
      };
    } else {
      console.log(this.teamId);
      console.log(this.props.team.teams);

      team = this.props.team.teams.filter(t => t._id === this.teamId)[0];
      console.log(team);

      if (!team) {
        team = {
          name: "",
          description: "",
          users: []
        };
      }
    }
    this.setState({
      name: team.name,
      description: team.description,
      users: [...team.users]
    });
  }

  renderUser = (id, name, email) => {
    return (
      <li className="collection-item" key={id}>
        <div>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>{name}</span>
          <br />
          <span style={{ marginLeft: "5px" }}>{email}</span>
        </div>
      </li>
    );
  };

  render() {
    const { name, description, users } = this.state;
    return (
      <div>
        <div className="container">
          <ul className="collection with-header">
            <li className="collection-header">
              <h4>{name}</h4>
              <p>{description}</p>
            </li>
            <li className="collection-header">
              {users.length === 0 ? (
                <h5>No user in this team</h5>
              ) : (
                <h5>Users</h5>
              )}
            </li>
            {users.map(user =>
              this.renderUser(user._id, user.name, user.email)
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ team, user }) => ({ team, user });

export default connect(mapStateToProps)(SingleTeam);

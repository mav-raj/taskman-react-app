import React, { Component } from "react";
import "./workspace.css";
import { fetchWorkspaces } from "../../actions/workspaceAction";
import { connect } from "react-redux";

class Workspace extends Component {
  componentDidMount() {
    this.props.getWorkspaces();
  }

  renderSingleWorkspaceItem = (id, name, description) => {
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
    let workspaces = [];
    workspaces = this.props.workspace.workspaces;
    return (
      <div className="container">
        <ul className="collection with-header">
          <li className="collection-header">
            {workspaces.length === 0 ? (
              <h4>Your workspace is empty..create one</h4>
            ) : (
              <h4>Your Workspaces</h4>
            )}
          </li>
          {workspaces.map(workspace =>
            this.renderSingleWorkspaceItem(
              workspace._id,
              workspace.name,
              workspace.description
            )
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ workspace }) => ({ workspace });
const mapDispatchToProps = dispatch => ({
  getWorkspaces: () => dispatch(fetchWorkspaces())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);

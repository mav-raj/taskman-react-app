import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import M from "materialize-css";
import "./workspace.css";
import {
  fetchWorkspaces,
  addNewWorkspace
} from "../../actions/workspaceAction";
import { connect } from "react-redux";
class Workspace extends Component {
  state = {
    name: "",
    description: ""
  };
  componentDidMount() {
    this.props.getWorkspaces();
    let modal = document.querySelectorAll(".modal");
    M.Modal.init(modal, {});
  }

  handleInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleAddWorkspaceClick = event => {
    event.preventDefault();
    const { name, description } = this.state;
    this.props.addWorkspace(name, description);
  };

  renderSingleWorkspaceItem = (id, name, description) => {
    return (
      <li className="collection-item" key={id}>
        <div>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>{name}</span>
          <br />
          <span style={{ marginLeft: "5px" }}>{description}</span>
          <NavLink
            exact
            to={`/dashboard/workspace/${id}`}
            className="secondary-content"
          >
            <i className="material-icons">arrow_forward</i>
          </NavLink>
        </div>
      </li>
    );
  };
  render() {
    let { name, description } = this.state;
    let workspaces = [];
    workspaces = this.props.workspace.workspaces;
    return (
      <div>
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
            <li className="collection-item">
              <a className="modal-trigger" href="#add">
                Add more workspaces
              </a>
            </li>
          </ul>
        </div>

        <div id="add" className="modal">
          <div className="container">
            <div className="modal-content">
              <h4>Add Workspace</h4>
              <div className="row">
                <form
                  className="col s12 m12 l12"
                  onSubmit={this.handleAddWorkspaceClick}
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
                    <label htmlFor="name">Workspace Name</label>
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
                    <label htmlFor="email">Workspace Description</label>
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

const mapStateToProps = ({ workspace }) => ({ workspace });
const mapDispatchToProps = dispatch => ({
  getWorkspaces: () => dispatch(fetchWorkspaces()),
  addWorkspace: (name, description) =>
    dispatch(addNewWorkspace(name, description))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);

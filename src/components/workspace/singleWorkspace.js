import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import M from "materialize-css";

//actions
import { addNewProject, fetchProjects } from "../../actions/projectsAction";

class SingleWorkspace extends Component {
  state = {
    name: "",
    description: "",
    // projects: [],
    newProjectName: "",
    newProjectDescription: ""
  };
  id = "";
  componentDidMount() {
    this.id = this.props.match.params.id;
    let modal = document.querySelectorAll(".modal");
    M.Modal.init(modal, {});
    let workspace = {};
    if (!this.id) {
      workspace = {
        name: "",
        description: ""
      };
    } else {
      workspace = this.props.workspace.workspaces.filter(
        ws => ws._id === this.id
      )[0];
      // preventing from crash if reached by direct route
      if (!workspace) {
        workspace = {
          name: "",
          description: ""
        };
      }
    }
    // let projectsInThisWorkspace = [];
    // projectsInThisWorkspace = this.props.project.projects.filter(
    //   project => project.workspace === this.id
    // );
    // console.log(projectsInThisWorkspace);

    this.setState({
      name: workspace.name,
      description: workspace.description
      // projects: [...projectsInThisWorkspace]
    });
  }

  handleInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleAddWorkspaceClick = event => {
    event.preventDefault();
    const { newProjectName, newProjectDescription } = this.state;
    this.props.addProject(newProjectName, newProjectDescription, this.id);
  };

  renderProject = (id, name, description) => {
    return (
      <li className="collection-item" key={id}>
        <div>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>{name}</span>
          <br />
          <span style={{ marginLeft: "5px" }}>{description}</span>
          <NavLink
            exact
            to={`/dashboard/workspace/project/${id}`}
            className="secondary-content"
          >
            <i className="material-icons">arrow_forward</i>
          </NavLink>
        </div>
      </li>
    );
  };
  render() {
    const {
      name,
      description,
      newProjectName,
      newProjectDescription
    } = this.state;
    let projects = [];
    projects = this.props.project.projects.filter(
      project => project.workspace === this.id
    );
    return (
      <div>
        <div className="container">
          <ul className="collection with-header">
            <li className="collection-header">
              <h4>{name}</h4>
              <p>{description}</p>
            </li>
            <li className="collection-header">
              {projects.length === 0 ? (
                <h5>No projects in this workspace</h5>
              ) : (
                <h5>Projects</h5>
              )}
            </li>
            {projects.map(project =>
              this.renderProject(project._id, project.name, project.description)
            )}

            <li className="collection-item">
              <a className="modal-trigger" href="#add">
                Add more projects
              </a>
            </li>
          </ul>
        </div>

        <div id="add" className="modal">
          <div className="container">
            <div className="modal-content">
              <h4>Add Project</h4>
              <div className="row">
                <form
                  className="col s12 m12 l12"
                  onSubmit={this.handleAddWorkspaceClick}
                >
                  <div className="input-field col s12">
                    <input
                      id="newProjectName"
                      name="newProjectName"
                      type="text"
                      className="validate"
                      value={newProjectName}
                      required
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="name">Project Name</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="newProjectDescription"
                      name="newProjectDescription"
                      type="text"
                      className="validate"
                      value={newProjectDescription}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="email">Project Description</label>
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

const mapStateToProps = ({ workspace, project }) => ({ workspace, project });
const mapDispatchToProps = dispatch => ({
  addProject: (name, description, workspace) =>
    dispatch(addNewProject(name, description, workspace)),
  getProjects: () => dispatch(fetchProjects())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleWorkspace);

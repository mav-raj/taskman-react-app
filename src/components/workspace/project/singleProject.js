import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import M from "materialize-css";
import "./singleProject.css";
// actions
import { addNewTask, fetchTasks } from "../../../actions/taskAction";

class SingleProject extends Component {
  state = {
    name: "",
    description: "",
    users: [],
    newTaskName: "",
    newTaskDescription: "",
    newTaskPriority: 1
  };
  projectId = "";
  startTime = "";
  endTime = "";
  datepickerInstance = "";
  selectInstance = "";
  userAssigned = "";

  componentDidMount() {
    this.projectId = this.props.match.params.id;
    let modal = document.querySelectorAll(".modal");
    let datepicker = document.querySelectorAll(".datepicker");
    let select = document.querySelectorAll("select");
    M.FormSelect.init(select, {});
    M.Datepicker.init(datepicker, { autoClose: true });
    M.Modal.init(modal, {});
    let project = {};
    if (!this.projectId) {
      project = {
        name: "",
        description: ""
      };
    } else {
      project = this.props.project.projects.filter(
        p => p._id === this.projectId
      )[0];
      // preventing from crash if reached by direct route
      if (!project) {
        project = {
          name: "",
          description: ""
        };
      }
    }

    this.setState({
      name: project.name,
      description: project.description,
      users: [...this.props.user.users]
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let datepicker = document.querySelectorAll(".datepicker");
    let select = document.querySelectorAll("select");
    this.selectInstance = M.FormSelect.init(select, {});
    this.datepickerInstance = M.Datepicker.init(datepicker, {
      autoClose: true
    });
  }

  handleInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleAddTaskClick = event => {
    event.preventDefault();
    const { newTaskName, newTaskDescription, newTaskPriority } = this.state;
    this.startTime = this.datepickerInstance[0].date;
    this.endTime = this.datepickerInstance[1].date;
    let userAssigned = this.selectInstance[0].el.value;

    this.props.addTask(
      newTaskName,
      newTaskDescription,
      this.startTime,
      this.endTime,
      newTaskPriority,
      userAssigned,
      this.projectId
    );
    // console.log(this.selectInstance);
  };

  renderTask = (id, name, description, start_time, end_time, user_assigned) => {
    let flag = "";
    let currentTime = new Date();
    let startTime = new Date(start_time);
    let endTime = new Date(end_time);
    if (currentTime < startTime) {
      flag = "yet to start";
    } else {
      if (currentTime < endTime) {
        flag = "ongoing";
      } else {
        flag = "exceded";
      }
    }
    console.log(flag);

    return (
      <li className="collection-item" key={id}>
        <div className="collection-list">
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>{name}</span>
          <br />
          {/* <span style={{ marginLeft: "5px" }}>{description}</span> */}
          <span>Start: {new Date(start_time).toLocaleDateString()}</span>
          <br />
          <span>End: {new Date(end_time).toLocaleDateString()}</span>
          <br />
          {flag === "yet to start" ? (
            <span>
              <div className="cus-badge-normal">not started</div>
            </span>
          ) : flag === "ongoing" ? (
            <span>
              <div className="cus-badge-warn">ongoing</div>
            </span>
          ) : (
            <span>
              <div className="cus-badge-danger">exceded</div>
            </span>
          )}
          <br />
          <span>
            User Assigned: {user_assigned.name} {user_assigned.email}
          </span>
          {/* <NavLink
            exact
            to={`/dashboard/workspace/project/task/${id}`}
            className="secondary-content"
          >
            <i className="material-icons">arrow_forward</i>
          </NavLink> */}
        </div>
      </li>
    );
  };
  render() {
    const {
      name,
      description,
      users,
      newTaskName,
      newTaskDescription,
      newTaskPriority
    } = this.state;
    let tasks = [];
    tasks = this.props.task.tasks.filter(
      task => task.project === this.projectId
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
              {tasks.length === 0 ? (
                <h5>No task in this project</h5>
              ) : (
                <h5>Tasks</h5>
              )}
            </li>
            {tasks.map(task =>
              this.renderTask(
                task._id,
                task.name,
                task.description,
                task.start_time,
                task.end_time,
                task.user_assigned
              )
            )}

            <li className="collection-item">
              <a className="modal-trigger" href="#add">
                Add more tasks
              </a>
            </li>
          </ul>
        </div>

        <div id="add" className="modal">
          <div className="container">
            <div className="modal-content">
              <h4>Add Task</h4>
              <div className="row">
                <form
                  className="col s12 m12 l12"
                  onSubmit={this.handleAddTaskClick}
                >
                  <div className="input-field col s12">
                    <input
                      id="newTaskName"
                      name="newTaskName"
                      type="text"
                      className="validate"
                      value={newTaskName}
                      required
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="newTaskName">Task Name</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="newTaskDescription"
                      name="newTaskDescription"
                      type="text"
                      className="validate"
                      value={newTaskDescription}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="newTaskDescription">Task Description</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="newTaskPriority"
                      name="newTaskPriority"
                      type="number"
                      className="validate"
                      value={newTaskPriority}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="newTaskPriority">
                      Task Priority [1 - 10]
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      type="text"
                      className="datepicker"
                      id="startTime"
                      name="startTime"
                    />
                    <label htmlFor="startTime">Start date</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      type="text"
                      className="datepicker"
                      id="endTime"
                      name="endTime"
                    />
                    <label htmlFor="endTime">End date</label>
                  </div>
                  <div className="input-field col s12">
                    <select>
                      <option value="" disabled selected>
                        Choose your option
                      </option>
                      {users.map(user => {
                        return (
                          <option value={user._id} key={user._id}>
                            {user.name}
                          </option>
                        );
                      })}
                    </select>
                    <label>Assigned To</label>
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
const mapStateToProps = ({ project, task, user }) => ({ project, task, user });
const mapDispatchToProps = dispatch => ({
  addTask: (
    name,
    description,
    startTime,
    endTime,
    priority,
    userAssigned,
    project
  ) =>
    dispatch(
      addNewTask(
        name,
        description,
        startTime,
        endTime,
        priority,
        userAssigned,
        project
      )
    ),
  getTasks: () => dispatch(fetchTasks())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProject);

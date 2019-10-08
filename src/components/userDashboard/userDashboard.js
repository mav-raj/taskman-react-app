import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserTasksById } from "../../actions/userTaskAction";
// apis
import { getUser } from "../../api/storage";
import { putTaskCompleteById } from "../../api/user";
class UserDashboard extends Component {
  userId = "";
  componentDidMount() {
    let currentUser = {
      token: "",
      user: {}
    };
    currentUser = getUser();
    this.userId = currentUser.user.id;

    if (currentUser.user) {
      this.props.getUserTasksById(this.userId);
    }
  }

  handleFlagClick = async taskId => {
    try {
      let updatedTask = await putTaskCompleteById(taskId);
      console.log(updatedTask);
      this.props.getUserTasksById(this.userId);
    } catch (e) {
      window.alert("Error updating task");
      console.log(e);
    }
  };

  renderTask = (
    id,
    name,
    description,
    start_time,
    end_time,
    user_assigned,
    isUpdated
  ) => {
    let flag = "";
    let currentTime = new Date();
    let startTime = new Date(start_time);
    let endTime = new Date(end_time);

    if (isUpdated) {
      flag = "completed";
    } else {
      if (currentTime < startTime) {
        flag = "yet to start";
      } else {
        if (currentTime < endTime) {
          flag = "ongoing";
        } else {
          flag = "exceded";
        }
      }
    }

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
              <div
                className="cus-badge-normal"
                onClick={() => this.handleFlagClick(id)}
              >
                not started
              </div>
            </span>
          ) : flag === "ongoing" ? (
            <span>
              <div
                className="cus-badge-warn"
                onClick={() => this.handleFlagClick(id)}
              >
                ongoing
              </div>
            </span>
          ) : flag === "exceded" ? (
            <span>
              <div
                className="cus-badge-danger"
                onClick={() => this.handleFlagClick(id)}
              >
                exceded
              </div>
            </span>
          ) : (
            <span>
              <div
                className="cus-badge-safe"
                onClick={() => this.handleFlagClick(id)}
              >
                completed
              </div>
            </span>
          )}
          <br />
        </div>
      </li>
    );
  };
  render() {
    let tasks = [];
    tasks = [...this.props.userTasks.tasks];
    return (
      <div className="container">
        <ul className="collection with-header">
          <li className="collection-header">
            {tasks.length === 0 ? (
              <h5>No tasks assigned to you yet. Enjoy!!</h5>
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
              task.user_assigned,
              task.isUpdated
            )
          )}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserTasksById: id => dispatch(fetchUserTasksById(id))
});
const mapStateToProps = ({ userTasks }) => ({ userTasks });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboard);

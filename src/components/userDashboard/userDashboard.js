import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserTasksById } from "../../actions/userTaskAction";
import { getUser } from "../../api/storage";
class UserDashboard extends Component {
  componentDidMount() {
    let currentUser = {
      token: "",
      user: {}
    };
    currentUser = getUser();
    console.log(currentUser);

    if (currentUser.user) {
      this.props.getUserTasksById(currentUser.user.id);
    }
  }
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
          <li className="collec tion-header">
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
              task.user_assigned
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

// imports
import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

// components - imports
import Appbar from "./components/appbar/appbar";
import Login from "./components/login/login";
import PrivateRoute from "./components/privateRoute/privateRoute";
import UserDashboard from "./components/userDashboard/userDashboard";
import Workspace from "./components/workspace/workspace";
import Team from "./components/team/team";
import User from "./components/user/user";
import SingleWorkspace from "./components/workspace/singleWorkspace";
import SingleProject from "./components/workspace/project/singleProject";
import SingleTeam from "./components/team/singleTeam/singleTeam";

//
class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        {this.props.location.pathname !== "/" ? <Appbar /> : ""}
        <Switch>
          <Route path="/" exact component={Login} />
          <PrivateRoute
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />
          <PrivateRoute
            path="/dashboard/workspace"
            exact
            component={Workspace}
          />
          <PrivateRoute
            path="/dashboard/workspace/:id"
            exact
            component={SingleWorkspace}
          />
          <PrivateRoute
            path="/dashboard/workspace/project/:id"
            exact
            component={SingleProject}
          />
          <PrivateRoute
            path="/dashboard/team/:id"
            exact
            component={SingleTeam}
          />
          <PrivateRoute path="/dashboard/team" exact component={Team} />
          <PrivateRoute path="/dashboard/user" exact component={User} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

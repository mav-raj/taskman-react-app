// imports
import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

// components - imports
import Appbar from "./components/appbar/appbar";
import Login from "./components/login/login";
import PrivateRoute from "./components/privateRoute/privateRoute";
// import Dashboard from "./components/dashboard/dashboard";
import Workspace from "./components/workspace/workspace";
import Team from "./components/team/team";
import User from "./components/user/user";

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
            path="/dashboard/workspace"
            exact
            component={Workspace}
          />
          <PrivateRoute path="/dashboard/team" exact component={Team} />
          <PrivateRoute path="/dashboard/user" exact component={User} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

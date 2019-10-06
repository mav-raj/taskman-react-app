import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getUser } from "../../api/storage";

const PrivateRoute = ({ component: Component, admin, ...rest }) => {
  const user = getUser();

  let result = user ? true : false;

  return (
    <Route
      {...rest}
      render={props =>
        result === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

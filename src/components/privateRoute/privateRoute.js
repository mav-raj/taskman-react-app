import React from "react";
import { Route, Redirect } from "react-router-dom";
import Store from "../../store/store";

// import { getUser } from "../../api/storage";

const PrivateRoute = ({ component: Component, admin, ...rest }) => {
  // const user = getUser();
  const store = Store.getState();

  let result = store.auth.user ? true : false;

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

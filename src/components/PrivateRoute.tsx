import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";

interface IPrivateRouteProps {
  component: any;
  exact: boolean;
  path?: string;
}

export const PrivateRoute: FunctionComponent<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

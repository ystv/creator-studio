import React from "react";
import { RouteComponentProps, Route, Redirect } from "react-router-dom";
import getToken from "./Auth";
import { UserInfo } from "../contexts/UserContext";
import { NonAuthRoutes } from "./Routes";

interface Props {
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
  requiredRoles: string[];
}

const AuthRoute = ({
  Component,
  path,
  exact = false,
  requiredRoles,
}: Props) => {
  const token = getToken();
  const userinfo = UserInfo();
  if (userinfo) {
    const userHasRequiredRole = userinfo.permissions.some((permission) =>
      requiredRoles.includes(permission.name)
    );
    const message = userHasRequiredRole
      ? "Please log in to view this page"
      : "Unauthorized";
    return (
      <Route
        exact={exact}
        path={path}
        render={(props: RouteComponentProps) =>
          process.env.REACT_APP_SECURITY_TYPE === "NONE" ||
          (token && userHasRequiredRole) ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: userHasRequiredRole
                  ? NonAuthRoutes.unauthorized
                  : NonAuthRoutes.login,
                state: {
                  message,
                  requestedPath: path,
                },
              }}
            />
          )
        }
      />
    );
  }
  return <Redirect to={"/"} />;
};

export default AuthRoute;

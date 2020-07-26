import React from "react";
import { RouteComponentProps, Route, Redirect } from "react-router-dom";
import getToken from "./Auth";
import { UserInfo } from "../contexts/UserContext";
import { UserRoles } from "./UserRoles";
import { NonAuthRoutes } from "./Routes";

interface Props {
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
  requiredRoles: UserRoles;
}

const AuthRoute = ({
  Component,
  path,
  exact = false,
  requiredRoles,
}: Props): JSX.Element => {
  const token = getToken();
  const { roles } = UserInfo();
  const userHasRequiredRole = roles.some((role) =>
    requiredRoles.includes(role)
  );
  console.log(token);
  console.log(roles);
  console.log(requiredRoles);
  console.log(userHasRequiredRole);
  const message = userHasRequiredRole
    ? "Please log in to view this page"
    : "Unauthorized";
  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) =>
        token && userHasRequiredRole ? (
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
};

export default AuthRoute;

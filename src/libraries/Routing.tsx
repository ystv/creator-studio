import React, { useEffect, useState } from "react";
import { RouteComponentProps, Route, Redirect } from "react-router-dom";
import getToken, { APIToken } from "./Auth";
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
  const [token, setToken] = useState<APIToken>();
  useEffect(() => {
    const getEnv = async () => {
      await getToken().then((token) => {
        setToken(token);
      });
      getEnv();
    };
  }, []);
  if (token) {
    const userHasRequiredRole = token.perms.some((permission) =>
      requiredRoles.includes(permission.name)
    );
    const message = "Unauthorized";
    return (
      <Route
        exact={exact}
        path={path}
        render={(props: RouteComponentProps) =>
          process.env.REACT_APP_SECURITY_TYPE === "NONE" ||
          userHasRequiredRole ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: NonAuthRoutes.unauthorized,
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
  return <h1>Uh oh</h1>;
};

export default AuthRoute;

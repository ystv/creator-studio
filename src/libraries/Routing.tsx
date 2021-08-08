import React, { useEffect, useState } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { APIToken } from "../types/APIToken";
import userRoles from "../types/User";
import getToken from "./Auth";
import { NonAuthRoutes } from "./Routes";

interface Props extends RouteProps {
  requiredRoles?: string[];
}

const AuthRoute:React.FC<Props> = (props) => {
  const [token, setToken] = useState<APIToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      getToken()
        .then((gotToken) => {
          setToken(gotToken);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    getData();
  }, []);

  if (!isLoading) {
    if (token === null) {
      return <Redirect to="/login" />;
    }

    let reqRoles: string[]
    // if a reqRole wasn't given, default to all
    props.requiredRoles ? reqRoles = props.requiredRoles : reqRoles = userRoles.all
    
    const userHasRequiredRole = token?.perms.some((permission) =>
      reqRoles.includes(permission.name)
    );
    const message = "Unauthorized";
    if (process.env.REACT_APP_SECURITY_TYPE === "NONE" ||
    userHasRequiredRole || reqRoles === userRoles.all) {
      return (
        <Route
          {...props}
        />
      );
    }
     return (
       <Redirect to={{
        pathname: NonAuthRoutes.unauthorized,
        state: {
          message,
          requestedPath: props.path,
        },
      }}/>
     )
  }

  return <h1>Loading</h1>;
};

export default AuthRoute;

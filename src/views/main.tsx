import React, { useEffect, useState } from "react";
import GlobalNavigation from "../components/GlobalNavigation";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "../styles/main.css";
import UserProvider from "../contexts/UserProvider";
import Settings from "../views/settings";
import NotFound from "../views/NotFound";
import AuthRoute from "../libraries/Routing";
import userRoles, { IUser } from "../types/User";
import NotImplemented from "../views/NotImplemented";
import { AuthRoutes, NonAuthRoutes } from "../libraries/Routes";
import NotAuthorized from "./NotAuthorized";
import Login from "./login";
import { User } from "../api/api";
import Loading from "./loading";
import VOD from "./vod";
import Live from "./live";

const Main: React.FC = (): JSX.Element => {
  const [userData, setUserData] = useState<IUser>();
  const [motd, setMotd] = useState<string>("Loading...");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  useEffect(() => {
    User.getUser()
    .then(data => {
      setUserData(data);
      setIsLoggedIn(true);
    })
    .catch(err => {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 500) {
          setMotd("Server side error, message computing team");
        } else {
          setMotd("No session found")
          setIsLoggedIn(false);
        }
      } else {
        setMotd("Failed to get user data: " + err.message);
        setIsLoggedIn(false);
      }
    });
  }, [isLoggedIn]);

  switch(isLoggedIn) {
    case undefined:
      return <Loading msg={motd} />
    case false:
      return <Login />
    case true:
      return (
        <UserProvider user={userData}>
        <Layout style={{ height: "100vh" }}>
          <GlobalNavigation />
          <Layout>
            <Switch>
                <AuthRoute path="/live">
                  <Live />
                </AuthRoute>
                <AuthRoute>
                  <VOD />
                </AuthRoute>
                <AuthRoute
                    path={AuthRoutes.moderation}
                    component={NotImplemented}
                    requiredRoles={userRoles.moderator}
                  />
                  <AuthRoute path={AuthRoutes.settings} component={Settings} />
                  <Route
                    path={NonAuthRoutes.unauthorized}
                    component={NotAuthorized}
                  />
                  <Route path="/login" component={Login} />
                  <AuthRoute component={NotFound} />
              </Switch>
            
          </Layout>
        </Layout>
    </UserProvider>
      )
  }
};

export default Main;

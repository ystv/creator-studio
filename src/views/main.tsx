import React, { useEffect, useState } from "react";
import GlobalNavigation from "../components/GlobalNavigation";
import Navbar from "../components/Navbar";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "../styles/main.css";
import UserProvider from "../contexts/UserProvider";
import Home from "../views/home";
import Videos from "../views/videos/videos";
import Settings from "../views/settings";
import Series from "../views/series/series";
import Playlists from "../views/playlists/playlists";
import NotFound from "../views/NotFound";
import AuthRoute from "../libraries/Routing";
import userRoles, { IUser } from "../types/User";
import NotImplemented from "../views/NotImplemented";
import { AuthRoutes, NonAuthRoutes } from "../libraries/Routes";
import NotAuthorized from "./NotAuthorized";
import Login from "./login";
import Wizard from "../views/uploadForm";
import EncodeFormats from "./encodes/formats";
import EncodePresets from "./encodes/presets";
import { User } from "../api/api";
import Loading from "./loading";

const { Content } = Layout;

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
            <Navbar />
            <Layout style={{ padding: "24px 24px 24px" }}>
              <Content
                className="site-layout-background"
                style={{ padding: 24, margin: 0, minHeight: 280 }}
              >
                <Switch>
                  <AuthRoute exact path={AuthRoutes.home} component={Home} />
                  <AuthRoute path={AuthRoutes.upload} component={Wizard} />
                  <AuthRoute path="/my/videos">
                    <Videos user="my" />
                  </AuthRoute>
                  <AuthRoute path={AuthRoutes.videos} component={Videos} />
                  <AuthRoute path={AuthRoutes.series} component={Series} />
                  <AuthRoute path={AuthRoutes.playlists} component={Playlists} />
                  <AuthRoute path="/encodes/formats" component={EncodeFormats} />
                  <AuthRoute path="/encodes/presets" component={EncodePresets} />
                  <AuthRoute path={AuthRoutes.encodes} component={NotImplemented} />
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
              </Content>
            </Layout>
          </Layout>
        </Layout>
    </UserProvider>
      )
  }
};

export default Main;

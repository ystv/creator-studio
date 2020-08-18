import React from "react";
import GlobalNavigation from "../components/GlobalNavigation";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "../styles/main.css";
import UserProvider from "../contexts/UserProvider";
import Home from "../views/home";
import Videos from "../views/videos/videos";
import UploadForm from "../views/uploadForm";
import Settings from "../views/settings";
import Series from "../views/series/series";
import Playlists from "../views/playlists/playlists";
import NotFound from "../views/NotFound";
import AuthRoute from "../libraries/Routing";
import userRoles from "../types/User";
import NotImplemented from "../views/NotImplemented";
import { AuthRoutes, NonAuthRoutes } from "../libraries/Routes";
import NotAuthorized from "./NotAuthorized";
import Login from "./login";
import Wizard from "../views/uploadForm";
import EncodeProfiles from "./encodes/encodeProfiles";

const { Content } = Layout;

const Main: React.FC = (): JSX.Element => {
  return (
    <UserProvider>
      <Router>
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
                  <AuthRoute
                    exact
                    path={AuthRoutes.home}
                    Component={Home}
                    requiredRoles={userRoles.all}
                  />
                  <Route path="/upload" component={Wizard} />
                  <Route path="/my/videos">
                    <Videos user="my" />
                  </Route>
                  <Route path="/videos" component={Videos} />
                  <Route path="/series" component={Series} />
                  <Route path="/playlists" component={Playlists} />
                  <Route path="/encodes/profiles" component={EncodeProfiles} />
                  <Route path="/encodes" component={NotImplemented} />
                  <AuthRoute
                    path={AuthRoutes.moderation}
                    Component={NotImplemented}
                    requiredRoles={userRoles.moderator}
                  />
                  <Route path="/settings" component={Settings} />
                  <Route
                    path={NonAuthRoutes.unauthorized}
                    component={NotAuthorized}
                  />
                  <Route path="/login" component={Login} />
                  <Route component={NotFound} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    </UserProvider>
  );
};

export default Main;

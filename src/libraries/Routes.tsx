import React from "react";
import Home from "../views/home";
import Videos from "../views/videos/videos";
import UploadForm from "../views/uploadForm";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "../styles/main.css";
import Settings from "../views/settings";
import Series from "../views/series/series";
import Playlists from "../views/playlists/playlists";
import NotFound from "../views/NotFound";
import AuthRoute from "../libraries/Routing";
import userRoles from "../types/User";
import NotImplemented from "../views/NotImplemented";

export enum AuthRoutes {
  home = "/",
  my = "/my",
  videos = "/videos",
  series = "/series",
  playlists = "/playlists",
  moderation = "/moderation",
  settings = "/settings",
}

export enum NonAuthRoutes {
  login = "/login",
  unauthorized = "/unauthorized",
}

const Routes: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <AuthRoute
        exact
        path={AuthRoutes.home}
        Component={Home}
        requiredRoles={userRoles.all}
      />
      <Route path="/upload" component={UploadForm} />
      <Route path="/my/videos" component={NotImplemented} />
      <Route path="/videos" component={Videos} />
      <Route path="/series" component={Series} />
      <Route path="/playlists" component={Playlists} />
      <AuthRoute
        path={AuthRoutes.moderation}
        Component={NotImplemented}
        requiredRoles={userRoles.moderator}
      />
      <Route path="/settings" component={Settings} />
      <Route path={NonAuthRoutes.unauthorized} component={NotImplemented} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;

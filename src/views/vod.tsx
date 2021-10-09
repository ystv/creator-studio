import { Layout } from "antd";
import { Switch } from "react-router";
import Navbar from "../components/Navbar";
import { AuthRoutes } from "../libraries/Routes";
import AuthRoute from "../libraries/Routing";
import EncodeFormats from "./encodes/formats";
import EncodePresets from "./encodes/presets";
import Home from "./home";
import NotImplemented from "./NotImplemented";
import Playlists from "./playlists/playlists";
import Series from "./series/series";
import Wizard from "./uploadForm";
import Videos from "./videos/videos";

const { Content } = Layout;

const VOD: React.FC = (): JSX.Element => {
  return (
    <>
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
          </Switch>
        </Content>
      </Layout>
    </>
  );
};

export default VOD;

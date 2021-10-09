import { Layout } from "antd"
import { Switch } from "react-router"
import LiveNavbar from "../components/LiveNavbar"
import AuthRoute from "../libraries/Routing"
import Channels from "./stream/channel";

const { Content } = Layout;

const Live:React.FC = ():JSX.Element => {
    return (
        <>
        <LiveNavbar />
        <Layout style={{ padding: "24px 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{ padding: 24, margin: 0, minHeight: 280 }}
          >
            <Switch>
            <AuthRoute path="/live/channels" component={Channels} />
              <AuthRoute>
                  <h1>Live</h1>
              </AuthRoute>

            </Switch>
        </Content>
        </Layout>
        </>
    )
}

export default Live;
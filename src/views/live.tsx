import { Layout } from "antd"
import { Switch } from "react-router"
import LiveNavbar from "../components/LiveNavbar"
import AuthRoute from "../libraries/Routing"

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
            <AuthRoute path="/live/channels">
                  <h1>channels</h1>
                  </AuthRoute>
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
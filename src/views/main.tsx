import React from "react";
import GlobalNavigation from "../components/GlobalNavigation";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "../styles/main.css";
import Routes from "../libraries/Routes";
import UserProvider from "../contexts/UserProvider";

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
                <Routes />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    </UserProvider>
  );
};

export default Main;

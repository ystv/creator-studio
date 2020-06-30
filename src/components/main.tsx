import React, { useContext } from "react";
import Home from "./home";
import Videos from "./videos";
import UploadForm from "./uploadForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  HomeOutlined,
  UploadOutlined,
  CloudServerOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "../styles/main.css";
import logo from "../ystv.png";
import UserContext from "./userContext";
import Creation from "./video";
import Settings from "./settings";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const Main = () => {
  const user = useContext(UserContext);
  return (
    <Router>
      <Layout>
        <Header className="header">
          <img src={logo} className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Creator Studio</Menu.Item>
            <Menu.Item key="2">Calendar</Menu.Item>
            <Menu.Item key="3">Quotes</Menu.Item>
            <Menu.Item key="4">Webcams</Menu.Item>
            <Menu.Item key="5">Webmail</Menu.Item>
            <Menu.Item key="6">YSTV Classic</Menu.Item>
            <Menu.Item
              key="7"
              icon={<UserOutlined />}
              style={{ float: "right" }}
            >
              {user}
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ borderRight: 0 }}
            >
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<UploadOutlined />}>
                <Link to="/upload">Upload</Link>
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="My Creations">
                <Menu.Item key="3">
                  <Link to="/creations/user">All Creations</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/creations/user/pending">Pending Creations</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                icon={<TeamOutlined />}
                title="YSTV Creations"
              >
                <Menu.Item key="5">
                  <Link to="/creations">All Creations</Link>
                </Menu.Item>
                <Menu.Item key="6">Scheduled Creations</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<CloudServerOutlined />}
                title="Encode Farm"
              >
                <Menu.Item key="7">Current Jobs</Menu.Item>
                <Menu.Item key="8">Encode Profiles</Menu.Item>
              </SubMenu>
              <Menu.Item
                key="9"
                style={{ marginTop: "auto" }}
                icon={<SettingOutlined />}
              >
                <Link to="/settings">Settings</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content
            className="site-layout-background"
            style={{ padding: 24, margin: 0, minHeight: 280 }}
          >
            <Switch>
              <Route path="/creations/user">
                <MyCreation />
              </Route>
              <Route path="/creations">
                <Videos />
              </Route>
              <Route path="/upload">
                <UploadForm />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const MyCreation = () => <h1>My creations</h1>;

export default Main;

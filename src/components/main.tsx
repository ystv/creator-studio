import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./home";
import Videos from "./videos";
import UploadForm from "./uploadForm";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  HomeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "../styles/main.css";
import logo from "../ystv.png";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const username = "Rhys ";

const Main = () => {
  return (
    <Router>
      <Layout>
        <Header className="header">
          <img src={logo} className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Creator Studio</Menu.Item>
            <Menu.Item key="2">Goliath</Menu.Item>
            <Menu.Item key="3">YSTV Classic</Menu.Item>
            <Menu.Item
              key="4"
              icon={<UserOutlined />}
              style={{ float: "right" }}
            >
              {username}
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
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
            </Menu>
          </Sider>
          <Content
            className="site-layout-background"
            style={{ padding: 24, margin: 0, minHeight: 280 }}
          >
            <Switch>
              <Route path="/creations">
                <Videos />
              </Route>
              <Route path="/upload">
                <UploadForm />
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

export default Main;

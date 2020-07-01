import React, { useContext } from "react";
import Home from "./home";
import Videos from "./videos/videos";
import UploadForm from "./uploadForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  HomeOutlined,
  UploadOutlined,
  CloudServerOutlined,
  SettingOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "../styles/main.css";
import logo from "../ystv.png";
import UserContext from "./userContext";
import Creation from "./videos/video";
import Settings from "./settings";
import Series from "./series/series";
import Playlists from "./playlists/playlists";

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
              <Menu.Divider />
              <SubMenu key="sub1" icon={<UserOutlined />} title="My Creations">
                <Menu.Item key="3">
                  <Link to="/my/videos/pending">Pending Videos</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/my/videos">Videos</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/my/series">Series</Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="/my/playlists">Playlists</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                icon={<TeamOutlined />}
                title="YSTV Creations"
              >
                <Menu.Item key="7">
                  <Link to="/videos/scheduled">Scheduled Videos</Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to="/videos">Videos</Link>
                </Menu.Item>
                <Menu.Item key="9">
                  <Link to="/series">Series</Link>
                </Menu.Item>
                <Menu.Item key="10">
                  <Link to="/playlists">Playlists</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<CloudServerOutlined />}
                title="Encode Farm"
              >
                <Menu.Item key="11">Current Jobs</Menu.Item>
                <Menu.Item key="12">Encode Profiles</Menu.Item>
              </SubMenu>
              <Menu.Divider />
              <Menu.Item
                key="13"
                style={{ marginTop: "auto" }}
                icon={<SettingOutlined />}
              >
                <Link to="/settings">Settings</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "24px 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{ padding: 24, margin: 0, minHeight: 280 }}
            >
              <Switch>
                <Route path="/upload">
                  <UploadForm />
                </Route>
                <Route path="/my/videos">
                  <MyCreation />
                </Route>
                <Route path="/videos">
                  <Videos />
                </Route>
                <Route path="/series">
                  <Series />
                </Route>
                <Route path="/playlists">
                  <Playlists />
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
      </Layout>
    </Router>
  );
};

const MyCreation = () => <h1>My creations</h1>;

export default Main;

import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  HomeOutlined,
  UploadOutlined,
  CloudServerOutlined,
  SettingOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "../styles/main.css";
import getToken from "../libraries/Auth";
import userRoles from "../types/User";

const { Sider } = Layout;
const { SubMenu } = Menu;

const LoginMenu: React.FC = (): JSX.Element => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ borderRight: 0 }}
      >
        <Menu.Item key="login" icon={<LoginOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

const Navigation: React.FC = (): JSX.Element => {
  const token = getToken();
  const requiredRoles = userRoles.all;
  if (token) {
    const userHasRequiredRole = token.perms.some((role) =>
      requiredRoles.includes(role.name)
    );
    if (process.env.REACT_APP_SECURITY_TYPE === "NONE" || userHasRequiredRole) {
      return (
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
            <SubMenu key="sub2" icon={<TeamOutlined />} title="YSTV Creations">
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
      );
    }
  }
  return <LoginMenu />;
};

export default Navigation;

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
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "../styles/main.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Navigation: React.FC = () => {
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
        <SubMenu key="sub3" icon={<CloudServerOutlined />} title="Encode Farm">
          <Menu.Item key="11">
            <Link to="/encodes">Current Jobs</Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link to="/encodes/presets">Presets</Link>
          </Menu.Item>
          <Menu.Item key="13">
            <Link to="/encodes/formats">Formats</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Divider />
        <Menu.Item key="14" icon={<SettingOutlined />}>
          <Link to="/settings">Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Navigation;

import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "../styles/main.css";

const { Sider } = Layout;

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
          <Link to="/live">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<PlaySquareOutlined />}>
          <Link to="/live/channels">Channels</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="14" icon={<SettingOutlined />}>
          <Link to="/live/settings">Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Navigation;

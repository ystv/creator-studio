import React from "react";
import { Layout, Menu, Avatar } from "antd";
import "antd/dist/antd.css";
import "../styles/main.css";
import { UserInfo } from "../contexts/UserContext";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;

const GlobalNavigation: React.FC = (): JSX.Element => {
  return (
    <Header className="header">
      <h1 className="logo">
        <Link to="/" style={{ color: "#FFF" }}>
          CreatorStudio
        </Link>
      </h1>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">VOD</Menu.Item>
        <Menu.Item key="2">Live</Menu.Item>
        <Menu.Item key="3">MyTV</Menu.Item>
        <Menu.Item key="4">CompServ</Menu.Item>
        <Menu.Item key="5" style={{ float: "right" }}>
          <User />
        </Menu.Item>
      </Menu>
    </Header>
  );
};

const User = () => {
  const userinfo = UserInfo();
  if (userinfo) {
    return (
      <div>
        <Avatar src={userinfo.avatar} />
        {" " + userinfo.nickname}
      </div>
    );
  }
  return (
    <div>
      <Avatar icon={<UserOutlined />} />
      {" Login"}
    </div>
  );
};

export default GlobalNavigation;

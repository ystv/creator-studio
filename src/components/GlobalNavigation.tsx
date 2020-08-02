import React from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "../styles/main.css";
import { UserInfo } from "../contexts/UserContext";

const { Header } = Layout;

const GlobalNavigation: React.FC = (): JSX.Element => {
  return (
    <Header className="header">
      <h1 className="logo">CreatorStudio</h1>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">VOD</Menu.Item>
        <Menu.Item key="2">Live</Menu.Item>
        <Menu.Item key="3">MyTV</Menu.Item>
        <Menu.Item key="4">CompServ</Menu.Item>
        <MenuUser key="5" />
      </Menu>
    </Header>
  );
};

const MenuUser = (props: any) => {
  const { nickname, avatar } = UserInfo();
  return (
    <Menu.Item
      key={props.key}
      icon={<img src={avatar} alt="avatar" className="avatar" />}
      style={{ float: "right" }}
    >
      {" " + nickname}
    </Menu.Item>
  );
};

export default GlobalNavigation;

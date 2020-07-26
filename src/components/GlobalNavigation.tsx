import React from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "../styles/main.css";
import logo from "../ystv.png";
import { UserInfo } from "../contexts/UserContext";

const { Header } = Layout;

const GlobalNavigation: React.FC = (): JSX.Element => {
  return (
    <Header className="header">
      <img src={logo} alt="logo" className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Creator Studio</Menu.Item>
        <Menu.Item key="2">Calendar</Menu.Item>
        <Menu.Item key="3">Quotes</Menu.Item>
        <Menu.Item key="4">Webcams</Menu.Item>
        <Menu.Item key="5">Webmail</Menu.Item>
        <Menu.Item key="6">YSTV Classic</Menu.Item>
        <MenuUser key="7" />
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

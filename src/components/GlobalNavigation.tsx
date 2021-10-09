import React from "react";
import { Layout, Menu, Avatar } from "antd";
import "antd/dist/antd.css";
import "../styles/main.css";
import { UserInfo } from "../contexts/UserContext";
import { ExportOutlined, UserOutlined } from "@ant-design/icons";
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
        <Menu.Item key="1"><Link to="/">VOD</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/live">Live</Link></Menu.Item>
        <Menu.Item key="3" style={{ float: "right" }}>
          <User />
        </Menu.Item>
        <Menu.Item key="4" style={{ float: "right" }}><Avatar src={<ExportOutlined />} /><a href={process.env.REACT_APP_MYTV_BASEURL}>Back to MyTV</a></Menu.Item>

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

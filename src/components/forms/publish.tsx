import React from "react";
import { Typography, Button, Divider } from "antd";
import tada from "../../tada.png";
const { Title } = Typography;

const Publish = () => {
  return (
    <React.Fragment>
      <Title>Published video!</Title>
      <img src={tada} alt="tada" />
      <Divider />
      <Button type="primary">Upload another</Button>
    </React.Fragment>
  );
};

export default Publish;

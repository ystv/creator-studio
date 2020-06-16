import React from "react";
import { Typography } from "antd";
const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <React.Fragment>
      <Title>Welcome to the YSTV Creator Studio!</Title>
      <Paragraph>
        From this web app you will be able to manage all aspects of an exported
        video. Select one of the menu's to begin!
      </Paragraph>
    </React.Fragment>
  );
};

export default Home;

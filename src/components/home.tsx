import React from "react";
import { Typography, Card, Row, Col } from "antd";
const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <React.Fragment>
      <Title>Welcome to the YSTV Creator Studio!</Title>
      <Paragraph>
        From this web app you will be able to manage all aspects of an exported
        video. Select one of the menu's to begin!
      </Paragraph>
      <Row gutter={8}>
        <Col span={8}>
          <Card title="How-to's">
            <Paragraph>
              First time using Creator Studio? Watch our intro video or have a
              look at our documentation!
            </Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Statistics">
            <p>
              Total videos: <b>100</b>
            </p>
            <p>
              Total viewcount: <b>67k</b>
            </p>
            <p>
              Pending videos: <b>2</b>
            </p>
            <p>
              Encoding videos: <b>4</b>
            </p>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Home;

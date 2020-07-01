import React from "react";
import { Typography, Card, Row, Col, Calendar, Layout } from "antd";
const { Title, Paragraph } = Typography;
const { Content, Sider } = Layout;
const Home = () => {
  return (
    <React.Fragment>
      <Card title="Welcome to YSTV Creator Studio!">
        <Paragraph>
          From this web app you will be able to manage all aspects of an
          exported video. Select one of the menu's to begin!
        </Paragraph>
      </Card>
      <Layout>
        <Content>
          <Calendar />
        </Content>
        <Sider style={{ marginLeft: 10 }} className="site-layout-background">
          <Card title="How-to's">
            <Paragraph>
              First time using Creator Studio? Watch our intro video or have a
              look at our documentation!
            </Paragraph>
          </Card>
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
        </Sider>
      </Layout>
    </React.Fragment>
  );
};

export default Home;

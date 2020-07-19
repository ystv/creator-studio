import React, { useState, useEffect } from "react";
import { Typography, Card, Row, Col, Calendar, Layout, Button } from "antd";
import { number } from "yup";
import Axios from "axios";
import FormatBytes from "../utils/formatBytes";
import NumberWithCommas from "../utils/numberWithCommas";
const { Title, Paragraph } = Typography;
const { Content, Sider } = Layout;
const Home = () => {
  return (
    <React.Fragment>
      <Layout className="site-layout-background">
        <Content>
          <Calendar mode="month" />
        </Content>
        <Sider style={{ marginLeft: 10 }} className="site-layout-background">
          <Card title="How-to's" style={{ marginBottom: 10 }}>
            <Paragraph>
              First time using Creator Studio? Watch our intro video or have a
              look at our documentation!
            </Paragraph>
            <Button type="primary">Get Started</Button>
          </Card>
          <StatCard />
        </Sider>
      </Layout>
    </React.Fragment>
  );
};

const StatCard = () => {
  const [creatorStat, setCreatorStat] = useState<ICreatorStats>();
  useEffect(() => {
    getData();
  });
  interface ICreatorStats {
    totalVideos: number;
    totalPendingVideos: number;
    totalVideoHits: number;
    totalStorageUsed: number;
  }
  const getData = async () => {
    await Axios.request<ICreatorStats>({
      url: "http://localhost:8081/v1/internal/creator/stats",
    }).then((response) => {
      setCreatorStat(response.data);
    });
  };
  if (creatorStat) {
    return (
      <Card title="Statistics">
        <p>
          Total videos
          <br />
          <b>{NumberWithCommas(creatorStat.totalVideos)}</b>
        </p>
        <p>
          Total viewcount
          <br />
          <b>{NumberWithCommas(creatorStat.totalVideoHits)}</b>
        </p>
        <p>
          Pending videos
          <br />
          <b>{creatorStat.totalPendingVideos}</b>
        </p>
        <p>
          Total storage used
          <br />
          <b>{FormatBytes(creatorStat.totalStorageUsed)}</b>
        </p>
      </Card>
    );
  }
  return <Card title="Statistics" loading />;
};

export default Home;

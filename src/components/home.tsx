import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  Calendar,
  Layout,
  Button,
  Badge,
} from "antd";
import { number } from "yup";
import Axios from "axios";
import FormatBytes from "../utils/formatBytes";
import NumberWithCommas from "../utils/numberWithCommas";
import Moment from "moment";
import "../styles/calendar.css";
import { Link } from "react-router-dom";
const { Title, Paragraph } = Typography;
const { Content, Sider } = Layout;
const Home = () => {
  return (
    <React.Fragment>
      <Layout className="site-layout-background">
        <Content>
          <VideoCalendar />
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, [loading]);
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
      setLoading(false);
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

const VideoCalendar = () => {
  const [calendarData, setCalendarData] = useState<IVideoCalendar[]>();
  const [loading, setLoading] = useState(true);
  const now = Moment();
  const [selectedMonth, setSelectedMonth] = useState(
    now.year() + "/" + now.month()
  );
  useEffect(() => {
    getData();
  }, [loading]);
  interface IVideoCalendar {
    broadcastDate: Date;
    name: string;
    videoID: number;
  }
  const getData = async () => {
    await Axios.request<IVideoCalendar[]>({
      url: `http://localhost:8081/v1/internal/creator/calendar/${selectedMonth}`,
    }).then((response) => {
      setCalendarData(response.data);
      setLoading(false);
    });
  };

  if (calendarData) {
    const dateCellRender = (date: moment.Moment) => {
      let events: IVideoCalendar[] = [];
      calendarData.map((event) => {
        if (date.isSame(Moment(event.broadcastDate), "day")) {
          events.push(event);
        }
      });
      if (events.length !== 0) {
        return (
          <ul className="events">
            {events.map((item) => (
              <li key={item.videoID}>
                <Badge
                  status="success"
                  text={<Link to={`/videos/${item.videoID}`}>{item.name}</Link>}
                />
              </li>
            ))}
          </ul>
        );
      }
    };
    const refreshMonth = (date: moment.Moment) => {
      setSelectedMonth(date.year() + "/" + (date.month() + 1));
      setLoading(true);
    };

    return <Calendar dateCellRender={dateCellRender} onChange={refreshMonth} />;
  }
  return <Calendar />;
};

export default Home;

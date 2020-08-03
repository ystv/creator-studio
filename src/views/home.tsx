import React, { useState, useEffect } from "react";
import { Typography, Card, Calendar, Layout, Button, Badge } from "antd";
import Axios from "axios";
import FormatBytes from "../utils/formatBytes";
import NumberWithCommas from "../utils/numberWithCommas";
import Moment from "moment";
import "../styles/calendar.css";
import { Link } from "react-router-dom";

const { Paragraph } = Typography;
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
          <UserCard />
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
      url: `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/stats`,
      withCredentials: true,
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
  const now = Moment();
  const [selectedMonth, setSelectedMonth] = useState(
    now.year() + "/" + now.month()
  );
  useEffect(() => {
    Axios.request<IVideoCalendar[]>({
      url: `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/calendar/${selectedMonth}`,
      withCredentials: true,
    }).then((response) => {
      setCalendarData(response.data);
    });
  }, [selectedMonth]);

  interface IVideoCalendar {
    id: number;
    name: string;
    status: string;
    broadcastDate: Date;
  }

  if (calendarData) {
    const dateCellRender = (date: moment.Moment) => {
      let events: IVideoCalendar[] = [];
      events = calendarData.filter((event) =>
        date.isSame(Moment(event.broadcastDate), "day")
      );
      if (events.length !== 0) {
        return (
          <ul className="events">
            {events.map((item) => (
              <li key={item.id}>
                <Badge
                  status="success"
                  text={
                    <span title={item.name}>
                      <Link to={`/videos/${item.id}`}>{item.name}</Link>
                    </span>
                  }
                />
              </li>
            ))}
          </ul>
        );
      }
    };
    const refreshMonth = (date: moment.Moment) => {
      setSelectedMonth(date.year() + "/" + (date.month() + 1));
    };

    return <Calendar dateCellRender={dateCellRender} onChange={refreshMonth} />;
  }
  return <Calendar />;
};

const UserCard = () => {
  return <Card title="User Stats">TODO user data</Card>;
};

export default Home;

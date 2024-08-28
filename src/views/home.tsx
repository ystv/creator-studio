import React, { useState, useEffect } from "react";
import { Typography, Card, Calendar, Layout, Button, Badge } from "antd";
import FormatBytes from "../utils/formatBytes";
import NumberWithCommas from "../utils/numberWithCommas";
import Moment from "moment";
import "../styles/calendar.css";
import { Link } from "react-router-dom";
import ICreatorStats from "../types/Creator";
import { Creator, Video } from "../api/api";
import { IVideoCalendar } from "../types/Video";

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
  useEffect(() => {
    Creator.getStats()
    .then(data => {
      setCreatorStat(data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);
  
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
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(Moment());
  useEffect(() => {
    Video.getVideosByMonth(selectedDate.year(), selectedDate.month())
      .then(data => {
      setCalendarData(data);
    });
  }, [selectedDate]);

  const refreshMonth = (date: moment.Moment) => {
    setSelectedDate(date);
  };

  if (calendarData) {
    const dateCellRender = (date: moment.Moment) => {
      let events: IVideoCalendar[];
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

    return <Calendar dateCellRender={dateCellRender} onChange={refreshMonth} />;
  }
  return <Calendar />;
};

const UserCard = () => {
  return <Card title="User Stats">TODO user data</Card>;
};

export default Home;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Tag, Typography, Button, Space } from "antd";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import Meta from "../forms/metadata";
import Creation from "./video";
const { Title } = Typography;

const tagColours = (tag: string) => {
  switch (tag) {
    case "Public":
      return "green";
    case "Scheduled":
      return "geekblue";
    case "Pending":
      return "orange";
    default:
      return "volcano";
  }
};

const columns = (url: string) => {
  // TODO Do keys properly
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (tag: string) => (
        <Tag color={tagColours(tag)} key={tag}>
          {tag}
        </Tag>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration: number) => (
        <p>{new Date(duration * 1000).toISOString().substr(11, 8)}</p>
      ),
    },
    {
      title: "Broadcast Date",
      dataIndex: "broadcastDate",
      key: "broadcastDate",
      render: (date: string) => (
        <p>{new Date(date).toLocaleDateString("en-uk")}</p>
      ),
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
    },
    {
      title: "Actions",
      key: "action",
      render: (text: any, record: any) => (
        <Link to={`${url}/${record.videoID}`}>View</Link>
      ),
    },
  ];
};

const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.status === "Locked",
    name: record.name,
  }),
};

const Videos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, [loading]);
  let { path, url } = useRouteMatch();

  const getData = async () => {
    await Axios.get("http://localhost:8081/v1/internal/creator").then((res) => {
      // TODO Want to get types in here
      setData(
        res.data.map((row: any) => ({
          videoID: row.videoID,
          seriesID: row.seriesID,
          name: row.name,
          url: row.url,
          duration: row.duration,
          views: row.views,
          tags: row.tags,
          seriesPosition: row.seriesPosition,
          status: capitalise(row.status),
          broadcastDate: row.broadcastDate,
          createdAt: row.createdAt,
        }))
      );
      setLoading(false);
    });
    setData(data);
    setLoading(false);
  };
  const capitalise = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const refresh = () => {
    setLoading(true);
  };

  return (
    <Switch>
      <Route exact path={path}>
        <Title>YSTV Videos</Title>
        <Space style={{ marginBottom: 16 }}>
          <Button disabled>Move to</Button>
          <Button disabled>Disable</Button>
          <Button onClick={refresh}>Refresh</Button>
        </Space>
        <Table
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns(url)}
          loading={loading}
        />
      </Route>
      <Route path={`${path}/:CreationId`}>
        <Creation />
      </Route>
    </Switch>
  );
};

export default Videos;

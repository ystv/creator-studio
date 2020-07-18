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
    case "Processing":
      return "geekblue";
    case "Available":
      return "green";
    case "Pending":
      return "orange";
    default:
      return "volcano";
  }
};

const columns = (url: string) => {
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
      title: "Uploaded by",
      dataIndex: "uploadedBy",
      key: "uploadedBy",
    },
    {
      title: "Actions",
      key: "action",
      render: (text: any, record: any) => (
        <Link to={`${url}/${record.id}`}>View</Link>
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
      setData(
        res.data.map((row: any) => ({
          id: row.ID,
          name: row.Name,
          status: row.Status,
          uploadedBy: row.Owner,
        }))
      );
      setLoading(false);
    });
    setData(data);
    setLoading(false);
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

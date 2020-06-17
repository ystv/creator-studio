import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Tag, Typography, Button } from "antd";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import Meta from "./forms/metadata";
const { Title } = Typography;

const tagColours = (tag: string) => {
  switch (tag) {
    case "Processing":
      return "geekblue";
    case "Available":
      return "green";
    case "Pending":
      return "yellow";
    default:
      return "volcano";
  }
};

const dataSource = [
  {
    id: "1",
    name: "ERN 2020",
    status: "Processing",
    uploadedBy: "Rhys Milling",
  },
];

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
  let match = useRouteMatch();

  const getData = async () => {
    await Axios.get("http://localhost:8081/v1/internal/creator").then((res) => {
      let processedData = res.data.map((row: any) => ({
        id: row.ID,
        name: row.Name,
        status: row.Status,
        uploadedBy: row.Owner,
      }));
      setData(processedData);
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
      <Route path={`${match.path}/user`}>
        <Title style={{ float: "left" }}>My Creations</Title>
        <Table
          rowSelection={rowSelection}
          dataSource={dataSource}
          columns={columns(match.url)}
        />
      </Route>
      <Route path={`${match.path}/:creationId`}>
        <Title>Video Details</Title>
        <Meta />
      </Route>
      <Route path="/">
        <Title style={{ float: "left" }}>Uploaded Creations</Title>
        <Button onClick={refresh}>Refresh</Button>
        <Table
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns(match.url)}
          loading={loading}
        />
      </Route>
    </Switch>
  );
};

export default Videos;

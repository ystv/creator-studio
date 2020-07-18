import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { Typography, Button, Table, Space, Tag } from "antd";
import Axios from "axios";
const { Title } = Typography;

const Playlists = () => {
  let { CreationId } = useParams();
  const [playlistMeta, setPlaylistMeta] = useState<playlistMeta[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, [loading]);
  let { path, url } = useRouteMatch();

  interface playlistMeta {
    id: number;
    uri: string;
    status: string;
  }

  const getData = async () => {
    await Axios.request<playlistMeta[]>({
      url: `http://localhost:8081/v1/internal/creator/playlists`,
    }).then((response) => {
      const { data } = response;
      setPlaylistMeta(data);
    });
    setLoading(false);
  };

  const refresh = () => {
    setLoading(true);
  };

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
        title: "Actions",
        key: "action",
        render: (text: any, record: any) => (
          <Link to={`${url}/${record.id}`}>View</Link>
        ),
      },
    ];
  };

  return (
    <Switch>
      <Route exact path={path}>
        <Title>YSTV Playlists</Title>
        <Space style={{ marginBottom: 16 }}>
          <Button disabled>Move to</Button>
          <Button disabled>Disable</Button>
          <Button onClick={refresh}>Refresh</Button>
        </Space>
        <Table columns={columns(url)} loading={loading} />
      </Route>
      <Route path={`${path}/:CreationId`}>
        <h1>Playlist</h1>
      </Route>
    </Switch>
  );
};

export default Playlists;

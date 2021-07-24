import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { Typography, Button, Table, Space, Tag } from "antd";
import { IPlaylist } from "../../types/Playlist";
import Modal from "antd/lib/modal/Modal";
import CreateModal from "./create";
import Capitalise from "../../utils/capitalise";
import TagColours from "../../utils/tagColours";
import Playlist from "./playlist";
import { Playlist as p } from "../../api/api";
const { Title } = Typography;

const Playlists = () => {
  const [playlistMeta, setPlaylistMeta] = useState<IPlaylist[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [modelVisible, setModelVisible] = useState(false);
  useEffect(() => {
    getData();
  }, [loading]);
  let { path, url } = useRouteMatch();

  const getData = async () => {
    await p.getPlaylists().then(res => {
      res.forEach((playlist) => {
        playlist.status = Capitalise(playlist.status);
      });
      setPlaylistMeta(res);
    });
    setLoading(false);
  };

  const refresh = () => {
    setLoading(true);
  };

  const columns = (url: string) => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text: string, record: any) => (
          <Link to={`${url}/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (tag: string) => (
          <Tag color={TagColours(tag)} key={tag}>
            {tag}
          </Tag>
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
          <Button
            type="primary"
            onClick={() => {
              setModelVisible(true);
              console.log(modelVisible);
            }}
          >
            Create
          </Button>
        </Space>
        <Table
          columns={columns(url)}
          loading={loading}
          dataSource={playlistMeta}
        />
        <Modal
          title="Create playlist"
          visible={modelVisible}
          onCancel={() => {
            setModelVisible(false);
          }}
        >
          <CreateModal />
        </Modal>
      </Route>
      <Route path={`${path}/:PlaylistID`} render={(props) => (
        <Playlist playlistID={+props.match.params.PlaylistID} />
      )} />
    </Switch>
  );
};

export default Playlists;

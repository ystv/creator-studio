import React, { useState, useEffect } from "react";
import { Table, Tag, Typography, Button, Space, Input } from "antd";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import Creation from "./video";
import TagColours from "../../utils/tagColours";
import Capitalise from "../../utils/capitalise";
import { IVideoMeta } from "../../types/Video";
import { Video } from "../../api/api";
const { Title } = Typography;

const columns = (url: string) => {
  // TODO Do keys properly
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
        <Space>
          <a href={`https://ystv.co.uk/watch/${record.id}`}>Watch</a>
        </Space>
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

interface VideosProps {
  user: string;
}

const Videos: React.FC<VideosProps> = ({ user = "" }) => {
  const [metaData, setMetaData] = useState<IVideoMeta[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const setVideos = (data: IVideoMeta[]) => {
    data.forEach((video) => {
      if (video.name === "") {
        video.name = video.url;
        video.tags.push("un-named");
      }
      video.status = Capitalise(video.status);
    });
    setMetaData(data);
    setLoading(false);
  }

  useEffect(() => {
    switch(user) {
      case "": // list all videos
        Video.getVideos()
          .then(data => {
            setVideos(data);
          })
          .catch(err => {
            console.log(err)
          });
        break;
      case "my": // list all videos associated with user
        Video.getVideosByCurrentUser()
        .then(data => {
          setVideos(data);
        })
        .catch(err => {
          console.log(err)
        });
        break;
      default:
        console.log("Not implemented");
        break;
    }
  }, [loading, user]);

  let { path, url } = useRouteMatch();

  const refresh = () => {
    setLoading(true);
  };

  return (
    <Switch>
      <Route exact path={path}>
        <Title>{user ? (user === "" ? user : "My") : process.env.REACT_APP_TITLE} Videos</Title>
        <Space style={{ marginBottom: 16 }}>
          <Button>Move to</Button>
          <Button>Disable</Button>
          <Input placeholder="Search" />
        </Space>
        <Button onClick={refresh} style={{ float: "right" }}>
          Refresh
        </Button>
        <Table
          rowSelection={rowSelection}
          dataSource={metaData}
          columns={columns(url)}
          loading={loading}
        />
      </Route>
      <Route path={`${path}/:CreationID`} render={(props) => (
        <Creation creationID={+props.match.params.CreationID} />
      )} />
    </Switch>
  );
};

export default Videos;

import React, { useState, useEffect } from "react";
import TagColours from "../../utils/tagColours";
import { IVideoMeta } from "../../types/Video";
import {
  Table,
  Tag,
  Space,
  Typography,
  Descriptions,
  Button,
  Spin,
  message,
} from "antd";
import { IPlaylist } from "../../types/Playlist";
import { Link, useRouteMatch } from "react-router-dom";
import { Playlist as p } from "../../api/api";
import EditPlaylist from "./edit";

const { Title, Paragraph } = Typography;

interface PlaylistProps {
  playlistID: number;
}

const Playlist = ({ playlistID }: PlaylistProps): JSX.Element => {
  const [playlistData, setPlaylistData] = useState<IPlaylist | undefined>(
    undefined
  );
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    p.getPlaylist(playlistID)
      .then((res) => {
        setPlaylistData(res);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, [playlistID]);

  if (playlistData === undefined) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <>
      <>
        <Title>
          <Space>
            {playlistData.name}
            <Tag
              color={TagColours(playlistData.status)}
              key={playlistData.status}
            >
              {playlistData.status}
            </Tag>
          </Space>
        </Title>
        <Paragraph>{playlistData.description}</Paragraph>

        <Descriptions>
          <Descriptions.Item label="Creator">
            {playlistData.createdBy ? (
              <a
                href={`${process.env.REACT_APP_MYTV_BASEURL}/user/${playlistData.createdBy}`}
              >
                {playlistData.createdBy}
              </a>
            ) : (
              "YSTV Member"
            )}
          </Descriptions.Item>
        </Descriptions>
        <Button
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Update
        </Button>
        <EditPlaylist
          visible={modalVisible}
          initialValues={playlistData}
          onFinish={() => {
            setModalVisible(false);
          }}
        />
      </>
      <VideoTable videoData={playlistData.videos} />
    </>
  );
};

const VideoTable = (props: any) => {
  let { url } = useRouteMatch();
  const [videoData, setVideoData] = useState<IVideoMeta[] | undefined>(
    undefined
  );
  useEffect(() => {
    setVideoData(props.videoData);
  }, [props.videoData]);

  return <Table columns={columns(url)} dataSource={videoData} />;
};

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
          <Link to={`${url}/${record.id}`}>Details</Link>
          <a href={`https://ystv.co.uk/watch/${record.id}`}>Watch</a>
        </Space>
      ),
    },
  ];
};

export default Playlist;

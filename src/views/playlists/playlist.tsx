import React, { useState, useEffect } from "react";
import TagColours from "../../utils/tagColours";
import { IVideoMeta } from "../../types/Video";
import { Table, Tag, Space, Typography, Descriptions, Button } from "antd";
import { IPlaylist } from "../../types/Playlist";
import Axios from "axios";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import PlaylistModifier from "./update";

const { Title, Paragraph } = Typography;

const Playlist: React.FC = () => {
  const { playlistID } = useParams();
  const [playlistData, setPlaylistData] = useState<IPlaylist | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const getData = async () => {
      await Axios.request<IPlaylist>({
        url: `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/playlists/${playlistID}`,
      }).then((response) => {
        const { data } = response;
        setPlaylistData(data);
      });
      setLoading(false);
    };
    getData();
  }, [loading, playlistID]);

  if (playlistData === undefined) {
    return null;
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
              <a href={`${process.env.REACT_APP_MYTV_BASEURL}/user/${playlistData.createdBy}`}>
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
        <PlaylistModifier
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
          }}
          onSubmit={() => {
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

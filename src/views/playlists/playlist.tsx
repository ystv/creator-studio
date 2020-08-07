import React, { useState, useEffect } from "react";
import TagColours from "../../utils/tagColours";
import { IVideo } from "../../types/Video";
import { Table, Tag, Space } from "antd";
import { IPlaylist } from "../../types/Playlist";
import Axios from "axios";
import { useParams, Link, useRouteMatch } from "react-router-dom";

const Playlist: React.FC = () => {
  const { playlistID } = useParams();
  const [playlistData, setPlaylistData] = useState<IPlaylist | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
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
    <div>
      <FileTable videoData={playlistData.files} />
    </div>
  );
};

const FileTable = (props: any) => {
  let { url } = useRouteMatch();
  const [videoData, setVideoData] = useState<IVideo[] | undefined>(undefined);
  useEffect(() => {
    setVideoData(props.videoData);
  }, [props.videoData]);

  if (videoData) {
    return <Table columns={columns(url)} dataSource={videoData} />;
  }
  return <Table loading columns={columns("")} />;
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

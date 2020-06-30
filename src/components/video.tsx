import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Table,
  Tag,
  Typography,
  Button,
  Descriptions,
  Breadcrumb,
  Card,
} from "antd";
import { useParams } from "react-router-dom";
const { Title, Paragraph } = Typography;

const Creation = () => {
  let { CreationId } = useParams();
  const [videoData, setVideoData] = useState<VideoData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, [loading]);

  interface VideoData {
    ID: string;
    Name: string;
    Status: string;
    Owner: string;
    CreatedDate: Date;
    Description: string;
  }

  const getData = async () => {
    await Axios.request<VideoData>({
      url: `http://localhost:8081/v1/internal/creator/${CreationId}`,
    }).then((response) => {
      const { data } = response;
      setVideoData(data);
    });
    setLoading(false);
  };

  const refresh = () => {
    setLoading(true);
  };

  const columns = () => {
    return [
      {
        title: "Preset",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Type",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
    ];
  };

  const videoInfo = () => {
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

    const tabList = [
      {
        key: "Details",
        tab: "Details",
      },
      {
        key: "Files",
        tab: "Files",
      },
    ];

    const contentList = {
      Details: <h1>Test</h1>,
      Files: <h2>Fily</h2>,
    };

    if (videoData) {
      return (
        <div>
          <Title>{videoData.Name}</Title>
          <Paragraph>{videoData.Description}</Paragraph>
          <Descriptions>
            <Descriptions.Item label="Broadcast Date">
              {videoData.CreatedDate}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={tagColours(videoData.Status)} key={videoData.Status}>
                {videoData.Status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Creator">
              {videoData.Owner}
            </Descriptions.Item>
          </Descriptions>

          <Card title={videoData.Name} tabList={tabList}>
            {contentList["Details"]}
          </Card>

          <Table columns={columns()} loading={loading} />
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  };

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>Videos</Breadcrumb.Item>
        <Breadcrumb.Item>{CreationId}</Breadcrumb.Item>
      </Breadcrumb>
      {videoInfo()}
    </React.Fragment>
  );
};
export default Creation;

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
    id: number;
    name: string;
    status: string;
    owner: number;
    createdDate: Date;
    description: string;
    files: videoFiles[];
  }

  interface videoFiles {
    id: number;
    uri: string;
    preset: number;
    status: string;
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

  const videoInfo = () => {
    const tabList = [
      {
        key: "Analytics",
        tab: "Analytics",
      },
      {
        key: "Files",
        tab: "Files",
      },
    ];

    const contentList = (option: string) => {
      const columns = () => {
        return [
          {
            title: "Preset",
            dataIndex: "preset",
            key: "preset",
          },
          {
            title: "Location",
            dataIndex: "uri",
            key: "location",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
          },
          {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
          },
        ];
      };

      switch (option) {
        case "Details":
          return <h1>Test</h1>;
        case "Files":
          return (
            <Table
              columns={columns()}
              dataSource={videoData?.files}
              loading={loading}
            />
          );
      }
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

    if (videoData) {
      return (
        <div>
          <Title>{videoData.name}</Title>
          <Paragraph>{videoData.description}</Paragraph>
          <Descriptions>
            <Descriptions.Item label="Broadcast Date">
              {videoData.createdDate}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={tagColours(videoData.status)} key={videoData.status}>
                {videoData.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Creator">
              {videoData.owner}
            </Descriptions.Item>
          </Descriptions>
          <Card tabList={tabList} activeTabKey={"Files"}>
            {contentList("Files")}
          </Card>
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

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
  Space,
  Statistic,
  Row,
  Col,
  Layout,
  Timeline,
  Cascader,
} from "antd";
import { useParams } from "react-router-dom";
const { Title, Paragraph } = Typography;
const { Content, Sider } = Layout;

const Creation = () => {
  let { CreationId } = useParams();
  const [videoData, setVideoData] = useState<VideoData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [cardView, setCardView] = useState("Analytics");
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
    duration: number;
    views: number;
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
      {
        key: "Manage",
        tab: "Manage",
      },
      {
        key: "History",
        tab: "History",
      },
    ];

    const contentList = (option: string) => {
      const columns = () => {
        return [
          {
            title: "File",
            dataIndex: "preset",
            key: "preset",
          },
          {
            title: "Location",
            dataIndex: "uri",
            key: "location",
            render: (text: any, record: any) => (
              <a href={`https://${text}`}>{text}</a>
            ),
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
        ];
      };

      switch (option) {
        case "Details":
          return <h1>Test</h1>;
        case "Files":
          return (
            <React.Fragment>
              <Space style={{ marginBottom: 16 }}>
                <Button>Add File</Button>
                <Button disabled>Delete File</Button>
                <Button disabled>Re-encode</Button>
                <Button>Refresh</Button>
              </Space>
              <Table
                columns={columns()}
                dataSource={videoData?.files}
                loading={loading}
              />
            </React.Fragment>
          );
        case "Manage":
          return (
            <React.Fragment>
              <Space>
                <Button>Edit info</Button>
                <Button>Delete video</Button>
                <Button>Change video source</Button>
                <Cascader />
                <br />
                <Button>YouTube</Button>
              </Space>
            </React.Fragment>
          );
        case "History":
          return (
            <React.Fragment>
              <Timeline mode={"left"}>
                <Timeline.Item color="green" label="28/06/2020">
                  Video created by Rhys
                </Timeline.Item>
                <Timeline.Item color="green" label="29/06/2020">
                  Video approved by root
                </Timeline.Item>
                <Timeline.Item color="green" label="02/07/2020">
                  Video public
                </Timeline.Item>
              </Timeline>
            </React.Fragment>
          );
      }
    };

    const tagColours = (tag: string) => {
      switch (tag) {
        case "Processing":
          return "geekblue";
        case "Available":
          return "green";
        case "Public":
          return "green";
        case "Internal":
          return "cyan";
        default:
          return "volcano";
      }
    };

    if (videoData) {
      return (
        <div>
          <Layout>
            <Content className="site-layout-background">
              <Title>
                <Space>
                  {videoData.name}
                  <Tag
                    color={tagColours(videoData.status)}
                    key={videoData.status}
                  >
                    {videoData.status}
                  </Tag>
                </Space>
              </Title>
              <Paragraph>Broadcast date: {videoData.createdDate}</Paragraph>
              <Paragraph>{videoData.description}</Paragraph>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="View count" value={videoData.views} />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Duration"
                    value={new Date(videoData.duration * 1000)
                      .toISOString()
                      .substr(11, 8)}
                  />
                </Col>
              </Row>

              <Descriptions>
                <Descriptions.Item label="Creator">
                  {videoData.owner}
                </Descriptions.Item>
              </Descriptions>
            </Content>
            <Sider className="site-layout-background">
              <img src="https://via.placeholder.com/350x200" width={200} />
              <Button>Edit video</Button>
            </Sider>
          </Layout>
          <Card
            tabList={tabList}
            activeTabKey={cardView}
            onTabChange={setCardView}
          >
            {contentList(cardView)}
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

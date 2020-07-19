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
import { useParams, Link } from "react-router-dom";
import { string } from "yup";
import FormatBytes from "../../utils/formatBytes";
import Capitalise from "../../utils/capitalise";
import TagColours from "../../utils/tagColours";
const { Title, Paragraph } = Typography;
const { Content, Sider } = Layout;

const Creation = () => {
  let { CreationId } = useParams();
  const [videoData, setVideoData] = useState<VideoData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [cardView, setCardView] = useState("Files");
  useEffect(() => {
    getData();
  }, [loading]);

  interface VideoData {
    videoID: number;
    seriesID: number;
    name: string;
    url: string;
    description: string;
    thumbnail: string;
    duration: number;
    views: number;
    tags: string[];
    seriesPosition: number;
    status: string;
    preset: string;
    broadcastDate: Date;
    createdAt: Date;
    owner: string;
    files: videoFiles[];
  }

  interface videoFiles {
    id: number;
    uri: string;
    encodeFormat: string;
    status: string;
    size: number;
    mimeType: string;
  }

  const getData = async () => {
    await Axios.request<VideoData>({
      url: `http://localhost:8081/v1/internal/creator/${CreationId}`,
    }).then((response) => {
      const { data } = response;
      data.status = Capitalise(data.status);
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
        // TODO sort out keys
        return [
          {
            title: "Encode",
            dataIndex: "encodeFormat",
            key: "EncodeFormat",
          },
          {
            title: "Type",
            dataIndex: "mimeType",
            key: "mimeType",
          },
          {
            title: "Location",
            dataIndex: "uri",
            key: "location",
            render: (text: any, record: any) => (
              <a href={`https://cdn.ystv.co.uk/${text}`}>{text}</a>
            ),
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (tag: string) => (
              <Tag color={TagColours(tag)} key={tag}>
                {Capitalise(tag)}
              </Tag>
            ),
          },
          {
            title: "size",
            dataIndex: "size",
            key: "size",
            render: (size: number) => <p>{FormatBytes(size)}</p>,
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

    if (videoData) {
      return (
        <div>
          <Layout>
            <Content className="site-layout-background">
              <Title>
                <Space>
                  {videoData.name}
                  <Tag
                    color={TagColours(videoData.status)}
                    key={videoData.status}
                  >
                    {videoData.status}
                  </Tag>
                </Space>
              </Title>
              <Paragraph>
                Broadcast date:{" "}
                {new Date(videoData.broadcastDate).toLocaleString()}
              </Paragraph>
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
              <img src="https://via.placeholder.com/384x216" width={216} />
              <Space style={{ marginTop: 5 }}>
                <Button>Edit video</Button>
                <Button href={"https://ystv.co.uk/watch/" + videoData.videoID}>
                  Watch video
                </Button>
              </Space>
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
        <Breadcrumb.Item>
          <Link to="/videos">Videos</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{CreationId}</Breadcrumb.Item>
      </Breadcrumb>
      {videoInfo()}
    </React.Fragment>
  );
};
export default Creation;

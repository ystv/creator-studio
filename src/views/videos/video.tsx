import React, { useState, useEffect } from "react";
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
  Spin,
} from "antd";
import { Link } from "react-router-dom";
import FormatBytes from "../../utils/formatBytes";
import Capitalise from "../../utils/capitalise";
import TagColours from "../../utils/tagColours";
import { IVideo } from "../../types/Video";
import { Video } from "../../api/api";
const { Title, Paragraph } = Typography;
const { Content, Sider } = Layout;

interface CreationProps {
  creationID: number
}

const Creation = ({creationID}:CreationProps):JSX.Element => {
  const [videoData, setVideoData] = useState<IVideo | undefined>(undefined);
  const [cardView, setCardView] = useState("Files");

  console.log("creationID: ", creationID);

  useEffect(() => {
    Video.getVideo(creationID)
      .then((data) => {
        setVideoData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [creationID]);

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
              <FileTable videoData={videoData} />
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
                  {videoData.createdByID ? (
                    <a
                      href={`${process.env.REACT_APP_MYTV_BASEURL}/user/${videoData.createdByID}`}
                    >
                      {videoData.createdByNick}
                    </a>
                  ) : (
                    "YSTV Member"
                  )}
                </Descriptions.Item>
              </Descriptions>
            </Content>
            <Sider className="site-layout-background">
              <img
                src="https://via.placeholder.com/384x216"
                alt="thumbnail"
                width={216}
              />
              <Space style={{ marginTop: 5 }}>
                <Button>Edit video</Button>
                <Button href={"https://ystv.co.uk/watch/" + videoData.id}>
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
      return (
        <div className="loading">
          <Spin size="large" />
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/videos">Videos</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{creationID}</Breadcrumb.Item>
      </Breadcrumb>
      {videoInfo()}
    </React.Fragment>
  );
};

const FileTable = (props: any) => {
  const [videoData, setVideoData] = useState<IVideo | undefined>(undefined);
  useEffect(() => {
    setVideoData(props.videoData);
  }, [props.videoData]);

  const columns = (id: number) => {
    return [
      {
        title: "Encode",
        dataIndex: "encodeFormat",
        key: `EncodeFormat-${id}`,
      },
      {
        title: "Type",
        dataIndex: "mimeType",
        key: `mimeType-${id}`,
      },
      {
        title: "Location",
        dataIndex: "uri",
        key: `location-${id}`,
        render: (text: string) => (
          <a href={`https://cdn.ystv.co.uk/${text}`}>{text}</a>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: `status-${id}`,
        render: (tag: string) => (
          <Tag color={TagColours(tag)} key={tag}>
            {Capitalise(tag)}
          </Tag>
        ),
      },
      {
        title: "size",
        dataIndex: "size",
        key: `size-${id}`,
        render: (size: number) => <p>{FormatBytes(size)}</p>,
      },
    ];
  };
  if (videoData) {
    return (
      <Table columns={columns(videoData.id)} dataSource={videoData.files} />
    );
  }
  return <Table loading columns={columns(0)} />;
};

export default Creation;

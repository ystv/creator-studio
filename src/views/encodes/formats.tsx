import React, { useState } from "react";
import {
  Typography,
  Table,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
} from "antd";
import Axios from "axios";
import IEncodeFormat from "../../types/EncodeProfile";
import Modal from "antd/lib/modal/Modal";
const { Title, Paragraph } = Typography;

const columns = (id: number) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: `name-${id}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: `description-${id}`,
    },
    {
      title: "Width",
      dataIndex: "width",
      key: `width-${id}`,
    },
    {
      title: "Height",
      dataIndex: "height",
      key: `height-${id}`,
    },
    {
      title: "Watermarked",
      dataIndex: "watermarked",
      key: `watermarked-${id}`,
      render: (watermarked: boolean) => <p>{watermarked ? "Yes" : "No"}</p>,
    },
  ];
};

const EncodeFormats: React.FC = () => {
  const [encodeData, setEncodeData] = useState<IEncodeFormat[] | undefined>(
    undefined
  );
  const [selectedRec, setSelectedRec] = useState<number | undefined>(undefined);
  useState(() => {
    Axios.request<IEncodeFormat[]>({
      url: `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/encodes/profiles`,
      withCredentials: true,
    }).then((response) => {
      setEncodeData(response.data);
    });
  });

  if (encodeData === undefined) {
    return <h1>loading</h1>;
  }
  let selData = encodeData[selectedRec ? selectedRec : 0];

  return (
    <>
      <Title>Encode Profiles</Title>
      <Paragraph>
        An encode profile is an individual job that is perfomed on a video file.
        We do this so when you watch a video on the website you will be able to
        select from a bunch of different qualities so people can have the best
        watch experience no matter the connection!
      </Paragraph>
      <Table
        columns={columns(0)}
        dataSource={encodeData}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setSelectedRec(rowIndex);
              console.log(rowIndex);
            },
          };
        }}
      />

      <Modal
        visible={selectedRec !== undefined}
        onCancel={() => {
          setSelectedRec(undefined);
        }}
        title="Edit encode profile"
      >
        <Form>
          <Form.Item name="name" label="Name">
            <Input defaultValue={selData.name} />
          </Form.Item>
          <Form.Item name="description" label="description">
            <Input.TextArea defaultValue={selData.description} />
          </Form.Item>
          <Form.Item name="width" label="Width">
            <InputNumber defaultValue={selData.width} />
          </Form.Item>
          <Form.Item name="height" label="Height">
            <InputNumber defaultValue={selData.height} />
          </Form.Item>
          <Form.Item name="arguments" label="Arguments">
            <Input.TextArea defaultValue={selData.arguments} />
          </Form.Item>
          <Form.Item name="mimeType" label="MIME Type">
            <Input defaultValue={selData.mimeType} />
          </Form.Item>
          <Form.Item name="mode" label="Mode">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="watch">Watch</Radio.Button>
              <Radio.Button value="download">Download</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="watermarked" label="Watermarked">
            <Switch checked={selData.watermarked} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EncodeFormats;

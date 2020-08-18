import React, { useState } from "react";
import { Typography, Table, Form, Input } from "antd";
import Axios from "axios";
import IEncodeFormat from "../../types/EncodeProfile";
import Modal from "antd/lib/modal/Modal";
const { Title } = Typography;

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

const EncodeProfiles: React.FC = () => {
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

  return (
    <>
      <Title>Encode Profiles</Title>
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
      >
        <Form>
          <Form.Item name="name" label="Name">
            <Input value={encodeData[selectedRec ? selectedRec : 0].name} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EncodeProfiles;

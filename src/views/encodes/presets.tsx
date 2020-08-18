import React, { useState } from "react";
import { Typography, Space, Button } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import Axios from "axios";
import IEncodeFormat from "../../types/EncodeProfile";
import IPreset from "../../types/EncodePreset";
import PresetModal from "./preset";
const { Title, Paragraph } = Typography;

const columns: ColumnsType<IPreset> = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
  },
  {
    key: "description",
    title: "Description",
    dataIndex: "description",
  },
  {
    key: "amount",
    title: "# Formats",
    render: (_, record) => {
      return <p>{record.formats ? record.formats.length : 0}</p>;
    },
  },
];

const EncodePresets: React.FC = () => {
  const [presetData, setPresetData] = useState<IPreset[] | undefined>(
    undefined
  );
  const [modalState, setModalState] = useState("");
  const [modalData, setModalData] = useState<IPreset | undefined>(undefined);
  useState(() => {
    Axios.request<IPreset[]>({
      url: `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/encodes/presets`,
      withCredentials: true,
    }).then((response) => {
      setPresetData(response.data);
    });
  });

  const expandedRowRender = (record: IPreset) => {
    const columns: ColumnsType<IEncodeFormat> = [
      {
        title: "Name",
        dataIndex: "name",
        key: `name`,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: `description`,
      },
      {
        title: "Width",
        dataIndex: "width",
        key: `width`,
      },
      {
        title: "Height",
        dataIndex: "height",
        key: `height`,
      },
      {
        title: "Watermarked",
        dataIndex: "watermarked",
        key: `watermarked`,
        render: (watermarked: boolean) => <p>{watermarked ? "Yes" : "No"}</p>,
      },
    ];
    return (
      <Table<IEncodeFormat>
        columns={columns}
        dataSource={record.formats}
        pagination={false}
        size="small"
      />
    );
  };

  return (
    <>
      <Title>Encode Presets</Title>
      <Paragraph>
        This is a group of encode profiles, so a video would have a preset and
        Creator Studio will automatically create video files based on the
        profiles that are attached.
      </Paragraph>
      <Space>
        <Button
          onClick={() => {
            setModalData(undefined);
            setModalState("Create");
          }}
          type="primary"
        >
          New
        </Button>
      </Space>
      <Table<IPreset>
        columns={columns}
        dataSource={presetData}
        expandable={{ expandedRowRender }}
        onRow={(data) => {
          return {
            onClick: () => {
              setModalState("Update");
              console.log(data);
              setModalData(data);
            },
          };
        }}
      />
      <PresetModal
        state={modalState}
        onCancel={() => {
          setModalData(undefined);
          setModalState("");
        }}
        data={modalData}
      />
    </>
  );
};

export default EncodePresets;

import React, { useState, useEffect } from "react";
import { Typography, Space, Button } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import IPreset from "../../types/EncodePreset";
import PresetModal from "./preset";
import { Encodes } from "../../api/api";
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Encodes.getAllPresets()
    .then(res => {
      setPresetData(res);
      setLoading(false);
    });
  }, [loading]);

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
        onSubmit={() => {
          setLoading(true);
          setModalData(undefined);
          setModalState("");
        }}
        data={modalData}
      />
    </>
  );
};

export default EncodePresets;

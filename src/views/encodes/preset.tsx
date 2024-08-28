import React, { useState } from "react";
import IPreset from "../../types/EncodePreset";
import { Button, Modal } from "antd";
import { Formik } from "formik";
import { Form, Input, Table, AddRowButton, RemoveRowButton } from "formik-antd";
import { ColumnsType } from "antd/lib/table";
import IEncodeFormat from "../../types/EncodeProfile";
import SearchEncodeFormats from "../../components/EncodeFormatSearch";
import { DeleteOutlined } from "@ant-design/icons";
import { Encode } from "../../api/api";

interface ModalProps {
  state: string;
  onCancel: () => void;
  onSubmit: () => void;
  data?: IPreset;
  children?: React.ReactNode;
}

const PresetModal: React.FC<ModalProps> = ({
  state,
  onCancel,
  onSubmit,
  data,
}) => {
  const [searchData, setSearchData] = useState<IEncodeFormat | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  let initialValues: IPreset = data
    ? {
        id: data.id,
        name: data.name,
        description: data.description,
        formats: data.formats,
      }
    : {
        id: 0,
        name: "",
        description: "",
      };

  const encodeColumns: ColumnsType<IEncodeFormat> = [
    {
      key: "actions",
      render: (text, record, index) => (
        <RemoveRowButton
          style={{ border: "none" }}
          icon={<DeleteOutlined />}
          name="formats"
          index={index}
        />
      ),
    },
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
    <Modal
      visible={!!state}
      onCancel={onCancel}
      title={state + " Preset"}
      width={800}
      footer={[
        <Button
          type="primary"
          form="editPreset"
          key="submit"
          htmlType="submit"
          loading={loading}
        >
          {state}
        </Button>,
      ]}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, actions) => {
          setLoading(false);
          switch (state) {
            case "Create":
              Encode.createPreset(values);
              break;
            case "Update":
              Encode.updatePreset(values);
              break;
          }
          actions.setSubmitting(false);
          setLoading(false);
          onSubmit();
        }}
      >
        <Form id="editPreset">
          <Form.Item name="name" label="Name">
            <Input name="name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea name="description" />
          </Form.Item>
          <Table<IEncodeFormat>
            name="formats"
            columns={encodeColumns}
            pagination={false}
          />
          Add video format:
          <SearchEncodeFormats
            onSelect={(option) => {
              setSearchData(option);
            }}
          />
          <AddRowButton
            disabled={!searchData}
            name="formats"
            createNewRow={() => searchData}
          >
            Add
          </AddRowButton>
        </Form>
      </Formik>
    </Modal>
  );
};

export default PresetModal;

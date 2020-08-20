import React, { useState } from "react";
import IPreset from "../../types/EncodePreset";
import Modal from "antd/lib/modal/Modal";
import { Formik } from "formik";
import Axios from "axios";
import {
  SubmitButton,
  Form,
  Input,
  Table,
  AddRowButton,
  RemoveRowButton,
} from "formik-antd";
import { ColumnsType } from "antd/lib/table";
import IEncodeFormat from "../../types/EncodeProfile";
import SearchEncodeFormats from "../../components/EncodeFormatSearch";
import { DeleteOutlined } from "@ant-design/icons";

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
      visible={state ? true : false}
      onCancel={onCancel}
      title={state}
      okText={state}
      width={800}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, actions) => {
          switch (state) {
            case "Create":
              Axios.post<IPreset>(
                `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/encodes/presets`,
                { ...values },
                { withCredentials: true }
              );
              break;
            case "Update":
              console.log(values);
              Axios.put<IPreset>(
                `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/encodes/presets`,
                { ...values },
                { withCredentials: true }
              );
              break;
          }
          actions.setSubmitting(false);
          onSubmit();
        }}
      >
        <Form>
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
            disabled={!searchData ? true : false}
            name="formats"
            createNewRow={() => searchData}
          >
            Add
          </AddRowButton>
          <br />
          <SubmitButton>{state}</SubmitButton>
        </Form>
      </Formik>
    </Modal>
  );
};

export default PresetModal;
import React, { useState } from "react";
import { Typography, Table, Modal, Button, message } from "antd";
import IEncodeFormat from "../../types/EncodeProfile";
import { Encode } from "../../api/api";
import { Form, Input, InputNumber, Radio, Switch } from "formik-antd";
import { Formik, FormikHelpers } from "formik";
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
    Encode.getFormats().then((formats) => {
      setEncodeData(formats);
    });
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (
    values: IEncodeFormat,
    actions: FormikHelpers<IEncodeFormat>
  ) => {
    setLoading(true);
    if (selectedRec) {
      Encode.updateFormat(values).catch((err) => {
        message.error(JSON.stringify(err));
        return Promise.reject();
      });
    } else {
      Encode.createFormat(values).catch((err) => {
        message.error(JSON.stringify(err));
        return Promise.reject();
      });
    }

    actions.setSubmitting(false);
    message.success(
      `${!selectedRec ? "Created" : "Updated"} format successfully!`
    );
    setLoading(false);

    return Promise.resolve();
  };

  if (encodeData === undefined) {
    return <h1>loading</h1>;
  }
  let selData = encodeData[selectedRec ? selectedRec : 0];

  return (
    <>
      <Title>Encode Formats</Title>
      <Paragraph>
        An encode format is an individual job that is perfomed on a video file.
        We do this so when you watch a video on the website you will be able to
        select from a bunch of different qualities so people can have the best
        watch experience no matter the connection!
      </Paragraph>
      <Table
        columns={columns(0)}
        dataSource={encodeData}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setSelectedRec(rowIndex);
            },
          };
        }}
      />

      <Modal
        visible={selectedRec !== undefined}
        onCancel={() => {
          setSelectedRec(undefined);
        }}
        title={(selectedRec === undefined ? "New" : "Edit") + "encode format"}
        footer={[
          <Button
            type="primary"
            form="editFormat"
            key="submit"
            htmlType="submit"
            loading={loading}
          >
            Edit
          </Button>,
        ]}
      >
        <Formik initialValues={selData} onSubmit={handleSubmit}>
          <Form id="editFormat">
            <Form.Item name="name" label="Name">
              <Input name="name" />
            </Form.Item>
            <Form.Item name="description" label="description">
              <Input.TextArea name="description" />
            </Form.Item>
            <Form.Item name="width" label="Width">
              <InputNumber name="width" />
            </Form.Item>
            <Form.Item name="height" label="Height">
              <InputNumber name="height" />
            </Form.Item>
            <Form.Item name="arguments" label="Arguments">
              <Input.TextArea name="arguments" />
            </Form.Item>
            <Form.Item name="fileSuffix" label="File Suffix">
              <Input name="fileSuffix" />
            </Form.Item>
            <Form.Item name="mimeType" label="MIME Type">
              <Input name="mimeType" />
            </Form.Item>
            <Form.Item name="mode" label="Mode">
              <Radio.Group name="mode" buttonStyle="solid">
                <Radio.Button value="watch">Watch</Radio.Button>
                <Radio.Button value="download">Download</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="watermarked" label="Watermarked">
              <Switch name="watermarked" />
            </Form.Item>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default EncodeFormats;

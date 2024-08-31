import React from "react";
import { Formik, FormikHelpers } from "formik";
import { Form, Input, InputNumber, Radio, Select } from "formik-antd";
import { Button, Modal, message } from "antd";
import { IVideo } from "../../types/Video";
import { Dashboard } from "@uppy/react";
import Uppy from "@uppy/core";
import { getKey, TusConfig } from "../../api/upload";
import Tus from "@uppy/tus";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { useState } from "react";
import { Video } from "../../api/api";

const uppy = Uppy({
  meta: { type: "thumbnail" },
  restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["image/*"] },
}).use(Tus, TusConfig);

interface editProps {
  visible: boolean;
  initialValues: IVideo;
  onFinish: () => void;
}

const EditVideo: React.FC<editProps> = ({
  visible,
  initialValues,
  onFinish,
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (values: IVideo, actions: FormikHelpers<IVideo>) => {
    const submit = async (): Promise<void> => {
      await Video.updateVideoMeta(values).catch((err) => {
        message.error(err.message);
        setLoading(false);
        return Promise.reject();
      });
      actions.setSubmitting(false);
      onFinish();
      message.success("Updated video successfully!");
      return Promise.resolve();
    };
    setLoading(true);
    if (uppy.getFiles().length === 0) {
      submit()
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          return;
        });
    } else {
      uppy.upload().then((res) => {
        if (res.successful.length === 1) {
          values.thumbnail = getKey(res.successful[0]);
          submit()
            .then(() => {
              setLoading(false);
              return;
            })
            .catch(() => {
              return;
            });
        }
      });
    }
  };

  return (
    <Modal
      title="Update Video"
      okText={"Update"}
      visible={visible}
      onCancel={onFinish}
      footer={[
        <Button
          type="primary"
          form="editVideo"
          key="submit"
          htmlType="submit"
          loading={loading}
        >
          Update
        </Button>,
      ]}
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form id="editVideo">
          <Form.Item name="name" label="Name">
            <Input name="name" />
          </Form.Item>
          <Form.Item name="url" label="URL Name">
            <Input
              prefix={
                process.env.REACT_APP_PUBLIC_SITE_BASEURL +
                "/watch/{series path}/"
              }
              name="url"
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea name="description" />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select name="tags" mode="tags" />
          </Form.Item>
          <Form.Item name="thumbnail" label="Thumbnail">
            <Dashboard uppy={uppy} width="12rem" height="10rem" hideUploadButton={true} hideRetryButton={true}
                       hidePauseResumeButton={true} hideCancelButton={true} hideProgressAfterFinish={true}
                       proudlyDisplayPoweredByUppy={false} disableStatusBar={true} disableInformer={true} />
          </Form.Item>
          <Form.Item name="status" label="Visibility">
            <Radio.Group name="status" buttonStyle="solid">
              <Radio.Button value="public">Public</Radio.Button>
              <Radio.Button value="internal">Internal</Radio.Button>
              <Radio.Button value="private">Private</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="preset.presetID" label="Preset ID">
            <InputNumber name="preset.presetID" />
          </Form.Item>
        </Form>
      </Formik>
    </Modal>
  );
};

export default EditVideo;

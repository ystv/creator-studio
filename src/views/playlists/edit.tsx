import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { IPlaylist } from "../../types/Playlist";
import { Form, Input, Radio } from "formik-antd";
import { Button, message, Modal } from "antd";
import { Playlist } from "../../api/api";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { DragDrop } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { getKey, TusConfig } from "../../api/upload";

const uppy = Uppy({
  meta: { type: "thumbnail" },
  restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["image/*"] },
}).use(Tus, TusConfig);

interface editProps {
  visible: boolean;
  initialValues?: IPlaylist;
  onFinish: () => void;
}

const EditPlaylist: React.FC<editProps> = ({
  visible,
  initialValues,
  onFinish,
}): JSX.Element => {
  const isNew = initialValues === undefined ? true : false;
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (
    values: IPlaylist,
    actions: FormikHelpers<IPlaylist>
  ) => {
    const submit = (): Promise<void> => {
      if (initialValues) {
        Playlist.createPlaylist(values).catch((err) => {
          message.error(JSON.stringify(err));
          setLoading(false);
          return Promise.reject();
        });
      } else {
        Playlist.createPlaylist(values).catch((err) => {
          message.error(JSON.stringify(err));
          setLoading(false);
          return Promise.reject();
        });
      }

      actions.setSubmitting(false);
      onFinish();
      message.success(
        `${isNew ? "Created" : "Updated"} playlist successfully!`
      );
      return Promise.resolve();
    };
    setLoading(true);
    if (uppy.getFiles().length === 0) {
      submit().then(() => {
        setLoading(false);
      });
    } else {
      uppy.upload().then((res) => {
        if (res.successful.length === 1) {
          values.thumbnail = getKey(res.successful[0]);
          submit().then(() => {
            setLoading(false);
            return;
          });
        }
      });
    }
  };

  const newValues: IPlaylist = {
    playlistID: 0,
    name: "",
    description: "",
    thumbnail: "",
    status: "internal",
    videos: [],
    createdAt: new Date(),
    createdBy: 0,
  };

  if (!initialValues) {
    initialValues = newValues;
  }
  return (
    <Modal
      title={(isNew ? "Create" : "Edit") + " Playlist"}
      visible={visible}
      onCancel={onFinish}
      footer={[
        <Button
          type="primary"
          form="editPlaylist"
          key="submit"
          htmlType="submit"
          loading={loading}
        >
          {isNew ? "Create" : "Update"}
        </Button>,
      ]}
    >
      <Formik
        validateOnChange={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form id="editPlaylist">
          <Form.Item name="name" label="Name">
            <Input name="name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea name="description" />
          </Form.Item>
          <Form.Item name="thumbnail" label="Thumbnail">
            <DragDrop uppy={uppy} width="12rem" height="10rem" />
          </Form.Item>
          <Form.Item name="status" label="Publish type">
            <Radio.Group name="status" buttonStyle="solid">
              <Radio.Button value="public">Public</Radio.Button>
              <Radio.Button value="internal">Internal</Radio.Button>
              <Radio.Button value="private">Private</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Formik>
    </Modal>
  );
};

export default EditPlaylist;

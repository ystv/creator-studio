import React from "react";
import Axios from "axios";
import { Modal, Upload, message } from "antd";
import { IPlaylistNew } from "../../types/Playlist";
import { Formik } from "formik";
import { Form, Input, Radio } from "formik-antd";
import { InboxOutlined } from "@ant-design/icons";

interface ModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  playlist?: IPlaylistNew;
}

const PlaylistModifier: React.FC<ModalProps> = (props) => {
  let initialValues: IPlaylistNew = props.playlist
    ? {
        id: props.playlist.id,
        name: props.playlist.name,
        description: props.playlist.description,
        thumbnail: props.playlist.thumbnail,
        status: props.playlist.status,
        videos: props.playlist.videos,
      }
    : {
        name: "",
        description: "",
        thumbnail: "",
        status: "internal",
        videos: [],
      };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        Axios.put<IPlaylistNew>(
          `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/playlists`,
          { ...values },
          { withCredentials: true }
        );
        actions.setSubmitting(false);
        props.onSubmit();
      }}
    >
      <Modal
        visible={props.visible}
        onCancel={props.onCancel}
        onOk={props.onSubmit}
      >
        <Form>
          <Form.Item name="name">
            <Input name="name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea name="description" />
          </Form.Item>
          <Form.Item label="Publish type" name="Publish">
            <Radio.Group name="status" buttonStyle="solid">
              <Radio.Button value="public">Public</Radio.Button>
              <Radio.Button value="internal">Internal</Radio.Button>
              <Radio.Button value="private">Private</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Thumbnail" name="thumbnail">
            <Form.Item name="dragger" valuePropName="fileList" noStyle>
              <Upload.Dragger
                name="thumbail"
                multiple={false}
                action={`${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/playlists/thumb`}
                onChange={(info) => {
                  const { status } = info.file;
                  if (status !== "uploading") {
                    console.log(info.file, info.fileList);
                  }
                  if (status === "done") {
                    message.success(
                      `${info.file.name} file uploaded successfully.`
                    );
                  } else if (status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </Formik>
  );
};

export default PlaylistModifier;

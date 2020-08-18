import React from "react";
import { Formik } from "formik";
import { IPlaylist } from "../../types/Playlist";
import { Form, Input, SubmitButton, Radio } from "formik-antd";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import Axios from "axios";

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const CreateModal: React.FC = () => {
  const initialValues: IPlaylist = {
    playlistID: 0,
    name: "",
    description: "",
    thumbnail: "",
    status: "internal",
    createdAt: new Date(),
    createdBy: 0,
  };
  return (
    <>
      <Formik
        validateOnChange={true}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          Axios.post<IPlaylist>(
            `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/playlists`,
            { ...values },
            { withCredentials: true }
          ).then((res) => {
            console.log(res);
          });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting, isValid, dirty }) => (
          <Form>
            <Form.Item label="Name" name="name">
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
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger
                  name="thumbail"
                  multiple={false}
                  action="/upload.do"
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
            <SubmitButton
              type="primary"
              disabled={isSubmitting || !isValid || !dirty}
            >
              Create
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateModal;

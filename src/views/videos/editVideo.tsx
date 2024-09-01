import React, {useState, createRef} from "react";
import { Formik, FormikHelpers } from "formik";
import { Form, Input, InputNumber, Radio, Select } from "formik-antd";
import { Button, Modal, message } from "antd";
import { IVideo } from "../../types/Video";
import Dashboard from "@uppy/dashboard";
import Uppy from "@uppy/core";
import { getKey, TusConfig } from "../../api/upload";
import Tus from "@uppy/tus";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { Video } from "../../api/api";
import { Token } from "../../api/auth";

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
  var inited = false;
  const inputRef = createRef<HTMLDivElement>();
  const [loading, setLoading] = useState<boolean>(false);
  console.log(0)
  var uppy = Uppy()
  Token.getToken().then(accessToken => {
    var divEl = document.getElementById("editVideoThumbnailUpload");
    if (divEl !== null) {
      if (inited || divEl.firstChild !== null) {
        return
      }
    }
    inited = true
    var tusConfig = TusConfig;

    tusConfig.headers = {
      authorization: `Bearer ${accessToken.token}`,
    };

    try {
      uppy = Uppy({
        meta: {type: "thumbnail"},
        restrictions: {maxNumberOfFiles: 1, allowedFileTypes: ["image/*"]},
      })

      uppy.use(Dashboard, {
        inline: true, target: inputRef.current, width: "12rem", height: "10rem",
        hideUploadButton: true, hideRetryButton: true, hidePauseResumeButton: true, hideCancelButton: true,
        hideProgressAfterFinish: true, proudlyDisplayPoweredByUppy: false, disableStatusBar: true, disableInformer: true
      }).use(Tus, tusConfig);

      if (divEl !== null) {
        divEl.removeAttribute("ref");
      }
    } catch (error) {
      console.log(error);
    }
  })
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
              var divEl = document.getElementById("editVideoThumbnailUpload");
              if (divEl !== null) {
                while (divEl.firstChild) {
                  if (divEl.lastChild !== null) {
                    divEl.removeChild(divEl.lastChild);
                  }
                }
              }
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
            <div id="editVideoThumbnailUpload" ref={inputRef}></div>
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

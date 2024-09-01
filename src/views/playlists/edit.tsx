import React, {createRef, useState} from "react";
import { Formik, FormikHelpers } from "formik";
import { IPlaylist } from "../../types/Playlist";
import { Form, Input, Radio } from "formik-antd";
import {Button, Image, message, Modal} from "antd";
import { Playlist } from "../../api/api";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import Dashboard from "@uppy/dashboard";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { getKey, TusConfig } from "../../api/upload";
import {Token} from "../../api/auth";

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
  var inited = false;
  const inputRef = createRef<HTMLDivElement>();
  const isNew = initialValues === undefined;
  const [loading, setLoading] = useState<boolean>(false);
  var uppy = Uppy()
  Token.getToken().then(accessToken => {
    var divEl = document.getElementById("editPlaylistThumbnailUpload");
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

      // if (divEl !== null) {
      //   divEl.removeAttribute("ref");
      // }
    } catch (error) {
      console.log(error);
    }
  })
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
            var divEl = document.getElementById("editPlaylistThumbnailUpload");
            if (divEl !== null) {
              while (divEl.firstChild) {
                if (divEl.lastChild !== null) {
                  divEl.removeChild(divEl.lastChild);
                }
              }
            }
            uppy.reset();
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
        <p>Please note that this website is a bit buggy and you are required to reload if you want to upload more
          than 1 image.</p>
        <Form id="editPlaylist">
          <Form.Item name="name" label="Name">
            <Input name="name"/>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea name="description"/>
          </Form.Item>
          <Form.Item name="thumbnail" label="Thumbnail">
            <div id="editPlaylistThumbnailUpload" ref={inputRef}></div>
            <Image src={initialValues.thumbnail} width="12rem" max-height="10rem"></Image>
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

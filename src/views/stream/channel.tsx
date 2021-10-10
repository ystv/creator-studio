import { Button, message, Modal, Table, Divider } from "antd";
import { Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { Channel } from "../../api/api";
import IChannel from "../../types/Channel";
import { Typography } from "antd";
import { Form, Input, Radio, DatePicker } from "formik-antd";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { getKey, TusConfig } from "../../api/upload";
import { DragDrop } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";


const { Title, Paragraph } = Typography;

const uppy = Uppy({
    meta: { type: "thumbnail" },
    restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["image/*"] },
  }).use(Tus, TusConfig);

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
        title: "Status",
        dataIndex: "status",
        key: `status-${id}`,
      },
      {
        title: "URL Name",
        dataIndex: "urlName",
        key: `urlName-${id}`,
      },
      {
        title: "Scheduled Start",
        dataIndex: "scheduledStart",
        key: `scheduledStart-${id}`,
      },
    ];
  };
  
  const Channels: React.FC = ():JSX.Element => {
    const [channelData, setChannelData] = useState<IChannel[] | undefined>(
      undefined
    );
    const [selectedRec, setSelectedRec] = useState<IChannel | undefined>(
      undefined
    );
    useState(() => {
      Channel.getChannels().then((channels) => {
        setChannelData(channels);
      });
    });
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleSubmit = (
      values: IChannel,
      actions: FormikHelpers<IChannel>
    ) => {
        const submit = async (): Promise<void> => {
            if (selectedRec === undefined) {
                await Channel.createChannel(values).catch((err) => {
                    message.error(err.message);
                    setLoading(false);
                    return Promise.reject();
                  });
            } else {
                await Channel.updateChannel(values).catch((err) => {
                    message.error(err.message);
                    setLoading(false);
                    return Promise.reject();
                  });
            }
            
            actions.setSubmitting(false);
            setSelectedRec(undefined);
            message.success(
                `${!selectedRec ? "Created" : "Updated"} channel successfully!`
              );
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
            return Promise.resolve();
    
    };
  
    if (channelData === undefined) {
      return <h1>loading</h1>;
    }
  
    let selData: IChannel = selectedRec
      ? selectedRec
      : {
          name: "",
          description: "",
          location: "",
          outputType: "",
          outputURL: "",
          scheduledStart: new Date(),
          scheduledEnd: new Date(),
          status: "",
          thumbnail: "",
          urlName: "",
          visibility: "",
        };
  
    return (
      <>
        <Title>Channels</Title>
        <Paragraph>
          A channel is what people can watch on the website. You can
          make as many channels as you like.
        </Paragraph>
        <Table
          columns={columns(0)}
          dataSource={channelData}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                setSelectedRec(record);
              },
            };
          }}
        />
  
        <Modal
          visible={selectedRec !== undefined}
          onCancel={() => {
            setSelectedRec(undefined);
          }}
          title={(selectedRec === undefined ? "New" : "Edit") + " channel"}
          footer={[
            <Button
              type="primary"
              form="editChannel"
              key="submit"
              htmlType="submit"
              loading={loading}
            >
              Edit
            </Button>,
          ]}
        >
          <Formik
            initialValues={selData}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form id="editChannel">
            <Divider orientation="left">Website Configuration</Divider>
              <Form.Item name="name" label="Name">
                <Input name="name" />
              </Form.Item>
              <Form.Item name="urlName" label="URL Name">
                <Input name="urlName" />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea name="description" />
              </Form.Item>
              <Form.Item name="location" label="Location">
                <Input name="location" />
              </Form.Item>
              <Form.Item name="thumbnail" label="Thumbnail">
                <DragDrop uppy={uppy} width="12rem" height="10rem" />
              </Form.Item>
              <Divider orientation="left">Status Configuration</Divider>
              <Form.Item name="status" label="Status">
                <Radio.Group name="status" buttonStyle="solid">
                  <Radio.Button value="live">Live</Radio.Button>
                  <Radio.Button value="scheduled">Scheduled</Radio.Button>
                  <Radio.Button value="cancelled">Cancelled</Radio.Button>
                  <Radio.Button value="finished">Finished</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="visibility" label="Visibility">
                <Radio.Group name="visibility" buttonStyle="solid">
                  <Radio.Button value="internal">Internal</Radio.Button>
                  <Radio.Button value="public">Public</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="scheduledStart" label="Scheduled Start">
                <DatePicker name="scheduledStart" />
              </Form.Item>
              <Form.Item name="scheduledEnd" label="Scheduled End">
                <DatePicker name="scheduledEnd" />
              </Form.Item>
              <Divider orientation="left">Stream Configuration</Divider>
              <Form.Item name="outputType" label="Output Type">
              <Radio.Group name="outputType" buttonStyle="solid">
                  <Radio.Button value="hls">HLS</Radio.Button>
                  <Radio.Button value="iframe">iframe</Radio.Button>
              </Radio.Group>
              </Form.Item>
              <Form.Item name="outputURL" label="Output URL">
                <Input name="outputURL" />
              </Form.Item>
            </Form>
          </Formik>
        </Modal>
      </>
    );
  };

  export default Channels;

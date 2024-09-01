import {Button, message, Modal, Table, Divider, Space, Image} from "antd";
import {Formik, FormikHelpers} from "formik";
import React, {createRef, useEffect, useState} from "react";
import {Channel} from "../../api/api";
import IChannel from "../../types/Channel";
import {Typography} from "antd";
import {Form, Input, Radio, DatePicker} from "formik-antd";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import {getKey, TusConfig} from "../../api/upload";
import Dashboard from "@uppy/dashboard";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import {Token} from "../../api/auth";

const {Title, Paragraph} = Typography;

const columns = [
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Description",
        dataIndex: "description",
    },
    {
        title: "Status",
        dataIndex: "status",
    },
    {
        title: "URL Name",
        dataIndex: "urlName",
    },
    {
        title: "Scheduled Start",
        dataIndex: "scheduledStart",
    },
];

const Channels: React.FC = (): JSX.Element => {
    var inited = false;
    const inputRef = createRef<HTMLDivElement>();
    const [channelData, setChannelData] = useState<IChannel[] | undefined>(
        undefined
    );
    const [selectedRec, setSelectedRec] = useState<IChannel | undefined>(
        undefined
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
        Channel.getChannels().then((channels) => {
            setChannelData(channels);
            setLoading(false);
        });
    }, [loading]);

    const refresh = () => {
        setLoading(true);
    };

    var uppy = Uppy()
    Token.getToken().then(accessToken => {
        var divEl = document.getElementById("editChannelThumbnailUpload");
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
                allowMultipleUploads: true,
                restrictions: {maxNumberOfFiles: 1, allowedFileTypes: ["image/*"]},
            })

            uppy.use(Dashboard, {
                inline: true, target: inputRef.current, width: "12rem", height: "10rem",
                hideUploadButton: true, hideRetryButton: true, hidePauseResumeButton: true, hideCancelButton: true,
                hideProgressAfterFinish: true, proudlyDisplayPoweredByUppy: false, disableStatusBar: true, disableInformer: true
            }).use(Tus, tusConfig);

            // if (divEl !== null) {
            //     divEl.removeAttribute("ref");
            // }
        } catch (error) {
            console.log(error);
        }
    })

    const handleSubmit = (values: IChannel, actions: FormikHelpers<IChannel>) => {
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
            setVisible(false);
            refresh();
            message.success(
                `${!selectedRec ? "Created" : "Updated"} channel successfully!`
            );
            return Promise.resolve();
        };
        setLoading(true);
        if (uppy.getFiles().length === 0) {
            console.log(1)
            submit()
                .then(() => {
                    console.log(2)
                    setLoading(false);
                    uppy.reset();
                    uppy.close();
                    inited = false;
                })
                .catch(() => {
                    console.log(3)
                    uppy.reset();
                    uppy.close();
                    inited = false;
                    return;
                });
        } else {
            console.log(4)
            uppy.upload().then((res) => {
                console.log(5)
                if (res.successful.length === 1) {
                    console.log(6)
                    values.thumbnail = getKey(res.successful[0]);
                    submit()
                        .then(() => {
                            console.log(7)
                            setLoading(false);
                            // var divEl = document.getElementById("editChannelThumbnailUpload");
                            // if (divEl !== null) {
                            //     while (divEl.firstChild) {
                            //         if (divEl.lastChild !== null) {
                            //             divEl.removeChild(divEl.lastChild);
                            //         }
                            //     }
                            // }
                            uppy.removeFile(uppy.getFiles()[0].id)
                            uppy.reset();
                            uppy.close();
                            inited = false;
                            return;
                        })
                        .catch(() => {
                            console.log(8)
                            uppy.removeFile(uppy.getFiles()[0].id)
                            uppy.reset();
                            uppy.close();
                            inited = false;
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
            scheduledStart: new Date(new Date().setHours(0, 0, 0, 0)),
            scheduledEnd: new Date(new Date().setHours(23, 0, 0, 0)),
            status: "",
            thumbnail: "",
            urlName: "",
            visibility: "",
        };

    return (
        <>
            <Title>Channels</Title>
            <Paragraph>
                A channel is what people can watch on the website. You can make as many
                channels as you like.<br/><br/>

                Please note that this website is a bit buggy and you are required to reload if you want to upload more
                than 1 image.
            </Paragraph>
            <Space style={{marginBottom: 16}}>
                <Button
                    onClick={() => {
                        setVisible(true);
                    }}
                    type="primary"
                >
                    New
                </Button>
            </Space>
            <Button onClick={refresh} style={{float: "right"}}>
                Refresh
            </Button>
            <Table
                columns={columns}
                dataSource={channelData}
                rowKey={"urlName"}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setSelectedRec(record);
                            setVisible(true);
                        },
                    };
                }}
            />

            <Modal
                visible={visible}
                onCancel={() => {
                    setSelectedRec(undefined);
                    setVisible(false);
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
                        {selectedRec === undefined ? "New" : "Edit"}
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
                            <Input name="name"/>
                        </Form.Item>
                        <Form.Item name="urlName" label="URL Name">
                            <Input name="urlName" disabled={!!selectedRec}/>
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <Input.TextArea name="description"/>
                        </Form.Item>
                        <Form.Item name="location" label="Location">
                            <Input name="location"/>
                        </Form.Item>
                        <Form.Item name="thumbnail" label="Thumbnail">
                            <div id="editChannelThumbnailUpload" ref={inputRef}></div>
                            <Image src={selData.thumbnail} width="12rem" max-height="10rem" ></Image>
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
                            <DatePicker showTime name="scheduledStart"/>
                        </Form.Item>
                        <Form.Item name="scheduledEnd" label="Scheduled End">
                            <DatePicker showTime name="scheduledEnd"/>
                        </Form.Item>
                        <Divider orientation="left">Stream Configuration</Divider>
                        <Form.Item name="outputType" label="Output Type">
                            <Radio.Group name="outputType" buttonStyle="solid">
                                <Radio.Button value="hls">HLS</Radio.Button>
                                <Radio.Button value="iframe">iframe</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="outputURL" label="Output URL">
                            <Input name="outputURL"/>
                        </Form.Item>
                    </Form>
                </Formik>
            </Modal>
        </>
    );
};

export default Channels;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/form.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Button, InputNumber } from "antd";
import {
  Form,
  Input,
  DatePicker,
  SubmitButton,
  Select,
  Radio,
} from "formik-antd";
import { Formik, FormikConfig } from "formik";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import { Video } from "../api/api";
import { INewVideo } from "../types/Video";

const Wizard = () => {
  const initialValues: INewVideo = {
    fileID: "",
    seriesID: 1,
    name: "",
    urlName: "",
    description: "",
    tags: [],
    preset: 0,
    publishType: "internal",
    broadcastDate: new Date(),
  };

  let fileID = "";

  const uppy = Uppy({
    restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["video/*"] },
    autoProceed: true,
  }).use(Tus, {
    endpoint: `${process.env.REACT_APP_UPLOAD_ENDPOINT}`,
    resume: true,
    withCredentials: true,
    autoretry: true,
    retryDelays: [0, 1000, 3000, 5000],
  });

  uppy.on("complete", (res) => {
    if (res.successful.length === 0) {
      console.log("no succesful uploads");
      return;
    }
    const video = res.successful[0].response;
    if (video) {
      if (video.uploadURL) {
        fileID = video.uploadURL.substring(
          video.uploadURL.lastIndexOf("/") + 1
        ); // contains the object key
      }
    }
  });

  const history = useHistory();

  return (
    <FormikStepper
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        values.fileID = fileID;
        Video.createVideo(values)
          .then((res) => {
            actions.setSubmitting(false);
            history.push(`/videos/${res.id}`);
          })
          .catch((err) => {
            alert(JSON.stringify(err, null, 2));
            actions.setSubmitting(false);
          });
      }}
    >
      <FormikStep>
        <Dashboard uppy={uppy} showProgressDetails={true} theme="auto" />
      </FormikStep>
      <FormikStep>
        <Form.Item name="seriesID" label="Series ID">
          <InputNumber name="seriesID" />
        </Form.Item>
      </FormikStep>
      <FormikStep>
        <Form>
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
          <Form.Item name="preset" label="Preset ID">
            <InputNumber name="preset" />
          </Form.Item>
          <Form.Item name="publishType" label="Publish Type">
            <Radio.Group name="publishType" buttonStyle="solid">
              <Radio.Button value="public">Public</Radio.Button>
              <Radio.Button value="internal">Internal</Radio.Button>
              <Radio.Button value="private">Private</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="broadcastDate" label="Broadcast Date">
            <DatePicker name="broadcastDate" />
          </Form.Item>
        </Form>
      </FormikStep>
    </FormikStepper>
  );
};

interface FormikStepProps
  extends Pick<FormikConfig<INewVideo>, "children" | "validationSchema"> {}

function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

function FormikStepper({ children, ...props }: FormikConfig<INewVideo>) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[
    step
  ] as React.ReactElement<FormikStepProps>;
  console.log("children", currentChild);

  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      <Form autoComplete="off">
        {currentChild}
        <Button onClick={() => setStep((s) => s - 1)} disabled={step === 0}>
          Back
        </Button>
        <SubmitButton>{isLastStep() ? "Finish" : "Next"}</SubmitButton>
      </Form>
    </Formik>
  );
}

export default Wizard;

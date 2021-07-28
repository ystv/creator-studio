import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/form.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Button, InputNumber } from "antd";
import { Input, DatePicker, SubmitButton } from "formik-antd";
import { Formik, Form, FormikConfig } from "formik";
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
    tags: ["Funky", "Epic"],
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
      return
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
    <>
      <FormikStepper
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          values.fileID = fileID;
          Video.createVideo(values)
          .then(res => {
            actions.setSubmitting(false);
            history.push(`/videos/${res.id}`);
          })
          .catch(err => {
            alert(JSON.stringify(err, null, 2));
            actions.setSubmitting(false);
          });
        }}
      >
        <FormikStep>
          <Dashboard uppy={uppy} showProgressDetails={true} theme="auto" />
        </FormikStep>
        <FormikStep>
          series ID
          <InputNumber name="seriesID" id="seriesID" />
        </FormikStep>
        <FormikStep>
          name
          <Input name="name" />
          url name
          <Input name="urlName" />
          description
          <Input.TextArea name="description" />
          {/* tags
          <Input name="tags" /> */}
          preset ID
          <InputNumber name="preset" />
          publish
          <Input name="publishType" />
          date
          <DatePicker name="broadcastDate" />
        </FormikStep>
      </FormikStepper>
    </>
  );
};

interface FormikStepProps
  extends Pick<FormikConfig<INewVideo>, "children" | "validationSchema"> {}

function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

function FormikStepper({ children, ...props }: FormikConfig<INewVideo>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    FormikStepProps
  >[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step] as React.ReactElement<
    FormikStepProps
  >;
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

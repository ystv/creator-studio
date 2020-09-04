import React, { useState } from "react";
import "../styles/form.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Button, InputNumber } from "antd";
import { Input, DatePicker, SubmitButton } from "formik-antd";
import { Formik, Form, FormikConfig } from "formik";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import Axios from "axios";

// export default UploadForm;

interface IWizard {
  fileID: string;
  seriesID: number;
  name: string;
  urlName: string;
  description: string;
  tags: string[];
  preset: number;
  publishType: string;
  broadcastDate: Date;
}

const Wizard = () => {
  const initialValues: IWizard = {
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

  uppy.on("complete", (result) => {
    const video = result.successful[0].response;
    if (video) {
      if (video.uploadURL) {
        fileID = video.uploadURL.substring(
          video.uploadURL.lastIndexOf("/") + 1
        ); // contains the object key
      }
    }
  });

  return (
    <>
      <FormikStepper
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          values.fileID = fileID;
          Axios.post<IWizard>(
            `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/videos`,
            { ...values },
            { withCredentials: true }
          ).then((res) => {
            console.log(res);
          });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
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
  extends Pick<FormikConfig<IWizard>, "children" | "validationSchema"> {}

function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

function FormikStepper({ children, ...props }: FormikConfig<IWizard>) {
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

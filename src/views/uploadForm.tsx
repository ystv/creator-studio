import React, { useState } from "react";
import "../styles/form.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Button } from "antd";
import { Input, DatePicker, SubmitButton } from "formik-antd";
import { Formik, Form, FormikConfig, FormikValues } from "formik";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";

// export default UploadForm;

interface IWizard {
  fileID: number;
  title: string;
  description: string;
  tags: string;
  publish: string;
  date: Date;
}

const Wizard = () => {
  const initialValues: IWizard = {
    fileID: 0,
    title: "",
    description: "",
    tags: "",
    publish: "internal",
    date: new Date(),
  };
  return (
    <>
      <FormikStepper
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
        }}
      >
        <FormikStep>
          file
          <Input name="fileID" />
        </FormikStep>
        <FormikStep>
          name
          <Input name="name" />
          description
          <Input.TextArea name="description" />
          tags
          <Input name="tags" />
          publish
          <Input name="publish" />
          date
          <DatePicker name="date" />
        </FormikStep>
      </FormikStepper>
    </>
  );
};

interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {}

function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
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
        <SubmitButton
          onClick={() => {
            console.log("bop");
          }}
        >
          {isLastStep() ? "Finish" : "Next"}
        </SubmitButton>
      </Form>
    </Formik>
  );
}

export default Wizard;

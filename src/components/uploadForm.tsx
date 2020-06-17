import React, { useState } from "react";
import { Formik, Form } from "formik";
import "../styles/form.css";
import Upload from "./forms/upload";
import Meta from "./forms/metadata";
import Publish from "./forms/publish";
import { Steps, Button } from "antd";
const { Step } = Steps;

// const Wizard = ({ children, initialValues, onSubmit}) => {
//     const [stepNumber, setStepNumber] = useState(0);
//     const steps = React.Children.toArray(children);
//     const [snapshot, setSnapshot] = useState(initialValues);

//     const step = steps[stepNumber];
//     const totalSteps = steps.length;
//     const isLastStep = stepNumber === totalSteps - 1;

//     const next = (values) => {
//         setSnapshot(values);
//         setStepNumber(Math.min(stepNumber + 1, totalSteps -1 ))
//     };

//     const previous = values => {
//         setSnapshot(values);
//         setStepNumber(Math.max(stepNumber - 1, 0));
//     };

//     const handleSubmit = async (values, bag) => {
//         if (step.props.onSubmit) {
//             await step.props.onSubmit(values, bag);
//         }
//         if (isLastStep) {
//             return onSubmit(values, bag);
//         } else {
//             bag.setTouched({});
//             next(values);
//         }
//     }

//     return (
//         <Formik
//             initialValues={snapshot}
//             onSubmit={handleSubmit}
//             validationSchema={step.props.validationSchema}
//     )
// }

const steps = [
  {
    title: "Upload Video",
    content: <Upload />,
  },
  {
    title: "Video details",
    content: <Meta />,
  },
  {
    title: "Publish",
    content: <Publish />,
  },
];

const UploadForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <React.Fragment>
      <Steps current={currentStep}>
        {steps.map((item: any) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
      </div>
    </React.Fragment>
  );
};

export default UploadForm;

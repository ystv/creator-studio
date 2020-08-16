import React from "react";
import { Formik } from "formik";
import { Form, Input, DatePicker, SubmitButton, Radio } from "formik-antd";
import { Space } from "antd";
import * as yup from "yup";

const validationSchema = yup.object({
  Title: yup.string().required().max(50),
  Date: yup.date().min(new Date()),
  Publish: yup.string().required(),
});

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Meta: React.FC = () => {
  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        uri: "",
        Title: "",
        Description: "",
        Tags: "",
        Publish: "",
        Date: new Date(),
      }}
      validationSchema={validationSchema}
      onSubmit={(data, { setSubmitting }) => {
        console.log(data);
        setSubmitting(true);
        // TODO POST API
        setSubmitting(false);
      }}
    >
      {({ values, errors, isSubmitting, isValid, dirty }) => (
        <Form {...layout}>
          <Form.Item label="Title" name="Title">
            <Input name="Title" />
          </Form.Item>
          <Form.Item label="Description" name="Description">
            <Input.TextArea name="Description" />
          </Form.Item>
          <Form.Item label="Tags" name="Tags">
            <Input name="Tags" />
          </Form.Item>
          <Form.Item label="Publish type" name="Publish">
            <Radio.Group name="Publish" buttonStyle="solid">
              <Radio.Button value="now">Now</Radio.Button>
              <Radio.Button value="schedule">Schedule</Radio.Button>
              <Radio.Button value="internal">Internal</Radio.Button>
              <Radio.Button value="private">Private</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Space>
            {values.Publish === "schedule" && (
              <DatePicker showTime showSecond={false} name="Date" />
            )}
            <SubmitButton
              type="primary"
              disabled={isSubmitting || !isValid || !dirty}
            >
              Create
            </SubmitButton>
          </Space>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default Meta;

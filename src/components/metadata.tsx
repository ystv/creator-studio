import React from "react";
import { Formik, Form as FormikForm, Field } from "formik";
import * as yup from "yup";
import "tabler-react/dist/Tabler.css";
const { Card, Button, Form } = require("tabler-react");

const validationSchema = yup.object({
  title: yup.string().required().max(50),
});

const Meta: React.FC = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Video details</Card.Title>
      </Card.Header>
      <Card.Body>
        <Formik
          validateOnChange={true}
          initialValues={{
            title: "",
            description: "",
            date: new Date(),
            internal: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            console.log(data);
            setSubmitting(true);
            // TODO POST API
            setSubmitting(false);
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <FormikForm>
              <Field label="Title" name="title" as={Form.Input} />
              <Field
                label="Description"
                name="description"
                as={Form.Textarea}
              />
              <Field
                label="Release date"
                name="date"
                type=""
                as={Form.DatePicker}
              />
              <Button disabled={isSubmitting}>Submit</Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </FormikForm>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default Meta;

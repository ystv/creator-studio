import React from "react";
// import { withFormik, FormikProps, Form } from "formik";
import * as Yup from "yup";
// import { Card, Button } from "tabler-react";
import "tabler-react/dist/Tabler.css";
const { Card, Button, Form } = require("tabler-react");

// interface FormValues {
//   name: string;
//   descrption: string;
// }

// interface OtherProps {
//   note?: string;
// }

// interface MyFormProps {
//   initialName?: string;
//   initialDescription?: string;
// }

// const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
//   const {
//     values,
//     errors,
//     touched,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     isSubmitting,
//     title,
//   } = props;

//   return (
//     <Wrapper>
//       <h1>{title}</h1>
//       <form onSubmit={handleSubmit}>
//         <InputWrapper>
//           <Label>Video name</Label>
//           <Input
//             width={50}
//             type="name"
//             name="name"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.name}
//           />
//         </InputWrapper>

//         <InputWrapper>
//           <Label>Description</Label>
//           <Input
//             width={50}
//             type="description"
//             name="description"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.descrption}
//           />
//         </InputWrapper>

//         <button
//           type="submit"
//           disabled={
//             isSubmitting ||
//             !!(errors.name && touched.name) ||
//             !!(errors.descrption && touched.descrption)
//           }
//         >
//           Create Video
//         </button>
//       </form>
//     </Wrapper>
//   );
// };

const Meta = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Video details</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Input name="name" label="Name" isRequired />
          <Form.Textarea name="description" label="Description" />
          <Form.DatePicker format="dd/mm/yyyy" />
          <Button type="submit" value="Submit" />
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Meta;

import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotFound: React.FC = (props: any): JSX.Element => {
  return (
    <Result
      status="404"
      title="404 - Not found"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Go home</Button>
        </Link>
      }
    />
  );
};

export default NotFound;

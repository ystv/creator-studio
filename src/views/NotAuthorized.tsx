import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotAuthorized: React.FC = (): JSX.Element => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to acess this page."
      extra={
        <Link to="/">
          <Button type="primary">Go home</Button>
        </Link>
      }
    />
  );
};

export default NotAuthorized;

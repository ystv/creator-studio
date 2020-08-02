import React from "react";
import { Button, Result } from "antd";

const Publish = () => {
  return (
    <React.Fragment>
      <Result
        status="success"
        title="Published video!"
        subTitle="video set for release on 18th April"
        extra={<Button type="primary">Upload another</Button>}
      />
    </React.Fragment>
  );
};

export default Publish;

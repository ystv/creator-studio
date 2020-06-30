import React from "react";
import { Typography, Form, Checkbox, Button, Row, Col } from "antd";
const { Title } = Typography;

const Settings = () => {
  return (
    <React.Fragment>
      <Title>Settings</Title>
      <Form>
        <Title level={2}>General</Title>
        <Form.Item>
          <Checkbox>Receive email alerts</Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox>Computing Team mode</Checkbox>
        </Form.Item>
        <Title level={2}>Home Items</Title>
        <Form.Item>
          <Row>
            <Col>
              <Checkbox>How-to's</Checkbox>
              <Checkbox>Statistics</Checkbox>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary">Save</Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default Settings;

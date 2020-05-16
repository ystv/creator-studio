import React from "react";
import "tabler-react/dist/Tabler.css";
const { Card, Table, Button, Tag } = require("tabler-react");

const Videos = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Uploaded Videos</Card.Title>
        <Card.Options>
          <Button color="secondary" size="sm">
            Refresh
          </Button>
        </Card.Options>
      </Card.Header>
      <Table
        bodyItems={[
          {
            key: 1,
            item: [
              { content: "1" },
              { content: "ERN 2020" },
              {
                content: <Tag color="warning">Processing</Tag>,
              },
              { content: <Tag avatar="logo192.png">Rhys Milling</Tag> },
              { content: "12/03/2020" },
              {
                content: (
                  <div>
                    <Button outline color="success" size="sm">
                      Approve
                    </Button>
                    <Button outline color="danger" size="sm">
                      Delete
                    </Button>
                  </div>
                ),
              },
            ],
          },
        ]}
        headerItems={[
          { content: "ID" },
          { content: "Name" },
          { content: "Status" },
          { content: "Uploaded by" },
          { content: "Date Uploaded" },
          { content: "Action" },
        ]}
      />
    </Card>
  );
};

export default Videos;

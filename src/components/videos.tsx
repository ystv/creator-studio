import React, { useEffect, useState } from "react";
import "tabler-react/dist/Tabler.css";
const { Card, Table, Button, Tag } = require("tabler-react");

const Videos = () => {
  const [creations, setCreations] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    const res = await fetch("http://localhost:8081/v1/internal/creator");
    const data = await res.json();
    const [item] = data.results;
    setCreations(item);
  }, [isLoading]);

  return (
    <Card>
      <h1>Test</h1>
      {creations && <div>creations.Name</div>}
      <Card.Header>
        <Card.Title>Uploaded Videos</Card.Title>
        <Card.Options>
          <Button onClick={setCreations} color="secondary" size="sm">
            Refresh
          </Button>
        </Card.Options>
      </Card.Header>
      {isLoading && <p>Fetching the latest videos!</p>}
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

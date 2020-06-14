import React from "react";
import "tabler-react/dist/Tabler.css";
import useCreationsService from "../services/useCreationsService";
const { Card, Table, Button, Tag } = require("tabler-react");

const Creations: React.FC<{}> = () => {
  const service = useCreationsService();
  return (
    <div>
      {service.status === "loading" && <div>Loading...</div>}
      {service.status === "loaded" &&
        console.log(typeof service.payload.results) &&
        service.payload.results.map((creation) => (
          <div key={creation.ID}>{creation.Name}</div>
        ))}
      {service.status === "error" && <div>Error, the backend is not ideal</div>}
    </div>
  );
};

const Videos = () => {
  return (
    <Card>
      <h1>Test</h1>
      <Creations />
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

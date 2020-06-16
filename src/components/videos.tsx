import React, { Suspense } from "react";
import useSWR from "swr";

const Creations: React.FC<{}> = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    "http://localhost:8081/v1/internal/creator",
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading</div>;
  return <div>My stuff {JSON.stringify(data)}</div>;
};

const Videos = () => {
  return (
    <Creations />
    //   <Card.Header>
    //     <Card.Title>Uploaded Videos</Card.Title>
    //     <Card.Options>
    //       <Button color="secondary" size="sm">
    //         Refresh
    //       </Button>
    //     </Card.Options>
    //   </Card.Header>
    //   <Table
    //     bodyItems={[
    //       {
    //         key: 1,
    //         item: [
    //           { content: "1" },
    //           { content: "ERN 2020" },
    //           {
    //             content: <Tag color="warning">Processing</Tag>,
    //           },
    //           { content: <Tag avatar="logo192.png">Rhys Milling</Tag> },
    //           { content: "12/03/2020" },
    //           {
    //             content: (
    //               <div>
    //                 <Button outline color="success" size="sm">
    //                   Approve
    //                 </Button>
    //                 <Button outline color="danger" size="sm">
    //                   Delete
    //                 </Button>
    //               </div>
    //             ),
    //           },
    //         ],
    //       },
    //     ]}
    //     headerItems={[
    //       { content: "ID" },
    //       { content: "Name" },
    //       { content: "Status" },
    //       { content: "Uploaded by" },
    //       { content: "Date Uploaded" },
    //       { content: "Action" },
    //     ]}
    //   />
    // </Card>
  );
};

export default Videos;

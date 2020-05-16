import React from "react";
import Uploader from "./upload";
import Meta from "./metadata";
import Videos from "./videos";
import "tabler-react/dist/Tabler.css";
const { Card, Grid } = require("tabler-react");

const Main = () => {
  return (
    <React.Fragment>
      <h1>YSTV Creator Studio</h1>
      <Grid.Row>
        <Grid.Col>
          <Uploader />
        </Grid.Col>
        <Grid.Col>
          <Meta />
        </Grid.Col>
      </Grid.Row>
      <Videos />
    </React.Fragment>
  );
};

export default Main;

import React from "react";
import _ from "lodash";
import { Grid, Segment } from "semantic-ui-react";

export default ({ itemDescription, status, createdAt }) => {
  return (
    <Grid.Row>
      <Grid.Column>
        <h3>Item Description</h3>
        <Segment color="black">{itemDescription}</Segment>
      </Grid.Column>
      <Grid.Column>
        <h3>Status</h3>
        <Segment
          textAlign="center"
          color={
            status === "processing"
              ? "blue"
              : status === "confirmed"
              ? "orange"
              : status === "in transit"
              ? "teal"
              : status === "delivered"
              ? "green"
              : "black"
          }
          inverted
        >
          {_.capitalize(status)}
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <h3>Date Ordered</h3>
        <Segment textAlign="right">
          {new Date(createdAt).toDateString()}
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
};

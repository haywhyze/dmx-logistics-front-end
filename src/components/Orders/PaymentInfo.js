import React from "react";
import { Grid, Segment, Statistic } from "semantic-ui-react";
import _ from "lodash";

const PaymentInfo = ({ paymentStatus, price }) => {
  const PaymentSegment = ({ data, classes }) => (
    <>
      {paymentStatus !== "pay on pickup" &&
      paymentStatus !== "pay on delivery" ? null : (
        <Grid.Column textAlign="center" width={8}>
          <Segment textAlign="center" className={classes} inverted>
            <Statistic size="tiny" className={classes} inverted>
              <Statistic.Value>{data}</Statistic.Value>
              <Statistic.Label>Price</Statistic.Label>
            </Statistic>
          </Segment>
        </Grid.Column>
      )}
    </>
  );
  return (
    <>
      <PaymentSegment data={price} classes="dmx-color" />
      <PaymentSegment data={_.upperCase(paymentStatus)} />
    </>
  );
};

export default PaymentInfo;

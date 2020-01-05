import React from "react";
import _ from "lodash";
import { Grid, Card, Icon, Label } from "semantic-ui-react";

const DeliveryInfo = ({
  senderName,
  senderPhone,
  senderAddress,
  recipientName,
  recipientPhone,
  recipientAddress
}) => {
  const DeliveryCard = ({ name, phone, address, label }) => (
    <Grid.Column textAlign="center" width={8}>
      <Card fluid>
        <Card.Content header={_.upperFirst(name)} />
        <Card.Content
          meta={
            <span>
              <Icon name="phone" /> {phone}
            </span>
          }
        />
        <Card.Content
          description={
            <>
              <Icon name="map marker alternate" /> {address}
            </>
          }
        />
      </Card>
      <Label size="tiny" attached="top left">
        <Icon name="truck" /> {label}
      </Label>
    </Grid.Column>
  );
  return (
    <>
      <DeliveryCard
        name={senderName}
        phone={senderPhone}
        address={senderAddress}
        label="Pick Up Details"
      />
      <DeliveryCard
        name={recipientName}
        phone={recipientPhone}
        address={recipientAddress}
        label="Delivery Details"
      />
    </>
  );
};

export default DeliveryInfo;

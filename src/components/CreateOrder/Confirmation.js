import React, { useState } from "react";
import { Button, Grid, Segment, Message, Icon } from "semantic-ui-react";
import getPrice from "../../getPrice";
import axios from "axios";
import GridSegment from "./GridSegment";
import ListItem from "./ListItem";
import baseUrl from "../../api/baseUrl";

let errorMess;
let price;
export default ({ values, prevStep, nextStep }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveAndContinue = e => {
    e.preventDefault();
    values.price = "";
    delete values.recipientCountry;
    delete values.recipientState;
    delete values.srcData;
    delete values.destData;
    delete values.senderCountry;
    delete values.senderState;
    const token = localStorage.getItem("dmx_logistics_token");
    setIsSubmitting(true);
    axios({
      method: "post",
      url: `${baseUrl}/api/v1/orders`,
      headers: { "auth-token": token },
      data: values
    })
      .then(response => {
        setIsSubmitting(false);
        console.log(response);
        nextStep();
      })
      .catch(error => {
        errorMess = error.response.data.error;
        setIsSubmitting(false);
        errorMess = error.response.data.error;
      });
  };

  const back = e => {
    e.preventDefault();
    prevStep();
  };

  const {
    senderName,
    senderPhone,
    senderEmail,
    senderAddress,
    recipientName,
    recipientPhone,
    recipientEmail,
    recipientAddress,
    senderState,
    srcData,
    destData,
    recipientState,
    paymentStatus,
    weight,
    extraInfo,
    itemDescription
  } = values;

  if (senderState === "Lagos" && recipientState === "Lagos")
    price = getPrice(srcData, destData);

  const senderDetails = (
    <>
      <ListItem
        header={`Sender's Name`}
        description={senderName}
        iconName="user"
      />
      <ListItem
        header={`Sender's Phone`}
        description={senderPhone}
        iconName="phone"
      />
      <ListItem
        header={`Sender's Email`}
        description={senderEmail}
        iconName="mail"
      />
      <ListItem
        header={`Sender's Address`}
        description={senderAddress}
        iconName="map marker alternate"
      />
    </>
  );
  const recipientDetails = (
    <>
      <ListItem
        header={`Recipient's Name`}
        description={recipientName}
        iconName="user"
      />
      <ListItem
        header={`Recipient's Phone`}
        description={recipientPhone}
        iconName="phone"
      />
      <ListItem
        header={`Recipient's Email`}
        description={recipientEmail}
        iconName="mail"
      />
      <ListItem
        header={`Recipient's Address`}
        description={recipientAddress}
        iconName="marker"
      />
    </>
  );
  const packageDetails = (
    <>
      <ListItem
        header={`Item Description`}
        description={itemDescription}
        iconName="info"
      />
      <ListItem
        header={`Weight`}
        description={`${weight}kg`}
        iconName="weight"
      />
      <ListItem
        header={`Extra Information`}
        description={extraInfo}
        iconName="info"
      />
      <ListItem
        header={`PaymentStatus`}
        description={paymentStatus}
        iconName="money bill alternate outline"
      />
    </>
  );

  return (
    <div>
      <h1 className="ui centered">Confirm your Details</h1>
      <p>Click Confirm if the following details have been correctly entered</p>
      <Grid columns={3} divided>
        <Grid.Row stretched>
          <GridSegment listItems={senderDetails} label="Sender Details" />
          <GridSegment listItems={recipientDetails} label="Recipient Details" />
          <GridSegment listItems={packageDetails} label="Package Details" />
        </Grid.Row>

        {/* ========================= */}
        {/* The PRICE SEGMENT */}
        {/* ========================= */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Segment raised attached="top" style={{ textAlign: "center" }}>
            The estimated price of the package is
            <span style={{ color: "#900", fontWeight: "bold" }}>
              {" "}
              &#8358;{price}
            </span>
          </Segment>
          <Message warning attached="bottom">
            <Icon name="warning" />
            This is just an estimate, this can be adjusted before pick up!
          </Message>
        </div>

        {/* ========================= */}
        {/* Display Error Message */}
        {/* ========================= */}
        <div style={{ margin: "1em" }}>
          {errorMess && (
            <>
              <Message error header="Action Forbidden" content={errorMess} />
              {(errorMess = undefined)}
              <p>
                Please go back to effect changes before this can be submitted
              </p>
            </>
          )}
        </div>

        {/* ========================= */}
        {/* Submision BUTTONs */}
        {/* ========================= */}
        <Grid.Row>
          <Button secondary onClick={back}>
            Back
          </Button>
          <Button primary loading={isSubmitting} onClick={saveAndContinue}>
            Confirm
          </Button>
        </Grid.Row>
      </Grid>
    </div>
  );
};

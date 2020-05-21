import React from "react";
import { Segment, Form, Input, Button, Message } from "semantic-ui-react";

export default ({
  status,
  userRole,
  handlePriceChange,
  handlePriceSubmit,
  isSubmittingPrice,
  priceError
}) => {
  return (
    <>
      {userRole !== "admin" ? null : status ===
          "cancelled" || status === "delivered" ? null : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <Segment color="black" style={{ marginBottom: "1rem" }}>
              <Form onSubmit={handlePriceSubmit}>
                <Form.Group inline>
                  <label>Adjust the order price to</label>
                  <Input
                    onChange={handlePriceChange}
                    labelPosition="right"
                    type="number"
                    placeholder="Enter New Price"
                  >
                    <input />
                  </Input>
                  <Button
                    loading={isSubmittingPrice}
                    type="submit"
                    style={{}}
                    primary
                  >
                    Change Price
                  </Button>
                </Form.Group>
              </Form>
            </Segment>
          </div>
          {priceError && (
            <div
              style={{
                marginBottom: "1em",
                display: "flex",
                justifyContent: "center",
                width: "100%"
              }}
            >
              <Message error header="Action Forbidden" content={priceError} />
            </div>
          )}
          {(priceError = undefined)}
        </>
      )}
    </>
  );
};

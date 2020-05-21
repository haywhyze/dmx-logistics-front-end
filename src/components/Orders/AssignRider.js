import React from "react";
import { Segment, Form, Select, Button, Message } from "semantic-ui-react";

const AssignRider = ({
  riderOptions,
  errorMess,
  handleChange,
  handleSubmit,
  isSubmitting,
  userRole,
  status,
  rider
}) => {
  return (
    <>
      {userRole !== "admin" ? null : rider ? null : status !==
        "confirmed" ? null : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <Segment color="teal" style={{ marginBottom: "1rem" }}>
              <Form onSubmit={handleSubmit}>
                <Form.Group inline>
                  <Form.Field
                    inline
                    control={Select}
                    onChange={handleChange}
                    label="Assign this order to &nbsp;"
                    placeholder="Select a Rider"
                    options={riderOptions}
                  />
                  <Button
                    loading={isSubmitting}
                    type="submit"
                    style={{ marginLeft: "1rem" }}
                    primary
                  >
                    Assign
                  </Button>
                </Form.Group>
              </Form>
            </Segment>
          </div>
          {errorMess && (
            <div style={{ marginBottom: "1em", margin: "0 auto" }}>
              <Message error header="Action Forbidden" content={errorMess} />
            </div>
          )}
          {(errorMess = undefined)}
        </>
      )}
      {rider && (
        <Message
          info
          icon="bicycle"
          header={
            userRole === "rider"
              ? `This package has been assigned to you`
              : `This package will be delivered by ${rider.firstName} ${rider.lastName}`
          }
          content={
            userRole === "rider"
              ? `You will find details of the pickup and delivery below.`
              : `You can get through to him on this number ${rider.phoneNumber}`
          }
        />
      )}
    </>
  );
};

export default AssignRider;

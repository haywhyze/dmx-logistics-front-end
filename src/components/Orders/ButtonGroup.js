import React from "react";
import { Grid, Button } from "semantic-ui-react";

const ButtonGroup = ({
  isSubmittingCancel,
  isSubmittingReject,
  isSubmittingConfirm,
  isSubmittingAccept,
  isSubmittingComplete,
  showCancel,
  showAccept,
  showComplete,
  showReject,
  showConfirm,
  order,
  user
}) => {
  return (
    <>
      <Grid.Row centered columns={2}>
        <Grid.Column>
          <Button.Group fluid>
            {user.userRole === "rider" ? null : order.status === "delivered" ||
              order.status === "cancelled" ? null : (
              <>
                <Button
                  loading={isSubmittingCancel}
                  secondary
                  onClick={showCancel}
                >
                  Cancel
                </Button>
              </>
            )}
            {user.userRole !==
            "rider" ? null : !order.rider ? null : order.status ===
                "delivered" ||
              order.status === "cancelled" ||
              order.status === "in transit" ? null : (
              <>
                <Button
                  loading={isSubmittingReject}
                  secondary
                  onClick={showReject}
                >
                  Reject
                </Button>
              </>
            )}
            {order.status !== "processing" ? null : user.userRole ===
              "personal" ? null : (
              <>
                <Button.Or />
                <Button
                  loading={isSubmittingConfirm}
                  positive
                  onClick={showConfirm}
                >
                  Confirm
                </Button>
              </>
            )}
            {user.userRole !==
            "rider" ? null : !order.rider ? null : order.status ===
                "delivered" ||
              order.status === "cancelled" ||
              order.status === "in transit" ? null : (
              <>
                <Button.Or />
                <Button
                  loading={isSubmittingAccept}
                  positive
                  onClick={showAccept}
                >
                  Accept
                </Button>
              </>
            )}
            {user.userRole === "personal" ||
            user.userRole === "business" ? null : order.status ===
                "processing" ||
              order.status === "cancelled" ||
              order.status === "delivered" ? null : (
              <>
                <Button.Or />
                <Button
                  loading={isSubmittingComplete}
                  primary
                  onClick={showComplete}
                >
                  Delivered
                </Button>
              </>
            )}
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default ButtonGroup;

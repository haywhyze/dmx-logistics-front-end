import React from "react";
import { Confirm } from "semantic-ui-react";

const OrderActionsConfirm = ({
  openConfirm,
  closeConfirm,
  handleConfirm,
  openComplete,
  closeComplete,
  handleComplete,
  openCancel,
  closeCancel,
  handleCancel,
  openAccept,
  closeAccept,
  handleAccept,
  openReject,
  closeReject,
  handleReject
}) => {
  const ConfirmBox = ({ open, onCancel, onConfirm, content }) => (
    <Confirm
      style={{ height: "unset", left: "unset", top: "unset" }}
      open={open}
      onCancel={onCancel}
      onConfirm={onConfirm}
      cancelButton="Never Mind"
      confirmButton="Yes, Please"
      content={content}
    />
  );

  return (
    <div>
      <ConfirmBox
        open={openConfirm}
        onCancel={closeConfirm}
        onConfirm={handleConfirm}
        content="Are you sure you want to confirm this Order?"
      />
      <ConfirmBox
        open={openComplete}
        onCancel={closeComplete}
        onConfirm={handleComplete}
        content="Are you sure you want to mark this order as delivered?"
      />
      <ConfirmBox
        open={openCancel}
        onCancel={closeCancel}
        onConfirm={handleCancel}
        content="Are you sure you want to cancel this order?"
      />
      <ConfirmBox
        open={openAccept}
        onCancel={closeAccept}
        onConfirm={handleAccept}
        content="Are you sure you want to accept this assignment?"
      />
      <ConfirmBox
        open={openReject}
        onCancel={closeReject}
        onConfirm={handleReject}
        content="Are you sure you want to reject this assignment?"
      />
    </div>
  );
};

export default OrderActionsConfirm;

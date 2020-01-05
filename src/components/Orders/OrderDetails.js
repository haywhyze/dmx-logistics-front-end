import React, { useState, useContext } from "react";
import { Grid, Header, Message } from "semantic-ui-react";
import _ from "lodash";
import OrderInfo from "./OrderInfo";
import ChangePrice from "./ChangePrice";
import PaymentInfo from "./PaymentInfo";
import AssignRider from "./AssignRider";
import { formatToNaira } from "./RenderOrder";
import DeliveryInfo from "./DeliveryInfo";
import ButtonGroup from "./ButtonGroup";
import OrderActionsConfirm from "./OrderActionsConfirm";
import { ContextOrders } from "../context/Orders";
import {
  cancelOrder,
  acceptOrder,
  confirmOrder,
  completeOrder,
  rejectOrder,
  setPriceAsync,
  assignRider
} from "../../Actions/orderActions";

const OrderDetails = props => {
  const [state, dispatch] = useContext(ContextOrders);

  const [price, setPrice] = useState("");
  const [rider, setRider] = useState("");
  const submittingAssign = state.assignOrderLoading;
  const submittingConfirm = state.confirmOrderLoading;
  const submittingComplete = state.completeOrderLoading;
  const submittingAccept = state.acceptOrderLoading;
  const submittingPrice = state.setPriceLoading;
  const submittingCancel = state.cancelOrderLoading;
  const submittingReject = state.rejectOrderLoading;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openAccept, setOpenAccept] = useState(false);

  const riderOptions = _.map(props.riders, rider => ({
    key: rider.id,
    text: `${rider.firstName} ${rider.lastName}`,
    value: rider.id
  }));

  const handleAccept = () => acceptOrder(dispatch, props.order.id);

  const handleCancel = () => cancelOrder(dispatch, props.order.id);

  const handleConfirm = () => confirmOrder(dispatch, props.order.id);

  const handleComplete = () => completeOrder(dispatch, props.order.id);

  const handleReject = () => rejectOrder(dispatch, props.order.id);

  const handlePriceChange = (e, { value }) => setPrice(value);

  const handlePriceSubmit = () =>
    setPriceAsync(dispatch, props.order.id, price);

  const handleAssignChange = (e, { value }) => setRider(value);

  const handleAssignSubmit = () => assignRider(dispatch, props.order.id, rider);

  return (
    <>
      {props.order && (
        <div
          className="main"
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            marginTop: "1em"
          }}
        >
          {state.orderError && (
            <div
              style={{
                marginBottom: "1em",
                margin: "0 auto",
                textAlign: "center",
                position: "fixed",
                zIndex: 2
              }}
            >
              <Message
                error
                header="Action Forbidden"
                content={state.orderError}
              />
            </div>
          )}
          <Header
            as="h3"
            dividing
            content="Order Details"
            subheader={props.order.id}
          />
          <Grid stackable columns={3}>
            <OrderInfo
              itemDescription={props.order.itemDescription}
              status={props.order.status}
              createdAt={props.order.createdAt}
            />

            <ChangePrice
              userRole={props.user.userRole}
              status={props.order.status}
              handlePriceChange={handlePriceChange}
              handlePriceSubmit={handlePriceSubmit}
              isSubmittingPrice={submittingPrice}
              priceError={state.setPriceError}
            />

            <PaymentInfo
              paymentStatus={props.order.paymentStatus}
              price={formatToNaira(Number(props.order.price))}
            />

            <AssignRider
              riderOptions={riderOptions}
              errorMess={state.assignOrderError}
              handleChange={handleAssignChange}
              handleSubmit={handleAssignSubmit}
              isSubmitting={submittingAssign}
              userRole={props.user.userRole}
              status={props.order.status}
              rider={props.order.rider}
            />

            <DeliveryInfo
              senderName={props.order.senderName}
              senderPhone={props.order.senderPhone}
              senderAddress={props.order.senderAddress}
              recipientName={props.order.recipientName}
              recipientPhone={props.order.recipientPhone}
              recipientAddress={props.order.recipientAddress}
            />

            <ButtonGroup
              isSubmittingCancel={submittingCancel}
              isSubmittingReject={submittingReject}
              isSubmittingConfirm={submittingConfirm}
              isSubmittingAccept={submittingAccept}
              isSubmittingComplete={submittingComplete}
              showCancel={() => setOpenCancel(true)}
              showAccept={() => setOpenAccept(true)}
              showComplete={() => setOpenComplete(true)}
              showReject={() => setOpenReject(true)}
              showConfirm={() => setOpenConfirm(true)}
              order={props.order}
              user={props.user}
            />
          </Grid>
        </div>
      )}
      <OrderActionsConfirm
        openConfirm={openConfirm}
        closeConfirm={() => setOpenConfirm(false)}
        handleConfirm={handleConfirm}
        openComplete={openComplete}
        closeComplete={() => setOpenComplete(false)}
        handleComplete={handleComplete}
        openCancel={openCancel}
        closeCancel={() => setOpenCancel(false)}
        handleCancel={handleCancel}
        openAccept={openAccept}
        closeAccept={() => setOpenAccept(false)}
        handleAccept={handleAccept}
        openReject={openReject}
        closeReject={() => setOpenReject(false)}
        handleReject={handleReject}
      />
    </>
  );
};

export default OrderDetails;

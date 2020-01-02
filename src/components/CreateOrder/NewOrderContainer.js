import React, { useState, useContext } from "react";
import OrderDetails from "./OrderDetails";
import Confirmation from "./Confirmation";
import Success from "./Success";
import { ContextOrders } from "../context/Orders";
import SenderReceiverDetails from "./SenderReceiverDetails";

const NewOrderContainer = ({ location }) => {
  const [{ user }] = useContext(ContextOrders);

  const [state, setState] = useState({
    step: 1,

    senderName: `${user.firstName} ${user.lastName}` || "",
    senderPhone: user.phoneNumber || "",
    senderEmail: user.email || "",
    senderAddress: user.address || "",
    senderState: "",
    senderCountry: "",

    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    recipientAddress: "",
    recipientState: "",
    recipientCountry: "",

    itemDescription: "",
    paymentStatus: "",
    weight: 1,
    extraInfo: "",
    priceEstimate: ""
  });

  const nextStep = () => setState({ ...state, step: state.step + 1 });

  const prevStep = () => setState({ ...state, step: state.step - 1 });

  const updateState = data => {
    setState({
      ...state,
      ...data
    });
  };

  const handleChange = input => event => {
    setState({ ...state, [input]: event.target.value });
  };

  switch (state.step) {
    case 1:
      return (
        <SenderReceiverDetails
          nextStep={nextStep}
          data={state}
          sender={true}
          updateState={updateState}
          handleChange={handleChange}
          prevStep={prevStep}
        />
      );
    case 2:
      return (
        <SenderReceiverDetails
          nextStep={nextStep}
          data={state}
          sender={false}
          updateState={updateState}
          handleChange={handleChange}
          prevStep={prevStep}
        />
      );
    case 3:
      return (
        <OrderDetails nextStep={nextStep} prevStep={prevStep} data={state} />
      );
    case 4:
      return (
        <Confirmation
          nextStep={nextStep}
          prevStep={prevStep}
          data={state}
          location={location}
        />
      );
    case 5:
      return <Success />;
    default:
      return null;
  }
};

export default NewOrderContainer;

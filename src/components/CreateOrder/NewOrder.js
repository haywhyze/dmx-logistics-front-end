import React, { useState, useContext } from "react";
import OrderDetails from "./OrderDetails";
import Confirmation from "./Confirmation";
import Success from "./Success";
import { ContextOrders } from "../context/Orders";
import SenderReceiverDetails from "./SenderReceiverDetails";

const NewOrderContainer = ({ location }) => {
  const [{ user, globalStep, newOrder }] = useContext(ContextOrders);

  const [step, setStep] = useState(globalStep || 1);

  const [locationState, setLocationState] = useState({
    senderAddress: user.address || "",
    senderState: "",
    senderCountry: "",

    recipientAddress: (newOrder && newOrder.recipientAddress) || "",
    recipientState: "",
    recipientCountry: ""
  });

  const [state, setState] = useState({
    senderName: `${user.firstName} ${user.lastName}` || "",
    senderPhone: user.phoneNumber || "",
    senderEmail: user.email || "",

    recipientName: (newOrder && newOrder.recipientName) || "",
    recipientPhone: (newOrder && newOrder.recipientPhone) || "",
    recipientEmail: (newOrder && newOrder.recipientEmail) || "",

    itemDescription: (newOrder && newOrder.itemDescription) || "",
    paymentStatus: (newOrder && newOrder.paymentStatus) || "",
    weight: (newOrder && newOrder.weight) || 1,
    extraInfo: (newOrder && newOrder.extraInfo) || "",
    priceEstimate: ""
  });

  const nextStep = () => setStep(step + 1);

  const prevStep = () => setStep(step - 1);

  const updateLocation = data => {
    setLocationState({
      ...locationState,
      ...data
    });
  };

  const updateState = data => {
    setState({
      ...state,
      ...data
    });
  };

  const handleChange = input => event => {
    setLocationState({ ...locationState, [input]: event.target.value });
  };

  switch (step) {
    case 1:
      return (
        <SenderReceiverDetails
          nextStep={nextStep}
          data={state}
          sender={true}
          updateState={updateState}
          handleChange={handleChange}
          updateLocation={updateLocation}
          locationData={locationState}
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
          updateLocation={updateLocation}
          locationData={locationState}
          prevStep={prevStep}
        />
      );
    case 3:
      return (
        <OrderDetails
          nextStep={nextStep}
          prevStep={prevStep}
          data={state}
          locationData={locationState}
          updateState={updateState}
        />
      );
    case 4:
      return (
        <Confirmation
          nextStep={nextStep}
          prevStep={prevStep}
          data={state}
          locationData={locationState}
          updateState={updateState}
          location={location}
          step={step}
        />
      );
    case 5:
      return <Success />;
    default:
      return null;
  }
};

export default NewOrderContainer;

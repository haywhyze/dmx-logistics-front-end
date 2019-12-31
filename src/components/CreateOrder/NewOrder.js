import React, { Component } from "react";
import OrderDetails from "./OrderDetails";
import Confirmation from "./Confirmation";
import Success from "./Success";
import SenderReceiverDetails from "./SenderReceiverDetails";

class NewOrder extends Component {
  state = {
    step: 1,

    senderName:
      `${this.props.user.firstName} ${this.props.user.lastName}` || "",
    senderPhone: this.props.user.phoneNumber || "",
    senderEmail: this.props.user.email || "",
    senderAddress: this.props.user.address || "",
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
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  updateState = values => {
    this.setState({
      ...values
    });
  };

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      senderName,
      senderPhone,
      senderEmail,
      senderAddress,
      senderState,
      senderCountry,
      srcData,
      recipientName,
      recipientPhone,
      recipientEmail,
      recipientAddress,
      recipientState,
      recipientCountry,
      destData,
      itemDescription,
      paymentStatus,
      weight,
      extraInfo
    } = this.state;
    const values = {
      senderName,
      senderPhone,
      senderEmail,
      senderAddress,
      senderState,
      senderCountry,
      srcData,
      recipientName,
      recipientPhone,
      recipientEmail,
      recipientAddress,
      recipientState,
      recipientCountry,
      destData,
      itemDescription,
      paymentStatus,
      weight,
      extraInfo
    };
    switch (step) {
      case 1:
        return (
          <SenderReceiverDetails
            nextStep={this.nextStep}
            updateState={this.updateState}
            handleChange={this.handleChange}
            values={values}
            user={this.props.user}
            sender={true}
            prevStep={this.prevStep}            
          />
        );
      case 2:
        return (
          <SenderReceiverDetails
            nextStep={this.nextStep}
            updateState={this.updateState}
            handleChange={this.handleChange}
            values={values}
            user={this.props.user}
            sender={false}
            prevStep={this.prevStep}            
          />
        );
      case 3:
        return (
          <OrderDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            updateState={this.updateState}
            values={values}
          />
        );
      case 4:
        return (
          <Confirmation
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            location={this.props.location}
          />
        );
      case 5:
        return <Success />;
      default:
        return null;
    }
  }
}

export default NewOrder;

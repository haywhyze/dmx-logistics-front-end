import React, { Component } from 'react';
import SenderDetails from './SenderDetails';
import RecipientDetails from './RecipientDetails';
import OrderDetails from './OrderDetails';
import Confirmation from './Confirmation';
import Success from './Success';

class NewOrder extends Component {
    state = {
        step: 1,

        senderName: '',
        senderPhone: '',
        senderEmail: '',
        senderAddress: '',
        senderState: '',
        senderCountry: '',
        
        recipientName: '',
        recipientPhone: '',
        recipientEmail: '',
        recipientAddress: '',
        recipientState: '',
        recipientCountry: '',
        
        itemDescription: '',
        paymentStatus: '',
        weight: 1,
        extraInfo: '',
        priceEstimate: '',
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }
    
    updateState = values => {
        this.setState({
            ...values,
        })
    }
    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    render(){
        const {step} = this.state;
        const { 
            senderName,
            senderPhone,
            senderEmail,
            senderAddress,
            senderState,
            senderCountry,
            recipientName,
            recipientPhone,
            recipientEmail,
            recipientAddress,
            recipientState,
            recipientCountry,
            itemDescription,
            paymentStatus,
            weight,
            extraInfo,
         } = this.state;
        const values = { 
            senderName,
            senderPhone,
            senderEmail,
            senderAddress,
            senderState,
            senderCountry,
            recipientName,
            recipientPhone,
            recipientEmail,
            recipientAddress,
            recipientState,
            recipientCountry,
            itemDescription,
            paymentStatus,
            weight,
            extraInfo,
         };
        switch(step) {
        case 1:
            return <SenderDetails 
                    nextStep={this.nextStep} 
                    updateState = {this.updateState}
                    handleChange = {this.handleChange}
                    values={values}
                    />
        case 2:
            return <RecipientDetails 
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    updateState = {this.updateState}
                    handleChange = {this.handleChange}
                    values={values}
                    />
        case 3:
          return <OrderDetails 
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  updateState = {this.updateState}
                  values={values}
                  />
        case 4:
            return <Confirmation 
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    values={values}
                    />
        case 5:
            return <Success />
        default: return null
        }
    }
}

export default NewOrder;
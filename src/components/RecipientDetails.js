import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class RecipientDetails extends Component{

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const { values } = this.props;
        return(
            <Form >
                <h1 className="ui centered">Enter Recipient Details</h1>
                <Form.Field>
                    <label>Recipient Name</label>
                    <input
                    placeholder="Olawale Chinedu"
                    onChange={this.props.handleChange('recipientName')}
                    defaultValue={values.recipientName}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient Phone</label>
                    <input
                    placeholder="08031234567/+2347081234567"
                    onChange={this.props.handleChange('recipientPhone')}
                    defaultValue={values.recipientPhone}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient Email</label>
                    <input
                    type='email'
                    placeholder='abc@xyz.com'
                    onChange={this.props.handleChange('recipientEmail')}
                    defaultValue={values.recipientEmail}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient Address</label>
                    <input
                    placeholder="Recipient's Address"
                    onChange={this.props.handleChange('recipientAddress')}
                    defaultValue={values.recipientAddress}
                    />
                </Form.Field>
                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.saveAndContinue}>Save And Continue </Button>
            </Form>
        )
    }
}

export default RecipientDetails;
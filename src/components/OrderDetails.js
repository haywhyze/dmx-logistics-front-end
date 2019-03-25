import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class OrderDetails extends Component{

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
                <h1 className="ui centered">Enter Order Details</h1>
                <Form.Field>
                    <label>Item Description</label>
                    <input
                    placeholder="A pair of shoes"
                    onChange={this.props.handleChange('itemDescription')}
                    defaultValue={values.itemDescription}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Payment Method</label>
                    <input
                    placeholder="Not sure yet"
                    onChange={this.props.handleChange('paymentStatus')}
                    defaultValue={values.paymentStatus}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Weight (kg)</label>
                    <input
                    type='number'
                    placeholder='1'
                    onChange={this.props.handleChange('weight')}
                    defaultValue={values.weight}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Extra Information</label>
                    <input
                    placeholder="Please handle the package with extreme care"
                    onChange={this.props.handleChange('extraInfo')}
                    defaultValue={values.extraInfo}
                    />
                </Form.Field>
                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.saveAndContinue}>Save And Continue </Button>
            </Form>
        )
    }
}

export default OrderDetails;
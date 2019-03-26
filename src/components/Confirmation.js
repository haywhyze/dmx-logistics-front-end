import React, { Component } from 'react';
import { Button, List } from 'semantic-ui-react';

class Confirmation extends Component{
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const {
          values: { 
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
          paymentStatus,
          weight,
          extraInfo,
          itemDescription,
         }
        } = this.props;
        return(
            <div>
                <h1 className="ui centered">Confirm your Details</h1>
                <p>Click Confirm if the following details have been correctly entered</p>
                <List>
                    <List.Item>
                        <List.Icon name='user' />
                        <List.Content>Sender Name: {senderName}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='phone' />
                        <List.Content>Sender Phone: {senderPhone}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='mail' />
                        <List.Content>
                            Sender Email: {senderEmail}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>Sender Address: {senderAddress}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>Sender State: {senderState}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>Sender Country: {senderCountry}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='user' />
                        <List.Content>Recipient Name: {recipientName}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='phone' />
                        <List.Content>Recipient Phone: {recipientPhone}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='mail' />
                        <List.Content>
                            Recipient Email: {recipientEmail}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>Recipient Address: {recipientAddress}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>Recipient State: {recipientState}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>Recipient Country: {recipientCountry}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='info' />
                        <List.Content>Item Description: {itemDescription}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='weight' />
                        <List.Content>Weight: {weight}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='info' />
                        <List.Content>Extra Information: {extraInfo}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='money bill alternate outline' />
                        <List.Content>PaymentStatus: {paymentStatus}</List.Content>
                    </List.Item>
                </List>

                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.saveAndContinue}>Confirm</Button>
            </div>
        )
    }
}

export default Confirmation;
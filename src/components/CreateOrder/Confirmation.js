import React, { Component } from 'react';
import { Button, List, Grid, Segment, Label, Message, Icon } from 'semantic-ui-react';
import getPrice from '../../getPrice';
import axios from 'axios';


let errorMess;
let price;

class Confirmation extends Component{

  constructor(props) {
    super(props)

    this.state = {
      isSubmitting: false,
    }
  }

    saveAndContinue = (e) => {
        e.preventDefault();
        console.log(price);
        const { values } = this.props;
        values.price = price;
        delete values.recipientCountry;
        delete values.recipientState;
        delete values.srcData;
        delete values.destData;
        delete values.senderCountry;
        delete values.senderState;
        const token = localStorage.token;
        this.setState({
          isSubmitting: true
        })
        axios({
          method: 'post',
          url: 'https://dmx-backend.herokuapp.com/api/v1/orders',
          headers: {'auth-token': token},
          data: values,
        })
          .then(response => {
            this.setState({
              isSubmitting: false,
            })
            console.log(response)
            this.props.nextStep()
          }).catch(error => {
              errorMess = error.response.data.error
                this.setState({
              isSubmitting: false,
            })
                console.log(error)
                console.log(error.response.data)
                errorMess = error.response.data.error
              })
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
          recipientName, 
          recipientPhone,
          recipientEmail,
          recipientAddress,
          senderState,
          srcData,
          destData,
          recipientState,
          paymentStatus,
          weight,
          extraInfo,
          itemDescription,
         }
        } = this.props;

        if (senderState === 'Lagos' && recipientState === 'Lagos')
            price = getPrice(srcData, destData);

        return(
            
            <div>
                <h1 className="ui centered">Confirm your Details</h1>
                <p>Click Confirm if the following details have been correctly entered</p>
                <Grid columns={3} divided>
                    <Grid.Row stretched>
                        <Grid.Column><Segment>
                            <Label size='tiny' attached='top left'> Sender Details</Label>
                            <List divided relaxed>
                            <List.Item>
                                <List.Icon name='user' size='large' verticalAlign='middle'/>
                                <List.Content>
                                    <List.Header>
                                        Sender Name:
                                    </List.Header>
                                    <List.Description style={{ color: '#990000' }}>
                                        {senderName}
                                    </List.Description>
                                    </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='phone' size='large' verticalAlign='middle'/>
                                <List.Content>
                                    <List.Header>
                                    Sender Phone: 
                                    </List.Header>
                                    <List.Description style={{ color: '#990000' }}>
                                    {senderPhone}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='mail' size='large' verticalAlign='middle'/>
                                <List.Content>
                                    <List.Header>
                                        Sender Email: 
                                    </List.Header>
                                    <List.Description style={{ color: '#990000' }}>
                                        {senderEmail}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='map marker alternate' size='large' verticalAlign='middle'/>
                                <List.Content>
                                    <List.Header>
                                        Sender Address:
                                    </List.Header>
                                    <List.Description style={{ color: '#990000'}}>
                                        {senderAddress}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                        </Segment>
                        </Grid.Column>
                        <Grid.Column><Segment>
                            <Label size='tiny' attached='top left'> Recipient Details</Label>
                            <List divided relaxed>
                                <List.Item>
                                    <List.Icon name='user' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header>
                                        Recipient Name:
                                        </List.Header>
                                        <List.Description style={{ color: '#900'}}>
                                        {recipientName}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='phone' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header>
                                        Recipient Phone:
                                        </List.Header>
                                        <List.Description style={{ color: '#900'}}>
                                        {recipientPhone}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='mail' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header>
                                        Recipient Email:
                                        </List.Header>
                                        <List.Description style={{ color: '#900'}}>
                                        {recipientEmail}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                <List.Icon name='marker' size='large' verticalAlign='middle' />
                                <List.Content>
                                    <List.Header>
                                    Recipient Address:
                                    </List.Header>
                                    <List.Description style={{ color: '#900'}}>
                                    {recipientAddress}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                            </List>
                    </Segment></Grid.Column>
                        <Grid.Column><Segment>
                            <Label size='tiny' attached='top left'> Package Details</Label>
                            <List divided relaxed>    
                        <List.Item>
                            <List.Icon name='info' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>
                                Item Description: 
                                </List.Header>
                                <List.Description style={{ color: '#900'}}>
                                {itemDescription}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='weight' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>
                                Weight: 
                                </List.Header>
                                <List.Description style={{ color: '#900'}}>
                                {weight}kg
                                </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='info' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>
                                Extra Information: 
                                </List.Header>
                                <List.Description style={{ color: '#900'}}>
                                {extraInfo}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='money bill alternate outline' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>
                                PaymentStatus: 
                                </List.Header>
                                <List.Description style={{ color: '#900'}}>
                                {paymentStatus}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    </List></Segment></Grid.Column>
                    </Grid.Row>
                    
                    <div  style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <Segment raised attached='top' style={{ textAlign: 'center'}}>The estimated price of the package is <span style={{ color: '#900', fontWeight: 'bold'}}>  &#8358;{price}</span></Segment>
                    <Message warning attached='bottom'>
                        <Icon name='warning' />
                        This is just an estimate, this can be adjusted before pick up!
                    </Message>
                    </div>
                    <div style={{margin: '1em'}}>
                {errorMess && (
                 <> <Message
                  error
                  header='Action Forbidden'
                  content={errorMess}
                />
                {errorMess=undefined}
                <p>Please go back to effect changes before this can be submitted</p> </>
                )}
              </div>
                    <Grid.Row>
                        <Button secondary onClick={this.back}>Back</Button>
                        <Button primary loading={this.state.isSubmitting} onClick={this.saveAndContinue}>Confirm</Button>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Confirmation;
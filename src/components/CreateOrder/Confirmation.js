import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Grid, Segment, Message, Icon } from 'semantic-ui-react';
import getPrice from '../../getPrice';
import axios from 'axios';
import GridSegment from './GridSegment';
import ListItem from './ListItem';

let errorMess;
let price;

class Confirmation extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isSubmitting: false,
      redirectToReferrer: false
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
    let { from } = this.props.location.state || { from: { pathname: "/all" } };
    let { redirectToReferrer } = this.state;
    
    if (redirectToReferrer) {
      return <Redirect to={{pathname: from.pathname, state: {message: 'Order Created Successfully'}}} />
    };
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

    const senderDetails = (<>
        <ListItem header={`Sender's Name`} description={senderName} iconName='user' />
        <ListItem header={`Sender's Phone`} description={senderPhone} iconName='phone' />
        <ListItem header={`Sender's Email`} description={senderEmail} iconName='mail' />
        <ListItem header={`Sender's Address`} description={senderAddress} iconName='map marker alternate' />
      </>)
    const recipientDetails = (<>
        <ListItem header={`Recipient's Name`} description={recipientName} iconName='user' />
        <ListItem header={`Recipient's Phone`} description={recipientPhone} iconName='phone' />
        <ListItem header={`Recipient's Email`} description={recipientEmail} iconName='mail' />
        <ListItem header={`Recipient's Address`} description={recipientAddress} iconName='marker' />
      </>)
    const packageDetails = (<>
        <ListItem header={`Item Description`} description={itemDescription} iconName='info' />
        <ListItem header={`Weight`} description={`${weight}kg`} iconName='weight' />
        <ListItem header={`Extra Information`} description={extraInfo} iconName='info' />
        <ListItem header={`PaymentStatus`} description={paymentStatus} iconName='money bill alternate outline' />
      </>)

    return(
      <div>
        <h1 className="ui centered">Confirm your Details</h1>
        <p>Click Confirm if the following details have been correctly entered</p>
        <Grid columns={3} divided>
          <Grid.Row stretched>
            <GridSegment listItems={senderDetails} label='Sender Details' />
            <GridSegment listItems={recipientDetails} label='Recipient Details' />
            <GridSegment listItems={packageDetails} label='Package Details' />
          </Grid.Row>

          {/* ========================= */}
          {/* The PRICE SEGMENT */}
          {/* ========================= */}
          <div  style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <Segment 
            raised 
            attached='top' 
            style={{ textAlign: 'center'}}>
              The estimated price of the package is 
                <span style={{ color: '#900', fontWeight: 'bold'}}> &#8358;{price}</span>
          </Segment>
          <Message warning attached='bottom'>
            <Icon name='warning' />
            This is just an estimate, this can be adjusted before pick up!
          </Message>
          </div>

          {/* ========================= */}
          {/* Display Error Message */}
          {/* ========================= */}
          <div style={{margin: '1em'}}>
            {errorMess && (
              <> 
                <Message
                  error
                  header='Action Forbidden'
                  content={errorMess}
                />
                {errorMess=undefined}
                <p>Please go back to effect changes before this can be submitted</p> 
              </>
            )}
          </div>

          {/* ========================= */}
          {/* Submision BUTTONs */}
          {/* ========================= */}
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
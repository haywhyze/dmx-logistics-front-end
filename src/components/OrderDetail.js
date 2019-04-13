import React from 'react'
import { Statistic, Card, Button, Label, Grid, Segment, Header, Icon } from 'semantic-ui-react'
import _ from 'lodash'

const OrderDetails = (props) => (
  <div className='main' style={{ width: '60%', display: 'flex', flexDirection: 'column', marginTop: '1em'}}>
    <Header 
    as='h3' 
    dividing 
    content='Order Details'
    subheader={props.order.id}
    />
  <Grid stackable columns={3}>
      <Grid.Column>
      Item Description
      <Segment color='black'>{props.order.itemDescription}</Segment>
      </Grid.Column>
      <Grid.Column>
      Status
      <Segment 
        textAlign='center' 
        color={ 
          props.order.status === 'processing' ? 
            "blue" : 
          props.order.status === 'confirmed' ? 
            "orange" :
          props.order.status === 'in transit' ?
            "teal" :
          props.order.status === 'delivered' ?
            "green" : "black" 
          } 
        inverted>
          {_.capitalize(props.order.status)}
      </Segment>
      </Grid.Column>
      <Grid.Column>
        Date Ordered
      <Segment textAlign='right'>{new Date(props.order.createdAt).toDateString()}</Segment>
      </Grid.Column>
      <Grid.Column textAlign='center' width={8}>
      <Segment textAlign='center' className='dmx-color' inverted>
        <Statistic size='tiny' className='dmx-color' inverted>
          <Statistic.Value>&#8358;{props.order.price}</Statistic.Value>
          <Statistic.Label>Price</Statistic.Label>
        </Statistic>
      </Segment>
      
    </Grid.Column>
    <Grid.Column textAlign='center' width={8}>
    <Segment textAlign='center' inverted>
      <Statistic size='tiny' inverted>
        <Statistic.Value>{_.upperCase(props.order.paymentStatus)}</Statistic.Value>
        <Statistic.Label>Payment Method</Statistic.Label>
      </Statistic>
      </Segment>
    </Grid.Column>
    <Grid.Column textAlign='center' width={8}>
    <Card
    fluid >
    <Card.Content header={_.upperFirst(props.order.senderName)} />
    <Card.Content meta={(<span><Icon name='phone' /> {props.order.senderPhone}</span>)} />
    <Card.Content description={(<><Icon name='map marker alternate' /> {props.order.senderAddress}</>)} />
    </Card>
    <Label size='tiny' attached='top left'><Icon name='truck' /> Pick Up Details</Label>
    </Grid.Column>
    <Grid.Column textAlign='center' width={8}>
    <Card
    fluid >
    <Card.Content header={_.upperFirst(props.order.recipientName)} />
    <Card.Content meta={(<span><Icon name='phone' /> {props.order.recipientPhone}</span>)} />
    <Card.Content description={(<><Icon name='map marker alternate' /> {props.order.recipientAddress}</>)} />
    </Card>
    <Label size='tiny' attached='top left'><Icon name='truck' /> Delivery Details</Label>
    </Grid.Column>
    <Grid.Row centered columns={2}>
      <Grid.Column>
      <Button.Group fluid>
        <Button>Cancel</Button>
        <Button.Or />
        <Button positive>Confirm</Button>
      </Button.Group>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  {console.log(props.order)}
  </div>
)

export default OrderDetails;
    

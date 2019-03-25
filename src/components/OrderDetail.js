import React from 'react'
import { Statistic, Card, Button, Label, Grid, Segment, Header, Icon } from 'semantic-ui-react'

const OrderDetails = () => (
  <div style={{ display: 'inline-flex', width:'70%', flexDirection: 'column', marginTop: '5em', marginLeft: '2em'}}>
    <Header 
    as='h3' 
    dividing 
    content='Order Details'
    subheader='369002'
    />
    
  <Grid stackable columns={3}>
      <Grid.Column>
      Item Description
      <Segment color='black'>A set of shoes and jewelleries from lagos to kaduna just for the sake of it</Segment>
      </Grid.Column>
      <Grid.Column>
      Status
      <Segment textAlign='center' color='blue' inverted>Processing</Segment>
      </Grid.Column>
      <Grid.Column>
        Date Ordered
      <Segment textAlign='right'>{new Date().toLocaleString()}</Segment>
      </Grid.Column>
      <Grid.Column textAlign='center' width={8}>
      <Segment textAlign='center' className='dmx-color' inverted>
        <Statistic size='tiny' className='dmx-color' inverted>
          <Statistic.Value>&#8358;2,400</Statistic.Value>
          <Statistic.Label>Price</Statistic.Label>
        </Statistic>
      </Segment>
      
    </Grid.Column>
    <Grid.Column textAlign='center' width={8}>
    <Segment textAlign='center' inverted>
      <Statistic size='tiny' inverted>
        <Statistic.Value>Recipient To Pay</Statistic.Value>
        <Statistic.Label>Payment Method</Statistic.Label>
      </Statistic>
      </Segment>
    </Grid.Column>
    <Grid.Column textAlign='center' width={8}>
    <Card
    fluid >
    <Card.Content header='Rick Sanchez' />
    <Card.Content meta={(<span><Icon name='phone' /> 08031961496</span>)} />
    <Card.Content description={(<><Icon name='map marker alternate' /> Oshodi/Isolo, Lagos, Nigeria</>)} />
    </Card>
    <Label size='tiny' attached='top left'><Icon name='truck' /> Pick Up Details</Label>
    </Grid.Column>
    <Grid.Column textAlign='center' width={8}>
    <Card
    fluid >
    <Card.Content header='Rick Sanchez' />
    <Card.Content meta={(<span><Icon name='phone' /> 08031961496</span>)} />
    <Card.Content description={(<><Icon name='map marker alternate' /> Oshodi/Isolo, Lagos, Nigeria</>)} />
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
  </div>
)

export default OrderDetails;
    

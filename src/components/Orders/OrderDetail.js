import React from 'react'
import { Statistic, Card, Button, Label, Grid, Segment, Header, Icon, Message, Select, Form, Input, Confirm } from 'semantic-ui-react'
import _ from 'lodash'
import Axios from 'axios';

let errorMess, priceError;
const token = localStorage.token;
class OrderDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rider: '',
      price: '',
      isSubmittingPrice: false,
      isSubmittingConfirm: false,
      isSubmittingComplete: false,
      isSubmittingCancel: false,
      isSubmittingAccept: false,
      isSubmittingReject: false,
      isSubmitting: false,
      openConfirm: false,
      openCancel: false,
      openComplete: false,
      openAccept: false,
      openReject: false,
    }
  }

  showConfirm = () => this.setState({openConfirm: true})
  closeConfirm = () => this.setState({openConfirm: false})

  showCancel = () => this.setState({openCancel: true})
  closeCancel = () => this.setState({openCancel: false})

  showComplete = () => this.setState({openComplete: true})
  closeComplete = () => this.setState({openComplete: false})

  showAccept = () => this.setState({openAccept: true})
  closeAccept = () => this.setState({openAccept: false})

  showReject = () => this.setState({openReject: true})
  closeReject = () => this.setState({openReject: false})

  handleCancel = () => {
    this.setState({
      isSubmittingCancel: true,
      openCancel: false
    })

    Axios({
      url: `https://dmx-backend.herokuapp.com/api/v1/orders/${this.props.order.id}/cancel`,
      method: 'patch',
      headers: {'auth-token': token},
      data: {
        status: 'cancelled'
      }
    })
    .then(response => {
      this.setState({
        isSubmittingCancel: false,
      })
      window.location.reload()
    })
    .catch(error => console.log(error.response))
  }

  handleConfirm = () => {
    this.setState({
      isSubmittingConfirm: true,
      openConfirm: false
    })

    Axios({
      url: `https://dmx-backend.herokuapp.com/api/v1/orders/${this.props.order.id}/confirm`,
      method: 'patch',
      headers: {'auth-token': token},
      data: {
        status: 'confirmed'
      }
    })
    .then(response => {
      this.setState({
        isSubmittingConfirm: false,
      })
      window.location.reload()
    })
    .catch(error => console.log(error.response))
  }

  handleComplete = () => {
    this.setState({
      isSubmittingComplete: true,
      openComplete: false
    })

    Axios({
      url: `https://dmx-backend.herokuapp.com/api/v1/orders/${this.props.order.id}/complete`,
      method: 'patch',
      headers: {'auth-token': token},
      data: {
        status: 'delivered'
      }
    })
    .then(response => {
      this.setState({
        isSubmittingComplete: true,
      })
      window.location.reload()
    })
    .catch(error => console.log(error))
  }

  handleAccept = () => {
    this.setState({
      isSubmittingAccept: true,
      openAccept: false
    })

    Axios({
      url: `https://dmx-backend.herokuapp.com/api/v1/orders/${this.props.order.id}/accept`,
      method: 'patch',
      headers: {'auth-token': token},
      data: {
        status: 'in transit'
      }
    })
    .then(response => {
      this.setState({
        isSubmittingAccept: true,
      })
      window.location.reload()
    })
    .catch(error => console.log(error))
  }

  handleReject = () => {
    this.setState({
      isSubmittingReject: true,
      openReject: false
    })

    Axios({
      url: `https://dmx-backend.herokuapp.com/api/v1/orders/${this.props.order.id}/reject`,
      method: 'patch',
      headers: {'auth-token': token},
      data: {
        riderId: null
      }
    })
    .then(response => {
      this.setState({
        isSubmittingReject: true,
      })
      window.location.href = '/all'
    })
    .catch(error => console.log(error.response.data))
  }

  handleChange = (e, { value }) => {
    this.setState({
      rider: value
    })
  }

  handlePriceChange = (e, { value }) => {
    this.setState({
      price: value
    })
  }

  handlePriceSubmit = () => {
    this.setState({
      isSubmittingPrice: true,
    })
    
    Axios({
      url:`https://dmx-backend.herokuapp.com/api/v1/orders/${this.props.order.id}/price`,
      method: 'patch',
      headers: {'auth-token': token},
      data: {
        price: this.state.price,
      }
    })
    .then(response => {
      this.setState({
        isSubmittingPrice: false,
      })
      window.location.reload();
    }).catch(error => {
      if (error.response && error.response.data) priceError = error.response.data.error;
      this.setState({
        isSubmittingPrice: false,
      })
    })
  }

  handleSubmit = () => {
    this.setState({
      isSubmitting: true,
    })

    Axios({
      url:`https://dmx-backend.herokuapp.com/api/v1/orders/${this.props.order.id}/assign`,
      method: 'patch',
      headers: {'auth-token': token},
      data: {
        riderId: this.state.rider,
      }
    })
    .then(response => {
      this.setState({
        isSubmitting: false,
      })
      // alert(JSON.stringify(response.data.data))
      window.location.reload();
    }).catch(error => {
      if (error.response && error.response.data && error.response.data.error === 'No values provided for riderId')
        errorMess = 'No rider selected'
      this.setState({
        isSubmitting: false,
      })
    })
  }

  render () {

    const { 
      openCancel,
      openComplete, 
      openConfirm,
      openAccept,
      openReject,
      isSubmittingCancel, 
      isSubmittingComplete, 
      isSubmittingConfirm,
      isSubmittingAccept,
      isSubmittingReject
      } = this.state;

    const riderOptions = _.map(this.props.riders, rider => ({
      key: rider.id,
      text: `${rider.firstName} ${rider.lastName}`,
      value: rider.id,
    }))

    Number.prototype.format = function(n, x) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
      return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    };

    return(
      <>
        { this.props.order && <div className='main' style={{ width: '60%', display: 'flex', flexDirection: 'column', marginTop: '1em'}}>
          <Header 
          as='h3' 
          dividing 
          content='Order Details'
          subheader={this.props.order.id}
          />
        <Grid stackable columns={3}>
            <Grid.Column>
              <h3>Item Description</h3>
              <Segment color='black'>{this.props.order.itemDescription}</Segment>
            </Grid.Column>
            <Grid.Column>
              <h3>Status</h3>
              <Segment 
                textAlign='center' 
                color={ 
                  this.props.order.status === 'processing' ? 
                    "blue" : 
                  this.props.order.status === 'confirmed' ? 
                    "orange" :
                  this.props.order.status === 'in transit' ?
                    "teal" :
                  this.props.order.status === 'delivered' ?
                    "green" : "black" 
                  } 
                inverted>
                  {_.capitalize(this.props.order.status)}
              </Segment>
            </Grid.Column>
            <Grid.Column>
                <h3>Date Ordered</h3>
              <Segment textAlign='right'>{new Date(this.props.order.createdAt).toDateString()}</Segment>
            </Grid.Column>
            {
              this.props.user.userRole !== 'admin' ? null :
              this.props.order.status === 'cancelled' || 
              this.props.order.status === 'delivered' ? null :
              (<><div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Segment color='black' style={{ marginBottom: '1rem' }}>
            <Form onSubmit={this.handlePriceSubmit}>
              <Form.Group inline>
              <label>Adjust the order price to</label>
                <Input onChange={this.handlePriceChange} labelPosition='right' type='number' placeholder='Enter New Price'>
                  <input />
                </Input>
                <Button loading={this.state.isSubmittingPrice} type='submit' style={{}} primary>Change Price</Button>
              </Form.Group>
            </Form>
            </Segment>
            </div>
            {priceError && (
                <div style={{marginBottom: '1em', display: 'flex', justifyContent: 'center', width: '100%'}}>
                  <Message
                  error
                  header='Action Forbidden'
                  content={priceError}
                />
                </div>
                )}
                {priceError=undefined}
                </>) 
                }
          {
            this.props.order.paymentStatus !== 'pay on pickup' && 
            this.props.order.paymentStatus !== 'pay on delivery' ? null :
            (
              <Grid.Column textAlign='center' width={8}>
                <Segment textAlign='center' className='dmx-color' inverted>
                  <Statistic size='tiny' className='dmx-color' inverted>
                    <Statistic.Value>&#8358;{Number(this.props.order.price).format(2)}</Statistic.Value>
                    <Statistic.Label>Price</Statistic.Label>
                  </Statistic>
                </Segment>
              </Grid.Column>  
            )  
          }
          
          {
            this.props.order.paymentStatus !== 'pay on pickup' && 
            this.props.order.paymentStatus !== 'pay on delivery' ? null :
            (
              <Grid.Column textAlign='center' width={8}>
                <Segment textAlign='center' inverted>
                  <Statistic size='tiny' inverted>
                    <Statistic.Value>{_.upperCase(this.props.order.paymentStatus)}</Statistic.Value>
                    <Statistic.Label>Payment Method</Statistic.Label>
                  </Statistic>
                </Segment>
              </Grid.Column>
            )
          }
          
          {
            this.props.user.userRole !== 'admin' ? null :
            this.props.order.rider ? null :
            this.props.order.status !== 'confirmed' ? null : 
          (<><div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Segment color='teal' style={{ marginBottom: '1rem' }}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group inline>
                <Form.Field inline control={Select} onChange={this.handleChange} label='Assign this order to &nbsp;' placeholder='Select a Rider' options={riderOptions} />
                <Button loading={this.state.isSubmitting} type='submit' style={{ marginLeft: '1rem'}} primary>Assign</Button>
              </Form.Group>
            </Form>
            </Segment>
            
          </div>
                {errorMess && (
                <div style={{marginBottom: '1em', margin: '0 auto'}}>
                  <Message
                  error
                  header='Action Forbidden'
                  content={errorMess}
                />
                </div>
                )}
                {errorMess=undefined}
              
          </>)}
          {this.props.order.rider && <Message
            info
            icon='bicycle'
            header={ this.props.user.userRole === 'rider' ? 
            `This package has been assigned to you` :
            `This package will be delivered by ${this.props.order.rider.firstName} ${this.props.order.rider.lastName}`}
            content={ this.props.user.userRole === 'rider' ? 
            `You will find details of the pickup and delivery below.` :
            `You can get through to him on this number ${this.props.order.rider.phoneNumber}`}
          />
          
          }
          <Grid.Column textAlign='center' width={8}>
          <Card
          fluid >
          <Card.Content header={_.upperFirst(this.props.order.senderName)} />
          <Card.Content meta={(<span><Icon name='phone' /> {this.props.order.senderPhone}</span>)} />
          <Card.Content description={(<><Icon name='map marker alternate' /> {this.props.order.senderAddress}</>)} />
          </Card>
          <Label size='tiny' attached='top left'><Icon name='truck' /> Pick Up Details</Label>
          </Grid.Column>
          <Grid.Column textAlign='center' width={8}>
          <Card
          fluid >
          <Card.Content header={_.upperFirst(this.props.order.recipientName)} />
          <Card.Content meta={(<span><Icon name='phone' /> {this.props.order.recipientPhone}</span>)} />
          <Card.Content description={(<><Icon name='map marker alternate' /> {this.props.order.recipientAddress}</>)} />
          </Card>
          <Label size='tiny' attached='top left'><Icon name='truck' /> Delivery Details</Label>
          </Grid.Column>
          <Grid.Row centered columns={2}>
            <Grid.Column>
            <Button.Group fluid>
              {
                this.props.user.userRole === 'rider' ? null : 
                this.props.order.status === 'delivered' || this.props.order.status === 'cancelled' ?
                null : 
              (<><Button loading={isSubmittingCancel} secondary onClick={this.showCancel}>Cancel</Button>
                </>
              )
              }
              {
                this.props.user.userRole !== 'rider' ? null : 
                !this.props.order.rider ? null :
                this.props.order.status === 'delivered' || 
                this.props.order.status === 'cancelled' ||
                this.props.order.status === 'in transit' 
                ?
                null : 
              (<><Button loading={isSubmittingReject} secondary onClick={this.showReject}>Reject</Button>
              </>
              )
              }
              {
                this.props.order.status !== 'processing' ? null :
                this.props.user.userRole === 'personal' ? null :
                (<><Button.Or /><Button loading={isSubmittingConfirm} positive onClick={this.showConfirm}>Confirm</Button> 
                </>)
              }
              {
                this.props.user.userRole !== 'rider' ? null : 
                !this.props.order.rider ? null :
                this.props.order.status === 'delivered' || 
                this.props.order.status === 'cancelled' ||
                this.props.order.status === 'in transit' 
                ?
                null :
                (<><Button.Or /><Button loading={isSubmittingAccept} positive onClick={this.showAccept}>Accept</Button> 
                </>)
              }
              {
                this.props.user.userRole === 'personal' ||
                this.props.user.userRole === 'business' ? null :
                this.props.order.status === 'processing' ||
                this.props.order.status === 'cancelled' || 
                this.props.order.status === 'delivered' ? null :
                (<><Button.Or /><Button loading={isSubmittingComplete} primary onClick={this.showComplete}>Delivered</Button></>)
              }
            </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* {console.log(this.props)} */}
        </div>
        }
        <div>
            <Confirm 
              style={{ height: 'unset', left: 'unset', top: 'unset'}} 
              open={openConfirm} 
              onCancel={this.closeConfirm}
              cancelButton='Never Mind'
              confirmButton='Yes, Please'
              onConfirm={this.handleConfirm}
              content={`Are you sure you want to confirm this Order?`}
            />
            <Confirm 
              style={{ height: 'unset', left: 'unset', top: 'unset'}} 
              open={openComplete} 
              onCancel={this.closeComplete} 
              onConfirm={this.handleComplete}
              cancelButton='Never Mind'
              confirmButton='Yes, Please'
              content={`Are you sure you want to mark this order as delivered?`}
            />
            <Confirm 
              style={{ height: 'unset', left: 'unset', top: 'unset'}} 
              open={openCancel} 
              onConfirm={this.handleCancel} 
              onCancel={this.closeCancel}
              cancelButton='Never Mind'
              confirmButton='Yes, Please'
              content={`Are you sure you want to cancel this order?`}
              />
            <Confirm 
              style={{ height: 'unset', left: 'unset', top: 'unset'}} 
              open={openAccept} 
              onConfirm={this.handleAccept} 
              onCancel={this.closeAccept}
              cancelButton='Never Mind'
              confirmButton='Yes, Please'
              content={`Are you sure you want to accept this assignment?`}
              />
            <Confirm 
              style={{ height: 'unset', left: 'unset', top: 'unset'}} 
              open={openReject} 
              onConfirm={this.handleReject} 
              onCancel={this.closeReject}
              cancelButton='Never Mind'
              confirmButton='Yes, Please'
              content={`Are you sure you want to reject this assignment?`}
              />
          </div>
      </>
    )
  }
}
export default OrderDetails;
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Icon, Button, Label, Header, Message, Table } from 'semantic-ui-react'

const RenderOrderItem = ({ order }) => {
  
  return (
      <>
      <Table.Cell>
        <Label 
          color={ 
            order.status === 'processing' ? 
              "blue" : 
            order.status === 'confirmed' ? 
              "orange" :
            order.status === 'in transit' ?
              "teal" :
            order.status === 'delivered' ?
              "green" : "black" 
            } 
          ribbon>
          {order.id}
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label color="black">
        &#8358;{Number(order.price)}
        </Label>
        </Table.Cell>
      <Table.Cell>{new Date(order.createdAt).toDateString()}</Table.Cell>
      <Table.Cell>
      {     
        order.status === 'processing' ? 
          (<p><Icon name="wait" /> Processing</p>) : 
        order.status === 'confirmed' ? 
          (<p><Icon name="checkmark" /> Confirmed</p>) :
        order.status === 'in transit' ?
          (<p><Icon name="bicycle" /> In Transit</p>) :
        order.status === 'delivered' ?
        (<p><Icon name="checkmark" /> Delivered</p>) : 
        (<p><Icon name="x" /> Cancelled</p>)
      }
      </Table.Cell>
      <Table.Cell>
        <Link to={`/orders/${order.id}`}>
          <Button className="dmx-color" animated='vertical'>
            <Button.Content hidden>Detailed View</Button.Content>
            <Button.Content visible>
              Show More
            </Button.Content>
          </Button>
        </Link>
      </Table.Cell>
    </>
  );
}

class Orders extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      visibleLog: true, 
      dataLoaded: false, 
      orders: this.props.orders,
      ordered: {
        id: false,
        status: false,
        date: false,
        price: false,
      }
    }
  }

  handleDismiss = () => {
    this.setState({ visibleLog: false })
    localStorage.setItem('visibleLog', 'false')
  }

  orderBy = (e) => {
    e.preventDefault();
    e.persist();
    let sortAttribute = e.target.dataset.name;
    if (!this.state.ordered[sortAttribute]) {
      if (sortAttribute === 'price') 
      this.setState({
        orders: this.props.orders.sort((a,b) => (Number(a[sortAttribute]) > Number(b[sortAttribute]) ? -1 : 1)),
        ordered: {
          ...this.state.ordered,
          [sortAttribute] : true,
        }
      })
      else
      this.setState({
        orders: this.props.orders.sort((a,b) => (a[sortAttribute] > b[sortAttribute] ? -1 : 1)),
        ordered: {
          ...this.state.ordered,
          [sortAttribute] : true,
        }
      })
    }
    else {
      if (sortAttribute === 'price') 
      this.setState({
        orders: this.props.orders.sort((a,b) => (Number(a[sortAttribute]) < Number(b[sortAttribute]) ? -1 : 1)),
        ordered: {
          ...this.state.ordered,
          [sortAttribute]: false,
        }
      })
      else 
      this.setState({
        orders: this.props.orders.sort((a,b) => (a[sortAttribute] < b[sortAttribute] ? -1 : 1)),
        ordered: {
          ...this.state.ordered,
          [sortAttribute]: false,
        }
      })
    } 
    
  }

  componentDidMount() {
    localStorage.visibleLog &&
    this.setState({
      visibleLog: false
    })
  }

  render() {
    if (!this.state.dataLoaded && !localStorage.dataLoaded) { 
      localStorage.dataLoaded = 'yes'
      window.location.reload()
    }
    const orders = this.state.orders
    const order = orders.map(order => (
      <Table.Row key={order.id}>
        <RenderOrderItem order={order} />
      </Table.Row>
    ));
    return (
      <div className='main' style={{ width: '60%', display: 'flex', flexDirection: 'column', marginTop: '1em'}}>
        { this.props.location.state && this.state.visibleLog &&
          (<Message 
            color='green' 
            floating
            onDismiss={this.handleDismiss}
            header={this.props.location.state.message} />)
        }
        <Header as='h3' dividing>
          All My Orders
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order Id <Link style={{ color: '#990000' }} to="#"> <Icon name='sort' data-name='id' onClick={this.orderBy} /></Link></Table.HeaderCell>
              <Table.HeaderCell>Amount <Link style={{ color: '#990000' }} to="#"> <Icon name='sort' data-name='price' onClick={this.orderBy} /></Link></Table.HeaderCell>
              <Table.HeaderCell>Date Ordered <Link style={{ color: '#990000' }} to="#"> <Icon name='sort' data-name='createdAt' onClick={this.orderBy} /></Link></Table.HeaderCell>
              <Table.HeaderCell>Status <Link style={{ color: '#990000' }} to="#"> <Icon name='sort' data-name='status' onClick={this.orderBy} /></Link></Table.HeaderCell>
              <Table.HeaderCell>View Details</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {order}
          </Table.Body>
        </Table>
      </div>
    );
  }
} 

export default Orders
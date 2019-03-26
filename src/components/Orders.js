import React from 'react'
import { Link } from 'react-router-dom';
import { Icon, Button, Label, Header, Table } from 'semantic-ui-react'

const RenderOrderItem = ({ order }) => {
  console.log(order);
  return (
    <Table.Row key={order.id}>
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
    </Table.Row>
  );
}

const Orders = props => {
  const order = props.orders.map(order => (
    <RenderOrderItem order={order} />
  ));
  return (
    <div className='main' style={{ width: '60%', display: 'flex', flexDirection: 'column', marginTop: '1em'}}>
      <Header as='h3' dividing>
        All My Orders
      </Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order Id</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Date Ordered</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>View Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
          {order}
        <Table.Body>
    
        </Table.Body>
      </Table>
    </div>
  );
} 

export default Orders
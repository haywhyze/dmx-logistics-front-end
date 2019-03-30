import React from 'react'
import { Link } from 'react-router-dom';
import { Icon, Button, Label, Header, Table } from 'semantic-ui-react'

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
              "teal" : "black" 
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

const Current = props => {
  const order = props.orders.map(order => (
    <Table.Row key={order.id}>
    <RenderOrderItem order={order} />
    </Table.Row>
  ));
  return (
    <div className='main' style={{ width: '60%', display: 'flex', flexDirection: 'column', marginTop: '1em'}}>
      <Header as='h3' dividing>
        My Active Orders
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
        <Table.Body>
        {order}
        </Table.Body>
      </Table>
    </div>
  );
} 

export default Current
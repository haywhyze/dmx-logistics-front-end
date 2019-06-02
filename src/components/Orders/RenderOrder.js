import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Button, Label, Table } from 'semantic-ui-react'

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

export default RenderOrderItem;
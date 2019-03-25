import React from 'react'
import { Icon, Button, Label, Header, Table } from 'semantic-ui-react'

const Orders = () => (
  <div className='main' style={{ width: '60%', display: 'flex', flexDirection: 'column', marginTop: '1em'}}>
    <Header as='h3' dividing>
    My Delivery Orders
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
      <Table.Row>
        <Table.Cell>
          <Label color="blue" ribbon>369002</Label>
        </Table.Cell>
        <Table.Cell>#4500</Table.Cell>
        <Table.Cell>07/11/2019</Table.Cell>
        <Table.Cell>Processing</Table.Cell>
        <Table.Cell>
        <Button className="dmx-color" animated='vertical'>
          <Button.Content hidden>Detailed View</Button.Content>
          <Button.Content visible>
            Show More
          </Button.Content></Button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.Cell>
          <Label color="green" ribbon>369002</Label>
        </Table.Cell>
        <Table.Cell>#4500</Table.Cell>
        <Table.Cell>07/11/2019</Table.Cell>
        <Table.Cell positive>
        <Icon name="checkmark box" />
        Delivered</Table.Cell>
        <Table.Cell>
        <Button primary animated='vertical'>
          <Button.Content hidden>Detailed View</Button.Content>
          <Button.Content visible>
            Show More
          </Button.Content></Button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.Cell>
          <Label color="teal" ribbon>369002</Label>
        </Table.Cell>
        <Table.Cell>#4500</Table.Cell>
        <Table.Cell>07/11/2019</Table.Cell>
        <Table.Cell>
        <Icon name="bicycle" />
          In Transit
        </Table.Cell>
        <Table.Cell>
        <Button primary animated='vertical'>
          <Button.Content hidden>Detailed View</Button.Content>
          <Button.Content visible>
            Show More
          </Button.Content></Button>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  </div>
)

export default Orders
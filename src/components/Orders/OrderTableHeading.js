import React from "react";
import { Link } from "react-router-dom";
import { Icon, Header, Table } from "semantic-ui-react";
import RenderOrderItem from "./RenderOrder";

export default ({ heading, orders, orderBy }) => {
  const order = orders.map(order => (
    <Table.Row key={order.id}>
      <RenderOrderItem order={order} />
    </Table.Row>
  ));
  if (orders[0])
    return (
      <>
        <Header as="h3" dividing>
          {heading}
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Order Id
                <Link style={{ color: "#990000" }} to="#">
                  <Icon
                    name="sort"
                    data-name="id"
                    onClick={e => orderBy(e, orders)}
                  />
                </Link>
              </Table.HeaderCell>
              <Table.HeaderCell>
                Amount
                <Link style={{ color: "#990000" }} to="#">
                  <Icon
                    name="sort"
                    data-name="price"
                    onClick={e => orderBy(e, orders)}
                  />
                </Link>
              </Table.HeaderCell>
              <Table.HeaderCell>
                Date Ordered
                <Link style={{ color: "#990000" }} to="#">
                  <Icon
                    name="sort"
                    data-name="createdAt"
                    onClick={e => orderBy(e, orders)}
                  />
                </Link>
              </Table.HeaderCell>
              <Table.HeaderCell>
                Status
                <Link style={{ color: "#990000" }} to="#">
                  <Icon
                    name="sort"
                    data-name="status"
                    onClick={e => orderBy(e, orders)}
                  />
                </Link>
              </Table.HeaderCell>
              <Table.HeaderCell>View Details</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{order}</Table.Body>
        </Table>
      </>
    );
  return (
    <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
      No order to display <Link to="/new">Click here</Link> to make a new other
    </h1>
  );
};

import React, { useState, useEffect, useContext } from "react";
import { Grid, Message, Pagination } from "semantic-ui-react";
import OrderTableHeading from "./OrderTableHeading";
import { ContextOrders } from "../../components/context/Orders";
import { resetMessages } from "../../Actions/orderActions";

function Orders(props) {
  const [state, dispatch] = useContext(ContextOrders);
  const [visibleLog, setVisibleLog] = useState(true);
  const [visibleMessage, setVisibleMessage] = useState(state.newOrderSuccess);
  const [activePage, setActivePage] = useState(state.activePage);
  const [boundaryRange] = useState(1);
  const [siblingRange] = useState(1);
  const [showEllipsis] = useState(true);
  const [showFirstAndLastNav] = useState(true);
  const [showPreviousAndNextNav] = useState(true);
  const [totalPages] = useState(Math.ceil(state.totalPages / 10));

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
    props.updateState({
      activePage
    });
    props.handlePaginationChange(activePage);
  };

  const handleDismiss = () => {
    setVisibleLog(false);
    localStorage.setItem("visibleLog", "false");
  };

  const dismissMessage = () => {
    setVisibleMessage(false);
    resetMessages(dispatch);
  };

  useEffect(() => {
    localStorage.visibleLog && setVisibleLog(false);
    let timer;
    if (visibleMessage)
      timer = setTimeout(() => {
        setVisibleMessage(false);
        resetMessages(dispatch);
        console.log(state.newOrderSuccess);
      }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [state.newOrderSuccess]);

  const orders = state.orders;

  return (
    <div
      className="main"
      style={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        marginTop: "1em"
      }}
    >
      {props.location.state && visibleLog && (
        <Message
          color="green"
          floating
          onDismiss={handleDismiss}
          header={props.location.state.message}
        />
      )}
      {visibleMessage && (
        <Message
          color="green"
          floating
          onDismiss={dismissMessage}
          header="New Order Created"
        />
      )}
      <OrderTableHeading
        heading="All Orders"
        orders={orders}
        orderBy={props.orderBy}
      />
      {totalPages > 1 && (
        <Grid centered columns={2}>
          <Grid.Column>
            <Pagination
              inverted
              className="dmx-color"
              activePage={activePage}
              boundaryRange={boundaryRange}
              onPageChange={handlePaginationChange}
              size="large"
              siblingRange={siblingRange}
              totalPages={totalPages}
              // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
              ellipsisItem={showEllipsis ? undefined : null}
              firstItem={showFirstAndLastNav ? undefined : null}
              lastItem={showFirstAndLastNav ? undefined : null}
              prevItem={showPreviousAndNextNav ? undefined : null}
              nextItem={showPreviousAndNextNav ? undefined : null}
            />
          </Grid.Column>
        </Grid>
      )}
    </div>
  );
}

export default Orders;

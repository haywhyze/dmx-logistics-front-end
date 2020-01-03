import React, { useState, useEffect, useReducer } from "react";
import { withRouter, Switch, Redirect } from "react-router-dom";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Current from "./Orders/Current";
import Completed from "./Orders/Completed";
import CreateRider from "./CreateRider/CreateRider";
import New from "./CreateOrder/New";
import Orders from "./Orders/Orders";
import OrderDetails from "./Orders/OrderDetail";
import Profile from "./Profile/Profile";
import jwtDecode from "jwt-decode";
import PrivateRoute from "./PrivateRoute";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { orderReducer, initialState } from "../reducers/orderReducer";
import {
  fetchOrders,
  fetchUser,
  fetchRiders,
  SORT_ORDERS,
} from "../Actions/orderActions";
import { ContextOrders } from "../components/context/Orders";

function Main(props) {
  const [ordered, setOrdered] = useState({
    id: false,
    status: false,
    date: false,
    price: false
  });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const {
    isLoadingUser,
    isLoadingOrder,
    isLoadingRiders,
    riders,
    activePage,
    user,
    orders
  } = state;

  const orderBy = e => {
    e.preventDefault();
    e.persist();
    let sortAttribute = e.target.dataset.name;
    if (!ordered[sortAttribute]) {
      if (sortAttribute === "price") {
        dispatch({
          type: SORT_ORDERS,
          payload: orders
            .concat()
            .sort((a, b) =>
              Number(a[sortAttribute]) > Number(b[sortAttribute]) ? -1 : 1
            )
        });
        setOrdered({ ...ordered, [sortAttribute]: true });
      } else {
        dispatch({
          type: SORT_ORDERS,
          payload: orders
            .concat()
            .sort((a, b) => (a[sortAttribute] > b[sortAttribute] ? -1 : 1))
        });
        setOrdered({ ...ordered, [sortAttribute]: true });
      }
    } else {
      if (sortAttribute === "price") {
        dispatch({
          type: SORT_ORDERS,
          payload: orders
            .concat()
            .sort((a, b) =>
              Number(a[sortAttribute]) < Number(b[sortAttribute]) ? -1 : 1
            )
        });
        setOrdered({ ...ordered, [sortAttribute]: false });
      } else {
        dispatch({
          type: SORT_ORDERS,
          payload: orders
            .concat()
            .sort((a, b) => (a[sortAttribute] < b[sortAttribute] ? -1 : 1))
        });
        setOrdered({ ...ordered, [sortAttribute]: false });
      }
    }
  };

  const handlePaginationChange = activePage => {
    fetchOrders(dispatch, activePage);
  };

  const updateState = values => {
    console.log(values);
  };

  const token = localStorage.dmx_logistics_token;
  let decoded, userId, userRole;
  if (token) decoded = jwtDecode(token);
  if (decoded) userId = decoded.userId;
  if (decoded) userRole = decoded.userRole;

  useEffect(() => {
    if (userId) setLoggedIn(true);
    if (userRole === "admin") {
      fetchRiders(dispatch, userId);
    }

    if (userId) {
      fetchOrders(dispatch, activePage);
      fetchUser(dispatch, userId);
    }
    
  }, [state.user.firstName, isLoggedIn]);

  const OrderWithId = ({ match }) => {
    return (
      <OrderDetails
        user={user}
        riders={riders}
        order={
          orders.filter(order => order.id === Number(match.params.orderId))[0]
        }
      />
    );
  };
  const currentOrders = orders.filter(
    order => order.status !== "delivered" && order.status !== "cancelled"
  );
  const completedOrders = orders.filter(order => order.status === "delivered");

  if (isLoadingUser || isLoadingOrder || isLoadingRiders) {
    return (
      <>
        <Dimmer.Dimmable style={{ minHeight: "100vh" }} as={Segment} dimmed>
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        </Dimmer.Dimmable>
      </>
    );
  } else
    return (
      <ContextOrders.Provider value={[state, dispatch]}>
        <div>
          <Header history={props.history} location={props.location} />
          <Sidebar />
          <TransitionGroup>
            <CSSTransition
              key={props.location.key}
              classNames="page"
              timeout={300}
            >
              <Switch>
                <PrivateRoute
                  exact
                  path={["/", "/all"]}
                  component={() => (
                    <Orders
                      {...props}
                      orderBy={orderBy}
                      updateState={updateState}
                      {...props}
                      handlePaginationChange={handlePaginationChange}
                    />
                  )}
                />
                <PrivateRoute
                  exact
                  path="/current"
                  component={() => (
                    <Current
                      {...props}
                      orders={currentOrders}
                      orderBy={orderBy}
                    />
                  )}
                />
                <PrivateRoute
                  exact
                  path="/completed"
                  component={() => (
                    <Completed
                      {...props}
                      orders={completedOrders}
                      orderBy={orderBy}
                    />
                  )}
                />
                <PrivateRoute
                  exact
                  path="/new"
                  component={() => <New {...props} user={user} />}
                />
                <PrivateRoute path="/orders/:orderId" component={OrderWithId} />
                <PrivateRoute
                  exact
                  path="/profile"
                  component={() => (
                    <Profile updateState={updateState} {...props} user={user} />
                  )}
                />
                <PrivateRoute exact path="/new-rider" component={CreateRider} />
                <Redirect to="/404" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </ContextOrders.Provider>
    );
}

export default withRouter(Main);

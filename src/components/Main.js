import React, { useState, useEffect } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import axios from "axios";
import Header from "./Header";
import Login from "./Login/Login";
import NotFound from "./404";
import SignUp from "./SignUp/SignUp";
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
import baseUrl from "../api/baseUrl";

function Main(props) {
  const [isLoading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});
  const [riders, setRiders] = useState([]);
  const [ordered, setOrdered] = useState({
    id: false,
    status: false,
    date: false,
    price: false
  });
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const orderBy = (e, orders) => {
    e.preventDefault();
    e.persist();
    let sortAttribute = e.target.dataset.name;
    if (!ordered[sortAttribute]) {
      if (sortAttribute === "price") {
        setOrders(
          orders.sort((a, b) =>
            Number(a[sortAttribute]) > Number(b[sortAttribute]) ? -1 : 1
          )
        );
        setOrdered({ ...ordered, [sortAttribute]: true });
      } else {
        setOrders(
          orders.sort((a, b) => (a[sortAttribute] > b[sortAttribute] ? -1 : 1))
        );
        setOrdered({ ...ordered, [sortAttribute]: true });
      }
    } else {
      if (sortAttribute === "price") {
        setOrders(
          orders.sort((a, b) =>
            Number(a[sortAttribute]) < Number(b[sortAttribute]) ? -1 : 1
          )
        );
        setOrdered({ ...ordered, [sortAttribute]: false });
      } else {
        setOrders(
          orders.sort((a, b) => (a[sortAttribute] < b[sortAttribute] ? -1 : 1))
        );
        setOrdered({ ...ordered, [sortAttribute]: false });
      }
    }
  };

  const handlePaginationChange = activePage => {
    setLoading(true);
    const token = localStorage.token;
    const getOrders = () =>
      axios({
        headers: { "auth-token": token },
        url: `${baseUrl}/api/v1/orders?page=${activePage}`
      });
    getOrders()
      .then(response => {
        setLoading(false);
        setOrders(
          response.data.data.rows.sort((a, b) => (a.id > b.id ? -1 : 1))
        );
        setActivePage(activePage);
        setTotalPages(response.data.data.count);
      })
      .catch(error => console.log(error.response));
  };

  const updateState = values => {
    console.log(values);
  };

  useEffect(() => {
    const token = localStorage.token;
    let decoded, userId, userRole;
    if (token) decoded = jwtDecode(token);
    if (decoded) userId = decoded.userId;
    if (decoded) userRole = decoded.userRole;
    // fetch user and orders
    if (userId) setLoading(true);

    if (userRole === "admin") {
      axios({
        url: `${baseUrl}/api/v1/users/${userId}/riders`,
        headers: { "auth-token": token }
      })
        .then(response => {
          setRiders(response.data.data);
        })
        .catch(error => console.log(error.response));
    }
    const getOrders = () =>
      axios({
        headers: { "auth-token": token },
        url: `${baseUrl}/api/v1/orders?page=${activePage}`
      });

    const getUserAccount = () =>
      axios({
        headers: { "auth-token": token },
        url: `${baseUrl}/api/v1/users/${userId}`
      });

    if (userId)
      axios
        .all([getOrders(), getUserAccount()])
        .then(
          axios.spread((orders, user) => {
            setLoading(false);
            setUser(user.data.data);
            setOrders(
              orders.data.data.rows.sort((a, b) => (a.id > b.id ? -1 : 1))
            );
            setTotalPages(orders.data.data.count);
          })
        )
        .catch(error => {
          console.log(error.response);
          setLoading(false);
        });
  }, []);

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

  if (isLoading) {
    return (
      <>
        <Dimmer.Dimmable style={{ minHeight: "100vh" }} as={Segment} dimmed>
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
          <Header
            history={props.history}
            location={props.location}
            user={user}
          />
          <Sidebar />
        </Dimmer.Dimmable>
      </>
    );
  } else
    return (
      <div>
        <Header history={props.history} location={props.location} user={user} />
        <Sidebar user={user} />
        <TransitionGroup>
          <CSSTransition
            key={props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={SignUp} />
              <PrivateRoute
                exact
                path={["/", "/all"]}
                component={() => (
                  <Orders
                    {...props}
                    user={user}
                    orders={orders}
                    orderBy={orderBy}
                    updateState={updateState}
                    {...props}
                    count={totalPages}
                    handlePaginationChange={handlePaginationChange}
                    activePage={activePage}
                  />
                )}
              />
              <PrivateRoute
                exact
                path="/current"
                component={() => (
                  <Current
                    {...props}
                    user={user}
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
                    user={user}
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
              <Route path="/404" component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
}

export default withRouter(Main);

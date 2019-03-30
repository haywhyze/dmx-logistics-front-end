import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Dimmer, Loader, Segment, Container } from 'semantic-ui-react';
import axios from 'axios';
import Header from './Header';
import Login from './Login';
import NotFound from './404';
import SignUp from './SignUp';
import Sidebar from './Sidebar';
import Current from './Current';
import Completed from './Completed';
import New from './New';
import Orders from './Orders';
import OrderDetails from './OrderDetail';
import Profile from './Profile';
import jwtDecode from 'jwt-decode';
import PrivateRoute from './PrivateRoute'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
class Main extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      orders: [],
      user: {}
    }
  }

  componentDidMount() {
    const token = localStorage.token;
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    // fetch user and orders
    this.setState({
      isLoading: true,
    })
    const getOrders = () =>
    axios({
      headers: {'auth-token': token},
      url: `http://localhost:5000/api/v1/orders`
    })

    const getUserAccount = () => 
    axios({
      headers: {'auth-token': token},
      url: `http://localhost:5000/api/v1/users/${userId}`
    })

    axios.all([getOrders(), getUserAccount()])
    .then(axios.spread((orders, user) => {
      this.setState({
        isLoading: false,
        user: user.data.data,
        orders: orders.data.data,
      })
      // console.log(this.state.user, orders.data.data)
    }))
  }

  render() {
    const OrderWithId = ({ match }) => {
      return(
        <OrderDetails user={this.state.user} order={this.state.orders.filter(order => order.id === Number(match.params.orderId))[0]}/>
      )
    }
    const currentOrders = this.state.orders.filter(order => order.status !== 'delivered' && order.status !== 'cancelled');
    const completedOrders = this.state.orders.filter(order => order.status === 'delivered');
    
    if (this.state.isLoading) {
      return(
        <>
        <Dimmer.Dimmable style={{minHeight: '100vh'}} as={Segment} dimmed>
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
          <Header history={this.props.history} location={this.props.location} user={this.state.user}/>
        <Sidebar />
        </Dimmer.Dimmable>
        
        </>
      )
    }
    else
    return(
      <div>
        <Header history={this.props.history} location={this.props.location} user={this.state.user}/>
        <Sidebar />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={SignUp} />
            <PrivateRoute exact path="/all" component={() => <Orders {...this.props} user={this.state.user} orders={this.state.orders} />} />
            <PrivateRoute exact path="/current" component={() => <Current {...this.props} user={this.state.user} orders={currentOrders} /> } />
            <PrivateRoute exact path="/completed" component={() => <Completed {...this.props} user={this.state.user} orders={completedOrders} /> } />
            <PrivateRoute exact path="/new" component={() => <New {...this.props} user={this.state.user} />} />
            <PrivateRoute path="/orders/:orderId" component={OrderWithId} />
            <PrivateRoute exact path="/profile" component={() => <Profile {...this.props} user={this.state.user} />} />
            <Route path="/404" component={NotFound} />
            <Redirect to ="/404" />
          </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
      );
  }
}

export default withRouter(Main);

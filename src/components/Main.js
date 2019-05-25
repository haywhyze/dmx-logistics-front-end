import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import axios from 'axios';
import Header from './Header';
import Login from './Login';
import NotFound from './404';
import SignUp from './SignUp';
import Sidebar from './Sidebar';
import Current from './Current';
import Completed from './Completed';
import CreateRider from './CreateRider';
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
      user: {
        address: 'hello'
      },
      riders: []
    }
  }

  updateState = values => {
    this.setState({
        ...values,
    })
  }

  componentDidMount() {
    const token = localStorage.token;
    let decoded, userId, userRole;
    if (token) decoded = jwtDecode(token);
    if (decoded) userId = decoded.userId;
    if (decoded) userRole = decoded.userRole
    // fetch user and orders
    if (userId) this.setState({
      isLoading: true,
    })

    if (userRole === 'admin') {
      axios({
        url:`https://dmx-backend.herokuapp.com/api/v1/users/${userId}/riders`,
        headers: {'auth-token': token} 
      })
      .then(response => {
        // console.log(response.data.data)
        this.setState({
          riders: response.data.data
        })
      }).catch(error => console.log(error.response))
    }
    const getOrders = () =>
    axios({
      headers: {'auth-token': token},
      url: `https://dmx-backend.herokuapp.com/api/v1/orders`
    })

    const getUserAccount = () => 
    axios({
      headers: {'auth-token': token},
      url: `https://dmx-backend.herokuapp.com/api/v1/users/${userId}`
    })

    if (userId) axios.all([getOrders(), getUserAccount()])
    .then(axios.spread((orders, user) => {
      this.setState({
        isLoading: false,
        user: user.data.data,
        orders: orders.data.data,
      })
      // console.log(this.state.user, orders.data.data)
    })).catch(error => {
      console.log(error.response)
      this.setState({
        isLoading: false,
      })
    })
  }

  render() {
    const OrderWithId = ({ match }) => {
      return(
        <OrderDetails user={this.state.user} riders={this.state.riders} order={this.state.orders.filter(order => order.id === Number(match.params.orderId))[0]}/>
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
        <Sidebar user={this.state.user}/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={SignUp} />
            <PrivateRoute exact path="/" onEnter={this.forceUpdate} onChange={this.forceUpdate} component={() => <Orders {...this.props} user={this.state.user} orders={this.state.orders} />} />
            <PrivateRoute exact path="/all" onEnter={this.forceUpdate} onChange={this.forceUpdate} component={() => <Orders {...this.props} user={this.state.user} orders={this.state.orders} />} />
            <PrivateRoute exact path="/current" component={() => <Current {...this.props} user={this.state.user} orders={currentOrders} /> } />
            <PrivateRoute exact path="/completed" component={() => <Completed {...this.props} user={this.state.user} orders={completedOrders} /> } />
            <PrivateRoute exact path="/new" component={() => <New {...this.props} user={this.state.user} />} />
            <PrivateRoute path="/orders/:orderId" component={OrderWithId} />
            <PrivateRoute exact path="/profile" component={() => <Profile updateState={this.updateState} {...this.props} user={this.state.user} />} />
            <PrivateRoute exact path="/new-rider" component={CreateRider} />
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

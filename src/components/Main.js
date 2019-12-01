import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import axios from 'axios';
import Header from './Header';
import Login from './Login/Login';
import NotFound from './404';
import SignUp from './SignUp/SignUp';
import Sidebar from './Sidebar';
import Current from './Orders/Current';
import Completed from './Orders/Completed';
import CreateRider from './CreateRider/CreateRider';
import New from './CreateOrder/New';
import Orders from './Orders/Orders';
import OrderDetails from './Orders/OrderDetail';
import Profile from './Profile/Profile';
import jwtDecode from 'jwt-decode';
import PrivateRoute from './PrivateRoute'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import baseUrl from '../api/baseUrl';

class Main extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      orders: [],
      user: {
        address: 'hello'
      },
      riders: [],
      ordered: {
        id: false,
        status: false,
        date: false,
        price: false,
      },
      activePage: 1,
      totalPages: 1,
    }
  }

  updateState = values => {
    this.setState({
        ...values,
    })
  }

  orderBy = (e, orders) => {
    e.preventDefault();
    e.persist();
    let sortAttribute = e.target.dataset.name;
    if (!this.state.ordered[sortAttribute]) {
      if (sortAttribute === 'price') 
      this.setState({
        orders: orders.sort((a,b) => (Number(a[sortAttribute]) > Number(b[sortAttribute]) ? -1 : 1)),
        ordered: {
          ...this.state.ordered,
          [sortAttribute] : true,
        }
      })
      else
      this.setState({
        orders: orders.sort((a,b) => (a[sortAttribute] > b[sortAttribute] ? -1 : 1)),
        ordered: {
          ...this.state.ordered,
          [sortAttribute] : true,
        }
      })
    }
    else {
      if (sortAttribute === 'price') 
      this.setState({
        orders: orders.sort((a,b) => (Number(a[sortAttribute]) < Number(b[sortAttribute]) ? -1 : 1)),
        ordered: {
          ...this.state.ordered,
          [sortAttribute]: false,
        }
      })
      else 
      this.setState({
        orders: orders.sort((a,b) => (a[sortAttribute] < b[sortAttribute] ? -1 : 1)),
        ordered: {
          ...this.state.ordered,
          [sortAttribute]: false,
        }
      })
    }
  }

  handlePaginationChange = (activePage) => {
    this.setState({
      isLoading: true,
    })
    const token = localStorage.token;
    const getOrders = () =>
    axios({
      headers: {'auth-token': token},
      url: `${baseUrl}/api/v1/orders?page=${activePage}`
    });
    getOrders().then(response => {
      this.setState({
        isLoading: false,
        orders: response.data.data.rows.sort((a,b) => (a.id > b.id ? -1 : 1)),
        activePage,
        totalPages: response.data.data.count,
      })
      }).catch(error => console.log(error.response))
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
        url:`${baseUrl}/api/v1/users/${userId}/riders`,
        headers: {'auth-token': token} 
      })
      .then(response => {
        this.setState({
          riders: response.data.data
        })
      }).catch(error => console.log(error.response))
    }
    const getOrders = () =>
    axios({
      headers: {'auth-token': token},
      url: `${baseUrl}/api/v1/orders?page=${this.state.activePage}`
    })

    const getUserAccount = () => 
    axios({
      headers: {'auth-token': token},
      url: `${baseUrl}/api/v1/users/${userId}`
    })

    if (userId) axios.all([getOrders(), getUserAccount()])
    .then(axios.spread((orders, user) => {
      this.setState({
        isLoading: false,
        user: user.data.data,
        orders: orders.data.data.rows.sort((a,b) => (a.id > b.id ? -1 : 1)),
        totalPages: orders.data.data.count,
      })
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
        <OrderDetails 
          user={this.state.user} 
          riders={this.state.riders} 
          order={this.state.orders.filter(order => order.id === Number(match.params.orderId))[0]}/>
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
          <Header 
            history={this.props.history} 
            location={this.props.location} 
            user={this.state.user}
          />
        <Sidebar />
        </Dimmer.Dimmable>
        
        </>
      )
    }
    else
    return(
      <div>
        <Header 
          history={this.props.history} 
          location={this.props.location} 
          user={this.state.user}/>
        <Sidebar 
          user={this.state.user}
        />
        <TransitionGroup>
          <CSSTransition 
            key={this.props.location.key} 
            classNames="page" 
            timeout={300}
          >
          <Switch>
            <Route 
              path="/login" 
              component={Login} 
            />
            <Route 
              path="/register" 
              component={SignUp} 
            />
            <PrivateRoute 
              exact path={['/','/all']}
              component={() => <Orders {...this.props} 
                user={this.state.user} 
                orders={this.state.orders}
                orderBy={this.orderBy}
                updateState={this.updateState} {...this.props} 
                count={this.state.totalPages}
                handlePaginationChange={this.handlePaginationChange}
                activePage={this.state.activePage}
              />} 
            />
            <PrivateRoute 
              exact path="/current" 
              component={() => <Current {...this.props} 
                user={this.state.user} 
                orders={currentOrders}
                orderBy={this.orderBy}
              /> } 
            />
            <PrivateRoute 
              exact path="/completed" 
              component={() => <Completed {...this.props} 
                user={this.state.user} 
                orders={completedOrders}
                orderBy={this.orderBy}
              /> } 
            />
            <PrivateRoute 
              exact path="/new" 
              component={() => <New {...this.props} 
                user={this.state.user} />} 
              />
            <PrivateRoute 
              path="/orders/:orderId" 
              component={OrderWithId} />
            <PrivateRoute 
              exact path="/profile" 
              component={() => <Profile 
                updateState={this.updateState} {...this.props} 
                user={this.state.user} 
              />} 
            />
            <PrivateRoute 
              exact path="/new-rider" 
              component={CreateRider} 
            />
            <Route 
              path="/404" 
              component={NotFound} 
            />
            <Redirect 
              to ="/404" 
            />
          </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
      );
  }
}

export default withRouter(Main);

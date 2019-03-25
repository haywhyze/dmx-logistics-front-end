import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './Header';
// import Login from './Login';
import NotFound from './404';
// import SignUp from './SignUp';
import Sidebar from './Sidebar';
import Current from './Current';
import Completed from './Completed';
import New from './New';
import Orders from './Orders';
import OrderDetails from './OrderDetail';
import Profile from './Profile';
// import Password from './Password';

const mapStateToProps = state => {
  return {
    orders: state.orders,
    user: state.user,
  }
}

class Main extends Component {

  render() {
    // const OrderWithId = ({ match }) => {
    //   return(
    //     <OrderDetail />
    //   )
    // }
    return(
      <div>
        <Header />
        <Sidebar />
          <Switch>
            {/* <Route path="/login" component={Login} />
            <Route path="/register" component={SignUp} /> */}
            <Route exact path="/" component={Orders} />
            <Route exact path="/current" component={Current} />
            <Route path="/completed" component={Completed} />
            <Route path="/new" component={New} />
            <Route path="/orders/1" component={OrderDetails} />
            <Route path="/profile" component={Profile} />
            <Route path="/404" component={NotFound} />
            <Redirect to ="/404" />
          </Switch>
      </div>
      );
  }
}

export default withRouter(connect(mapStateToProps/*, mapDispatchToProps*/)(Main));

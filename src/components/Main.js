import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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

class Main extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      orders: [
        {
            "id": 3690002,
            "itemDescription": "Just a cloth I will like to send to ibadan",
            "senderName": "Yusuf",
            "senderPhone": "08031961496",
            "senderEmail": null,
            "senderAddress": "Lagos State University, Iba Town Rd, Lagos, Nigeria",
            "recipientName": "Ayobami",
            "recipientPhone": "09023465674",
            "recipientEmail": null,
            "recipientAddress": "Victoria garden City, Lekki, Nigeria",
            "status": "in transit",
            "paymentStatus": "credit/debit card",
            "price": "4000.00",
            "weight": "1.00",
            "extraInfo": null,
            "createdAt": "2019-03-18T02:49:40.695Z",
            "updatedAt": "2019-03-20T01:17:31.828Z",
            "creator": {
                "firstName": "Abdulrahman",
                "lastName": "Ayeni"
            },
            "rider": {
                "firstName": "Abdulrahman",
                "lastName": "Ayeni"
            }
        },
        {
            "id": 1,
            "itemDescription": "Just a cloth I will like to send to ibadan",
            "senderName": "Yusuf",
            "senderPhone": "08031961496",
            "senderEmail": null,
            "senderAddress": "Lagos State University, Iba Town Rd, Lagos, Nigeria",
            "recipientName": "Ayobami",
            "recipientPhone": "09023465674",
            "recipientEmail": null,
            "recipientAddress": "Victoria garden City, Lekki, Nigeria",
            "status": "processing",
            "paymentStatus": "pay on pickup",
            "price": "1200.00",
            "weight": "1.00",
            "extraInfo": null,
            "createdAt": "2019-03-17T18:26:36.290Z",
            "updatedAt": "2019-03-17T18:26:36.290Z",
            "creator": null,
            "rider": null
        },
        {
            "id": 2,
            "itemDescription": "Just a cloth I will like to send to ibadan",
            "senderName": "Yusuf",
            "senderPhone": "08031961496",
            "senderEmail": null,
            "senderAddress": "Lagos State University, Iba Town Rd, Lagos, Nigeria",
            "recipientName": "Ayobami",
            "recipientPhone": "09023465674",
            "recipientEmail": null,
            "recipientAddress": "Victoria garden City, Lekki, Nigeria",
            "status": "processing",
            "paymentStatus": "pay on pickup",
            "price": "1200.00",
            "weight": "1.00",
            "extraInfo": null,
            "createdAt": "2019-03-17T18:28:53.202Z",
            "updatedAt": "2019-03-17T18:28:53.202Z",
            "creator": null,
            "rider": null
        },
        {
            "id": 7,
            "itemDescription": "Just a cloth I will like to send to ibadan",
            "senderName": "Yusuf",
            "senderPhone": "08031961496",
            "senderEmail": "haywhyze@gmail.com",
            "senderAddress": "Lagos State University, Iba Town Rd, Lagos, Nigeria",
            "recipientName": "Ayobami",
            "recipientPhone": "09023465674",
            "recipientEmail": "yusufayo19@gmail.com",
            "recipientAddress": "Victoria garden City, Lekki, Nigeria",
            "status": "processing",
            "paymentStatus": "pay on pickup",
            "price": "1200.00",
            "weight": "1.00",
            "extraInfo": null,
            "createdAt": "2019-03-17T22:48:31.127Z",
            "updatedAt": "2019-03-17T22:48:31.127Z",
            "creator": {
                "firstName": "Haywhyze",
                "lastName": "Clark"
            },
            "rider": null
        },
        {
            "id": 3690000,
            "itemDescription": "Just a cloth I will like to send to ibadan",
            "senderName": "Yusuf",
            "senderPhone": "08031961496",
            "senderEmail": "haywhyze@gmail.com",
            "senderAddress": "Lagos State University, Iba Town Rd, Lagos, Nigeria",
            "recipientName": "Ayobami",
            "recipientPhone": "09023465674",
            "recipientEmail": "yusufayo19@gmail.com",
            "recipientAddress": "Victoria garden City, Lekki, Nigeria",
            "status": "processing",
            "paymentStatus": "pay on pickup",
            "price": "1200.00",
            "weight": "1.00",
            "extraInfo": null,
            "createdAt": "2019-03-17T23:00:30.673Z",
            "updatedAt": "2019-03-17T23:00:30.673Z",
            "creator": {
                "firstName": "Haywhyze",
                "lastName": "Clark"
            },
            "rider": null
        },
        {
            "id": 3690001,
            "itemDescription": "Just a cloth I will like to send to ibadan",
            "senderName": "Yusuf",
            "senderPhone": "08031961496",
            "senderEmail": "haywhyze@gmail.com",
            "senderAddress": "Lagos State University, Iba Town Rd, Lagos, Nigeria",
            "recipientName": "Ayobami",
            "recipientPhone": "09023465674",
            "recipientEmail": "yusufayo19@gmail.com",
            "recipientAddress": "Victoria garden City, Lekki, Nigeria",
            "status": "processing",
            "paymentStatus": "pay on pickup",
            "price": "1200.00",
            "weight": "1.00",
            "extraInfo": null,
            "createdAt": "2019-03-17T23:00:40.263Z",
            "updatedAt": "2019-03-17T23:00:40.263Z",
            "creator": {
                "firstName": "Haywhyze",
                "lastName": "Clark"
            },
            "rider": null
        },
        {
            "id": 3690003,
            "itemDescription": "Just a cloth I will like to send to ibadan",
            "senderName": "Yusuf",
            "senderPhone": "08031961496",
            "senderEmail": null,
            "senderAddress": "Abule Egba, Lagos, Nigeria",
            "recipientName": "Ayobami",
            "recipientPhone": "09023465674",
            "recipientEmail": null,
            "recipientAddress": "Alausa, Ojodu, Nigeria",
            "status": "cancelled",
            "paymentStatus": "pay on pickup",
            "price": "1200.00",
            "weight": "1.00",
            "extraInfo": null,
            "createdAt": "2019-03-18T02:50:44.940Z",
            "updatedAt": "2019-03-18T02:50:44.940Z",
            "creator": {
                "firstName": "Abdulrahman",
                "lastName": "Ayeni"
            },
            "rider": null
        },
        {
            "id": 3690004,
            "itemDescription": "shoes and jewelleries",
            "senderName": "Yusuf",
            "senderPhone": "08031961496",
            "senderEmail": null,
            "senderAddress": "Abule Egba, Lagos, Nigeria",
            "recipientName": "Ayobami",
            "recipientPhone": "09023465674",
            "recipientEmail": null,
            "recipientAddress": "Alausa, Ojodu, Nigeria",
            "status": "processing",
            "paymentStatus": "pay on pickup",
            "price": "1200.00",
            "weight": "1.00",
            "extraInfo": null,
            "createdAt": "2019-03-18T02:51:23.774Z",
            "updatedAt": "2019-03-18T02:51:23.774Z",
            "creator": {
                "firstName": "Abdulrahman",
                "lastName": "Ayeni"
            },
            "rider": null
        },
        {
            "id": 5,
            "itemDescription": "Just a cloth I will like to send to ibadan",
            "senderName": "Yusuf",
            "senderPhone": "08031961496",
            "senderEmail": null,
            "senderAddress": "Lagos State University, Iba Town Rd, Lagos, Nigeria",
            "recipientName": "Ayobami",
            "recipientPhone": "09023465674",
            "recipientEmail": null,
            "recipientAddress": "Victoria garden City, Lekki, Nigeria",
            "status": "delivered",
            "paymentStatus": "pay on pickup",
            "price": "1200.00",
            "weight": "1.00",
            "extraInfo": null,
            "createdAt": "2019-03-17T18:35:27.030Z",
            "updatedAt": "2019-03-17T18:35:27.030Z",
            "creator": {
                "firstName": "Yusuf",
                "lastName": "Abdulkarim"
            },
            "rider": null
        },
        {
            "id": 6,
            "itemDescription": "Just a cloth I will like to send to ibadan",
            "senderName": "Yusuf",
            "senderPhone": "08031961496",
            "senderEmail": null,
            "senderAddress": "Lagos State University, Iba Town Rd, Lagos, Nigeria",
            "recipientName": "Ayobami",
            "recipientPhone": "09023465674",
            "recipientEmail": null,
            "recipientAddress": "Victoria garden City, Lekki, Nigeria",
            "status": "delivered",
            "paymentStatus": "pay on pickup",
            "price": "1200.00",
            "weight": "1.00",
            "extraInfo": null,
            "createdAt": "2019-03-17T18:37:26.289Z",
            "updatedAt": "2019-03-17T18:37:26.289Z",
            "creator": {
                "firstName": "Yusuf",
                "lastName": "Abdulkarim"
            },
            "rider": null
        }
    ],
      user: {}
    }
  }

  render() {
    const OrderWithId = ({ match }) => {
      return(
        <OrderDetails order={this.state.orders.filter(order => order.id === Number(match.params.orderId))[0]}/>
      )
    }

    const currentOrders = this.state.orders.filter(order => order.status !== 'delivered' && order.status !== 'cancelled');
    const completedOrders = this.state.orders.filter(order => order.status === 'delivered');
    return(
      <div>
        <Header />
        <Sidebar />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={SignUp} />
            <Route exact path="/" component={() => <Orders orders={this.state.orders} />} />
            <Route exact path="/current" component={() => <Current orders={currentOrders} /> } />
            <Route exact path="/completed" component={() => <Completed orders={completedOrders} /> } />
            <Route exact path="/new" component={New} />
            <Route path="/orders/:orderId" component={OrderWithId} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/404" component={NotFound} />
            <Redirect to ="/404" />
          </Switch>
      </div>
      );
  }
}

export default Main;

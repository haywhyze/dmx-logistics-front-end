import React, { Component } from 'react'
import { Message } from 'semantic-ui-react';
import OrderTableHeading from './OrderTableHeading';

class Orders extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      visibleLog: true, 
      dataLoaded: false, 
    }
  }

  handleDismiss = () => {
    this.setState({ visibleLog: false })
    localStorage.setItem('visibleLog', 'false')
  }

  componentDidMount() {
    localStorage.visibleLog &&
    this.setState({
      visibleLog: false
    })
  }

  render() {
    if (!this.state.dataLoaded && !localStorage.dataLoaded) { 
      localStorage.dataLoaded = 'yes'
      window.location.reload()
    }
    const orders = this.props.orders

    return (
      <div className='main' style={{ width: '60%', display: 'flex', flexDirection: 'column', marginTop: '1em'}}>
        { this.props.location.state && this.state.visibleLog &&
          (<Message 
            color='green' 
            floating
            onDismiss={this.handleDismiss}
            header={this.props.location.state.message} />)
        }
        <OrderTableHeading heading='All Orders' orders={orders} orderBy={this.props.orderBy}/>
      </div>
    );
  }
} 

export default Orders
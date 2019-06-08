import React, { Component } from 'react'
import { Grid, Message, Pagination } from 'semantic-ui-react';
import OrderTableHeading from './OrderTableHeading';

class Orders extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      visibleLog: true, 
      dataLoaded: false,
      activePage: this.props.activePage,
      boundaryRange: 1,
      siblingRange: 1,
      showEllipsis: true,
      showFirstAndLastNav: true,
      showPreviousAndNextNav: true,
      totalPages: Math.ceil(this.props.count/10),
    }
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage })
    this.props.updateState({
      activePage,
    })
    this.props.handlePaginationChange(activePage);
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
    const orders = this.props.orders;
    const {
      activePage,
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages,
    } = this.state
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
        {totalPages > 1 && <Grid centered columns={2}>
          <Grid.Column>
            <Pagination
              inverted
              className='dmx-color'
              activePage={activePage}
              boundaryRange={boundaryRange}
              onPageChange={this.handlePaginationChange}
              size='big'
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
        </Grid>}
      </div>
    );
  }
} 

export default Orders
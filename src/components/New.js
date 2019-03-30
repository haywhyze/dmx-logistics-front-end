import React, { Component } from 'react';
import NewOrder from './NewOrder';

class New extends Component {
  
  render() {
    console.log(this.props.location);
    return(
      <div className='main' style={{ width: '60%', display: 'flex', flexDirection: 'column', marginTop: '1em'}}>
        <NewOrder />
      </div>     )
  }
}

export default New;
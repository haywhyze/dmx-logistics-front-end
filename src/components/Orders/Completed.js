import React from 'react'
import OrderTableHeading from './OrderTableHeading';

const Completed = props => {
  const orders = props.orders
  return (
    <div className='main' style={{ width: '60%', display: 'flex', flexDirection: 'column', marginTop: '1em'}}>
      <OrderTableHeading heading='Delivered Orders' orders={orders} orderBy={props.orderBy}/>
    </div>
  );
} 

export default Completed
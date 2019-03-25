import React from 'react'
import { Icon, Button, Header, } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const NotFound = () => (
  <div style={{ minHeight: 'calc(100vh - 5em)', marginTop: '-5em',  display: 'flex', flexDirection: 'column', marginLeft: '2em', alignItems: 'center', justifyContent: 'center'}}>
    <Header as='h2' icon textAlign='center'>
      <Icon name='x' circular />
      <Header.Content>Page Not Found</Header.Content>
    </Header>
    <NavLink to="/">
      <Button className='dmx-color'>Go Back to Home Page</Button>
    </NavLink>
    
  </div>
)

export default NotFound
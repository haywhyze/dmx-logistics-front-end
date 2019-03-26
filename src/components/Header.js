import React, { Component } from 'react'
import { Menu, Container, Icon, Image, Dropdown, Item } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';


export default class Header extends Component {

  
 trigger = (
    <span>
      <Icon name='user' /> Hello, Bob
    </span>
  )
  
 options = [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>Bob Smith</strong>
        </span>
      ),
      disabled: true,
    },
    { key: 'profile', text: ( <Item as="a" href="/profile" style={{color: 'black', padding: 0}}>My Profile</Item>) },
    { key: 'number', text: '08031961496', disabled: true },
    { key: 'sign-out', text: 'Sign Out' },
  ]
  
  render() {

    return (
      <>
        <Menu fixed='top' inverted>
          <Container fluid>
            <NavLink to="/">
              <Menu.Item header>
                <Image size='tiny' src='/dmx-logo.jpg' style={{ marginRight: '1em' }} />
              </Menu.Item>
            </NavLink>
            
            <Menu.Menu position="right">
              <Dropdown item simple icon="info" >
                <Dropdown.Menu>
                  <Dropdown.Item>FAQ</Dropdown.Item>
                  <Dropdown.Item>How to Pay</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Call Us Now</Dropdown.Header>
                  <Dropdown.Item>+234(803)1961496</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown item trigger={this.trigger} options={this.options}/>
            </Menu.Menu>
          </Container>
        </Menu>
      </>
    )
  }
}
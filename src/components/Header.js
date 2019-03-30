import React, { Component } from 'react'
import { Menu, Container, Icon, Image, Dropdown, Item, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import Auth from '../auth';

export default class Header extends Component {
  
 trigger = (
    <span>
      <Icon name='user' /> Hello, {this.props.user.firstName}
    </span>
  )
  
 options = [
    {
      key: 'user',
      text: (
        <span>
          Call us on <strong>{this.props.user.phoneNumber}</strong>
        </span>
      ),
      disabled: true,
    },
    { key: 'profile', text: ( <Item as="a" href="/profile" style={{color: 'black', padding: 0}}>My Profile</Item>) },
    { key: 'faq', text: ( <Item as="a" href="/faq" style={{color: 'black', padding: 0}}>FAQ</Item>) },
    { key: 'how-to-pay', text: ( <Item as="a" href="/how-to-pay" style={{color: 'black', padding: 0}}>How to Pay</Item>) },
    { key: 'contact', text: ( <Item as="a" href="/contact" style={{color: 'black', padding: 0}}>Contact Us</Item>) },
    { key: 'number', text: this.props.user.phoneNumber, disabled: true },
    { key: 'sign-out', text: (<Item as='a' style={{color: 'black', padding: 0}} onClick={() => Auth.signout(() => this.props.history.push('/login'))}>Sign Out</Item>) },
  ]
  
  render() {
    console.log()
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
            { Auth.isAuthenticated() ? 
              (
                <Dropdown item trigger={this.trigger} options={this.options}/>
              )
              : (
                <>
                  {
                    this.props.location.pathname === '/login' &&
                    (<Menu.Item >
                      <Button as='a' href="/register" color="green">Sign up</Button>
                    </Menu.Item>)
                  }
                  {
                    this.props.location.pathname === '/register' &&
                    (
                      <Menu.Item>
                        <Button as='a' href="/login">Log-in</Button>
                      </Menu.Item>
                    )
                  }
                </>
              )
            }
            </Menu.Menu>
          </Container>
        </Menu>
      </>
    )
  }
}